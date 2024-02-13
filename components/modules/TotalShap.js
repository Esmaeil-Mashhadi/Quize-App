import { useEffect, useState } from 'react'
import styles from './TotalShape.module.css'
import { BsQuestionSquareFill } from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";
import { FaCalendarCheck } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { setTotalForAll } from '@/utils/setTotalForAll';



function TotalShape({userScore}) {
   
    const [number , setNumber] = useState(0)
    const [acc , setAcc] = useState(0)
    const [value , setValue] = useState('All')

    const [total , setTotal] = useState(()=>{
      const {totalCorrect , totalQuestions , totalScore} = setTotalForAll(userScore)
      return {category : "All", totalCorrect , totalQuestions , totalScore}
      setNumber(degree)
      setAcc(accuracy)
    })
    const [showList , setShowList] = useState(false)

   const {category , totalCorrect , totalQuestions , totalScore} = total
    const accuracy = `${Math.round((totalCorrect /totalQuestions )*100)}%`
    const degree = parseFloat(accuracy)/100 * 360 

    const accStyle = {
        '--deg' : `${number}deg`
    }

    const focusHandler = ()=>{
      setShowList(true)
      setValue("")
    }

    const catHandler = (e)=>{
       const chosenCategory = e.target.dataset.cat
       setValue(chosenCategory)
       setShowList(false)
    }

    const changeHandler = (e)=>{
        setValue(e.target.value)
    }


    useEffect(()=>{
      if(value == "All"){
        const {totalCorrect , totalQuestions , totalScore} = setTotalForAll(userScore)
        setTotal({category : "All", totalCorrect , totalQuestions , totalScore})
      }
      const result = userScore.find(item => item?.category == value)
      if(result){
        const {category , score , totalQuestions , totalCorrectAnswers} = result
        setTotal({
            totalQuestions , totalCorrect : totalCorrectAnswers , totalScore : score , category
        })
      }
      setNumber(degree)
      setAcc(accuracy)
    },[value , total])


    useEffect(()=>{
      window.addEventListener("click" , (e)=>{
        if(!e.target.closest(`.${styles.choose}`)){
          setShowList(false)
        }
      })
    },[])

    const regexValue = new RegExp(value == "All" ? "" : value,"gi")

  return (
    <div className={styles.container}>

      <div className={styles.choose}>
        <label>Category </label>
        <div className={styles.inputList}>
          <input value={value} onChange={changeHandler} onFocus={focusHandler} placeholder='choose another category'/>
          {showList && 
                 <ul className={styles.categoriesList}>
                   <li data-cat ="All" onClick={catHandler}>All</li>
                   {userScore.filter(item => regexValue.test(item.category))
                     .map((item , index) => (<li onClick={catHandler}  data-cat = {item.category} key={index}>{item.category}</li>))
                        }
                  </ul>
          }

        </div>

      </div>

      <div className={styles.resultContainer}>
        {Object.keys(total).length && 
              <div style={accStyle} className={styles.conicContainer}>
                <p>accurecy : {acc}</p>
            </div>
        }


        <div className={styles.scoreContainer}>
          <h4><BiCategoryAlt /> Category : {category}</h4>
        
           <p><BsQuestionSquareFill/> total Questions : {totalQuestions}</p>
           <p> <GrScorecard/> total Score : {totalScore}</p>
           <p> <FaCalendarCheck/> total correct answers : {totalCorrect}</p>
        
      </div>
      </div>

   </div>

  )
}

export default TotalShape