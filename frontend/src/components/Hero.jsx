// import  from "../style";
import styles from "../style.js";
import { discount } from "../assets";
import boy from '../assets/boy.png' ;
import GetStarted from "./GetStarted";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section id="home" className={`    flex md:flex-row flex-col sm:py-0 py-6 `}>
      <div className={`order-2 sm:order-1 flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
            Master Data Structures &
            <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Algorithms</span>{" "}
            
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div>
        </div>

        
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          AlgoSprint provides AI-powered personalized learning paths, interactive problem-solving environments, and real-world challenges from top tech companies. Get instant feedback, collaborate with peers, and level up your coding skills today.
        </p>

       
        <div className={`hidden sm-block ${styles.flexCenter}`}>
        <GetStarted />
      </div>
      

      </div>

      <div className={`order-1 sm:order-2 flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={boy} alt="boy" className="sm:w-[65%] w-[76%] h-[65vh] sm:h-[85%] mt-[-31px] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full white__gradient bottom-40" />
        <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 blue__gradient" />
        {/* gradient end */}
      </div>

     
    </section>
  );
};

export default Hero;
