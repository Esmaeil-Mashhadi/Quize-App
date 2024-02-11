import { FaCheckCircle } from "react-icons/fa";
import styles from './General.module.css'
import { userChoice } from "@/utils/userOptionChoice";
import { Fragment } from "react";

const General = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle  , categoryHandler  ,category , selectedStyle , notSelectedStyle}) => {

    const categoryCodes = {
         General :"9" , History : "23" ,
        Geography:"22" , Politics:"24" ,Sports:"21" ,
        Animal:"27" , Vehicles :"28"}

        const selected = userChoice(category , categoryCodes)
     
    return (
     <div onMouseLeave={handleMouseLeave} className={styles.generalContainer}>
     <button   data-name = "other" onMouseEnter={handleMouseEnter} style={!selected ? notSelectedStyle : selectedStyle} className={styles.other}>{selected ? <Fragment>{selected}<FaCheckCircle/></Fragment>  : "Other"} </button>
        <div style={name == "other" ? style : originalStyle} onMouseLeave={handleMouseLeave} className={styles.subGeneral}>
            {Object.entries(categoryCodes).map(([name , code])=>
                (<button key={code} onClick={()=>categoryHandler({[name]:code})}>{code == category[name] ? <Fragment> {name} <FaCheckCircle/> </Fragment>: name}</button>))}
       </div>
    </div>
    );
};

export default General;