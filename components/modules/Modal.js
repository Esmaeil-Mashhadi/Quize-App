import styles from './Modal.module.css'
import { GiTrophyCup } from "react-icons/gi";


function Modal({setShowModal}) {
    const finishHandler = ()=>{
        setShowModal(false)
    }
  return (
    <div className={styles.container}>
            <div className = {styles.modal}>
                    <div className={styles.leftSide}>
                            <label>Category</label>
                            <label>Total Question</label>
                            <label>correct answers</label>
                            <label>not answered</label>
                            <label>your score</label>
                    </div>

                    <div className={styles.rightSide}>
                            shape of Score
                    </div>
            </div>

             <button onClick={finishHandler}>
                     Finish <GiTrophyCup/>
             </button>
    </div>
  )
}

export default Modal