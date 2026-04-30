import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  ImageUp,
  Sparkles,
} from "lucide-react";
import AssessmentShell from "../../components/AssessmentShell";
import { useAssessment } from "../../context/AssessmentContext";
import { useLanguage } from "../../context/LanguageContext";

export default function SummaryStep() {
  const navigate = useNavigate();
  const hasSavedRef = useRef(false);
  const { state } = useAssessment();
  const { t } = useLanguage();

  const {
    menstrual = {},
    discharge = {},
    pain = {},
    urinary = {},
    mood = {},
  } = state.answers;

  const pcosFlags = [
    menstrual.regular === "No",
    menstrual.cycle === ">35 days",
    menstrual.missed === "Yes",
  ].filter(Boolean).length;

  const pcosRisk =
    pcosFlags >= 2 ? "high" : pcosFlags === 1 ? "medium" : "low";

  const cervicalRisk =
    discharge.discharge === "Yes" ||
    discharge.bleeding === "Yes" ||
    discharge.pain === "Yes";

  const breastRisk =
    pain.lump === "Yes" ||
    pain.skin === "Yes" ||
    pain.discharge === "Yes";

  const utiRisk = urinary.burning === "Yes" && urinary.urgency === "Yes";

  const mentalRisk = mood.feeling === "Very low" || mood.feeling === "Anxious";

  const resultPayload = {
    pcosRisk,
    cervicalRisk,
    breastRisk,
    utiRisk,
    mentalRisk,
  };

  const saveIfNeeded = async () => {
    const token = localStorage.getItem("token");

    if (token && !hasSavedRef.current) {
      hasSavedRef.current = true;
      try {
        await fetch("http://localhost:5000/api/assessment/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            summary: "Assessment Completed",
            risks: resultPayload,
          }),
        });
      } catch (err) {
        console.error("Save failed", err);
      }
    }
  };

  const handleViewResult = async () => {
    await saveIfNeeded();
    navigate("/assessment/result", { state: resultPayload });
  };

  const handleAddImage = async () => {
    await saveIfNeeded();
    navigate("/assessment/image", { state: resultPayload });
  };

  return (
    <AssessmentShell>
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/80 bg-white/80 p-6 text-center shadow-[0_22px_65px_rgba(190,24,93,0.14)] ring-1 ring-pink-100/70 backdrop-blur-xl sm:p-8">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-pink-100 text-pink-700">
          <ClipboardCheck size={31} />
        </div>

        <h2 className="text-3xl font-bold text-gray-900 [font-family:'Poppins','Segoe_UI',sans-serif]">
          {t("questionnaireComplete")}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
          {t("questionnaireCompleteCopy")}
        </p>

        <div className="mt-7 grid gap-3 text-left sm:grid-cols-3">
          {[
            t("requiredDone"),
            t("imageOptional"),
            t("skipReport"),
          ].map((item) => (
            <div
              key={item}
              className="flex items-center gap-2 rounded-2xl bg-pink-50 px-4 py-3 text-sm font-semibold text-gray-700"
            >
              <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
              {item}
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <button
            onClick={handleAddImage}
            className="group rounded-[1.5rem] border border-pink-100 bg-pink-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:bg-pink-100"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-pink-700">
                <ImageUp size={23} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {t("addOptionalImage")}
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-600">
                  {t("addOptionalImageCopy")}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-pink-700">
                  {t("continueImage")}
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </div>
            </div>
          </button>

          <button
            onClick={handleViewResult}
            className="group rounded-[1.5rem] bg-pink-700 p-5 text-left text-white shadow-lg shadow-pink-900/15 transition hover:-translate-y-0.5 hover:bg-pink-800"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15">
                <Sparkles size={23} />
              </div>
              <div>
                <h3 className="font-bold">{t("skipImageReport")}</h3>
                <p className="mt-2 text-sm leading-6 text-pink-50">
                  {t("skipImageReportCopy")}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold">
                  {t("viewReport")}
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </span>
              </div>
            </div>
          </button>
        </div>
      </div>
    </AssessmentShell>
  );
}
