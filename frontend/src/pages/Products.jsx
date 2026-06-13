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
    CartesianGrid
} from "recharts";

const COLORS = [
    "#2563EB", // blue
    "#10B981", // emerald
    "#F59E0B", // amber
    "#EF4444", // red
    "#8B5CF6", // violet
    "#06B6D4", // cyan
    "#EC4899", // pink
    "#84CC16"  // lime
];


function Products() {

    const [topProducts,
        setTopProducts]
        = useState([]);

    const [chartType,
    setChartType]
    = useState("bar");

    const [revenueData, setRevenueData] = useState([]);

    const [stockData, setStockData] = useState([]);

    useEffect(() => {

        fetchTopProducts();
        fetchRevenueData();
        fetchStockData();

    }, []);

    //Top product API

    const fetchTopProducts = async () => {

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

                    setTopProducts(response.data);

                } catch (error) {

                    console.error(error);
                }
            };

        // Revenue by product

        const fetchRevenueData = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/analytics/revenue-by-product",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setRevenueData(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    // To show Unique products

    const fetchStockData = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/analytics/stock-by-product",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setStockData(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    // return statements to display - HTML

        return (

                    <div className="page-container">

                        <Sidebar />

                        <div className="page-content">

                            <h1 className="page-title">
                                Top Selling Products
                            </h1>

                            <div className="page-card">

                                <select
                                    value={chartType}
                                    onChange={(e) =>
                                        setChartType(
                                            e.target.value
                                        )
                                    }
                                >
                                    
                                    <option value="bar">
                                        Bar Chart
                                    </option>

                                    <option value="pie">
                                        Pie Chart
                                    </option>

                                    
                                </select>

                                <br />
                                <br />

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}
                                >

                                   {
                                    chartType === "bar"

                                    ? (

                                        <BarChart
                                            width={700}
                                            height={350}
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
                                                fill="#bec1c6"
                                            />

                                        </BarChart>

                                    )

                                    : (

                                        <PieChart
                                            width={500}
                                            height={350}
                                        >

                                            <Pie
                                                data={topProducts}
                                                dataKey="totalQuantity"
                                                nameKey="productName"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={120}
                                                label
                                            >

                                                {
                                                    topProducts.map(
                                                        (entry, index) => (

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

                                            <Tooltip />

                                            <Legend />

                                        </PieChart>

                                    )
                                }

                                </div>

                            </div>

                            <h1 className="page-title">
                                Product Revenue Distribution
                            </h1>

                            <div className="page-card">

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >

                                    <PieChart
                                        width={500}
                                        height={350}
                                    >

                                        <Pie
                                            data={revenueData}
                                            dataKey="revenue"
                                            nameKey="productName"
                                            outerRadius={120}
                                            label
                                        >

                                            {
                                                revenueData.map(
                                                    (entry, index) => (

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

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </div>

                            </div>

                            <h1 className="page-title">
                                Product Inventory Distribution
                            </h1>

                            <div className="page-card">

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center"
                                    }}
                                >

                                    <PieChart
                                        width={500}
                                        height={350}
                                    >

                                        <Pie
                                            data={stockData}
                                            dataKey="stock"
                                            nameKey="productName"
                                            outerRadius={120}
                                            label
                                        >

                                            {
                                                stockData.map(
                                                    (entry, index) => (

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

                                        <Tooltip />

                                        <Legend />

                                    </PieChart>

                                </div>

                            </div>

                        </div>

                    </div>
                );
}

export default Products;