import React from "react";

const Loader = () => {
    return (
        <div style={{
            height: "1500px",
            width: "100%",
            lineHeight: "500px",
        }}>
            <div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} variant="info" role="status">
            </div>
            <div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} variant="info" role="status">
            </div><div className="spinner-grow" style={{ width: "1rem", height: "1rem" }}  variant="info" role="status">
            </div><div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} variant="info" role="status">
            </div><div className="spinner-grow" style={{ width: "1rem", height: "1rem" }} variant="info" role="status">
            </div>
        </div>
    )
}
export default Loader;
