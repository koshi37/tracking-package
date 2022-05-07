import React, { Component } from "react";
import "./../styles/NewDelivery.css";

export default class UpdateDelivery extends React.Component {

    state = {
        delivererAddress: "",
        receiverAddress: "",
        localisation: "",
        info: "",
        deliveryId: null
    }

    async componentDidMount() {
        // var response = await this.props.contract.methods.getLastStatusIdsForDelivery(0);
    }

    handleReceiverChange = (e) => {
        this.setState({receiverAddress: e.target.value});
    }

    handleLocalisationChange = (e) => {
        this.setState({localisation: e.target.value});
    }

    handleInfoChange = (e) => {
        this.setState({info: e.target.value});
    }

    handleDeliveryIdChange = (e) => {
        this.setState({deliveryId: e.target.value});
    }
    
    handleOptionChange = (e) => {
        this.setState({option: e.target.value});
    }

    handleDelivered = async (e) => {
        e.preventDefault();
        console.log("wtf");
        if(this.state.option == 0) {
            var response = await this.props.contract.methods.updateDeliveryStatus(this.state.deliveryId, this.state.localisation, this.state.info).send({ from: this.props.accounts[0] });
            console.log("update response", response);
        }
        else {
            var response = await this.props.contract.methods.deliveredStatus(this.state.deliveryId, this.state.localisation, this.state.info).send({ from: this.props.accounts[0] });
            console.log("update response", response);
        }
        // this.setState({deliveryId: deliveryId});
        
    }

    render() {
        return(
            <div className="formBox">
                <form onSubmit={this.handleUpdateDeliveryStatus}>
                    <label>Package Id</label>
                    <input type="number" value={this.state.deliveryId} onChange={this.handleDeliveryIdChange}/>
                    <label>Lokalizacja</label>
                    <input type="text" value={this.state.localisation} onChange={this.handleLocalisationChange}/>
                    <label>Informacje dodatkowe</label>
                    <input type="text" value={this.state.info} onChange={this.handleInfoChange}/>
                    <select value={this.state.option} onChange={this.handleOptionChange} style={{width: "fit-content"}}>
                        <option value={0}>In Delivery</option>
                        <option value={1}>Delivered</option>
                    </select>
                    <button>Update status</button>
                </form>
            </div>
        );
    }
}