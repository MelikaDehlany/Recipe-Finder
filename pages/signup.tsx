import { useState } from "react"
import { useRouter } from "next/router"
import styles from "../styles/signup.module.css"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    if (!email || !password) {
      setError("Please fill in all fields.")
      return
    }
    setSuccess("registering...")
      localStorage.setItem("isLoggedIn", "true")
    setTimeout(() => {
        window.location.href = "/"
    }, 1000) 
  }

  return (
    <div className={styles.signupBg}>
      <form className={styles.signupForm} onSubmit={handleSubmit}>
        <h2 className={styles.signupTitle}>Sign Up / Login</h2>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className={styles.signupInput}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className={styles.signupInput}
        />
        <button type="submit" className={styles.signupButton}>
          submit
        </button>
        {error && <div className={styles.signupError}>{error}</div>}
        {success && <div className={styles.signupSuccess}>{success}</div>}
      </form>
    </div>
  )
}