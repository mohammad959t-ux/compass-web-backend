import { ExpenseModel, OrderModel, PaymentModel } from "../models/index.js";

export async function getAnalyticsSnapshot() {
  const [ordersAgg, paymentsAgg, expensesAgg] = await Promise.all([
    OrderModel.aggregate([{ $group: { _id: null, total: { $sum: "$total" } } }]),
    PaymentModel.aggregate([
      { $match: { status: "paid" } },
      {
        $lookup: {
          from: "orders",
          localField: "orderId",
          foreignField: "_id",
          as: "order"
        }
      },
      // Only count payments that belong to an existing order
      { $match: { "order.0": { $exists: true } } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]),
    ExpenseModel.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }])
  ]);

  // Diagnostic: check for orphaned payments
  const totalPaidPayments = await PaymentModel.countDocuments({ status: "paid" });
  const [validPaymentsAgg] = await PaymentModel.aggregate([
    { $match: { status: "paid" } },
    {
      $lookup: {
        from: "orders",
        localField: "orderId",
        foreignField: "_id",
        as: "order"
      }
    },
    { $match: { "order.0": { $exists: true } } },
    { $count: "count" }
  ]);
  const validCount = validPaymentsAgg?.count ?? 0;
  if (totalPaidPayments > validCount) {
    console.warn(`[Analytics] Found ${totalPaidPayments - validCount} orphaned paid payments (orders no longer exist)`);
  }

  const orderTotal = ordersAgg[0]?.total ?? 0;
  const paidRevenue = paymentsAgg[0]?.total ?? 0;
  const expenses = expensesAgg[0]?.total ?? 0;
  const net = paidRevenue - expenses;
  const outstanding = Math.max(orderTotal - paidRevenue, 0);

  // Generate 7-day chart data
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }

  const [dailyPayments, dailyExpenses] = await Promise.all([
    PaymentModel.aggregate([
      {
        $match: {
          status: "paid",
          paidAt: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)) }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$paidAt" } },
          amount: { $sum: "$amount" }
        }
      }
    ]),
    ExpenseModel.aggregate([
      {
        $match: {
          date: { $gte: days[0] }
        }
      },
      {
        $group: {
          _id: "$date",
          amount: { $sum: "$amount" }
        }
      }
    ])
  ]);

  const chartData = days.map((day) => {
    const payment = dailyPayments.find((p) => p._id === day);
    const expense = dailyExpenses.find((e) => e._id === day);
    const dateObj = new Date(day);
    const dayLabel = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    return {
      name: dayLabel,
      income: payment?.amount ?? 0,
      expenses: expense?.amount ?? 0
    };
  });

  console.log(`[Analytics Service] Snapshot calculated:`, {
    orderTotal,
    paidRevenue,
    expenses,
    calculatedRevenue: paidRevenue,
    net,
    outstanding,
    orphanedPaymentsRemoved: totalPaidPayments - validCount
  });

  return {
    revenue: paidRevenue,
    expenses,
    net,
    outstanding,
    chartData
  };
}
