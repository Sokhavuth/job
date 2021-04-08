import style from '../../styles/dashboard/Index.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'
import Sidebar from '../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'
import $ from 'jquery'

const CKEditor = dynamic(
  () => import('../../components/dashboard/ckeditor'),
  { ssr: false }
)

function Job(props) {
  let ckeditor = null
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

  const publish = async (event) => {
    event.preventDefault()
    alert()
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
            <input type='text' name='payable' placeholder='Payable' required />
            <input type='text' name='location' placeholder='Location' required />
            <input type='datetime-local' name='postDate' defaultValue={props.postDateTime} />
            <input type='datetime-local' name='endDate' defaultValue={props.endDateTime} />
            <input type='text' name='link' placeholder='Link' required />
            <input type='submit' value='Publish' />
          </form>
        </div>
      </main>
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