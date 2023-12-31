import ReactQueryProvider from '@/components/react-query'
import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Notepad',
  description: 'Note taking app with AI features',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ReactQueryProvider>
          <body className={inter.className}>{children}</body>
        </ReactQueryProvider>
      </html>
    </ClerkProvider>
  )
}
