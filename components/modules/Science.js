import { FaCheckCircle } from 'react-icons/fa';
import styles from './Science.module.css'
import { userChoice } from '@/utils/userOptionChoice';
import { Fragment } from 'react';

const Science = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle ,category , categoryHandler,  selectedStyle ,notSelectedStyle }) => {

    const categoryCodes = {
        Nature :"17" , Computer :"18" , Mathematic: "19" ,
        Gadget:"30"}

    const selected = userChoice(category , categoryCodes)
    return (
            <div onMouseLeave={handleMouseLeave} className={styles.scienceContainer}>
            
                <button data-name ="Science" style={!selected ? notSelectedStyle : selectedStyle}
                 onMouseEnter={handleMouseEnter} className={styles.mainScience}>{selected ? <Fragment>{selected}<FaCheckCircle/></Fragment> :"Science"}
                 </button>

                <div onMouseLeave={handleMouseLeave} style={name == "Science" ? style : originalStyle} className={styles.subCategories}>
                        {Object.entries(categoryCodes).map(([name , code])=>(
                            <button onClick={()=>categoryHandler({[name]: code})}>{code == category[name] ? <Fragment>{name} <FaCheckCircle/></Fragment> :name}</button>
                            ))}
                 </div>
            </div>
    );
};

export default Science;