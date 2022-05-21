import style from '../styles/Panel.module.scss'
import Router from 'next/router'
import $ from 'jquery'
import { useEffect } from 'react'

function Panel (props) {

  const genCategory = () => {
    const optionList = []
    const categories = props.categories

    for (let v in categories){
      optionList.push(
        <option>{categories[v].name}</option>
      )
    }

    return optionList
  }
  
  const onCategoryHandler = (event) => {
    let val = event.target.value
    $('#loadingImg').html('<img alt="" src="/images/loading.gif" />')
    Router.push(`/category/${val}`)
  }

  useEffect(() => {
    $('#loadingImg').html('')
  })

  const onSubmitHandler = (event) => {
    $('#loadingImg').html('<img alt="" src="/images/loading.gif" />')
    event.preventDefault()
    const q = $('#q').val()
    Router.push(`/search/${q}`)
  }

  return(
    <div className={style.Panel}>
      <div className={`${style.panel}`}>
        <img alt='' src='/images/background.jpg' />
        <div style={{clear: 'both'}}></div>
        <div className={style.wrapper}>
          <select onChange={onCategoryHandler} name='category' className={style.category}>
            <option>Categories</option>
            { genCategory() }
          </select>
          <form onSubmit={ onSubmitHandler }>
            <input id='q' type='text' placeholder='Search' name='q'  required />
            <input type='submit' value='Search' />
          </form>
        </div>
        <div className={style.loadingImg} id='loadingImg'></div>
      </div>
    </div>
  )
}

export default Panel