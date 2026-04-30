export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-pink-100">
  <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-12">
    
    {/* Top part */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* Brand */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white shadow">
            🌸
          </div>
          <div className="text-xl font-semibold text-gray-100 hover:text-pink-600 [font-family:'Satisfy',cursive]">
            Aarogya Shree
          </div>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed hover:text-pink-600">
          Your trusted companion for women’s health — providing personalized
          guidance, local support, and care in your preferred language.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-4">
          Quick Links
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="hover:text-pink-600 cursor-pointer">Health Assessment</li>
          <li className="hover:text-pink-600 cursor-pointer">Find Clinics</li>
          <li className="hover:text-pink-600 cursor-pointer">Talk to Sakhi</li>
          <li className="hover:text-pink-600 cursor-pointer">Resources</li>
        </ul>
      </div>

      {/* Support */}
      <div>
        <h4 className="text-sm font-semibold text-gray-300 mb-4">
          Support
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="hover:text-pink-600 cursor-pointer">Privacy Policy</li>
          <li className="hover:text-pink-600 cursor-pointer">Terms of Service</li>
          <li className="hover:text-pink-600 cursor-pointer">Contact Us</li>
          <li className="hover:text-pink-600 cursor-pointer">FAQs</li>
        </ul>
      </div>
    </div>

    {/* Divider */}
    <div className="mt-10 border-t border-pink-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <p className="text-xs text-gray-200 hover:text-pink-600">
        © {new Date().getFullYear()} Aarogya Shree. All rights reserved.
      </p>
    </div>
  </div>
</footer>
  );
}