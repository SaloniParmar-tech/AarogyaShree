export default function HealthResources() {
  const resources = [
    {
      type: "Article",
      title: "Understanding Cervical Cancer: A Complete Guide",
      desc: "Learn about cervical cancer symptoms, prevention, and treatment options in simple language.",
      time: "5 min",
      lang: "English",
    },
    {
      type: "Video",
      title: "Breast Self-Examination Technique",
      desc: "Step-by-step guide on how to perform monthly breast self-examination.",
      time: "6 min",
      lang: "English",
    },
    {
      type: "Government Scheme",
      title: "Janani Suraksha Yojana – Maternity Benefits",
      desc: "Government scheme providing financial assistance for safe motherhood.",
      time: "3 min",
      lang: "Hindi",
    },
    {
      type: "Helpline",
      title: "National Women’s Helpline – 181",
      desc: "24/7 support for women in distress, providing legal and medical guidance.",
      time: "1 min",
      lang: "Multiple",
    },
    {
      type: "FAQ",
      title: "Common Myths About Reproductive Health",
      desc: "Debunking common misconceptions about women’s reproductive health.",
      time: "4 min",
      lang: "Marathi",
    },
    {
      type: "Article",
      title: "Nutrition During Pregnancy",
      desc: "Essential nutrition tips for expecting mothers to ensure healthy pregnancy.",
      time: "6 min",
      lang: "Tamil",
    },
  ];

  return (
  <div className="min-h-screen  bg-gradient-to-br from-pink-50 via-pink-50 to-pink-50 p-6">
    <div className="max-w-6xl mx-auto">
        {/* Header */}
     <div className="bg-white/90 backdrop-blur rounded-2xl p-6 shadow-md border border-pink-100">
      <h1 className="text-2xl font-bold text-pink-700/90">
        Health Resources
      </h1>
      <p className="text-sm text-gray-700 mt-1 max-w-2xl">
        Access trusted health information, government schemes, and support
        services in your preferred language.
      </p>

      {/* Search */}
      <div className="relative mt-5">
        <input
          type="text"
          placeholder="Search health resources..."
          className="w-full px-4 py-2.5 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 placeholder-gray-400"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mt-4">
        {["All Resources", "Articles", "Videos", "Govt Schemes", "Helplines", "FAQs"].map(
          (tab, i) => (
            <button
              key={i}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
                i === 0
                  ? "bg-pink-500 text-white shadow-sm"
                  : "bg-pink-100 text-pink-600 hover:bg-pink-200"
              }`}
            >
              {tab}
            </button>
          )
        )}
      </div>
     </div>

     {/* Main Grid */}
     <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
      {/* Resource Cards */}
      <div className="lg:col-span-3 grid sm:grid-cols-2 gap-5">
        {resources.map((item, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <span className="inline-block text-xs font-medium bg-pink-100 text-pink-600 px-2.5 py-1 rounded-full">
              {item.type}
            </span>

            <h3 className="mt-3 font-semibold text-gray-800 leading-snug">
              {item.title}
            </h3>

            <p className="text-sm text-gray-600 mt-1 line-clamp-3">
              {item.desc}
            </p>

            <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">
                {item.lang}
              </span>
              <span>{item.time}</span>
            </div>

            <div className="flex gap-4 mt-4 text-sm font-medium text-pink-600">
              <button className="hover:underline">Share</button>
              <button className="hover:underline">Save</button>
            </div>
          </div>
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="space-y-5">
        {/* Emergency Contacts */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
          <h3 className="font-semibold text-pink-700 mb-4">
            Emergency Contacts
          </h3>

          {[
            { title: "National Women Helpline", number: "181", desc: "24/7 support for women" },
            { title: "Health Helpline", number: "104", desc: "Medical emergency assistance" },
            { title: "Ambulance", number: "108", desc: "Emergency medical transport" },
            { title: "Child Helpline", number: "1098", desc: "Child protection services" },
          ].map((c, i) => (
            <div
              key={i}
              className="flex justify-between items-start gap-3 mb-3 p-3 rounded-xl hover:bg-pink-50 transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {c.title}
                </p>
                <p className="text-xs text-gray-500">
                  {c.desc}
                </p>
              </div>
              <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-3 py-1 rounded-full">
                {c.number}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
          <h3 className="font-semibold text-pink-700 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            {["Find Hospitals", "Medicine Guide", "Health Checkup"].map((link, i) => (
              <li
                key={i}
                className="text-pink-600 hover:underline cursor-pointer"
              >
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Featured Video */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-pink-100">
          <div className="h-32 bg-gradient-to-br from-pink-200 to-pink-300 rounded-xl mb-4" />
          <h4 className="font-semibold text-gray-800">
            Women’s Health Awareness
          </h4>
          <p className="text-xs text-gray-600 mt-1">
            Learn about important health topics every woman should know.
          </p>
          <button className="mt-4 w-full bg-pink-500 hover:bg-pink-600 transition text-white py-2.5 rounded-xl font-medium">
            Watch Now
          </button>
        </div>
      </div>
    </div>
    </div>
  </div>
);

}
