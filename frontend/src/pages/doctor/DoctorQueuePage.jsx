import React, { useState, useMemo } from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorQueueData } from '../../data/doctorMockData';
import { QueueSummaryCards } from '../../components/doctor/QueueSummaryCards';
import { QueueTabs } from '../../components/doctor/QueueTabs';
import { QueueFilters } from '../../components/doctor/QueueFilters';
import { QueueTable } from '../../components/doctor/QueueTable';
import { AdditionalStatisticsCards } from '../../components/doctor/SummaryCards';
import { TodayOverview } from '../../components/doctor/TodayOverview';

export const DoctorQueuePage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');

  // Calculate summary counts across the entire queue dataset
  const counts = useMemo(() => {
    return {
      all: doctorQueueData.length,
      waiting: doctorQueueData.filter((p) => p.status === 'Waiting').length,
      inConsultation: doctorQueueData.filter((p) => p.status === 'In Consultation').length,
      completed: doctorQueueData.filter((p) => p.status === 'Completed').length,
    };
  }, []);

  // Filter patients based on tab, search query, and department
  const filteredPatients = useMemo(() => {
    return doctorQueueData.filter((patient) => {
      // 1. Tab Status Filter
      if (activeTab === 'Waiting' && patient.status !== 'Waiting') return false;
      if (activeTab === 'In Consultation' && patient.status !== 'In Consultation') return false;
      if (activeTab === 'Completed' && patient.status !== 'Completed') return false;

      // 2. Department Filter
      if (departmentFilter !== 'ALL' && patient.department !== departmentFilter) return false;

      // 3. Search Query Filter (Patient Name, Queue Number, or Reason)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = (patient.patientName || patient.name).toLowerCase().includes(query);
        const queueMatch = (patient.queueNo || `#${patient.queueNumber}`)
          .toLowerCase()
          .includes(query);
        const reasonMatch = (patient.reason || '').toLowerCase().includes(query);

        if (!nameMatch && !queueMatch && !reasonMatch) return false;
      }

      return true;
    });
  }, [activeTab, searchQuery, departmentFilter]);

  const isFiltered =
    activeTab !== 'All' || searchQuery.trim() !== '' || departmentFilter !== 'ALL';

  const handleClearFilters = () => {
    setActiveTab('All');
    setSearchQuery('');
    setDepartmentFilter('ALL');
  };

  return (
    <DoctorLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-5 max-w-7xl mx-auto">
        {/* ── 1. Page Title & Overview Description (28–32px Heading) ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#17221B] tracking-tight">
              Queue
            </h1>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              Manage today's patient queue and consultation workflow.
            </p>
          </div>
        </div>

        {/* ── 2. Summary Overview Panel (Single Unified 4-Metric Strip) ── */}
        <section aria-label="Queue Summary Statistics">
          <QueueSummaryCards queueData={doctorQueueData} />
        </section>

        {/* ── 3. Main Queue Content & Supporting Timeline Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Primary Area (7/12): Search/Filters & Patient List Table */}
          <div className="lg:col-span-7 space-y-3.5">
            {/* Filter Tabs */}
            <div className="flex items-center justify-between gap-2 overflow-x-auto">
              <QueueTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                counts={counts}
              />
            </div>

            {/* Search & Department Dropdown */}
            <QueueFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              departmentFilter={departmentFilter}
              onDepartmentChange={setDepartmentFilter}
              isFiltered={isFiltered}
              onClearFilters={handleClearFilters}
            />

            {/* Patient List Table */}
            <section aria-label="Patient Queue Table">
              <QueueTable
                patients={filteredPatients}
                totalCount={doctorQueueData.length}
                onClearFilters={handleClearFilters}
                isFiltered={isFiltered}
              />
            </section>
          </div>

          {/* Supporting & Secondary Area (5/12): Supporting Metrics + Today's Timeline */}
          <div className="lg:col-span-5 space-y-5">
            <section aria-label="Supporting Clinical Metrics">
              <AdditionalStatisticsCards />
            </section>
            <section aria-label="Today's Timeline Overview">
              <TodayOverview />
            </section>
          </div>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default DoctorQueuePage;
