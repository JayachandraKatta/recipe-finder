import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import RecipeDetails from './components/RecipeDetails'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <Routes>

      {/* Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Home Page */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Recipe Details */}
      <Route
        path="/recipe/:id"
        element={
          <ProtectedRoute>
            <RecipeDetails />
          </ProtectedRoute>
        }
      />

      {/* Redirect Unknown Routes */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  )
}

export default App