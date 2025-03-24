import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isAuthRoute=createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);
const isPublicRoute=createRouteMatcher(["/"]);

export default clerkMiddleware(async(auth,req)=>{
  const {userId}=await auth();
  if(userId&&isAuthRoute(req)){
    return NextResponse.redirect(new URL("/",req.url));
}

if(!userId&&!isPublicRoute(req)&&!isAuthRoute(req)){
  return NextResponse.redirect(new URL("/sign-in",req.url));
}
if(isPublicRoute(req)){
  return NextResponse.next();
}
return NextResponse.next();
});


export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};