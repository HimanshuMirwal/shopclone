import React, { useState, useEffect } from "react";
import shopcloneDB from "../../FirebaseConfig";
import { getDocs, collection, deleteDoc, doc, where, query, setDoc } from "firebase/firestore";
import "../../styleSheets/homaPage.css";
import { FaTag } from "react-icons/fa"
import { useSelector } from "react-redux";
import {Colors, Font} from "../../Colors";
import LocationTrack from "../../components/LocationTrack";
const OrdersAdmin = () => {
    const [Products, SetProducts] = useState([]);
    const [SearchKey, setSearchKey] = useState("");
    const [SearchName, setSearchName] = useState("");
    const [SearchId, setSearchId] = useState("");
    const { CartItems } = useSelector(state => state.CartReducer);
    const { user } = JSON.parse(localStorage.getItem("CurrentUser"));
    const [trackReset, SetTrackReset] = useState(false);
    const userId = user.uid;
    const CurrentUserEmail = user.email;
    const [alert, setAlert] = useState("");
    useEffect(() => {
        getData();
    }, [])
    const getData = async () => {
        const data = await getDocs(collection(shopcloneDB, "orders"));
        const FinalProducts = [];
        data.forEach(product => {
            const obj = {
                id: product.id,
                ...product.data()
            }
            FinalProducts.push(obj);
        })
        SetProducts(FinalProducts);
        console.log(Products)
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
        Products.length < 0 ? setAlert("No order found") : setAlert("");
    }
    const SendMail = async (product) => {
        try {
            const newData = {
                ...product,
                dispatched: product.dispatched ? false : true
            }
            console.log(newData);
            const result = await setDoc(doc(shopcloneDB, "orders", product.id), newData);
            console.log("success");
            getData()
        } catch (err) {
            console.log("Err");
            console.log(err);
            getData()
        }
    }
    const OrderLocationInfo = async (product) => {
        const value = document.getElementById(product.id).value;
        const track = product.track;
        track.push(value)
        document.getElementById(product.id).value = "";
        const data = {
            ...product,
            track
        }
        console.log(trackReset)
        if(trackReset){
            const data = {
                ...product,
                track:[]
            }
            try {
                const result = await setDoc(doc(shopcloneDB, "orders", product.id), data);
                console.log("success");
                getData()
            } catch (err) {
                console.log("Err");
                console.log(err);
                getData()
            }
        }else
        if(value !== ""){
            try {
                const result = await setDoc(doc(shopcloneDB, "orders", product.id), data);
                console.log("success");
                getData()
            } catch (err) {
                console.log("Err");
                console.log(err);
                getData()
            }
        }
    }
    return (
        <div className="row mx-n2 mx-sm-n3 my-5" style={{color:Colors.Black}}>
            <div className="col-lg-6 col-10 m-auto">
            <div className="form-group my-1">
                <input value={SearchKey} onChange={(e) => {
                    setSearchKey(e.target.value.toLowerCase());
                    setSearchName("");
                    setSearchId("");

                }} type="text" className="form-control" placeholder="search product" />
            </div>
            <div className="form-group my-1">
                <input value={SearchName} onChange={(e) => {
                    setSearchKey("");
                    setSearchName(e.target.value.toLowerCase());
                    setSearchId("");
                }} type="text" className="form-control" placeholder="search by id" />
            </div>
            <div className="form-group my-1">
                <input value={SearchId} onChange={(e) => {
                    setSearchKey("");
                    setSearchName("");

                    setSearchId(e.target.value.toLowerCase());
                }} type="text" className="form-control" placeholder="search email" />
            </div>

            {
                <div className="text-center">
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
                        return <div className="col-10 mx-auto my-5" style={{color:Colors.Gray, border:"1px solid "+Colors.Gray, borderRadius:"10px", fontFamily:Font}}>
                            <div className="row">
                            <div className="col-12">
                                <h3 className="text-center" style={{color:Colors.primary}}>{product.product.title}</h3>
                                <h4 className="text-center " style={{color:Colors.Gray}}><FaTag size={30} className=" text-primary" /> {product.product.price}</h4>
                            </div>
                            </div>
                            <hr />
                            <div className="col-12 d-flex flex-direction-row justify-content-center">
                            <div className="col-6 text-center">
                                <h5 className="text-center" style={{color:Colors.Primary}}>Receiver detail</h5>
                                <h6>Phone No. </h6>{product.DetailedAddress.ParcelReceiverPhoneNo}
                                <h6>Address </h6>{product.DetailedAddress.parcelAddress}
                                <h6>Area Pincode </h6>{product.DetailedAddress.parcelPinCode}
                                <h6>dispatched </h6>{product.dispatched ? "yes" : "no"}

                            </div>
                            <div className="col-6 text-center">
                                <h5 className="text-center" style={{color:Colors.primary}}>Sender detail</h5>
                                <h6>Sender Name</h6>
                                    <p>{product.UserName}</p>
                                <h6>Sender Id</h6>
                                <p>{product.userId}</p>
                            </div>
                            </div>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-around",
                                marginBottom: "10px"
                            }}>

                                <button className="btn btn-danger" onClick={() => {
                                    DeleteItem(product.id);
                                }}>delete product</button>
                                <button className="btn" onClick={() => {
                                    SendMail(product);
                                }}
                                style={{backgroundColor:Colors.Gray, color:Colors.secondary}}
                                >dispatched</button>
                            </div>
                            <div className="row my-auto" >
                                <div className="col-12" style={{overflowX:"scroll"}}>
                                    <LocationTrack product={product}/>
                                </div>
                            </div>
                            <div className="row my-3">
                                <div className="col-8 form-group">
                                    <textarea
                                        rows="5"
                                        className="form-control"
                                        id={product.id}
                                    >
                                    </textarea>
                                </div>
                                <div className="col-4 form-group">
                                    
                                    <button className="btn form-control"
                                        onClick={() => {
                                            OrderLocationInfo(product);
                                        }}
                                        style={{backgroundColor:Colors.primary, color:Colors.secondary}}
                                        >
                                        order Location
                                    </button>
                                    <input type="checkbox" 
                                    value={trackReset} 
                                    onChange={()=>{
                                        SetTrackReset(!trackReset)
                                        console.log("Now "+trackReset)
                                    }}/><strong style={{color:Colors.Gray}}>Reset Track</strong>
                                </div>

                            </div>

                        </div>
                    })
            }
        </div>
    )
}
export default OrdersAdmin;
