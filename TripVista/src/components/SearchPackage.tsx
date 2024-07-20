import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { IDestination } from "../Interfaces/IDestination";
import useAxiosAPI from "../API/AxiosService";
import { useAppDispatch } from "../redux/Store";
import { AddSearchParams } from "../redux/PackageSlice";
import { ISearchPakageParams } from "../Interfaces/ISearchPackageParams";
import { useNavigate } from "react-router-dom";

function SearchPackage() {
    const [noOfPeople, setNoOfPeople] = useState<number>(0);
    const [destinationId, setDestinationId] = useState<number>(0);
    const [priceRage, setPriceRage] = useState<number[]>([2000, 5000]);
    const [destinations, setDestinations] = useState<IDestination[]>([]);
    const { fetchData } = useAxiosAPI();
    const dispatch = useAppDispatch();
    const navigate =  useNavigate();

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const { result, error } = await fetchData('get', 'Destination/GetDestinations', '');

        if (!result) {
            alert(error);
        }
        else {
            setDestinations(result.data);
        }
    }

    const handleChange = (event: Event, newValue: number | number[]) => {
        setPriceRage(newValue as number[]);
    };

    const handleSearch = ()=>{
        const searchParams : ISearchPakageParams = {
            DestinationId : destinationId,
            NoofPeople: noOfPeople,
            PriceRange : priceRage
        }  

        dispatch(AddSearchParams(searchParams));
        navigate("/Packages")
    }

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <form className="form">
                        <div className="row mb-2">
                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                <label className="form-label">Destination</label>
                                <select name="" id="" className="form-control custom-select" onChange={(e:any)=>setDestinationId(e.target.value)}>
                                    {
                                        destinations.length > 0 ?
                                            <>
                                                <option value={0}>Select Destination</option>
                                                {destinations.map(d =>
                                                    <option value={d.destinationId}>{d.destinationName}</option>
                                                )}
                                            </>
                                            :
                                            <option value={0}>No Data</option>
                                    }
                                </select>
                            </div>
                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                <label className="form-label">No of People</label>
                                <input type="number" className="form-control" placeholder="# of People" onChange={(e:any)=>setNoOfPeople(e.target.value)}/>
                            </div>

                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-3">
                                <label className="form-label">Price Range</label>
                                <Box sx={{ width: 150 }}>
                                    <Slider
                                        getAriaLabel={() => 'Temperature range'}
                                        value={priceRage}
                                        onChange={handleChange}
                                        valueLabelDisplay="auto"
                                        max={50000}
                                    />
                                </Box>
                            </div>
                        </div>
                        <div className="row align-items-center mt-3">
                            <div className="col-sm-12 col-md-6 mb-3 mb-lg-0 col-lg-4">
                                <input className="btn btn-primary btn-block" value="Search" onClick={handleSearch} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SearchPackage