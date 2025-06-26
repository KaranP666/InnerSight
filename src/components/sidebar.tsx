"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/icons";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Home, Book, Heart, BarChart2, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/journal", label: "Journal", icon: Book },
  { href: "/self-care", label: "Self-Care", icon: Heart },
  { href: "/progress", label: "Progress", icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();

  const navContent = (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map((item) => (
        <Link href={item.href} key={item.href}>
          <Button
            variant={pathname.startsWith(item.href) ? "secondary" : "ghost"}
            className="w-full justify-start gap-2"
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        </Link>
      ))}
    </nav>
  );

  return (
    <>
      <div className="hidden border-r bg-card md:flex md:flex-col md:w-64">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-primary">
            <Logo className="h-6 w-6" />
            <span>InnerSight</span>
          </Link>
        </div>
        <div className="flex-1">{navContent}</div>
      </div>
      <div className="sticky top-0 z-10 flex h-16 items-center border-b bg-background px-4 md:hidden">
         <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full max-w-xs p-0">
                <div className="flex h-16 items-center border-b px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-primary">
                        <Logo className="h-6 w-6" />
                        <span>InnerSight</span>
                    </Link>
                </div>
                {navContent}
            </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
