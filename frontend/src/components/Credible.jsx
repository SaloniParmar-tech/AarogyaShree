import React from "react";
import { FlaskConical, Database, Wifi } from "lucide-react";

const items = [
  {
    icon: FlaskConical,
    title: "Built on proven AI models",
    desc: "Our screening uses convolutional neural networks validated in peer-reviewed medical research.",
  },
  {
    icon: Database,
    title: "Clinically validated data",
    desc: "Trained on SIPaKMeD (cervical) and CBIS-DDSM (breast) trusted clinical datasets.",
  },
  {
    icon: Wifi,
    title: "Works everywhere",
    desc: "Optimized for low connectivity and basic devices because healthcare shouldn't need fast internet.",
  },
];

export default function CredibilitySection() {
  return (
    <section
      id="credibility"
      className="py-20 lg:py-28 bg-gradient-to-b from-pink-50 via-white to-pink-50"
    >
      <div className="max-w-[76rem] mx-auto px-7">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            Built with care
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-800">
            Gentle on the outside, rigorous on the inside
          </h2>

          <p className="mt-4 text-gray-600">
            Behind every gentle interaction is clinical accuracy you can trust.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-pink-100 bg-white p-6 shadow-sm hover:shadow-lg transition"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                  <Icon size={18} className="text-pink-700" />
                </div>

                <h3 className="text-lg font-semibold text-gray-800">
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