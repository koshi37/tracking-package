import React from "react";
import { NavLink } from "react-router-dom";
import "./../styles/Delivery.css";
import { format } from 'date-fns';

export default class UpdateDeliveryListItem extends React.Component {

    Status = [
        "Prepared", //company prepared package for shipment
        "InDelivery", //package in shipment
        "Delivered", // package delivered
    ]

    statusColor = [
        "#FF6A6A",
        "#FFC558",
        "#6CFF6C"
    ]

    render() {
        var date = Date(this.props.delivery.time*1000);
        return(
            <NavLink to={"/updateDelivery/"+this.props.deliveryId} style={{textDecoration: "none"}}>
                <div className="deliveryBox">
                    <h1 className="packageId">Package ID: {this.props.deliveryId}</h1>
                    <h1 className="status" style={{backgroundColor: this.statusColor[this.props.delivery.status]}}>Status: {this.Status[this.props.delivery.status]}</h1>
                    <p className="date">{format(new Date(this.props.delivery.time*1000),'EEEE MM/dd/yyyy HH:mm') }</p>
                    <div className="infoBox">
                        <label>Localisation</label>
                        <p className="info">{this.props.delivery.localisation}</p>
                        <label>Additional info</label>
                        <p className="info">{this.props.delivery.info}</p>
                    </div>
                </div>
            </NavLink>
        );
    }
}