import style from '../../styles/dashboard/Sidebar.module.scss'
import Link from 'next/link'
import $ from 'jquery'
import Router from 'next/router'

export default function Sidebar() {

  const loadingPage = (uri) => {
    if(Router.pathname !== uri)
      $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
  }

  return(
    <div className={`${style.Sidebar} region`}>
      <Link href="/dashboard"><a onClick={() => loadingPage('/dashboard') }><img alt='' src='/images/posting.png' /></a></Link>
      <Link href="/dashboard"><a onClick={ () => loadingPage('/dashboard') }>Posts</a></Link>
      <Link href="/dashboard/pages"><a onClick={ () => loadingPage('/dashboard/pages') }><img  alt='' src='/images/paging.png' /></a></Link>
      <Link href="/dashboard/pages"><a onClick={ () => loadingPage('/dashboard/pages') }>Pages</a></Link>
      <Link href="/dashboard/category"><a onClick={ () => loadingPage('/dashboard/category') }><img alt='' src='/images/category.png' /></a></Link>
      <Link href="/dashboard/category"><a  onClick={ () => loadingPage('/dashboard/category') }>Categories</a></Link>
      <Link href="/dashboard/upload"><a onClick={ () => loadingPage('/dashboard/upload') }><img alt='' src='/images/upload.png' /></a></Link>
      <Link href="/dashboard/upload"><a onClick={ () => loadingPage('/dashboard/upload') }>Upload</a></Link>
      <Link href="/dashboard/users"><a  onClick={ () => loadingPage('/dashboard/users') }><img alt='' src='/images/user.png' /></a></Link>
      <Link href="/dashboard/users"><a onClick={ () => loadingPage('/dashboard/users') }>Users</a></Link>
      <img alt='' src='/images/setting.png' /><a >Setting</a>
    </div>
  )
}