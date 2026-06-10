import { useEffect, useState }
from "react";

import Sidebar
from "../components/Sidebar";

import api from "../services/api";

import "./Page.css";

import {
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

const COLORS = [

    "#2563eb",

    "#16a34a",

    "#f59e0b",

    "#dc2626",

    "#7c3aed"

];


function Products() {

    const [topProducts,
        setTopProducts]
        = useState([]);

    const [chartType,
    setChartType]
    = useState("pie");

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/analytics/top-products",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setTopProducts(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

        return (

            <div className="page-container">

                <Sidebar />

                <div className="page-content">

                    <h1 className="page-title">
                        Product Analytics
                    </h1>

                    <div className="page-card">

                        <ResponsiveContainer
                            width="100%"
                            height={400}
                        >

                            <select
                            value={chartType}
                            onChange={(e) =>
                                setChartType(
                                    e.target.value
                                )
                            }
                        >

                            <option value="pie">
                                Pie Chart
                            </option>

                            <option value="bar">
                                Bar Chart
                            </option>

                        </select>

                        <br /><br />

                            <ResponsiveContainer
                                width="100%"
                                height={400}
                            >

                            {
                            chartType === "pie"

                            ? (

                            <PieChart>

                                <Pie

                                    data={topProducts}

                                    dataKey="totalQuantity"

                                    nameKey="productName"

                                    outerRadius={140}

                                    label
                                >

                                    {
                                        topProducts.map(
                                            (
                                                entry,
                                                index
                                            ) => (

                                                <Cell

                                                    key={index}

                                                    fill={
                                                        COLORS[
                                                            index %
                                                            COLORS.length
                                                        ]
                                                    }
                                                />

                                            )
                                        )
                                    }

                                </Pie>

                                <Legend />

                                <Tooltip />

                            </PieChart>

                            )

                            : (

                            <BarChart
                                data={topProducts}
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                />

                                <XAxis
                                    dataKey="productName"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="totalQuantity"
                                    fill="#16a34a"
                                />

                            </BarChart>

                            )

                            }

                            </ResponsiveContainer>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>
        );
}

export default Products;