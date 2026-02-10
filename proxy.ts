

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
    if( !request.cookies.has('accessToken') ) 
  return NextResponse.redirect(new URL('/no-access', request.url))
}
 
// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }
 
export const config = {
  matcher: ['/secret/:path*', '/events/:path*'], //hvis flere sider ['/secret', '/secret/andre'] skal beskyttes, bruges :path* for at matche alle underveje
}