import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../styles/Delivery.css";
import { format } from 'date-fns';

export default function Delivery(props) {

    const Status = [
        "Prepared", //company prepared package for shipment
        "InDelivery", //package in shipment
        "Delivered", // package delivered
    ]

    const statusColor = [
        "#FF6A6A",
        "#FFC558",
        "#6CFF6C"
    ]

    // state = {
    //     deliveryId: 0,
    //     receiverAddress: 0,
    //     delivererAddress: 0,
    //     deliveryStatus: [],
    //     statusIds: []
    // }

    let {id} = useParams();
    const [deliveryId, setDeliveryId] = useState(0);
    const [receiverAddress, setReceiverAddress] = useState(0);
    const [delivererAddress, setDelivererAddress] = useState(0);
    const [deliveryStatus, setDeliveryStatus] = useState([]);
    const [statusIds, setStatusIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            var statusIds = await props.contract.methods.getStatusIdsForDelivery(id).call();
            console.log("ids",statusIds);
            setStatusIds(statusIds);

            var statuses = statusIds.map(x => {return props.contract.methods.returnStatus(id, x).call()});
            statuses  = await Promise.all(statuses);
            console.log("status", statuses);
            setDeliveryStatus(statuses);
        }
        fetchData();
    },[]);

    const handleInputDeliveryIdChange = (e) => {
        this.setState({deliveryId: e.target.value});
    }

    const handleDeliveryStatus = async (e) => {
        e.preventDefault();
        
        
    }

    
    return(
        deliveryStatus.length ? <div>
            <h1>History for package (id: {id})</h1>
            {deliveryStatus.reverse().map(x => <div className="deliveryBox">
                <h1 className="status" style={{backgroundColor: statusColor[x.status]}}>{Status[x.status]}</h1>
                <p className="date">{format(new Date(x.time*1000),'EEEE MM/dd/yyyy HH:mm') }</p>
                <div className="infoBox">
                    <label>Localisation</label>
                    <p className="info">{x.localisation}</p>
                    <label>Additional info</label>
                    <p className="info">{x.info}</p>
                </div>
            </div>)}
        </div> : <p className="deliveryBox">There is no package with such ID</p>
    );
}