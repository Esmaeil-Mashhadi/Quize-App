import styles from './Entertainment.module.css'
import { userChoice } from '@/utils/userOptionChoice';
import { Fragment } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const Entertainment = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , categoryHandler , category , selectedStyle ,notSelectedStyle }) => {
    const categoryCodes = {
        Film :"11" , Music :"12" , VideoGame: "15" ,
        Animation:"32" , Books:"10"}

        const selected = userChoice(category , categoryCodes) 
        
    return (
        <div onMouseLeave={handleMouseLeave} className={styles.entertainmentContainer}>
        <button data-name = "Entertainment"  onMouseEnter={handleMouseEnter} style={!selected ? notSelectedStyle : selectedStyle} 
         className={styles.mainEntertainment} >{selected ? <Fragment>{selected}<FaCheckCircle/></Fragment> : "Entertainment" }
         </button>
           <div onMouseLeave={handleMouseLeave} style={name == "Entertainment" ? style : originalStyle} className={styles.subEntertainment}>
                    {Object.entries(categoryCodes).map(([name , code])=>(
                        <button key={code} onClick={()=>categoryHandler({[name]:code})}>{code == category[name] ? <Fragment>{name} <FaCheckCircle/></Fragment> :name}</button>
                    ))}
           </div>
       </div>
    );
};

export default Entertainment;