import style from '../styles/Login.module.scss'
import Header from '../components/header'
import VHead from '../components/head'
import Footer from '../components/footer'

export default function Login() {
  const onSubmit = () => {
    alert()
  }

  return (
    <div className={style.Login}>
      <VHead />

      <header>
        <Header />
      </header>

      <div className={`${style.panel}`}>
        <img alt='' src='/images/background.jpg' />
        <form className={style.form} onSubmit={onSubmit}>
          <a>Email:</a><input type='email' name='email' required />
          <a>Password:</a><input type='password' name='password' required />
          <a></a><input type='submit' value='Submit' />
        </form>
      </div>

      <Footer />
    </div>
  )
}
