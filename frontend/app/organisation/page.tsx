
import { Metadata } from "next"
import Link from "next/link"
import OrgLogInForm from "@/components/OrgLogInForm"

import { ModeToggle } from "@/components/ModeToggle"


export const metadata: Metadata = {
  title: "Authentication",
  description: "Authentication forms built using the components.",
}

export default function LogInPage() {
  return (
    <>
      <div className="flex items-center justify-center h-full w-full">

        <div className="container flex relative h-[100vh] flex-col items-center justify-center md:grid  ">

          {/* Theme button */}
          <div className="absolute right-[1rem] top-4 md:right-8 md:top-10">
          <ModeToggle/>
          </div>

          {/* Create Account form */}
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Log in to your account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Enter your email and password below to login
                </p>
              </div>
              {/* <UserAuthForm /> */}
              <OrgLogInForm/>
              <p className="px-8 text-center text-sm text-muted-foreground">
                By clicking continue, you agree to our{" "}
                <Link
                  href="/terms"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-4 hover:text-primary"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}