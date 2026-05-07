import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock,
  HeartPulse,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const ageGroups = ["", "Under 18", "18-24", "25-34", "35-44", "45-54", "55+"];

export default function Profile() {
  const navigate = useNavigate();
  const { user, authLoading, updateProfile } = useAuth();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    ageGroup: "",
    location: "",
    emergencyContact: "",
  });
  const [history, setHistory] = useState([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || "",
      phone: user.phone || "",
      ageGroup: user.ageGroup || "",
      location: user.location || "",
      emergencyContact: user.emergencyContact || "",
    });
  }, [user]);

  useEffect(() => {
    const loadHistory = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch("http://localhost:5000/api/assessment/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (response.ok) setHistory(data.assessments || []);
    };

    loadHistory();
  }, []);

  const profileCompletion = useMemo(() => {
    const values = [form.name, user?.email, form.phone, form.ageGroup, form.location];
    return Math.round((values.filter(Boolean).length / values.length) * 100);
  }, [form, user]);

  const latestAssessment = history[0];

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updateProfile(form);
      setMessage("Profile saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (authLoading || !user) {
    return <PageShell><p className="text-sm text-gray-600">Loading profile...</p></PageShell>;
  }

  return (
    <PageShell>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-100 text-pink-700">
              <User size={30} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                <Mail size={15} />
                {user.email}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl bg-pink-50 p-4">
            <div className="flex items-center justify-between text-sm font-semibold text-gray-700">
              <span>Profile completion</span>
              <span>{profileCompletion}%</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-white">
              <div
                className="h-2 rounded-full bg-pink-600"
                style={{ width: `${profileCompletion}%` }}
              />
            </div>
          </div>

          <div className="mt-6 grid gap-3 text-sm">
            <InfoRow icon={Phone} label="Phone" value={form.phone || "Not added"} />
            <InfoRow icon={MapPin} label="Location" value={form.location || "Not added"} />
            <InfoRow icon={CalendarDays} label="Age group" value={form.ageGroup || "Not added"} />
            <InfoRow
              icon={Activity}
              label="Assessments"
              value={`${history.length} saved`}
            />
          </div>
        </section>

        <form onSubmit={handleSubmit} className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-900">Personal details</h2>
            <p className="mt-1 text-sm text-gray-600">
              Keep basic information current so Sakhi can personalize your health guidance.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name">
              <input value={form.name} onChange={(e) => handleChange("name", e.target.value)} className="input" />
            </Field>
            <Field label="Phone number">
              <input value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="input" />
            </Field>
            <Field label="Age group">
              <select value={form.ageGroup} onChange={(e) => handleChange("ageGroup", e.target.value)} className="input">
                {ageGroups.map((item) => (
                  <option key={item} value={item}>{item || "Select age group"}</option>
                ))}
              </select>
            </Field>
            <Field label="City or village">
              <input value={form.location} onChange={(e) => handleChange("location", e.target.value)} className="input" />
            </Field>
            <Field label="Emergency contact">
              <input value={form.emergencyContact} onChange={(e) => handleChange("emergencyContact", e.target.value)} className="input" />
            </Field>
          </div>

          {message && <Status tone="success" text={message} />}
          {error && <Status tone="error" text={error} />}

          <button
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-900/15 transition hover:bg-pink-800 disabled:bg-gray-300"
          >
            <CheckCircle2 size={17} />
            {saving ? "Saving..." : "Save profile"}
          </button>
        </form>
      </div>

      <section className="mt-6 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Health timeline</h2>
            <p className="mt-1 text-sm text-gray-600">Your saved assessment history appears here.</p>
          </div>
          <Link to="/assessment" className="rounded-full border border-pink-100 px-5 py-2.5 text-sm font-bold text-pink-700 transition hover:bg-pink-50">
            New assessment
          </Link>
        </div>

        <div className="mt-5 grid gap-3">
          {history.length ? history.slice(0, 5).map((item) => (
            <div key={item._id} className="flex flex-col gap-2 rounded-2xl border border-pink-50 bg-pink-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-semibold text-gray-900">{item.summary}</p>
                <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <Clock size={14} />
                  {new Date(item.createdAt).toLocaleString()}
                </p>
              </div>
              <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-pink-700">
                Risk score {item.score || 0}
              </span>
            </div>
          )) : (
            <div className="rounded-2xl bg-pink-50 p-5 text-sm text-gray-600">
              No saved assessments yet. Complete an assessment to start your timeline.
            </div>
          )}
        </div>

        {latestAssessment && (
          <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4 text-sm text-emerald-800">
            Latest result is ready for the dashboard and future ML model results.
          </div>
        )}
      </section>
    </PageShell>
  );
}

function PageShell({ children }) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">{children}</div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-gray-700">
      {label}
      {children}
    </label>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-pink-50 bg-white p-3">
      <Icon size={17} className="text-pink-700" />
      <div>
        <p className="text-xs font-semibold uppercase text-gray-400">{label}</p>
        <p className="font-semibold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function Status({ tone, text }) {
  const isSuccess = tone === "success";
  return (
    <div className={`mt-5 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${isSuccess ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
      {isSuccess ? <ShieldCheck size={16} /> : <HeartPulse size={16} />}
      {text}
    </div>
  );
}
