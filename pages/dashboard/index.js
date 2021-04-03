import style from '../../styles/dashboard/Index.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'
import Sidebar from '../../components/dashboard/sidebar'
import dynamic from 'next/dynamic'

const CKEditor = dynamic(
  () => import('../../components/dashboard/ckeditor'),
  { ssr: false }
)

export default function Index() {
  let ckeditor = null
  const getCKEditor = (editor) => {
    ckeditor = editor
    
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
        </div>
        <div className={style.sidebar}></div>
      </main>
      <Footer />
    </div>
  )
}