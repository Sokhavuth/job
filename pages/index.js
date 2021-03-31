import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        Welcome to Job Announcement Website!
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.khmerweb.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          &copy; 2021 by{' '}
          Khmer Web.
        </a>
      </footer>
    </div>
  )
}
