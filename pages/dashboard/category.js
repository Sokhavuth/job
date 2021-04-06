import style from '../../styles/dashboard/Category.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'
import Sidebar from '../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'
import $ from 'jquery'
import { postFetch, getThumbUrl } from '../../tool'
import Router from 'next/router'
import Link from 'next/link'
import { useState } from 'react'

const CKEditor = dynamic(
  () => import('../../components/dashboard/ckeditor'),
  { ssr: false }
)

function Category(props) {
  let ckeditor = null
  const getCKEditor = (editor) => {
    ckeditor = editor
  }

  const setListing = () => {
    const listCategoriesOdd = []
    const listCategoriesEvent = []
    const categories = JSON.parse(props.categories)
    const thumbs = getThumbUrl(categories)

    for (let v in categories){
      if (v % 2 == 0){
        listCategoriesOdd.push(
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
              <img alt='' src='/images/edit.png' />
              <img alt='' src='/images/delete.png' />
            </div>
        </li>
      )
      } else {
        listCategoriesEvent.push(
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
              <img alt='' src='/images/edit.png' />
              <img alt='' src='/images/delete.png' />
          </div>
        </li>
        )
      }
    }

    return [ listCategoriesOdd, listCategoriesEvent ]
    
  }

  const postCategory = async (event) => {
    event.preventDefault()
    const categoryName = $('[name=categoryName]').val()
    const dateTime = $('[name=dateTime]').val()
    const info = ckeditor.getData()
    const body = { categoryName: categoryName, dateTime: dateTime, info: info }
    const result = await postFetch('/api/categories/create', body)
    if(result.category){
      Router.reload()
    }
  }

  return(
    <div className={ style.Category}>
      <Header />
      
      <main className={`${style.main} region`}>
        <div className={style.sidebar}>
          <Sidebar />
        </div>

        <div className={style.content} id='content' >
          <CKEditor getCKEditor={getCKEditor} />
        </div>
        <div className={style.sidebar}>
          <form className={style.props} onSubmit={postCategory}>
            <input type='text' placeholder='Category name' name='categoryName' required />
            <input type='datetime-local' defaultValue={props.dateTime} name='dateTime' required />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </main>

      <div className={`${style.listing} region`}>
        <div className={style.odd}><ul>{setListing()[0]}</ul></div>
        <div className={style.event}><ul>{setListing()[1]}</ul></div>
      </div>

      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const categories = await require('../api/categories/initial')(10)
  
  const today = new Date()
  const date = today.toLocaleDateString('fr-CA')
  const time = today.toLocaleTimeString('it-IT')
  const dateTime = date+'T'+time
    
  return { props: { 
      dateTime,
      categories,
    } 
  }
}

export default Category