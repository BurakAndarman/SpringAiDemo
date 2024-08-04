import "./globals.css"
import { Inter } from "next/font/google"
import Navbar from "./components/Navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SpringAiDemo",
  description: "An intelligent app that utilizes Spring AI",
}

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={`${inter.className} h-screen flex flex-col`}
            data-theme="night"
      >
        <Navbar/>
        <main className="grow">
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout
