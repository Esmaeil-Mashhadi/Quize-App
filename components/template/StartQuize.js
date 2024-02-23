'use client'
import styles from './StartQuize.module.css'
import { useEffect,useState } from 'react';
import { DNA } from 'react-loader-spinner';
import BooleanAnswer from '../modules/AnswersModule/BooleanAnswer';
import Multiple from '../modules/AnswersModule/Multiple';
import Modal from '../modules/Modal';

const StartQuize = () => {

   const [index , setIndex] = useState(0)
   const [userChoice , setUserChoice] = useState({})
   const [showModal , setShowModal] = useState(false)
   const [dataStorage , setDataStorage] = useState([])


    const result = dataStorage || []
    const question = result[index]?.question
    const type = result[index]?.type

    useEffect(()=>{
            const getUserPrevChoice = async()=>{
                const res = await fetch("/api/quiz/saveScore")
                const {prevChoice} = await res.json()
                if(prevChoice[index]){
                    setUserChoice(prevChoice[index])
                }
            }
            getUserPrevChoice()
    },[index])

    useEffect(()=>{
        const getQuizeFromDataBase = async()=>{
            const res = await fetch('/api/quiz/currentQuiz')
            const {currentQuiz} = await res.json()
            setDataStorage(currentQuiz)
        }
        getQuizeFromDataBase()
    },[])

    const nextHandler = ()=>{
        setUserChoice({})
        setIndex((prev)=>{
            if(prev == result?.length - 1){
                return prev = result?.length - 1
            }
            return prev + 1
        })
    }


    const prevHandler = ()=>{
        setIndex((prev)=>{
            if(prev == 0){
                return prev = 0
            }
            return prev - 1
        })
    }

    const finishHandler = ()=>{
        setShowModal(true)
    }
   

    if(!dataStorage.length) return <h1 className={styles.loading}><DNA/></h1>

    return (
             <div className={styles.container}>
                <div className={styles.questionContainer}>
                    <div className={styles.question}>
                             {question}
                    </div>
                  <button onClick={finishHandler} className={styles.finish}>
                    <div className={styles.circle}>
                        <img src='/svgs/finish.png' />
                        <p className={styles.endQuize}> Finish the Quize </p>
                    </div>
                 </button>

                    <div className={styles.answers}>

                       {type =="boolean" && <BooleanAnswer dataStorage = {dataStorage} userChoice = {userChoice} 
                       setUserChoice = {setUserChoice} questionIndex ={index}/>}

                       {type =="multiple" && <Multiple dataStorage = {dataStorage}  userChoice= {userChoice} 
                       setUserChoice ={setUserChoice}
                        questionIndex = {index} />}
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                      <button disabled ={!index} style={!index ? {opacity:'.5'} : null} onClick={prevHandler}>
                        <img src='/svgs/arrow.png' />
                      </button>
                      <button disabled ={index == result.length - 1} style={index == result.length -1 ? {opacity:'.5'} : null} 
                        onClick={nextHandler}> 
                        <img src='/svgs/arrow.png' />
                      </button>
                </div>

                {showModal && 
                    <div className={styles.modal}>
                        <Modal setShowModal = {setShowModal} />
                    </div>
                }

             </div>

    );
};

export default StartQuize;