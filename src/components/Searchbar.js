import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react"
import { Colors } from "../Colors"
import shopCloneDB from "../FirebaseConfig";
import { TextField, InputLabel, Select, MenuItem,FormControl,Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { Brands } from "../pages/Category";
import { toast, ToastContainer } from "react-toastify";
const Searchbar = () => {
    const [ProductsName, SetProductsName] = useState([]);
    const [SearchType, setSearchType] = useState("Product Name");
    const [ProductsBrand, SetProductsBrand] = useState(Brands);
    const [SearchedData, SetSearchedData] = useState([])
    const getData = async () => {
        const data = await getDocs(collection(shopCloneDB, "shopclone"));
        const FinalProductsName = [];
        data.forEach(product => {
            const obj = {
                id: product.id,
                ...product.data()
            }
            FinalProductsName.push({ title: obj.title, id: obj.id });
        })
        // console.log(FinalProductsBrand)
        SetProductsName(FinalProductsName);
    }
    function onClickSearch() {
        const searchedQuery = document.getElementById("searchBarValue").value;
        const found = ProductsBrand.find(element => element===searchedQuery);
        const data = ProductsName.filter(data=>data.title === searchedQuery)
        if((searchedQuery !=="") && (data[0])&& (SearchType === "Product Name")){
            // alert("All condition are true")
            window.location.href=`https://shopclonehimanshu.herokuapp.com/detail/${data[0].id}`
        }else if((SearchType === "Product Brand") && (found)){
            window.location.href=`https://shopclonehimanshu.herokuapp.com/product/brand/${searchedQuery}`
        }else{
           toast("Product  ot brand you are looking for is not available at this moment") 
        }
    }
    return (
        <div className="d-flex w-100  flex-direction-row justify-content-center align-items-center">
            <ToastContainer/>
            <div className="form-group mx-1 mb-4 w-lg-75 w-50">
                <Autocomplete
                    freeSolo
                    autoComplete
                    autoHighlight
                    id="searchBarValue"
                    options={SearchType === "Product Name" ? ProductsName.map(data => data.title) : ProductsBrand}
                    renderInput={(params) => (
                        <TextField {...params}
                            style={{ height: "10px" }}
                            onChange={(e) => {
                                getData()
                            }}
                            variant="outlined"
                            label="Search Box"
                            id="searchBarValue"
                        />
                    )}
                />
            </div>
            <div className="form-group mx-1 w-25">
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={SearchType}
                    label="Age"
                    onChange={(e) =>{ 
                        setSearchType(e.target.value)
                    }}
                >
                    <MenuItem value="Product Name">Product Name</MenuItem>
                    <MenuItem value="Product Brand">Product Brand</MenuItem>
                </Select>
                </FormControl>
            </div>
            <div className="form-group ms-1 w-auto">
            <Button 
            onClick={()=>onClickSearch()}
            className="btn mx-auto w-auto" style={{ color: Colors.primary, border: `2px solid ${Colors.primary}` }} variant="outlined">Search</Button>
            </div>
        </div>)
}
export default Searchbar