import { ChakraProvider } from '@chakra-ui/react'
import { MyProvider } from '@/contexts/NavigationContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MyProvider>
      <ChakraProvider>
        <main className="main">
          {children}
        </main>
      </ChakraProvider>
    </MyProvider>
  )
}