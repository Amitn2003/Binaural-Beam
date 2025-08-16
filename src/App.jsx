// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import Sessions from "./pages/Sessions";
// import SessionDetail from "./pages/SessionDetail";
// import AdminPanel from "./pages/AdminPanel";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AdminRoute from "./components/AdminRoute";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route index element={<Home />} />
//         <Route path="/sessions" element={<Sessions />} />
//         <Route path="/sessions/:id" element={<SessionDetail />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin"
//           element={
//             <AdminRoute>
//               <AdminPanel />
//             </AdminRoute>
//           }
//         />
//       </Routes>
//       <Toaster position="top-right" />
//     </BrowserRouter>
//   );
// }



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Meditation from "./pages/Meditation";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/meditation" element={<Meditation />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute isAllowed={user?.isAdmin}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isAllowed={!!user}>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
