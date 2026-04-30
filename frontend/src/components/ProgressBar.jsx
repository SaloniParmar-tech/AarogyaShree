import { useLanguage } from "../context/LanguageContext";

export default function ProgressBar({ step, total }) {
  const { t } = useLanguage();
  const percent = Math.round((step / total) * 100);

  return (
    <div className="mt-6">
      <div className="flex justify-between text-sm text-gray-500 mb-1">
        <span>
          {t("question")} {step} {t("of")} {total}
        </span>
        <span>{percent}% {t("complete")}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full">
        <div
          className="h-2 bg-pink-500 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
