const demoPatients = [
  {
    id: 1,
    name: "Asha Menon",
    age: 58,
    condition: "Type 2 Diabetes",
    segment: "diabetes",
    riskScore: 88,
    overdueDays: 24,
    gapType: "HbA1c review overdue",
    preferredChannel: "WhatsApp",
    lastVisit: "2026-02-11",
    dischargeDate: "",
    annualScreeningDue: "2026-03-04",
    revenueAtRisk: 12500,
    coordinator: "Priya",
    insurance: "Corporate TPA",
    language: "English"
  },
  {
    id: 2,
    name: "Rahul Deshpande",
    age: 67,
    condition: "Congestive Heart Failure",
    segment: "discharge",
    riskScore: 95,
    overdueDays: 4,
    gapType: "Post-discharge follow-up missed",
    preferredChannel: "Call",
    lastVisit: "2026-04-01",
    dischargeDate: "2026-03-30",
    annualScreeningDue: "2026-07-11",
    revenueAtRisk: 18000,
    coordinator: "Nisha",
    insurance: "Medisure Plus",
    language: "English"
  },
  {
    id: 3,
    name: "Farida Khan",
    age: 44,
    condition: "Hypertension",
    segment: "primary-care",
    riskScore: 66,
    overdueDays: 14,
    gapType: "Medication refill check-in due",
    preferredChannel: "SMS",
    lastVisit: "2026-02-18",
    dischargeDate: "",
    annualScreeningDue: "2026-05-16",
    revenueAtRisk: 6200,
    coordinator: "Ritu",
    insurance: "Self-pay",
    language: "English"
  },
  {
    id: 4,
    name: "Vikram Sethi",
    age: 61,
    condition: "COPD",
    segment: "discharge",
    riskScore: 83,
    overdueDays: 2,
    gapType: "Discharge symptom check needed",
    preferredChannel: "WhatsApp",
    lastVisit: "2026-04-03",
    dischargeDate: "2026-04-01",
    annualScreeningDue: "2026-08-21",
    revenueAtRisk: 14500,
    coordinator: "Priya",
    insurance: "MediShield",
    language: "Hindi"
  },
  {
    id: 5,
    name: "Neha Batra",
    age: 49,
    condition: "Type 2 Diabetes",
    segment: "diabetes",
    riskScore: 72,
    overdueDays: 31,
    gapType: "Retinal screening not scheduled",
    preferredChannel: "SMS",
    lastVisit: "2026-01-29",
    dischargeDate: "",
    annualScreeningDue: "2026-02-20",
    revenueAtRisk: 9800,
    coordinator: "Ritu",
    insurance: "Corporate TPA",
    language: "English"
  },
  {
    id: 6,
    name: "Sunil Iyer",
    age: 73,
    condition: "CKD",
    segment: "primary-care",
    riskScore: 91,
    overdueDays: 9,
    gapType: "Lab review pending",
    preferredChannel: "Call",
    lastVisit: "2026-03-09",
    dischargeDate: "",
    annualScreeningDue: "2026-06-01",
    revenueAtRisk: 15400,
    coordinator: "Nisha",
    insurance: "Medisure Plus",
    language: "English"
  },
  {
    id: 7,
    name: "Meera Joshi",
    age: 35,
    condition: "Postpartum care",
    segment: "primary-care",
    riskScore: 58,
    overdueDays: 12,
    gapType: "Six-week follow-up not booked",
    preferredChannel: "WhatsApp",
    lastVisit: "2026-02-24",
    dischargeDate: "",
    annualScreeningDue: "2026-10-24",
    revenueAtRisk: 7600,
    coordinator: "Anika",
    insurance: "Self-pay",
    language: "English"
  },
  {
    id: 8,
    name: "Imran Qureshi",
    age: 53,
    condition: "Type 2 Diabetes",
    segment: "diabetes",
    riskScore: 79,
    overdueDays: 18,
    gapType: "Foot exam overdue",
    preferredChannel: "WhatsApp",
    lastVisit: "2026-02-06",
    dischargeDate: "",
    annualScreeningDue: "2026-03-19",
    revenueAtRisk: 8400,
    coordinator: "Priya",
    insurance: "Corporate TPA",
    language: "English"
  }
];

