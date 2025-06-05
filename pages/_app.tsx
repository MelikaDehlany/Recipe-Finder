import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { FavoritesProvider } from '../context/FavoritesContext'
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import '../styles/Home.module.css'
import Head from 'next/head'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
  
    <SessionProvider session={session}>
      <FavoritesProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-content">
            <Component {...pageProps} />
          </main>
          <footer className="app-footer">
            <p>© 2023 Recipe Finder</p>
          </footer>
        </div>
      </FavoritesProvider>
    </SessionProvider>
  )
}

export default MyApp