import style from '../../styles/dashboard/Sidebar.module.scss'
import Link from 'next/link'

export default function Sidebar() {

  return(
    <div className={`${style.Sidebar} region`}>
      <Link href="/dashboard"><a onClick={()=>showLoading('/dashboard')} ><img alt='' src='/images/posting.png' /></a></Link>
      <Link href="/dashboard"><a onClick={()=>showLoading('/dashboard')}>Posts</a></Link>
      <Link href="/dashboard/pages"><a onClick={()=>showLoading('/dashboard/pages')}><img  alt='' src='/images/paging.png' /></a></Link>
      <Link href="/dashboard/pages"><a onClick={()=>showLoading('/dashboard/pages')}>Pages</a></Link>
      <Link href="/dashboard/categories"><a onClick={()=>showLoading('/dashboard/categories')} ><img alt='' src='/images/category.png' /></a></Link>
      <Link href="/dashboard/categories"><a onClick={()=>showLoading('/dashboard/categories')} >Categories</a></Link>
      <Link href="/dashboard/upload"><a onClick={()=>showLoading('/dashboard/upload')}><img alt='' src='/images/upload.png' /></a></Link>
      <Link href="/dashboard/upload"><a onClick={()=>showLoading('/dashboard/upload')}>Upload</a></Link>
      <Link href="/dashboard/users"><a onClick={()=>showLoading('/dashboard/users')} ><img alt='' src='/images/user.png' /></a></Link>
      <Link href="/dashboard/users"><a onClick={()=>showLoading('/dashboard/users')} >Users</a></Link>
      <img alt='' src='/images/setting.png' /><a >Setting</a>
    </div>
  )
}