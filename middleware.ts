import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;

        console.log(token);

        const signInUrl = new URL("/api/auth/signin", req.url);

        if(!token) {
            signInUrl.searchParams.set("error", "You must sign in first.");
            return NextResponse.redirect(signInUrl);
        }

        const role = token.role as string;

        if(req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
            signInUrl.searchParams.set("error", "Only admins can access this page.");
            signInUrl.searchParams.set("callbackUrl", req.url);
            console.log(req.url)
            return NextResponse.redirect(signInUrl);
        }

        if(req.nextUrl.pathname.startsWith("/user") && !["admin", "user"].includes(role)) {
            signInUrl.searchParams.set("error", "You must be a user or admin and signed in to access this page");
            signInUrl.searchParams.set("callbackUrl", req.url);
            console.log(req.url)
            return NextResponse.redirect(signInUrl);


        }
        return NextResponse.next();
    },
    {
        pages: {
            signIn: "/api/auth/signin",
        },
    }
);

export const config = {
    matcher: ["/user/report", "/admin/table"], // Match specific paths
  };