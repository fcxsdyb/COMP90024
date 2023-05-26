//  COMP90024 GROUP48
//  Yuhang Zhou     ID:1243037
//  Jitao Feng      ID:1265994
//  Hui Liu         ID:1336645
//  Jihang Yu       ID:1341312
//  Xinran Ren      ID:1309373

import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faGear, faHeartPulse, faFaceFrown, faCarCrash, faHospital } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";


// Using FontAwesomeIcon for each page in the navigate bar
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