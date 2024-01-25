import Link from 'next/link';
import styles from './QuestionType.module.css'
import { chageType } from '@/utils/reducers';

const QuestionType = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , dispatch}) => {
    const typeHandler = (type)=>{
        dispatch(chageType(type))
    }
    return (
        <div onMouseLeave={handleMouseLeave} className={styles.questionType}>
            <button onClick={()=>typeHandler('normal')} data-name="QuestionType" onMouseEnter={handleMouseEnter} className={styles.main}> Normal Type</button>
            <div onMouseLeave={handleMouseLeave} style={name == "QuestionType" ? style : originalStyle} className={styles.types}>
              <button>multiple choice</button>
              <button>true/false</button>
            </div>
        </div>
    );
};

export default QuestionType;    