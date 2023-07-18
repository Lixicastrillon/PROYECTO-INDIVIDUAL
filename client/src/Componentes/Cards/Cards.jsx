import style from "./Cards.module.css"
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { getDogs } from "../../Redux/action";
import { useEffect } from "react";


const Cards = ()=>{
    const dispatch = useDispatch()

    
    useEffect(()=>{
        dispatch(getDogs())
    },[])
    
    const dogs = useSelector((state)=>state.Dogs)
    console.log(dogs[0])
    return (
        <div className={style.cards}>
            {
               dogs.length && dogs.map((arg)=> (
                    <Card
                    key={arg.id}
                    id={arg.id}
                    name={arg.name}
                    image={arg.image.url}
                    temperament={arg.temperament}
                    weight={arg.weight.metric}
                    />
                )
                )
            }
        </div>
    )
}

export default Cards;