import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { useLocation } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import config from "../../config";
import "./map.scss";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const AnyReactComponent = ({ text }) => (
    <div className="">
        <p className="pin" style={{ fontSize: 15, color: "red" }}>{text}</p>
        <LocationOnIcon color="error" fontSize="large" />
    </div>
)
    ;
export default function Map(props) {
    const location = useLocation();
    const [vehicleLatitude, setVehicleLatitude] = useState({});
    const app = initializeApp(config);
    const { vehicles } = location?.state?.rowData
    function vehicleLocation() {
        const vehicleID = vehicles[0]?.id
        const VehicleregistrationNumber = vehicles[0]?.registrationNumber
        const db = getDatabase(app);
        const starCountRef = ref(db, `${vehicleID}-${VehicleregistrationNumber}/location`);
        return onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setVehicleLatitude(data)
        });
    }
    useEffect(() => {
        vehicleLocation()
    }, [])

    const defaultProps = {
        center: {
            lat: vehicleLatitude?.latitude,
            lng: vehicleLatitude?.longitude
        },
        zoom: 11
    };

    const convertTimeStamp = (timestamp) => {
        return new Date(timestamp).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' });
    }
    return (
        <div style={{ height: '100vh', width: '100%' }} className="p-2">
            {vehicleLatitude !== null && vehicleLatitude ? <GoogleMapReact
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                {convertTimeStamp(vehicleLatitude?.timestamp) && <AnyReactComponent
                    lat={vehicleLatitude?.latitude}
                    lng={vehicleLatitude?.longitude}
                    text={convertTimeStamp(vehicleLatitude?.timestamp)}
                />}
            </GoogleMapReact> : <Box sx={{ display: 'flex', justifyContent: "center" }}>
                <CircularProgress />
            </Box>}
        </div>
    );
}