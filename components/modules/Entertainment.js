import Link from 'next/link';
import styles from './Entertainment.module.css'

const Entertainment = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , categoryHandler}) => {

    return (
        <div onMouseLeave={handleMouseLeave} className={styles.entertainmentContainer}>
        <button data-name = "Entertainment"  onMouseEnter={handleMouseEnter} className={styles.mainEntertainment} >Entertainment</button>
           <div onMouseLeave={handleMouseLeave} style={name == "Entertainment" ? style : originalStyle} className={styles.subEntertainment}>
               <button onClick={()=>categoryHandler("11")} >Film</button>
               <button onClick={()=>categoryHandler("12")} >Music</button>
               <button onClick={()=>categoryHandler("15")} >VideoGame</button>
               <button onClick={()=>categoryHandler("32")} >Animation</button>
               <button onClick={()=>categoryHandler("10")} >Books</button>
           </div>
       </div>
    );
};

export default Entertainment;