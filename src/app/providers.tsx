"use client";
import { ChakraProvider } from '@chakra-ui/react'
import { MyProvider } from '@/contexts/NavigationContext'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MyProvider>
      <ThemeProvider theme={theme}>
        <ChakraProvider>
          <main className="main">
            {children}
          </main>
        </ChakraProvider>
      </ThemeProvider>
    </MyProvider>
  )
}