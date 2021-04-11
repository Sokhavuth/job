import style from '../styles/Header.module.scss'
import Link from 'next/link'
import Router from 'next/router'
import $ from 'jquery'

export default function Header(){
  let menuDropdown = false

  const openMobileMenu = () => {
    var x = document.getElementById('topmenu')
    if(menuDropdown){
      x.className = style.topnav
      menuDropdown = false
    }else{
      x.className += ' ' + style.responsive
      menuDropdown = true
    }
  }

  const loadingPage = (uri) => {
    if(Router.pathname !== uri)
      $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
  }

  return(
    <div className={style.Header}>
      <div className={`${style.menubar} region`}>
        <div className={style.logo}>
          <Link href='/'><a onClick={() => loadingPage('/') } >Khwebjob</a></Link>
        </div> 
        <div className={`${style.topnav} topnav`} id="topmenu">
          <Link href='/'><a onClick={() => loadingPage('/') } className={style.active}>Home</a></Link>
          <Link href='https://www.khmerweb.app/'><a>Learning</a></Link>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
          <a className={style.icon} onClick={openMobileMenu}>
            <i className="fa fa-bars"></i>
          </a>
        </div>
        <div className={style.login} ><Link href='/login'><a>Login</a></Link> | <Link href='/register'><a>Register</a></Link></div>
      </div>
    </div>
  )
}