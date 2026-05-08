"use client";

import {
  LayoutDashboard,
  Truck,
  Package,
  PackageCheck,
  FileText,
  Users,
  Building2,
  BarChart3,
  CalendarDays,
  Warehouse,
  ShoppingCart,
  ClipboardList,
  Store,
  UserCog,
  ScrollText,
  FileDown,
  Car,
  type LucideProps,
} from "lucide-react";

type IconName =
  | "layout-dashboard"
  | "truck"
  | "package"
  | "package-check"
  | "file-text"
  | "users"
  | "building-2"
  | "bar-chart-3"
  | "calendar-days"
  | "warehouse"
  | "shopping-cart"
  | "clipboard-list"
  | "store"
  | "user-cog"
  | "scroll-text"
  | "file-down"
  | "car";

const ICON_MAP: Record<IconName, React.ComponentType<LucideProps>> = {
  "layout-dashboard": LayoutDashboard,
  truck: Truck,
  package: Package,
  "package-check": PackageCheck,
  "file-text": FileText,
  users: Users,
  "building-2": Building2,
  "bar-chart-3": BarChart3,
  "calendar-days": CalendarDays,
  warehouse: Warehouse,
  "shopping-cart": ShoppingCart,
  "clipboard-list": ClipboardList,
  store: Store,
  "user-cog": UserCog,
  "scroll-text": ScrollText,
  "file-down": FileDown,
  car: Car,
};

interface NavIconProps extends LucideProps {
  name: string;
}

export function NavIcon({ name, ...props }: NavIconProps) {
  const Icon = ICON_MAP[name as IconName] ?? Package;
  return <Icon {...props} />;
}
