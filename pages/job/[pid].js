import style from '../../styles/Job.module.scss'
import Header from '../../components/header'
import VHead from '../../components/head'
import Footer from '../../components/footer'
import ReactHtmlParser from 'html-react-parser'
import { DiscussionEmbed } from 'disqus-react'
import { getThumbUrl } from '../../tool'
import $ from 'jquery'
import Link from 'next/link'

function Job(props) {

  const genContent = () => {
    let categories = []
    const job = JSON.parse(props.job)

    for (let v in job.categories){
      categories.push(`${job.categories[v]}, `)
    }

    const post = (
      <div>
        <div className={style.title}>{job.title}</div>

        <div className={style.payable}>
          <span>{job.payable}</span>
          <span className={style.date}>Closing date: {(new Date(job.enddate)).toLocaleDateString()}</span>
          <div>Location: {job.location}</div>
        </div>

        <div className={style.body}>{ReactHtmlParser(job.content)}</div>
        <div>
          <span className={style.wrapper}>
            Skills needed: <span className={style.categories}>{categories}</span>
          </span>
          <span className={style.bid}><a href={job.link} target='_blank'>Bid now</a></span>
        </div>

        <DiscussionEmbed
          shortname='khmerweb'
          config={
            {
              url: `https://job-ten.vercel.app/job/${job.id}`,
              identifier: job.id,
              title: job.title,
              language: 'en_US' 
            }
          }
        />

      </div>
    )

    return post
  }

  const loadingJob = (event) => {
    $(event.currentTarget).find('.loadingImg').html('<img alt="" src="/images/loading.gif" />')
  }

  const genRandomJob = () => {
    const jobList = []
    const jobs = props.randomJobs
    const thumbs = getThumbUrl(props.categories, 'thumbObjUrl')

    for (let v in jobs){
      jobList.push(
        <li onClick={loadingJob}>
          <div className={style.thumbOuter}>
            <Link href={`/job/${jobs[v].id}`} ><a><img alt='' src={thumbs[jobs[v].categories[0]]} /></a></Link>
            <div className={`${style.loadingImg} loadingImg`}></div>
          </div>
          <Link href={`/job/${jobs[v].id}`}>
          <a className={style.content}>
            <Link href={`/job/${jobs[v].id}`} ><a>{jobs[v].title}</a></Link>
            <a className={style.properties}>
              <div>{jobs[v].payable}</div>
              <div>Closing date: {new Date(jobs[v].enddate).toLocaleDateString()}</div>
            </a>
          </a>
          </Link>
        </li>
      )
    }

    $('li').find('.loadingImg').html('')
    return jobList
    
  }

  return(
    <div className={style.Job}>
      <VHead />

      <header>
        <Header />
      </header>

      <div className={`${style.panel}`}>
        <img alt='' src='/images/background.jpg' />
        <div style={{clear: 'both'}}></div>
        <div className={style.loadingImg} id='loadingImg'></div>
      </div>

      <main className={`${style.main} region`}>
        <div className={style.content}>
          { genContent() }
        </div>
        <div className={`${style.sidebar} sidebar`}>
          <ul>
          { genRandomJob() }
          </ul>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const getJob = require('../api/jobs/read')
  const result = await getJob(context.query.pid)
  const job = result.job

  const setting = require('../../setting')
  const _randomJobs = await require('../api/jobs/random')(setting.randomJobLimit)
  const randomJobs = JSON.parse(_randomJobs)
  
  const dataCategory = await require('../api/categories/initial')()
  const _dataCategory = JSON.parse(dataCategory)
  const categories = _dataCategory.categories
  
  return {
    props: {
      job,
      randomJobs,
      categories,
    }
  }
  
}

export default Job