import React from "react";
import { NavLink } from "react-router-dom";
import "./../styles/NewDelivery.css";

export default class ReceiverPage extends React.Component {

    state = {
        deliveryId: 0
    }

    handleInputDeliveryIdChange = (e) => {
        this.setState({deliveryId: e.target.value});
    }

    render() {
        return(
            <div>
                <form className="formBox">
                    <label>Get info about package with id:</label>
                    <input type="number" style={{textAlign: "right"}} value={this.state.deliveryId} onChange={this.handleInputDeliveryIdChange}/>
                    <NavLink to={"/delivery/"+this.state.deliveryId} style={{ textDecoration: 'none' }} exact><button>Check status</button></NavLink>
                </form>
                <NavLink to="/deliveryList/" style={{ textDecoration: 'none' }} exact><button className="buttonStyling" style={{width: "fit-content", margin: "auto", marginTop: "20px"}}>Get all your packages</button></NavLink>
            </div>
        );
    }
} 