import React from "react";
import { NavLink } from "react-router-dom";
import DeliveryListItem from "./DeliveryListItem";
import UpdateDeliveryListItem from "./UpdateDeliveryListItem";

export default class ReceiverList extends React.Component {

    state = {
        deliveryIds: [],
        deliveries: []
    }

    async componentDidMount() {
        var deliveryIds = await this.props.contract.methods.getDelivererDeliveryIds().call({from: this.props.accounts[0]});
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

    render() {
        return(
            <div>
                {this.state.deliveries.length? 
                <div>
                    <h1>Select package to update its status</h1>
                    {this.state.deliveries.map((x, index) => x.status != 2 ? <UpdateDeliveryListItem delivery={x} deliveryId={this.state.deliveryIds[index]}/> : "")}
                </div> : <p>You haven't sent any package</p>}
            </div>
        );
    }
} 