import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Header = () => {
  return (
    <div className="wrapper flex justify-between mt-4 w-full">
        <Link href="/"><p className="text-[#574ef0] text-4xl font-bold">todoZen</p></Link>
        <div>
        <SignedIn>
          <UserButton afterSwitchSessionUrl='/'/>
        </SignedIn>
        <div className="space-x-2">
        <SignedOut>
          <Button className="secondary-button">
            <Link href="/sign-in">
            Sign In
            </Link>
          </Button>
          <Button className="primary-button">
            <Link href="/sign-up">
            Sign Up
            </Link>
          </Button>
        </SignedOut>
        </div>
        </div>
    </div>
  )
}

export default Header