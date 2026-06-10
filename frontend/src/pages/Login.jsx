import { useState } from "react";
import {
    useNavigate,
    Link
} from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword]
    = useState("");

    const [showPassword,
    setShowPassword]
    = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

             localStorage.setItem(
                "role",
                response.data.role
            );
            

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            console.error(error);

           console.error(error);

           alert(error.response?.data?.message || "Login Failed");
        }
    };

        return (

            <div className="login-container">

                <div className="login-card">

                    <h1>Login</h1>

                    <form onSubmit={handleLogin}>

                        <input
                            type="email"
                            placeholder="Enter Email"
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
                                placeholder="Enter Password"
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

                        <button type="submit">
                            Login
                        </button>

                    </form>

                    <p>

                        New user?

                        <Link to="/">
                            Register here
                        </Link>

                    </p>

                </div>

            </div>
        );
}

export default Login;