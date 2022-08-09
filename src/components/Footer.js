import React from "react";
import { FaRocket,FaFacebook, FaInstagram,FaJediOrder, FaTwitter, FaLinkedin, FaPinterest } from 'react-icons/fa';
import { BsCurrencyExchange, BsFillCreditCardFill} from 'react-icons/bs';
import { BiSupport  } from 'react-icons/bi';
import {Colors, Font} from "../Colors";
import {CategoryData} from "../pages/Category"
const Footer = () => {
    return (
        <footer className="footer  pt-5" style={{background:Colors.primary,
          fontFamily:Font.fontFamily
        }}>
      <div className="container">
        <div className="row pb-2">
          <div className="col-lg-4 col-6">
            <div className="widget widget-links widget-light pb-2 mb-4">
              <h3 className="widget-title" style={{color:Colors.Gray, fontWeight:"bold"}}>Shop departments</h3>
              <ul className="widget-list" style={{listStyleType:"none", padding:0}}>
              {
                CategoryData.map((items, idx) =>{
                  return  <li key={idx} className="widget-list-item">
                  <a className="widget-list-link" style={{color:Colors.secondary, textDecoration:"none"}} href={`https://shopclonehimanshu.herokuapp.com/product/category/${items.toLowerCase()}`}>{items}</a></li>
                })
              }
              </ul>
            </div>
          </div>
          <div className="col-lg-4 col-6">
            <div className="widget widget-links widget-light pb-2 mb-4">
              <h3 className="widget-title" style={{color:Colors.Gray, fontWeight:"bold"}}>About us</h3>
              <ul className="widget-list" style={{listStyleType:"none", padding:0}}>
                <li key={1} className="widget-list-item"><a className="widget-list-link" style={{color:Colors.secondary, textDecoration:"none"}} href="https://himanshumirwal.github.io/me">About company</a></li>
                <li key={2} className="widget-list-item"><a className="widget-list-link" style={{color:Colors.secondary, textDecoration:"none"}} href="https://himanshumirwal.github.io/me">Our team</a></li>
                <li key={3} className="widget-list-item"><a className="widget-list-link" style={{color:Colors.secondary, textDecoration:"none"}} href="https://himanshumirwal.github.io/me">Careers</a></li>
                <li key={4} className="widget-list-item"><a className="widget-list-link" style={{color:Colors.secondary, textDecoration:"none"}} href="https://himanshumirwal.github.io/me">News</a></li>
              </ul>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="widget pb-2 mb-4">
              <h3 className="widget-title pb-1" style={{color:Colors.Gray, fontWeight:"bold"}}>Stay informed</h3>
              <form className="subscription-form validate" action="mailto:himanshumirwal@gmail.com" method="post" name="mc-embedded-subscribe-form" target="_blank" noValidate="">
                <div className="input-group flex-nowrap"><i className="ci-mail position-absolute top-50 translate-middle-y text-muted fs-base ms-3"></i>
                  <input className="form-control rounded-start" type="email" name="EMAIL" placeholder="Your email" required="" />
                  <button className="btn" style={{background:Colors.Gray,color:Colors.secondary}} type="submit" name="subscribe">Subscribe*</button>
                </div>
                <div style={{position: "absolute", left: "-5000px"}} aria-hidden="true">
                  <input className="subscription-form-antispam" type="text" name="b_c7103e2c981361a6639545bd5_29ca296126" tabIndex="-1" />
                </div>
                <div className="form-text  opacity-50">*Subscribe to our newsletter to receive early discount offers, updates and new products info.</div>
                <div className="subscription-status"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-5 bg-darker">
        <div className="container">
          <div className="row pb-3">
            <div key={1} className="col-lg-4 col-6 mb-4">
              <div className="d-flex">
                <FaRocket size={50}/>
                <div className="ps-3">
                  <h6 className="fs-base  mb-1" style={{color:Colors.Gray, fontWeight:"bold"}}>Fast and free delivery</h6>
                  <p className="mb-0 fs-ms text-light opacity-50">Free delivery for all orders over $200</p>
                </div>
              </div>
            </div>
            <div key={2} className="col-lg-4 col-6 mb-4">
              <div className="d-flex">
                <BsCurrencyExchange size={50}/>
                <div className="ps-3">
                  <h6 className="fs-base  mb-1" style={{color:Colors.Gray, fontWeight:"bold"}}>Money back guarantee</h6>
                  <p className="mb-0 fs-ms text-light opacity-50">We return money within 30 days</p>
                </div>
              </div>
            </div>
            <div key={3} className="col-lg-3 col-6 mb-4">
              <div className="d-flex">
                <BiSupport size={50}/>
                <div className="ps-3">
                  <h6 className="fs-base  mb-1" style={{color:Colors.Gray, fontWeight:"bold"}}>24/7 customer support</h6>
                  <p className="mb-0 fs-ms text-light opacity-50">Friendly 24/7 customer support</p>
                </div>
              </div>
            </div>
            <div key={4} className="col-lg-3 col-6 mb-4">
              <div className="d-flex">
              <BsFillCreditCardFill size={50}/>
                <div className="ps-3">
                  <h6 className="fs-base  mb-1" style={{color:Colors.Gray, fontWeight:"bold"}}>Secure online payment</h6>
                  <p className="mb-0 fs-ms text-light opacity-50">We possess SSL / Secure сertificate</p>
                </div>
              </div>
            </div>
          </div>
          <hr className="hr-light mb-5" />
          <div className="row pb-2">
            <div className="col-lg-6 text-center text-md-start mb-4">
              <div className="text-nowrap mb-4">
              <a className="d-inline-block align-middle mt-n1 me-3" href="/">
                <FaJediOrder size={100} style={{color:Colors.Gray}}/>
              </a>  
              </div>
            </div>
            <div className="col-lg-6 text-center text-md-end mb-4">
              <div className="mb-3">
              <a key={1} className="btn-social bs-light bs-twitter ms-2 mb-2" href="/">
              <FaTwitter size={30} style={{color:Colors.Gray}}/></a>
              <a key={2} className="btn-social bs-light bs-facebook ms-2 mb-2" href="/">
              <FaFacebook size={30} style={{color:Colors.Gray}}/></a>
              <a key={3} className="btn-social bs-light bs-instagram ms-2 mb-2" href="/">
              <FaInstagram size={30} style={{color:Colors.Gray}}/></a>
              <a key={4} className="btn-social bs-light bs-pinterest ms-2 mb-2" href="/">
              <FaPinterest size={30} style={{color:Colors.Gray}}/></a>
              <a key={5} className="btn-social bs-light bs-pinterest ms-2 mb-2" href="/">
              <FaLinkedin size={30} style={{color:Colors.Gray}}/></a>
              </div>
            </div>
          </div>
          <div className="pb-4 fs-xs opacity-50 text-center text-md-start" style={{color:Colors.Gray}}>
          © All rights reserved. Made by  
          <a  href="https://himanshumirwal.github.io/me" className="mx-2" target="_blank" rel="noreferrer">
             Himanshu Mirwal</a></div>
        </div>
      </div>
    </footer>
    )
}
export default Footer;
