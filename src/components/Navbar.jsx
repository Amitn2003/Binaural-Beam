// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const { pathname } = useLocation();

//   return (
//     <nav className="nav">
//       <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
//         <span style={{ fontWeight: 700 }}>🟣 Binaural Beam</span>
//         <span className="badge">Meditate • NSDR • Yoga</span>
//       </div>

//       <div style={{ display: "flex", gap: "1rem" }}>
//         <Link className={pathname === "/" ? "active" : ""} to="/">Home</Link>
//         <Link className={pathname.startsWith("/sessions") ? "active" : ""} to="/sessions">Sessions</Link>
//         {user && <Link className={pathname === "/dashboard" ? "active" : ""} to="/dashboard">Dashboard</Link>}
//         {user && <Link className={pathname === "/profile" ? "active" : ""} to="/profile">Profile</Link>}
//         {user?.isAdmin && <Link className={pathname === "/admin" ? "active" : ""} to="/admin">Admin</Link>}
//         {!user ? (
//           <>
//             <Link className={pathname === "/login" ? "active" : ""} to="/login">Login</Link>
//             <Link className={pathname === "/register" ? "active" : ""} to="/register">Register</Link>
//           </>
//         ) : (
//           <button className="button" onClick={logout}>Logout</button>
//         )}
//       </div>
//     </nav>
//   );
// }


import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="font-bold text-lg">Binaural Beam</Link>
        <div className="flex gap-4">
          <Link to="/">Home</Link>
          <Link to="/meditation">Meditation</Link>
          {user ? (
            <>
              {user.isAdmin && <Link to="/dashboard">Dashboard</Link>}
              <Link to="/profile">Profile</Link>
              <button
                onClick={logout}
                className="bg-accent px-3 py-1 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
