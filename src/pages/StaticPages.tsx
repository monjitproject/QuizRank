import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export function AboutPage() {
  const { isDarkMode } = useApp();
  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">🎯</div>
          <h1 className={`text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>About QuizRank India</h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>India's Most Trusted Government Exam Quiz Portal</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {[
            { icon: '🚀', title: 'Our Mission', desc: 'To democratize government exam preparation by providing high-quality, free quiz resources to every student in India, regardless of their economic background or location.' },
            { icon: '💡', title: 'Our Vision', desc: "To become India's most comprehensive and trusted platform for government job aspirants, helping millions secure their dream government jobs." },
          ].map((item, i) => (
            <div key={i} className={`rounded-2xl p-6 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
              <div className="text-3xl mb-3">{item.icon}</div>
              <h2 className={`text-xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h2>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div className={`rounded-2xl p-8 border mb-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
          <h2 className={`text-2xl font-black mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Why Choose QuizRank India?</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              '5,840+ quizzes across 150+ exams',
              '2.5 Million+ registered students',
              'Daily updated current affairs quiz',
              'Hindi & English both languages',
              'Detailed explanations for every answer',
              'All India rank prediction',
              'Free mock tests with performance analytics',
              'Mobile-friendly responsive design',
              'Expert-verified question bank',
              'Regular exam notifications & updates',
            ].map((point, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-sm flex-shrink-0">✓</span>
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{point}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl p-8 border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
          <h2 className={`text-2xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Our Team</h2>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            QuizRank India was founded by a team of passionate educators, subject matter experts, and tech professionals who themselves went through the journey of government exam preparation. Our editorial team consists of retired government officers, experienced teachers, and domain experts who ensure every question and answer is accurate, relevant, and exam-oriented.
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContactPage() {
  const { isDarkMode } = useApp();
  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-5xl mb-4">📬</div>
          <h1 className={`text-4xl font-black mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Contact Us</h1>
          <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>We'd love to hear from you. Get in touch with our team.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            {[
              { icon: <Mail size={20} />, label: 'Email', value: 'support@quizrankindia.in', color: 'bg-blue-100 text-blue-600' },
              { icon: <Phone size={20} />, label: 'Phone', value: '+91 9876543210', color: 'bg-green-100 text-green-600' },
              { icon: <MapPin size={20} />, label: 'Address', value: 'New Delhi, India 110001', color: 'bg-red-100 text-red-600' },
            ].map((item, i) => (
              <div key={i} className={`flex gap-4 items-center p-5 rounded-2xl border ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-md`}>
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center flex-shrink-0`}>{item.icon}</div>
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider mb-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{item.label}</div>
                  <div className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          <div className={`rounded-2xl border p-6 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg`}>
            <h3 className={`font-bold text-lg mb-5 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Send Message</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`} />
              <input type="email" placeholder="Email Address" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`} />
              <select className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`}>
                <option>General Inquiry</option>
                <option>Report Error</option>
                <option>Advertise With Us</option>
                <option>Partnership</option>
                <option>Technical Issue</option>
              </select>
              <textarea rows={4} placeholder="Your Message" className={`w-full px-4 py-3 rounded-xl border text-sm resize-none ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`} />
              <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-xl hover:shadow-lg transition-all btn-ripple">
                <Send size={16} /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  const { isDarkMode } = useApp();
  const sections = [
    { title: 'Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, take a quiz, or contact us. This includes name, email address, quiz scores, and usage data. We also automatically collect certain technical information when you use our services.' },
    { title: 'How We Use Your Information', content: 'We use your information to provide, maintain, and improve our services, send you notifications about new quizzes and exam updates, track your performance and provide personalized recommendations, and communicate with you about our services.' },
    { title: 'Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share anonymous, aggregated data for research and analytics purposes. We may disclose information if required by law or to protect our rights.' },
    { title: 'Cookies', content: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.' },
    { title: 'Data Security', content: 'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.' },
    { title: 'Your Rights', content: 'You have the right to access, correct, or delete your personal information. You can also opt-out of marketing communications at any time. Contact us at privacy@quizrankindia.in for any privacy-related requests.' },
  ];

  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last updated: January 15, 2025</p>
        </div>
        <div className={`rounded-2xl border p-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg space-y-6`}>
          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            At QuizRank India, we are committed to protecting your privacy and personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website.
          </p>
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{i + 1}. {section.title}</h2>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function TermsPage() {
  const { isDarkMode } = useApp();
  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Terms & Conditions</h1>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Last updated: January 15, 2025</p>
        </div>
        <div className={`rounded-2xl border p-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg space-y-6`}>
          {[
            { title: 'Acceptance of Terms', content: 'By accessing and using QuizRank India, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.' },
            { title: 'Use of Service', content: 'QuizRank India provides a free quiz platform for educational purposes. You may use our services for personal, non-commercial educational purposes only. You agree not to reproduce, duplicate, copy, sell, or exploit any portion of our service without express written permission.' },
            { title: 'User Accounts', content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. We reserve the right to terminate accounts at our discretion.' },
            { title: 'Intellectual Property', content: 'The content on QuizRank India, including questions, explanations, graphics, and logos, is owned by or licensed to us and is protected by copyright laws. You may not reproduce or distribute our content without permission.' },
            { title: 'Disclaimer', content: 'QuizRank India provides educational content for practice purposes only. We make no warranties about the completeness, accuracy, or reliability of the content. Quiz questions are based on available information and may not represent official exam questions.' },
            { title: 'Limitation of Liability', content: 'QuizRank India shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our service or inability to use our service.' },
          ].map((section, i) => (
            <div key={i}>
              <h2 className={`text-lg font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{i + 1}. {section.title}</h2>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DisclaimerPage() {
  const { isDarkMode } = useApp();
  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className={`text-4xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Disclaimer</h1>
        </div>
        <div className={`rounded-2xl border p-8 ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-lg space-y-4`}>
          {[
            'QuizRank India is an independent educational platform and is NOT affiliated with any government organization, exam body, or official authority.',
            'All quiz questions and answers are created for practice purposes only and do not represent official exam questions.',
            'While we strive to ensure accuracy, we make no warranties about the completeness or reliability of our content.',
            'Job notifications and exam information are sourced from publicly available information and official websites. Always verify details from official sources.',
            'Results of practice quizzes do not guarantee actual exam results or government job selection.',
            'QuizRank India reserves the right to modify content at any time without notice.',
          ].map((text, i) => (
            <div key={i} className={`flex gap-3 p-4 rounded-xl ${isDarkMode ? 'bg-slate-700' : 'bg-gray-50'}`}>
              <span className="text-blue-500 font-bold flex-shrink-0">{i + 1}.</span>
              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FAQPage() {
  const { isDarkMode } = useApp();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs = [
    { q: 'Is QuizRank India completely free?', a: 'Yes! QuizRank India is completely free to use. All quizzes, mock tests, and current affairs are available at no cost. We are supported by Google AdSense advertising.' },
    { q: 'How often are quizzes updated?', a: 'We update our quiz bank daily. Current affairs quizzes are updated every day, and new exam-specific quizzes are added regularly based on latest notifications and syllabus.' },
    { q: 'Are the quiz questions from official sources?', a: 'Our quiz questions are created by subject matter experts based on official exam patterns and previous year question papers. They are regularly reviewed for accuracy.' },
    { q: 'Can I practice quizzes in Hindi?', a: 'Yes! We support both Hindi and English. Hindi language quizzes have questions and options in Hindi, while English quizzes are in English. You can filter quizzes by language.' },
    { q: 'How does the leaderboard work?', a: 'The leaderboard ranks users based on their total score, accuracy, and number of quizzes completed. Weekly and monthly leaderboards are reset accordingly.' },
    { q: 'Can I access quizzes on mobile?', a: 'Yes, QuizRank India is fully responsive and works perfectly on mobile, tablet, and desktop devices.' },
    { q: 'How can I report an incorrect question?', a: 'You can report incorrect questions using the "Report Error" button on each question page, or email us at support@quizrankindia.in.' },
    { q: 'Is there a negative marking in mock tests?', a: 'Most government exam mock tests have negative marking as per the actual exam pattern. This is mentioned in the quiz details before you start.' },
  ];

  return (
    <div className={`min-h-screen py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-5xl mb-4">❓</div>
          <h1 className={`text-4xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Frequently Asked Questions</h1>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className={`rounded-2xl border overflow-hidden ${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} shadow-md`}>
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className={`w-full flex justify-between items-center p-5 text-left ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
              >
                <span className="font-semibold text-sm pr-4">{faq.q}</span>
                <span className={`text-xl transition-transform inline-block ${openFAQ === i ? 'rotate-180' : ''}`}>⌄</span>
              </button>
              {openFAQ === i && (
                <div className={`px-5 pb-5 text-sm leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function RegisterPage() {
  const { register, setCurrentPage, isDarkMode } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 800));
    register(name, email, password);
    setCurrentPage('home');
    setIsLoading(false);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 ${isDarkMode ? 'bg-slate-900' : 'bg-gray-50'}`}>
      <div className={`w-full max-w-md rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-8 text-white text-center">
          <div className="text-4xl mb-3">🎓</div>
          <h1 className="text-2xl font-black">Join QuizRank India</h1>
          <p className="text-blue-100 text-sm mt-1">Free access to 5840+ quizzes</p>
        </div>
        <form onSubmit={handleRegister} className="p-8 space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Full Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your full name" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email Address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="your@email.com" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Min 8 characters" className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`} />
          </div>
          <div>
            <label className={`block text-sm font-medium mb-1.5 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Target Exam</label>
            <select className={`w-full px-4 py-3 rounded-xl border text-sm ${isDarkMode ? 'bg-slate-700 border-slate-600 text-white' : 'border-gray-200'}`}>
              <option>SSC CGL</option>
              <option>SSC GD Constable</option>
              <option>RRB NTPC</option>
              <option>IBPS PO</option>
              <option>UPSC CSE</option>
              <option>UP Police</option>
              <option>Other</option>
            </select>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" required className="rounded" />
            <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>I agree to the <button type="button" onClick={() => setCurrentPage('terms')} className="text-blue-600 underline">Terms & Conditions</button></span>
          </label>
          <button type="submit" disabled={isLoading} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transition-all btn-ripple disabled:opacity-70">
            {isLoading ? 'Creating Account...' : '🚀 Create Free Account'}
          </button>
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Already have an account?{' '}
            <button type="button" onClick={() => setCurrentPage('home')} className="text-blue-600 font-medium hover:underline">Sign In</button>
          </p>
        </form>
      </div>
    </div>
  );
}
