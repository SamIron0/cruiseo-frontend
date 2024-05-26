import { ReactNode } from "react"

interface RootLayoutProps {
  children: ReactNode
  
}
export default async function RootLayout({ children }: RootLayoutProps) {
  return <> {children}</>
}
