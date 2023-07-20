import style from "./Card.module.css"
import {Link} from "react-router-dom"

const Card = ({id, name, image, temperament, weight }) => {

  return (
    <div className={style.container}>

      <div className={style.card} >
      <Link to={`/detail/${id}`}>
        <h4>Name:{name && name}</h4>
        </Link>
        <img alt="" src={image && image} className={style.image} />
        <h4>Temperament:{temperament && temperament}</h4>
        <h4>Weight:{weight && weight} kilograms</h4>
      </div>

    </div>
  );
};

export default Card;
