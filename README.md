# 🤖 FinBot — AI Personal Finance Advisor Dashboard

FinBot is a modern, dark-mode SaaS financial telemetry and autonomous advisory platform. It delivers real-time budget auditing, category capping, predictive cashflow forecasting, and persona simulation with pixel-perfect visual fidelity.

---

## 🌟 Key Highlights & Visual Design System

* **Dark-Mode SaaS Aesthetics:**
  * **Main App Canvas:** Deep Midnight Navy (`#12161F`)
  * **Sidebar Surface:** Deep Slate (`#171C28`) with border accents (`rgba(255, 255, 255, 0.08)`)
  * **Card Surfaces:** Translucent Dark Slate (`rgba(26, 33, 48, 0.75)`) with `backdrop-filter: blur(16px)`
  * **Tinted KPI Summary Cards:**
    * **Monthly Income:** Subtle Emerald tint (`linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(22, 28, 40, 0.85))`) with `#22C55E` sparkline wave and solid green `+ Log` button.
    * **Monthly Expenses:** Subtle Rose/Coral tint (`linear-gradient(135deg, rgba(244, 63, 94, 0.14), rgba(22, 28, 40, 0.85))`) with `#F87171` sparkline wave and solid coral `- Log` button.
    * **Savings Progress:** Subtle Teal/Cyan tint (`linear-gradient(135deg, rgba(20, 184, 166, 0.14), rgba(22, 28, 40, 0.85))`) with dual-tone wave, percentage metric, and interactive `View Goals >` modal launcher.
  * **AI Advisor Insights Card:** Neon Emerald-to-Cyan glowing border (`#10B981` to `#06B6D4`) with outer radial aura (`box-shadow: 0 0 25px rgba(16, 185, 129, 0.25)`).

* **Interactive Mouse-Tracking Radial Spotlight Glow:**
  * Dynamically tracks cursor motion (`--mouse-x`, `--mouse-y`) across both the global viewport and local card coordinates (`--card-mouse-x`, `--card-mouse-y`).
  * Smooth ambient spotlight aura follows the cursor and illuminates hovered cards and borders.

* **Micro-Animations & Telemetry:**
  * Smooth animated countUp on all numerical currency changes.
  * Staggered smooth width expansion transitions on all budget progress bars.
  * Grouped Bar Chart with AI predictive spending dashed line graph using Chart.js.
  * Web Audio API synthesized haptic micro-feedback sounds on button taps and transactions.

---

## 👥 4 Rich Pre-Loaded Personas

Toggle effortlessly via the **Quick Persona Switcher** in the sidebar or from the top-right profile dropdown:
1. **Salaried (`Sarah Chen`):**
   * Income: `$6,200.00` | Expenses: `$3,450.00` | Savings: `$2,750.00` (`44.3%`)
   * Categories: Rent/Mortgage, Food & Groceries, Transport, Entertainment (⚠️ Over Spent!), Utilities.
2. **Student (`Alex Rivera`):**
   * Income: `$1,250.00` | Expenses: `$920.00` | Savings: `$330.00` (`26.4%`)
   * Categories: Dorm/Meal Plan, Textbooks & Courseware, Campus Transit, Weekend Socials (⚠️ Over Spent!), Study Snacks.
3. **Freelancer (`Liam Vance`):**
   * Income: `$7,800.00` | Expenses: `$4,100.00` | Savings: `$3,700.00` (`47.4%`)
   * Categories: Co-Working Space, Cloud & Software Tools (⚠️ Over Spent!), Marketing, Client Dinners, Tax Reserve.
4. **Household (`The Patel Family`):**
   * Income: `$9,600.00` | Expenses: `$6,850.00` | Savings: `$2,750.00` (`28.6%`)
   * Categories: Mortgage & Escrow, Family Groceries (⚠️ Over Spent!), Daycare & Tutoring, Utilities & Solar, Recreation.

---

## ⚡ Interactive Components & Zero Dead Links

* **`+ Log Income` Modal:** Log variable/fixed income with instant recalculation of savings and cashflow chart.
* **`- Log Expense` Modal:** Real-time overspending detector alerts you *as you type* if the expense breaches that category's cap!
* **FinBot AI Chat Slide-Over Drawer:** Click `🧠 AI Advisor: Active & Analyzing` or any insight card to chat directly with FinBot, with persona-aware analysis.
* **Savings Goals & Emergency Fund Modal:** Click `View Goals >` to view goal progress bars and instantly allocate monthly surplus with one click.
* **Monthly Financial Executive Report Modal:** Review full cashflow breakdown, export a real `.csv` file, or print a formatted statement.
* **Real-Time Global Search Bar:** Filter transactions and budget categories dynamically as you type.
* **3-Way Segmented Category Pill Filter:** Filter between `All`, `Essential`, and `Discretionary` caps.
* **Notification Dropdown:** Review live budget alerts, mark all as read.
* **Settings Modal:** Toggle Cursor Glow, Sound Feedback, and AI advisories.

---

## 🚀 Quick Start Guide

### Option 1: Direct File Open
Simply double-click or open `index.html` in any modern web browser (Chrome, Safari, Edge, Firefox).

### Option 2: Run Built-In Python Server
Run the included lightweight server:
```bash
cd /Users/vedantanuppophare/.gemini/antigravity/scratch/finbot-dashboard
python3 server.py
```
Then visit: **`http://localhost:8080`**
