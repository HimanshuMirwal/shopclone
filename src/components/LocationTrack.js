import React from "react";
import { Colors } from "../Colors";
import { FaCheck } from "react-icons/fa";
import { Box, Step, StepLabel, Stepper } from "@material-ui/core";
const LocationTrack = (props) => {
    const product = props.product
    return (
        <div className="text-center">
            <strong style={{ color: Colors.primary }}>Location tracker</strong>
            <Box sx={{ width: '100%', overflowX: "scroll" }}>
                <Stepper activeStep={product.track.length} alternativeLabel >
                    {product.track.map((label) => (
                        <Step key={label}>
                            <StepLabel color={Colors.Gray}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Box>
        </div>
    )
}
export default LocationTrack;
