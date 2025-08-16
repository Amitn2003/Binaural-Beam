import { useEffect, useState } from "react";
import { api } from "../utils/api";
import toast from "react-hot-toast";

export default function AdminPanel() {
  const [sessions, setSessions] = useState([]);
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    duration: 10,
    style: "Mindfulness",
    music: "",
    audioUrl: ""
  });

  const load = async () => {
    try {
      const [ss, us] = await Promise.all([
        api.admin.getAllSessions(),
        api.admin.getUsers()
      ]);
      setSessions(ss);
      setUsers(us);
    } catch (e) {
      toast.error(e.message);
    }
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    try {
      await api.admin.createSession(form);
      toast.success("Session created");
      setForm({ title:"", description:"", duration:10, style:"Mindfulness", music:"", audioUrl:"" });
      load();
    } catch (e) {
      toast.error(e.message);
    }
  };

  const delSession = async (id) => {
    if (!confirm("Delete this session?")) return;
    try {
      await api.admin.deleteSession(id);
      toast("Deleted");
      setSessions((s) => s.filter((x) => x._id !== id));
    } catch (e) {
      toast.error(e.message);
    }
  };

  const delUser = async (id) => {
    if (!confirm("Delete this user?")) return;
    try {
      await api.admin.deleteUser(id);
      toast("User deleted");
      setUsers((u) => u.filter((x) => x._id !== id));
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        {/* Create session */}
        <div className="col card">
          <h2>Create Session</h2>
          <form onSubmit={create}>
            <input className="input" placeholder="Title" value={form.title} onChange={(e)=>setForm(s=>({...s,title:e.target.value}))}/>
            <input className="input" placeholder="Description" value={form.description} onChange={(e)=>setForm(s=>({...s,description:e.target.value}))}/>
            <input className="input" type="number" placeholder="Duration (min)" value={form.duration} onChange={(e)=>setForm(s=>({...s,duration:Number(e.target.value)}))}/>
            <select className="select" value={form.style} onChange={(e)=>setForm(s=>({...s,style:e.target.value}))}>
              <option>Mindfulness</option>
              <option>NSDR</option>
              <option>Breathing</option>
              <option>Guided</option>
            </select>
            <input className="input" placeholder="Background music (name/url)" value={form.music} onChange={(e)=>setForm(s=>({...s,music:e.target.value}))}/>
            <input className="input" placeholder="Audio URL (optional)" value={form.audioUrl} onChange={(e)=>setForm(s=>({...s,audioUrl:e.target.value}))}/>
            <button className="button">Create</button>
          </form>
        </div>

        {/* Sessions list */}
        <div className="col card">
          <h2>All Sessions</h2>
          {sessions.map((s)=>(
            <div key={s._id} style={{borderBottom:"1px solid #1f2937", padding:".5rem 0"}}>
              <div style={{display:"flex", justifyContent:"space-between", gap:".5rem"}}>
                <div>
                  <strong>{s.title}</strong>
                  <div className="badge">{s.style} • {s.duration} min</div>
                </div>
                <div style={{display:"flex", gap:".5rem"}}>
                  <button className="button" onClick={()=>delSession(s._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
          {sessions.length===0 && <p>No sessions yet.</p>}
        </div>
      </div>

      {/* Users */}
      <div className="card" style={{marginTop:"1rem"}}>
        <h2>Users</h2>
        {users.map((u)=>(
          <div key={u._id} style={{display:"flex", justifyContent:"space-between", borderBottom:"1px solid #1f2937", padding:".5rem 0"}}>
            <div>
              <strong>{u.name}</strong> — {u.email} {u.isAdmin && <span className="badge">Admin</span>}
            </div>
            <button className="button" onClick={()=>delUser(u._id)}>Delete</button>
          </div>
        ))}
        {users.length===0 && <p>No users loaded.</p>}
      </div>
    </div>
  );
}
