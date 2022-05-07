import React from "react";
import "./../styles/Navbar.css";
import { Link, NavLink } from 'react-router-dom';

export default class Navbar extends React.Component {

    render() {
        return(
            <div className="navbar">
                <img src="/logo.png"/>
                <h1>Pocztex</h1>
                {/* <Link style={{textDecoration: "none"}} activeClassName="current" to="/home">Home</Link>
                <Link style={{textDecoration: "none"}} to="/newdelivery">New delivery</Link>
                <Link style={{textDecoration: "none"}} to="/updatedelivery">Update delivery status</Link> */}
                <div className="links">
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'inactive')} exact>
                        Home
                    </NavLink>
                    <NavLink to="/newdelivery" className={({ isActive }) => (isActive ? 'active' : 'inactive')} exact activeStyle={{backgroundColor: "red"}}>
                        New delivery
                    </NavLink>
                    <NavLink to="/updatedelivery" className={({ isActive }) => (isActive ? 'active' : 'inactive')} exact>
                        Update delivery status
                    </NavLink>
                </div>
            </div>
        );
    }
}