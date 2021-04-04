import style from '../../styles/dashboard/Sidebar.module.scss'
import Link from 'next/link'

export default function Sidebar() {

  return(
    <div className={`${style.Sidebar} region`}>
      <Link href="/dashboard"><a ><img alt='' src='/images/posting.png' /></a></Link>
      <Link href="/dashboard"><a >Posts</a></Link>
      <Link href="/dashboard/pages"><a ><img  alt='' src='/images/paging.png' /></a></Link>
      <Link href="/dashboard/pages"><a >Pages</a></Link>
      <Link href="/dashboard/category"><a ><img alt='' src='/images/category.png' /></a></Link>
      <Link href="/dashboard/category"><a  >Categories</a></Link>
      <Link href="/dashboard/upload"><a ><img alt='' src='/images/upload.png' /></a></Link>
      <Link href="/dashboard/upload"><a >Upload</a></Link>
      <Link href="/dashboard/users"><a  ><img alt='' src='/images/user.png' /></a></Link>
      <Link href="/dashboard/users"><a >Users</a></Link>
      <img alt='' src='/images/setting.png' /><a >Setting</a>
    </div>
  )
}