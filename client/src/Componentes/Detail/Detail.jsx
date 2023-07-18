import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux"
import { useEffect } from "react";
import { getDogsId } from "../../Redux/action";

const Detail = ()=>{
    const {idRaza} = useParams()

    const detailPage = useSelector((state)=> state.detail)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch((getDogsId(idRaza)))
    },[])

    return(
        <div>
            <h4>Id:{detailPage.id && detailPage.id}</h4>
            <h4>Name:{detailPage.name && detailPage.name}</h4>
            <img alt="" src={detailPage.image && detailPage.image.url}/>
            <h4>Weight:{detailPage.weight && detailPage.weight.metric}kilograms</h4>
            <h4>Height:{detailPage.height && detailPage.height.metric}Centimeters</h4>
            <h4>Temperament:{detailPage.temperament && detailPage.temperament }</h4>
            <h4>Life span:{detailPage.life_span && detailPage.life_span}</h4>
        </div>
    )
}

export default Detail;