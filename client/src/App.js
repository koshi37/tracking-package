import React, { Component } from "react";
import TrackingChainContract from "./contracts/TrackingChain.json";
import getWeb3 from "./getWeb3";
import Delivery from "./components/Delivery";
import NewDelivery from "./components/NewDelivery"

import "./App.css";
import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UpdateDelivery from "./components/UpdateDelivery";
import ReceiverList from "./components/ReceiverList";
import ReceiverPage from "./components/ReceiverPage";
import DelivererList from "./components/DelivererList";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = TrackingChainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        TrackingChainContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance });
      // this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    // // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });

    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    // // Update state with the result.
    // this.setState({ storageValue: response });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <Navbar/>
        <Routes>
          <Route path="/" element={<ReceiverPage contract={this.state.contract} accounts={this.state.accounts} />} />
          <Route path="/deliveryList" element={<ReceiverList contract={this.state.contract} accounts={this.state.accounts} />} />
          <Route path="/delivery/:id" element={<Delivery contract={this.state.contract} accounts={this.state.accounts} />} />
          <Route path="/newdelivery" element={<NewDelivery contract={this.state.contract} accounts={this.state.accounts} />} />
          <Route path="/updateDeliveryList" element={<DelivererList contract={this.state.contract} accounts={this.state.accounts} />} />
          <Route path="/updateDelivery/:id" element={<UpdateDelivery contract={this.state.contract} accounts={this.state.accounts} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
