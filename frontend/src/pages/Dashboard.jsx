import { useEffect, useState }
from "react";

import { useNavigate }
from "react-router-dom";

import Sidebar
from "../components/Sidebar";

import api
from "../services/api";

import "./Dashboard.css";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";

function Dashboard() {

    const navigate = useNavigate();

    const [summary, setSummary]
        = useState(null);

    const [monthlyRevenue,
        setMonthlyRevenue]
        = useState([]);

    const [topProducts,
    setTopProducts]
    = useState([]);

    const [insights, setInsights]
        = useState([]);

    useEffect(() => {

        fetchSummary();

        fetchMonthlyRevenue();

        fetchTopProducts();

        fetchInsights();

    }, []);

    const COLORS = [
    "#2563eb",
    "#16a34a",
    "#f59e0b",
    "#dc2626",
    "#7c3aed",
    "#0891b2"
];

    const fetchSummary = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/analytics/dashboard-summary",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setSummary(response.data);

        } catch (error) {

            console.error(error);
        }
    };

    const fetchMonthlyRevenue = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/analytics/monthly-revenue",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setMonthlyRevenue(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

        const fetchTopProducts = async () => {

            try {

                const token =
                    localStorage.getItem("token");

                const response =
                    await api.get(
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


    const fetchInsights = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await api.get(
                "/analytics/insights",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            setInsights(
                response.data
            );

        } catch (error) {

            console.error(error);
        }
    };

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        navigate("/");
    };

    return (

        <div className="dashboard-container">

            <Sidebar />

            <div className="dashboard-content">

                <div className="dashboard-header">

                    <h1>
                        Enterprise Analytics Dashboard
                    </h1>

                    <button
                        onClick={handleLogout}
                        className="logout-btn"
                    >
                        Logout
                    </button>

                    <br />
                    
                    <br />

                    <br />

                </div>

                {
                    summary && (

                        <div className="summary-grid">

                            <div className="
                                summary-card
                                revenue-card
                            ">

                                <h3>
                                    💰 Total Revenue
                                </h3>

                                <h2>
                                    ₹{
                                        summary.totalRevenue
                                    }
                                </h2>

                            </div>

                            <div className="
                                summary-card
                                sales-card
                            ">

                                <h3>
                                    📈 Total Sales
                                </h3>

                                <h2>
                                    {
                                        summary.totalSales
                                    }
                                </h2>

                            </div>

                            <div className="
                                summary-card
                                product-card
                            ">

                                <h3>
                                    📦 Total Products
                                </h3>

                                <h2>
                                    {
                                        summary.totalProducts
                                    }
                                </h2>

                            </div>

                            <div className="
                                summary-card
                                top-card
                            ">

                                <h3>
                                    🔥 Top Product
                                </h3>

                                <h2>
                                    {
                                        summary.topProduct
                                    }
                                </h2>

                            </div>

                            <div className="
                                summary-card
                                order-card
                            ">

                                <h3>
                                    🛒 Total Orders
                                </h3>

                                <h2>
                                    {
                                        summary.totalOrders
                                    }
                                </h2>

                            </div>

                        </div>
                    )
                }

                <div className="chart-card">

                    <h2>
                        Monthly Revenue Trend
                    </h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >

                        <LineChart
                            data={monthlyRevenue}
                        >

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="month"
                            />

                            <YAxis />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#2563eb"
                                strokeWidth={3}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

                {
                    topProducts.length > 0 && (

                        <div className="chart-card">

                            <h2>
                                Product Sales Distribution
                            </h2>

                            <ResponsiveContainer
                                width="100%"
                                height={400}
                            >

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

                                    <Tooltip />

                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    )
                }


                {
                    insights.length > 0 && (

                        <div className="chart-card">

                            <h2>
                                AI Business Insights
                            </h2>

                            <br />

                            {
                                insights.map(
                                    (
                                        item,
                                        index
                                    ) => (

                                        <div
                                            key={index}
                                            style={{
                                                padding: "15px",
                                                background:
                                                    "#eef2ff",
                                                marginBottom:
                                                    "12px",
                                                borderRadius:
                                                    "10px",
                                                fontWeight:
                                                    "500"
                                            }}
                                        >

                                            💡 {item}

                                        </div>
                                    )
                                )
                            }

                        </div>
                    )
                }

            </div>

        </div>
    );
}

export default Dashboard;
