import { Link } from "react-router-dom"
import NumberFormatter from "./NumberFormater"
import Header from "../containers/Header"

export default function Items(props){
    if(props.data  == []){
        return (<>
            <Header/>
        </>)
    }

    else{
    return(
        <div className="continent">
            <div className="content-items">
                {
                    props.data.map((obj, index) => {
                        return(
                            <div key={index} className="content-link">
                                <Link to={"/product/" + obj.id} className="content-detail">
                                    <img src={obj.thumbnail} alt="" /><br />
                                    <p>{obj.product_description}</p>
                                    <div className="price-product">
                                        <strong className="price"><NumberFormatter number={obj.price * (100-obj.discount)/100}/></strong>
                                        <p className="price-old black"><NumberFormatter number={obj.price}/></p>
                                        <span className="percent">-{obj.discount}%</span>
                                    </div>
                                </Link>
                            </div>)
                    })
                } 
            </div>
        </div>
    )}
}