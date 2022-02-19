import { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from '../Auth/UserContext.js'

import config from "../../Settings/config.js";
import { loc } from "../../Settings/localization.js";

import './Menu.css'

function Menu() {
    const user = useContext(UserContext)
    
    function LogOut() {
        user.setUser({ name: '' })
    }

    return (
        <div className="menu">
            <ul>
                <Link to={config.urls.home}><li>{loc.home}</li></Link>

                <li onClick={LogOut} className="menu-right">{loc.logout}</li>
                <Link to={config.urls.profile} className="fright"><li>{loc.profile}</li></Link>
            </ul>
        </div>
    )
}

export default Menu;