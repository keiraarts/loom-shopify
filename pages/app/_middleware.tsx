import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// https://shopify.dev/apps/store/security/iframe-protection
export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const params = url.searchParams;
  let response = NextResponse.next();
  // get the cookies from the request
  const shop = params.get("shop") || req.cookies["shop"];
  console.log({ url, shop });

  if (shop) {
    // https://community.shopify.com/c/shopify-apis-and-sdks/clickjacking-headers-for-shopify-app/td-p/1421861/page/3
    response.headers.set(
      "Content-Security-Policy",
      `frame-ancestors https://${shop} https://admin.shopify.com;`
    );
  }

  return response;
}
