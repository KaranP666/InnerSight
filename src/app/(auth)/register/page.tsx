// import Link from "next/link";
// import { RegisterForm } from "@/components/auth/register-form";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Info } from "lucide-react";

// export default function RegisterPage() {
//   return (
//     <Card>
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl">Create an Account</CardTitle>
//         <CardDescription>
//           Start your journey towards mental clarity.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         {/* <Alert className="mb-4 text-left">
//             <Info className="h-4 w-4" />
//             <AlertTitle>Demo Note</AlertTitle>
//             <AlertDescription>
//               For this demo, any registration will log you in as the demo user.
//             </AlertDescription>
//         </Alert> */}
//         <RegisterForm />
//         <p className="mt-4 text-center text-sm text-muted-foreground">
//           Already have an account?{" "}
//           <Link href="/login" className="font-medium text-primary hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

// 'use client';

// import * as z from 'zod';
// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { registerUser } from '@/lib/auth.actions';
// import { signIn } from 'next-auth/react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
// import { toast } from '../../../hooks/use-toast';

// const formSchema = z.object({
//   name: z.string().min(2),
//   email: z.string().email(),
//   password: z.string().min(6),
// });

// type RegisterFormValues = z.infer<typeof formSchema>;

// export function RegisterForm() {
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<RegisterFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data: RegisterFormValues) => {
//     setIsLoading(true);

//     const res = await registerUser(data.name, data.email, data.password);

//     if (res?.error) {
//       toast({
//         title: 'Registration failed',
//         description: res.error,
//         variant: 'destructive',
//       });
//       setIsLoading(false);
//       return;
//     }

//     const loginRes = await signIn('credentials', {
//       redirect: true,
//       email: data.email,
//       password: data.password,
//       callbackUrl: '/dashboard',
//     });

//     if (!loginRes?.ok) {
//       toast({ title: 'Login failed after register', variant: 'destructive' });
//     }

//     setIsLoading(false);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Full Name</FormLabel>
//               <FormControl>
//                 <Input disabled={isLoading} placeholder="John Doe" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" disabled={isLoading} placeholder="you@example.com" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <FormField
//           control={form.control}
//           name="password"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Password</FormLabel>
//               <FormControl>
//                 <Input type="password" disabled={isLoading} placeholder="••••••••" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? 'Creating Account...' : 'Create Account'}
//         </Button>
//       </form>
//     </Form>
//   );
// }

import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
