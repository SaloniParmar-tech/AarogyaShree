import React from "react";
import { Flower2, ShieldCheck, MapPin, BookHeart } from "lucide-react";

const cards = [
  {
    icon: Flower2,
    title: "Understand Your Symptoms",
    desc: "Share how you feel through simple questions, and receive gentle guidance tailored to your health.",
  },
  {
    icon: ShieldCheck,
    title: "Know Your Health Risks",
    desc: "AI-powered analysis gives you a clear picture of your risk level with confidence and care.",
  },
  {
    icon: MapPin,
    title: "Find Help Nearby",
    desc: "Discover government health centres and screening facilities close to you, when you need them.",
  },
  {
    icon: BookHeart,
    title: "Learn About Your Body",
    desc: "Access trusted health education in your language — simple, respectful, and empowering.",
  },
];

export default function SupportSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-pink-50 via-white to-pink-50">
      <div className="max-w-[76rem] mx-auto px-7">

        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-600">
            How AarogyaShree helps you
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-800 sm:text-4xl">
            A caring space for your well-being
          </h2>

          <p className="mt-4 text-gray-600">
            Every feature is designed with warmth and empathy to support you like
            a trusted sakhi.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-pink-100 bg-white/90 p-6 transition hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 mb-4">
                  <Icon size={18} className="text-pink-600" />
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