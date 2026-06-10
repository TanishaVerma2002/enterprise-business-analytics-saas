import { useEffect, useState }
from "react";

import Sidebar
from "../components/Sidebar";

import api from "../services/api";

import "./Page.css";


import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

function Revenue() {

    const [monthlyRevenue,
        setMonthlyRevenue]
        = useState([]);

        const [chartType,
        setChartType]
        = useState("line");

    useEffect(() => {

        fetchRevenue();

    }, []);

    const fetchRevenue = async () => {

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

    return (

                <div className="page-container">

                    <Sidebar />

                    <div className="page-content">

                        <h1 className="page-title">
                            Revenue Analytics
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

                                <option value="line">
                                    Line Chart
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
                            chartType === "line"

                            ? (

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
                                />

                            </LineChart>

                            )

                            : (

                            <BarChart
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

                                <Bar
                                    dataKey="revenue"
                                    fill="#2563eb"
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

export default Revenue;