import style from '../../styles/dashboard/Index.module.scss'
import Header from '../../components/dashboard/header'
import Footer from '../../components/footer'

export default function Index() {


  return(
    <div className={ style.Index}>
      <Header />

      <Footer />
    </div>
  )
}