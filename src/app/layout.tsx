import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

const font = Roboto({
  subsets: ['latin'],
  weight: '400'
})

export const metadata: Metadata = {
  title: 'Random Encounter',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <nav className='navbar '>
          <div>
            <a href='/' className='title bold'>Random Encounter</a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
