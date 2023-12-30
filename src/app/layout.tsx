import type { Metadata } from 'next'
import "@picocss/pico"
import Navbar from '@/components/navbar/Navbar'
import Main from '@/components/main/Main'
import { Provider } from 'jotai'

export const metadata: Metadata = {
  title: 'Wordle',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <Provider>
      <Main>
        {children}
      </Main>
    </Provider>
  )
}
