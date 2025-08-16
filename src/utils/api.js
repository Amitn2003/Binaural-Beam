const BASE = import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "";

const headers = () => {
  const token = localStorage.getItem("bb_token");
  const h = { "Content-Type": "application/json" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
};

const handle = async (res) => {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
};

export const api = {
  // Auth
  register: (payload) =>
    fetch(`${BASE}/api/auth/register`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload)
    }).then(handle),

  login: (payload) =>
    fetch(`${BASE}/api/auth/login`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(payload)
    }).then(handle),

  me: () =>
    fetch(`${BASE}/api/auth/me`, { headers: headers() }).then(handle),

  // Meditation (public GETs, protected complete)
  getSessions: () =>
    fetch(`${BASE}/api/meditation`, { headers: headers() }).then(handle),

  searchSessions: (q, style) =>
    fetch(
      `${BASE}/api/meditation/search?` +
        new URLSearchParams({ q: q || "", style: style || "" }),
      { headers: headers() }
    ).then(handle),

  getSession: (id) =>
    fetch(`${BASE}/api/meditation/${id}`, { headers: headers() }).then(handle),

  completeSession: (sessionId) =>
    fetch(`${BASE}/api/meditation/complete`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ sessionId })
    }).then(handle),

  // Admin
  admin: {
    getUsers: () =>
      fetch(`${BASE}/api/admin/users`, { headers: headers() }).then(handle),
    deleteUser: (id) =>
      fetch(`${BASE}/api/admin/users/${id}`, {
        method: "DELETE",
        headers: headers()
      }).then(handle),

    getAllSessions: () =>
      fetch(`${BASE}/api/admin/sessions`, { headers: headers() }).then(handle),
    createSession: (payload) =>
      fetch(`${BASE}/api/admin/sessions`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(payload)
      }).then(handle),
    updateSession: (id, payload) =>
      fetch(`${BASE}/api/admin/sessions/${id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(payload)
      }).then(handle),
    deleteSession: (id) =>
      fetch(`${BASE}/api/admin/sessions/${id}`, {
        method: "DELETE",
        headers: headers()
      }).then(handle)
  }
};
