import style from '../styles/Home.module.scss'
import Header from '../components/header'
import VHead from '../components/head'
import Panel from '../components/panel'
import Footer from '../components/footer'
import { getThumbUrl, postFetch } from '../tool'
import Link from 'next/link'
import { useState, useEffect} from 'react'
import $ from 'jquery'

function Home(props) {

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

  return (
    <div className={style.Home}>
      <VHead />

      <header>
        <Header />
      </header>

      <Panel categories={props.categories} />

      <div className={`${style.listing} region`} id='listing'>
        <div className={style.ad}>
          <img src='/images/ad.jpg' /><img src='/images/ad.jpg' />
        </div>
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
  const setting = require('../setting')
  const data = await require('./api/jobs/initiate')(setting.frontPagePostLimit)
  const _data = JSON.parse(data)
  const jobs = _data.jobs

  const dataCategory = await require('./api/categories/initial')()
  const _dataCategory = JSON.parse(dataCategory)
  const categories = _dataCategory.categories

  return { props: { 
      jobs,
      categories,
    } 
  }
}

export default Home