import React, { useState, useMemo } from 'react';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { doctorQueueData } from '../../data/doctorMockData';
import { QueueSummaryCards } from '../../components/doctor/QueueSummaryCards';
import { QueueTabs } from '../../components/doctor/QueueTabs';
import { QueueFilters } from '../../components/doctor/QueueFilters';
import { QueueTable } from '../../components/doctor/QueueTable';

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

      // 3. Search Query Filter (Patient Name or Queue Number)
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
    <DoctorLayout
      title="Patient Queue"
      subtitle="Manage today's patient queue and consultation workflow."
    >
      <div className="p-4 sm:p-6 space-y-5 max-w-7xl mx-auto">
        {/* ── 1. Queue Summary Cards ── */}
        <section aria-label="Queue Summary Statistics">
          <QueueSummaryCards queueData={doctorQueueData} />
        </section>

        {/* ── 2. Tabs & Filter Section ── */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <QueueTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={counts}
            />
          </div>

          <QueueFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            departmentFilter={departmentFilter}
            onDepartmentChange={setDepartmentFilter}
            isFiltered={isFiltered}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* ── 3. Main Queue Table & Mobile Cards ── */}
        <section aria-label="Patient Queue Table">
          <QueueTable
            patients={filteredPatients}
            totalCount={doctorQueueData.length}
            onClearFilters={handleClearFilters}
            isFiltered={isFiltered}
          />
        </section>
      </div>
    </DoctorLayout>
  );
};

export default DoctorQueuePage;
