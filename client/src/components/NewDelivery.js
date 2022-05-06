import React, { Component } from "react";

export default class NewDelivery extends React.Component {

    state = {
        delivererAddress: "",
        receiverAddress: "",
        localiation: "",
        info: "",
        deliveryId: null
    }

    // componentDidMount() {
    //     this.prepareDelivery = this.prepareDelivery.bind(this);
    // }

    handleReceiverChange = (e) => {
        this.setState({receiverAddress: e.target.value});
    }

    handleLocalisationChange = (e) => {
        this.setState({localiation: e.target.value});
    }

    handleInfoChange = (e) => {
        this.setState({info: e.target.value});
    }

    handleDeliveryPrepared = async (e) => {
        e.preventDefault();
        var deliveryId = await this.props.contract.methods.prepareDelivery(this.state.receiverAddress, this.state.receiverAddress, this.state.localiation, this.state.info).call({ from: this.props.accounts[0] });
        await this.props.contract.methods.prepareDelivery(this.state.receiverAddress, this.state.receiverAddress, this.state.localiation, this.state.info).send({ from: this.props.accounts[0] });
        // this.setState({deliveryId: deliveryId});
        console.log("deliveryId", deliveryId);
    }

    render() {
        return(
            <div>
                {this.props.contract ?
                <form onSubmit={this.handleDeliveryPrepared}>
                    <label>Odbiorca</label>
                    <input type="text" value={this.state.receiverAddress} onChange={this.handleReceiverChange}/>
                    <label>Lokalizacja</label>
                    <input type="text" value={this.state.localiation} onChange={this.handleLocalisationChange}/>
                    <label>Informacje dodatkowe</label>
                    <input type="text" value={this.state.info} onChange={this.handleInfoChange}/>
                    <button>Order</button>
                </form>
                : ""}
                {this.state.deliveryId != null ? <p>Id: {this.state.deliveryId}</p> : ""}
            </div>
        );
    }
}