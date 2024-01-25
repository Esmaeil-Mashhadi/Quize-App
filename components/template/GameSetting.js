'use client'
import Link from 'next/link'
import styles from './GameSetting.module.css'
import { useState } from 'react'
import Entertainment from '../modules/Entertainment'
import Science from '../modules/Science'
import General from '../modules/General'
import Difficulty from '../modules/Difficulty'
import QuestionType from '../modules/QuestionType'
import QuestionNumber from '../modules/QuestionNumber'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { addCategory } from '@/utils/reducers'


function GameSetting() {

  const originalStyle = {
    '--opacity' : 0,
    '--transform' : "translateX(50px)",
    '--pointer' : "none"
  }

  const [style , setStyle] = useState(originalStyle)
  const handleMouseEnter = (e)=>{
      setStyle({
         name : e.target.dataset.name ,
        '--opacity' : 1, 
        "--transform" : "translate(0px)",
        '--pointer' :"all"
      })
    
  }

  const handleMouseLeave = ()=>{
    setStyle({
      '--opacity' : 0, 
      '--transform' :"translate(50px)",
      '--pointer': "none"
    })
  }

  const categoryHandler  = (code)=>{
    dispatch(addCategory(code))
  }

  const dispatch = useDispatch()
  const store = useSelector(state =>  console.log(state))

  return (
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <h3>Quize Category</h3>
            <div className={styles.category}>
  
                      <General categoryHandler = {categoryHandler} dispatch = {dispatch} name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
                         style ={style} originalStyle = {originalStyle} />

                     <Entertainment categoryHandler = {categoryHandler}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
                      style ={style} originalStyle = {originalStyle}/>

                      <Science categoryHandler = {categoryHandler}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
                      style ={style} originalStyle = {originalStyle} />



            </div>
      </div>
        

      <div className={styles.optionsContainer}>
          <h3>Quize options</h3>

       <div className={styles.options}>
        
        <Difficulty dispatch ={dispatch} name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
        style ={style} originalStyle = {originalStyle}/>

        <QuestionType dispatch ={dispatch}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
        style ={style} originalStyle = {originalStyle} />

        <QuestionNumber dispatch ={dispatch}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
        style ={style} originalStyle = {originalStyle}/>

      </div>

    </div>
          <div className={styles.buttonsContainer}>
              <button>submit changes</button>
              <button>reset to default</button>
          </div>
    </div>

  )
}

export default GameSetting