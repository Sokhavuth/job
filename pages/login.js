import style from '../styles/Login.module.scss'
import Header from '../components/header'
import VHead from '../components/head'
import Footer from '../components/footer'
import { postFetch } from '../tool'
import $ from 'jquery'

export default function Login() {
  const onSubmitHandler = async (event) => {
    event.preventDefault()
    const email = $('#email').val()
    const password = $('#password').val()
    const result = await postFetch('/api/login', { email:email, password:password })

    if(result.data){
      alert(result.data._id)
    }else{
      $(`#message`).html(result.message)
    }
    
  }

  return (
    <div className={style.Login}>
      <VHead />

      <header>
        <Header />
      </header>

      <div className={`${style.panel}`}>
        <img alt='' src='/images/background.jpg' />
        <form className={style.form} onSubmit={onSubmitHandler} method='post'>
          <a>Email:</a><input id='email' type='email' name='email' required />
          <a>Password:</a><input id='password' type='password' name='password' required />
          <a></a><input type='submit' value='Submit' />
          <a></a><div className={style.message} id='message'></div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
