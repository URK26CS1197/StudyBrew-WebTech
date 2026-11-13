# ☕ StudyBrew: A Coffee-Themed Study Buddy

StudyBrew is a responsive web portal that helps students stay on top of their studies. It brings an assignment tracker, a to-do list, a Pomodoro focus timer, a quiz and a doubt-solving chatbot into one cozy, coffee-themed website with light and dark modes.

Built as the **IA-3 Micro Project** for **25CS208: Web Technology** (2026-27, Odd Semester), School of Computer Science & Technology, Karunya Institute of Technology and Sciences (KITS).

🔗 **Live website:** https://study-brew-lovat.vercel.app
📦 **Repository:** https://github.com/URK6CS1197/studybrew-web-tech

---

## 📌 Problem Statement

Students often juggle deadlines, daily tasks, focus sessions and doubts across several different apps. This makes it easy to miss assignments and lose focus. StudyBrew puts all of these tools in one place, with no installation and no backend, and it works on desktop and mobile.

## ✨ Features

| Module | What it does |
|---|---|
| 📚 **Assignment Tracker** | Add assignments with subject and due date. They sort by deadline, can be ticked off or deleted, and show a red **overdue** badge once the date has passed. |
| ✅ **To-Do List** | Add, complete and delete daily tasks, with a live "tasks done" counter. |
| ⏱️ **Pomodoro Timer** | Focus (25 min), Short break (5 min) and Long break (15 min) modes with Start/Pause/Reset. Completed focus sessions are counted. |
| 🧠 **Quick Quiz** | 5 multiple-choice questions on web basics with instant green/red feedback and a final score. |
| 💬 **Doubt Chatbot (Brew Bot)** | A floating chat panel that answers study and web-tech questions using keyword matching. |
| 🧮 **Calculator** | Digits, `+ - * /`, `C` and `=`, with error handling for divide-by-zero and invalid input. |
| 🌗 **Light / Dark Theme** | One-click toggle in the header. Your choice is remembered across sessions. |
| 🔐 **Auth Pages** | Registration, sign-up and sign-in pages with real-time form validation. |

Assignments, tasks, Pomodoro count, theme and user email are stored in the browser's `localStorage`, so they survive a page refresh.

## 🗂️ Project Structure

```
studybrew/
├── index.html        # Landing page (FR-01)
├── register.html     # Registration + detailed validation (FR-02)
├── signup.html       # Simple sign-up with Terms checkbox (FR-03)
├── signin.html       # Sign-in with show/hide password (FR-04)
├── home.html         # Dashboard (FR-05)
├── styles.css        # Design tokens, components, theme colours
├── layout.css        # CSS Grid (desktop) / Flexbox (mobile) layouts
├── theme.js          # Light/dark toggle + localStorage (FR-07)
├── validation.js     # Regex validation + sign-in logic (FR-02, 03, 04)
├── app.js            # Assignments, to-do, Pomodoro, quiz, drawer menu
├── calculator.js     # Calculator module (FR-08)
└── chatbot.js        # Floating chatbot (FR-06)
```

## 🧩 Functional Requirements Coverage

| ID | Requirement | Where implemented |
|---|---|---|
| FR-01 | Landing page with header, theme toggle, hero banner, feature cards, page outline | `index.html` |
| FR-02 | Registration form with 7 fields, regex validation on `blur` and `submit`, error badges, disabled submit | `register.html`, `validation.js` |
| FR-03 | Sign-up form with email, password, Terms consent | `signup.html`, `validation.js` |
| FR-04 | Sign-in with password eye toggle and error banner | `signin.html`, `validation.js` |
| FR-05 | Dashboard: CSS Grid on desktop, Flexbox plus hamburger drawer on mobile | `home.html`, `layout.css`, `app.js` |
| FR-06 | Floating chatbot with `.user-msg` / `.bot-msg`, keyword replies, auto-scroll | `chatbot.js` |
| FR-07 | Theme switcher with CSS custom properties and `localStorage` | `theme.js`, `styles.css` |
| FR-08 | JavaScript calculator with error handling | `calculator.js` |

## ✅ Form Validation Rules

| Field | Rule |
|---|---|
| Full Name | Letters and spaces only, 2-50 chars: `/^[a-zA-Z\s]{2,50}$/` |
| Register ID | 6-12 alphanumeric characters: `/^[A-Z0-9]{6,12}$/i` |
| Email | `/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/` |
| Mobile | 10 digits starting with 6-9: `/^[6-9]\d{9}$/` |
| Division | A selection is required |
| Password | Min 8 chars with uppercase, lowercase, number and a symbol from `@$!%*?&` |
| Confirm Password | Must match the password |

Fields are checked when you leave them (`blur`) and on `submit`. Invalid fields get a red border (`input.invalid`) and an inline `<span class="error-msg">`. The submit button stays **disabled** until every field is valid.

## 📱 Responsive Design

- **Desktop (≥ 768px):** the dashboard uses CSS Grid with `grid-template-columns: 250px 1fr 300px`: a sidebar, the main study area, and a right panel with the timer and calculator.
- **Mobile (< 768px):** a single-column **Flexbox** stack, with the sidebar moving into a **hamburger (☰) drawer**.

## 🛠️ Tech Stack

- **HTML5**: semantic structure
- **CSS3**: custom properties (design tokens), Grid, Flexbox, media queries
- **JavaScript (ES6+)**: DOM manipulation, events, regex, `localStorage`
- **Git & GitHub**: version control
- **Vercel**: hosting with HTTPS

No frameworks, build tools or dependencies are required.

## 🚀 Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR-USERNAME/studybrew-web-tech.git
   cd studybrew-web-tech
   ```
2. Open `index.html` in your browser, or use the VS Code **Live Server** extension.

## ☁️ Deployment

1. Push the project to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Set the framework preset to **Other**, leave the build settings empty, and click **Deploy**.

Every push to `main` redeploys automatically.

## ⚠️ Notes and Limitations

- Authentication is **client-side only**. Forms are validated but no data is sent to a server, so sign-in does not check against a real user database.
- Data is stored per browser, so clearing site data resets the dashboard.
- The chatbot is rule-based. It replies from a keyword list in `chatbot.js`, and you can add topics to the `KB` array.

## 🔮 Future Scope (v2.0)

- Real authentication with a backend and database
- Sync across devices
- Custom quiz creation and score history
- AI-powered chatbot
- Study statistics charts and streaks
- Notifications and sound for Pomodoro sessions

## 👥 Team

| Reyna M | URK26CS1197 | 

**Supervisor:** Dr. Titus

## 📄 License

Created for academic purposes at KITS. Add a license here if you plan to share it publicly.
