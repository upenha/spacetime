import './globals.css'

import { cookies } from 'next/headers'

import { ReactNode } from 'react'
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJanjuree,
} from 'next/font/google'
import { Blur } from '@/components/Blur'
import { Hero } from '@/components/Hero'
import { Profile } from '@/components/Profile'
import { SignIn } from '@/components/SignIn'
import { Stripes } from '@/components/Stripes'
import { Copyright } from '@/components/Copyright'

const roboto = Roboto({ subsets: ['latin'], variable: '--font-roboto' })
const baiJamjuree = BaiJanjuree({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-bai-janjuree',
})

export const metadata = {
  title: 'NLW Spacetime',
  description:
    'Uma cápsula do tempo construída com React, Next.js, TailwindCSS e Typescript',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const isAuthenticated = cookies().get('token')
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} ${baiJamjuree.variable} bg-gray-900 font-sans text-gray-100`}
      >
        <main className="grid min-h-screen grid-cols-2">
          <div className="relative flex flex-col items-start justify-between overflow-hidden border-r border-white/10 bg-[url(../assets/bg-stars.svg)] bg-cover px-28 py-16">
            <Blur />
            <Stripes />
            {isAuthenticated ? <Profile /> : <SignIn />}

            <Hero />
            <Copyright />
          </div>

          <div className="flex max-h-screen flex-col overflow-y-scroll bg-[url(../assets/bg-stars.svg)] bg-cover ">
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
