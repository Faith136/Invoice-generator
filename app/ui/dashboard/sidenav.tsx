"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
  label: string;
  href: string;
  icon: string;
  badge?: number;
};

const mainNavigation: NavItem[] = [
  {
    label: "Home",
    href: "/dashboard",
    icon: "⌂",
  },
  {
    label: "Customers",
    href: "/dashboard/customers",
    icon: "♙",
  },
  {
    label: "Products & services",
    href: "/dashboard/products",
    icon: "◇",
  },
  {
    label: "Invoices",
    href: "/dashboard/invoices/new",
    icon: "▣",
    badge: 6,
  },
  {
    label: "Payments",
    href: "/dashboard/payments",
    icon: "▤",
  },
];

const insightNavigation: NavItem[] = [
  {
    label: "Customers Terminal",
    href: "/dashboard/terminal",
    icon: "▥",
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: "⚙",
  },
];

export default function Sidenav() {
   const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-50 flex-col border-r border-slate-800 bg-emerald-500 px-2 py-2">
      
      {/* Logo */}
      <div className="mb-6 flex items-center gap-1 px-6">
              <span className="text-2xl text-black font-semibold tracking-tight">
          PurpleHs
        </span>
      </div>

      {/* Main Navigation */}
      <nav className="space-y-1">
        {mainNavigation.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={pathname === item.href}
          />
        ))}
      </nav>

      {/* Insight */}
      <div className="mt-10">
        <p className="mb-3 px-3 text-medium font-medium uppercase tracking-wider text-slate-900">
          Insight
        </p>

        <nav className="space-y-2">
          {insightNavigation.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              active={pathname === item.href}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

function NavLink({
  item,
  active,
}: {
  item: NavItem;
  active: boolean;
}) {
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-1 rounded-xl px-3 py-1 text-sm transition ${
        active
          ? "bg-black text-white"
          : "text-slate-800 hover:bg-slate-800/60 hover:text-white"
      }`}
    >
      <span className="flex w-6 justify-center text-lg">
        {item.icon}
      </span>

      <span className="flex-1">{item.label}</span>

      {item.badge && (
        <span className="flex h-6 min-w-4 items-center justify-center rounded-full bg-rose-500/20 px-2 text-xs font-medium text-green-400">
          {item.badge}
        </span>
      )}
    </Link>
  );
}
