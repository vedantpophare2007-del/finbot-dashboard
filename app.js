/**
 * FINBOT — AI PERSONAL FINANCE ADVISOR
 * Principal Full-Stack Engineer & Creative Technologist Implementation
 * Fully functional, interactive dark-mode SaaS dashboard
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DATA STORE: 4 RICH PERSONA DATASETS
  // =========================================================================
  const PERSONAS_DATA = {
    salaried: {
      id: 'salaried',
      name: 'Sarah Chen',
      title: 'Persona: Salaried Professional',
      email: 'sarah.chen@finbot.ai',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces',
      income: 6200.00,
      expenses: 3450.00,
      savings: 2750.00,
      savingsPct: 44.3,
      emergencyFund: { current: 11200, target: 15000 },
      surplusAvailable: 240.00,
      categories: [
        { id: 'cat-rent', name: 'Rent/Mortgage', spent: 1500, cap: 1500, type: 'Essential', color: '#10B981', isOver: false },
        { id: 'cat-food', name: 'Food & Groceries', spent: 580, cap: 600, type: 'Essential', color: '#FBBF24', isOver: false },
        { id: 'cat-trans', name: 'Transport', spent: 210, cap: 300, type: 'Essential', color: '#3B82F6', isOver: false },
        { id: 'cat-ent', name: 'Entertainment', spent: 340, cap: 300, type: 'Discretionary', color: 'gradient-coral', isOver: true, warning: '⚠️ Over Spent!' },
        { id: 'cat-util', name: 'Utilities', spent: 180, cap: 250, type: 'Essential', color: '#10B981', isOver: false }
      ],
      insights: [
        {
          id: 'ins-1',
          type: 'overspend',
          icon: '💡',
          title: 'Overspending Alert',
          priority: 'High Priority',
          color: 'rose',
          text: 'Entertainment is <span class="text-rose-400 font-semibold">12% over</span> your persona budget. Consider skipping eating out this weekend to save ~$60.',
          actionLabel: 'Analyze in AI Chat',
          actionPrompt: 'Why is Entertainment over budget and how can I adjust?'
        },
        {
          id: 'ins-2',
          type: 'savings',
          icon: '📈',
          title: 'Savings Recommendation',
          priority: 'Surplus',
          color: 'emerald',
          text: 'You are on track to save an extra <span class="text-emerald-400 font-semibold">$240</span> this month. Should we allocate this to your "Emergency Fund"?',
          hasChip: true,
          chipText: 'Allocate $240'
        },
        {
          id: 'ins-3',
          type: 'smart',
          icon: '🔍',
          title: 'Smart Insight',
          priority: 'Optimization',
          color: 'cyan',
          text: 'Subscriptions are trending higher. Pause inactive trials.',
          actionLabel: 'Review >',
          actionType: 'trials'
        }
      ],
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        income: [1550, 1550, 1550, 1550],
        expense: [1100, 780, 840, 730],
        predictive: [1050, 820, 800, 750],
        statNet: '+$687.50',
        statPeak: 'Week 1 ($1,100)'
      },
      transactions: [
        { id: 'tx-1', day: 'Daily 1', date: 'Oct 24', vendor: 'Whole Foods - Food', category: 'Food & Groceries', amount: 85.50, type: 'Essential', icon: 'groceries' },
        { id: 'tx-2', day: 'Daily 1', date: 'Oct 23', vendor: 'Uber - Transport', category: 'Transport', amount: 18.50, type: 'Essential', icon: 'car' },
        { id: 'tx-3', day: 'Daily 1', date: 'Oct 22', vendor: 'Netflix - Entertainment', category: 'Entertainment', amount: 15.99, type: 'Discretionary', icon: 'netflix' },
        { id: 'tx-4', day: 'Daily 1', date: 'Oct 20', vendor: 'Client Bonus - Income', category: 'Bonus', amount: 500.00, type: 'Essential/Discretionary', isIncome: true, icon: 'bonus' }
      ]
    },

    student: {
      id: 'student',
      name: 'Alex Rivera',
      title: 'Persona: College Student',
      email: 'alex.rivera@campus.edu',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=faces',
      income: 1250.00,
      expenses: 920.00,
      savings: 330.00,
      savingsPct: 26.4,
      emergencyFund: { current: 950, target: 2000 },
      surplusAvailable: 65.00,
      categories: [
        { id: 'cat-dorm', name: 'Dorm / Meal Plan', spent: 450, cap: 450, type: 'Essential', color: '#10B981', isOver: false },
        { id: 'cat-books', name: 'Textbooks & Courseware', spent: 120, cap: 150, type: 'Essential', color: '#3B82F6', isOver: false },
        { id: 'cat-transit', name: 'Campus Transit Pass', spent: 50, cap: 60, type: 'Essential', color: '#10B981', isOver: false },
        { id: 'cat-weekend', name: 'Weekend Socials & Dining', spent: 180, cap: 140, type: 'Discretionary', color: 'gradient-coral', isOver: true, warning: '⚠️ Over Spent!' },
        { id: 'cat-coffee', name: 'Study Snacks & Cafe', spent: 120, cap: 120, type: 'Essential', color: '#FBBF24', isOver: false }
      ],
      insights: [
        {
          id: 'ins-s1',
          type: 'overspend',
          icon: '💡',
          title: 'Overspending Alert',
          priority: 'Campus Alert',
          color: 'rose',
          text: 'Weekend Socials is <span class="text-rose-400 font-semibold">28% over</span> limit ($180/$140). Switch to on-campus club mixers to conserve ~$45.',
          actionLabel: 'Analyze in AI Chat',
          actionPrompt: 'How can I reduce my campus social expenses without missing out?'
        },
        {
          id: 'ins-s2',
          type: 'savings',
          icon: '📈',
          title: 'Student Surplus Notice',
          priority: 'Surplus',
          color: 'emerald',
          text: 'You saved <span class="text-emerald-400 font-semibold">$65</span> from off-campus discount codes. Allocate to Next Semester Books?',
          hasChip: true,
          chipText: 'Allocate $65'
        },
        {
          id: 'ins-s3',
          type: 'smart',
          icon: '🔍',
          title: 'Perk Optimization',
          priority: 'Discount',
          color: 'cyan',
          text: 'Student Spotify & GitHub pack qualifies for $14/mo institutional refund.',
          actionLabel: 'Claim Perk >',
          actionType: 'trials'
        }
      ],
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        income: [312, 312, 313, 313],
        expense: [260, 210, 280, 170],
        predictive: [250, 220, 240, 200],
        statNet: '+$82.50',
        statPeak: 'Week 3 ($280)'
      },
      transactions: [
        { id: 'tx-s1', day: 'Daily 1', date: 'Oct 24', vendor: 'Campus Dining - Lunch', category: 'Dorm / Meal Plan', amount: 14.50, type: 'Essential', icon: 'groceries' },
        { id: 'tx-s2', day: 'Daily 1', date: 'Oct 23', vendor: 'University Bookstore', category: 'Textbooks & Courseware', amount: 48.00, type: 'Essential', icon: 'car' },
        { id: 'tx-s3', day: 'Daily 1', date: 'Oct 22', vendor: 'Local Pizzeria - Social', category: 'Weekend Socials & Dining', amount: 28.50, type: 'Discretionary', icon: 'netflix' },
        { id: 'tx-s4', day: 'Daily 1', date: 'Oct 20', vendor: 'Work-Study Stipend', category: 'Stipend', amount: 250.00, type: 'Essential/Discretionary', isIncome: true, icon: 'bonus' }
      ]
    },

    freelancer: {
      id: 'freelancer',
      name: 'Liam Vance',
      title: 'Persona: Independent Consultant',
      email: 'liam.vance@studio.design',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces',
      income: 7800.00,
      expenses: 4100.00,
      savings: 3700.00,
      savingsPct: 47.4,
      emergencyFund: { current: 18500, target: 25000 },
      surplusAvailable: 450.00,
      categories: [
        { id: 'cat-cowork', name: 'Co-Working & Studio Space', spent: 650, cap: 700, type: 'Essential', color: '#10B981', isOver: false },
        { id: 'cat-saas', name: 'Cloud & Software Tools', spent: 420, cap: 400, type: 'Essential', color: 'gradient-coral', isOver: true, warning: '⚠️ Over Spent!' },
        { id: 'cat-mkt', name: 'Marketing & Portfolio Ads', spent: 380, cap: 500, type: 'Discretionary', color: '#3B82F6', isOver: false },
        { id: 'cat-client', name: 'Client Travel & Dinners', spent: 950, cap: 1000, type: 'Discretionary', color: '#FBBF24', isOver: false },
        { id: 'cat-tax', name: 'Quarterly Tax Reserve', spent: 1700, cap: 1700, type: 'Essential', color: '#10B981', isOver: false }
      ],
      insights: [
        {
          id: 'ins-f1',
          type: 'overspend',
          icon: '💡',
          title: 'SaaS Cap Breach',
          priority: 'High Priority',
          color: 'rose',
          text: 'Software tools are <span class="text-rose-400 font-semibold">$20 over cap</span>. Deactivate 2 unused Figma and AWS staging instances.',
          actionLabel: 'Analyze in AI Chat',
          actionPrompt: 'What software subscriptions can I safely pause as a freelancer?'
        },
        {
          id: 'ins-f2',
          type: 'savings',
          icon: '📈',
          title: 'Tax & Retirement Surplus',
          priority: 'Surplus',
          color: 'emerald',
          text: 'Excellent invoice collections! You have <span class="text-emerald-400 font-semibold">$450</span> surplus. Allocate to SEP-IRA?',
          hasChip: true,
          chipText: 'Allocate $450'
        },
        {
          id: 'ins-f3',
          type: 'smart',
          icon: '🔍',
          title: 'Cashflow Forecast',
          priority: 'Invoice Alert',
          color: 'cyan',
          text: '3 client retainers ($4,200 total) are due in 9 days. Outflow safe.',
          actionLabel: 'View Schedule >',
          actionType: 'trials'
        }
      ],
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        income: [2400, 1200, 3100, 1100],
        expense: [1200, 950, 1150, 800],
        predictive: [1100, 1000, 1050, 950],
        statNet: '+$925.00',
        statPeak: 'Week 1 ($1,200)'
      },
      transactions: [
        { id: 'tx-f1', day: 'Daily 1', date: 'Oct 24', vendor: 'WeWork Hotdesk Booking', category: 'Co-Working & Studio Space', amount: 65.00, type: 'Essential', icon: 'groceries' },
        { id: 'tx-f2', day: 'Daily 1', date: 'Oct 23', vendor: 'AWS Cloud Hosting', category: 'Cloud & Software Tools', amount: 142.00, type: 'Essential', icon: 'car' },
        { id: 'tx-f3', day: 'Daily 1', date: 'Oct 22', vendor: 'Client Dinner - Bistro 9', category: 'Client Travel & Dinners', amount: 185.00, type: 'Discretionary', icon: 'netflix' },
        { id: 'tx-f4', day: 'Daily 1', date: 'Oct 20', vendor: 'UI/UX Milestone Retainer', category: 'Consulting', amount: 2400.00, type: 'Essential/Discretionary', isIncome: true, icon: 'bonus' }
      ]
    },

    household: {
      id: 'household',
      name: 'The Patel Family',
      title: 'Persona: Multi-Earner Household',
      email: 'patel.family@homemail.org',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop&crop=faces',
      income: 9600.00,
      expenses: 6850.00,
      savings: 2750.00,
      savingsPct: 28.6,
      emergencyFund: { current: 24000, target: 35000 },
      surplusAvailable: 320.00,
      categories: [
        { id: 'cat-mortgage', name: 'Home Mortgage & Escrow', spent: 3200, cap: 3200, type: 'Essential', color: '#10B981', isOver: false },
        { id: 'cat-familygroceries', name: 'Family Groceries & Costco', spent: 1450, cap: 1300, type: 'Essential', color: 'gradient-coral', isOver: true, warning: '⚠️ Over Spent!' },
        { id: 'cat-daycare', name: 'Kids Education & Daycare', spent: 1100, cap: 1200, type: 'Essential', color: '#3B82F6', isOver: false },
        { id: 'cat-hutil', name: 'Utilities & Solar Service', spent: 600, cap: 650, type: 'Essential', color: '#10B981', isOver: false },
        { id: 'cat-recreation', name: 'Family Recreation & Trips', spent: 500, cap: 500, type: 'Discretionary', color: '#FBBF24', isOver: false }
      ],
      insights: [
        {
          id: 'ins-h1',
          type: 'overspend',
          icon: '💡',
          title: 'Household Groceries Alert',
          priority: 'High Priority',
          color: 'rose',
          text: 'Family Groceries exceeded cap by <span class="text-rose-400 font-semibold">$150</span> due to bulk club run. Meal planning will balance out next cycle.',
          actionLabel: 'Analyze in AI Chat',
          actionPrompt: 'How can our family optimize our monthly grocery spend without sacrificing quality?'
        },
        {
          id: 'ins-h2',
          type: 'savings',
          icon: '📈',
          title: '529 College Fund Opportunity',
          priority: 'Surplus',
          color: 'emerald',
          text: 'Family cash buffer is healthy with <span class="text-emerald-400 font-semibold">$320</span> unassigned. Allocate to 529 College Plan?',
          hasChip: true,
          chipText: 'Allocate $320'
        },
        {
          id: 'ins-h3',
          type: 'smart',
          icon: '🔍',
          title: 'Utility Auto-Audit',
          priority: 'Savings Tip',
          color: 'cyan',
          text: 'Peak summer electricity rate window expires this week. Expect $45 lower bill.',
          actionLabel: 'Details >',
          actionType: 'trials'
        }
      ],
      chartData: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        income: [2400, 2400, 2400, 2400],
        expense: [1950, 1600, 1750, 1550],
        predictive: [1850, 1650, 1700, 1600],
        statNet: '+$687.50',
        statPeak: 'Week 1 ($1,950)'
      },
      transactions: [
        { id: 'tx-h1', day: 'Daily 1', date: 'Oct 24', vendor: 'Costco Wholesale - Bulk', category: 'Family Groceries & Costco', amount: 285.40, type: 'Essential', icon: 'groceries' },
        { id: 'tx-h2', day: 'Daily 1', date: 'Oct 23', vendor: 'City Electric & Solar', category: 'Utilities & Solar Service', amount: 145.00, type: 'Essential', icon: 'car' },
        { id: 'tx-h3', day: 'Daily 1', date: 'Oct 22', vendor: 'Kids Gymnastics Academy', category: 'Kids Education & Daycare', amount: 160.00, type: 'Essential', icon: 'netflix' },
        { id: 'tx-h4', day: 'Daily 1', date: 'Oct 20', vendor: 'Joint Bi-Weekly Payroll', category: 'Salary', amount: 4800.00, type: 'Essential/Discretionary', isIncome: true, icon: 'bonus' }
      ]
    }
  };

  // Live Application State
  const AppState = {
    currentPersonaKey: 'salaried',
    categoryFilter: 'all', // 'all' | 'essential' | 'discretionary'
    searchQuery: '',
    settings: {
      glowEnabled: true,
      soundEnabled: true,
      aiAlertsEnabled: true
    },
    chartInstance: null,
    notifications: [
      { id: 'n1', title: 'Entertainment Overspend', desc: 'Category reached 113% of monthly cap ($340/$300)', unread: true, time: '10m ago', type: 'warn' },
      { id: 'n2', title: 'Direct Deposit Confirmed', desc: 'Payroll deposit of $3,100.00 cleared successfully', unread: true, time: '2h ago', type: 'success' },
      { id: 'n3', title: 'AI Recommendation Ready', desc: 'FinBot identified $240 potential surplus savings', unread: false, time: 'Yesterday', type: 'info' }
    ]
  };

  // Helper to get active persona object
  function getActivePersona() {
    return PERSONAS_DATA[AppState.currentPersonaKey];
  }

  // =========================================================================
  // 2. AUDIO FEEDBACK SYNTHESIZER (Web Audio API)
  // =========================================================================
  function playHapticBeep(frequency = 600, duration = 0.08, type = 'sine') {
    if (!AppState.settings.soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      // AudioContext unavailable or blocked
    }
  }

  // =========================================================================
  // 3. INTERACTIVE MOUSE-TRACKING SPOTLIGHT GLOW ENGINE
  // =========================================================================
  function initMouseSpotlight() {
    const ambientGlow = document.getElementById('ambient-glow');
    const cards = document.querySelectorAll('.glow-card');

    let mouseX = -500;
    let mouseY = -500;
    let ticking = false;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (AppState.settings.glowEnabled) {
            document.documentElement.style.setProperty('--mouse-x', `${mouseX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${mouseY}px`);

            // Update local coordinates for all visible cards
            cards.forEach((card) => {
              const rect = card.getBoundingClientRect();
              const cardX = mouseX - rect.left;
              const cardY = mouseY - rect.top;
              card.style.setProperty('--card-mouse-x', `${cardX}px`);
              card.style.setProperty('--card-mouse-y', `${cardY}px`);
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // =========================================================================
  // 4. ANIMATED NUMBER ROLLER (countUp)
  // =========================================================================
  function animateValue(elementId, start, end, duration = 600, isCurrency = true) {
    const el = document.getElementById(elementId);
    if (!el) return;

    el.classList.add('counter-pulse');
    setTimeout(() => el.classList.remove('counter-pulse'), 400);

    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / (Math.abs(range) || 1)));
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const val = start + (end - start) * easeProgress;

      if (isCurrency) {
        el.textContent = '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      } else {
        el.textContent = val.toFixed(1) + '%';
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        if (isCurrency) {
          el.textContent = '$' + end.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
          el.textContent = end.toFixed(1) + '%';
        }
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // =========================================================================
  // 5. TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'success', duration = 3200) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `pointer-events-auto flex items-center space-x-3 px-4 py-3 rounded-2xl bg-[#171C28]/95 border ${
      type === 'success' ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]' :
      type === 'error' ? 'border-rose-500/50 shadow-[0_0_20px_rgba(244,63,94,0.3)]' :
      'border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.3)]'
    } backdrop-blur-xl text-white text-xs font-semibold shadow-2xl transform translate-y-4 opacity-0 transition-all duration-300`;

    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : '💡';
    toast.innerHTML = `
      <span class="text-base">${icon}</span>
      <span class="leading-snug">${message}</span>
    `;

    container.appendChild(toast);
    playHapticBeep(type === 'error' ? 350 : 750, 0.1);

    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-4', 'opacity-0');
    });

    // Auto dismiss
    setTimeout(() => {
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // =========================================================================
  // 6. RENDER KPI CARDS & SPARKLINE WAVES
  // =========================================================================
  function renderKPICards(oldData = null) {
    const persona = getActivePersona();
    const oldIncome = oldData ? oldData.income : persona.income;
    const oldExpenses = oldData ? oldData.expenses : persona.expenses;
    const oldSavings = oldData ? oldData.savings : persona.savings;

    animateValue('kpi-income-val', oldIncome, persona.income, 500);
    animateValue('kpi-expenses-val', oldExpenses, persona.expenses, 500);
    animateValue('kpi-savings-val', oldSavings, persona.savings, 500);

    const savingsPct = ((persona.savings / persona.income) * 100).toFixed(1);
    const savingsEl = document.getElementById('savings-percent-text');
    if (savingsEl) {
      savingsEl.textContent = `${savingsPct}% of income`;
    }

    // Sparklines dynamic shape tweaking per persona
    renderDynamicSparklines();
  }

  function renderDynamicSparklines() {
    const persona = getActivePersona();
    const incomeWave = document.getElementById('sparkline-income-path');
    const incomeArea = document.getElementById('sparkline-income-area');
    const expenseWave = document.getElementById('sparkline-expense-path');
    const expenseArea = document.getElementById('sparkline-expense-area');

    if (persona.id === 'student') {
      incomeWave?.setAttribute('d', 'M0,32 Q40,15 80,28 T160,10');
      incomeArea?.setAttribute('d', 'M0,32 Q40,15 80,28 T160,10 L160,40 L0,40 Z');
      expenseWave?.setAttribute('d', 'M0,20 Q40,30 80,12 T160,25');
      expenseArea?.setAttribute('d', 'M0,20 Q40,30 80,12 T160,25 L160,40 L0,40 Z');
    } else if (persona.id === 'freelancer') {
      incomeWave?.setAttribute('d', 'M0,38 Q40,6 80,32 T160,4');
      incomeArea?.setAttribute('d', 'M0,38 Q40,6 80,32 T160,4 L160,40 L0,40 Z');
      expenseWave?.setAttribute('d', 'M0,12 Q40,36 80,15 T160,30');
      expenseArea?.setAttribute('d', 'M0,12 Q40,36 80,15 T160,30 L160,40 L0,40 Z');
    } else {
      incomeWave?.setAttribute('d', 'M0,35 Q40,10 80,25 T160,8');
      incomeArea?.setAttribute('d', 'M0,35 Q40,10 80,25 T160,8 L160,40 L0,40 Z');
      expenseWave?.setAttribute('d', 'M0,15 Q40,32 80,18 T160,28');
      expenseArea?.setAttribute('d', 'M0,15 Q40,32 80,18 T160,28 L160,40 L0,40 Z');
    }
  }

  // =========================================================================
  // 7. BUDGET OVERVIEWS & CATEGORY CAPS COMPONENT
  // =========================================================================
  function renderCategoryCaps() {
    const container = document.getElementById('budget-progress-container');
    if (!container) return;

    const persona = getActivePersona();
    const filter = AppState.categoryFilter;
    const query = AppState.searchQuery.toLowerCase().trim();

    container.innerHTML = '';

    const filtered = persona.categories.filter((cat) => {
      // 3-way segmented filter
      if (filter === 'essential' && cat.type !== 'Essential') return false;
      if (filter === 'discretionary' && cat.type !== 'Discretionary') return false;

      // Search filter
      if (query && !cat.name.toLowerCase().includes(query) && !cat.type.toLowerCase().includes(query)) {
        return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-8 text-center text-xs text-slate-400">
          No categories match the active filter or search term.
        </div>
      `;
      return;
    }

    filtered.forEach((cat) => {
      const percentage = Math.min((cat.spent / cat.cap) * 100, 100);
      const isOver = cat.spent > cat.cap;

      // Color logic matching specifications
      let barColorClass = '';
      let barGradient = '';
      if (isOver || cat.color === 'gradient-coral') {
        barGradient = 'background: linear-gradient(90deg, #F97316 0%, #EF4444 100%);';
      } else if (cat.color === '#FBBF24') {
        barGradient = 'background-color: #FBBF24;';
      } else if (cat.color === '#3B82F6') {
        barGradient = 'background-color: #3B82F6;';
      } else {
        barGradient = 'background-color: #10B981;';
      }

      const item = document.createElement('div');
      item.className = 'space-y-1.5 transition-all duration-300';
      item.innerHTML = `
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center space-x-2">
            <span class="font-bold text-white tracking-tight">${cat.name}</span>
            <span class="text-[10px] px-1.5 py-0.2 rounded-md ${
              cat.type === 'Essential' 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
            }">${cat.type}</span>
          </div>

          <div class="flex items-center space-x-2">
            ${isOver ? `<span class="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse">⚠️ Over Spent!</span>` : ''}
            <span class="font-mono text-slate-300 text-xs font-semibold">
              <span class="${isOver ? 'text-rose-400 font-bold' : 'text-white'}">$${cat.spent.toLocaleString()}</span>
              <span class="text-slate-500"> / $${cat.cap.toLocaleString()}</span>
            </span>
          </div>
        </div>

        <!-- Progress Bar Track -->
        <div class="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden relative border border-slate-700/30">
          <div class="progress-bar-fill h-full rounded-full" style="width: 0%; ${barGradient}" data-width="${percentage}%"></div>
        </div>
      `;

      container.appendChild(item);
    });

    // Trigger smooth CSS width expansion after render
    requestAnimationFrame(() => {
      setTimeout(() => {
        const bars = container.querySelectorAll('.progress-bar-fill');
        bars.forEach((bar) => {
          bar.style.width = bar.getAttribute('data-width');
        });
      }, 50);
    });
  }

  // =========================================================================
  // 8. AI ADVISOR INSIGHTS COMPONENT
  // =========================================================================
  function renderAIInsights() {
    const container = document.getElementById('ai-insights-container');
    if (!container) return;

    const persona = getActivePersona();
    container.innerHTML = '';

    persona.insights.forEach((ins) => {
      const card = document.createElement('div');
      
      const borderColor = ins.color === 'rose' ? 'border-rose-500/30 hover:border-rose-500/60' :
                          ins.color === 'emerald' ? 'border-emerald-500/30 hover:border-emerald-500/60' :
                          'border-cyan-500/30 hover:border-cyan-500/60';
      const titleColor = ins.color === 'rose' ? 'text-rose-400' :
                         ins.color === 'emerald' ? 'text-emerald-400' :
                         'text-cyan-400';

      card.className = `insight-card p-3 rounded-xl bg-slate-900/60 border ${borderColor} transition-all duration-200 cursor-pointer group/item relative`;
      
      let actionHtml = '';
      if (ins.hasChip) {
        actionHtml = `
          <button class="insight-allocate-chip px-2 py-0.5 rounded-md bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[10px] font-bold shadow-[0_0_10px_rgba(16,185,129,0.3)] hover:scale-105 active:scale-95 transition-all duration-150">
            ${ins.chipText}
          </button>
        `;
      } else if (ins.actionLabel) {
        actionHtml = `<button class="insight-review-btn text-[10px] text-cyan-300 hover:underline">${ins.actionLabel}</button>`;
      } else {
        actionHtml = `<span class="text-[10px] text-slate-400 font-mono">${ins.priority}</span>`;
      }

      card.innerHTML = `
        <div class="flex items-start space-x-3">
          <span class="text-base flex-shrink-0 mt-0.5">${ins.icon}</span>
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <span class="text-xs font-bold ${titleColor}">${ins.title}</span>
              ${actionHtml}
            </div>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">${ins.text}</p>
          </div>
        </div>
      `;

      // Event listener on allocate chip
      const chipBtn = card.querySelector('.insight-allocate-chip');
      if (chipBtn) {
        chipBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          allocateSurplusLive();
        });
      }

      // Clicking card opens FinBot chat drawer with context
      card.addEventListener('click', () => {
        openAIDrawer(ins.actionPrompt || `Explain insight: ${ins.title}`);
      });

      container.appendChild(card);
    });
  }

  function allocateSurplusLive() {
    const persona = getActivePersona();
    const surplus = persona.surplusAvailable;
    
    // Add surplus to emergency fund and savings
    persona.emergencyFund.current += surplus;
    persona.savings += surplus;
    persona.surplusAvailable = 0;

    renderKPICards({
      income: persona.income,
      expenses: persona.expenses,
      savings: persona.savings - surplus
    });

    showToast(`Allocated $${surplus.toFixed(2)} directly to Emergency Fund! Total: $${persona.emergencyFund.current.toLocaleString()}`, 'success');
    renderAIInsights();
  }

  // =========================================================================
  // 9. INCOME VS EXPENSE CHART (Chart.js Grouped Bars + Predictive Line)
  // =========================================================================
  function renderCashflowChart() {
    const ctx = document.getElementById('cashflow-chart');
    if (!ctx) return;

    const persona = getActivePersona();
    const data = persona.chartData;

    // Destroy prior instance if existing
    if (AppState.chartInstance) {
      AppState.chartInstance.destroy();
    }

    // Chart.js gradient setup
    const chartContext = ctx.getContext('2d');
    
    // Income Bar Gradient (Green)
    const incomeGrad = chartContext.createLinearGradient(0, 0, 0, 260);
    incomeGrad.addColorStop(0, '#10B981');
    incomeGrad.addColorStop(1, 'rgba(16, 185, 129, 0.2)');

    // Expense Bar Gradient (Indigo/Purple)
    const expenseGrad = chartContext.createLinearGradient(0, 0, 0, 260);
    expenseGrad.addColorStop(0, '#818CF8');
    expenseGrad.addColorStop(1, 'rgba(99, 102, 241, 0.2)');

    AppState.chartInstance = new Chart(ctx, {
      data: {
        labels: data.labels,
        datasets: [
          // 1. Income Grouped Bar
          {
            type: 'bar',
            label: 'Income',
            data: data.income,
            backgroundColor: incomeGrad,
            borderColor: '#10B981',
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.65,
            categoryPercentage: 0.7,
            order: 2
          },
          // 2. Expense Grouped Bar
          {
            type: 'bar',
            label: 'Expense',
            data: data.expense,
            backgroundColor: expenseGrad,
            borderColor: '#818CF8',
            borderWidth: 1.5,
            borderRadius: 6,
            barPercentage: 0.65,
            categoryPercentage: 0.7,
            order: 3
          },
          // 3. AI Predictive Spending (White Dashed Line with Nodes)
          {
            type: 'line',
            label: 'AI predictive Spending',
            data: data.predictive,
            borderColor: '#ffffff',
            borderWidth: 2,
            borderDash: [6, 6],
            pointBackgroundColor: '#06B6D4',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4.5,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#10B981',
            tension: 0.35,
            fill: false,
            order: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 750,
          easing: 'easeOutQuart'
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: false // Using custom HTML legend matching reference
          },
          tooltip: {
            backgroundColor: 'rgba(23, 28, 40, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#e2e8f0',
            borderColor: 'rgba(255, 255, 255, 0.12)',
            borderWidth: 1,
            padding: 12,
            boxPadding: 6,
            cornerRadius: 12,
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
            titleFont: { family: 'Plus Jakarta Sans', size: 13, weight: 'bold' },
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += '$' + context.parsed.y.toLocaleString();
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.04)',
              drawBorder: false
            },
            ticks: {
              color: '#94a3b8',
              font: { family: 'Plus Jakarta Sans', size: 11, weight: '600' }
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: '#64748b',
              font: { family: 'JetBrains Mono', size: 10 },
              callback: function (val) {
                return '$' + val;
              }
            }
          }
        }
      }
    });

    // Update bottom stats
    const netEl = document.getElementById('chart-stat-net');
    const peakEl = document.getElementById('chart-stat-peak');
    if (netEl) netEl.textContent = data.statNet;
    if (peakEl) peakEl.textContent = data.statPeak;
  }

  // =========================================================================
  // 10. RECENT TRANSACTIONS COMPONENT
  // =========================================================================
  function renderTransactions() {
    const container = document.getElementById('transactions-container');
    const countSub = document.getElementById('tx-count-sub');
    if (!container) return;

    const persona = getActivePersona();
    const query = AppState.searchQuery.toLowerCase().trim();

    container.innerHTML = '';

    const filtered = persona.transactions.filter((tx) => {
      if (!query) return true;
      return (
        tx.vendor.toLowerCase().includes(query) ||
        tx.category.toLowerCase().includes(query) ||
        tx.type.toLowerCase().includes(query)
      );
    });

    if (countSub) {
      countSub.textContent = `Showing ${filtered.length} recent item${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="py-8 text-center text-xs text-slate-400">
          No transactions found for "${query}".
        </div>
      `;
      return;
    }

    filtered.forEach((tx) => {
      const row = document.createElement('div');
      row.className = 'group flex items-center justify-between p-2.5 rounded-xl bg-slate-900/40 hover:bg-slate-800/60 border border-[rgba(255,255,255,0.04)] hover:border-slate-700 transition-all duration-150';

      // Icon color & style
      let iconMarkup = '';
      if (tx.icon === 'groceries') {
        iconMarkup = `<div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">🛒</div>`;
      } else if (tx.icon === 'car') {
        iconMarkup = `<div class="w-8 h-8 rounded-xl bg-slate-800 text-slate-200 border border-slate-700 flex items-center justify-center font-bold text-sm">🚗</div>`;
      } else if (tx.icon === 'netflix') {
        iconMarkup = `<div class="w-8 h-8 rounded-xl bg-rose-600/20 text-rose-500 flex items-center justify-center font-bold text-sm">🎬</div>`;
      } else {
        iconMarkup = `<div class="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">👤</div>`;
      }

      // Pill badge color
      let pillClass = 'bg-amber-500/10 text-amber-300 border-amber-500/20';
      if (tx.isIncome) {
        pillClass = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      } else if (tx.type === 'Discretionary') {
        pillClass = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      } else if (tx.category === 'Transport') {
        pillClass = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      }

      const isPositive = tx.isIncome;
      const amountPrefix = isPositive ? '+$' : '-$';
      const amountClass = isPositive ? 'text-emerald-400 font-bold' : 'text-white font-semibold';

      row.innerHTML = `
        <div class="flex items-center space-x-3">
          ${iconMarkup}
          <div>
            <div class="flex items-center space-x-2">
              <span class="text-xs font-bold text-white tracking-tight">${tx.vendor}</span>
              <span class="text-[9px] font-mono text-slate-400">Daily 1</span>
            </div>
            <div class="flex items-center space-x-2 mt-0.5">
              <span class="text-[11px] text-slate-400">${tx.date}</span>
              <span class="text-[10px] px-1.5 py-0.2 rounded border ${pillClass}">${tx.type}</span>
            </div>
          </div>
        </div>

        <div class="flex items-center space-x-3">
          <span class="font-mono text-xs ${amountClass}">
            ${amountPrefix}${tx.amount.toFixed(2)}
          </span>
          <button class="delete-tx-btn opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 transition-opacity" title="Remove entry" data-id="${tx.id}">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      `;

      // Delete listener
      const delBtn = row.querySelector('.delete-tx-btn');
      delBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTransaction(tx.id);
      });

      container.appendChild(row);
    });
  }

  function deleteTransaction(id) {
    const persona = getActivePersona();
    const index = persona.transactions.findIndex((t) => t.id === id);
    if (index !== -1) {
      const removed = persona.transactions.splice(index, 1)[0];
      renderTransactions();
      showToast(`Removed "${removed.vendor}"`, 'info');
    }
  }

  // =========================================================================
  // 11. SWITCH PERSONA ENGINE
  // =========================================================================
  function switchPersona(personaKey) {
    if (!PERSONAS_DATA[personaKey]) return;

    const oldData = { ...getActivePersona() };
    AppState.currentPersonaKey = personaKey;
    const persona = getActivePersona();

    playHapticBeep(520, 0.12, 'triangle');

    // 1. Update UI Persona Toggles in Sidebar
    const toggleCards = document.querySelectorAll('.persona-card');
    toggleCards.forEach((card) => {
      const key = card.getAttribute('data-persona');
      if (key === personaKey) {
        card.classList.add('active');
        const track = card.querySelector('.toggle-track');
        const thumb = card.querySelector('.toggle-thumb');
        track?.classList.remove('bg-slate-700');
        track?.classList.add('bg-emerald-500');
        thumb?.classList.remove('translate-x-0', 'bg-slate-400');
        thumb?.classList.add('translate-x-3', 'bg-white');
      } else {
        card.classList.remove('active');
        const track = card.querySelector('.toggle-track');
        const thumb = card.querySelector('.toggle-thumb');
        track?.classList.add('bg-slate-700');
        track?.classList.remove('bg-emerald-500');
        thumb?.classList.add('translate-x-0', 'bg-slate-400');
        thumb?.classList.remove('translate-x-3', 'bg-white');
      }
    });

    // 2. Update Top Right Profile Header
    const nameEl = document.getElementById('user-name-display');
    const badgeEl = document.getElementById('user-role-badge');
    const avatarEl = document.getElementById('user-avatar-img');
    const dropdownName = document.getElementById('dropdown-full-name');
    const dropdownEmail = document.getElementById('dropdown-email');
    const chatContextSub = document.getElementById('ai-chat-context-sub');

    if (nameEl) nameEl.textContent = persona.name;
    if (badgeEl) badgeEl.textContent = persona.title;
    if (avatarEl) avatarEl.src = persona.avatar;
    if (dropdownName) dropdownName.textContent = persona.name;
    if (dropdownEmail) dropdownEmail.textContent = persona.email;
    if (chatContextSub) chatContextSub.textContent = `Analyzing ${persona.name} (${persona.title})`;

    // 3. Update Category Dropdown options in Log Expense modal
    populateExpenseCategories();

    // 4. Re-render All Components with animations
    renderKPICards(oldData);
    renderCategoryCaps();
    renderAIInsights();
    renderCashflowChart();
    renderTransactions();

    showToast(`Persona switched to ${persona.name}`, 'success');
  }

  function populateExpenseCategories() {
    const select = document.getElementById('expense-category');
    if (!select) return;

    const persona = getActivePersona();
    select.innerHTML = '';

    persona.categories.forEach((cat) => {
      const opt = document.createElement('option');
      opt.value = cat.name;
      opt.textContent = `${cat.name} (${cat.type})`;
      select.appendChild(opt);
    });
  }

  // =========================================================================
  // 12. LOG INCOME & LOG EXPENSE FORM HANDLERS
  // =========================================================================
  function initIncomeExpenseModals() {
    // --- Log Income ---
    const btnLogIncome = document.getElementById('btn-log-income');
    const modalIncome = document.getElementById('modal-log-income');
    const formIncome = document.getElementById('form-log-income');

    btnLogIncome?.addEventListener('click', () => {
      openModal(modalIncome);
      document.getElementById('income-date').valueAsDate = new Date();
    });

    formIncome?.addEventListener('submit', (e) => {
      e.preventDefault();
      const source = document.getElementById('income-source').value.trim();
      const amount = parseFloat(document.getElementById('income-amount').value);
      const type = document.getElementById('income-type').value;
      const dateStr = document.getElementById('income-date').value || 'Oct 25';

      if (!source || isNaN(amount) || amount <= 0) return;

      const persona = getActivePersona();
      const oldIncome = persona.income;
      const oldSavings = persona.savings;

      // Update persona income & savings
      persona.income += amount;
      persona.savings += amount; // Increases cash buffer
      persona.surplusAvailable += amount * 0.2; // 20% to surplus

      // Add to recent transactions
      persona.transactions.unshift({
        id: 'tx-' + Date.now(),
        day: 'Daily 1',
        date: dateStr,
        vendor: `${source} - Income`,
        category: type,
        amount: amount,
        type: 'Essential/Discretionary',
        isIncome: true,
        icon: 'bonus'
      });

      closeModal(modalIncome);
      formIncome.reset();

      renderKPICards({ income: oldIncome, expenses: persona.expenses, savings: oldSavings });
      renderTransactions();
      renderCashflowChart();
      showToast(`+ $${amount.toFixed(2)} Income logged successfully!`, 'success');
    });

    // --- Log Expense ---
    const btnLogExpense = document.getElementById('btn-log-expense');
    const modalExpense = document.getElementById('modal-log-expense');
    const formExpense = document.getElementById('form-log-expense');
    const expenseAmountInput = document.getElementById('expense-amount');
    const expenseCatSelect = document.getElementById('expense-category');
    const overspendPreview = document.getElementById('modal-overspend-preview');
    const overspendMsg = document.getElementById('modal-overspend-msg');

    btnLogExpense?.addEventListener('click', () => {
      populateExpenseCategories();
      openModal(modalExpense);
      document.getElementById('expense-date').valueAsDate = new Date();
      overspendPreview?.classList.add('hidden');
    });

    // Real-time overspend warning check in modal
    function checkLiveOverspend() {
      const val = parseFloat(expenseAmountInput.value) || 0;
      const catName = expenseCatSelect.value;
      const persona = getActivePersona();
      const cat = persona.categories.find((c) => c.name === catName);

      if (cat && (cat.spent + val) > cat.cap) {
        overspendPreview?.classList.remove('hidden');
        const excess = (cat.spent + val) - cat.cap;
        overspendMsg.textContent = `Warning: Will breach "${cat.name}" cap by $${excess.toFixed(2)}!`;
      } else {
        overspendPreview?.classList.add('hidden');
      }
    }

    expenseAmountInput?.addEventListener('input', checkLiveOverspend);
    expenseCatSelect?.addEventListener('change', checkLiveOverspend);

    formExpense?.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('expense-title').value.trim();
      const catName = expenseCatSelect.value;
      const amount = parseFloat(expenseAmountInput.value);
      const type = document.getElementById('expense-type').value;
      const dateStr = document.getElementById('expense-date').value || 'Oct 25';

      if (!title || isNaN(amount) || amount <= 0) return;

      const persona = getActivePersona();
      const oldExpenses = persona.expenses;
      const oldSavings = persona.savings;

      // Update persona expenses
      persona.expenses += amount;
      persona.savings = Math.max(0, persona.savings - amount);

      // Increment category spent
      const targetCat = persona.categories.find((c) => c.name === catName);
      if (targetCat) {
        targetCat.spent += amount;
        if (targetCat.spent > targetCat.cap) {
          targetCat.isOver = true;
        }
      }

      // Add to recent transactions
      persona.transactions.unshift({
        id: 'tx-' + Date.now(),
        day: 'Daily 1',
        date: dateStr,
        vendor: `${title} - ${catName.split(' ')[0]}`,
        category: catName,
        amount: amount,
        type: type,
        isIncome: false,
        icon: catName.toLowerCase().includes('food') ? 'groceries' :
              catName.toLowerCase().includes('trans') ? 'car' :
              catName.toLowerCase().includes('ent') ? 'netflix' : 'groceries'
      });

      closeModal(modalExpense);
      formExpense.reset();

      renderKPICards({ income: persona.income, expenses: oldExpenses, savings: oldSavings });
      renderCategoryCaps();
      renderTransactions();
      renderCashflowChart();

      if (targetCat && targetCat.spent > targetCat.cap) {
        showToast(`- $${amount.toFixed(2)} logged. Over budget in ${targetCat.name}!`, 'error');
      } else {
        showToast(`- $${amount.toFixed(2)} logged to ${catName}`, 'success');
      }
    });
  }

  // =========================================================================
  // 13. FINBOT AI CHAT SLIDE-OVER DRAWER
  // =========================================================================
  function initAIChatDrawer() {
    const triggerBtn = document.getElementById('ai-drawer-trigger-btn');
    const askAiBtn = document.getElementById('ask-ai-drawer-btn');
    const closeBtn = document.getElementById('close-ai-drawer-btn');
    const backdrop = document.getElementById('ai-chat-drawer-backdrop');
    const drawer = document.getElementById('ai-chat-drawer');
    const form = document.getElementById('ai-chat-form');
    const input = document.getElementById('ai-chat-input');
    const messages = document.getElementById('ai-chat-messages');

    function openDrawer(initialPrompt = null) {
      backdrop.classList.remove('hidden');
      requestAnimationFrame(() => {
        backdrop.classList.remove('opacity-0');
        drawer.classList.remove('translate-x-full');
      });
      playHapticBeep(650, 0.08);

      if (initialPrompt) {
        handleUserMessage(initialPrompt);
      }
    }

    function closeDrawer() {
      drawer.classList.add('translate-x-full');
      backdrop.classList.add('opacity-0');
      setTimeout(() => backdrop.classList.add('hidden'), 300);
    }

    window.openAIDrawer = openDrawer;

    triggerBtn?.addEventListener('click', () => openDrawer());
    askAiBtn?.addEventListener('click', () => openDrawer());
    closeBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) closeDrawer();
    });

    // Quick prompt chips
    const chips = document.querySelectorAll('.ai-prompt-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const text = chip.textContent.trim();
        handleUserMessage(text);
      });
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      handleUserMessage(text);
    });

    function handleUserMessage(userText) {
      // 1. Append user message
      const userBubble = document.createElement('div');
      userBubble.className = 'flex items-start justify-end space-x-2.5';
      userBubble.innerHTML = `
        <div class="p-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-emerald-600 to-teal-500 text-white max-w-[85%] shadow-md">
          <p class="font-medium">${escapeHTML(userText)}</p>
        </div>
      `;
      messages.appendChild(userBubble);
      messages.scrollTop = messages.scrollHeight;

      // 2. Typing indicator
      const typingIndicator = document.createElement('div');
      typingIndicator.className = 'flex items-center space-x-2 text-slate-400 py-1';
      typingIndicator.innerHTML = `
        <div class="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">🤖</div>
        <span class="text-[11px] animate-pulse">FinBot is analyzing live telemetry...</span>
      `;
      messages.appendChild(typingIndicator);
      messages.scrollTop = messages.scrollHeight;

      // 3. AI Generative Response tailored to active persona
      setTimeout(() => {
        typingIndicator.remove();
        const responseText = generateAIResponse(userText);

        const aiBubble = document.createElement('div');
        aiBubble.className = 'flex items-start space-x-2.5 animate-fadeIn';
        aiBubble.innerHTML = `
          <div class="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-sm flex-shrink-0">
            🤖
          </div>
          <div class="p-3.5 rounded-2xl rounded-tl-sm bg-[rgba(26,33,48,0.9)] border border-[rgba(255,255,255,0.08)] text-slate-200 max-w-[85%] shadow-md space-y-2">
            ${responseText}
          </div>
        `;
        messages.appendChild(aiBubble);
        messages.scrollTop = messages.scrollHeight;
        playHapticBeep(850, 0.08);
      }, 700);
    }

    function generateAIResponse(query) {
      const p = getActivePersona();
      const q = query.toLowerCase();

      if (q.includes('entertainment') || q.includes('overspend') || q.includes('exceed')) {
        return `
          <p class="font-bold text-rose-400">Analysis: Entertainment Overspend</p>
          <p>For your <strong>${p.title}</strong> profile, the entertainment ceiling is set at <strong>$300/mo</strong>. Current spend is <strong>$340</strong> (113% of budget).</p>
          <div class="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
            💡 <strong>AI Recommendation:</strong> Divert $40 from your remaining <em>Transport</em> buffer ($90 remaining) to prevent dipping into your $2,750 savings goal.
          </div>
        `;
      }

      if (q.includes('240') || q.includes('surplus') || q.includes('save')) {
        return `
          <p class="font-bold text-emerald-400">Surplus Optimization Plan</p>
          <p>You have a verified monthly surplus of <strong>$${p.surplusAvailable.toFixed(2)}</strong>.</p>
          <p>Recommended allocation: <strong>70% to High-Yield Emergency Reserve</strong> (4.8% APY) and <strong>30%</strong> into your flex vacation goal.</p>
          <button onclick="window.triggerSurplusFromChat()" class="mt-1 px-3 py-1 rounded-lg bg-emerald-500 text-slate-950 font-bold text-[11px] hover:bg-emerald-400 transition-colors">
            Execute $240 Transfer Now
          </button>
        `;
      }

      if (q.includes('student') || q.includes('compare')) {
        return `
          <p class="font-bold text-cyan-400">Persona Benchmark</p>
          <p>Compared to the average student persona ($1,250 income, 26.4% savings rate), your current profile maintains a superior <strong>${((p.savings/p.income)*100).toFixed(1)}%</strong> savings rate.</p>
          <p class="text-slate-400">Switching profiles in the sidebar will simulate different tax and living cost burdens instantaneously.</p>
        `;
      }

      return `
        <p class="font-bold text-emerald-400">FinBot Telemetry Report</p>
        <p>Currently managing <strong>${p.name}</strong>'s cashflow: <strong>$${p.income.toLocaleString()}</strong> in, <strong>$${p.expenses.toLocaleString()}</strong> out, netting <strong>$${p.savings.toLocaleString()}</strong> monthly savings.</p>
        <p>All category caps are being monitored with predictive anomaly detection enabled.</p>
      `;
    }
  }

  window.triggerSurplusFromChat = function () {
    allocateSurplusLive();
  };

  // =========================================================================
  // 14. SAVINGS GOALS & EMERGENCY FUND MODAL
  // =========================================================================
  function initSavingsGoalsModal() {
    const link = document.getElementById('view-goals-link');
    const modal = document.getElementById('modal-savings-goals');
    const list = document.getElementById('goals-list-container');
    const surplusDisplay = document.getElementById('surplus-val-display');
    const depositBtn = document.getElementById('btn-modal-deposit-surplus');

    function openGoalsModal() {
      const persona = getActivePersona();
      if (surplusDisplay) {
        surplusDisplay.textContent = `$${persona.surplusAvailable.toFixed(2)} Available`;
      }

      if (list) {
        const goals = [
          { name: 'Emergency Safety Net (6 Months)', current: persona.emergencyFund.current, target: persona.emergencyFund.target, color: '#10B981' },
          { name: 'Holiday & Vacation Trip', current: 2400, target: 3000, color: '#38BDF8' },
          { name: 'Tech Hardware & Workstation', current: 1150, target: 1500, color: '#818CF8' }
        ];

        list.innerHTML = '';
        goals.forEach((g) => {
          const pct = Math.min((g.current / g.target) * 100, 100).toFixed(0);
          const item = document.createElement('div');
          item.className = 'p-3 rounded-xl bg-slate-900/50 border border-slate-700/60 space-y-1.5';
          item.innerHTML = `
            <div class="flex items-center justify-between text-xs">
              <span class="font-bold text-white">${g.name}</span>
              <span class="font-mono text-emerald-400 font-semibold">$${g.current.toLocaleString()} / $${g.target.toLocaleString()} (${pct}%)</span>
            </div>
            <div class="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div class="h-full rounded-full transition-all duration-500" style="width: ${pct}%; background-color: ${g.color};"></div>
            </div>
          `;
          list.appendChild(item);
        });
      }

      openModal(modal);
    }

    link?.addEventListener('click', openGoalsModal);

    depositBtn?.addEventListener('click', () => {
      allocateSurplusLive();
      closeModal(modal);
    });
  }

  // =========================================================================
  // 15. MONTHLY REPORTS MODAL & EXPORT CSV
  // =========================================================================
  function initMonthlyReports() {
    const modal = document.getElementById('modal-monthly-report');
    const body = document.getElementById('report-body');
    const csvBtn = document.getElementById('btn-export-csv');
    const printBtn = document.getElementById('btn-print-report');

    function openReportModal() {
      const persona = getActivePersona();
      if (body) {
        body.innerHTML = `
          <div class="p-4 rounded-xl bg-slate-900/60 border border-slate-700 space-y-3">
            <div class="flex justify-between items-center pb-2 border-b border-slate-700">
              <span class="font-bold text-white text-sm">Account: ${persona.name} (${persona.title})</span>
              <span class="text-emerald-400 font-mono font-bold">Health Score: 94/100 (Excellent)</span>
            </div>

            <div class="grid grid-cols-3 gap-3 text-center">
              <div class="p-2 rounded-lg bg-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">Gross Monthly In</span>
                <p class="font-mono text-emerald-400 font-bold text-sm">$${persona.income.toLocaleString()}</p>
              </div>
              <div class="p-2 rounded-lg bg-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">Total Outflows</span>
                <p class="font-mono text-rose-400 font-bold text-sm">$${persona.expenses.toLocaleString()}</p>
              </div>
              <div class="p-2 rounded-lg bg-slate-800">
                <span class="text-[10px] text-slate-400 uppercase">Net Monthly Savings</span>
                <p class="font-mono text-cyan-400 font-bold text-sm">$${persona.savings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            <h5 class="font-bold text-white text-xs uppercase tracking-wider">Category Allocation Audit</h5>
            <div class="divide-y divide-slate-800 border border-slate-700/60 rounded-xl overflow-hidden">
              ${persona.categories.map(c => `
                <div class="p-2.5 bg-slate-900/40 flex justify-between items-center text-xs">
                  <div class="flex items-center space-x-2">
                    <span class="font-semibold text-slate-200">${c.name}</span>
                    <span class="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">${c.type}</span>
                  </div>
                  <span class="font-mono ${c.spent > c.cap ? 'text-rose-400 font-bold' : 'text-slate-300'}">
                    $${c.spent.toLocaleString()} / $${c.cap.toLocaleString()}
                  </span>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
      openModal(modal);
    }

    window.openReportsModal = openReportModal;

    // Export CSV feature
    csvBtn?.addEventListener('click', () => {
      const p = getActivePersona();
      let csv = 'FinBot Autonomous Finance — Monthly Report\n';
      csv += `Persona,${p.name}\nProfile,${p.title}\nDate,October 2026\n\n`;
      csv += `Metric,Amount\nMonthly Income,$${p.income}\nMonthly Expenses,$${p.expenses}\nSavings Progress,$${p.savings}\nSavings Rate,${((p.savings/p.income)*100).toFixed(1)}%\n\n`;
      csv += 'Category,Type,Spent,Cap,Status\n';
      p.categories.forEach(c => {
        csv += `"${c.name}",${c.type},$${c.spent},$${c.cap},${c.spent > c.cap ? 'OVERSPENT' : 'ON TRACK'}\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `FinBot_Monthly_Report_${p.id}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded FinBot_Monthly_Report.csv', 'success');
    });

    // Print feature
    printBtn?.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // 16. SETTINGS & PREFERENCES MODAL
  // =========================================================================
  function initSettingsModal() {
    const modal = document.getElementById('modal-settings');
    const glowToggle = document.getElementById('setting-toggle-glow');
    const soundToggle = document.getElementById('setting-toggle-sound');
    const aiToggle = document.getElementById('setting-toggle-ai-alerts');

    window.openSettingsModal = () => openModal(modal);

    glowToggle?.addEventListener('change', (e) => {
      AppState.settings.glowEnabled = e.target.checked;
      const glow = document.getElementById('ambient-glow');
      if (glow) glow.style.opacity = e.target.checked ? '1' : '0';
      showToast(e.target.checked ? 'Spotlight Glow enabled' : 'Spotlight Glow paused', 'info');
    });

    soundToggle?.addEventListener('change', (e) => {
      AppState.settings.soundEnabled = e.target.checked;
      showToast(e.target.checked ? 'Audio feedback enabled' : 'Audio feedback muted', 'info');
      if (e.target.checked) playHapticBeep(700, 0.1);
    });

    aiToggle?.addEventListener('change', (e) => {
      AppState.settings.aiAlertsEnabled = e.target.checked;
      showToast(e.target.checked ? 'AI Advisories active' : 'AI Advisories paused', 'info');
    });
  }

  // =========================================================================
  // 17. NOTIFICATIONS & PROFILE DROPDOWNS
  // =========================================================================
  function initDropdowns() {
    const notifBtn = document.getElementById('notif-bell-btn');
    const notifDropdown = document.getElementById('notif-dropdown');
    const notifList = document.getElementById('notif-list');
    const notifBadge = document.getElementById('notif-badge');
    const markReadBtn = document.getElementById('mark-all-read-btn');

    const profileBtn = document.getElementById('user-profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    function renderNotifications() {
      if (!notifList) return;
      notifList.innerHTML = '';
      const hasUnread = AppState.notifications.some(n => n.unread);
      if (notifBadge) notifBadge.style.display = hasUnread ? 'block' : 'none';

      AppState.notifications.forEach((n) => {
        const item = document.createElement('div');
        item.className = `p-2 rounded-xl ${n.unread ? 'bg-slate-800/90 border border-emerald-500/30' : 'bg-slate-900/40'} text-xs space-y-1 transition-all`;
        item.innerHTML = `
          <div class="flex items-center justify-between">
            <span class="font-bold text-white">${n.title}</span>
            <span class="text-[10px] text-slate-400">${n.time}</span>
          </div>
          <p class="text-[11px] text-slate-300">${n.desc}</p>
        `;
        notifList.appendChild(item);
      });
    }

    renderNotifications();

    notifBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('hidden');
      profileDropdown.classList.add('hidden');
    });

    markReadBtn?.addEventListener('click', () => {
      AppState.notifications.forEach(n => n.unread = false);
      renderNotifications();
      showToast('All notifications marked as read', 'info');
    });

    profileBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      profileDropdown.classList.toggle('hidden');
      notifDropdown.classList.add('hidden');
    });

    // Profile dropdown switch options
    const switchOpts = document.querySelectorAll('.profile-switch-opt');
    switchOpts.forEach((opt) => {
      opt.addEventListener('click', () => {
        const key = opt.getAttribute('data-switch');
        switchPersona(key);
        profileDropdown.classList.add('hidden');
      });
    });

    document.getElementById('open-settings-from-profile')?.addEventListener('click', () => {
      profileDropdown.classList.add('hidden');
      window.openSettingsModal();
    });

    // Global click outside to dismiss dropdowns
    window.addEventListener('click', () => {
      notifDropdown?.classList.add('hidden');
      profileDropdown?.classList.add('hidden');
    });
  }

  // =========================================================================
  // 18. GLOBAL SEARCH & FILTER LOGIC
  // =========================================================================
  function initSearchAndFilters() {
    const searchInput = document.getElementById('global-search-input');
    const clearBtn = document.getElementById('clear-search-btn');

    searchInput?.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.classList.toggle('hidden', !AppState.searchQuery);
      }
      renderCategoryCaps();
      renderTransactions();
    });

    clearBtn?.addEventListener('click', () => {
      AppState.searchQuery = '';
      if (searchInput) searchInput.value = '';
      clearBtn.classList.add('hidden');
      renderCategoryCaps();
      renderTransactions();
    });

    // 3-way Segmented Category Pill Toggle (All | Essential | Discretionary)
    const pills = document.querySelectorAll('.cat-pill');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pills.forEach(p => {
          p.classList.remove('active', 'bg-slate-800', 'text-white');
          p.classList.add('text-slate-400');
        });
        pill.classList.add('active', 'bg-slate-800', 'text-white');
        pill.classList.remove('text-slate-400');

        AppState.categoryFilter = pill.getAttribute('data-filter');
        playHapticBeep(700, 0.05);
        renderCategoryCaps();
      });
    });
  }

  // =========================================================================
  // 19. SIDEBAR NAVIGATION CONTROLS
  // =========================================================================
  function initSidebarNavigation() {
    const navButtons = document.querySelectorAll('#sidebar-nav .nav-item');
    navButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const navTarget = btn.getAttribute('data-nav');
        
        // Update active class
        navButtons.forEach(b => {
          b.classList.remove('active');
          const dot = b.querySelector('.rounded-full.bg-emerald-400');
          if (dot) dot.remove();
        });

        btn.classList.add('active');
        if (!btn.querySelector('.rounded-full.bg-emerald-400')) {
          const dot = document.createElement('span');
          dot.className = 'ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10B981]';
          btn.appendChild(dot);
        }

        playHapticBeep(600, 0.05);

        // Functional view routing
        if (navTarget === 'income') {
          document.getElementById('btn-log-income')?.click();
        } else if (navTarget === 'expenses') {
          document.getElementById('btn-log-expense')?.click();
        } else if (navTarget === 'budget') {
          document.getElementById('ai-drawer-trigger-btn')?.click();
        } else if (navTarget === 'savings') {
          document.getElementById('view-goals-link')?.click();
        } else if (navTarget === 'reports') {
          window.openReportsModal();
        } else if (navTarget === 'settings') {
          window.openSettingsModal();
        } else {
          // Dashboard default
          window.scrollTo({ top: 0, behavior: 'smooth' });
          showToast('Dashboard overview active', 'info');
        }
      });
    });

    // Quick Persona Switcher in Sidebar (2x2 grid)
    const personaCards = document.querySelectorAll('#persona-toggles .persona-card');
    personaCards.forEach((card) => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-persona');
        switchPersona(key);
      });
    });

    // Robot Mascot click easter egg / AI chat opener
    document.getElementById('robot-mascot-btn')?.addEventListener('click', () => {
      window.openAIDrawer('Hello FinBot! Give me a high-level review of my portfolio today.');
    });

    // Refresh AI icon button spin & re-render
    const refreshAIBtn = document.getElementById('refresh-ai-btn');
    const refreshAIIcon = document.getElementById('refresh-ai-icon');
    refreshAIBtn?.addEventListener('click', () => {
      refreshAIIcon.classList.add('rotate-180');
      setTimeout(() => refreshAIIcon.classList.remove('rotate-180'), 500);
      renderAIInsights();
      showToast('AI insights recalibrated with live market rates', 'success');
    });

    // Quick add transaction button
    document.getElementById('btn-quick-add-tx')?.addEventListener('click', () => {
      document.getElementById('btn-log-expense')?.click();
    });

    // View all transactions button
    document.getElementById('view-all-tx-btn')?.addEventListener('click', () => {
      window.openReportsModal();
    });

    // Adjust caps button
    document.getElementById('adjust-caps-btn')?.addEventListener('click', () => {
      window.openAIDrawer('How should I adjust my category caps for next month?');
    });

    // Review trials button in insight
    document.getElementById('btn-pause-trials')?.addEventListener('click', (e) => {
      e.stopPropagation();
      showToast('Scanning 4 active subscriptions: Netflix ($15.99), Spotify ($10.99), AWS ($45.00)...', 'info');
      setTimeout(() => {
        window.openAIDrawer('Review my active recurring subscriptions and recommend cancellations.');
      }, 600);
    });
  }

  // =========================================================================
  // 20. MODAL UTILITIES (Accessible Backdrop, Focus, Keydown)
  // =========================================================================
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove('hidden');
    requestAnimationFrame(() => {
      modalEl.classList.remove('opacity-0');
    });
    playHapticBeep(650, 0.08);

    // Escape listener
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        closeModal(modalEl);
        window.removeEventListener('keydown', escHandler);
      }
    };
    window.addEventListener('keydown', escHandler);
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add('opacity-0');
    setTimeout(() => modalEl.classList.add('hidden'), 200);
  }

  function initModalDismissButtons() {
    const closeButtons = document.querySelectorAll('.modal-close-btn');
    closeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const modal = btn.closest('.fixed.inset-0');
        if (modal) closeModal(modal);
      });
    });

    // Backdrop click dismiss
    const modals = document.querySelectorAll('.fixed.inset-0:not(#ambient-glow)');
    modals.forEach((modal) => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
      });
    });
  }

  function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag)
    );
  }

  // =========================================================================
  // 21. BOOTSTRAP APPLICATION
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initMouseSpotlight();
    initSidebarNavigation();
    initDropdowns();
    initSearchAndFilters();
    initIncomeExpenseModals();
    initAIChatDrawer();
    initSavingsGoalsModal();
    initMonthlyReports();
    initSettingsModal();
    initModalDismissButtons();

    // Initial render with default salaried persona
    switchPersona('salaried');

    // Welcome greeting toast
    setTimeout(() => {
      showToast('FinBot Engine v3.4.0 Online — Real-Time Telemetry Active', 'success', 4000);
    }, 600);
  });

})();
