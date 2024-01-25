import Link from 'next/link';
import styles from './Science.module.css'

const Science = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , categoryHandler}) => {

    return (
            <div onMouseLeave={handleMouseLeave} className={styles.scienceContainer}>
                <button data-name ="Science" onMouseEnter={handleMouseEnter} className={styles.mainScience} >Science</button>
                <div onMouseLeave={handleMouseLeave} style={name == "Science" ? style : originalStyle} className={styles.subCategories}>
                     <button onClick={()=>categoryHandler('17')}  >Nature</button>
                     <button onClick={()=>categoryHandler('18')}  >Computer</button>
                     <button onClick={()=>categoryHandler('19')}  >Mathematic</button>
                     <button onClick={()=>categoryHandler('30')} >Gadget</button>
                 </div>
            </div>
    );
};

export default Science;