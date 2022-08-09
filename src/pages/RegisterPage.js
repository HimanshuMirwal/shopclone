import React, { useState, useMemo } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { Colors } from "../Colors";
import { FaJediOrder } from "react-icons/fa"
import countryList from 'react-select-country-list'
import { Button, Form, Row } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    // const [Country, setCountry] = useState("")
    // const [displayName, setName] = useState("");
    // const [phoneNumber, setphoneNumber] = useState("")
    const [EmailValid, setEmailValid] = useState(false);
    // const [NameValid, setNameValid] = useState(false);
    // const [PhoneValid, setPhoneValid] = useState(false);
    const [PassValid, setPassValid] = useState(false);
    // const [CountryValid, setCountryValid] = useState(false);
    // const options = useMemo(() => countryList().getData(), [])
    const auth = getAuth();
    const onClickSubmit = async () => {
        if (EmailValid && PassValid ) {

            try {
                const result = await createUserWithEmailAndPassword(auth,
                    email, Pass
                )
                console.log(result);
                toast.success("success");
            } catch (err) {
                toast.error("Error while creating account, makesure you enterd correct details.");
                console.log(err);
            }
            setEmail("");
            setPass("")
        } else {
            if (!EmailValid) {
                toast.error("Check your Email")
            } else if (!PassValid) {
                toast.error("Check your Password")
            } 
        }

    }
    return (
        <Row>
            <ToastContainer />
            <div className="col-lg-4 col-md-5 col-10 m-auto my-5">
                <div className="text-center">
                    <FaJediOrder size={50} color={Colors.primary} />
                    <h1 className="h3 mb-3 fw-normal" style={{ color: Colors.primary }}>Signup to ShopClone</h1>
                </div>
                <Form>
                    {/* <div className="form-group my-2" >
                        <strong><label style={{ color: Colors.Gray }}>Name</label></strong>
                        <input value={displayName} onChange={(e) => {
                            setName(e.target.value)
                            let usernameRegex = /^[a-zA-Z0-9]+$/;
                            if (usernameRegex.test(displayName)) {
                                setNameValid(true)
                            } else {
                                setNameValid(false)
                            }
                        }
                        } type="text" className="form-control" placeholder="Enter Name" />
                    </div> */}
                    <div className="form-group my-2">
                        <strong><label style={{ color: Colors.Gray }}>Email address</label></strong>
                        <input value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                let usernameRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                                if (usernameRegex.test(email)) {
                                    setEmailValid(true)
                                } else {
                                    setEmailValid(false)
                                }
                            }} type="email" className="form-control" placeholder="Enter email" />
                    </div>
                    {/* <div className="form-group my-2">
                        <strong><label style={{ color: Colors.Gray }}>Phone Number</label></strong>
                        <input value={phoneNumber} onChange={(e) => {
                            setphoneNumber(e.target.value)
                            if (e.target.value.length === 10) {
                                setPhoneValid(true)
                            } else {
                                setPhoneValid(false)
                            }
                        }} type="number" size={10} className="form-control" placeholder="Enter Phone number +91xxxxxxxxxx" />
                    </div> */}
                    {/* <div className="form-group my-2">
                        <strong><label style={{ color: Colors.Gray }}>Country</label></strong>
                        <select className="form-control" value={Country} onChange={(e) => {
                            setCountry(e.target.value)
                            if (e.target.value !== "") {
                                setCountryValid(true)
                            } else {
                                setCountryValid(false)
                            }
                        }}>         <option className="form-control" value="">select country</option>
                            {
                                options.map(country => {
                                    return <option key={country.value} className="form-control" value={country.label}>{country.label}</option>
                                })
                            }
                        </select>
                    </div> */}
                    <div className="form-group my-2">
                        <strong><label style={{ color: Colors.Gray }}>Password</label></strong>
                        <input value={Pass} onChange={(e) => {
                            setPass(e.target.value)
                            if (Pass.match(/[a-z]/g) && Pass.match(
                                /[A-Z]/g) && Pass.match(
                                    /[0-9]/g) && Pass.match(
                                        /[^a-zA-Z\d]/g) && Pass.length >= 8) {
                                setPassValid(true)
                            } else {
                                setPassValid(false)
                            }
                        }} type="password" className="form-control ali" placeholder="Enter Password..." />
                    </div>
                    <label className="form-label">
                        Input Password must contain [7 to 15 characters which contain only characters, numeric digits, underscore and first character must be a letter]
                    </label>
                    <div className="row d-flex  flex-direction-column justify-content-center align-items-center">
                        <div className="col-5">
                            {/* {console.log("email " + EmailValid + " PAssword " + PassValid + " Phone " + PhoneValid + " name " + NameValid + " Country " + CountryValid)} */}
                            <Button
                                style={{
                                    color: Colors.secondary,
                                    background: Colors.primary,
                                    
                                    border: "0px",
                                    paddingLeft: "25px",
                                    paddingRight: "25px",
                                    marginBottom: "25px",
                                    width: "100%"
                                }}
                                onClick={() => onClickSubmit()} type="button">
                                Sign Up
                            </Button>
                        </div>
                        <div className="row-cols-1 text-center d-flex my-5 ">
                            <a style={{ color: Colors.Gray }} href="/login">Login here</a>
                        </div>

                    </div>
                </Form>
            </div>
        </Row>

    )
}
export default RegisterPage;
