import style from '../../styles/dashboard/Category.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'
import Sidebar from '../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'
import $ from 'jquery'
import { postFetch } from '../../tool'
import Router from 'next/router'

const CKEditor = dynamic(
  () => import('../../components/dashboard/ckeditor'),
  { ssr: false }
)

function Category(props) {
  let ckeditor = null
  const getCKEditor = (editor) => {
    ckeditor = editor
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
      <Footer />
    </div>
  )
}

export async function getServerSideProps() {
  const today = new Date()
  const date = today.toLocaleDateString('fr-CA')
  const time = today.toLocaleTimeString('it-IT')
  const dateTime = date+'T'+time
    
  return { props: { 
      dateTime,
    } 
  }
}

export default Category