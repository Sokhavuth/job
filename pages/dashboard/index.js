import style from '../../styles/dashboard/Index.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'
import Sidebar from '../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'
import $ from 'jquery'
import { postFetch, getFetch, getThumbUrl } from '../../tool'
import Router from 'next/router'
import { useState } from 'react'
import Link from 'next/link'

const CKEditor = dynamic(
  () => import('../../components/dashboard/ckeditor'),
  { ssr: false }
)

function Job(props) {
  let ckeditor = null
  let idHolder = null

  const getCKEditor = (editor) => {
    ckeditor = editor
  }

  const setCategorries = () => {
    const categoryList = []
    const categories = props.categories

    for (let v in categories){
      categoryList.push(
        <option>{categories[v].name}</option>
      )
    }
    
    return categoryList
  }

  const getSelectCategory = () => {
    const category = $('#category option:selected').text()
    $('select').prop('selectedIndex',0)
    let categories = $('[name=categories]').val()
    categories += (category + ', ')
    $('[name=categories]').val(categories)
  }
  
  const setListing = (jobs) => {
    const listjobs = []
    const thumbs = getThumbUrl(props.categories, 'thumbObjUrl')
    
    for (let v in jobs){
      listjobs.push(
        <li>
          <div>
            <Link href={`/job/${jobs[v].id}`}>
              <a><img alt='' src={thumbs[jobs[v]['categories'][0]]} /></a>
            </Link>
          </div>
          <div className={style.title}>
            <Link href={`/job/${jobs[v].id}`}><a>{jobs[v].title}</a></Link>
            <div>{new Date(jobs[v].enddate).toLocaleDateString()}</div>
          </div>
          <div className={style.edit}>
            <img onClick={ () => editJob(jobs[v].id) } alt='' src='/images/edit.png' />
            <img onClick={ () => deleteJob(jobs[v].id) } alt='' src='/images/delete.png' />
          </div>
        </li>
      )
    }

    return listjobs
    
  }

  const publish = async (event) => {
    $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
    event.preventDefault()

    const title = $('[name=jobTitle]').val()
    const categories = $('[name=categories]').val()
    const payable = $('[name=payable]').val()
    const location = $('[name=location]').val()
    const postDate = $('[name=postDate]').val()
    const endDate = $('[name=endDate]').val()
    const link = $('[name=link]').val()
    const content = ckeditor.getData()

    const body = { id: idHolder, title: title, categories: categories, payable: payable, 
      location: location, postDate: postDate, endDate: endDate, link: link, content: content }

    var result = await postFetch('/api/jobs/create', body)

    if(result.job){
      Router.reload()
    }
  }

  const [navJobs, setNavJobs] = useState([])
  const [page, setPage] = useState(1)

  const navigate = async () => {
    $('#paginate img').attr('src', '/images/loading.gif' )
    setPage(page + 1)
    const body = { page: page }
    var result = await postFetch('/api/jobs/navigate', body)
    
    if (result.jobs.length > 0) {
      const jobs = setListing(result.jobs)
      setNavJobs(navJobs.concat(jobs))
    }
    $('#paginate img').attr('src', '/images/load-more.png' )
  }

  const editJob = (id) => {
    $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
    Router.push(`/dashboard/job/edit/${id}`)
  }

  const deleteJob = async (id) => {
    $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
    const body = {id: id}
    var result = await postFetch('/api/jobs/delete', body)
    if(result){
      Router.reload()
      
    }
  }
  
  return(
    <div className={ style.Index}>
      <Header />
      
      <main className={`${style.main} region`}>
        <div className={style.sidebar}>
          <Sidebar />
        </div>

        <div className={style.content} id='content' >
          <CKEditor getCKEditor={getCKEditor} />
          <div className={style.loadingImg} id='loadingImg'></div>
          <div className={style.status}>Total amount of job: {props.countJobs}</div>
        </div>
        <div className={style.sidebar}>
          <form className={style.form} onSubmit={ publish }>
            <input type='text' name='jobTitle' placeholder='Job title' required />
            <textarea name='categories' rows='4' 
            placeholder='Select categories from dropdown list below' required >
            </textarea>
            <select id='category' className={style.categories} onChange={ getSelectCategory }>
              <option>Select categories from here</option>
              {setCategorries()}
            </select>
            <input type='text' name='location' placeholder='Location' required />
            <input type='text' name='payable' placeholder='Payable' required />
            <input type='datetime-local' name='postDate' defaultValue={props.postDateTime} />
            <input type='datetime-local' name='endDate' defaultValue={props.endDateTime} />
            <input type='text' name='link' placeholder='Link' required />
            <input type='submit' value='Publish' />
          </form>
        </div>
      </main>

      <div className={`${style.listing} region`} id='listing'>
        <ul>
          {setListing(props.jobs)}
          {navJobs}
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
  const data = await require('../api/jobs/initiate')(setting.dashboardPostLimit)
  const _data = JSON.parse(data)
  const jobs = _data.jobs
  const countJobs = _data.count

  const dataCategory = await require('../api/categories/initial')()
  const _dataCategory = JSON.parse(dataCategory)
  const categories = _dataCategory.categories
  const countCategories = _dataCategory.count

  const today = new Date()
  const date = today.toLocaleDateString('fr-CA')
  const time = today.toLocaleTimeString('it-IT')
  const postDateTime = date+'T'+time

  const second = 1000
  const minute = second * 60
  const hour = minute * 60
  const day = hour * 24

  const endDate = new Date(today.getTime() + day * 6)
  const _date = endDate.toLocaleDateString('fr-CA')
  const _time = endDate.toLocaleTimeString('it-IT')
  const endDateTime = _date + 'T' + _time

  return { props: { 
      postDateTime,
      jobs,
      countJobs,
      
      endDateTime,
      categories,
      countCategories,
    } 
  }
}

export default Job