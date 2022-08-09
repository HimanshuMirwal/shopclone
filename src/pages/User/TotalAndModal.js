import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import shopcloneDB from "../../FirebaseConfig";
import { REMOVE_TO_CART } from "../../redux/Actions/Action";
import { Colors } from "../../Colors";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const TotalAndModal = (props) => {
    const [show, setShow] = useState(false);
    const Dispatch = useDispatch();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [nameValid, setNameValid] = useState(false);
    const [addressValid, setAddressValid] = useState(false);
    const [pinCodeValid, setPinCodeValid] = useState(false);
    const [phoneNumberValid, setPhoneNumberValid] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { CartItems } = useSelector(state => state.CartReducer);

    const onClickSubmit = async () => {
        const DetailedAddress = {
            parcelto: name,
            parcelAddress: address,
            parcelPinCode: pinCode,
            ParcelReceiverPhoneNo: phoneNumber
        }
        const { user } = JSON.parse(localStorage.getItem("CurrentUser"));
        const UserName = user.email;
        const id = user.uid;

       
        CartItems.forEach(async (product)=>{
            const orderInfo = {
                product,
                DetailedAddress,
                UserName,
                userId: id,
                dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
                dispatched:false,
                track:[],
            }
            try{
                const result = await addDoc(collection(shopcloneDB, "orders"), orderInfo);
                console.log(result);
                toast.success("order Successfully placed.");
                CartItems.forEach(item => {
                    Dispatch({type:REMOVE_TO_CART,payload:item.tempId})
                });
            }catch(Err){
                console.log(Err);
                toast.error("Error while placing order.");
            }
        })
    }
    return (
        <div>
            <div className="row my-3">
                <div className="col-12 text-center" style={{ color: Colors.primary }}>
                {props.total!==0 && <h5 style={{ color: Colors.Gray }}>Total : ${props.total}</h5>}
                </div>
            </div>
            <div className="row my-3">
                <div className="col-12 text-center">
                {props.total===0 && <div className="text-center">
                    <h2 style={{ color: Colors.primary }}>Cart is empty</h2>
                    <a href="https://shopclonehimanshu.herokuapp.com/" style={{ color: Colors.Gray }}><h4>Shop Now!</h4></a>
                </div>}
                    {props.total!==0 && <button 
                    className="btn btn-group-lg" 
                    style={{ color: Colors.secondary, background:Colors.Gray }}
                    onClick={handleShow}>
                        Place Order
                    </button>}
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title style={{ color: Colors.primary }}>Add Address</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label for="exampleInputEmail1" style={{ color: Colors.Gray }}>Name</label>
                            <input value={name} onChange={(e) => {
                                setName(e.target.value)
                                if(name.length >2){
                                    setNameValid(true)
                                }else{
                                    setNameValid(false)
                                }
                                }} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter name" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1" style={{ color: Colors.Gray }}>Address</label>
                            <textarea value={address} onChange={(e) => {
                                setAddress(e.target.value)
                                const len = address.length;
                                if( len>15){
                                    setAddressValid(true)
                                }else{
                                    setAddressValid(false)
                                }
                                }}
                                rows="5" cols="20" className="form-control" id="exampleInputPassword1"
                                placeholder="enter address Hno. gali no 0-C Azad Nagar yamuna nagar">
                            </textarea>
                        </div>
                        <div className="form-group">
                            <label for="exampleInputEmail1" style={{ color: Colors.Gray }}>pinCode</label>
                            <input value={pinCode} onChange={(e) => {
                                setPinCode(e.target.value)
                                const len = pinCode.length;
                                if( len >5 && pinCode!==0){
                                    setPinCodeValid(true)
                                }else{
                                    setPinCodeValid(false)
                                }
                                }}
                                 type="number"
                                className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder="Enter area Pincode 135001" />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1" style={{ color: Colors.Gray }}>phoneNumber</label>
                            <input value={phoneNumber} onChange={(e) => {
                                setPhoneNumber(e.target.value)
                                const usernameRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
                            if (usernameRegex.test(phoneNumber)) {
                                console.log("valid")
                                setPhoneNumberValid(true)
                            } else {
                                console.log("!valid")
                                setPhoneNumberValid(false)
                            }
                                }}
                                type="number" className="form-control"
                                id="exampleInputPassword1" placeholder="Enter Phone Number +91xxxxxxxxxx" />
                        {console.log("nameValid   phoneNumberValid   addressValid   pinCode ")}
                    {console.log(nameValid +" "+  phoneNumberValid +" "+ addressValid +" "+ pinCodeValid)}
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ background: Colors.Gray, color:Colors.secondary,border:"0px" }} onClick={handleClose}>
                        Close
                    </Button>
                    
                    {(nameValid &&  phoneNumberValid && addressValid && pinCode ) &&<Button style={{ background: Colors.primary, color:Colors.secondary,border:"0px" }}  onClick={() => {
                        onClickSubmit()
                        handleClose()
                    }}>
                        Order
                    </Button>}
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default TotalAndModal;
