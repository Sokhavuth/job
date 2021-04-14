import style from '../../../styles/dashboard/Index.module.scss'
import Header from '../../../components/dashboard/header'
import Footer from '../../../components/footer'
import Sidebar from '../../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'
import $ from 'jquery'
import { postFetch, getThumbUrl } from '../../../tool'
import Router from 'next/router'
import Link from 'next/link'

const CKEditor = dynamic(
  () => import('../../../components/dashboard/ckeditor'),
  { ssr: false }
)

function Edit (props) {
  let ckeditor = null

  const getCKEditor = (editor) => {
    ckeditor = editor
    ckeditor.setData(props.job.content)
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

  const setDefaultCategories = () => {
    let categoryList = ''
    const categories = props.job.categories

    for (let v in categories){
      categoryList += categories[v] + ', '
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

  const setListing = (job) => {
    const listjobs = []
    const thumbs = getThumbUrl(props.categories, 'thumbObjUrl')
    
    
      listjobs.push(
        <li>
          <div>
            <Link href={`/job/${job.id}`}>
              <a><img alt='' src={thumbs[job['categories'][0]]} /></a>
            </Link>
          </div>
          <div className={style.title}>
            <Link href={`/job/${job.id}`}><a>{job.title}</a></Link>
            <div>Location: {job.location}</div>
            <div>Closing date: {new Date(job.enddate).toLocaleDateString()}</div>
          </div>
          <div className={style.edit}>
            <img onClick={ () => deleteJob(job.id) } alt='' src='/images/delete.png' />
          </div>
        </li>
      )

    return listjobs
    
  }

  const publish = async (event) => {
    $('#loadingImg').append("<img alt='' src='/images/loading.gif' />")
    event.preventDefault()
    
    const idHolder = props.job.id
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

          <div className={`${style.listing}`} id='listing'>
            <ul style={{gridTemplateColumns: '100%'}}>
              {setListing(props.job)}
            </ul>
          </div>

        </div>
        <div className={style.sidebar}>
          <form className={style.form} onSubmit={ publish }>
            <input type='text' name='jobTitle' defaultValue={props.job.title} required />
            <textarea name='categories' rows='4' 
            defaultValue={setDefaultCategories()} required >
            </textarea>
            <select id='category' className={style.categories} onChange={ getSelectCategory }>
              <option>Select categories from here</option>
              {setCategorries()}
            </select>
            <input type='text' name='location' defaultValue={props.job.location} required />
            <input type='text' name='payable' defaultValue={props.job.payable} required />
            <input type='datetime-local' name='postDate' defaultValue={props.postDateTime} />
            <input type='datetime-local' name='endDate' defaultValue={props.endDateTime} />
            <input type='text' name='link' defaultValue={props.job.link} required />
            <input type='submit' value='Publish' />
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  const id = context.query.pid
  const data = await require('../../api/jobs/read')(id)
  const job = JSON.parse( data.job )
  const countJobs = 1

  const dataCategory = await require('../../api/categories/initial')()
  const _dataCategory = JSON.parse(dataCategory)
  const categories = _dataCategory.categories
  const countCategories = _dataCategory.count

  const postDate = new Date(job.postdate)
  const date = postDate.toLocaleDateString('fr-CA')
  const time = postDate.toLocaleTimeString('it-IT')
  const postDateTime = date+'T'+time

  const endDate = new Date(job.enddate)
  const _date = endDate.toLocaleDateString('fr-CA')
  const _time = endDate.toLocaleTimeString('it-IT')
  const endDateTime = _date + 'T' + _time

  return { props: { 
      postDateTime,
      job,
      countJobs,
      
      endDateTime,
      categories,
      countCategories,
    } 
  }
}

export default Edit