import style from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className={style.background}>
      <img alt="" src={require("./mundoDog.jpg")} className={style.image} 
      />
      <div className={style.title}>
        <h1 className={style.letter}>Welcome to the world of dog knowledge</h1>
        <Link to="/home">
          <button className={style.button}>select to enter</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
