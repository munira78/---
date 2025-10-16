import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const { contactInfo, siteConfig } = useData();
  const theme = siteConfig.theme || 'dark';
  
  const borderColor = theme === 'dark' ? 'border-slate-700' : 'border-gray-200';
  const formBg = theme === 'dark' ? 'bg-slate-800/50' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const inputBg = theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-gray-100 border-gray-300';
  const inputText = theme === 'dark' ? 'text-white' : 'text-gray-900';
  const labelText = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission
    console.log(formData);
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <div>
      <h1 className={`text-4xl font-bold text-amber-400 mb-8 pb-4 border-b-2 ${borderColor}`}>تواصل معنا</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div className={`${formBg} p-8 rounded-lg border ${borderColor}`}>
          <h2 className="text-2xl font-semibold text-blue-400 mb-6">أرسل لنا رسالة</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className={`block text-sm font-medium ${labelText}`}>الاسم الكامل</label>
              <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} />
            </div>
            <div>
              <label htmlFor="email" className={`block text-sm font-medium ${labelText}`}>البريد الإلكتروني</label>
              <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`} />
            </div>
            <div>
              <label htmlFor="message" className={`block text-sm font-medium ${labelText}`}>رسالتك</label>
              <textarea name="message" id="message" rows={4} required value={formData.message} onChange={handleChange} className={`mt-1 block w-full ${inputBg} border rounded-md shadow-sm py-2 px-3 ${inputText} focus:outline-none focus:ring-amber-500 focus:border-amber-500`}></textarea>
            </div>
            <button type="submit" disabled={status === 'sending'} className="w-full bg-amber-500 text-slate-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-400 transition-all duration-300 disabled:opacity-50">
              {status === 'sending' ? 'جار الإرسال...' : 'إرسال الرسالة'}
            </button>
            {status === 'sent' && <p className="text-green-400 mt-4 text-center">تم إرسال رسالتك بنجاح!</p>}
          </form>
        </div>
        <div className={textColor}>
           <h2 className="text-2xl font-semibold text-blue-400 mb-6">معلومات الاتصال</h2>
           <div className="space-y-4">
              <p><strong>العنوان:</strong> {contactInfo.address}</p>
              <p><strong>البريد الإلكتروني:</strong> {contactInfo.email}</p>
              <p><strong>الهاتف:</strong> {contactInfo.phone}</p>
           </div>
           <div className="mt-8">
              <h3 className="text-xl font-semibold text-blue-400 mb-4">أوقات الدوام</h3>
              <p>{contactInfo.workHours}</p>
           </div>
           <div className={`mt-8 h-64 ${theme === 'dark' ? 'bg-slate-800' : 'bg-gray-200'} rounded-lg overflow-hidden border ${borderColor}`}>
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d213385.8342898083!2d44.20239641640625!3d33.31520330000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9deda9d2a3b16f2c!2sBaghdad!5e0!3m2!1sen!2siq!4v1698244672152!5m2!1sen!2siq" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Institute Location">
             </iframe>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;