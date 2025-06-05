import { useEffect, useState } from "react"
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
    window.location.reload()
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <Link href="/" className={styles.navbarLogo}>
          RecipeFinder
        </Link>
        <div className={styles.navbarLinks}>
          <Link href="/" className={styles.navbarLink}>Home</Link>
          <Link href="/favorites" className={styles.navbarLink}>Favorites</Link>
          {isLoggedIn ? (
            <button className={styles.navbarButton} onClick={handleLogout}>
              log out
            </button>
          ) : (
            <Link href="/signup" className={styles.navbarButton}>
              Sign up / Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}