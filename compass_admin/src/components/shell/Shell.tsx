"use client";

import { usePathname } from "next/navigation";

import { Protected } from "./Protected";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  if (isLogin) {
    return <>{children}</>;
  }

  return (
    <Protected>
      <div className="admin-shell flex min-h-screen">
        <Sidebar />
        <div className="flex flex-1 flex-col">
          <Topbar />
          <main className="flex-1 px-6 py-8 lg:px-8">{children}</main>
        </div>
      </div>
    </Protected>
  );
}
