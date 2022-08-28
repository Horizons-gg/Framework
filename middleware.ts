import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export const middleware = (request: NextRequest) => {
    
    return NextResponse.next()
}

export const config = {
    matcher: '/:path*',
}