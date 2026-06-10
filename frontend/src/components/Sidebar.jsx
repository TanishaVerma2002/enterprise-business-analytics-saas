import { Link }
from "react-router-dom";

import "./Sidebar.css";

import {
    FaChartLine,
    FaBoxOpen,
    FaUpload,
    FaQuestionCircle,
    FaInfoCircle,
    FaTachometerAlt,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const role =
        localStorage.getItem("role");

    return (

            <div className="sidebar">

                <h2 className="sidebar-title">
                    Enterprise Analytics
                </h2>

                <hr />

                <Link
                    to="/dashboard"
                    className="sidebar-link"
                >
                    <FaTachometerAlt className="sidebar-icon" />
                    Dashboard
                </Link>

                {
                    role === "Admin" && (

                        <Link
                            to="/uploads"
                            className="sidebar-link"
                        >
                            <FaUpload className="sidebar-icon" />
                            Uploads
                        </Link>

                    )
                }

                <Link
                    to="/revenue"
                    className="sidebar-link"
                >
                    <FaChartLine className="sidebar-icon" />
                    Revenue
                </Link>

                <Link
                    to="/products"
                    className="sidebar-link"
                >
                    <FaBoxOpen className="sidebar-icon" />
                    Products
                </Link>

                <Link
                    to="/about"
                    className="sidebar-link"
                >
                    <FaInfoCircle className="sidebar-icon" />
                    About
                </Link>

                <Link
                    to="/help"
                    className="sidebar-link"
                >
                    <FaQuestionCircle className="sidebar-icon" />
                    Help
                </Link>

                <Link
                    to="/login"
                    className="sidebar-link"
                    onClick={() => {
                        localStorage.clear();
                    }}
                >
                    <FaSignOutAlt className="sidebar-icon" />
                    Logout
                </Link>

            </div>

        );

}

export default Sidebar;