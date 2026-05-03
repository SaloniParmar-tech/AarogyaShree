import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ImageUp,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import AssessmentShell from "../../components/AssessmentShell";
import { useLanguage } from "../../context/LanguageContext";

export default function ImageAssessment() {
  const navigate = useNavigate();
  const { state: resultPayload } = useLocation();
  const { t } = useLanguage();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const uploadInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateDeviceType = () => setIsMobile(mediaQuery.matches);

    updateDeviceType();
    mediaQuery.addEventListener("change", updateDeviceType);

    return () => mediaQuery.removeEventListener("change", updateDeviceType);
  }, []);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setShowResult(false);
  };

  const handleReset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setImage(null);
    setPreview(null);
    setShowResult(false);

    if (uploadInputRef.current) uploadInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleAnalyze = () => {
    setShowResult(true);
  };

  const handleViewReport = () => {
    if (!resultPayload) {
      navigate("/assessment/age");
      return;
    }

    navigate("/assessment/result", { state: resultPayload });
  };

  return (
    <AssessmentShell>
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white/80 px-4 py-2 text-xs font-semibold text-pink-800 shadow-sm backdrop-blur">
            <ImageUp size={14} />
            {t("imageAssessment")}
          </div>

          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl [font-family:'Poppins','Segoe_UI',sans-serif]">
            {t("uploadSafely")}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            {t("uploadSafelyCopy")}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-[1.75rem] border border-white/80 bg-white/80 p-5 shadow-[0_18px_55px_rgba(190,24,93,0.12)] ring-1 ring-pink-100/60 backdrop-blur-xl sm:p-7">
            <div className="rounded-3xl border-2 border-dashed border-pink-200 bg-pink-50/55 p-4 sm:p-6">
              <input
                ref={uploadInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                className="hidden"
                id="imageCapture"
              />

              {preview ? (
                <div>
                  <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-sm">
                    <img
                      src={preview}
                      alt="Selected assessment preview"
                      className="h-80 w-full object-contain bg-white"
                    />
                  </div>

                  <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => uploadInputRef.current?.click()}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-pink-100 bg-white px-5 py-3 text-sm font-semibold text-gray-800 transition hover:bg-pink-50"
                    >
                      <Upload size={16} className="text-pink-700" />
                    {t("changeImage")}
                    </button>

                    <button
                      onClick={handleReset}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-red-100 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <RotateCcw size={16} />
                      {t("remove")}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-80 flex-col items-center justify-center text-center">
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-pink-700 shadow-sm">
                    <ImageUp size={28} />
                  </div>

                  <h2 className="text-xl font-bold text-gray-900">
                    {t("addClearImage")}
                  </h2>

                  <p className="mt-2 max-w-md text-sm leading-6 text-gray-600">
                    {t("clearImageCopy")}
                  </p>

                  <div className="mt-6 grid w-full max-w-md gap-3 sm:grid-cols-2">
                    {isMobile && (
                      <button
                        onClick={() => cameraInputRef.current?.click()}
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-pink-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-900/15 transition hover:bg-pink-800"
                      >
                        <Camera size={17} />
                        {t("clickImage")}
                      </button>
                    )}

                    <button
                      onClick={() => uploadInputRef.current?.click()}
                      className={`inline-flex items-center justify-center gap-2 rounded-full border border-pink-100 bg-white px-5 py-3 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-pink-50 ${
                        isMobile ? "" : "sm:col-span-2"
                      }`}
                    >
                      <Upload size={17} className="text-pink-700" />
                      {t("uploadImage")}
                    </button>
                  </div>

                  {!isMobile && (
                    <p className="mt-4 text-xs font-medium text-gray-500">
                      {t("cameraMobile")}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                onClick={handleViewReport}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-pink-100 bg-white px-6 py-3.5 text-sm font-bold text-gray-800 transition hover:bg-pink-50"
              >
                {t("skipImage")}
                <ArrowRight size={17} />
              </button>

              <button
                onClick={handleAnalyze}
                disabled={!image}
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold text-white transition ${
                  image
                    ? "bg-pink-700 shadow-lg shadow-pink-900/15 hover:-translate-y-0.5 hover:bg-pink-800"
                    : "cursor-not-allowed bg-gray-300"
                }`}
              >
                <Sparkles size={17} />
                {t("analyzeImage")}
              </button>
            </div>
          </div>

          <aside className="rounded-[1.75rem] border border-white/80 bg-white/72 p-6 shadow-[0_18px_55px_rgba(190,24,93,0.1)] ring-1 ring-pink-100/60 backdrop-blur-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheck size={23} />
            </div>

            <h2 className="mt-5 text-xl font-bold text-gray-900">
              {t("beforeUpload")}
            </h2>

            <div className="mt-5 grid gap-4">
              {[
                t("imageTip1"),
                t("imageTip2"),
                t("imageTip3"),
              ].map((point) => (
                <div key={point} className="flex gap-3 text-sm leading-6 text-gray-700">
                  <CheckCircle2
                    size={17}
                    className="mt-1 shrink-0 text-emerald-600"
                  />
                  {point}
                </div>
              ))}
            </div>

            {showResult && (
              <div className="mt-7 rounded-3xl border border-pink-100 bg-pink-50/80 p-5">
                <h3 className="font-bold text-gray-900">
                  {t("gentleInsight")}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-700">
                  {t("gentleInsightCopy")}
                </p>

                <ul className="mt-4 grid gap-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-pink-700" />
                    {t("maintainHygiene")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-pink-700" />
                    {t("stayHydrated")}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-pink-700" />
                    {t("seekAdvice")}
                  </li>
                </ul>

                <button
                  onClick={handleViewReport}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-700 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-pink-900/15 transition hover:bg-pink-800"
                >
                  {t("continueReport")}
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </AssessmentShell>
  );
}
