import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function RegisterPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>
          Start your journey towards mental clarity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Alert className="mb-4 text-left">
            <Info className="h-4 w-4" />
            <AlertTitle>Demo Note</AlertTitle>
            <AlertDescription>
              For this demo, any registration will log you in as the demo user.
            </AlertDescription>
        </Alert>
        <RegisterForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
