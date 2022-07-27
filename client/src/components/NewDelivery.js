import React, { Component } from "react";
import "./../styles/NewDelivery.css";

export default class NewDelivery extends React.Component {

    state = {
        delivererAddress: "",
        receiverAddress: "",
        localisation: "",
        info: "",
        deliveryId: null,
        added: false
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

    handleDeliveryPrepared = async (e) => {
        e.preventDefault();
        console.log("nie wiem", [this.state.receiverAddress, this.state.localisation, this.state.info, this.props.accounts[0]])
        var deliveryId = await this.props.contract.methods.prepareDelivery(this.state.receiverAddress, this.state.localisation, this.state.info).call({ from: this.props.accounts[0] });
        await this.props.contract.methods.prepareDelivery(this.state.receiverAddress, this.state.localisation, this.state.info).send({ from: this.props.accounts[0] });
        if(deliveryId)
        {
            this.setState({deliveryId: deliveryId, added: true});
        }
    }

    handleUpdateDeliveryStatus = async (e) => {
        e.preventDefault();
        var response = await this.props.contract.methods.updateDeliveryStatus(this.state.deliveryId, this.state.localisation, this.state.info).send({ from: this.props.accounts[0] });
    }

    handleDelivered = async (e) => {
        e.preventDefault();
        var response = await this.props.contract.methods.deliveredStatus(this.state.deliveryId, this.state.localisation, this.state.info).send({ from: this.props.accounts[0] });
    }

    render() {
        return(
            <div className="formBox">
                {!this.state.added ?
                <form onSubmit={this.handleDeliveryPrepared}>
                    <label>Odbiorca</label>
                    <input type="text" value={this.state.receiverAddress} onChange={this.handleReceiverChange}/>
                    <label>Lokalizacja</label>
                    <input type="text" value={this.state.localisation} onChange={this.handleLocalisationChange}/>
                    <label>Informacje dodatkowe</label>
                    <input type="text" value={this.state.info} onChange={this.handleInfoChange}/>
                    <button>Create new tracking</button>
                </form> : <p>Created new delivery tracking with ID: {this.state.deliveryId}</p>}
                {this.state.deliveryId != null ? <p>Id: {this.state.deliveryId}</p> : ""}
            </div>
        );
    }
}