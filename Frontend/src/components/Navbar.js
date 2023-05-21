import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faHeartPulse, faFaceFrown, faCarCrash, faHospital } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

class Navbar extends Component {
    render() {
        return (
            <nav className="NavbarItems">
                <h1 className="navbar-logo">COMP90024</h1>

                <ul className="nav-menu">
                    <li>
                        <a className="nav-links" href="/">
                            <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faHouse}/>Home
                        </a>
                    </li>
                    <li>
                        <a className="nav-links" href="/general">
                            <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faGear}/>General
                        </a>
                    </li>
                    <li>
                        <a className="nav-links" href="/scenario1">
                            <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faHeartPulse}/>Scenario 1
                        </a>
                    </li>
                    <li>
                        <a className="nav-links" href="scenario2">
                            <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faFaceFrown}/>Scenario 2
                        </a>
                    </li>
                    <li>
                        <a className="nav-links" href="scenario3">
                            <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faCarCrash}/>Scenario 3
                        </a>
                    </li>
                    <li>
                        <a className="nav-links" href="scenario4">
                            <FontAwesomeIcon style={{ paddingRight: '10px' }} icon={faHospital}/>Scenario 4
                        </a>
                    </li>
                </ul >
            </nav>
        )
    }
}

export default Navbar;