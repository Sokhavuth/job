import style from '../styles/Home.module.scss'
import Header from '../components/header'
import VHead from '../components/head'
import Footer from '../components/footer'

export default function Home() {
  return (
    <div className={style.Home}>
      <VHead />

      <header>
        <Header />
      </header>

      <div className={`${style.panel}`}>
        <img alt='' src='/images/background.jpg' />
      </div>

      <Footer />
    </div>
  )
}
