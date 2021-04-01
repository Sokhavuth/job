import style from '../styles/Header.module.scss'
import Link from 'next/link'

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

  return(
    <div className={style.Header}>
      <div className={`${style.menubar} region`}>
        <div className={style.logo}><Link href='/'><a>Khwebjob</a></Link></div> 
        <div className={`${style.topnav} topnav`} id="topmenu">
          <Link href=''><a href="#home" className={style.active}>Home</a></Link>
          <a href="#contact">Contact</a>
          <a href="#about">About</a>
          <a href="javascript:void(0);" className={style.icon} onClick={openMobileMenu}>
            <i class="fa fa-bars"></i>
          </a>
        </div>
        <div className={style.login} ><Link href='/login'><a>Login</a></Link></div>
      </div>
    </div>
  )
}