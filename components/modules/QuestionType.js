import styles from './QuestionType.module.css'
import { chageType } from '@/utils/reducers';
import { Fragment } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { userChoice } from '@/utils/userOptionChoice';

const QuestionType = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , dispatch , selectedStyle ,notSelectedStyle , type }) => {
    const typeHandler = (type)=>{
        dispatch(chageType(type))
    }
    const types = {any  : "", "multiple" : "multiple" , "true / false" : "boolean"}
    const selected = userChoice(type , types) || "any"
    return ( 
        <div onMouseLeave={handleMouseLeave} className={styles.questionType}>
            <button style={!selected ? notSelectedStyle : selectedStyle}  data-name="QuestionType" onMouseEnter={handleMouseEnter} className={styles.main}> type : {selected}</button>
            <div onMouseLeave={handleMouseLeave} style={name == "QuestionType" ? style : originalStyle} className={styles.types}>
                    {Object.entries(types).map(([type, code]) => (
                        <button onClick={()=>typeHandler({[type] : code})}>{type == selected ? <Fragment>{type} <FaCheckCircle/></Fragment> : type}</button>
                    ))}
            </div>
        </div>
    );
};

export default QuestionType;    
