import Link from 'next/link';
import styles from './General.module.css'

const General = ({handleMouseLeave , handleMouseEnter , style , name , originalStyle , dispatch , categoryHandler}) => {

    return (
        <div onMouseLeave={handleMouseLeave} className={styles.generalContainer}>
         <button onClick={()=>categoryHandler("any")}  data-name = "any" onMouseEnter={handleMouseEnter}  className={styles.general}>Any</button>
        <div style={name == "any" ? style : originalStyle} onMouseLeave={handleMouseLeave} className={styles.subGeneral}>
            <button onClick={()=>categoryHandler('')} >General</button>
            <button onClick={()=>categoryHandler('23')} >History</button>
            <button onClick={()=>categoryHandler('22')} >Geography</button>
            <button onClick={()=>categoryHandler('24')}  >Politics</button>
            <button onClick={()=>categoryHandler('21')} >Sports</button>
            <button onClick={()=>categoryHandler('27')}  >Animals</button>
            <button onClick={()=>categoryHandler('28')} >Vehicles</button>
     </div>
        </div>
    );
};

export default General;