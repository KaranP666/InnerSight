// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// const authRoutes = ['/login', '/register'];

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

//   // Redirect from root or any auth routes directly to the dashboard
//   if (pathname === '/' || isAuthRoute) {
//     const absoluteURL = new URL('/dashboard', request.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
// }

// export const config = {
//   matcher: [
//     /*
//      * Match all request paths except for the ones starting with:
//      * - api (API routes)
//      * - _next/static (static files)
//      * - _next/image (image optimization files)
//      * - favicon.ico (favicon file)
//      */
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// };


// middleware.ts
// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/login', '/register'];

export default withAuth(
  function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isPublic = publicRoutes.includes(pathname);
    const isAuthenticated = !!request.nextauth?.token; // avoid TypeScript error

    if (isPublic && isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (!isPublic && !isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // Let the callback expose `request.nextauth.token` correctly
        return true; // always allow, we handle logic above
      },
    },
  }
);

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
