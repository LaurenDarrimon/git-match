import React from "react";
import { Link } from "react-router-dom";

import Auth from "../utils/auth";

const Nav = () => {
    return (
        <div>
            <Link to="/profiles">My Profile</Link>
        </div>
    )
}
export default Nav;