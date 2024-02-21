'use client'
import Link from "next/link"
import styles from "./LeaderBoard.module.css"
import { useEffect, useState } from "react"

function LeaderBoard({cateList ,searchParams , users}) {

  const [value , setValue] = useState("")
  const [show , setShow] = useState(false)

  useEffect(()=>{
    if(!searchParams.category){
      setValue("All")
    }else{
     setValue(searchParams.category)
    }
  },[searchParams.category])

  const regex = new RegExp(value == "All" ? "" : value, "gi");
  const foundList =[...new Set(cateList)].filter(item => regex.test(item))


  const linkHandler = (item)=>{
    setShow(false)
    setValue(item)
  }
  const changeHandler = (e)=>{
    setValue(e.target.value)
  }
  const focusHandler = ()=>{
    setValue("")
    setShow(true)
  }


  useEffect(()=>{
    window.addEventListener('click' , (e)=>{
      if(!e.target.closest(`.${styles.categories}`)){
        setShow(false)
      }
    })
  },[])


  return (
    <div className={styles.container}>
        <div className={styles.scoreContainer}>
          <div className={styles.top}>
            <h4>TOP 10 Users</h4>
            <div className={styles.categories}>
                  <div className={styles.cateInput}>
                    <h4>category :</h4>
                    <input onChange={changeHandler} onFocus={focusHandler} value={value} />
                  </div>
                  {show && 
                  <ul className={styles.categoriesList}>
                  <Link onClick={()=>linkHandler("All")} href={{pathname:"leaderboard"}}>All</Link>
                   {foundList.map((item , index) => (<Link onClick={()=>linkHandler(item)} href={{pathname:"leaderboard" , query:{category : item}}} key={index}>{item}</Link>))}

                  </ul>
                }
            </div>
          </div>

           <div className={styles.titlesContainer}>
              <p>RANK</p> <p>NAME</p> <p>SCORE</p>
           </div>

            <div className={styles.names}>
                    {users.map((item , index) =>  
                    <div key={index} style={index % 2 == 0 ? {background:"lightBlue"} : null} className={styles.row}>
                    <p>
                      {index + 1}
                    </p>
                    <p>
                      {item.username}
                    </p>

                    {!searchParams.category ?
                      <p>
                      {item.totalScore}
                    </p>
                     : <p>
                        {item.userScore.find(item => item.category == searchParams.category).score}
                     </p>}

                
                    </div> )}
                    {!users.length && <p className={styles.noScore}>  no score yet !</p>}
            </div>

            <div className={styles.scores}>
                    
            </div>
        </div>
    </div>
  )
}

export default LeaderBoard