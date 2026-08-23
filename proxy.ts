import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const ROUTE_LANGUAGE_HEADER = 'x-heyde-route-language';

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(ROUTE_LANGUAGE_HEADER, 'en');

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ['/en/:path*'],
};
