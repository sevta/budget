import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {},
  {
    pages: {
      signIn: "/",
    },
    callbacks: {
      authorized: ({ token }) => {
        if (token?.role === "SUPER_ADMIN") {
          return true;
        }
        return false;
      },
    },
  }
);

export const config = { matcher: ["/dashboard/:path*"] };
