import styles from './CategoryCard.module.css'

function CategoryCard() {
    const categoryArray = [
       {title:"Art" , description: "Explore the captivating realm of art with our quiz website dedicated to the category of art. Test your artistic knowledge, from renowned masterpieces to influential artists, and discover a new appreciation for the diverse world of creativity."}
        ,{title: "Science" , description:"Delve into the captivating world of science with our quiz website, where you can test your knowledge of discoveries, theories, and the wonders of the natural world. Expand your understanding and embrace the thrill of scientific exploration in a fun and interactive way."}  , 
        {title:'Geography' , description:"Explore the world with our geography quiz website. Test your knowledge of continents, countries, landmarks, and natural wonders in a fun and interactive way."}, 
        {title:"Sports" , description:"Ignite your passion for sports with our quiz website. Test your knowledge of athletes, teams, and iconic moments in an engaging and interactive way."} , 
        {title:"history" , description:"Uncover the past with our history quiz website. Test your knowledge of events, figures, and moments that shaped our world in an engaging and interactive way."} ,
         {title:"General" , description:"Expand your knowledge with our general knowledge quiz website. Test your understanding of a wide range of topics, from science and history to pop culture and current events. Challenge yourself with diverse questions and discover fascinating facts in an engaging and interactive format."}]

  return (
    <div className={styles.container}>
    {categoryArray.map((item , index) =>{
        return <div key={index} className={styles.card}>
                <div className={styles.imageContainer}>
                    <p>{item.title}</p>
                    <img src={`${item.title}.jpg`} />
                </div>

                <p className={styles.description}>{item.description}</p>
         </div>
       })}
    </div>
  )
}

export default CategoryCard