const responseTemplates = [
  "Thanks, I can come this week. Please send available slots.",
  "I missed the earlier call. Friday morning works for me.",
  "Please book me after 5 PM. I want to complete this follow-up.",
  "Can someone call me back? I have a question before booking."
];

let state = {
  patients: structuredClone(demoPatients),
  selectedId: null,
  filter: "all",
  sentCount: 0,
  bookedCount: 2,
  recoveredRevenue: 38200,
  inbox: [
    {
      patientId: 101,
      name: "Anjali Roy",
      status: "booked",
      channel: "WhatsApp",
      message: "Booked for Thursday at 11:30 AM after diabetic review reminder."
    },
    {
      patientId: 102,
      name: "Rakesh Pillai",
      status: "replied",
      channel: "Call",
      message: "Asked to reschedule discharge follow-up for tomorrow evening."
    }
  ]
};

const statsGrid = document.getElementById("statsGrid");
const headlineInsight = document.getElementById("headlineInsight");
const headlineReason = document.getElementById("headlineReason");
const queueList = document.getElementById("queueList");
const detailPanel = document.getElementById("detailPanel");
const inboxList = document.getElementById("inboxList");
const csvInput = document.getElementById("csvInput");
const resetDemo = document.getElementById("resetDemo");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

function getPriorityLabel(patient) {
  if (patient.riskScore >= 85 || patient.revenueAtRisk >= 15000) return "High";
  if (patient.riskScore >= 65) return "Medium";
  return "Low";
}

function getPriorityClass(label) {
  return `priority-${label.toLowerCase()}`;
}

function getFilteredPatients() {
  const sorted = [...state.patients].sort((a, b) => {
    const scoreA = a.riskScore + a.overdueDays + a.revenueAtRisk / 1000;
    const scoreB = b.riskScore + b.overdueDays + b.revenueAtRisk / 1000;
    return scoreB - scoreA;
  });

  if (state.filter === "all") return sorted;
  if (state.filter === "high") return sorted.filter((patient) => getPriorityLabel(patient) === "High");
  return sorted.filter((patient) => patient.segment === state.filter);
}

function createMessages(patient) {
  const followUpAction = patient.gapType.toLowerCase().includes("discharge")
    ? "book your follow-up review"
    : "schedule your next clinic visit";

  return {
    sms: `Hi ${patient.name.split(" ")[0]}, your ${patient.gapType.toLowerCase()} is due. Reply YES and our team will help you ${followUpAction}.`,
    whatsapp: `Hello ${patient.name},\n\nYour ${patient.gapType.toLowerCase()} is pending.\n\nReply here and we will share the next available slots.`,
    voice: `Hello ${patient.name}, this is your clinic. ${patient.gapType} is pending. Press 1 for a callback.`
  };
}

function getStats() {
  const highPriority = state.patients.filter((patient) => getPriorityLabel(patient) === "High").length;
  const revenueAtRisk = state.patients.reduce((sum, patient) => sum + patient.revenueAtRisk, 0);

  return [
    {
      label: "Patients in queue",
      value: state.patients.length,
      note: "Demo panel loaded"
    },
    {
      label: "High priority",
      value: highPriority,
      note: "Risk and revenue"
    },
    {
      label: "Outreach sent",
      value: state.sentCount,
      note: "Approved today"
    },
    {
      label: "Bookings",
      value: state.bookedCount,
      note: "From outreach"
    },
    {
      label: "Revenue",
      value: `Rs ${(state.recoveredRevenue / 100000).toFixed(2)}L`,
      note: `Rs ${revenueAtRisk.toLocaleString("en-IN")} currently at risk`
    }
  ];
}

function getTopInsight(patients) {
  if (!patients.length) {
    return {
      headline: "No patients in the current view.",
      reason: "Upload a CSV or reset the demo data to re-run prioritization."
    };
  }

  const patient = patients[0];
  return {
    headline: `${patient.name} should be contacted first through ${patient.preferredChannel}.`,
    reason: `${patient.gapType} is ${patient.overdueDays} days overdue, with a risk score of ${patient.riskScore} and Rs ${patient.revenueAtRisk.toLocaleString("en-IN")} in visit value at stake.`
  };
}

