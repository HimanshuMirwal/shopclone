import React, { useState, useEffect } from "react";
import shopcloneDB from "../../FirebaseConfig";
import { getDocs, collection, deleteDoc, doc, where, query, setDoc } from "firebase/firestore";
import "../../styleSheets/homaPage.css";
import { FaTag } from "react-icons/fa"
import { useSelector } from "react-redux";
import { Colors } from "../../Colors";
const RequestToCancel = () => {
    const [Products, SetProducts] = useState([]);
    const [SearchKey, setSearchKey] = useState("");
    const [SearchName, setSearchName] = useState("");
    const [SearchId, setSearchId] = useState("");
    const { CartItems } = useSelector(state => state.CartReducer);
    const { user } = JSON.parse(localStorage.getItem("CurrentUser"));

    const userId = user.uid;
    const CurrentUserEmail = user.email;
    const [alert, setAlert] = useState("");
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const data = await getDocs(collection(shopcloneDB, "OrderCancelRequest"));
        const FinalProducts = [];
        data.forEach(product => {
            const obj = {
                id: product.id,
                ...product.data()
            }
            FinalProducts.push(obj);
        })
        SetProducts(FinalProducts);
        console.log(FinalProducts);

    }
    useEffect(() => {
        localStorage.setItem("CartItems", JSON.stringify(CartItems));
    }, [CartItems]);

    async function DeleteItem(Id) {
        try {
            await deleteDoc(doc(shopcloneDB, "orders", Id));
            console.log("Success");
            getData();
        } catch (err) {
            console.log("Err");
            console.log(err);
            getData();
        }
    }
    async function DeleteItemOrderRequest(id) {
        try {
            const result = await deleteDoc(doc(shopcloneDB, "OrderCancelRequest", id));
            ;
            console.log(result);
            getData();
        } catch (err) {
            console.log("Err");
            console.log(err);
            getData();
        }
    }

    const SendMail = async (product) => {
        const value = document.getElementById(product.id).value;
        console.log(value);
        try {
            const newData = {
                ...product,
                messages: value
            }
            console.log(newData);
            const result = await setDoc(doc(shopcloneDB, "orders", product.OrderId), newData);
            console.log("success");
            document.getElementById(product.id).value = "";
            getData()
        } catch (err) {
            console.log("Err");
            console.log(err);
            getData()
        }
    }

    return (
        <div className="row">
            <div className="row d-flex flex-direction-column justify-content-center">
                <div className="form-group my-1 col-8">
                    <input value={SearchKey} onChange={(e) => {
                        setSearchKey(e.target.value);
                        setSearchName("");
                        setSearchId("");

                    }} type="text" className="form-control" placeholder="search product" />
                </div>
                <div className="form-group my-1 col-8">
                    <input value={SearchName} onChange={(e) => {
                        setSearchKey("");
                        setSearchName(e.target.value);
                        setSearchId("");
                    }} type="text" className="form-control" placeholder="search by id" />
                </div>
                <div className="form-group my-1 col-8">
                    <input value={SearchId} onChange={(e) => {
                        setSearchKey("");
                        setSearchName("");
                        setSearchId(e.target.value);
                    }} type="text" className="form-control" placeholder="search email" />
                </div>

                {
                    <div className="text-center col-8">
                        <h4>{alert && "No order found"}</h4>
                    </div>
                }
            </div>
            {Products.length > -1 &&
                Products
                    .filter(obj => obj.product.title.toLowerCase().includes(SearchKey))
                    .filter(obj => obj.UserName.toLowerCase().includes(SearchName))
                    .filter(obj => obj.userId.toLowerCase().includes(SearchId))
                    .map(product => {
                        return <div className="my-2">
                            <div className="row d-flex flex-direction-row justify-content-center">
                                <div className="col-4">
                                    <img
                                        alt={product.product.title}
                                        src={product.product.image}
                                        style={{height:"200px", width:"200px"}}
                                        className="img-thumbnail"
                                    />
                                </div>
                                <div className="col-6">
                                    <h3 className="text-center" style={{color:Colors.primary}}>{product.product.title}</h3>
                                    <h4 className="text-center" style={{color:Colors.Gray}}><FaTag size={30} className=" text-primary" /> {product.product.price}</h4>
                                </div>
                            </div>
                            <hr />
                            <div className="row text-center d-flex flex-direction-row justify-content-center">
                                <div className="col-5 d-flex flex-direction-row justify-content-center">
                                    <strong style={{color:Colors.Gray}}>cancelation Date :</strong>
                                    <span style={{color:Colors.third}}>{(new Date(product.time.toDate())).toDateString()}</span>
                                </div>
                                <div className="col-5  d-flex flex-direction-row justify-content-center">
                                    <strong style={{color:Colors.Gray}}>Order Date :</strong>
                                    <span style={{color:Colors.third}}>{(new Date(product.dateExample.toDate())).toDateString()}</span>
                                </div>
                            </div>
                            <div className="row text-center d-flex justify-content-center">
                                <div className="col-5">
                                    <h5 className="text-center" style={{color:Colors.primary}}>Receiver detail</h5>
                                    <h6 style={{color:Colors.Gray}}>Phone No. </h6>{product.DetailedAddress.ParcelReceiverPhoneNo}
                                    <h6 style={{color:Colors.Gray}}>Address </h6>{product.DetailedAddress.parcelAddress}
                                    <h6 style={{color:Colors.Gray}}>Area Pincode </h6>{product.DetailedAddress.parcelPinCode}
                                    <h6 style={{color:Colors.Gray}}>dispatched </h6>{product.dispatched ? "yes" : "no"}

                                </div>
                                <div className="col-5">
                                    <h5 className="text-center" style={{color:Colors.primary}} >Sender detail</h5>
                                    <p><h6 style={{color:Colors.Gray}}>Sender Name</h6>
                                        {product.UserName}</p>
                                    <p><h6 style={{color:Colors.Gray}}>Sender Id</h6>
                                        {product.userId}</p>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center">
                                <div className="col-lg-3  col-10">
                                <button className="btn btn-danger my-5 mx-1" onClick={() => {
                                    DeleteItem(product.OrderId);
                                }}>delete OrderDB</button>
                                <button className="btn btn-danger my-5 mx-1" onClick={() => {
                                    DeleteItemOrderRequest(product.id);
                                }}>delete RequestDB</button>
                                </div>
                                
                                <div className="col-lg-7 col-10">
                                    <div className="col-lg-8 col-12 form-group m-auto my-1">
                                        <textarea
                                            rows="5"
                                            className="form-control"
                                            id={product.id}
                                        >
                                        </textarea>
                                    </div>
                                    <div className="col-lg-2 col-5 form-group m-auto my-1">
                                        <button className="btn m-auto"
                                            onClick={() => {
                                                SendMail(product);
                                            }}
                                            style={{background:Colors.primary,color:Colors.secondary}}
                                            >
                                            Send Message
                                        </button>
                                    </div>

                                </div>

                            </div>

                        </div>
                    })
            }
        </div>
    )
}
export default RequestToCancel;
