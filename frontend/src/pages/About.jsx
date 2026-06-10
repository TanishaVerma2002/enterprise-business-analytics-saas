import Sidebar from "../components/Sidebar";

import "./Page.css";

function About(){
    return(

         <div className="page-container">
            <Sidebar />
             <div className="page-content">
                <h1>
                    Enterprise Analytics Platform
                </h1>
                <br />
                     <div className="card">

                    <ol>

                        <li>
                            Frontend:React
                        </li>

                        <li>
                           Backend: ASP.NET Core Web API
                        </li>

                        <li>
                            Database: SQL Server
                        </li>

                        <li>
                            Authentication:JWT
                        </li>

                        <li>
                            Charts: Recharts
                        </li>

                        <li>
                            Role Based Access:Admin / Viewer
                        </li>

                    </ol>

                </div>
             </div>
         </div>


    );
}

export default About;












