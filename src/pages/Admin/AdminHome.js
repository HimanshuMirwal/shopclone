import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
// import { data } from "../data";
import shopcloneDB from "../../FirebaseConfig";
import { addDoc, getDocs, collection, setDoc, doc, deleteDoc } from "firebase/firestore";
import "../../styleSheets/homaPage.css";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa"
import Loader from "../../components/Loader";
import { Button, Modal, Tabs, Tab } from "react-bootstrap";
import OrdersAdmin from "./OrdersAdmin";
import RequestToCancel from "./RequestToCancel";
import { Colors } from "../../Colors";
import { CategoryData, Brands } from "../Category";
const AdminHome = () => {
    const [show, setShow] = useState(false);
    const [key, setKey] = useState("Products")
    const [deleteClick, setDeleteClicked] = useState(false);
    const currentuser = JSON.parse(localStorage.getItem("CurrentUser"));
    const handleClose = () => setShow(false);
    const [ModalHeader, setModalHeader] = useState("");
    const handleShow = () => setShow(true)
    const [EditProduct, setEditProduct] = useState({
        brand:"",
        id: "",
        description: "",
        category: "",
        rating: {
            count: 0,
            rate: 0
        },
        image: "",
        price: 0,
        title: ""
    })
    const [Products, SetProducts] = useState([]);
    const [searchKey, setSearchKey] = useState("");
    const [FilterKey, setFilterKey] = useState("");

    useEffect(() => {
        getData();
    }, [show, deleteClick])
    const getData = async () => {
        const data = await getDocs(collection(shopcloneDB, "shopclone"));
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


    function EditInfo(product) {
        setModalHeader("Update Product")
        const modifiedProduct = {
            brand:product.brand,
            id: product.id,
            description: product.description,
            category: product.category,
            rating: {
                count: product.rating.count,
                rate: product.rating.rate
            },
            image: product.image,
            price: product.price,
            title: product.title
        }
        setEditProduct(modifiedProduct)
    }
    const FinalProductDetailToUpload = async () => {
        console.log(EditProduct)
        if (EditProduct.title !== "" && EditProduct.category !== "" && EditProduct.image !== "" && EditProduct.description !== "") {
            try {
                const result = await setDoc(doc(shopcloneDB, "shopclone", EditProduct.id), EditProduct);
                console.log("Success" + result);
                getData();
            } catch (err) {
                console.log("Err");
                console.log(err);
            }
        } else {
            alert("please fill the fields")
        }
        setEditProduct({
            brand:"",
            id: "",
            description: "",
            category: "",
            rating: {
                count: 0,
                rate: 0
            },
            image: "",
            price: 0,
            title: ""
        })
    }
    const DeleteProduct = async id => {
        console.log(id);
        try {
            const result = await deleteDoc(doc(shopcloneDB, "shopclone", id));
            console.log("Success" + result);
        } catch (err) {
            console.log("Error")
            console.log(err);
        }
        setDeleteClicked(!deleteClick);
    }
    const AddNewProduct = async () => {
        setModalHeader("Add Product")
        const clone = (({ id, ...o }) => o)(EditProduct);
        console.log(clone);
        if (EditProduct.title !== "" && EditProduct.category !== "" && EditProduct.image !== "" && EditProduct.description !== "") {
            try {
                const AddData = await addDoc(collection(shopcloneDB, "shopclone"), clone);
                console.log("Success");
            } catch (error) {
                console.log("Error")
                console.log(error)
            }
        } else {
            alert("please fill the fields")
        }
        setEditProduct({
            id: "",
            description: "",
            category: "",
            rating: {
                count: 0,
                rate: 0
            },
            image: "",
            price: 0,
            title: "",
            brand:""
        })
    }
    if (currentuser.user.email !== "himanshumirwal@gmail.com") {
        window.location.href = "/";
    }
    return (

        <Layout>
            {Object.keys(Products).length === 0 ? (
                <div className="row">
                    <div className="col-12  text-center">
                        <Loader />
                    </div>
                </div>
            ) : (

                <div className="row my-5">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="my-3 mx-5"
                    >
                        <Tab eventKey="Products" title="Products">
                            <div className="row d-flex flex-direction-row justify-content-center">
                                    <div className="col-5">
                                        <div className="form-group">
                                            <input value={searchKey} onChange={(e) => {
                                                setSearchKey(e.target.value);
                                            }} type="text" className="form-control" id="exampleInputPassword1" placeholder="search product" />
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <select value={FilterKey} onChange={(e) => {
                                                setFilterKey(e.target.value);
                                            }} id="" name="" className="form-control">
                                                <option value="">All</option>
                                                {
                                                    CategoryData.map(data=>{
                                                        return <option value={data}>{data}</option>
                                                    })
                                                }
                            
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-1 col-2">
                                        <div className="form-group">
                                            <button onClick={() => {
                                                handleShow();
                                                AddNewProduct();

                                            }} className="btn btn-outline-secondary"><FaPlus /></button>
                                        </div>
                                    </div>
                            </div>
                            {
                                Products
                                    .filter(obj => {
                                        const NewDataToLowerCase = searchKey.toLowerCase()
                                        return obj.title.toLowerCase().includes(NewDataToLowerCase)
                                        })
                                    .filter(obj => {
                                            return FilterKey===""?obj.category.toLowerCase().includes(""):obj.category.toLowerCase()===FilterKey
                                        })
                                    .map(product => {
                                        return (
                                            <div style={{ color: Colors.Gray }}>
                                                <div className="col-10 mx-auto">
                                                    <div className="row my-4">
                                                        <h4 className="text-center" style={{ color: Colors.primary }}>{product.title}</h4>
                                                        <div className="col-2">
                                                            <img src={product.image} height="50hv" width="50vh" alt={product.title} />
                                                        </div>
                                                        <div className="col-2">
                                                            <h6>${product.price}</h6>
                                                        </div>
                                                        <div className="col-3">
                                                            {product.category}
                                                        </div>
                                                        <div className="col-2">
                                                            {product.brand}
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                justifyContent: "space-between"
                                                            }}
                                                            className="col-3">
                                                            <button onClick={() => {
                                                                DeleteProduct(product.id)
                                                            }} type="button" className="btn btn-danger ">
                                                                <FaTrash size={20} />
                                                            </button>
                                                            <button onClick={() => {
                                                                EditInfo(product);
                                                                handleShow();
                                                            }} type="button" className="btn" style={{ color: Colors.secondary, background: Colors.Gray }}>
                                                                <FaEdit size={20} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        )
                                    })
                            }
                            <Modal show={show} onHide={handleClose}>
                                <Modal.Header>
                                    <Modal.Title>{ModalHeader}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="form-group">
                                        <label className="col-form-label-sm">Name</label>
                                        <input type="text"
                                            className="form-control"
                                            value={EditProduct.title}
                                            placeholder="enter product name"
                                            onChange={(e) => {
                                                setEditProduct({
                                                    ...EditProduct,
                                                    title: e.target.value
                                                })
                                            }}
                                        />
                                        <label className="col-form-label-sm">Brand</label>
                                        <select
                                            onChange={(e) => {
                                                setEditProduct({
                                                    ...EditProduct,
                                                    brand: e.target.value
                                                })
                                            }}
                                            value={EditProduct.brand} className="form-control">
                                            <option value="">Select brands</option>
                                            {Brands.map(data=>{
                                                return <option value={data}>{data}</option>
                                            })}
                                        </select>
                                        <label className="col-form-label-sm">price</label>
                                        <input type="text"
                                            className="form-control"
                                            value={EditProduct.price}
                                            onChange={(e) => {
                                                setEditProduct({
                                                    ...EditProduct,
                                                    price: e.target.value
                                                })
                                            }}
                                            placeholder="enter product price" />
                                        <label className="col-form-label-sm">desciption</label>
                                        <textarea
                                            className="form-control"
                                            onChange={(e) => {
                                                setEditProduct({
                                                    ...EditProduct,
                                                    description: e.target.value
                                                })
                                            }}
                                            value={EditProduct.description} rows="3" placeholder="enter product description"></textarea>
                                        <label className="col-form-label-sm">category</label>
                                        <select
                                            onChange={(e) => {
                                                setEditProduct({
                                                    ...EditProduct,
                                                    category: e.target.value
                                                })
                                            }}
                                            value={EditProduct.category} className="form-control">
                                            <option value="">choose...</option>
                                            {CategoryData.map(data=>{
                                                return <option value={data}>{data}</option>
                                            })}
                                        </select>
                                        <label className="col-form-label-sm">Image URL</label>
                                        <input
                                            onChange={(e) => {
                                                setEditProduct({
                                                    ...EditProduct,
                                                    image: e.target.value
                                                })
                                            }}
                                            type="text" className="form-control" value={EditProduct.image} placeholder="enter product image URL" />
                                        <label className="col-form-label-sm">Rating</label>
                                        <input
                                            onChange={(e) => {
                                                setEditProduct({
                                                    ...EditProduct,
                                                    rating: {
                                                        rate: e.target.value,
                                                        count: EditProduct.rating.count
                                                    }
                                                })
                                            }}
                                            type="number" className="form-control" value={EditProduct.rating.rate} placeholder="enter product rate" />
                                        <label className="col-form-label-sm">count</label>
                                        <input
                                            onChange={(e) => {
                                                setEditProduct({
                                                    ...EditProduct,
                                                    rating: {
                                                        count: e.target.value,
                                                        rate: EditProduct.rating.rate
                                                    }
                                                })
                                            }}
                                            type="number" className="form-control" value={EditProduct.rating.count} placeholder="enter product count" />
                                    </div>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary" onClick={() => {
                                        ModalHeader === "Update Product" ? FinalProductDetailToUpload() : AddNewProduct()
                                        handleClose();
                                    }}>
                                        {ModalHeader}
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Tab>
                        <Tab eventKey="Orders" title="Orders">
                            <OrdersAdmin />
                        </Tab>
                        <Tab eventKey="OrderCancelRequest" title="OrderCancelRequest">
                            <RequestToCancel />
                        </Tab>
                    </Tabs>
                </div>)
            }
        </Layout>
    )
}
export default AdminHome;
