import style from '../../styles/Home.module.scss'
import Header from '../../components/header'
import VHead from '../../components/head'
import Panel from '../../components/panel'
import Footer from '../../components/footer'
import { getThumbUrl } from '../../tool'
import Link from 'next/link'
import $ from 'jquery'
import { useEffect } from 'react'


function Search (props) {

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

  useEffect(() => {
    $('#loadingImg').html('')
  })

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

export default Search