import { Logo } from "@/components/icons";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center gap-2 text-2xl font-bold text-primary">
        <Logo className="h-8 w-8" />
        <h1>InnerSight</h1>
      </div>
      <div className="w-full max-w-sm">
        {children}
      </div>
    </div>
  );
}
