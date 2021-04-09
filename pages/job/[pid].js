import style from '../../styles/Job.module.scss'
import Header from '../../components/header'
import VHead from '../../components/head'
import Footer from '../../components/footer'
import ReactHtmlParser from 'html-react-parser'
import { getThumbUrl, postFetch } from '../../tool'
import Link from 'next/link'
import { useState } from 'react'
import $ from 'jquery'

function Job(props) {

  const job = JSON.parse(props.job)
  

  const genContent = () => {
    let categories = []

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
          Skills needed: <span className={style.categories}>{categories}</span>
          <span className={style.bid}><a href={job.link} target='_blank'>Bid now</a></span>
        </div>
      </div>
    )
    return post
  }
  

  return(
    <div className={style.Job}>
      <VHead />

      <header>
        <Header />
      </header>

      <div className={`${style.panel}`}>
        <img alt='' src='/images/background.jpg' />
      </div>

      <main className={`${style.main} region`}>
        <div className={style.content}>
          {genContent()}
        </div>
        <div className={style.sidebar}>
          Random jobs
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
  return {
    props: {
      job,
    }
  }
}

export default Job