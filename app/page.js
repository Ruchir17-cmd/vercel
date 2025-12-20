import Link from 'next/link';
import { Camera, Calendar, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Hero Section */}
      <header className="py-20 px-6 text-center bg-gray-50">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-100 rounded-full">
            <Camera className="w-10 h-10 text-indigo-600" />
          </div>
        </div>
        <h1 className="text-6xl font-black tracking-tight mb-6">
          Capture the Moment @ Metacube. <br/>
          <span className="text-indigo-600">Join Our Team.</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          We are looking for talented photographers to join our creative studio. 
          Show us your vision and schedule your interview today.
        </p>
      </header>

      {/* Photography Gallery */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-square group">
          <img 
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600" 
            alt="Camera gear" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-square group">
          <img 
            src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=600" 
            alt="Studio" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
        </div>
        <div className="rounded-3xl overflow-hidden shadow-lg aspect-square group">
          <img 
            src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=600" 
            alt="Portrait" 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          />
        </div>
      </section>

      {/* Button Section - Now Linked to /schedule */}
      <div className="text-center pb-24">
        <Link href="/schedule">
          <button className="inline-flex items-center gap-3 bg-indigo-600 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl cursor-pointer">
            <Calendar className="w-6 h-6" />
            Schedule My Interview
            <ArrowRight className="w-6 h-6" />
          </button>
        </Link>
      </div>
    </div>
  );
}