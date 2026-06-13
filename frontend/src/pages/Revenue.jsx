import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

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

    const [years,
        setYears]
        = useState([]);

    const [selectedYear,
        setSelectedYear]
        = useState("");

    useEffect(() => {

        loadYears();

    }, []);

    useEffect(() => {

        if (selectedYear)
        {
            fetchRevenue();
        }

    }, [selectedYear]);

    const loadYears = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    "/analytics/available-years",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            setYears(response.data);

            if(response.data.length > 0)
            {
                setSelectedYear(
                    response.data[0]
                );
            }

        } catch (error) {

            console.error(error);
        }
    };

    const fetchRevenue = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response =
                await api.get(
                    `/analytics/monthly-revenue?year=${selectedYear}`,
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

                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            marginBottom: "20px"
                        }}
                    >

                        <select
                            value={selectedYear}
                            onChange={(e) =>
                                setSelectedYear(
                                    e.target.value
                                )
                            }
                        >
                            {
                                years.map(year => (

                                    <option
                                        key={year}
                                        value={year}
                                    >
                                        {year}
                                    </option>

                                ))
                            }
                        </select>

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

                    </div>

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
                                        strokeWidth={3}
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
                                        fill="#bec1c6"
                                    />

                                </BarChart>

                            )
                        }

                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

export default Revenue;