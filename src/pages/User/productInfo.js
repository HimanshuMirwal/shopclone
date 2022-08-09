import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap"
import TrandingProducts from "./TrandingProducts"
import Layout from "../../components/Layout";
import shopCloneDB from "../../FirebaseConfig";
import { FaStar, FaTags, FaCartArrowDown } from "react-icons/fa";
import "../../styleSheets/productInfo.css"
import { Colors, Font } from "../../Colors";
import Loader from "../../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../../redux/Actions/Action";
import CardProduct from "../../components/CardProduct";
import { ToastContainer, toast } from 'react-toastify';
import { Rating } from "@material-ui/lab";
const ProductInfo = () => {
    const { id } = useParams();
    const { CartItems } = useSelector(state => state.CartReducer);
    const { user } = JSON.parse(localStorage.getItem("CurrentUser")) ? JSON.parse(localStorage.getItem("CurrentUser")) : "";
    
    const [Product, SetProduct] = useState({});
    const Dispatch = useDispatch();
    const [suggestion, setSuggestion] = useState([]);
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);
    const getData = async () => {
        try {
            // const data = await getDoc(doc(shopCloneDB, "shopclone"), id);
            // SetProduct(data);
            const docRef = doc(shopCloneDB, "shopclone", id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log("Document data:", docSnap.data());
                SetProduct(docSnap.data());
                const suggestionText = docSnap.data().category;
                // For suggestions
                const suggestionData = await getDocs(query(collection(shopCloneDB, "shopclone"), where("category", "==", suggestionText)));
                const suggestionUpdatedData = [];
                suggestionData.forEach(item => {
                    if (item.id === id) {

                    } else {
                        const data = {
                            id: item.id,
                            ...item.data()
                        }
                        suggestionUpdatedData.push(data);
                    }
                })
                setSuggestion(suggestionUpdatedData);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }

        } catch (Err) {
            console.log(Err)
        }
    }
    function addToCart(product) {
        toast.success(product.title + " Added to Cart.")
        const newdata = {
            ...product,
            tempId: product.id + Math.floor(Math.random() * 100000)
        }
        console.log(newdata);
        Dispatch({ type: ADD_TO_CART, payload: newdata })
    }
    return (
        <Layout>
            {Object.keys(Product).length === 0 ? (
                <div className="row">
                    <div className="col-12  text-center">
                        <Loader />
                    </div>
                </div>
                ) : (
                <div className="m-0 p-0">
                    <ToastContainer />
                    <div className="row m-lg-5 m-2 d-flex justify-content-between">
                        <div className="col-lg-6 col-12 d-flex justify-content-center">
                            <img src={Product.image} style={{ height: "500px" }} className="img-fluid" alt={Product.title} />
                        </div>
                        <div className="col-lg-6 col-10 mx-auto text-bold">
                            <Row>
                                <h2 style={{ color: Colors.primary, fontFamily: Font }}>{Product.title}</h2>
                                <hr />

                                <div className="col-6">
                                    <h5 className="text-bold" style={{ color: Colors.Gray, fontFamily: Font }} >Rating</h5>
                                    <p style={{ color: Colors.third, fontFamily: Font }}>
                                    <Rating name="half-rating-read" defaultValue={Product.rating.rate} precision={0.5} readOnly /> {Product.rating.rate}</p>
                                </div>
                                <div className="col-6">
                                    <h5 className="text-bold" style={{ color: Colors.Gray, fontFamily: Font }} >Price</h5>
                                    <p style={{ color: Colors.third, fontFamily: Font }}><FaTags size={25} color={"teal"} />$ {Product.price}</p>
                                </div>
                                <div className="col-12">
                                    <h5 style={{ color: Colors.Gray, fontFamily: Font }}>Description</h5>
                                    <p style={{ color: Colors.third, fontFamily: Font }}>
                                        {Product.description}
                                    </p>
                                </div>
                                <div className="col-12">
                                    {user && <button
                                        style={{ backgroundColor: Colors.Gray, color: Colors.secondary, fontFamily: Font }}
                                        className="btn"
                                        onClick={() => {
                                            addToCart(Product)
                                        }}
                                    >
                                        <FaCartArrowDown size={25} />Add to cart</button>}
                                </div>
                            </Row>
                        </div>
                        <Row className="my-5 mx-0 p-0 h-100" style={{
                            background: Colors.Gray,
                            color: Colors.secondary,
                            borderTopRightRadius: "10px",
                            borderTopLeftRadius: "10px"
                        }}>
                            <div
                                style={{ color: Colors.secondary }}
                                className=" col-12 rounded m-2 h-75 text-center d-flex justify-content-center align-items-center">
                                <h1>You might also like</h1>
                            </div>
                            <div className="d-flex  col-11 m-auto px-2 flex-direction-row overflow-scroll align-items-center"
                                style={{ background: Colors.secondary, borderTopRightRadius: "10px", borderTopLeftRadius: "10px" }}>
                                {
                                    suggestion.map((item, idx) => {
                                        return <TrandingProducts key={idx} item={item} />
                                    })
                                }
                            </div>
                        </Row>
                    </div>

                </div>
            )}
            
        </Layout>)
}
export default ProductInfo;
