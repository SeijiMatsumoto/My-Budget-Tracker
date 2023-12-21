'use client'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
      <main className="main">
        {children}
      </main>
    </ChakraProvider>)
}