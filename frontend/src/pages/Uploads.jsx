import { useState } from "react";

import Sidebar from "../components/Sidebar";

import api from "../services/api";

import "./Page.css";

function Uploads() {

    const [productFile, setProductFile]
        = useState(null);

    const [salesFile, setSalesFile]
        = useState(null);

    const uploadProducts = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const formData = new FormData();

            formData.append(
                "file",
                productFile
            );

            await api.post(
                "/upload/products",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            alert("Products uploaded");

        } catch (error) {

            console.error(error);
        }
    };

    const uploadSales = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const formData = new FormData();

            formData.append(
                "file",
                salesFile
            );

            await api.post(
                "/upload/sales",
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            alert("Sales uploaded");

        } catch (error) {

            console.error(error);
        }
    };

  return (

            <div className="page-container">

                <Sidebar />

                <div className="page-content">

                    <h1 className="page-title">
                        Upload Data
                    </h1>

                    <div
                        className="page-card"
                        style={{
                            marginBottom: "30px"
                        }}
                    >

                        <h2>
                            Upload Products
                        </h2>

                        <br />

                        <input
                            type="file"
                            onChange={(e) =>
                                setProductFile(
                                    e.target.files[0]
                                )
                            }
                        />

                        <br /><br />

                        <button
                            className="page-btn"
                            onClick={uploadProducts}
                        >
                            Upload Products
                        </button>

                    </div>

                    <div className="page-card">

                        <h2>
                            Upload Sales
                        </h2>

                        <br />

                        <input
                            type="file"
                            onChange={(e) =>
                                setSalesFile(
                                    e.target.files[0]
                                )
                            }
                        />

                        <br /><br />

                        <button
                            className="page-btn"
                            onClick={uploadSales}
                        >
                            Upload Sales
                        </button>

                    </div>

                </div>

            </div>
        );
}

export default Uploads;