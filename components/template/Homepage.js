import CategoryCard from '../modules/CategoryCard'
import styles from './Homepage.module.css'

function Homepage() {

  return (
    <div>
        <div className={styles.top}>
            <div className={styles.topLeft}>
              <img src='Quiz.png' /> 
            </div>
            <div className={styles.topRight}>
            Welcome to our exciting quiz website, 
            where knowledge meets fun! Explore a wide range of captivating categories, including mythology, cars, celebrities, sciences and etc ... ,
             Challenge yourself and test your expertise in various fields as you embark on an engaging journey of discovery. With an array of thought-provoking questions and intriguing facts, 
             our quizzes will entertain and educate you. Prepare to unleash your inner quiz master and dive into the captivating world of knowledge. Let the learning adventure begin!
            </div>
        
        </div>

        <div className={styles.middle}>
            <h3>Top Visited Categories</h3>
           <div className={styles.categories}>
               <CategoryCard />
            </div>
        </div>
    </div>
  )
}

export default Homepage