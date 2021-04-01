import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from '../components/header'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Khmer Web Job</title>
        <link rel="icon" href="/images/site_logo.png" />
        <link rel='stylesheet' href='/fonts/setup.css' />
        <link rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        </link>
      </Head>

      <header>
        <Header />
      </header>

      <div className={`${styles.panel}`}>
        <img alt='' src='/images/background.jpg' />
      </div>

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
