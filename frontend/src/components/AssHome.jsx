import React from "react";
import {
  MessageCircle,
  ClipboardList,
  ImageUp,
  HeartHandshake,
} from "lucide-react";

const steps = [
  {
    icon: MessageCircle,
    step: "01",
    title: "Share how you feel",
    desc: "Answer simple questions about your symptoms in your own language.",
  },
  {
    icon: ClipboardList,
    step: "02",
    title: "Add simple details",
    desc: "Share relevant health history so we can understand you better.",
  },
  {
    icon: ImageUp,
    step: "03",
    title: "Upload image (optional)",
    desc: "If available, share a clinical image for deeper AI analysis.",
  },
  {
    icon: HeartHandshake,
    step: "04",
    title: "Get gentle guidance",
    desc: "Receive clear insights with next steps — monitor, consult, or visit a clinic.",
  },
];

export default function AssessmentFlow() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-white">
      <div className="max-w-[76rem] mx-auto px-7">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            How it supports you
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-800">
            A gentle, guided health check
          </h2>

          <p className="mt-4 text-gray-600">
            Four simple steps designed to feel easy, safe, and respectful of
            your time and comfort.
          </p>
        </div>

        <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-pink-400 to-transparent hidden lg:block"></div>

          {steps.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.step}
                className="relative rounded-2xl border border-pink-100 bg-pink-50/40 p-6 text-center hover:shadow-lg transition"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 border border-pink-200">
                  <Icon size={20} className="text-pink-700" />
                </div>

                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Step {item.step}
                </span>

                <h3 className="mt-2 text-base font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}