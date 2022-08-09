import React, { useState, useEffect } from "react";
import { Colors, Font } from "../../Colors";
import Marquee from "react-fast-marquee";
import Slider from "../../components/Slider";
import { Row } from "react-bootstrap";
import { Brands } from "../../BrandsImages/BrandImages"
import { collection, getDocs, query, where } from "firebase/firestore";
import shopCloneDB from "../../FirebaseConfig";
import TrandingProducts from "./TrandingProducts";
import { FaArrowRight } from "react-icons/fa"
import Layout from "../../components/Layout"
import { ToastContainer } from 'react-toastify';
import { CategoryData, Brands as BrandData } from "../Category";

const DisplayFeatures = () => {
    const images = [
        {
            image: "http://kcult.in/wp-content/uploads/2021/02/1152290-black-women-model-T-shirt-short-hair-brunette-Asian-blue-background-photography-dress-green-blue-fashion-laughing-turtlenecks-leather-spring-clothing-Masami-Nagasawa-co-e1614166962118.jpg",
            title: "Women's clothing",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text .and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            image: "https://thumbs.dreamstime.com/b/woman-chooses-sandals-other-seasonal-shoes-female-legs-jeans-sneakers-boots-white-background-sale-choosing-foot-171147180.jpg",
            title: "Men's clothing",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text .and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            image: "https://i.pinimg.com/originals/d3/31/d8/d331d8d031901be26b593fec1c50f0a7.jpg",
            title: "Men's Shoes",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text .and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            image: "https://i0.wp.com/becomeafashionista.com/wp-content/uploads/2021/06/fashion-on-a-budget.jpg?resize=1600%2C700&ssl=1",
            title: "Eyewear",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text .and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];
    const brandCloths = [
        Brands.adidas, Brands.champian, Brands.hijab, Brands.levis, Brands.patagonia, Brands.ralph, Brands.spire, Brands.tommy
    ]
    const brandShoes = [
        Brands.adidas, Brands.nikeShoes, Brands.flemingiShoes, Brands.tigerShoes
    ]
    const [suggestion, setSuggestion] = useState([]);
    const [suggestionShoes, setSuggestionShoes] = useState([]);

    useEffect(() => {
        suggestionDataToDisplay()
        suggestionDataToDisplayShoes()
    }, [])
    const suggestionDataToDisplay = async () => {
        try {
            const suggestionData = await getDocs(query(collection(shopCloneDB, "shopclone"), where("category", "==", "women's clothing")));
            const suggestionUpdatedData = [];
            suggestionData.forEach(item => {
                const data = {
                    id: item.id,
                    ...item.data()
                }
                suggestionUpdatedData.push(data);
            })
            setSuggestion(suggestionUpdatedData);
            console.log(suggestionUpdatedData)
        } catch (Err) {
            console.log(Err)
        }
    }
    const suggestionDataToDisplayShoes = async () => {
        try {
            const suggestionData = await getDocs(query(collection(shopCloneDB, "shopclone"), where("category", "==", "men's clothing")));
            const suggestionUpdatedData = [];
            suggestionData.forEach(item => {
                const data = {
                    id: item.id,
                    ...item.data()
                }
                suggestionUpdatedData.push(data);
            })
            setSuggestionShoes(suggestionUpdatedData);
            console.log(suggestionUpdatedData)
        } catch (Err) {
            console.log(Err)
        }
    }
    return (
        <Layout>
            <ToastContainer />

            <div className="row">
                <div className="col-12">
                    <Slider images={images.map(img => img.image)} />
                </div>
                <div className="col-10 mx-auto my-2">
                    <div className="row">
                    {images.map((data, idx) => (
                        <div className="col-lg-6 col-12 my-2" key={idx}>
                            <div className="card">
                                <img alt={idx} className="card-img-top img-thumbnail" src={data.image}/>
                                <div className="card-body">
                                    <h5 className="card-title"  style={{
                                                fontWeight: "bold",
                                                fontSize: "30px"
                                            }}><a
                                                href={`https://shopclonehimanshu.herokuapp.com/product/category/${data.title.toLowerCase()}`}
                                                style={{
                                                    textDecoration: "none",
                                                    color: Colors.primary,
                                                    fontFamily: Font
                                                }}>{data.title}</a></h5>
                                    <p className="card-text" style={{
                                            color: Colors.Gray,
                                            fontFamily: Font,
                                            fontSize: "15px"
                                        }}>
                                            {data.description}</p>
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>
                <Row className="my-5">
                    <div className="col-12">
                        <Marquee speed={40}>
                            {brandCloths.map(url => {
                                return <img className="m-2" key={url} src={url} alt={url} height="100px" width="150px" />
                            })}
                        </Marquee>
                    </div>
                </Row>

                <div className="row" style={{ margin: 0, padding: "20px" }}>
                    <div
                        style={{ background: Colors.primary, color: Colors.secondary }}
                        className="col-lg-3 col-12 text-center d-flex justify-content-center align-items-center">
                        <h1 style={{
                            fontFamily: Font
                        }}>Trending Men's Wear</h1>
                    </div>
                    <div className="col-lg-9 col-10 m-auto">
                        <div className="d-flex flex-direction-row overflow-scroll">
                            {
                                suggestion.map((item, index) => {
                                    return <TrandingProducts item={item} key={index} />
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="text-center pt-3">
                    <a className="btn"
                        href={"https://shopclonehimanshu.herokuapp.com/product/category/women's clothing"}
                        style={{ color: Colors.Light, background: Colors.primary, fontFamily: Font }}
                    >
                        More products <FaArrowRight size={25} /></a>
                </div>
                <Row className="my-5">
                    <div className="col-12">
                        <Marquee speed={40}>
                            {brandShoes.map(url => {
                                return <img className="m-2" key={url} src={url} alt={url} height="100px" width="150px" />
                            })}
                        </Marquee>
                    </div>
                </Row>
                <Row className="my-5 d-flex justify-content-center flex-direction-row" style={{ background: Colors.secondary }}>
                    <div className="col-10 text-center">
                        <h2 style={{ color: Colors.Gray, fontFamily: Font }}>Explore Our All Products</h2>
                    </div>
                    <div className="col-10 overflow-scroll">
                        {CategoryData.map(item => {
                            return <a href={`https://shopclonehimanshu.herokuapp.com/product/category/${item.toLowerCase()}`}><div
                                className="text-center rounded-pill m-2 p-2"
                                style={{
                                    background: Colors.primary,
                                    color: Colors.secondary,
                                    width: "fit-content", float: "left"
                                }}
                            >
                                {item}
                            </div></a>
                        })
                        }
                    </div>
                </Row>
                <Row style={{ margin: 0, padding: "20px" }}>
                    <div
                        style={{ background: Colors.primary, color: Colors.secondary }}
                        className="col-lg-3 col-12 text-center d-flex justify-content-center align-items-center">
                        <h1 style={{
                            fontFamily: Font
                        }}>Trending Men's Wear</h1>
                    </div>
                    <div className="col-md-9 col-10 m-auto">
                        <div className="d-flex flex-direction-row overflow-scroll">
                            {
                                suggestionShoes.map((item, index) => {
                                    return <TrandingProducts item={item} key={index} />
                                })
                            }
                        </div>
                    </div>

                </Row>
                <div className="text-center pt-3">
                    <a className="btn"
                        href={"https://shopclonehimanshu.herokuapp.com/product/category/men's clothing"}
                        style={{ color: Colors.Light, background: Colors.primary, fontFamily: Font }}
                    >
                        More products <FaArrowRight size={25} /></a>
                </div>
                <Row className="my-5 d-flex justify-content-center flex-direction-row" style={{ background: Colors.secondary }}>
                    <div className="col-10 text-center">
                        <h2 style={{ color: Colors.Gray, fontFamily: Font }}>Explore Our All Products by Brand</h2>
                    </div>
                    <div className="col-10 overflow-scroll">
                        {BrandData.map(item => {
                            return <a href={`https://shopclonehimanshu.herokuapp.com/product/brand/${item}`}><div
                                className="text-center rounded-pill m-2 p-2"
                                style={{
                                    background: Colors.primary,
                                    color: Colors.secondary,
                                    width: "fit-content", float: "left"
                                }}
                            >
                                {item}
                            </div></a>
                        })
                        }
                    </div>
                </Row>
                <section className="py-5 mt-5" style={{
                    background: Colors.third,
                    fontFamily: Font,
                    margin: 0,
                    padding: "20px"
                }}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h2 className="m-5 text-center"
                                    style={{ color: Colors.Gray, fontFamily: Font }}
                                >Latest in Blog</h2>

                            </div>
                        </div>
                        <div className="row">
                            {
                                images.map((item, index) => {
                                    if (index === 3) {
                                        return <></>
                                    }
                                    return <div className="col-12 col-lg-4 my-3" key={index}>

                                        <div className="card mb-7 shadow shadow-hover lift">

                                            <a href="https://himanshumirwal.github.io/me">
                                                <img src={item.image} alt="..." className="card-img-top" />
                                            </a>

                                            <div className="card-body px-8 py-7">

                                                <p className="mb-3 font-size-xs">
                                                    <a href="https://himanshumirwal.github.io/me" style={{ color: Colors.Gray, textDecoration: "none" }}>Fashion / Jun 20, 2022</a>
                                                </p>

                                                <h6 className="mb-0">
                                                    <a href="https://himanshumirwal.github.io/me" style={{ color: Colors.primary, textDecoration: "none" }}>
                                                        Us yielding Fish sea night night the said him two
                                                    </a>
                                                </h6>

                                            </div>


                                        </div>

                                    </div>
                                })
                            }
                            <div className="col-12 my-5 align-items-center justify-content-center d-flex">
                                <button
                                    style={{ background: Colors.primary, color: Colors.secondary }}
                                    className="btn"
                                    onClick={() => window.location.href = "https://shopclonehimanshu.herokuapp.com/product/category/all"}
                                >
                                    See Our All Products
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    )
}
export default DisplayFeatures;