function renderStats() {
  const cards = getStats()
    .map(
      (stat) => `
        <article class="stat-card">
          <small>${stat.label}</small>
          <strong>${stat.value}</strong>
          <small>${stat.note}</small>
        </article>
      `
    )
    .join("");
  statsGrid.innerHTML = cards;
}

function renderInsight(filteredPatients) {
  const insight = getTopInsight(filteredPatients);
  headlineInsight.textContent = insight.headline;
  headlineReason.textContent = insight.reason;
}

function renderQueue() {
  const filteredPatients = getFilteredPatients();
  if (!filteredPatients.length) {
    queueList.innerHTML = `<div class="empty-state">No patients matched this filter.</div>`;
    detailPanel.innerHTML = `<div class="empty-state">Select another filter to review patient outreach.</div>`;
    renderInsight(filteredPatients);
    return;
  }

  if (!state.selectedId || !filteredPatients.some((patient) => patient.id === state.selectedId)) {
    state.selectedId = filteredPatients[0].id;
  }

  queueList.innerHTML = filteredPatients
    .map((patient) => {
      const priority = getPriorityLabel(patient);
      return `
        <article class="queue-item ${patient.id === state.selectedId ? "queue-item-active" : ""}" data-patient-id="${patient.id}">
          <div class="queue-item-top">
            <span class="priority-pill ${getPriorityClass(priority)}">${priority} Priority</span>
            <small>${patient.preferredChannel}</small>
          </div>
          <h3>${patient.name}</h3>
          <div class="queue-item-meta">${patient.condition} | ${patient.gapType}</div>
          <p class="queue-item-meta">${patient.overdueDays} days overdue | Risk ${patient.riskScore} | Rs ${patient.revenueAtRisk.toLocaleString("en-IN")} value at risk</p>
        </article>
      `;
    })
    .join("");

  renderInsight(filteredPatients);
  renderDetails();
}

function renderDetails() {
  const patient = state.patients.find((item) => item.id === state.selectedId);
  if (!patient) {
    detailPanel.innerHTML = `<div class="empty-state">Select a patient to open the outreach studio.</div>`;
    return;
  }

  const messages = createMessages(patient);
  const priority = getPriorityLabel(patient);

  detailPanel.innerHTML = `
    <div class="detail-card">
      <div>
        <span class="priority-pill ${getPriorityClass(priority)}">${priority} Priority</span>
        <h3>${patient.name}</h3>
        <div class="detail-meta">${patient.condition} | ${patient.preferredChannel} | ${patient.coordinator}</div>
      </div>

      <div class="detail-grid">
        <div class="detail-meta"><strong>Care gap</strong><br />${patient.gapType}</div>
        <div class="detail-meta"><strong>Risk score</strong><br />${patient.riskScore} / 100</div>
        <div class="detail-meta"><strong>Revenue at risk</strong><br />Rs ${patient.revenueAtRisk.toLocaleString("en-IN")}</div>
        <div class="detail-meta"><strong>Insurance</strong><br />${patient.insurance}</div>
      </div>

      <div class="message-block">
        <h4>SMS draft</h4>
        <p>${messages.sms}</p>
      </div>

      <div class="message-block">
        <h4>WhatsApp draft</h4>
        <p>${messages.whatsapp}</p>
      </div>

      <div class="message-block">
        <h4>Voice script</h4>
        <p>${messages.voice}</p>
      </div>

      <div class="detail-actions">
        <button class="button button-primary" data-action="send">Approve and Send</button>
        <button class="button button-secondary" data-action="book">Mark as Booked</button>
      </div>
    </div>
  `;
}

function renderInbox() {
  if (!state.inbox.length) {
    inboxList.innerHTML = `<div class="empty-state">No patient replies yet. Approve outreach to simulate responses.</div>`;
    return;
  }

  inboxList.innerHTML = state.inbox
    .map(
      (reply) => `
        <article class="reply-item">
          <div class="reply-top">
            <strong>${reply.name}</strong>
            <span class="status-pill status-${reply.status}">${reply.status}</span>
          </div>
          <small>${reply.channel}</small>
          <p>${reply.message}</p>
        </article>
      `
    )
    .join("");
}

