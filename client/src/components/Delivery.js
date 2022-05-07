import React from "react";
import "./../styles/Delivery.css";

export default class Delivery extends React.Component {

    Status = [
        "Prepared", //company prepared package for shipment
        "InDelivery", //package in shipment
        "Delivered", // package delivered
    ]

    state = {
        deliveryId: -1,
        receiverAddress: 0,
        delivererAddress: 0,
        deliveryStatus: [],
        statusIds: []
    }

    componentDidMount() {
        console.log(this.props)
        console.log("delivery accounts", this.props.accounts);
    }

    handleInputDeliveryIdChange = (e) => {
        this.setState({deliveryId: e.target.value});
    }

    handleDeliveryStatus = async (e) => {
        e.preventDefault();
        
        var statusIds = await this.props.contract.methods.getStatusIdsForDelivery(this.state.deliveryId).call();
        console.log("ids",statusIds)
        this.setState({statusIds: statusIds});

        var statuses = this.state.statusIds.map(x => {return this.props.contract.methods.returnStatus(this.state.deliveryId, x).call()});
        statuses  = await Promise.all(statuses);
        console.log("status", statuses);
        this.setState({deliveryStatus: statuses});
    }

    render(){
        return(
            <div className="deliveryBox">
                <form onSubmit={this.handleDeliveryStatus}>
                    <label>Get info about package with id:</label>
                    <input type="number" value={this.state.deliveryId} onChange={this.handleInputDeliveryIdChange}/>
                    <button>Check status</button>
                </form>
                {this.state.deliveryStatus ? this.state.deliveryStatus.map(x => <div style={{border: "1px solid black"}}>
                    <h1>Status: {this.Status[x.status]}</h1>
                    <h1>Date: {Date(x.time)}</h1>
                    <h1>Localisation: {x.localisation}</h1>
                    <h1>Additional info: {x.info}</h1>
                    </div>) : ""}
            </div>
        );
    }
}