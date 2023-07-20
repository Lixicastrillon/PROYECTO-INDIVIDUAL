import style from "./Cards.module.css";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { getDogs } from "../../Redux/action";
import { useEffect, useState } from "react";

const Cards = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogs());
  }, []);

  const dogs = useSelector((state) => state.Dogs);
  console.log(dogs);

  const [page, setPage] = useState({
    a: 0,
    b: 8,
  });

  useEffect(() => {
    setPage({
      a: 0,
      b: 8,
    });
  }, [dogs]);

  const pageDogs = (event) => {
    event.preventDefault();
    window.scrollTo(0,0)
    setPage({
      a: page.a + 8,
      b: page.b + 8,
    });
  };

  const pageDogsReturn = (event) => {
    event.preventDefault();
    window.scrollTo(0,0)
    setPage({
      a: page.a - 8,
      b: page.b - 8,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.cards}>
        {dogs.length &&
          dogs
            .slice(page.a, page.b)
            .map((arg) => (
              <Card
                key={arg.id}
                id={arg.id}
                name={arg.name}
                image={arg.image.url}
                temperament={arg.temperament}
                weight={arg.weight.metric}
              />
            ))}
      </div>
      <div className={style.flecha}>
        <button
          className={style.flechas}
          onClick={(e) => pageDogsReturn(e)}
          disabled={page.a === 0}
        >
          ⏪
        </button>
        <button
          className={style.flechas}
          onClick={(e) => pageDogs(e)}
          disabled={page.b > dogs.length}
        >
          ⏩
        </button>
      </div>
    </div>
  );
};

export default Cards;
