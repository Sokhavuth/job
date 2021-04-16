import style from '../styles/Login.module.scss'
import Header from '../components/header'
import VHead from '../components/head'
import Footer from '../components/footer'
import { postFetch, getFetch } from '../tool'
import $ from 'jquery'
import { useState, useEffect } from 'react'
import Router from 'next/router'

export default function Login() {
  let [form, setForm] = useState('')

  useEffect( async () => {
    const logged = await getFetch('/api/users/logged')
    if (logged.user) {
      Router.push('/dashboard')
    } else {
      setForm(
        form = (
          <div className={`${style.panel}`}>
            <img alt='' src='/images/background.jpg' />
            <form className={style.form} onSubmit={onSubmitHandler} method='post'>
              <a>Email:</a><input id='email' type='email' name='email' required />
              <a>Password:</a><input id='password' type='password' name='password' required />
              <a></a><input type='submit' value='Submit' />
              <a></a><div className={style.message} id='message'></div>
            </form>
            <div className={`${style.loadingImg} loadingImg`}></div>
          </div>
        )
      )
    }
  })

  const onSubmitHandler = async (event) => {
    $('.loadingImg').append("<img alt='' src='/images/loading.gif' />")
    event.preventDefault()
    const email = $('#email').val()
    const password = $('#password').val()
    const result = await postFetch('/api/login', { email:email, password:password })
    
    if(result.user){
      Router.push('/dashboard')
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

      {form}

      <Footer />
    </div>
  )
}