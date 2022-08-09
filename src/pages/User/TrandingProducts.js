import React, { useEffect } from "react";
import { Colors } from "../../Colors";
import {FaStar, FaCartPlus, FaEye} from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../redux/Actions/Action";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Rating } from "@material-ui/lab";
const TrandingProducts = (props) => {
    const {item}=props;
    const {CartItems}=useSelector(state=>state.CartReducer);
    const {user} = JSON.parse(localStorage.getItem("CurrentUser"))?JSON.parse(localStorage.getItem("CurrentUser")):"";
    const Dispatch = useDispatch();
    useEffect(()=>{
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    },[CartItems]);

    function addToCart(product){
        const newdata ={
            ...product,
            tempId : product.id+Math.floor(Math.random()*100000)
        }
        console.log(newdata);
        toast.success(product.title+" Added to Cart.")
        Dispatch({type:ADD_TO_CART, payload:newdata})
    }
    return (                    
                        <div className="col-lg-3 col-6 px-2 my-2 mx-lg-0 mx-auto">
                        <div className="card product-card">
                            <a className="card-img-top d-block overflow-hidden" href={`https://shopclonehimanshu.herokuapp.com/detail/${item.id}`}>
                            <div className="d-flex juystify-items-center align-items-center">
                            <img src={item.image} height="300px" width={"250px"} className="m-auto" alt="Product"/>
                            </div>
                            </a>
                            <div className="card-body py-2">
                            <a className=" d-block fs-xs pb-1" style={{color:Colors.Gray, textDecoration:"none"}} href={`https://shopclonehimanshu.herokuapp.com/product/category/${item.category.toLowerCase()}`}>{item.category}</a>

                                <div className="d-flex justify overflow-scroll"><h4 className="fs-sm">
                                <a href={"https://shopclonehimanshu.herokuapp.com/detail/"+item.id} style={{color:Colors.primary}}>{item.title.substr(0,15)}...</a>
                                </h4></div>
                                <a className=" d-block fs-xs pb-1" style={{color:Colors.Gray, textDecoration:"none", fontWeight:"bold"}} href="/">{item.brand}</a>
                                <div className="d-flex justify-content-between">
                                    <div className="product-price">
                                    <span className="text-accent" style={{color:Colors.Gray}}>${item.price}.<small>00</small></span></div>
                                    <div className="star-rating" style={{color:Colors.Gray}}>
                                        <Rating name="half-rating-read" defaultValue={item.rating.rate} precision={0.5} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="card-body card-body-hidden">
                                {user && <button 
                                className="btn btn-sm btn-block w-100 mb-2" 
                                style={{color:Colors.secondary, background:Colors.Gray}}
                                type="button"
                                onClick={()=>addToCart(item)}
                                >
                                <FaCartPlus size={25}/>Add to Cart</button>}
                                <div className="text-center">
                                <a style={{color:Colors.Gray, textDecoration:"none"}} href={"https://shopclonehimanshu.herokuapp.com/detail/"+item.id}>
                                <FaEye />View Detail</a></div>
                            </div>
                        </div>
                    </div>                
    )
}
export default TrandingProducts;
