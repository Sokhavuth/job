import style from '../../styles/dashboard/Category.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'
import Sidebar from '../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'
import $ from 'jquery'
import { postFetch, getFetch, getThumbUrl } from '../../tool'
import Router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

const CKEditor = dynamic(
  () => import('../../components/dashboard/ckeditor'),
  { ssr: false }
)

function Category(props) {
  
  const [ ckeditor, setCkeditor ] = useState(null)
  const [ idHolder, setIdHolder ] = useState(null)

  const getCKEditor = (editor) => {
    setCkeditor(editor)
  }

  const [navCategories, setNavCategories] = useState([])
  
  const setListing = (categories) => {
    const listCategories = []
    const thumbs = getThumbUrl(categories)
    for (let v in categories){
        listCategories.push(
        <li>
          <div>
            <Link href={`/category/${categories[v].id}`}>
              <a><img alt='' src={thumbs[v]} /></a>
            </Link>
          </div>
          <div className={style.title}>
            <Link href={`/category/${categories[v].id}`}><a>{categories[v].name}</a></Link>
            <div>{new Date(categories[v].date).toLocaleDateString()}</div>
          </div>
          <div className={style.edit}>
            <img onClick={ () => editCategory(categories[v].id) } alt='' src='/images/edit.png' />
            <img onClick={ () => deleteCategory(categories[v].id) } alt='' src='/images/delete.png' />
          </div>
        </li>
      )
    }

    return listCategories
    
  }

  const postCategory = async (event) => {
    $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
    event.preventDefault()
    const categoryName = $('[name=categoryName]').val()
    const dateTime = $('[name=dateTime]').val()
    const info = ckeditor.getData()
    const body = { id: idHolder, categoryName: categoryName, dateTime: dateTime, info: info }
    const logged = await getFetch('/api/users/logged')
    if( logged.user.role === 'Admin' ){
      var result = await postFetch('/api/categories/create', body)
    } else {
      alert('Only the Administator could create category.')
    }
      
    if(result){
      Router.reload()
    }
  }

  const editCategory = async (id) => {
    $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
    const body = { id: id }
    var result = await postFetch('/api/categories/read', body)
    if (result.category.length > 0){
      setIdHolder(result.category[0].id)
      $('[name=categoryName]').val(result.category[0].name)
      const dateTime_ = new Date(result.category[0].date)
      const date = dateTime_.toLocaleDateString('fr-CA')
      const time = dateTime_.toLocaleTimeString('it-IT')
      const dateTime = date+'T'+time
      $('[name=dateTime]').val(dateTime)
      ckeditor.setData(result.category[0].info)
      $('#loadingImg').html("")
    }
  }

  const deleteCategory = async (id) => {
    $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
    const body = { id: id }

    const logged = await getFetch('/api/users/logged')
    if( logged.user.role === 'Admin' ){
      var result = await postFetch('/api/categories/delete', body)
    } else {
      alert('Only the Administator could delete category.')
    }

    if(result){
      Router.reload()
    }
  }

  const [page, setPage] = useState(1)

  const navigate = async () => {
    $('#paginate img').attr('src', '/images/loading.gif' )
    setPage(page + 1)
    const body = { page: page }
    var result = await postFetch('/api/categories/navigate', body)
    
    if (result.categories.length > 0) {
      const categories = setListing(result.categories)
      setNavCategories(navCategories.concat(categories))
    }
    $('#paginate img').attr('src', '/images/load-more.png' )
  }

  return(
    <div className={ style.Category}>
      <Header />
      
      <main className={`${style.main} region`}>
        <div className={style.sidebar}>
          <Sidebar  />
        </div>

        <div className={style.content} id='content' >
          <CKEditor getCKEditor={getCKEditor} />
          <div className={style.loadingImg} id='loadingImg'></div>
          <div className={style.status}>Total amount of category: {props.count}</div>
        </div>
        <div className={style.sidebar}>
          <form className={style.props} onSubmit={postCategory}>
            <input type='text' placeholder='Category name' name='categoryName' required />
            <input type='datetime-local' defaultValue={props.dateTime} step='1' name='dateTime' required />
            <input type='submit' value='Publish' />
          </form>
        </div>
      </main>

      <div className={`${style.listing} region`} id='listing'>
        <ul>
          {setListing(props.categories)}
          {navCategories}
        </ul>
        <div className={style.paginate} id='paginate'>
          <img onClick={ navigate } alt='' src='/images/load-more.png' />
        </div>
      </div>

      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const setting = require('../../setting')
  const data = await require('../api/categories/initial')(setting.dashboardPostLimit)
  const _data = JSON.parse(data)
  const categories = _data.categories
  const count = _data.count
  const today = new Date()
  const date = today.toLocaleDateString('fr-CA')
  const time = today.toLocaleTimeString('it-IT')
  const dateTime = date+'T'+time
  return { props: { 
      dateTime,
      categories,
      count, 
    } 
  }
}

export default Category