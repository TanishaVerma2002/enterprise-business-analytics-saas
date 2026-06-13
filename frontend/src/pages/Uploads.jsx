import { useState } from "react";

import Sidebar from "../components/Sidebar";

import api from "../services/api";

import { ClipLoader } from "react-spinners";

import "./Page.css";

function Uploads() {

    const [productFile, setProductFile]
        = useState(null);

    const [salesFile, setSalesFile]
        = useState(null);

    const [loading, setLoading] = useState(false);

    const [uploadMessage, setUploadMessage]
        = useState("");

    const uploadProducts = async () => {

            try {

                setLoading(true);

                setUploadMessage("");

                const token =
                    localStorage.getItem("token");

                const formData = new FormData();

                formData.append(
                    "file",
                    productFile
                );

                const response = await api.post(
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

               setUploadMessage(
                            `✅ ${response.data.message}`
                        );

                        setProductFile(null);

                        document.getElementById(
                            "productFile"
                        ).value = "";

                    } catch (error) {

                            console.error(error);

                            const errorMessage =
                                error.response?.data?.message
                                || error.response?.data?.Message
                                || "Product upload failed";

                            setUploadMessage(
                                `❌ ${errorMessage}`
                            );
                        } finally {

                        setLoading(false);
                    }
                };

            const uploadSales = async () => {

            try {

                setLoading(true);

                setUploadMessage("");

                const token =
                    localStorage.getItem("token");

                const formData = new FormData();

                formData.append(
                    "file",
                    salesFile
                );

                const response = await api.post(
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

                setUploadMessage(
                    `✅ ${response.data.message}`
                );

                setSalesFile(null);

                document.getElementById(
                    "salesFile"
                ).value = "";

            } catch (error) {

                console.error(error);

                setUploadMessage(
                    "❌ Sales upload failed"
                );

            } finally {

                setLoading(false);
            }
        };

  return (

            <div className="page-container">

                <Sidebar />

                <div className="page-content">

                    <h1 className="page-title">
                        Upload Data
                    </h1>

                    {
                        loading && (
                            <div
                                style={{
                                    marginTop: "20px",
                                    textAlign: "center"
                                }}
                            >
                                <ClipLoader size={40} />

                                <p
                                    style={{
                                        marginTop: "10px"
                                    }}
                                >
                                    Uploading file...
                                </p>
                            </div>
                        )
                    }

                    {
                        uploadMessage && (
                            <div
                                style={{
                                    marginTop: "20px",
                                    fontWeight: "600",
                                    textAlign: "center"
                                }}
                            >
                                {uploadMessage}
                            </div>
                        )
                    }

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
                            id="productFile"
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
                            disabled={loading}
                        >
                            {
                                loading
                                    ? "Uploading..."
                                    : "Upload Products"
                            }
                        </button>
                    </div>

                    <div className="page-card">

                        <h2>
                            Upload Sales
                        </h2>

                        <br />

                        <input
                            id="salesFile"
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
                            disabled={loading}
                        >
                            {
                                loading
                                    ? "Uploading..."
                                    : "Upload Sales"
                            }
                        </button>

                    </div>

                </div>

            </div>
        );
}

export default Uploads;