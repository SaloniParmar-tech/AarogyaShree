import React from "react";
import {
  BarChart3,
  CalendarHeart,
  MapPin,
  ScrollText,
  MessageCircleHeart,
} from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Health Risk Score",
    desc: "Visual risk assessment with Low / Medium / High indicators and gentle explanations.",
  },
  {
    icon: CalendarHeart,
    title: "Cycle-Aware Insights",
    desc: "Light period awareness paired with health alerts supportive, not overwhelming.",
  },
  {
    icon: MapPin,
    title: "Nearby Clinic Finder",
    desc: "Locate nearest government health centres and screening facilities.",
  },
  {
    icon: ScrollText,
    title: "Health History",
    desc: "A simple timeline of your screenings, results, and recommendations.",
  },
  {
    icon: MessageCircleHeart,
    title: "Sakhi Chat",
    desc: "A calm, intelligent chat companion that listens and guides you gently.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-pink-50/40">
      <div className="max-w-[76rem] mx-auto px-7">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-700">
            What's inside
          </span>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-gray-800">
            Everything you need, nothing overwhelming
          </h2>

          <p className="mt-4 text-gray-600">
            Thoughtfully crafted tools for your health journey simple, clear,
            and always respectful.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group rounded-2xl border border-pink-100 bg-white p-6 transition hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 group-hover:bg-pink-200 transition">
                  <Icon size={18} className="text-pink-700" />
                </div>

                <h3 className="text-base font-semibold text-gray-800">
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