import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-pathname', request.nextUrl.pathname)

    const response = NextResponse.next({
        request: {
        // New request headers
            headers: requestHeaders,
        },
    })
    return response
}

// https://nextjs.org/docs/app/building-your-application/routing/middleware#setting-headers