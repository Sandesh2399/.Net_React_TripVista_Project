import { useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function SearchPackage() {
    const [priceRage, setPriceRage] = useState<number[]>([2000, 5000]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setPriceRage(newValue as number[]);
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <form className="form">
                        <div className="row mb-2">
                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                <label className="form-label">Destination</label>
                                <select name="" id="" className="form-control custom-select">
                                    <option value="">Destination</option>
                                    <option value="">Peru</option>
                                    <option value="">Japan</option>
                                    <option value="">Thailand</option>
                                    <option value="">Brazil</option>
                                    <option value="">United States</option>
                                    <option value="">Israel</option>
                                    <option value="">China</option>
                                    <option value="">Russia</option>
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                <label className="form-label">No of People</label>
                                <input type="number" className="form-control" placeholder="# of People" />
                            </div>

                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                                <label className="form-label">Price Range</label>
                                <Box sx={{ width: 150 }}>
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={priceRage}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        max={10000}
                                    />
                                </Box>
                            </div>
                        </div>
                        <div className="row align-items-center mt-3">
                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                <input className="btn btn-primary btn-block" value="Search" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SearchPackage