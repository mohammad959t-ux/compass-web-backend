let counter = 1000;

export function nextOrderNumber() {
  counter += 1;
  return `ORD-${String(counter).padStart(6, "0")}`;
}
