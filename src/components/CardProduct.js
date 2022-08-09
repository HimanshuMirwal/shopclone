import React, { useEffect, useState } from "react";
import { FaStar, FaTags, FaCartArrowDown } from "react-icons/fa";
import "../styleSheets/productInfo.css"
import { Colors } from "../Colors";
import {FaInfoCircle, FaCartPlus} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../redux/Actions/Action";
const CardProduct = (props) => {
    const { CartItems } = useSelector(state => state.CartReducer);
    const [Product, SetProduct] = useState({});
    const product = props.product;
    console.log("product "+product);
    const Dispatch = useDispatch();
    const [suggestion, setSuggestion] = useState([]);
    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);
    function addToCart(product) {
        const newdata = {
            ...product,
            tempId: product.id + Math.floor(Math.random() * 100000)
        }
        console.log(newdata);
        Dispatch({ type: ADD_TO_CART, payload: newdata })
    }
    return (
        <div className="SuggestionProduct col-4 my-2">
            <div className="card text-center h-100">

                <div className="position-relative">
                    <img className="card-img-top" src={product.image} alt={product.title} height="300px" width="300px" />
                </div>

                <div className="card-body pt-4 px-4 pb-0">
                    <div className="mb-2">
                        <a className="d-inline-block text-secondary small font-weight-medium mb-1" href="/">{product.category}</a>
                        <h3 className="font-size-1 font-weight-normal">
                            <strong className="text-secondary" href="/">{product.title.substr(0, 8)}...</strong>
                        </h3>
                    </div>
                </div>

                <div className="card-footer border-0 pt-0 pb-4 px-4">
                    <button onClick={() => addToCart(product)} style={{ color: Colors.Light, background: Colors.BlueLight }} type="button" className="btn  transition-3d-hover">
                        <FaCartPlus size={25}/> Add to Cart
                    </button>
                    <div className="dropdown-divider"></div>
                    <button
                        style={{ color: Colors.Light, background: Colors.BlueLight }}
                        onClick={() => addToCart(product)} type="button" className="btn transition-3d-hover">
                        <a href={"https://shopclonehimanshu.herokuapp.com/detail/" + product.id} style={{ color: Colors.Light, textDecoration: "none" }}>
                            <FaInfoCircle size={25}/> 
                            View Detail</a>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default  CardProduct;
