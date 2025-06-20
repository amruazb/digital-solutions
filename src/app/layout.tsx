import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/components/Providers'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Digital Enquiry Management System',
  description: 'Professional digital enquiry management platform for customers, staff, and administrators.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <WhatsAppButton />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
} 