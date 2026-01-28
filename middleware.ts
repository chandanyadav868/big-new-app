import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

interface JWTPayload {
  id: string;
  iat: number;
  exp: number;
}

export async function middleware(request: NextRequest,response:NextResponse) {
  try {
    // console.log("URL:- ",request.url);
    
    const cookiesObject = await cookies();
    const accessToken = cookiesObject.get("accessToken");
    let userId="";
    if (accessToken?.value) {
        const {payload} = await jwtVerify(accessToken.value, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
        // console.log("middleware code:- ",payload.id);
        userId = payload.id as string || "";
    }

    const response =  NextResponse.next();
    if (userId) {
        response.cookies.set("userId", userId, {
          httpOnly: true,
          secure: true,
          path: "/",
          sameSite: "strict",
        });
      }

      return response
  } catch (error) {
    console.log(error);
    // Proceed to the next route on error
    return NextResponse.next();
  }
}

export const config = {
  matcher:[
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|images|favicon.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ]
};

// we can not use jwt verify because of Edge runtime of next.js, it does not have module [Error: The edge runtime does not support Node.js 'crypto' module.
// Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime]
// const {id:UserId} = jwt.verify(accessToken.value,process.env.NEXT_PUBLIC_JWT_SECRET!) as JWTPayload
// console.log("Middleware Print",UserId);
