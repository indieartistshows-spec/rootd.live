import type { Metadata } from 'next'
import { Anton, Space_Grotesk, DM_Mono, Archivo_Black } from 'next/font/google'
import './globals.css'

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-anton',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const dmMono = DM_Mono({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-dm-mono',
  display: 'swap',
})

const archivoblack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Rootd Live — Don't Perform to Empty Rooms",
  description:
    'Get your signal link. Share it with your audience. See real demand before you book anything.',
  openGraph: {
    title: "Rootd Live — Don't Perform to Empty Rooms",
    description: 'Real demand signals for independent artists in India.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${anton.variable} ${spaceGrotesk.variable} ${dmMono.variable} ${archivoblack.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
