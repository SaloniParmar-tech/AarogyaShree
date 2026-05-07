import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  CalendarClock,
  ClipboardList,
  HeartPulse,
  ImageUp,
  MessageCircle,
  ShieldAlert,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const API_BASE_URL = "http://localhost:5000/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, authLoading } = useAuth();
  const { t } = useLanguage();
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({
    totalAssessments: 0,
    averageScore: 0,
    highRiskCount: 0,
    lastAssessmentDate: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [authLoading, user, navigate]);

  const fetchDashboard = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [latestRes, historyRes, statsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/assessment/latest`, { headers }),
        fetch(`${API_BASE_URL}/assessment/history`, { headers }),
        fetch(`${API_BASE_URL}/assessment/stats`, { headers }),
      ]);

      if (!latestRes.ok || !historyRes.ok || !statsRes.ok) {
        throw new Error("Could not load dashboard data");
      }

      const latestData = await latestRes.json();
      const historyData = await historyRes.json();
      const statsData = await statsRes.json();

      setLatest(latestData);
      setHistory(historyData.assessments || []);
      setStats(statsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [location.pathname, fetchDashboard]);

  useEffect(() => {
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") fetchDashboard();
    };

    window.addEventListener("focus", fetchDashboard);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      window.removeEventListener("focus", fetchDashboard);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [fetchDashboard]);

  const currentRisk = useMemo(() => {
    if (!latest) return "No data";
    if (latest.score >= 50) return "Needs attention";
    if (latest.score >= 20) return "Moderate";
    return "Low";
  }, [latest]);

  const riskTone = latest?.score >= 50 ? "red" : latest?.score >= 20 ? "yellow" : "green";

  if (authLoading || (!user && loading)) {
    return <DashboardShell><p className="text-sm text-gray-600">Loading dashboard...</p></DashboardShell>;
  }

  return (
    <DashboardShell>
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-pink-700">{t("healthDashboard")}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">
            {t("welcomeDashboard")}{user ? `, ${user.name}` : ""}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">
            {t("dashboardIntro")}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => navigate("/assessment")}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-900/15 transition hover:bg-pink-800"
          >
            <ClipboardList size={17} />
            {t("startAssessment")}
          </button>
          <button
            onClick={() => navigate("/assessment/image")}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-pink-100 bg-white px-5 py-3 text-sm font-bold text-pink-700 transition hover:bg-pink-50"
          >
            <ImageUp size={17} />
            {t("imageAnalysis")}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        <Metric icon={ClipboardList} label={t("assessmentsMetric")} value={stats.totalAssessments || 0} />
        <Metric icon={BarChart3} label={t("averageRiskMetric")} value={`${stats.averageScore || 0}/100`} />
        <Metric icon={ShieldAlert} label={t("attentionFlagsMetric")} value={stats.highRiskCount || 0} />
        <Metric
          icon={CalendarClock}
          label={t("lastCheckMetric")}
          value={stats.lastAssessmentDate ? new Date(stats.lastAssessmentDate).toLocaleDateString() : t("none")}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_0.75fr]">
        <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{t("latestAssessmentResult")}</h2>
              <p className="mt-1 text-sm text-gray-600">
                {t("latestAssessmentCopy")}
              </p>
            </div>
            <RiskBadge tone={riskTone} label={currentRisk} />
          </div>

          {loading ? (
            <div className="mt-6 rounded-2xl bg-pink-50 p-5 text-sm text-gray-600">{t("loadingLatestResult")}</div>
          ) : latest ? (
            <>
              <div className="mt-6 rounded-2xl bg-pink-50 p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">{latest.summary}</p>
                    <p className="mt-1 text-3xl font-bold text-gray-900">{latest.score || 0}/100</p>
                  </div>
                  <HeartPulse size={34} className="text-pink-700" />
                </div>
                <div className="mt-4 h-2 rounded-full bg-white">
                  <div
                    className="h-2 rounded-full bg-pink-700"
                    style={{ width: `${Math.min(latest.score || 0, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <RiskItem label={t("hormonalRiskLabel")} value={latest.risks?.pcosRisk || "low"} />
                <RiskItem label={t("cervicalHealthLabel")} value={latest.risks?.cervicalRisk ? "attention" : "low"} />
                <RiskItem label={t("breastHealthLabel")} value={latest.risks?.breastRisk ? "attention" : "low"} />
                <RiskItem label={t("urinaryHealthLabel")} value={latest.risks?.utiRisk ? "attention" : "low"} />
                <RiskItem label={t("emotionalWellbeingLabel")} value={latest.risks?.mentalRisk ? "attention" : "low"} />
              </div>

              <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
                <h3 className="font-bold text-gray-900">{t("recommendedNextSteps")}</h3>
                <ul className="mt-3 grid gap-2 text-sm text-gray-700">
                  {(latest.recommendations || []).map((item) => (
                    <li key={item} className="flex gap-2">
                      <Sparkles size={15} className="mt-0.5 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </section>

        <aside className="grid gap-6">
          <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">{t("quickActions")}</h2>
            <div className="mt-4 grid gap-3">
              <Action to="/talk-to-sakhi" icon={MessageCircle} title={t("talkToSakhi")} copy={t("talkToSakhiCopy")} />
              <Action to="/find-clinics" icon={Activity} title={t("findClinics")} copy={t("findClinicsCopy")} />
              <Action to="/profile" icon={TrendingUp} title={t("updateProfile")} copy={t("updateProfileCopy")} />
            </div>
          </section>

          <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">History trend</h2>
            <div className="mt-5 flex h-36 items-end gap-2 rounded-2xl bg-pink-50 p-4">
              {history.length ? history.slice(0, 8).reverse().map((item) => (
                <div key={item._id} className="flex flex-1 flex-col items-center justify-end gap-2">
                  <div
                    className="w-full rounded-t-lg bg-pink-600"
                    style={{ height: `${Math.max(item.score || 4, 4)}%` }}
                    title={`${item.score || 0}/100`}
                  />
                </div>
              )) : (
                <p className="self-center text-sm text-gray-600">{t("noTrendYet")}</p>
              )}
            </div>
          </section>
        </aside>
      </div>

      <section className="mt-6 rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{t("assessmentHistory")}</h2>
            <p className="mt-1 text-sm text-gray-600">{t("assessmentHistoryIntro")}</p>
          </div>
          <Link to="/profile" className="inline-flex items-center gap-2 text-sm font-bold text-pink-700">
            {t("viewProfileTimeline")}
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-5 grid gap-3">
          {history.length ? history.map((item) => (
            <div key={item._id} className="flex flex-col gap-3 rounded-2xl border border-pink-50 bg-pink-50/40 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-gray-900">{item.summary}</p>
                <p className="mt-1 text-sm text-gray-600">{new Date(item.createdAt).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <RiskBadge tone={item.score >= 50 ? "red" : item.score >= 20 ? "yellow" : "green"} label={`${item.score || 0}/100`} />
                <span className="rounded-full bg-white px-3 py-1.5 text-xs font-bold uppercase text-gray-500">
                  {item.type || t("questionnaire")}
                </span>
              </div>
            </div>
          )) : (
            <div className="rounded-2xl bg-pink-50 p-5 text-sm text-gray-600">
              {t("noAssessmentsSaved")}
            </div>
          )}
        </div>
      </section>
    </DashboardShell>
  );
}

function DashboardShell({ children }) {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">{children}</div>
    </main>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-sm">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-700">
        <Icon size={21} />
      </div>
      <p className="mt-4 text-sm font-semibold text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function RiskBadge({ tone, label }) {
  const classes = {
    red: "bg-red-50 text-red-700 border-red-100",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-100",
    green: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <span className={`rounded-full border px-3 py-1.5 text-xs font-bold uppercase ${classes[tone] || classes.green}`}>
      {label}
    </span>
  );
}

function RiskItem({ label, value }) {
  const isAttention = value === "high" || value === "medium" || value === "attention";
  return (
    <div className="rounded-2xl border border-pink-50 bg-white p-4">
      <p className="text-sm font-semibold text-gray-500">{label}</p>
      <p className={`mt-1 font-bold capitalize ${isAttention ? "text-pink-700" : "text-emerald-700"}`}>
        {value}
      </p>
    </div>
  );
}

function Action({ to, icon: Icon, title, copy }) {
  return (
    <Link to={to} className="flex items-center gap-3 rounded-2xl border border-pink-50 bg-pink-50/50 p-4 transition hover:bg-pink-50">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-pink-700">
        <Icon size={19} />
      </div>
      <div>
        <p className="font-bold text-gray-900">{title}</p>
        <p className="mt-0.5 text-sm text-gray-600">{copy}</p>
      </div>
    </Link>
  );
}

function EmptyState() {
  const { t } = useLanguage();

  return (
    <div className="mt-6 rounded-2xl bg-pink-50 p-6 text-center">
      <ClipboardList size={34} className="mx-auto text-pink-700" />
      <h3 className="mt-3 font-bold text-gray-900">{t("noAssessmentYet")}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-600">
        {t("completeQuestionnaireOnce")}
      </p>
      <Link
        to="/assessment"
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-pink-700 px-5 py-3 text-sm font-bold text-white"
      >
        {t("startNow")}
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
