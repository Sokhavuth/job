import style from '../../styles/dashboard/Category.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'
import Sidebar from '../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'
import $ from 'jquery'
import { postFetch, getFetch, getThumbUrl } from '../../tool'
import Router from 'next/router'
import Link from 'next/link'

const CKEditor = dynamic(
  () => import('../../components/dashboard/ckeditor'),
  { ssr: false }
)

function Category(props) {
  let ckeditor = null
  let idHolder = null

  const getCKEditor = (editor) => {
    ckeditor = editor
  }
  
  const setListing = () => {
    const listCategories = []
    const categories = props.categories
    const thumbs = getThumbUrl(categories)
    for (let v in categories){
        listCategories.push(
        <li>
          <div>
            <Link href={`/category/${categories[v].id}`}>
              <a><img alt='' src={thumbs[v]} /></a>
            </Link>
          </div>
          <div>
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
    const body = { id: id }
    var result = await postFetch('/api/categories/read', body)
    if (result.category.length > 0){
      idHolder = result.category[0].id
      $('[name=categoryName]').val(result.category[0].name)
      const dateTime_ = new Date(result.category[0].date)
      const date = dateTime_.toLocaleDateString('fr-CA')
      const time = dateTime_.toLocaleTimeString('it-IT')
      const dateTime = date+'T'+time
      $('[name=dateTime]').val(dateTime)
      ckeditor.setData(result.category[0].info)
    }
  }

  const deleteCategory = async (id) => {
    alert(id)
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
            <input type='submit' value='Submit' />
          </form>
        </div>
      </main>

      <div className={`${style.listing} region`}>
        <ul>{setListing()}</ul>
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