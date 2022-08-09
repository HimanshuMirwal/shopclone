import React from "react";
import Footer from "./Footer";
import Header from "./Header";
const Layout = (props) => {
    return (
        <>
            <Header />
            <div className="container-fluid" style={{padding:"0px", overflow:"hidden"}}>
                {props.children}
            </div>
            <Footer/>
        </>
    )
}
export default Layout;
