import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return (
    <div className="container">
      <div className="card" style={{maxWidth:600}}>
        <h2>Profile</h2>
        {!user ? (
          <p>Please log in.</p>
        ) : (
          <ul>
            <li><strong>Name:</strong> {user.name}</li>
            <li><strong>Email:</strong> {user.email}</li>
            <li><strong>Role:</strong> {user.isAdmin ? "Admin" : "User"}</li>
          </ul>
        )}
      </div>
    </div>
  );
}
