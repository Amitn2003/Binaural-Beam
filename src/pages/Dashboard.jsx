import { useEffect, useState } from "react";
import { api } from "../utils/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    let mounted = true;
    api.getSessions().then((data) => {
      if (mounted) setSessions(data);
    }).catch(() => {});
    return () => (mounted = false);
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col card">
          <h2>Hello, {user?.name}</h2>
          <p>Track your meditation journey. Pick a session and start now.</p>
        </div>
        <div className="col card">
          <h3>Your quick actions</h3>
          <ul>
            <li>Continue most recent</li>
            <li>Try NSDR (20 min)</li>
            <li>Breathing (box breath 4-4-4-4)</li>
          </ul>
        </div>
      </div>

      <div className="card" style={{ marginTop: "1rem" }}>
        <h3>Recommended Sessions</h3>
        <div className="row">
          {sessions.slice(0, 6).map((s) => (
            <div key={s._id} className="col card">
              <h4>{s.title}</h4>
              <p className="badge">{s.style} • {s.duration} min</p>
              <p>{s.description}</p>
              <a className="button" href={`/sessions/${s._id}`}>Open</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
