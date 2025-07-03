// import Link from "next/link";
// import { LoginForm } from "@/components/auth/login-form";
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

// export default function LoginPage() {
//   return (
//     <Card>
//       <CardHeader className="text-center">
//         <CardTitle className="text-2xl">Welcome Back</CardTitle>
//         <CardDescription>
//           Sign in to continue your wellness journey.
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <LoginForm />
//         <p className="mt-4 text-center text-sm text-muted-foreground">
//           Don&apos;t have an account?{" "}
//           <Link href="/register" className="font-medium text-primary hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </CardContent>
//     </Card>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { signIn } from 'next-auth/react';
// import { toast } from '../../../hooks/use-toast';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// const formSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6),
// });

// type LoginFormValues = z.infer<typeof formSchema>;

// export function LoginForm() {
//   const [isLoading, setIsLoading] = useState(false);

//   const form = useForm<LoginFormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//     },
//   });

//   const onSubmit = async (data: LoginFormValues) => {
//     setIsLoading(true);

//     const result = await signIn('credentials', {
//       redirect: true,
//       email: data.email,
//       password: data.password,
//       callbackUrl: '/dashboard',
//     });

//     if (!result?.ok) {
//       toast({
//         title: 'Login failed',
//         description: 'Invalid credentials. Please try again.',
//         variant: 'destructive',
//       });
//     }

//     setIsLoading(false);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input type="email" placeholder="you@example.com" disabled={isLoading} {...field} />
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
//                 <Input type="password" placeholder="••••••••" disabled={isLoading} {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         <Button type="submit" className="w-full" disabled={isLoading}>
//           {isLoading ? 'Signing In...' : 'Sign In'}
//         </Button>
//       </form>
//     </Form>
//   );
// }
// app/(auth)/login/page.tsx
import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function LoginPage() {
  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>
          Sign in to continue your wellness journey.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

