import Link from 'next/link';
import styles from './about.module.css'
const page = () => {
    return (
        <div className={styles.container}>
            <h2>Welcome to the Quiz Website!</h2>
             
            <div>
                <h4>About the Developer</h4>
                <p>Hi there! My name is <span> Esmaeil Mashhadi</span>, and I'm a MERN full-stack developer. I created this website as a personal project to showcase my skills and passion for web development.</p>
            </div>
             
            <div>
                <h4>Our Mission</h4>
                <p>At Quiz Website, our mission is to provide an interactive and engaging platform for users to test their knowledge in various categories. We believe that learning can be fun, and our quizzes are designed to entertain and educate.</p>
            </div>
            
            <div>
                <h4>Explore and Learn</h4>
                <p>With a wide range of categories such as Art, Science, Geography, Sports, History, and General Knowledge, there's something for everyone. Challenge yourself, discover new facts, and expand your understanding of the world around us.</p>
            </div>

            <div>
                 <h4>Contact Me</h4>
                 <p>Have a question or feedback? We'd love to hear from you! Feel free to reach out to me, Esmaeil Mashhadi, the developer of this website, at 
                 <span> gmail : alchemist.man1997@gmail.com </span><br></br>
                 <span>github :</span> <Link target='blank'  href="https://github.com/Esmaeil-mashhadi"> my github account </Link> <br></br>
                 <span>LinkedIn : </span> <Link target='_blank' href="https://www.linkedin.com/in/esmaeil-mashhadi">my Linkedin account </Link> 
                 </p>
            </div>  
                
            <p>Thank you for visiting Quiz Website. Enjoy the quizzes and happy learning!</p>     
        </div>
    );
};

export default page;