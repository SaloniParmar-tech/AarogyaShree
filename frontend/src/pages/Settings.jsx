import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  KeyRound,
  Languages,
  Lock,
  Save,
  Shield,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";

const defaultNotifications = {
  assessmentReminders: true,
  healthTips: true,
  appointmentReminders: true,
};

const defaultPrivacy = {
  saveAssessmentHistory: true,
  allowPersonalizedInsights: true,
};

export default function SettingsPage() {
  const navigate = useNavigate();
  const { user, authLoading, updateSettings, updatePassword } = useAuth();
  const { languageOptions, setLanguage, t } = useLanguage();
  const [settings, setSettings] = useState({
    languagePreference: "en",
    notificationPreferences: defaultNotifications,
    privacySettings: defaultPrivacy,
  });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [saving, setSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    setSettings({
      languagePreference: user.languagePreference || "en",
      notificationPreferences: {
        ...defaultNotifications,
        ...(user.notificationPreferences || {}),
      },
      privacySettings: {
        ...defaultPrivacy,
        ...(user.privacySettings || {}),
      },
    });
  }, [user]);

  const setNested = (group, field, value) => {
    setSettings((current) => ({
      ...current,
      [group]: {
        ...current[group],
        [field]: value,
      },
    }));
    setMessage("");
    setError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updateSettings(settings);
      setLanguage(settings.languagePreference);
      setMessage("Settings saved successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handlePassword = async (event) => {
    event.preventDefault();
    setPasswordSaving(true);
    setMessage("");
    setError("");

    try {
      await updatePassword(passwords);
      setPasswords({ currentPassword: "", newPassword: "" });
      setMessage("Password updated successfully.");
    } catch (err) {
      setError(err.message);
    } finally {
      setPasswordSaving(false);
    }
  };

  if (authLoading || !user) {
    return <PageShell><p className="text-sm text-gray-600">Loading settings...</p></PageShell>;
  }

  return (
    <PageShell>
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Control language, reminders, privacy, and account security.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
          <SettingHeader icon={Languages} title="Language" copy="Choose how AarogyaShree speaks with you." />
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {languageOptions.map((item) => (
              <button
                key={item.code}
                onClick={() => setSettings((current) => ({ ...current, languagePreference: item.code }))}
                className={`rounded-2xl border px-4 py-3 text-left text-sm font-bold transition ${
                  settings.languagePreference === item.code
                    ? "border-pink-300 bg-pink-50 text-pink-700"
                    : "border-pink-100 bg-white text-gray-700 hover:bg-pink-50"
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>

          <div className="mt-7 border-t border-pink-100 pt-7">
            <SettingHeader icon={Bell} title="Notifications" copy="Manage reminders shown by the app experience." />
            <div className="mt-4 grid gap-3">
              <Toggle label="Assessment reminders" checked={settings.notificationPreferences.assessmentReminders} onChange={(value) => setNested("notificationPreferences", "assessmentReminders", value)} />
              <Toggle label="Health tips" checked={settings.notificationPreferences.healthTips} onChange={(value) => setNested("notificationPreferences", "healthTips", value)} />
              <Toggle label="Appointment reminders" checked={settings.notificationPreferences.appointmentReminders} onChange={(value) => setNested("notificationPreferences", "appointmentReminders", value)} />
            </div>
          </div>

          <div className="mt-7 border-t border-pink-100 pt-7">
            <SettingHeader icon={Shield} title="Privacy" copy="Choose what data is saved for dashboard history and personalization." />
            <div className="mt-4 grid gap-3">
              <Toggle label="Save assessment history" checked={settings.privacySettings.saveAssessmentHistory} onChange={(value) => setNested("privacySettings", "saveAssessmentHistory", value)} />
              <Toggle label="Allow personalized dashboard insights" checked={settings.privacySettings.allowPersonalizedInsights} onChange={(value) => setNested("privacySettings", "allowPersonalizedInsights", value)} />
            </div>
          </div>

          {(message || error) && (
            <div className={`mt-5 rounded-2xl px-4 py-3 text-sm font-semibold ${message ? "bg-emerald-50 text-emerald-700" : "bg-red-50 text-red-600"}`}>
              {message || error}
            </div>
          )}

          <button
            onClick={handleSave}
            disabled={saving}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-pink-900/15 transition hover:bg-pink-800 disabled:bg-gray-300"
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save settings"}
          </button>
        </section>

        <form onSubmit={handlePassword} className="rounded-3xl border border-pink-100 bg-white p-6 shadow-sm">
          <SettingHeader icon={KeyRound} title="Security" copy="Change your password with your current password." />

          <label className="mt-5 grid gap-2 text-sm font-semibold text-gray-700">
            Current password
            <input
              type="password"
              value={passwords.currentPassword}
              onChange={(e) => setPasswords((current) => ({ ...current, currentPassword: e.target.value }))}
              className="input"
            />
          </label>

          <label className="mt-4 grid gap-2 text-sm font-semibold text-gray-700">
            New password
            <input
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords((current) => ({ ...current, newPassword: e.target.value }))}
              className="input"
            />
          </label>

          <button
            disabled={passwordSaving}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-6 py-3 text-sm font-bold text-pink-700 transition hover:bg-pink-50 disabled:text-gray-400"
          >
            <Lock size={17} />
            {passwordSaving ? "Updating..." : "Update password"}
          </button>

          <div className="mt-6 rounded-2xl bg-pink-50 p-4 text-sm leading-6 text-gray-700">
            <div className="mb-2 flex items-center gap-2 font-bold text-gray-900">
              <CheckCircle2 size={17} className="text-emerald-600" />
              Data connection
            </div>
            Profile, settings, and assessment history stay connected through the secure backend service.
          </div>
        </form>
      </div>
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

function SettingHeader({ icon: Icon, title, copy }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-700">
        <Icon size={22} />
      </div>
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{copy}</p>
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between gap-4 rounded-2xl border border-pink-50 bg-pink-50/50 p-4 text-left"
    >
      <span className="text-sm font-semibold text-gray-800">{label}</span>
      <span className={`flex h-7 w-12 items-center rounded-full p-1 transition ${checked ? "bg-pink-700" : "bg-gray-300"}`}>
        <span className={`h-5 w-5 rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-0"}`} />
      </span>
    </button>
  );
}
