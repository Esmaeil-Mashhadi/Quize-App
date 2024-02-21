'use client'
import styles from './GameSetting.module.css'
import { AiFillWarning } from "react-icons/ai";
import { PiArrowFatLineRightFill } from "react-icons/pi";


import { useEffect, useState } from 'react'
import Entertainment from '../modules/Entertainment'
import Science from '../modules/Science'
import General from '../modules/General'
import Difficulty from '../modules/Difficulty'
import QuestionType from '../modules/QuestionType'
import QuestionNumber from '../modules/QuestionNumber'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getOptions, reset } from '@/utils/reducers'
import { dynamicStyles } from '@/utils/dynamicStyles'
import { useRouter } from 'next/navigation'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'


 function GameSetting({user , quizOptions}) {

 const {originalStyle , hoverStyle, notSelectedStyle , selectedStyle} = dynamicStyles
  const [style , setStyle] = useState(originalStyle)

  const router = useRouter()
  const handleMouseEnter = (e)=>{
      setStyle({
         name : e.target.dataset.name ,
          ...hoverStyle
      })
  }

  const handleMouseLeave = ()=>{
    setStyle(originalStyle)
  }

  const categoryHandler  = (code)=>{
    dispatch(addCategory(code))
  }

  const resetHandler = ()=>{
    dispatch(reset())
    router.refresh()
  }

  const {category , amount , type , difficulty}= useSelector(states =>  states.quizeStore)

   useEffect(()=>{
    if(quizOptions){
      dispatch(getOptions(quizOptions))
    }
   },[])

  const submitHandler = async()=>{
     const res = await fetch("/api/quiz"  , {
      method:"POST" , body :JSON.stringify({category , amount , type , difficulty , user : user?.email}) , headers :{"Content-Type" :"application/json"}
     })
     const result = await res.json()
     if(result.status == "success"){
      toast.success(result.message)
      router.refresh()
     }else{
      toast.error(result.message)
     }
  }

  const dispatch = useDispatch()

  return (
    <> 
    {user?.currentQuiz?.length ? <div className={styles.unfinish}>
      <p><AiFillWarning /> You have an unfinished quiz. Please complete the quiz for gameSetting before proceeding <AiFillWarning /> </p>  
      <Link href="/quiz/start">Finish the quiz <PiArrowFatLineRightFill/></Link>
      
      </div> 
      
      : 
    <div className={styles.container}>
      <div className={styles.categoryContainer}>
        <h3>quiz Category</h3>
            <div className={styles.category}>
  
                      <General selectedStyle ={selectedStyle} notSelectedStyle = {notSelectedStyle} category = {category}  categoryHandler = {categoryHandler} dispatch = {dispatch}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
                         style ={style} originalStyle = {originalStyle} />

                     <Entertainment selectedStyle = {selectedStyle} notSelectedStyle  ={notSelectedStyle} category  = {category} categoryHandler = {categoryHandler}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
                      style ={style} originalStyle = {originalStyle}/>

                      <Science selectedStyle={selectedStyle} notSelectedStyle={notSelectedStyle}  category = {category} categoryHandler = {categoryHandler}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
                      style ={style} originalStyle = {originalStyle} />

            </div>
      </div>
        

      <div className={styles.optionsContainer}>
          <h3>quiz options</h3>

       <div className={styles.options}>
        
        <Difficulty  difficulty= {difficulty} selectedStyle ={selectedStyle} notSelectedStyle = {notSelectedStyle} dispatch ={dispatch} name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
        style ={style} originalStyle = {originalStyle}/>

        <QuestionType  type ={type}  selectedStyle = {selectedStyle} notSelectedStyle = {notSelectedStyle} dispatch ={dispatch}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
        style ={style} originalStyle = {originalStyle} />

        <QuestionNumber  amount = {amount} dispatch ={dispatch}  name = {style.name} handleMouseLeave ={handleMouseLeave}  handleMouseEnter  = {handleMouseEnter}  
        style ={style} originalStyle = {originalStyle}/>

      </div>

    </div>
          <div className={styles.buttonsContainer}>
              <button onClick={submitHandler}>submit changes</button>
              <button onClick={resetHandler}>reset to default</button>
          </div>

    </div>
  }
    </>

  )
}

export default GameSetting