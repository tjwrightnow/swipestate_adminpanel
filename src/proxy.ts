import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
   const { pathname } = request.nextUrl;

   // Public pages: login ke bina bhi koi bhi khol sakta hai (App Store / Play Store ke liye zaroori)
   const publicPaths = ["/privacy-policy", "/terms-of-use"];

   const authPaths = ["/login", "/newpassword", "/resetpassword", "/verifyotp"];
   const mainPaths = ["/buyers", "/dashboard", "/plan-management", "/profile", "/sellers", "/users", "/properties"];

   const isPathAllowed = (paths: string[]) => {
      return paths.some((path) => {
         const pattern = new RegExp(
            "^" +
            path
               .replace(/\/:path\*/g, "(/.*)?")
               .replace(/\/:id/g, "/[^/]+")
               .replace(/\//g, "\\/") +
            "$",
         );
         return pattern.test(pathname);
      });
   };

   // Public routes sab se pehle check hote hain, cookie ya login ki zaroorat nahi
   // (trailing slash ke saath, jaise /privacy-policy/, bhi chalega)
   const normalizedPathname = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
   if (publicPaths.includes(normalizedPathname)) {
      return NextResponse.next();
   }

   let parseDetail;
   const cookieValue = request.cookies.get("swipeestate")?.value;
   try {
      parseDetail = cookieValue ? JSON.parse(cookieValue) : null;
   } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
   }
   const isLoggin = !!parseDetail;
   const userType = parseDetail?.data?.user?.role;

   if (!isLoggin && isPathAllowed(authPaths)) {
      return NextResponse.next();
   }

   if (!isLoggin) {
      return NextResponse.redirect(new URL("/login", request.url));
   }

   if (userType === "Admin" && !isPathAllowed(mainPaths)) {
      return NextResponse.redirect(new URL("/buyers", request.url));
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|webp|gif|ico|css|js|woff|woff2|ttf|eot)).*)"],
};