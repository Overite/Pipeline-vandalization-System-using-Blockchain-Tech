"use client";
import { Lora } from 'next/font/google'
import './globals.css'
import { Provider } from 'react-redux'
import { store } from '@/state/store'
import UseDataFetch from '@/hooks/use_data_fetch';

const lora = Lora({ subsets: ['latin'] })

// export const metadata = {
//   title: 'ATPVDMS',
//   description: 'Onboarding',
// }

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={lora.className}>
        <Provider store={store}>
          <UseDataFetch>
            {children}
          </UseDataFetch>
        </Provider>
      </body>
    </html>
  )
}
