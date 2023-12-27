"use client";
import { ChakraProvider } from '@chakra-ui/react'
import { MyNavigationProvider } from '@/contexts/NavigationContext'
import { MyDataProvider } from '@/contexts/DataContext'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MyNavigationProvider>
      <MyDataProvider>
        <ThemeProvider theme={theme}>
          <ChakraProvider>
            <main className="main">
              {children}
            </main>
          </ChakraProvider>
        </ThemeProvider>
      </MyDataProvider>
    </MyNavigationProvider>
  )
}