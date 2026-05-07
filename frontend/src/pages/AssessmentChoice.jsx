import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ClipboardList,
  FileText,
  ImageUp,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function AssessmentChoice() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const steps = [
    {
      icon: ClipboardList,
      title: t("answerRequired"),
      desc: t("answerRequiredDesc"),
    },
    {
      icon: ImageUp,
      title: t("addImageIfNeeded"),
      desc: t("addImageIfNeededDesc"),
    },
    {
      icon: Sparkles,
      title: t("getOverview"),
      desc: t("getOverviewDesc"),
    },
  ];

  return (
    <main className="min-h-[calc(100vh-4.5rem)] bg-pink-50/50 px-4 py-10 sm:px-7 lg:py-14">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700">
                <FileText size={14} />
                {t("requiredFirstStep")}
              </div>

              <h1 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {t("completeQuestionnaire")}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600">
                {t("questionnaireIntro")}
              </p>

              <div className="mt-7 flex flex-wrap gap-3 text-sm font-medium text-gray-700">
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {t("takesFewMinutes")}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  {t("privateRespectful")}
                </span>
              </div>

              <button
                onClick={() => navigate("/assessment/age")}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-pink-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-pink-800 sm:w-auto"
              >
                {t("startQuestionnaire")}
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="border-t border-gray-200 bg-slate-50/70 p-6 sm:p-8 lg:border-l lg:border-t-0">
              <h2 className="text-lg font-bold text-gray-900">
                {t("assessmentFlow")}
              </h2>

              <div className="mt-6 space-y-5">
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <div key={step.title} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-pink-700 ring-1 ring-gray-200">
                          <Icon size={18} />
                        </div>
                        {index < steps.length - 1 && (
                          <div className="mt-3 h-10 w-px bg-gray-200" />
                        )}
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-500">
                          {t("step")} {index + 1}
                        </p>
                        <h3 className="mt-1 font-semibold text-gray-900">
                          {step.title}
                        </h3>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <aside className="mt-5 rounded-xl border border-pink-100 bg-pink-100/70 px-5 py-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-pink-700">
              <Camera size={18} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{t("imageOptional")}</h3>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {t("skipImageReportCopy")}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
