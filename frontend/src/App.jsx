import { Routes, Route } from 'react-router-dom'

import Login from './pages/Login'

import Dashboard from './pages/Dashboard'

import ProtectedRoute from './components/ProtectedRoute'

import Uploads from "./pages/Uploads";

import Register from "./pages/Register";

import Revenue from "./pages/Revenue";

import Products from "./pages/Products";

import About from "./pages/About";

import Help from "./pages/Help";

function App() {

  return (

    <Routes>

      <Route
    path="/"
    element={<Register />}
      />

      <Route
          path="/login"
          element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/uploads"
        element={
            <ProtectedRoute>
                <Uploads />
            </ProtectedRoute>
        }
    />

    <Route
        path="/revenue"
        element={
            <ProtectedRoute>
                <Revenue />
            </ProtectedRoute>
        }
    />

    <Route
        path="/products"
        element={
            <ProtectedRoute>
                <Products />
            </ProtectedRoute>
        }
    />

    <Route
    path="/help"
    element={<Help />}
    />

    <Route
    path="/about"
    element={<About />}
    />

    </Routes>
  )
}

export default App