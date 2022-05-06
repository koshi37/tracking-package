import React, { Component } from "react";

export default class NewDelivery extends React.Component {

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

    handleDeliveryPrepared = async (e) => {
        e.preventDefault();
        var deliveryId = await this.props.contract.methods.prepareDelivery(this.state.receiverAddress, this.state.receiverAddress, this.state.localisation, this.state.info).call({ from: this.props.accounts[0] });
        await this.props.contract.methods.prepareDelivery(this.state.receiverAddress, this.state.receiverAddress, this.state.localisation, this.state.info).send({ from: this.props.accounts[0] });
        // this.setState({deliveryId: deliveryId});
        console.log("deliveryId", deliveryId);
    }

    handleUpdateDeliveryStatus = async (e) => {
        e.preventDefault();
        var response = await this.props.contract.methods.updateDeliveryStatus(this.state.deliveryId, this.state.localisation, this.state.info).send({ from: this.props.accounts[0] });
        // this.setState({deliveryId: deliveryId});
        console.log("update response", response);
    }

    handleDelivered = async (e) => {
        e.preventDefault();
        console.log("wtf");
        var response = await this.props.contract.methods.deliveredStatus(this.state.deliveryId, this.state.localisation, this.state.info).send({ from: this.props.accounts[0] });
        // this.setState({deliveryId: deliveryId});
        console.log("update response", response);
    }

    render() {
        return(
            <div>
                <form onSubmit={this.handleDeliveryPrepared}>
                    <label>Odbiorca</label>
                    <input type="text" value={this.state.receiverAddress} onChange={this.handleReceiverChange}/>
                    <label>Lokalizacja</label>
                    <input type="text" value={this.state.localisation} onChange={this.handleLocalisationChange}/>
                    <label>Informacje dodatkowe</label>
                    <input type="text" value={this.state.info} onChange={this.handleInfoChange}/>
                    <button>Prepared to delivery</button>
                </form>
                <form onSubmit={this.handleUpdateDeliveryStatus}>
                    <label>Package Id</label>
                    <input type="number" value={this.state.deliveryId} onChange={this.handleDeliveryIdChange}/>
                    <label>Lokalizacja</label>
                    <input type="text" value={this.state.localisation} onChange={this.handleLocalisationChange}/>
                    <label>Informacje dodatkowe</label>
                    <input type="text" value={this.state.info} onChange={this.handleInfoChange}/>
                    <button>Update status</button>
                </form>
                <form onSubmit={this.handleDelivered}>
                    <label>Package Id</label>
                    <input type="number" value={this.state.deliveryId} onChange={this.handleDeliveryIdChange}/>
                    <label>Lokalizacja</label>
                    <input type="text" value={this.state.localisation} onChange={this.handleLocalisationChange}/>
                    <label>Informacje dodatkowe</label>
                    <input type="text" value={this.state.info} onChange={this.handleInfoChange}/>
                    <button>Delivered</button>
                </form>
                {this.state.deliveryId != null ? <p>Id: {this.state.deliveryId}</p> : ""}
            </div>
        );
    }
}