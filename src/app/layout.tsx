import type { Metadata } from 'next'
import { Manrope } from 'next/font/google'
import 'styles/globals.scss'

const manrope = Manrope({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Dream Travels',
    description: 'The perfect place to bring your travel dreams to life',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <>
            <head>
                <link rel="shortcut icon" href="/favicon/favicon.ico?v=2" />
                <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
                <link rel="manifest" href="/favicon/site.webmanifest" />
                <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
            </head>
            <html lang="en">
                <body className={manrope.className}>
                    <p>Header</p>
                    <main>{children}</main>
                </body>
            </html>
        </>
    )
}
