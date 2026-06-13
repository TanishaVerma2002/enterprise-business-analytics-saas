import Sidebar from "../components/Sidebar";

import "./Page.css";

function Help() {

    return (

        <div className="page-container">

            <Sidebar />

            <div className="page-content">

                <h1>
                    Help & Testing Guide
                </h1>

                <br />

                <div className="card">

                    <h2>
                        How to Test This Project
                    </h2>

                    <br />
                    

                    <ol>

                        <li>
                            Register as Admin.
                        </li>

                        <li>
                            Login using your credentials.
                        </li>

                        <li>
                            Navigate to Uploads.
                        </li>

                        <li>
                            Download the sample templates below.
                        </li>

                        <li>
                            Add your own data.
                        </li>

                        <li>
                            Upload Products file first.
                        </li>

                        <li>
                            Upload Sales file next.
                        </li>

                        <li>
                            Visit Dashboard, Revenue and Products pages.
                        </li>

                        <li>
                            Review charts, KPIs and AI Insights.
                        </li>

                    </ol>

                </div>

                <br />

                <div className="card">

                    <h2>
                        Download Templates
                    </h2>

                    <p>

                        Download the sample Excel files below and
                        use them as templates.

                    </p>

                    <br />

                    <a
                        href="/templates/products-template.xlsx"
                        download
                    >
                        📦 Download Products Template
                    </a>

                    <br />
                    <br />

                    <a
                        href="/templates/sales-template.xlsx"
                        download
                    >
                        📈 Download Sales Template
                    </a>

                </div>

                <br />

                <div className="card">

                    <h2>
                        Products Template Format
                    </h2>

                    <br />

                    <table>

                        <thead>

                            <tr>

                                <th>
                                    Name
                                </th>

                                <th>
                                    Category
                                </th>

                                <th>
                                    Price
                                </th>

                                <th>
                                    StockQuantity
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>
                                    Laptop
                                </td>

                                <td>
                                    Electronics
                                </td>

                                <td>
                                    50000
                                </td>

                                <td>
                                    15
                                </td>

                            </tr>

                            <tr>

                                <td>
                                    Mouse
                                </td>

                                <td>
                                    Accessories
                                </td>

                                <td>
                                    500
                                </td>

                                <td>
                                    100
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                <br />

                <div className="card">

                    <h2>
                        Sales Template Format
                    </h2>

                    <br />

                    <table>

                        <thead>


                            <tr>

                                <th>
                                    ProductName
                                </th>

                                <th>
                                    Quantity
                                </th>

                                <th>
                                    TotalAmount
                                </th>

                                <th>
                                    SaleDate
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>
                                    Laptop
                                </td>

                                <td>
                                    2
                                </td>

                                <td>
                                    100000
                                </td>

                                <td>
                                    01-06-2025
                                </td>

                            </tr>

                            <tr>

                                <td>
                                    Mouse
                                </td>

                                <td>
                                    5
                                </td>

                                <td>
                                    2500
                                </td>

                                <td>
                                    02-06-2025
                                </td>

                            </tr>

                        </tbody>

                    </table>

                </div>

                <br />

                <div className="card">

                <h2>
                    Analytics Available
                </h2>

                <br />

                <ul>

                    <li>
                        Dashboard Summary KPIs
                    </li>

                    <li>
                        Monthly Revenue Trend
                    </li>

                    <li>
                        Revenue by Product
                    </li>

                    <li>
                        Top Selling Products
                    </li>

                    <li>
                        Product Inventory Distribution
                    </li>

                    <li>
                        AI Generated Business Insights
                    </li>

                    <li>
                        Year-wise Revenue Analysis
                    </li>

                </ul>

            </div>

            <br />

                <div className="card">

                <h2>
                    Notes
                </h2>

                <br />

                <ol>

                    <li>
                        Upload Products before uploading Sales.
                    </li>

                    <li>
                        Product names must be unique.
                        Duplicate products will be skipped automatically.
                    </li>

                    <li>
                        Sales ProductName must already exist in the
                        uploaded Products dataset.
                    </li>

                    <li>
                        SaleDate must be a valid date.
                    </li>

                    <li>
                        Quantity must be numeric.
                    </li>

                    <li>
                        Price must be numeric.
                    </li>

                    <li>
                        TotalAmount must be numeric.
                    </li>

                    <li>
                        Products upload displays:
                        Added Products and Skipped Duplicates.
                    </li>

                    <li>
                        Revenue Analytics can be filtered by year.
                    </li>

                    <li>
                        Product Inventory Distribution is generated
                        from Product stock quantities.
                    </li>

                </ol>

            </div>

            </div>

        </div>
    );
}

export default Help;