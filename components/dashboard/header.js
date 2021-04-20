import VHead from '../head'
import style from '../../styles/dashboard/Header.module.scss'
import Link from 'next/link'
import Router from 'next/router'
import { useState, useEffect } from 'react'
import { getFetch, postFetch } from '../../tool'

export default function Header() {

  let [header, setHeader] = useState('')

  useEffect( async () => {
    const logged = await getFetch('/api/users/logged')
    if (logged.user) {
      setHeader(
        header = (
          <header className={style.header}>
            <div className={`${style.menubar} region`}>
              <div className={style.logo}>
                <Link href='/dashboard'><a> Dashboard </a></Link>
              </div>
              <form className={style.search}>
                <select name='options'>
                  <option>Post</option>
                  <option>Page</option>
                  <option>Category</option>
                  <option>User</option>
                </select>
                <input type='search' name='query' />
                <input type='submit' value='Search' />
              </form>
              <div className={style.logout}>
                <Link href='/'><a>Home</a></Link> | <a onClick={logout}>Logout</a>
              </div>
            </div>
          </header>
        )
      )
    } else {
      Router.push('/login')
    }
  })

  const logout = async () => {
    await postFetch('/api/users/logout', { method: "POST" })
    Router.push('/')
  }

  return(
    <div className={style.Header}>
      <VHead />
      {header}
    </div>
  )
}