import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// https://shopify.dev/apps/store/security/iframe-protection
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const params = url.searchParams;
  let response = NextResponse.next();
  // get the cookies from the request
  const shop = params.get("shop");

  if (shop) {
    response.headers.set(
      "Content-Security-Policy",
      `frame-ancestors https://${shop}.myshopify.com https://admin.shopify.com;`
    );
  }

  return response;
}
