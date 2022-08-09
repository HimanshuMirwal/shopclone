import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { FaJediOrder } from "react-icons/fa"
import { Colors } from "../Colors";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Forgot = () => {
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] =useState(false);
    const auth = getAuth();
    const onClickSubmit = async () => {
        sendPasswordResetEmail(auth, email).then(result => {
            toast.success("Reset Link has send to your email.");
            console.log("result" + result)
        }).catch(Err => {
            toast.error("Error while sending email");
            console.log("Err" + Err)
        })
        setEmail("");
        setEmailValid(false);
    }
    function OnchangeEmail(e){
        setEmail(e)
        let regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        let email = e
        if (regexEmail.test(email)) {
            console.log("It's Okay")
            setEmailValid(true)
        } else {
            console.log("Not Okay")
            setEmailValid(false)
        }
    }
    return (
        
        <div className="d-flex align-items-center justify-content-center my-5">
            <ToastContainer />
            <div className="row">
                <div className="col-12 m-auto">
                    <div className="row">
                        <div className="col-12 my-2">
                            <h2 style={{ color: Colors.primary }}>
                                <FaJediOrder color={Colors.primary} size={50} />
                                ShopClone</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12 w-100 my-5">
                            <div className="form-group my-1">
                                <label style={{ color: Colors.Gray }}>Email address</label>
                                <input value={email} onChange={(e) => OnchangeEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="d-grid gap-2 col-12 mx-auto">
                                {emailValid && <button 
                                style={{ color: Colors.secondary, backgroundColor: Colors.primary, margin: "20px 0" }} 
                                onClick={() => onClickSubmit()} 
                                type="button" 
                                className="btn btn-block">Reset</button>}
                                <a href="/login" style={{ color: Colors.Gray }}>Login</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default Forgot;
