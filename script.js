/**
 * Green Campus Challenge ♻️ — Enhanced Application Script
 * Interdepartmental E-Waste Recycling Competition Platform
 * Includes PRN, Division, Student Verification Portal, Inter-Division Standings,
 * Digital Certificates, and Campus Zero-Landfill Pledge.
 */

(() => {
  'use strict';

  // --- Constants & Master Configuration ---
  const STORAGE_KEY = 'green_campus_challenge_v2';
  const SOUND_STORAGE_KEY = 'green_campus_sound_enabled';
  const QUIZ_STORAGE_KEY = 'green_campus_quiz_completed_v2';
  const PLEDGE_STORAGE_KEY = 'green_campus_pledge_count_v2';
  
  const INITIAL_DEPARTMENTS = [
    { id: 'comp', code: 'COMP', name: 'Computer Engineering', items: 45, points: 450 },
    { id: 'it', code: 'IT', name: 'IT Engineering', items: 32, points: 320 },
    { id: 'extc', code: 'EXTC', name: 'Electronics Engineering', items: 28, points: 280 },
    { id: 'mech', code: 'MECH', name: 'Mechanical Engineering', items: 19, points: 190 },
    { id: 'civil', code: 'CIVIL', name: 'Civil Engineering', items: 12, points: 120 },
    { id: 'biotech', code: 'BIOTECH', name: 'Biotechnology', items: 8, points: 80 }
  ];

  const INITIAL_ACTIVITIES = [
    {
      id: 'act_demo_101',
      studentName: 'Priya Sharma',
      studentPrn: '2024COMP1042',
      division: 'Div B',
      deptId: 'comp',
      deptName: 'Computer Engineering',
      deviceType: 'Laptop / Desktop',
      quantity: 2,
      points: 40,
      timestamp: Date.now() - 1000 * 60 * 14 // 14 mins ago
    },
    {
      id: 'act_demo_102',
      studentName: 'Rahul Verma',
      studentPrn: '2024IT1089',
      division: 'Div A',
      deptId: 'it',
      deptName: 'IT Engineering',
      deviceType: 'Monitor / TV',
      quantity: 1,
      points: 15,
      timestamp: Date.now() - 1000 * 60 * 42 // 42 mins ago
    },
    {
      id: 'act_demo_103',
      studentName: 'Ananya Patel',
      studentPrn: '2024EXTC1015',
      division: 'Div A',
      deptId: 'extc',
      deptName: 'Electronics Engineering',
      deviceType: 'Phone / Tablet',
      quantity: 2,
      points: 20,
      timestamp: Date.now() - 1000 * 60 * 115 // ~2 hrs ago
    },
    {
      id: 'act_demo_104',
      studentName: 'Rohan Kulkarni',
      studentPrn: '2024MECH1033',
      division: 'Div C',
      deptId: 'mech',
      deptName: 'Mechanical Engineering',
      deviceType: 'Batteries',
      quantity: 4,
      points: 20,
      timestamp: Date.now() - 1000 * 60 * 220 // ~3.5 hrs ago
    },
    {
      id: 'act_demo_105',
      studentName: 'Sneha Nair',
      studentPrn: '2024CIVIL1054',
      division: 'Div A',
      deptId: 'civil',
      deptName: 'Civil Engineering',
      deviceType: 'Cables / Chargers',
      quantity: 5,
      points: 10,
      timestamp: Date.now() - 1000 * 60 * 340 // ~5.5 hrs ago
    },
    {
      id: 'act_demo_106',
      studentName: 'Priya Sharma',
      studentPrn: '2024COMP1042',
      division: 'Div B',
      deptId: 'comp',
      deptName: 'Computer Engineering',
      deviceType: 'Peripherals',
      quantity: 2,
      points: 10,
      timestamp: Date.now() - 1000 * 60 * 500 // ~8 hrs ago
    }
  ];

  const DEVICE_POINTS = {
    'Laptop / Desktop': 20,
    'Monitor / TV': 15,
    'Phone / Tablet': 10,
    'Peripherals': 5,
    'Batteries': 5,
    'Cables / Chargers': 2
  };

  // Environmental Impact Multipliers per device
  const DEVICE_IMPACT = {
    'Laptop / Desktop': { co2Kg: 15.2, energyKwh: 90.0, toxicG: 220, preciousG: 3.5 },
    'Monitor / TV':     { co2Kg: 8.5,  energyKwh: 52.0, toxicG: 380, preciousG: 1.8 },
    'Phone / Tablet':   { co2Kg: 2.1,  energyKwh: 14.5, toxicG: 60,  preciousG: 0.9 },
    'Peripherals':      { co2Kg: 0.8,  energyKwh: 5.0,  toxicG: 25,  preciousG: 0.3 },
    'Batteries':        { co2Kg: 1.5,  energyKwh: 8.0,  toxicG: 140, preciousG: 0.1 },
    'Cables / Chargers':{ co2Kg: 0.4,  energyKwh: 2.5,  toxicG: 15,  preciousG: 0.2 }
  };

  const CAMPUS_GOAL = {
    targetDevices: 500
  };

  const BADGE_TIERS = [
    {
      id: 'starter',
      name: 'Green Starter',
      pointsReq: 100,
      themeClass: 'starter',
      desc: 'Your first 100 points of responsible recycling.',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 20h10"></path><path d="M10 20c5.5-2.5.8-6.4 3-10"></path><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4.1 5.5.8z"></path><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"></path></svg>`
    },
    {
      id: 'hero',
      name: 'Recycling Hero',
      pointsReq: 300,
      themeClass: 'hero',
      desc: '300+ points — a department that consistently shows up.',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"></path><path d="M11 19h8.2a1.8 1.8 0 0 0 1.55-.89 1.8 1.8 0 0 0 0-1.77L16.8 9.5"></path><path d="M12.5 3a1.8 1.8 0 0 0-1.54.89l-4.7 8.11h9.48l-1.7-2.95"></path></svg>`
    },
    {
      id: 'champion',
      name: 'E-Waste Champion',
      pointsReq: 500,
      themeClass: 'champion',
      desc: '500+ points — the campus gold standard.',
      iconSvg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>`
    }
  ];

  // Daily Trivia Question
  const DAILY_QUIZ = {
    id: 'quiz_lithium_batteries',
    question: 'Why should rechargeable lithium-ion batteries NEVER be dumped in ordinary campus trash?',
    options: [
      { text: 'They cause landfill fires and contaminate groundwater with heavy metals', isCorrect: true },
      { text: 'They dissolve plastic trash bags on contact', isCorrect: false },
      { text: 'They consume wireless signals from garbage trucks', isCorrect: false },
      { text: 'They only work if recycled by phone manufacturers', isCorrect: false }
    ],
    explanation: 'Correct! Lithium batteries pose severe fire hazards in collection trucks and leak cobalt, nickel, and toxic electrolyte into soil and groundwater if sent to landfills.'
  };

  // --- Application State ---
  let appState = {
    departments: [],
    activities: []
  };

  let searchQuery = '';
  let leaderboardViewMode = 'departments'; // 'departments' | 'divisions'
  let activityFilterDept = 'all';
  let activityFilterDivision = 'all';
  let isSubmitting = false;
  let soundEnabled = true;

  // Web Audio Context (lazy-loaded on first user gesture)
  let audioCtx = null;

  // --- DOM Elements ---
  const audioToggleBtn = document.getElementById('audioToggleBtn');
  const audioOnIcon = document.querySelector('.audio-on-icon');
  const audioOffIcon = document.querySelector('.audio-off-icon');

  const navDeviceCount = document.getElementById('navDeviceCount');
  const openLogModalBtn = document.getElementById('openLogModalBtn');
  const guideLogBtn = document.getElementById('guideLogBtn');
  const logModal = document.getElementById('logModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const dropOffForm = document.getElementById('dropOffForm');
  
  // Form input elements
  const studentNameInput = document.getElementById('studentName');
  const studentPrnInput = document.getElementById('studentPrn');
  const deptSelect = document.getElementById('deptSelect');
  const divisionSelect = document.getElementById('divisionSelect');
  const deviceSelect = document.getElementById('deviceSelect');
  const quantityInput = document.getElementById('quantityInput');
  const modalPreviewPoints = document.getElementById('modalPreviewPoints');
  const previewSubnote = document.getElementById('previewSubnote');
  const previewDeptTargetName = document.getElementById('previewDeptTargetName');
  const submitDropOffBtn = document.getElementById('submitDropOffBtn');

  // Error spans
  const nameError = document.getElementById('nameError');
  const prnError = document.getElementById('prnError');
  const deptError = document.getElementById('deptError');
  const divisionError = document.getElementById('divisionError');
  const deviceError = document.getElementById('deviceError');
  const quantityError = document.getElementById('quantityError');

  // Hero elements
  const championMonth = document.getElementById('championMonth');
  const championRankBadge = document.getElementById('championRankBadge');
  const championRankText = document.getElementById('championRankText');
  const championDeptName = document.getElementById('championDeptName');
  const championPoints = document.getElementById('championPoints');
  const championQuote = document.getElementById('championQuote');

  // Goal & Stats
  const goalPercent = document.getElementById('goalPercent');
  const goalRatio = document.getElementById('goalRatio');
  const goalProgressFill = document.getElementById('goalProgressFill');
  const goalProgressBar = document.getElementById('goalProgressBar');
  const goalRemaining = document.getElementById('goalRemaining');
  const statTotalDevices = document.getElementById('statTotalDevices');
  const statTotalPoints = document.getElementById('statTotalPoints');
  const statTotalDepts = document.getElementById('statTotalDepts');

  // Leaderboard Elements
  const leaderboardTitle = document.getElementById('leaderboardTitle');
  const tabDepts = document.getElementById('tabDepts');
  const tabDivisions = document.getElementById('tabDivisions');
  const deptSearchInput = document.getElementById('deptSearchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const leaderboardTable = document.getElementById('leaderboardTable');
  const leaderboardTbody = document.getElementById('leaderboardTbody');
  const tableEmptyState = document.getElementById('tableEmptyState');
  const resetSearchBtn = document.getElementById('resetSearchBtn');

  // Environmental Impact
  const impactCo2 = document.getElementById('impactCo2');
  const impactEnergy = document.getElementById('impactEnergy');
  const impactToxics = document.getElementById('impactToxics');
  const impactPrecious = document.getElementById('impactPrecious');
  const simDeviceSelect = document.getElementById('simDeviceSelect');
  const simQuantityInput = document.getElementById('simQuantityInput');
  const simCo2Val = document.getElementById('simCo2Val');
  const simEnergyVal = document.getElementById('simEnergyVal');
  const simPointsVal = document.getElementById('simPointsVal');

  // PRN Verification Portal Elements
  const portalSearchInput = document.getElementById('portalSearchInput');
  const portalSearchBtn = document.getElementById('portalSearchBtn');
  const portalResultsArea = document.getElementById('portalResultsArea');
  const quickPrnPills = document.querySelectorAll('.quick-prn-pill');
  const pledgeCount = document.getElementById('pledgeCount');
  const openPledgeModalBtn = document.getElementById('openPledgeModalBtn');

  // Pledge Modal Elements
  const pledgeModal = document.getElementById('pledgeModal');
  const closePledgeModalBtn = document.getElementById('closePledgeModalBtn');
  const pledgeForm = document.getElementById('pledgeForm');
  const pledgeStudentName = document.getElementById('pledgeStudentName');
  const pledgeStudentPrn = document.getElementById('pledgeStudentPrn');
  const pledgeDeptSelect = document.getElementById('pledgeDeptSelect');
  const pledgeDivisionSelect = document.getElementById('pledgeDivisionSelect');
  const pledgeNameError = document.getElementById('pledgeNameError');
  const pledgePrnError = document.getElementById('pledgePrnError');
  const pledgeDeptError = document.getElementById('pledgeDeptError');
  const pledgeDivError = document.getElementById('pledgeDivError');

  // Badges status
  const starterUnlockedList = document.getElementById('starterUnlockedList');
  const heroUnlockedList = document.getElementById('heroUnlockedList');
  const championUnlockedList = document.getElementById('championUnlockedList');

  // Daily Eco-Quiz
  const quizDeptSelect = document.getElementById('quizDeptSelect');
  const quizQuestionText = document.getElementById('quizQuestionText');
  const quizOptionsList = document.getElementById('quizOptionsList');
  const quizResultMsg = document.getElementById('quizResultMsg');

  // Activity Feed
  const activityList = document.getElementById('activityList');
  const activityEmptyState = document.getElementById('activityEmptyState');
  const activityCountLabel = document.getElementById('activityCountLabel');
  const activityDeptFilter = document.getElementById('activityDeptFilter');
  const activityDivisionFilter = document.getElementById('activityDivisionFilter');
  const exportCsvBtn = document.getElementById('exportCsvBtn');

  // Department Profile Modal
  const deptProfileModal = document.getElementById('deptProfileModal');
  const closeDeptModalBtn = document.getElementById('closeDeptModalBtn');
  const closeDeptProfileBtn = document.getElementById('closeDeptProfileBtn');
  const deptModalRank = document.getElementById('deptModalRank');
  const deptModalTitle = document.getElementById('deptModalTitle');
  const deptModalSubtitle = document.getElementById('deptModalSubtitle');
  const deptModalItems = document.getElementById('deptModalItems');
  const deptModalPoints = document.getElementById('deptModalPoints');
  const deptModalShare = document.getElementById('deptModalShare');
  const deptModalNextTierTitle = document.getElementById('deptModalNextTierTitle');
  const deptModalPtsNeeded = document.getElementById('deptModalPtsNeeded');
  const deptModalProgressFill = document.getElementById('deptModalProgressFill');
  const deptModalBreakdownList = document.getElementById('deptModalBreakdownList');
  const deptModalBadgesGrid = document.getElementById('deptModalBadgesGrid');

  // Certificate Modal Elements
  const certificateModal = document.getElementById('certificateModal');
  const closeCertModalBtn = document.getElementById('closeCertModalBtn');
  const dismissCertBtn = document.getElementById('dismissCertBtn');
  const printCertBtn = document.getElementById('printCertBtn');
  const certStudentName = document.getElementById('certStudentName');
  const certStudentPrn = document.getElementById('certStudentPrn');
  const certStudentDivision = document.getElementById('certStudentDivision');
  const certDeptName = document.getElementById('certDeptName');
  const certDeviceDetail = document.getElementById('certDeviceDetail');
  const certVerificationId = document.getElementById('certVerificationId');
  const certDate = document.getElementById('certDate');

  // Reset Modal
  const openResetModalBtn = document.getElementById('openResetModalBtn');
  const resetModal = document.getElementById('resetModal');
  const cancelResetBtn = document.getElementById('cancelResetBtn');
  const confirmResetBtn = document.getElementById('confirmResetBtn');

  // Toast Container
  const toastPortal = document.getElementById('toastPortal');

  // Confetti Canvas
  const confettiCanvas = document.getElementById('confettiCanvas');

  // --- Audio Synthesizer (Zero External Dependencies) ---
  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playTone(freq, duration, type = 'sine', startTimeOffset = 0, gainLevel = 0.15) {
    if (!soundEnabled || !audioCtx) return;
    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTimeOffset);
      
      gain.gain.setValueAtTime(gainLevel, audioCtx.currentTime + startTimeOffset);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + startTimeOffset + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(audioCtx.currentTime + startTimeOffset);
      osc.stop(audioCtx.currentTime + startTimeOffset + duration);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  function playChime(kind = 'success') {
    if (!soundEnabled) return;
    initAudio();
    if (!audioCtx) return;

    if (kind === 'success') {
      // Harmonic chord C5 -> E5 -> G5
      playTone(523.25, 0.25, 'triangle', 0.0, 0.15);
      playTone(659.25, 0.3, 'triangle', 0.08, 0.15);
      playTone(783.99, 0.45, 'triangle', 0.16, 0.18);
    } else if (kind === 'celebrate') {
      // Fanfare C5 -> G5 -> C6
      playTone(523.25, 0.15, 'triangle', 0.0, 0.15);
      playTone(659.25, 0.15, 'triangle', 0.12, 0.15);
      playTone(783.99, 0.2, 'triangle', 0.24, 0.18);
      playTone(1046.50, 0.6, 'triangle', 0.38, 0.22);
    }
  }

  function setupSoundToggle() {
    const storedSound = localStorage.getItem(SOUND_STORAGE_KEY);
    if (storedSound !== null) {
      soundEnabled = storedSound === 'true';
    }
    updateSoundUI();

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        localStorage.setItem(SOUND_STORAGE_KEY, soundEnabled);
        updateSoundUI();
        if (soundEnabled) {
          playChime('success');
        }
      });
    }
  }

  function updateSoundUI() {
    if (!audioOnIcon || !audioOffIcon) return;
    if (soundEnabled) {
      audioOnIcon.style.display = 'block';
      audioOffIcon.style.display = 'none';
      audioToggleBtn.title = 'Sound Effects: Enabled';
    } else {
      audioOnIcon.style.display = 'none';
      audioOffIcon.style.display = 'block';
      audioToggleBtn.title = 'Sound Effects: Muted';
    }
  }

  // --- Confetti Animation Engine (Pure Vanilla Canvas) ---
  let confettiParticles = [];
  let confettiAnimFrame = null;

  function launchConfetti(count = 70) {
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const colors = ['#087F45', '#10B981', '#FFE97A', '#FCD34D', '#34D399', '#0369A1', '#38BDF8'];
    confettiParticles = [];

    for (let i = 0; i < count; i++) {
      confettiParticles.push({
        x: window.innerWidth * (0.3 + Math.random() * 0.4),
        y: window.innerHeight * 0.4 + (Math.random() * 100 - 50),
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 6,
        w: Math.random() * 9 + 6,
        h: Math.random() * 5 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        gravity: 0.35,
        opacity: 1
      });
    }

    if (confettiAnimFrame) cancelAnimationFrame(confettiAnimFrame);
    animateConfetti(ctx);
  }

  function animateConfetti(ctx) {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    let activeParticles = 0;

    for (let p of confettiParticles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotSpeed;
      p.opacity -= 0.007;

      if (p.opacity > 0 && p.y < confettiCanvas.height) {
        activeParticles++;
        ctx.save();
        ctx.globalAlpha = Math.max(p.opacity, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }
    }

    if (activeParticles > 0) {
      confettiAnimFrame = requestAnimationFrame(() => animateConfetti(ctx));
    } else {
      ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
  }

  // --- Initialization & LocalStorage Persistence ---
  function loadState() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed.departments) && parsed.departments.length > 0) {
          appState.departments = parsed.departments;
          appState.activities = Array.isArray(parsed.activities) && parsed.activities.length > 0 
            ? parsed.activities 
            : JSON.parse(JSON.stringify(INITIAL_ACTIVITIES));
          loadPledgeCount();
          return;
        }
      }
    } catch (err) {
      console.warn('Failed to parse stored state. Initializing defaults.', err);
    }

    resetToInitialDefaults(false);
    loadPledgeCount();
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }
  }

  function resetToInitialDefaults(shouldSave = true) {
    appState = {
      departments: JSON.parse(JSON.stringify(INITIAL_DEPARTMENTS)),
      activities: JSON.parse(JSON.stringify(INITIAL_ACTIVITIES))
    };
    if (shouldSave) {
      saveState();
      localStorage.removeItem(QUIZ_STORAGE_KEY);
      localStorage.removeItem(PLEDGE_STORAGE_KEY);
      loadPledgeCount();
    }
  }

  function loadPledgeCount() {
    if (!pledgeCount) return;
    const stored = localStorage.getItem(PLEDGE_STORAGE_KEY);
    const count = stored ? parseInt(stored, 10) : 284;
    pledgeCount.textContent = count.toLocaleString();
  }

  // --- Department Data Helpers ---
  function getSortedDepartments() {
    return [...appState.departments].sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.items !== a.items) return b.items - a.items;
      return a.name.localeCompare(b.name);
    });
  }

  function getTotalDevices() {
    return appState.departments.reduce((sum, d) => sum + d.items, 0);
  }

  function getTotalPoints() {
    return appState.departments.reduce((sum, d) => sum + d.points, 0);
  }

  function getEarnedBadgesForDepartment(points) {
    return BADGE_TIERS.filter(b => points >= b.pointsReq);
  }

  // --- Render Master Function ---
  function renderAll() {
    renderHeroAndGoal();
    renderLeaderboard();
    renderEnvironmentalImpact();
    renderBadgesSection();
    renderActivityFeed();
    renderQuiz();
    renderPortalInitialState();
  }

  // --- Render Hero & Campus Goal ---
  function renderHeroAndGoal() {
    const sorted = getSortedDepartments();
    const champion = sorted[0];

    const now = new Date();
    const monthYear = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    if (championMonth) {
      championMonth.textContent = monthYear;
    }

    if (champion) {
      const isTie = sorted.length > 1 && sorted[1].points === champion.points;
      championDeptName.textContent = champion.name;
      championPoints.textContent = champion.points.toLocaleString();
      championRankText.textContent = isTie 
        ? `TIED #1 · ${champion.code}` 
        : `RANK #1 · ${champion.code}`;
      championQuote.textContent = `${champion.name} is leading with ${champion.items} recycled electronics.`;
    }

    const totalDevices = getTotalDevices();
    const target = CAMPUS_GOAL.targetDevices;
    const percentage = Math.min(Math.round((totalDevices / target) * 100), 100);
    const remaining = Math.max(target - totalDevices, 0);

    goalPercent.textContent = `${percentage}%`;
    goalRatio.textContent = `of ${target} devices`;
    goalProgressFill.style.width = `${percentage}%`;
    goalProgressBar.setAttribute('aria-valuenow', percentage);
    goalRemaining.textContent = remaining > 0 
      ? `${remaining} more devices to reach the goal.` 
      : 'Campus sustainability goal achieved! Outstanding work!';

    navDeviceCount.textContent = `${totalDevices} DEVICES`;
    statTotalDevices.textContent = totalDevices.toLocaleString();
    statTotalPoints.textContent = getTotalPoints().toLocaleString();
    statTotalDepts.textContent = appState.departments.length;
  }

  // --- Environmental Impact Calculations ---
  function renderEnvironmentalImpact() {
    const totalDevices = getTotalDevices();
    let co2Total = 0;
    let energyTotal = 0;
    let toxicTotal = 0;
    let preciousTotal = 0;

    const defaultDistribution = {
      'Laptop / Desktop': 0.35,
      'Monitor / TV': 0.15,
      'Phone / Tablet': 0.25,
      'Peripherals': 0.10,
      'Batteries': 0.08,
      'Cables / Chargers': 0.07
    };

    Object.keys(defaultDistribution).forEach(dev => {
      const count = totalDevices * defaultDistribution[dev];
      const factor = DEVICE_IMPACT[dev];
      co2Total += count * factor.co2Kg;
      energyTotal += count * factor.energyKwh;
      toxicTotal += (count * factor.toxicG) / 1000;
      preciousTotal += count * factor.preciousG;
    });

    if (impactCo2) impactCo2.textContent = `${Math.round(co2Total).toLocaleString()} kg`;
    if (impactEnergy) impactEnergy.textContent = `${Math.round(energyTotal).toLocaleString()} kWh`;
    if (impactToxics) impactToxics.textContent = `${toxicTotal.toFixed(1)} kg`;
    if (impactPrecious) impactPrecious.textContent = `${Math.round(preciousTotal).toLocaleString()} g`;

    updateSimulatorPreview();
  }

  function updateSimulatorPreview() {
    if (!simDeviceSelect || !simQuantityInput) return;
    const dev = simDeviceSelect.value;
    const qty = Math.max(parseInt(simQuantityInput.value, 10) || 1, 1);
    const impact = DEVICE_IMPACT[dev] || { co2Kg: 5, energyKwh: 20 };
    const pts = (DEVICE_POINTS[dev] || 5) * qty;

    const co2Saved = (impact.co2Kg * qty).toFixed(1);
    const energySaved = Math.round(impact.energyKwh * qty);

    if (simCo2Val) simCo2Val.textContent = `${co2Saved} kg`;
    if (simEnergyVal) simEnergyVal.textContent = `${energySaved} kWh`;
    if (simPointsVal) simPointsVal.textContent = `+${pts} pts`;
  }

  // --- Inter-Division Standings Calculation ---
  function getDivisionStandings() {
    const divisionsMap = {};

    // Base division distribution across departments
    appState.departments.forEach(dept => {
      ['Div A', 'Div B', 'Div C'].forEach((divName, i) => {
        const key = `${dept.code} - ${divName}`;
        const baseShare = [0.45, 0.35, 0.20][i];
        divisionsMap[key] = {
          key: key,
          deptName: dept.name,
          deptCode: dept.code,
          division: divName,
          items: Math.round(dept.items * baseShare),
          points: Math.round(dept.points * baseShare)
        };
      });
    });

    // Add in dynamic activities
    appState.activities.forEach(act => {
      if (act.division && act.deptId) {
        const dept = appState.departments.find(d => d.id === act.deptId);
        if (dept) {
          const key = `${dept.code} - ${act.division}`;
          if (!divisionsMap[key]) {
            divisionsMap[key] = {
              key: key,
              deptName: dept.name,
              deptCode: dept.code,
              division: act.division,
              items: 0,
              points: 0
            };
          }
          // Note: activities already contribute to department total, this adds live fine-grained division delta
        }
      }
    });

    return Object.values(divisionsMap).sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.items !== a.items) return b.items - a.items;
      return a.key.localeCompare(b.key);
    });
  }

  // --- Render Leaderboard (Departments OR Inter-Division Cup) ---
  function renderLeaderboard() {
    if (leaderboardViewMode === 'divisions') {
      renderDivisionLeaderboard();
    } else {
      renderDepartmentLeaderboard();
    }
  }

  function renderDepartmentLeaderboard() {
    leaderboardTitle.textContent = 'Department Leaderboard';
    const sorted = getSortedDepartments();
    const maxPoints = sorted[0]?.points || 1;

    const filtered = sorted.filter(dept => 
      dept.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dept.code.toLowerCase().includes(searchQuery.toLowerCase())
    );

    leaderboardTbody.innerHTML = '';

    if (filtered.length === 0) {
      leaderboardTable.style.display = 'none';
      tableEmptyState.style.display = 'block';
      return;
    }

    leaderboardTable.style.display = 'table';
    tableEmptyState.style.display = 'none';

    filtered.forEach((dept) => {
      const overallRank = sorted.findIndex(d => d.id === dept.id) + 1;
      
      let rankPillClass = 'rank-default';
      let rankContent = `${overallRank}`;
      if (overallRank === 1) {
        rankPillClass = 'rank-gold';
        rankContent = '#1';
      } else if (overallRank === 2) {
        rankPillClass = 'rank-silver';
        rankContent = '#2';
      } else if (overallRank === 3) {
        rankPillClass = 'rank-bronze';
        rankContent = '#3';
      }

      const scoreRatio = Math.min((dept.points / maxPoints) * 100, 100);
      const earnedBadges = getEarnedBadgesForDepartment(dept.points);
      
      const badgesHtml = BADGE_TIERS.map(b => {
        const isEarned = earnedBadges.some(eb => eb.id === b.id);
        const badgeClass = isEarned ? `mini-badge-${b.themeClass}` : 'mini-badge-locked';
        const tooltip = isEarned ? `${b.name} (${b.pointsReq}+ pts)` : `Locked: Requires ${b.pointsReq}+ pts`;
        return `
          <div class="mini-badge-icon ${badgeClass}" title="${tooltip}" aria-label="${tooltip}">
            ${b.iconSvg}
          </div>
        `;
      }).join('');

      const tr = document.createElement('tr');
      tr.className = 'dept-row';
      tr.setAttribute('tabindex', '0');
      tr.setAttribute('role', 'button');
      tr.setAttribute('title', `Click to view sustainability profile for ${dept.name}`);
      tr.innerHTML = `
        <td>
          <span class="rank-pill ${rankPillClass}">${rankContent}</span>
        </td>
        <td>
          <div class="dept-name-cell">
            <span class="dept-title-text">${dept.name}</span>
            <div class="dept-mini-progress" title="${dept.points} points">
              <div class="dept-mini-progress-fill" style="width: ${scoreRatio}%;"></div>
            </div>
          </div>
        </td>
        <td class="dept-items-val">${dept.items}</td>
        <td class="dept-points-val">${dept.points.toLocaleString()}</td>
        <td>
          <div class="dept-badges-cell">${badgesHtml}</div>
        </td>
      `;

      tr.addEventListener('click', () => openDeptProfile(dept));
      tr.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDeptProfile(dept);
        }
      });

      leaderboardTbody.appendChild(tr);
    });
  }

  function renderDivisionLeaderboard() {
    leaderboardTitle.textContent = 'Inter-Division Cup 🏆 Standings';
    const divisions = getDivisionStandings();
    const maxPoints = divisions[0]?.points || 1;

    const filtered = divisions.filter(div => 
      div.key.toLowerCase().includes(searchQuery.toLowerCase()) ||
      div.deptName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      div.division.toLowerCase().includes(searchQuery.toLowerCase())
    );

    leaderboardTbody.innerHTML = '';

    if (filtered.length === 0) {
      leaderboardTable.style.display = 'none';
      tableEmptyState.style.display = 'block';
      return;
    }

    leaderboardTable.style.display = 'table';
    tableEmptyState.style.display = 'none';

    filtered.forEach((div, index) => {
      const overallRank = index + 1;
      let rankPillClass = 'rank-default';
      let rankContent = `${overallRank}`;
      if (overallRank === 1) {
        rankPillClass = 'rank-gold';
        rankContent = '🥇 #1';
      } else if (overallRank === 2) {
        rankPillClass = 'rank-silver';
        rankContent = '🥈 #2';
      } else if (overallRank === 3) {
        rankPillClass = 'rank-bronze';
        rankContent = '🥉 #3';
      }

      const scoreRatio = Math.min((div.points / maxPoints) * 100, 100);

      const tr = document.createElement('tr');
      tr.className = 'dept-row';
      tr.innerHTML = `
        <td>
          <span class="rank-pill ${rankPillClass}" style="width: auto; padding: 2px 8px; border-radius: 12px;">${rankContent}</span>
        </td>
        <td>
          <div class="dept-name-cell">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="dept-title-text">${div.deptName}</span>
              <span class="activity-div-pill" style="font-size: 0.8rem; padding: 2px 8px;">${div.division}</span>
            </div>
            <div class="dept-mini-progress" title="${div.points} points">
              <div class="dept-mini-progress-fill" style="width: ${scoreRatio}%;"></div>
            </div>
          </div>
        </td>
        <td class="dept-items-val">${div.items}</td>
        <td class="dept-points-val">${div.points.toLocaleString()}</td>
        <td style="text-align: center;">
          <span class="student-prn-pill" style="font-size: 0.72rem; padding: 3px 8px;">${div.deptCode}-${div.division.replace(' ', '')}</span>
        </td>
      `;

      leaderboardTbody.appendChild(tr);
    });
  }

  // --- Department Profile Modal Logic ---
  function openDeptProfile(dept) {
    const sorted = getSortedDepartments();
    const rankIndex = sorted.findIndex(d => d.id === dept.id) + 1;
    const totalPts = getTotalPoints();
    const sharePercent = totalPts > 0 ? Math.round((dept.points / totalPts) * 100) : 0;

    deptModalRank.textContent = `RANK #${rankIndex}`;
    deptModalTitle.textContent = dept.name;
    if (deptModalSubtitle) {
      deptModalSubtitle.textContent = rankIndex === 1 
        ? 'Leading the campus sustainability leaderboard 🏆' 
        : `Ranked #${rankIndex} among campus departments`;
    }

    deptModalItems.textContent = dept.items;
    deptModalPoints.textContent = dept.points.toLocaleString();
    deptModalShare.textContent = `${sharePercent}%`;

    // Next Milestone logic
    const nextTier = BADGE_TIERS.find(b => b.pointsReq > dept.points);
    if (nextTier) {
      const ptsRemaining = nextTier.pointsReq - dept.points;
      deptModalNextTierTitle.textContent = `Next Tier: ${nextTier.name} (${nextTier.pointsReq} pts)`;
      deptModalPtsNeeded.textContent = `${ptsRemaining} pts to unlock`;
      const prevThreshold = BADGE_TIERS.filter(b => b.pointsReq < nextTier.pointsReq).pop()?.pointsReq || 0;
      const progressToNext = Math.min(Math.round(((dept.points - prevThreshold) / (nextTier.pointsReq - prevThreshold)) * 100), 100);
      deptModalProgressFill.style.width = `${Math.max(progressToNext, 5)}%`;
    } else {
      deptModalNextTierTitle.textContent = 'All Milestone Badges Achieved! 🌟';
      deptModalPtsNeeded.textContent = 'Gold Standard';
      deptModalProgressFill.style.width = '100%';
    }

    // Breakdown bars
    const breakdownEstimates = [
      { name: 'Laptops / PCs', count: Math.round(dept.items * 0.35) },
      { name: 'Monitors / TVs', count: Math.round(dept.items * 0.15) },
      { name: 'Phones / Tablets', count: Math.round(dept.items * 0.25) },
      { name: 'Peripherals', count: Math.round(dept.items * 0.12) },
      { name: 'Batteries / Chargers', count: Math.max(dept.items - Math.round(dept.items * 0.87), 1) }
    ];

    deptModalBreakdownList.innerHTML = breakdownEstimates.map(item => {
      const pct = dept.items > 0 ? Math.min(Math.round((item.count / dept.items) * 100), 100) : 0;
      return `
        <div class="breakdown-item">
          <span class="breakdown-name">${item.name}</span>
          <div class="breakdown-track">
            <div class="breakdown-fill" style="width: ${pct}%;"></div>
          </div>
          <span class="breakdown-count">${item.count}</span>
        </div>
      `;
    }).join('');

    // Badges grid
    const earned = getEarnedBadgesForDepartment(dept.points);
    deptModalBadgesGrid.innerHTML = BADGE_TIERS.map(b => {
      const isEarned = earned.some(e => e.id === b.id);
      return `
        <div class="mini-badge-icon ${isEarned ? `mini-badge-${b.themeClass}` : 'mini-badge-locked'}" 
             style="width: 36px; height: 36px; border-radius: 9px;"
             title="${b.name}: ${isEarned ? 'Unlocked' : `Requires ${b.pointsReq}+ pts`}">
          ${b.iconSvg}
        </div>
      `;
    }).join('');

    deptProfileModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeDeptProfile() {
    deptProfileModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // --- Render Badges Section ---
  function renderBadgesSection() {
    BADGE_TIERS.forEach(tier => {
      const unlockedDepts = appState.departments.filter(d => d.points >= tier.pointsReq);
      let targetEl = null;

      if (tier.id === 'starter') targetEl = starterUnlockedList;
      else if (tier.id === 'hero') targetEl = heroUnlockedList;
      else if (tier.id === 'champion') targetEl = championUnlockedList;

      if (!targetEl) return;

      if (unlockedDepts.length === 0) {
        targetEl.innerHTML = `<span class="badge-unclaimed-tag">Unclaimed — be the first</span>`;
      } else {
        const tags = unlockedDepts
          .map(d => `<span class="badge-unlocked-tag">${d.name} (${d.points} pts)</span>`)
          .join('');
        targetEl.innerHTML = tags;
      }
    });
  }

  // --- Student PRN Verification Portal Logic ---
  function renderPortalInitialState() {
    if (!portalResultsArea) return;
    // Show Priya Sharma's verified record by default to demonstrate the portal functionality immediately
    lookupStudentPrn('2024COMP1042');
  }

  function lookupStudentPrn(query) {
    if (!portalResultsArea) return;
    const cleanQuery = query.trim().toUpperCase();

    if (!cleanQuery) {
      portalResultsArea.innerHTML = `
        <div class="portal-empty-result">
          <div class="portal-empty-icon">🔍</div>
          <div class="portal-empty-title">Search College PRN or Student Name</div>
          <p class="portal-empty-desc">Enter your registration number or click any sample PRN above to verify recycling credentials.</p>
        </div>
      `;
      return;
    }

    const matches = appState.activities.filter(act => {
      const prn = (act.studentPrn || '').toUpperCase();
      const name = (act.studentName || '').toUpperCase();
      return prn.includes(cleanQuery) || name.includes(cleanQuery);
    });

    if (matches.length === 0) {
      portalResultsArea.innerHTML = `
        <div class="portal-empty-result">
          <div class="portal-empty-icon">📂</div>
          <div class="portal-empty-title">No verified records found for "${escapeHtml(cleanQuery)}"</div>
          <p class="portal-empty-desc">No e-waste drop-offs have been logged with this PRN yet. Be the first to earn points for your division!</p>
          <button type="button" class="btn btn-primary" onclick="window.openDropOffWithPrn('${escapeHtml(cleanQuery)}')">
            <span>+ Log First Drop-Off for ${escapeHtml(cleanQuery)}</span>
          </button>
        </div>
      `;
      return;
    }

    // Found match - aggregate data for student
    const primaryStudent = matches[0];
    const totalItems = matches.reduce((sum, m) => sum + (m.quantity || 1), 0);
    const totalPoints = matches.reduce((sum, m) => sum + (m.points || 0), 0);
    const divisionName = primaryStudent.division || 'Div A';
    const deptName = primaryStudent.deptName || 'Engineering';

    const submissionsRows = matches.map(m => {
      const dateStr = new Date(m.timestamp).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      return `
        <tr>
          <td><strong>${escapeHtml(m.deviceType)}</strong></td>
          <td>${m.quantity}</td>
          <td><span class="activity-div-pill">${escapeHtml(m.division || divisionName)}</span></td>
          <td><strong style="color: #087F45;">+${m.points} pts</strong></td>
          <td style="color: #6B7280; font-size: 0.8rem;">${dateStr}</td>
          <td>
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.viewEcoCertificate('${m.id}')" title="View official certificate">
              📜 View Certificate
            </button>
          </td>
        </tr>
      `;
    }).join('');

    portalResultsArea.innerHTML = `
      <div class="portal-student-card">
        <div class="portal-student-header">
          <div class="student-title-block">
            <h3>${escapeHtml(primaryStudent.studentName)}</h3>
            <div class="student-pill-group">
              <span class="student-prn-pill">PRN: ${escapeHtml(primaryStudent.studentPrn)}</span>
              <span class="student-division-pill">${escapeHtml(divisionName)}</span>
              <span class="student-dept-pill">${escapeHtml(deptName)}</span>
            </div>
          </div>
          <div>
            <button type="button" class="btn btn-primary btn-sm" onclick="window.viewEcoCertificate('${primaryStudent.id}')">
              📜 Latest Certificate
            </button>
          </div>
        </div>

        <div class="portal-stats-row">
          <div class="portal-stat-item">
            <span class="portal-stat-val">${totalItems}</span>
            <span class="portal-stat-lbl">Devices Recycled</span>
          </div>
          <div class="portal-stat-item">
            <span class="portal-stat-val">+${totalPoints}</span>
            <span class="portal-stat-lbl">Points Contributed</span>
          </div>
          <div class="portal-stat-item">
            <span class="portal-stat-val">${matches.length}</span>
            <span class="portal-stat-lbl">Verified Certificates</span>
          </div>
        </div>

        <div style="overflow-x: auto;">
          <table class="portal-submissions-table">
            <thead>
              <tr>
                <th>Device Category</th>
                <th>Qty</th>
                <th>Division</th>
                <th>Points</th>
                <th>Date Logged</th>
                <th>Certificate</th>
              </tr>
            </thead>
            <tbody>
              ${submissionsRows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  window.openDropOffWithPrn = function(prn) {
    openModal();
    if (studentPrnInput) {
      studentPrnInput.value = prn;
      validateForm();
    }
  };

  // --- Daily Eco-Quiz Challenge Logic ---
  function renderQuiz() {
    const isCompleted = localStorage.getItem(QUIZ_STORAGE_KEY) === 'true';

    quizQuestionText.textContent = DAILY_QUIZ.question;
    quizOptionsList.innerHTML = '';

    DAILY_QUIZ.options.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-opt-btn';
      btn.textContent = `${String.fromCharCode(65 + idx)}. ${opt.text}`;
      
      if (isCompleted) {
        btn.disabled = true;
        if (opt.isCorrect) btn.classList.add('correct');
      } else {
        btn.addEventListener('click', () => handleQuizAnswer(opt, btn));
      }

      quizOptionsList.appendChild(btn);
    });

    if (isCompleted) {
      quizResultMsg.style.display = 'block';
      quizResultMsg.className = 'quiz-result-message quiz-result-success';
      quizResultMsg.innerHTML = `🌟 <strong>Bonus points already claimed today!</strong> ${DAILY_QUIZ.explanation}`;
    } else {
      quizResultMsg.style.display = 'none';
    }
  }

  function handleQuizAnswer(selectedOpt, btnClicked) {
    const isAlreadyDone = localStorage.getItem(QUIZ_STORAGE_KEY) === 'true';
    if (isAlreadyDone) return;

    const allBtns = quizOptionsList.querySelectorAll('.quiz-opt-btn');
    allBtns.forEach(b => b.disabled = true);

    if (selectedOpt.isCorrect) {
      btnClicked.classList.add('correct');
      localStorage.setItem(QUIZ_STORAGE_KEY, 'true');

      // Award +10 bonus points to selected department
      const deptId = quizDeptSelect.value;
      const dept = appState.departments.find(d => d.id === deptId);
      if (dept) {
        dept.points += 10;
        saveState();
        renderAll();
      }

      launchConfetti(80);
      playChime('celebrate');
      showToast(`+10 Bonus Points awarded to ${dept?.name || 'Department'}!`, 'Correct answer on the Daily Eco-Quiz!');

      quizResultMsg.style.display = 'block';
      quizResultMsg.className = 'quiz-result-message quiz-result-success';
      quizResultMsg.innerHTML = `🎉 <strong>Brilliant! +10 Points awarded!</strong> ${DAILY_QUIZ.explanation}`;
    } else {
      btnClicked.classList.add('incorrect');
      allBtns.forEach((b, i) => {
        if (DAILY_QUIZ.options[i].isCorrect) b.classList.add('correct');
      });

      quizResultMsg.style.display = 'block';
      quizResultMsg.className = 'quiz-result-message quiz-result-error';
      quizResultMsg.innerHTML = `Not quite right. ${DAILY_QUIZ.explanation}`;
    }
  }

  // --- Render Activity Feed with Department & Division Filter ---
  function renderActivityFeed() {
    let list = appState.activities;

    if (activityFilterDept !== 'all') {
      list = list.filter(act => act.deptId === activityFilterDept);
    }

    if (activityFilterDivision !== 'all') {
      list = list.filter(act => act.division === activityFilterDivision);
    }

    activityCountLabel.textContent = `${list.length} recorded`;

    if (list.length === 0) {
      activityList.style.display = 'none';
      activityEmptyState.style.display = 'block';
      return;
    }

    activityList.style.display = 'flex';
    activityEmptyState.style.display = 'none';

    const recent = [...list].slice(0, 25);
    activityList.innerHTML = recent.map(act => {
      const relTime = formatRelativeTime(act.timestamp);
      const prnTag = act.studentPrn ? `<span class="activity-prn-pill">PRN: ${escapeHtml(act.studentPrn)}</span>` : '';
      const divTag = act.division ? `<span class="activity-div-pill">${escapeHtml(act.division)}</span>` : '';
      return `
        <article class="activity-item">
          <div class="activity-main-info">
            <div class="activity-icon-bubble" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="3.29 7 12 12 20.71 7"></polyline>
                <line x1="12" y1="22" x2="12" y2="12"></line>
              </svg>
            </div>
            <div class="activity-details">
              <span class="activity-headline">
                <strong>${escapeHtml(act.studentName)}</strong>
                ${prnTag}
                ${divTag}
                recycled ${act.quantity} × ${escapeHtml(act.deviceType)}
              </span>
              <span class="activity-meta">${escapeHtml(act.deptName)} · ${relTime}</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <button type="button" class="btn btn-secondary btn-sm" onclick="window.viewEcoCertificate('${act.id}')" title="View official certificate of recycling">
              📜 Certificate
            </button>
            <div class="activity-points-pill" title="Points added to ${escapeHtml(act.deptName)}">+${act.points}</div>
          </div>
        </article>
      `;
    }).join('');
  }

  // --- Export Activity Records to CSV with PRN and Division ---
  function exportActivityToCSV() {
    const list = appState.activities;
    if (list.length === 0) {
      showToast('No records to export', 'Log a drop-off first before exporting collection logs.');
      return;
    }

    const headers = ['Record ID', 'Date & Time', 'Student Name', 'PRN', 'Division', 'Department', 'Device Type', 'Quantity', 'Points Earned'];
    const rows = list.map(item => {
      const d = new Date(item.timestamp).toISOString();
      return [
        item.id,
        `"${d}"`,
        `"${(item.studentName || '').replace(/"/g, '""')}"`,
        `"${(item.studentPrn || '').replace(/"/g, '""')}"`,
        `"${(item.division || 'Div A').replace(/"/g, '""')}"`,
        `"${(item.deptName || '').replace(/"/g, '""')}"`,
        `"${(item.deviceType || '').replace(/"/g, '""')}"`,
        item.quantity,
        item.points
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `green_campus_dropoffs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('CSV Exported Successfully', 'Downloaded collection data file with PRN and Division details.');
  }

  // --- Digital Sustainability Certificate Modal ---
  window.viewEcoCertificate = function(activityId) {
    const record = appState.activities.find(a => a.id === activityId);
    if (!record) return;

    certStudentName.textContent = record.studentName;
    if (certStudentPrn) certStudentPrn.textContent = `PRN: ${record.studentPrn || '2024COMP1042'}`;
    if (certStudentDivision) certStudentDivision.textContent = record.division || 'Division A';
    certDeptName.textContent = record.deptName;
    certDeviceDetail.textContent = `${record.quantity} × ${record.deviceType} · +${record.points} Department Points Awarded`;
    certVerificationId.textContent = `ID: GCC-2026-${record.id.slice(-6).toUpperCase()}`;
    certDate.textContent = new Date(record.timestamp).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    certificateModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  };

  function closeCertificate() {
    certificateModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  // --- Relative Time Formatter ---
  function formatRelativeTime(timestamp) {
    if (!timestamp) return 'just now';
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 15) return 'just now';
    if (seconds < 60) return 'less than a minute ago';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;

    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;

    const days = Math.floor(hours / 24);
    if (days === 1) return 'yesterday';
    return `${days} days ago`;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  // --- Modal & Form Logic ---
  function openModal() {
    logModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    openLogModalBtn.setAttribute('aria-expanded', 'true');
    validateForm();
    setTimeout(() => {
      studentNameInput.focus();
    }, 50);
  }

  function closeModal() {
    logModal.style.display = 'none';
    document.body.style.overflow = '';
    openLogModalBtn.setAttribute('aria-expanded', 'false');
    resetFormErrors();
  }

  function resetFormErrors() {
    nameError.style.display = 'none';
    if (prnError) prnError.style.display = 'none';
    deptError.style.display = 'none';
    if (divisionError) divisionError.style.display = 'none';
    deviceError.style.display = 'none';
    quantityError.style.display = 'none';
  }

  function validateForm() {
    const name = studentNameInput.value.trim();
    const prn = studentPrnInput ? studentPrnInput.value.trim() : '';
    const deptId = deptSelect.value;
    const division = divisionSelect ? divisionSelect.value : '';
    const deviceType = deviceSelect.value;
    const quantity = parseInt(quantityInput.value, 10);

    const ptsPerItem = DEVICE_POINTS[deviceType] || 0;
    const validQty = (!isNaN(quantity) && quantity >= 1) ? quantity : 0;
    const earnedPoints = ptsPerItem * validQty;

    modalPreviewPoints.textContent = `+${earnedPoints}`;

    const selectedDept = appState.departments.find(d => d.id === deptId);
    if (selectedDept && earnedPoints > 0) {
      previewDeptTargetName.textContent = selectedDept.name;
      previewSubnote.style.display = 'block';
    } else {
      previewSubnote.style.display = 'none';
    }

    const isValid = name.length >= 2 && prn.length >= 3 && deptId && division && deviceType && validQty >= 1;
    submitDropOffBtn.disabled = !isValid;
    return isValid;
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (isSubmitting) return;

    resetFormErrors();

    const name = studentNameInput.value.trim();
    const prn = studentPrnInput ? studentPrnInput.value.trim().toUpperCase() : '';
    const deptId = deptSelect.value;
    const division = divisionSelect ? divisionSelect.value : 'Div A';
    const deviceType = deviceSelect.value;
    const quantity = parseInt(quantityInput.value, 10);

    let hasError = false;

    if (name.length < 2) {
      nameError.style.display = 'block';
      hasError = true;
    }
    if (prn.length < 3) {
      if (prnError) prnError.style.display = 'block';
      hasError = true;
    }
    if (!deptId) {
      deptError.style.display = 'block';
      hasError = true;
    }
    if (!division) {
      if (divisionError) divisionError.style.display = 'block';
      hasError = true;
    }
    if (!deviceType || !DEVICE_POINTS[deviceType]) {
      deviceError.style.display = 'block';
      hasError = true;
    }
    if (isNaN(quantity) || quantity < 1) {
      quantityError.style.display = 'block';
      hasError = true;
    }

    if (hasError) return;

    isSubmitting = true;
    submitDropOffBtn.disabled = true;

    const dept = appState.departments.find(d => d.id === deptId);
    const pointsPerItem = DEVICE_POINTS[deviceType];
    const totalPointsEarned = pointsPerItem * quantity;

    // 1. Update department stats
    dept.items += quantity;
    dept.points += totalPointsEarned;

    // 2. Create activity record with PRN and Division
    const newRecordId = 'act_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    const newRecord = {
      id: newRecordId,
      studentName: name,
      studentPrn: prn,
      division: division,
      deptId: dept.id,
      deptName: dept.name,
      deviceType: deviceType,
      quantity: quantity,
      points: totalPointsEarned,
      timestamp: Date.now()
    };

    appState.activities.unshift(newRecord);

    // 3. Save to localStorage
    saveState();

    // 4. Update UI
    renderAll();

    // 5. If PRN portal matches this PRN, auto-refresh portal view
    if (portalSearchInput && portalSearchInput.value.trim().toUpperCase() === prn) {
      lookupStudentPrn(prn);
    }

    // 6. Confetti and Audio Chime!
    launchConfetti(80);
    playChime('success');

    // 7. Success Toast with Certificate View Button
    showToastWithCertLink(
      `+${totalPointsEarned} points for ${dept.name} (${division})!`,
      `${name} [PRN: ${prn}] recycled ${quantity} × ${deviceType}.`,
      newRecordId
    );

    // 8. Reset form & close modal
    dropOffForm.reset();
    quantityInput.value = '1';
    modalPreviewPoints.textContent = '+0';
    previewSubnote.style.display = 'none';

    setTimeout(() => {
      closeModal();
      isSubmitting = false;
    }, 200);
  }

  // --- Student Pledge Modal Logic ---
  function openPledgeModal() {
    if (!pledgeModal) return;
    pledgeModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (pledgeNameError) pledgeNameError.style.display = 'none';
    if (pledgePrnError) pledgePrnError.style.display = 'none';
    if (pledgeDeptError) pledgeDeptError.style.display = 'none';
    if (pledgeDivError) pledgeDivError.style.display = 'none';
  }

  function closePledgeModal() {
    if (!pledgeModal) return;
    pledgeModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function handlePledgeSubmit(e) {
    e.preventDefault();
    const name = pledgeStudentName ? pledgeStudentName.value.trim() : '';
    const prn = pledgeStudentPrn ? pledgeStudentPrn.value.trim().toUpperCase() : '';
    const deptId = pledgeDeptSelect ? pledgeDeptSelect.value : '';
    const division = pledgeDivisionSelect ? pledgeDivisionSelect.value : '';

    let hasError = false;
    if (name.length < 2) {
      if (pledgeNameError) pledgeNameError.style.display = 'block';
      hasError = true;
    }
    if (prn.length < 3) {
      if (pledgePrnError) pledgePrnError.style.display = 'block';
      hasError = true;
    }
    if (!deptId) {
      if (pledgeDeptError) pledgeDeptError.style.display = 'block';
      hasError = true;
    }
    if (!division) {
      if (pledgeDivError) pledgeDivError.style.display = 'block';
      hasError = true;
    }

    if (hasError) return;

    // Increment pledge count
    const currentCount = parseInt(localStorage.getItem(PLEDGE_STORAGE_KEY) || '284', 10);
    const newCount = currentCount + 1;
    localStorage.setItem(PLEDGE_STORAGE_KEY, newCount);
    if (pledgeCount) pledgeCount.textContent = newCount.toLocaleString();

    closePledgeModal();
    launchConfetti(90);
    playChime('celebrate');
    showToast(`Pledge Signed! Welcome, Green Citizen ${name}!`, `PRN ${prn} [${division}] is pledged to zero campus e-waste.`);
    
    // Auto query this PRN in portal so student immediately sees their profile
    if (portalSearchInput) {
      portalSearchInput.value = prn;
      lookupStudentPrn(prn);
    }
  }

  // --- Toast System with Certificate Link ---
  function showToastWithCertLink(title, subtitle, recordId) {
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div class="toast-body">
        <span class="toast-title">${escapeHtml(title)}</span>
        <span class="toast-desc">${escapeHtml(subtitle)}</span>
        <div style="margin-top: 6px;">
          <button type="button" class="btn btn-secondary btn-sm" style="padding: 2px 10px; font-size: 0.75rem;" onclick="window.viewEcoCertificate('${recordId}')">
            📜 View Certificate
          </button>
        </div>
      </div>
    `;

    toastPortal.appendChild(toast);

    setTimeout(() => {
      dismissToast(toast);
    }, 5500);
  }

  function showToast(title, subtitle) {
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.setAttribute('role', 'status');
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      <div class="toast-body">
        <span class="toast-title">${escapeHtml(title)}</span>
        <span class="toast-desc">${escapeHtml(subtitle)}</span>
      </div>
    `;

    toast.addEventListener('click', () => {
      dismissToast(toast);
    });

    toastPortal.appendChild(toast);

    setTimeout(() => {
      dismissToast(toast);
    }, 4500);
  }

  function dismissToast(toast) {
    if (!toast || toast.classList.contains('toast-leaving')) return;
    toast.classList.add('toast-leaving');
    setTimeout(() => {
      toast.remove();
    }, 250);
  }

  // --- Reset Demo Data Confirmation ---
  function openResetModal() {
    resetModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeResetModal() {
    resetModal.style.display = 'none';
    document.body.style.overflow = '';
  }

  function confirmReset() {
    resetToInitialDefaults(true);
    renderAll();
    closeResetModal();
    showToast('Demo data reset', 'Restored initial sample statistics and cleared activity logs.');
  }

  // --- Event Listeners Setup ---
  function setupEventListeners() {
    // Sound Toggle
    setupSoundToggle();

    // Open Drop-Off Modal buttons
    if (openLogModalBtn) openLogModalBtn.addEventListener('click', openModal);
    if (guideLogBtn) guideLogBtn.addEventListener('click', openModal);

    // Close Drop-Off Modal
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    logModal.addEventListener('click', (e) => {
      if (e.target === logModal) closeModal();
    });

    // Form inputs live preview and validation
    studentNameInput.addEventListener('input', validateForm);
    if (studentPrnInput) studentPrnInput.addEventListener('input', validateForm);
    deptSelect.addEventListener('change', validateForm);
    if (divisionSelect) divisionSelect.addEventListener('change', validateForm);
    deviceSelect.addEventListener('change', validateForm);
    quantityInput.addEventListener('input', () => {
      if (parseInt(quantityInput.value, 10) < 1) {
        quantityInput.value = '1';
      }
      validateForm();
    });

    // Form submit
    dropOffForm.addEventListener('submit', handleFormSubmit);

    // Leaderboard Tabs (Departments vs Inter-Division Cup)
    if (tabDepts) {
      tabDepts.addEventListener('click', () => {
        leaderboardViewMode = 'departments';
        tabDepts.classList.add('active');
        tabDepts.setAttribute('aria-selected', 'true');
        tabDivisions.classList.remove('active');
        tabDivisions.setAttribute('aria-selected', 'false');
        renderLeaderboard();
      });
    }

    if (tabDivisions) {
      tabDivisions.addEventListener('click', () => {
        leaderboardViewMode = 'divisions';
        tabDivisions.classList.add('active');
        tabDivisions.setAttribute('aria-selected', 'true');
        tabDepts.classList.remove('active');
        tabDepts.setAttribute('aria-selected', 'false');
        renderLeaderboard();
      });
    }

    // Leaderboard Search filter
    deptSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      searchClearBtn.style.display = searchQuery ? 'block' : 'none';
      renderLeaderboard();
    });

    searchClearBtn.addEventListener('click', () => {
      deptSearchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      deptSearchInput.focus();
      renderLeaderboard();
    });

    resetSearchBtn.addEventListener('click', () => {
      deptSearchInput.value = '';
      searchQuery = '';
      searchClearBtn.style.display = 'none';
      renderLeaderboard();
    });

    // PRN Portal Search & Quick Chips
    if (portalSearchBtn) {
      portalSearchBtn.addEventListener('click', () => {
        lookupStudentPrn(portalSearchInput.value);
      });
    }

    if (portalSearchInput) {
      portalSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          lookupStudentPrn(portalSearchInput.value);
        }
      });
    }

    quickPrnPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const prn = pill.getAttribute('data-prn');
        if (portalSearchInput) portalSearchInput.value = prn;
        lookupStudentPrn(prn);
      });
    });

    // Pledge Modal Listeners
    if (openPledgeModalBtn) openPledgeModalBtn.addEventListener('click', openPledgeModal);
    if (closePledgeModalBtn) closePledgeModalBtn.addEventListener('click', closePledgeModal);
    if (pledgeModal) {
      pledgeModal.addEventListener('click', (e) => {
        if (e.target === pledgeModal) closePledgeModal();
      });
    }
    if (pledgeForm) pledgeForm.addEventListener('submit', handlePledgeSubmit);

    // Department Profile Modal Close
    if (closeDeptModalBtn) closeDeptModalBtn.addEventListener('click', closeDeptProfile);
    if (closeDeptProfileBtn) closeDeptProfileBtn.addEventListener('click', closeDeptProfile);
    deptProfileModal.addEventListener('click', (e) => {
      if (e.target === deptProfileModal) closeDeptProfile();
    });

    // Certificate Modal Close & Print
    if (closeCertModalBtn) closeCertModalBtn.addEventListener('click', closeCertificate);
    if (dismissCertBtn) dismissCertBtn.addEventListener('click', closeCertificate);
    if (printCertBtn) {
      printCertBtn.addEventListener('click', () => {
        window.print();
      });
    }
    certificateModal.addEventListener('click', (e) => {
      if (e.target === certificateModal) closeCertificate();
    });

    // Global Escape Key to close any active modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (logModal.style.display === 'flex') closeModal();
        if (deptProfileModal.style.display === 'flex') closeDeptProfile();
        if (certificateModal.style.display === 'flex') closeCertificate();
        if (resetModal.style.display === 'flex') closeResetModal();
        if (pledgeModal && pledgeModal.style.display === 'flex') closePledgeModal();
      }
    });

    // Simulator Interactive Controls
    if (simDeviceSelect) simDeviceSelect.addEventListener('change', updateSimulatorPreview);
    if (simQuantityInput) simQuantityInput.addEventListener('input', updateSimulatorPreview);

    // Activity Feed Filter & Export CSV
    if (activityDeptFilter) {
      activityDeptFilter.addEventListener('change', (e) => {
        activityFilterDept = e.target.value;
        renderActivityFeed();
      });
    }

    if (activityDivisionFilter) {
      activityDivisionFilter.addEventListener('change', (e) => {
        activityFilterDivision = e.target.value;
        renderActivityFeed();
      });
    }

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener('click', exportActivityToCSV);
    }

    // Reset Demo Modal listeners
    if (openResetModalBtn) openResetModalBtn.addEventListener('click', openResetModal);
    if (cancelResetBtn) cancelResetBtn.addEventListener('click', closeResetModal);
    if (confirmResetBtn) confirmResetBtn.addEventListener('click', confirmReset);
    resetModal.addEventListener('click', (e) => {
      if (e.target === resetModal) closeResetModal();
    });

    // Active Nav Indicator on Scroll
    const sections = [
      { id: 'leaderboard-section', link: document.querySelector('.nav-link[data-section="leaderboard-section"]') },
      { id: 'impact-section', link: document.querySelector('.nav-link[data-section="impact-section"]') },
      { id: 'student-portal-section', link: document.querySelector('.nav-link[data-section="student-portal-section"]') },
      { id: 'badges-section', link: document.querySelector('.nav-link[data-section="badges-section"]') },
      { id: 'stations-section', link: document.querySelector('.nav-link[data-section="stations-section"]') },
      { id: 'activity-section', link: document.querySelector('.nav-link[data-section="activity-section"]') }
    ];

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY + 120;
      let currentSectionId = '';

      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= scrollY) {
          currentSectionId = s.id;
        }
      }

      sections.forEach(s => {
        if (s.link) {
          if (s.id === currentSectionId) {
            s.link.classList.add('active');
          } else {
            s.link.classList.remove('active');
          }
        }
      });
    }, { passive: true });

    // Periodic time update for activity feed relative timestamps
    setInterval(() => {
      if (appState.activities.length > 0) {
        renderActivityFeed();
      }
    }, 30000);
  }

  // --- Run on Load ---
  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    renderAll();
    setupEventListeners();
  });

})();
