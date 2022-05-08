import React from "react";
import { NavLink } from "react-router-dom";
import DeliveryListItem from "./DeliveryListItem";

export default class ReceiverList extends React.Component {

    state = {
        deliveryIds: [],
        deliveries: []
    }

    async componentDidMount() {
        var deliveryIds = await this.props.contract.methods.getReceiverDeliveryIds().call({from: this.props.accounts[0]});
        console.log("ids",deliveryIds);
        this.setState({deliveryIds: deliveryIds});

        if(this.state.deliveryIds.length) {
            var deliveries = this.state.deliveryIds.map(x => {
                var result = this.props.contract.methods.getLastStatusIdsForDelivery(x).call();
                // result.deliveryId = x;
                return result;
            });
            deliveries  = await Promise.all(deliveries);
            console.log("status", deliveries);
            this.setState({deliveries: deliveries});
        }
    }

    handleInputDeliveryIdChange = (e) => {
        this.setState({deliveryId: e.target.value});
    }

    render() {
        return(
            <div>
                {this.state.deliveries.length? 
                this.state.deliveries.map((x, index) => <DeliveryListItem delivery={x} deliveryId={this.state.deliveryIds[index]}/>) : <p>Couldn't find any packages</p>}
            </div>
        );
    }
} 