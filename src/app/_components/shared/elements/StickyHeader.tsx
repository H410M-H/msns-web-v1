'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from "~/components/ui/button"
import Link from 'next/link'

export default function Component() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-transparent backdrop-blur-md h-14'
          : 'bg-green-800/50 h-20'
      }`}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <Link href="/landing"
        className="flex items-center">
            <Image
              src="/logo/logo.png" // Add the image path in the public folder
              alt="Logo"
              width={50}
              height={50}
              className="transition-all duration-300 ease-in-out hover:size-max"
            />
        </Link>

        <nav>
          <ul className="flex space-x-4 text-white">
            <li>
              <Link href="/admin/dashboard">
                <Button variant="ghost">Home</Button>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <Button variant="ghost">About</Button>
              </Link>
            </li>
            <li>
              <Link href="/registration">
                <Button variant="ghost">Contact</Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
