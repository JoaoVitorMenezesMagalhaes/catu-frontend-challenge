import Image from 'next/image'
import Home from './index'
import styles from './page.module.css'
import Link from 'next/link'

export default function Main() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}> SHOW DO MILHÃO </h1>
      <Link href='/quiz'>
      <button> Start Quiz </button>
      </Link>
    </main>
  )
}
