import {
    Navigate,
    Route,
    Routes
} from "react-router-dom";

import AddEvent from "../../Pages/AddEvent/AddEvent.js";
import Menu from "../Menu/Menu.js";
import Home from '../../Pages/Home/Home.js'
import Profile from "../../Pages/Profile/Profile.js";
import Event from "../../Pages/Event/Event.js";
import OtherProfile from "../../Pages/Profile/OtherProfile.js";

function Wrapper() {
    return (
        <div>
            <Menu/>

            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/author-detail/:id" element={<OtherProfile/>}></Route>
                <Route path="/profile/" element={<Profile/>}></Route>
                <Route path="/add-event/" element={<AddEvent/>}></Route>
                <Route path="/event-detail/:id" element={<Event/>}></Route>
                <Route path="*" element={<h1>404</h1>}></Route>
            </Routes>
        </div> //<Navigate to="/"/>
    )
}

export default Wrapper;