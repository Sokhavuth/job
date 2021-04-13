import style from '../../styles/Home.module.scss'
import Header from '../../components/header'
import VHead from '../../components/head'
import Panel from '../../components/panel'
import Footer from '../../components/footer'
import { getThumbUrl, postFetch } from '../../tool'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import $ from 'jquery'


function Category(props) {

  const loadingJob = (event) => {
    $(event.currentTarget).find('.loadingImg').html('<img alt="" src="/images/loading.gif" />')
  }

  const setListing = (jobs) => {
    const listjobs = []
    const thumbs = getThumbUrl(props.categories, 'thumbObjUrl')
    
    for (let v in jobs){
      listjobs.push(
        <li onClick={loadingJob}>
          <div className={style.thumbOuter}>
            <Link href={`/job/${jobs[v].id}`}>
              <a><img alt='' src={thumbs[jobs[v]['categories'][0]]} /></a>
            </Link>
            <div className={`${style.loadingImg} loadingImg`}></div>
          </div>
          <div className={style.content}>
            <Link href={`/job/${jobs[v].id}`}><a>{jobs[v].title}</a></Link>
            <Link href={`/job/${jobs[v].id}`}>
              <a className={style.properties}>
                <div>{jobs[v].payable}</div>
                <div>Location: {jobs[v].location}</div>
                <div>Closing date: {new Date(jobs[v].enddate).toLocaleDateString()}</div>
              </a>
            </Link>
          </div>
        </li>
      )
    }
    return listjobs
    
  }
/*
  const [navJobs, setNavJobs] = useState([])
  const [page, setPage] = useState(1)

  const navigate = async () => {
    $('#paginate img').attr('src', '/images/loading.gif' )
    setPage(page + 1)
    const body = { page: page, name: props.name }
    
    var result = await postFetch('/api/jobs/navigate', body)
    
    if (result.jobs.length > 0) {
      const jobs = setListing(result.jobs)
      setNavJobs(navJobs.concat(jobs))
    }
    
    $('#paginate img').attr('src', '/images/load-more.png' )
  }

  useEffect(() => {
    setNavJobs([])
    setPage(1)
  },[props.jobs])
*/  
  return (
    <div className={style.Home}>
      <VHead />

      <header>
        <Header />
      </header>

      <Panel categories={props.categories} />

      <div className={`${style.listing} region`} >
        <ul id='listing'>
          {setListing(props.jobs)}
        </ul>
      </div>

      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const setting = require('../../setting')
  const q = context.query.pid
  const data = await require('../api/jobs/search')(setting.frontPagePostLimit, q)
  const jobs = JSON.parse(data)

  const dataCategory = await require('../api/categories/initial')()
  const _dataCategory = JSON.parse(dataCategory)
  const categories = _dataCategory.categories

  return { props: { 
      q,
      jobs,
      categories,
    } 
  }
}

export default Category