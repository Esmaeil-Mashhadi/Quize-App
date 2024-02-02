import styles from './BooleanAnswer.module.css'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";



function BooleanAnswer() {
  return (
    <div className={styles.container}>
        <button> <AiOutlineLike/> True </button>
             <div className={styles.circle}>
                 <div className={styles.subCircle}>
                        <img src='/svgs/question.png' />              
                 </div>
             </div>

        <button> <AiOutlineDislike/> False </button>
    </div>
  )
}

export default BooleanAnswer