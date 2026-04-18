'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Calendar, Clock, Video } from 'lucide-react';

export default function LoginFlow() {
  const [step, setStep] = useState(0);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');

  const [schedule, setSchedule] = useState({
    date: '',
    time: '',
    mode: 'Virtual (Google Meet)'
  });

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center font-sans">

      <AnimatePresence mode="wait">

        {/* STEP 0 — LANDING */}
        {step === 0 && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center max-w-2xl px-6"
          >
            <div className="mb-6 text-5xl">🛡️</div>

            <h1 className="text-4xl font-semibold text-[#202124] mb-4">
              Break Security. Build Defense.
            </h1>

            <h2 className="text-2xl text-[#1a73e8] mb-6">
              Join our Cybersecurity Internship Program
            </h2>

            <p className="text-[#5f6368] mb-10">
              Work on real-world security problems, simulate attacks,
              and help build resilient systems.
            </p>

            <button
              onClick={() => setStep(1)}
              className="bg-[#1a73e8] text-white px-8 py-3 rounded-full text-lg hover:bg-[#1765cc]"
            >
              Apply Now
            </button>
          </motion.div>
        )}

        {/* STEP 1 — EMAIL */}
        {step === 1 && (
          <motion.div
            key="email"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white p-8 rounded-xl shadow-md w-[400px]"
          >
            <h1 className="text-2xl mb-4 text-[#202124]">Sign in</h1>

            <input
              type="email"
              placeholder="Email or phone"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-4 py-3 rounded mb-6"
            />

            <button
              onClick={() => setStep(2)}
              className="bg-[#1a73e8] text-white px-6 py-2 rounded-full float-right"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* STEP 2 — PASSWORD */}
        {step === 2 && (
          <motion.div
            key="password"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-md w-[400px]"
          >
            <h1 className="text-xl mb-4 text-[#202124]">Enter password</h1>

            <div className="mb-4 text-sm text-gray-600">{email}</div>

            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 rounded mb-6"
            />

            <button
              onClick={() => setStep(3)}
              className="bg-[#1a73e8] text-white px-6 py-2 rounded-full float-right"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* STEP 3 — AUTHENTICATOR */}
        {step === 3 && (
          <motion.div
            key="2fa"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-md w-[400px] text-center"
          >
            <ShieldCheck className="mx-auto mb-4 text-[#1a73e8]" />

            <h1 className="text-xl mb-4">2-Step Verification</h1>

            <p className="text-sm text-gray-600 mb-6">
              Enter the 6-digit code from your authenticator app
            </p>

            <input
              type="text"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full border px-4 py-3 rounded mb-6 text-center tracking-widest"
            />

            <button
              onClick={() => setStep(4)}
              className="bg-[#1a73e8] text-white px-6 py-2 rounded-full w-full"
            >
              Verify
            </button>
          </motion.div>
        )}

        {/* STEP 4 — SCHEDULER */}
        {step === 4 && (
          <motion.div
            key="scheduler"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow-md w-[450px]"
          >
            <h1 className="text-xl mb-6 text-center text-[#202124]">
              Schedule Your Interview
            </h1>

            <div className="space-y-4">

              <div className="flex items-center gap-3 border p-3 rounded">
                <Calendar />
                <input
                  type="date"
                  onChange={(e) =>
                    setSchedule({ ...schedule, date: e.target.value })
                  }
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center gap-3 border p-3 rounded">
                <Clock />
                <input
                  type="time"
                  onChange={(e) =>
                    setSchedule({ ...schedule, time: e.target.value })
                  }
                  className="w-full outline-none"
                />
              </div>

              <div className="flex items-center gap-3 border p-3 rounded">
                <Video />
                <select
                  onChange={(e) =>
                    setSchedule({ ...schedule, mode: e.target.value })
                  }
                  className="w-full outline-none"
                >
                  <option>Virtual (Google Meet)</option>
                  <option>In-person</option>
                </select>
              </div>

            </div>

            <button
              onClick={() => setStep(5)}
              className="mt-6 w-full bg-[#1a73e8] text-white py-3 rounded-full"
            >
              Confirm
            </button>
          </motion.div>
        )}

        {/* STEP 5 — SUCCESS */}
        {step === 5 && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center bg-white p-10 rounded-xl shadow-md"
          >
            <ShieldCheck className="mx-auto text-green-600 mb-4" />

            <h1 className="text-xl font-semibold mb-2">
              Interview Scheduled
            </h1>

            <p className="text-gray-600">
              Check your email for confirmation details.
            </p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
