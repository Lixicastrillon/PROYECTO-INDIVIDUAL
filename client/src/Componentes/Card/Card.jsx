import style from "./Card.module.css"
import {Link} from "react-router-dom"

const Card = ({id, name, image, temperament, weight }) => {

  return (
    <div>
      <div >
      <Link to={`/detail/${id}`}>
        <h4>Name:{name && name}</h4>
        </Link>
        <img alt="" src={image && image} className={style.image} />
      </div>
      <div>
        <h4>Temperament:{temperament && temperament}</h4>
        <h4>Weigth:{weight && weight} kilograms</h4>
      </div>
    </div>
  );
};

export default Card;
