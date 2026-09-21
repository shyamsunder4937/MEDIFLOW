/**
 * Utility for generating professional hospital-grade prescription & medicine list PDFs
 * Uses browser print engine with A4 layout, clean typography, and subtle MediFlow green accents (#15803D).
 */

import {
  journeyData,
  currentPrescriptionVisit,
  prescriptions as defaultPrescriptions,
} from '../data/patientMockData';

export const generatePrescriptionPDF = (prescriptionOrList, customPatient) => {
  const patient = customPatient || {
    name: journeyData.patientName || 'Rahul Kumar',
    id: journeyData.patientId || 'MF-2026-00127',
    age: '34 Y',
    gender: 'Male',
    phone: '+91 98765 43210',
    visitDate: currentPrescriptionVisit?.visitDate || '18 September 2026',
    department: currentPrescriptionVisit?.department || 'General Medicine',
    doctor: currentPrescriptionVisit?.doctor || 'Dr. Arun Kumar',
    orderId: 'PH-2026-0042',
  };

  const medicineList = Array.isArray(prescriptionOrList)
    ? prescriptionOrList
    : prescriptionOrList
    ? [prescriptionOrList]
    : defaultPrescriptions;

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>MediFlow - Patient Medicine List (${patient.name})</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      color: #17221B;
      background: #FFFFFF;
      font-size: 11.5px;
      line-height: 1.45;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .doc-wrapper {
      max-width: 780px;
      margin: 0 auto;
      padding: 10px;
    }
    
    /* ── Header ── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 12px;
      border-bottom: 2px solid #15803D;
      margin-bottom: 14px;
    }
    .brand-title {
      font-size: 22px;
      font-weight: 800;
      color: #15803D;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .brand-subtitle {
      font-size: 10px;
      color: #64748B;
      font-weight: 500;
      margin-top: 1px;
    }
    .doc-meta {
      text-align: right;
    }
    .doc-title {
      font-size: 16px;
      font-weight: 700;
      color: #17221B;
    }
    .doc-date {
      font-size: 10.5px;
      color: #64748B;
      margin-top: 2px;
    }

    /* ── Section Grid ── */
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-bottom: 14px;
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 10px 14px;
    }
    .section-subhead {
      font-size: 10.5px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #15803D;
      margin-bottom: 6px;
      border-bottom: 1px solid #E2E8F0;
      padding-bottom: 3px;
    }
    .data-row {
      display: flex;
      margin-bottom: 3px;
      font-size: 11px;
    }
    .data-label {
      width: 110px;
      color: #64748B;
      font-weight: 500;
      flex-shrink: 0;
    }
    .data-val {
      color: #17221B;
      font-weight: 600;
      flex: 1;
    }

    /* ── Medicine List Table ── */
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #17221B;
      margin-top: 14px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-title::before {
      content: "";
      display: inline-block;
      width: 3.5px;
      height: 12px;
      background: #15803D;
      border-radius: 2px;
    }

    .med-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 14px;
      font-size: 11px;
    }
    .med-table th {
      background: #F1F5F9;
      color: #475569;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 9.5px;
      letter-spacing: 0.5px;
      text-align: left;
      padding: 7px 8px;
      border-top: 1px solid #CBD5E1;
      border-bottom: 1px solid #CBD5E1;
    }
    .med-table td {
      padding: 8px;
      border-bottom: 1px solid #E2E8F0;
      color: #17221B;
      vertical-align: top;
    }
    .med-name {
      font-weight: 700;
      color: #17221B;
      font-size: 11.5px;
    }
    .med-generic {
      font-size: 10px;
      color: #64748B;
      margin-top: 1px;
    }
    .med-instruction {
      font-size: 10px;
      color: #15803D;
      margin-top: 2px;
      font-weight: 500;
    }
    .badge {
      display: inline-block;
      font-size: 9.5px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      background: #F0FDF4;
      color: #15803D;
      border: 1px solid #BBF7D0;
      white-space: nowrap;
    }

    /* ── Doctor Information ── */
    .doctor-card {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 9px 12px;
      margin-bottom: 14px;
      font-size: 10.5px;
    }

    /* ── Divider ── */
    .separator {
      border: 0;
      border-top: 1px solid #E2E8F0;
      margin: 14px 0;
    }

    /* ── PHARMACY INFORMATION (Required at the end of PDF) ── */
    .pharmacy-info-box {
      background: #FFFFFF;
      border: 1px solid #E2E8F0;
      border-radius: 8px;
      padding: 10px 14px;
      margin-top: 10px;
    }
    .pharmacy-info-title {
      font-size: 11px;
      font-weight: 800;
      letter-spacing: 0.5px;
      color: #17221B;
      text-transform: uppercase;
    }
    .pharmacy-info-subtitle {
      font-size: 10px;
      color: #64748B;
      margin-top: 1px;
      margin-bottom: 6px;
      font-weight: 500;
    }
    .pharmacy-info-desc {
      font-size: 10.5px;
      color: #475569;
      line-height: 1.45;
      margin-bottom: 8px;
    }
    .guideline-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .guideline-item {
      background: #F8FAFC;
      border: 1px solid #E2E8F0;
      border-radius: 6px;
      padding: 7px 10px;
      font-size: 10px;
    }
    .guideline-heading {
      font-weight: 700;
      color: #17221B;
      margin-bottom: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .guideline-check {
      color: #15803D;
      font-weight: 800;
    }
    .guideline-text {
      color: #64748B;
      line-height: 1.35;
    }

    /* ── Footer ── */
    .footer-bar {
      margin-top: 14px;
      text-align: center;
      font-size: 9px;
      color: #94A3B8;
      border-top: 1px solid #F1F5F9;
      padding-top: 6px;
    }

    @media print {
      body {
        margin: 0;
        padding: 0;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="doc-wrapper">
    <!-- Header -->
    <div class="header">
      <div>
        <div class="brand-title">MEDIFLOW</div>
        <div class="brand-subtitle">MediFlow General Hospital • Hospital Information System</div>
      </div>
      <div class="doc-meta">
        <div class="doc-title">Patient Medicine List</div>
        <div class="doc-date">Date: ${patient.visitDate}</div>
      </div>
    </div>

    <!-- Details Grid -->
    <div class="details-grid">
      <!-- Patient Details -->
      <div>
        <div class="section-subhead">Patient Details</div>
        <div class="data-row">
          <span class="data-label">Patient Name:</span>
          <span class="data-val">${patient.name}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Patient ID:</span>
          <span class="data-val">${patient.id}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Age / Gender:</span>
          <span class="data-val">${patient.age} / ${patient.gender}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Phone:</span>
          <span class="data-val">${patient.phone}</span>
        </div>
      </div>

      <!-- Prescription Details -->
      <div>
        <div class="section-subhead">Prescription Details</div>
        <div class="data-row">
          <span class="data-label">Attending Doctor:</span>
          <span class="data-val">${patient.doctor}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Department:</span>
          <span class="data-val">${patient.department}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Visit Date:</span>
          <span class="data-val">${patient.visitDate}</span>
        </div>
        <div class="data-row">
          <span class="data-label">Order Ref:</span>
          <span class="data-val">${patient.orderId}</span>
        </div>
      </div>
    </div>

    <!-- Medicine List -->
    <div class="section-title">Medicine List</div>
    <table class="med-table">
      <thead>
        <tr>
          <th style="width: 25px; text-align: center;">#</th>
          <th style="width: 220px;">Medicine & Details</th>
          <th style="width: 80px;">Dosage</th>
          <th style="width: 140px;">Timing / Frequency</th>
          <th style="width: 75px;">Duration</th>
          <th style="width: 60px;">Qty</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        ${medicineList
          .map(
            (med, idx) => `
          <tr>
            <td style="text-align: center; color: #64748B; font-weight: 600;">${idx + 1}</td>
            <td>
              <div class="med-name">${med.medicine}</div>
              <div class="med-generic">${med.genericName} · ${med.category}</div>
              ${med.instructions ? `<div class="med-instruction">ℹ️ ${med.instructions}</div>` : ''}
            </td>
            <td><strong>${med.dosage}</strong></td>
            <td>
              <div><strong>${med.frequency}</strong></div>
              <div class="med-generic">${med.frequencyDetail || ''}</div>
            </td>
            <td>${med.duration}</td>
            <td><strong>${med.quantity} ${med.unit || 'Units'}</strong></td>
            <td>
              <span class="badge">${med.status}</span>
            </td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <!-- Doctor / Prescription Information -->
    <div class="section-title">Doctor / Prescription Information</div>
    <div class="doctor-card">
      <div class="data-row">
        <span class="data-label" style="width: 140px;">Prescribing Physician:</span>
        <span class="data-val">${patient.doctor} (Senior Consultant, General Medicine)</span>
      </div>
      <div class="data-row">
        <span class="data-label" style="width: 140px;">Hospital & Location:</span>
        <span class="data-val">MediFlow General Hospital — OPD Block B, Room 204</span>
      </div>
      <div class="data-row">
        <span class="data-label" style="width: 140px;">Pharmacy Pickup:</span>
        <span class="data-val">Counter 02, Ground Floor OPD Pharmacy (8:00 AM – 8:00 PM)</span>
      </div>
      <div class="data-row">
        <span class="data-label" style="width: 140px;">Verification:</span>
        <span class="data-val" style="color: #15803D;">✓ Digitally Signed & Verified for OPD Dispensation</span>
      </div>
    </div>

    <hr class="separator" />

    <!-- PHARMACY INFORMATION (At the END of PDF) -->
    <div class="pharmacy-info-box">
      <div class="pharmacy-info-title">PHARMACY INFORMATION</div>
      <div class="pharmacy-info-subtitle">Usage & verification guidelines</div>
      <p class="pharmacy-info-desc">
        Your prescriptions and pharmacy orders are displayed here for tracking purposes. Medication decisions should always follow instructions from your healthcare professional.
      </p>

      <div class="guideline-grid">
        <div class="guideline-item">
          <div class="guideline-heading">
            <span class="guideline-check">✓</span>
            <span>Verified Dispensing</span>
          </div>
          <p class="guideline-text">
            All prescriptions are verified by a licensed hospital pharmacist before dispensation.
          </p>
        </div>

        <div class="guideline-item">
          <div class="guideline-heading">
            <span class="guideline-check">✓</span>
            <span>Doctor's Orders Only</span>
          </div>
          <p class="guideline-text">
            MediFlow dispenses only what your doctor has prescribed for your current visit.
          </p>
        </div>
      </div>
    </div>

    <!-- Document Footer -->
    <div class="footer-bar">
      MediFlow Hospital Information Management System • Official Patient Medicine Record • Document ID: ${patient.orderId}
    </div>
  </div>
</body>
</html>
  `;

  // Open printable window and trigger print
  const printWindow = window.open('', '_blank', 'width=900,height=800');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 350);
  }
};
