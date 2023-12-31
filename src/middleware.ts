import { authMiddleware } from "@clerk/nextjs";
export default authMiddleware({
    // "/" will be accessible to all users
    publicRoutes: ["/",
        "/products",
        "/male",
        "/female",
        "/kids",
        "/api/cart:path*",
        "/api/webhooks", "/studio/:path*"]
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)",
    ],
};