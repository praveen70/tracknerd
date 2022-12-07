import React, { useEffect, useState } from "react";
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import Appbar from "../../common-components/appbar/appbar";
import EnhancedTable from "../../common-components/table/table";
import "./vehicle.scss";
import { useNavigate } from 'react-router-dom';


const VehicleList = () => {
    const navigate = useNavigate()
    const [vehicleList, setVehicleList] = useState([]);

    useEffect(() => {
        const fetchVehicleList = () => {
            axios.get("https://staging-api.tracknerd.io/v1/vehicle-groups/vehicles")
                .then((res) => {
                    if (res?.status === 200) {
                        setVehicleList(res?.data?.data)
                    }
                }).catch((err) => {
                    return err
                })
        }
        fetchVehicleList()
    }, []);

    const headCells = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
            sortData: true,
        },
        {
            id: 'organisationName',
            numeric: true,
            disablePadding: false,
            label: 'Organisation',
        },
        {
            id: 'description',
            numeric: true,
            disablePadding: false,
            label: 'Description',
        },
        {
            id: 'deletedDate',
            numeric: true,
            disablePadding: false,
            label: 'Deleted Date',
        },
        {
            id: 'vehicles',
            numeric: true,
            disablePadding: false,
            label: 'Vehicles',
        },
    ];
    const handleClick = (event, row) => {
        event.preventDefault();
        navigate('/map-view', {
            state: {
                rowData: row
            }
        });
    }
    return (
        <div className="vehicle-container">
            <div className="vehicle-appbar">
                <Appbar />
            </div>
            <div className="vehicle-table">
                {vehicleList && vehicleList?.length > 0 ?
                    <EnhancedTable
                        headCells={headCells}
                        rows={vehicleList}
                        onRowClick={handleClick}
                    />
                    : <Box sx={{ display: 'flex', justifyContent:"center" }}>
                        <CircularProgress />
                    </Box>
                }
            </div>
        </div>

    );
};

export default VehicleList; 