function syncView() {
  renderStats();
  renderQueue();
  renderInbox();
}

function simulateReply(patient, booked = false) {
  const message = booked
    ? `Appointment booked for ${patient.name} after ${patient.gapType.toLowerCase()}.`
    : responseTemplates[Math.floor(Math.random() * responseTemplates.length)];

  state.inbox.unshift({
    patientId: patient.id,
    name: patient.name,
    status: booked ? "booked" : "replied",
    channel: patient.preferredChannel,
    message
  });
}

function handleSend(patientId) {
  const patient = state.patients.find((item) => item.id === patientId);
  if (!patient) return;

  state.sentCount += 1;
  simulateReply(patient, false);
  syncView();
}

function handleBook(patientId) {
  const patient = state.patients.find((item) => item.id === patientId);
  if (!patient) return;

  state.bookedCount += 1;
  state.recoveredRevenue += patient.revenueAtRisk;
  state.patients = state.patients.filter((item) => item.id !== patientId);
  simulateReply(patient, true);
  state.selectedId = null;
  syncView();
}

function parseCsv(text) {
  const rows = text
    .trim()
    .split(/\r?\n/)
    .map((line) => line.split(",").map((cell) => cell.trim()));

  const headers = rows.shift();
  if (!headers || !headers.length) return [];

  return rows
    .filter((row) => row.some(Boolean))
    .map((row, index) => {
      const record = {};
      headers.forEach((header, headerIndex) => {
        record[header] = row[headerIndex] || "";
      });

      return {
        id: index + 1000,
        name: record.name || `Imported Patient ${index + 1}`,
        age: Number(record.age || 0),
        condition: record.condition || "Primary Care",
        segment: record.segment || "primary-care",
        riskScore: Number(record.riskScore || 60),
        overdueDays: Number(record.overdueDays || 7),
        gapType: record.gapType || "Follow-up due",
        preferredChannel: record.preferredChannel || "SMS",
        lastVisit: record.lastVisit || "",
        dischargeDate: record.dischargeDate || "",
        annualScreeningDue: record.annualScreeningDue || "",
        revenueAtRisk: Number(record.revenueAtRisk || 5000),
        coordinator: record.coordinator || "Care Team",
        insurance: record.insurance || "Unknown",
        language: record.language || "English"
      };
    });
}

queueList.addEventListener("click", (event) => {
  const target = event.target.closest("[data-patient-id]");
  if (!target) return;

  state.selectedId = Number(target.dataset.patientId);
  renderQueue();
});

detailPanel.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button || !state.selectedId) return;

  if (button.dataset.action === "send") handleSend(state.selectedId);
  if (button.dataset.action === "book") handleBook(state.selectedId);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("chip-active"));
    button.classList.add("chip-active");
    state.filter = button.dataset.filter;
    state.selectedId = null;
    renderQueue();
  });
});

csvInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const text = await file.text();
  const imported = parseCsv(text);
  if (!imported.length) return;

  state.patients = imported;
  state.sentCount = 0;
  state.bookedCount = 0;
  state.recoveredRevenue = 0;
  state.inbox = [];
  state.selectedId = null;
  state.filter = "all";
  filterButtons.forEach((item) => item.classList.toggle("chip-active", item.dataset.filter === "all"));
  syncView();
});

resetDemo.addEventListener("click", () => {
  state = {
    patients: structuredClone(demoPatients),
    selectedId: null,
    filter: "all",
    sentCount: 0,
    bookedCount: 2,
    recoveredRevenue: 38200,
    inbox: [
      {
        patientId: 101,
        name: "Anjali Roy",
        status: "booked",
        channel: "WhatsApp",
        message: "Booked for Thursday at 11:30 AM after diabetic review reminder."
      },
      {
        patientId: 102,
        name: "Rakesh Pillai",
        status: "replied",
        channel: "Call",
        message: "Asked to reschedule discharge follow-up for tomorrow evening."
      }
    ]
  };
  filterButtons.forEach((item) => item.classList.toggle("chip-active", item.dataset.filter === "all"));
  syncView();
});

syncView();

