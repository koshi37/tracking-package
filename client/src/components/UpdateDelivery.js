import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./../styles/NewDelivery.css";

export default function UpdateDelivery(props) {

    const [localisation, setLocalisation] = useState("");
    const [info, setInfo] = useState("");
    const [option, setOption] = useState(0);

    let {id} = useParams();

    const handleLocalisationChange = (e) => {
        setLocalisation(e.target.value);
    }

    const handleInfoChange = (e) => {
        setInfo(e.target.value);
    }
    
    const handleOptionChange = (e) => {
        setOption(e.target.value);
    }

    const handleUpdateDeliveryStatus = async (e) => {
        e.preventDefault();
        console.log("wtf");
        if(option == 0) {
            var response = await props.contract.methods.updateDeliveryStatus(id, localisation, info).send({ from: props.accounts[0] });
            console.log("update response", response);
        }
        else {
            var response = await props.contract.methods.deliveredStatus(id, localisation, info).send({ from: props.accounts[0] });
            console.log("update response", response);
        }
        // this.setState({deliveryId: deliveryId});
        
    }

    return(
        <div className="formBox">
            <form onSubmit={handleUpdateDeliveryStatus}>
                <h1>Package Id: {id}</h1>
                <label>Lokalizacja</label>
                <input type="text" value={localisation} onChange={handleLocalisationChange}/>
                <label>Informacje dodatkowe</label>
                <input type="text" value={info} onChange={handleInfoChange}/>
                <select value={option} onChange={handleOptionChange} style={{width: "fit-content"}}>
                    <option value={0}>In Delivery</option>
                    <option value={1}>Delivered</option>
                </select>
                <button>Update status</button>
            </form>
        </div>
    );
}