import { useState } from "react";

import { useNavigate, Link }
from "react-router-dom";

import api from "../services/api";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName]
        = useState("");

    const [email, setEmail]
    = useState("");

    const [password, setPassword]
    = useState("");

    const [showPassword,
    setShowPassword]
    = useState(false);
    
    const [role, setRole]
        = useState("Viewer");

    const handleRegister = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                    role
                }
            );

            alert(
                "Registration successful"
            );

            navigate("/Login");

        } catch (error)
{
            alert(
                error.response?.data?.message
                ||
                "Registration failed"
            );
        }
    };

    return (
       <div>
        <div className="register-header">

            <h1>
                Enterprise Analytics Platform
            </h1>

        </div>

            <div className="register-container">

                <div className="register-card">

                    <h1>Register</h1>

                    <form onSubmit={handleRegister}>

                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) =>
                                setName(e.target.value)
                            }
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                        />

                        <div className="password-row">

                            <input
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="show-btn"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                            >

                                {
                                    showPassword
                                        ? "Hide"
                                        : "Show"
                                }

                            </button>

                        </div>

                        <div className="role-option">
                            
                        <span>Admin</span>

                        <input
                            type="radio"
                            value="Admin"
                            checked={role === "Admin"}
                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }
                        />

                        

                    </div>

                    <div className="role-option">
                        
                        <span>Viewer</span>

                        <input
                            type="radio"
                            value="Viewer"
                            checked={role === "Viewer"}
                            onChange={(e) =>
                                setRole(
                                    e.target.value
                                )
                            }
                        />                        

                    </div>

                        <button type="submit">
                            Register
                        </button>

                    </form>

                    <p>

                        Already have an account?
                        <Link to="/login">
                            Login
                        </Link>

                    </p>

                </div>

            </div>

            </div>
        );
}

export default Register;