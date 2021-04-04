import style from '../../styles/dashboard/Category.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'
import Sidebar from '../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'

const CKEditor = dynamic(
  () => import('../../components/dashboard/ckeditor'),
  { ssr: false }
)

export default function Category(props) {
  let ckeditor = null
  const getCKEditor = (editor) => {
    ckeditor = editor
    
  }

  const getDateTime = () => {
    const today = new Date()
    const date = today.toLocaleDateString('fr-CA')
    const time = today.toLocaleTimeString('it-IT')
    const dateTime = date+'T'+time
    return dateTime
  }
  
  const postCategory = () => {
    alert()
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
            <input type='datetime-local' value={getDateTime()} name='datetime' required />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}