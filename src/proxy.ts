import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
   const { pathname } = request.nextUrl;

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
