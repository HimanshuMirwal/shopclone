import React from "react";

const Loader = () => {
    return (
        <div style={{
            height: "1000px",
            width: "100%",
            lineHeight: "500px",
            padding: "0 0 0 50%"
        }}>
            <div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} role="status">
            </div>
            <div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} role="status">
            </div><div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} role="status">
            </div><div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} role="status">
            </div><div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} role="status">
            </div>
        </div>
    )
}
export default Loader;
