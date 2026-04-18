import Link from 'next/link';
import { Shield, Calendar, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <header className="py-20 px-6 text-center bg-gray-50">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-100 rounded-full">
            <Shield className="w-10 h-10 text-indigo-600" />
          </div>
        </div>

        <h1 className="text-6xl font-black tracking-tight mb-6">
          Break the System @ Metacube. <br/>
          <span className="text-indigo-600">Join Our Cybersecurity Team.</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We are looking for curious and driven cybersecurity interns to test, break, 
          and secure modern applications. Work on real-world attack simulations and 
          help us strengthen our defenses.
        </p>
      </header>

      {/* Cybersecurity Gallery */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-square">
          <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600" alt="Cybersecurity code" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-square">
          <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=600" alt="Security systems" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg aspect-square">
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600" alt="Hacking environment" className="w-full h-full object-cover" />
        </div>
      </section>

      {/* Button Section */}
      <div className="text-center pb-24">
        <Link href="/schedule">
          <button className="inline-flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl">
            <Calendar className="w-6 h-6" />
            Schedule My Technical Interview
            <ArrowRight className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}
