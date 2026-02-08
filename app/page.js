import Link from 'next/link';
import { Bug, Calendar, ArrowRight, Terminal, ShieldCheck, Search } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <header className="py-20 px-6 text-center bg-gray-50">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-100 rounded-full">
            <Bug className="w-10 h-10 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-6xl font-black tracking-tight mb-6">
          Break the Code @ Metacube. <br/>
          <span className="text-indigo-600">Join our QA Team.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We are looking for detail-oriented QA Engineers to ensure our software is bulletproof. 
          Help us find the bugs before our users do and schedule your interview today.
        </p>
      </header>

      {/* QA & Tech Gallery */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-square group bg-gray-900 relative">
          <img 
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600" 
            alt="Code on a screen" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <Terminal className="text-white w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-square group bg-gray-900 relative">
          <img 
            src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600" 
            alt="Testing Environment" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <ShieldCheck className="text-white w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-square group bg-gray-900 relative">
          <img 
            src="https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600" 
            alt="Quality Assurance" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80" 
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <Search className="text-white w-12 h-12 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </section>

      {/* Button Section */}
      <div className="text-center pb-24">
        <Link href="/schedule">
          <button className="inline-flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl cursor-pointer">
            <Calendar className="w-6 h-6" />
            Schedule My Technical Interview
            <ArrowRight className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}
