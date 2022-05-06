import React from "react";
import { render } from "react-dom";

export default class Delivery extends React.Component {

    Status = [
        "Prepared", //company prepared package for shipment
        "InDelivery", //package in shipment
        "Delivered", // package delivered
    ]

    state = {
        deliveryId: 0,
        receiverAddress: 0,
        delivererAddress: 0,
        deliveryStatus: [],
        statusIds: []
    }

    componentDidMount() {
        console.log("delivery", this.props.accounts);
        // this.setState({
        //     packageId: this.props.package["packageId"],
        //     itemId: this.props.package["itemId"],
        //     companyAddress: this.props.package["companyAddress"],
        //     delivererAddress: this.props.package["delivererAddress"],
        //     consumerAddress: this.props.package["consumerAddress"]
        // });
    }

    handleInputDeliveryIdChange = (e) => {
        this.setState({deliveryId: e.target.value});
    }

    handleDeliveryStatus = async (e) => {
        e.preventDefault();
        
        const {accounts, contract} = this.state;
        var deliveryIds = await this.props.contract.methods.getDeliveryIds().call();
        console.log("ids",deliveryIds)
        var status = await this.props.contract.methods.returnStatus(this.state.deliveryId, 0).call();
        console.log("status", status);
        // this.setState({deliveryId: deliveryId});
    }

    render(){
        return(
            <div style={{border:"1px solid black"}}>
                <form onSubmit={this.handleDeliveryStatus}>
                    <label>Get info about package with id:</label>
                    <input type="number" value={this.state.deliveryId} onChange={this.handleInputDeliveryIdChange}/>
                    <button>Order</button>
                </form>



                <h1>Status: {this.Status[this.state.deliveryStatus]}</h1>
                <p>consumer: {this.state.consumerAddress}</p>
                <p>company: {this.state.companyAddress}</p>
                <p>itemId: {this.state.itemId}</p>
                <p>packageId: {this.state.packageId}</p>
                {/* {this.state.deliveryStatus < 5 ? <button onClick={() => this.props.handleStatusChange(this.state.packageId)}>{this.Status[Number(this.state.deliveryStatus)+1]}</button> : ""} */}
            </div>
        );
    }
}