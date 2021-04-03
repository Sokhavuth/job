import VHead from '../head'
import style from '../../styles/dashboard/Header.module.scss'
import Link from 'next/link'
import { getFetch } from '../../tool'
import Router from 'next/router'

export default function Header() {

  const logout = async () => {
    await fetch('/api/users/logout', { method: "POST" })
    Router.push('/')
  }

  return(
    <div className={style.Header}>
      <VHead />

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
              <input type='submit' value='Submit' />
            </form>
            <div className={style.logout}>
              <a onClick={logout}>Logout</a>
            </div>
        </div>
      </header>
    </div>
  )
}