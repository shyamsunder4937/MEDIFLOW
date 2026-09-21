import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PatientLayout } from '../../layouts/PatientLayout';
import {
  HelpCircle,
  Phone,
  MapPin,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ListOrdered,
  FlaskConical,
  Pill,
  Compass,
  Calendar,
  ShieldCheck,
  Building2,
  Info,
  PhoneCall,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';

const FAQS = [
  {
    id: 'queue',
    category: 'Queue & Token',
    question: 'How does the digital queue work?',
    answer:
      'When you arrive and register at reception Counter 3, you are given a token number (e.g. #07). You can track how many patients are ahead of you in real-time on the "My Queue" page without having to wait physically in the crowded corridor.',
    link: '/patient/queue',
    linkText: 'View My Queue',
    icon: ListOrdered,
  },
  {
    id: 'pharmacy',
    category: 'Prescriptions',
    question: 'Where do I collect my prescribed medications?',
    answer:
      'Once Dr. Arun Kumar finalizes your consultation, prescriptions are routed automatically to OPD Pharmacy Counter 02 (Ground Floor, OPD Block A). Track status on the "Pharmacy" page until it shows "Ready".',
    link: '/patient/pharmacy',
    linkText: 'View Pharmacy Status',
    icon: Pill,
  },
  {
    id: 'lab',
    category: 'Diagnostic Reports',
    question: 'How do I access my lab test reports?',
    answer:
      'Verified lab test results appear in the "Lab Results" tab as soon as they are approved by the clinical pathologist. You can inspect reference values, normal ranges, and clinical notes directly.',
    link: '/patient/lab-results',
    linkText: 'View Lab Results',
    icon: FlaskConical,
  },
  {
    id: 'journey',
    category: 'Visit Stages',
    question: 'How do I track my complete hospital journey?',
    answer:
      'The "My Journey" tab provides a 5-stage live progression tracker from Check-in and Vitals to Consultation, Labs, and Final Discharge so you always know your next step.',
    link: '/patient/journey',
    linkText: 'Open Journey Tracker',
    icon: Compass,
  },
  {
    id: 'appointments',
    category: 'Appointments',
    question: 'How can I view upcoming doctor appointments?',
    answer:
      'Visit the "Appointments" tab to view scheduled consultations, assigned specialist details, OPD room numbers, and slot timings.',
    link: '/patient/appointments',
    linkText: 'View Appointments',
    icon: Calendar,
  },
];

const HOSPITAL_FACILITIES = [
  {
    name: 'OPD Reception & Help Desk',
    location: 'Ground Floor, Main Atrium (Desk B-2)',
    ext: 'Ext. 2041',
    phone: '+91 80 4123 8900',
    hours: '8:00 AM – 8:00 PM',
  },
  {
    name: 'OPD Central Pharmacy',
    location: 'Ground Floor, Block A (Counter 02)',
    ext: 'Ext. 2045',
    phone: '+91 80 4123 8905',
    hours: '24/7 Dispensation',
  },
  {
    name: 'Clinical Diagnostics & Pathology',
    location: '1st Floor, OPD Block B (Room 104)',
    ext: 'Ext. 2050',
    phone: '+91 80 4123 8910',
    hours: '7:30 AM – 7:00 PM',
  },
  {
    name: 'Emergency & Triage Unit',
    location: 'Ground Floor, Wing E (Emergency Gate)',
    ext: 'Ext. 108',
    phone: '+91 80 4123 8999',
    hours: '24/7 Immediate Care',
  },
];

export const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState('queue');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setOpenFaq((prev) => (prev === id ? null : id));
  };

  return (
    <PatientLayout
      title="Help & Support"
      subtitle="Find quick answers, contact reception, or get assistance during your hospital visit."
    >
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
        {/* ── 1. PRIMARY INFORMATION: Immediate Assistance Card ── */}
        <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-[#E2E8F0] pb-5">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#F0FDF4] text-[#15803D] border border-[#DCFCE7] flex-shrink-0 shadow-2xs">
                <HelpCircle className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-[#17221B] tracking-tight">
                    OPD Reception & Patient Help Desk
                  </h2>
                  <span className="rounded-full bg-[#F0FDF4] border border-[#BBF7D0] px-2.5 py-0.5 text-xs font-semibold text-[#15803D] flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
                    Active Help Desk
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#64748B]">
                  Desk B-2 · Ground Floor Main Atrium, MediFlow Central Campus
                </p>
              </div>
            </div>

            {/* Primary Action */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-shrink-0">
              <a
                href="tel:+918041238900"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs active:scale-[0.98]"
              >
                <Phone className="h-4 w-4" />
                <span>Call Reception (Ext. 2041)</span>
              </a>
            </div>
          </div>

          {/* Quick Contact & Working Hours Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5">
              <PhoneCall className="h-4 w-4 text-[#15803D] flex-shrink-0" />
              <div>
                <span className="text-[#64748B] block text-[11px] font-semibold">Direct Helpline</span>
                <span className="font-bold text-[#17221B]">+91 80 4123 8900</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-[#15803D] flex-shrink-0" />
              <div>
                <span className="text-[#64748B] block text-[11px] font-semibold">OPD Working Hours</span>
                <span className="font-bold text-[#17221B]">Mon–Sat: 8:00 AM – 8:00 PM</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-[#15803D] flex-shrink-0" />
              <div>
                <span className="text-[#64748B] block text-[11px] font-semibold">Emergency Triage</span>
                <span className="font-bold text-[#17221B]">24/7 Care (Wing E)</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. MAIN CONTENT: Patient Portal Assistance Guide (FAQs) ── */}
        <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E2E8F0] pb-3.5">
            <div>
              <h2 className="text-base font-bold text-[#17221B]">Frequently Asked Questions</h2>
              <p className="text-xs text-[#64748B]">Clear answers to common questions about your hospital visit</p>
            </div>

            {/* Search filter */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-3 py-1.5 text-xs rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] text-[#17221B] placeholder:text-[#94A3B8] focus:border-[#15803D] focus:outline-none focus:ring-1 focus:ring-[#15803D] transition-all"
              />
            </div>
          </div>

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-8 text-xs text-[#64748B]">
                No matching help topics found for "{searchQuery}". Try searching for queue, pharmacy, or lab.
              </div>
            ) : (
              filteredFaqs.map((faq) => {
                const isOpen = openFaq === faq.id;
                const IconComponent = faq.icon;
                return (
                  <div
                    key={faq.id}
                    className={`rounded-xl border transition-all duration-150 ${
                      isOpen
                        ? 'border-[#15803D]/40 bg-[#F7FEF9]/60 shadow-2xs'
                        : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-slate-100/60'
                    }`}
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex items-center justify-between p-4 text-left gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] rounded-xl"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-lg border flex-shrink-0 transition-colors ${
                            isOpen
                              ? 'bg-[#F0FDF4] text-[#15803D] border-[#DCFCE7]'
                              : 'bg-white text-[#64748B] border-[#E2E8F0]'
                          }`}
                        >
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#64748B] block">
                            {faq.category}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-[#17221B] mt-0.5 block">
                            {faq.question}
                          </span>
                        </div>
                      </div>
                      <div className="text-[#64748B] flex-shrink-0">
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-[#475569] space-y-3 border-t border-[#E2E8F0]/70 animate-in fade-in duration-150">
                        <p className="leading-relaxed sm:text-xs text-[11.5px]">{faq.answer}</p>
                        {faq.link && (
                          <div className="pt-1">
                            <Link
                              to={faq.link}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] hover:text-[#166534] hover:underline"
                            >
                              <span>{faq.linkText}</span>
                              <ExternalLink className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>

        {/* ── 3. Hospital Departments & Key Directory ── */}
        <section className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-[#F0FDF4] text-[#15803D] flex items-center justify-center border border-[#DCFCE7]">
                <Building2 className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#17221B]">Hospital Department Directory</h2>
                <p className="text-xs text-[#64748B]">Internal extension lines and location coordinates</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-[#64748B] bg-[#F8FAFC] px-2.5 py-0.5 rounded-full border border-[#E2E8F0]">
              MediFlow Central
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
            {HOSPITAL_FACILITIES.map((fac) => (
              <div
                key={fac.name}
                className="p-3.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col justify-between gap-2.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-[#17221B] text-xs sm:text-sm">{fac.name}</span>
                    <span className="font-mono font-bold text-[11px] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded text-[#15803D]">
                      {fac.ext}
                    </span>
                  </div>
                  <div className="text-[#64748B] text-xs flex items-center gap-1.5 mt-1">
                    <MapPin className="h-3 w-3 text-[#94A3B8] flex-shrink-0" />
                    <span>{fac.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E2E8F0] text-[11px]">
                  <span className="text-[#64748B] flex items-center gap-1">
                    <Clock className="h-3 w-3 text-[#94A3B8]" />
                    {fac.hours}
                  </span>
                  <a
                    href={`tel:${fac.phone.replace(/[^0-9+]/g, '')}`}
                    className="font-bold text-[#15803D] hover:underline flex items-center gap-1"
                  >
                    <Phone className="h-3 w-3" />
                    <span>Call</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 4. In-Person Support & Wheelchair Assistance Notice ── */}
        <section className="p-4 rounded-xl bg-[#F0FDF4]/70 border border-[#BBF7D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <HeartHandshake className="h-5 w-5 text-[#15803D] flex-shrink-0" />
            <div className="text-[#17221B]">
              <span className="font-bold">Need physical escort or wheelchair assistance?</span>
              <p className="text-[#64748B] text-xs mt-0.5">
                Hospital volunteers and patient navigators are stationed at Entrance Lobby Gate 1.
              </p>
            </div>
          </div>
          <span className="text-[11px] font-bold text-[#15803D] bg-white border border-[#BBF7D0] px-3 py-1 rounded-md shadow-2xs whitespace-nowrap">
            Free Assistance
          </span>
        </section>
      </div>
    </PatientLayout>
  );
};

export default HelpPage;
