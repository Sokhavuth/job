import style from '../../styles/Job.module.scss'
import Header from '../../components/header'
import VHead from '../../components/head'
import Footer from '../../components/footer'
import ReactHtmlParser from 'html-react-parser'
import { DiscussionEmbed } from 'disqus-react'

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

  const setting = require('../../setting')
  const randomJobs = await require('../api/jobs/random')(setting.randomJobLimit)
  
  return {
    props: {
      job,
      randomJobs,
    }
  }
  
}

export default Job