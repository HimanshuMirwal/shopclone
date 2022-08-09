import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { FaJediOrder } from "react-icons/fa"
import { Colors } from "../Colors";
import { Form, Button, Row } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [Pass, setPass] = useState("");
    const auth = getAuth();
    const onClickSubmit = async () => {
        try {
            const result = await signInWithEmailAndPassword(auth,
                email, Pass
            )
            console.log(result);
            localStorage.setItem("CurrentUser", JSON.stringify(result));
            localStorage.setItem("currentUserCredentials", JSON.stringify({ email: email, Pass: Pass }))
            toast.success("Login Successfull")
            window.location.href = "/";
        } catch (err) {
            toast.error("Error while login, kindly check Email and Password.")
        }
    }
    return (
        <Row>
            <ToastContainer />
            <div className="col-lg-4 col-md-5 col-10 m-auto my-5">
            <div className="text-center">
            <FaJediOrder size={50} color={Colors.primary} />
            <h1 className="h3 mb-3 fw-normal" style = {{color:Colors.primary}}>Sign In to ShopClone</h1> 
            </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label style = {{color:Colors.Gray}}>Email address</Form.Label>
                        <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted"  style = {{color:Colors.third}}>
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label style = {{color:Colors.Gray}}>Password</Form.Label>
                        <Form.Control  onChange={(e)=>setPass(e.target.value)} value={Pass}  type="password" placeholder="Password" />
                    </Form.Group>
                    <div className="row d-flex  flex-direction-column justify-content-center align-items-center">
                    <div className="col-5">
                    <Button  
                    style={{color:Colors.secondary,
                     background:Colors.primary,
                      border:"0px",
                        paddingLeft:"25px",
                        paddingRight:"25px",
                        marginBottom:"25px",
                        width:"100%"
                    }} 
                    onClick={()=>onClickSubmit()} type="button">
                        Submit
                    </Button>
                    </div>
                    <div className="row-cols-2 text-center d-flex ">
                    <a href="https://shopclonehimanshu.herokuapp.com/register">Signup Here</a>
                    <a href="https://shopclonehimanshu.herokuapp.com/forgot">Forgot Password</a>
                    </div>
                    
                    </div>
                    
                </Form>
            </div>
        </Row>
        /* <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_xbcftl35.json"  background="transparent"  speed="1"  style={{ width: "100%", height: "100%" }}  loop  autoplay></lottie-player> */

        /* <lottie-player
                            src="https://assets3.lottiefiles.com/packages/lf20_57TxAX.json"
                            background="transparent"
                            speed="1"
                            style={{ width: "100%", height: "100%" }}
                            loop autoplay
                            className="img-fluid"
                        ></lottie-player> */
        /* </div> */

    )
}
export default LoginPage;
