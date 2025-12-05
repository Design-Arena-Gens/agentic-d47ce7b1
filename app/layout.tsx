import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Job Search Assistant - Marwen Slimen',
  description: 'Find marketing and creative job opportunities with visa sponsorship',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
