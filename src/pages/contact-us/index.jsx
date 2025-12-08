import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const ContactUs = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    // Demo: just log and show success message
    console.log('Contact form submitted', form);
    setStatus('Thanks! We will get back to you shortly.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header userRole="user" />
      <Sidebar isCollapsed={sidebarCollapsed} onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)} userRole="user" />

      <main className={`transition-all duration-300 lg:pl-${sidebarCollapsed ? '20' : '72'} pb-20 lg:pb-8`}>
        <div className="container mx-auto px-4 py-6 lg:py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-card rounded-2xl p-6 shadow-gentle border border-border">
              <h1 className="text-2xl font-semibold text-foreground mb-2">Contact Us</h1>
              <p className="text-sm text-muted-foreground mb-4">Have a question or need help? Send us a message and we'll respond as soon as we can.</p>

              {status && (
                <div className="mb-4 p-3 bg-success/10 rounded">
                  <p className="text-sm text-success-foreground">{status}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm text-foreground">Name</label>
                  <input value={form.name} onChange={handleChange('name')} className="w-full mt-2 p-3 rounded-lg border border-border bg-input text-foreground" />
                </div>
                <div>
                  <label className="text-sm text-foreground">Email</label>
                  <input value={form.email} onChange={handleChange('email')} className="w-full mt-2 p-3 rounded-lg border border-border bg-input text-foreground" />
                </div>
                <div>
                  <label className="text-sm text-foreground">Message</label>
                  <textarea value={form.message} onChange={handleChange('message')} rows={5} className="w-full mt-2 p-3 rounded-lg border border-border bg-input text-foreground" />
                </div>
                <div className="flex items-center justify-between">
                  <Button type="submit">Send Message</Button>
                  <a href="mailto:carevisarchive@gmail.com" className="text-sm text-primary underline">Or email us directly</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;
