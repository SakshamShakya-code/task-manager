@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background: #0d0d0d;
  font-family: 'JetBrains Mono', monospace;
  min-height: 100vh;
}

/* SPLASH */
#splash {
  position: fixed; inset: 0;
  background: #0d0d0d;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  z-index: 999; transition: opacity 0.6s ease;
}
#splash.hide { opacity: 0; pointer-events: none; }
.sp-icon {
  width: 64px; height: 64px; background: #3b82f6;
  border-radius: 18px; display: flex;
  align-items: center; justify-content: center;
  margin-bottom: 18px;
  animation: popIn 0.5s cubic-bezier(.34,1.56,.64,1) both;
}
.sp-icon svg { width: 32px; height: 32px; }
.sp-name { font-size: 20px; font-weight: 600; color: #fff; letter-spacing: 3px; animation: fadeUp 0.4s 0.2s ease both; }
.sp-tag { font-size: 11px; color: #444; letter-spacing: 1px; margin-top: 8px; animation: fadeUp 0.4s 0.3s ease both; }
.sp-bar { width: 100px; height: 2px; background: #1a1a1a; border-radius: 2px; margin-top: 28px; overflow: hidden; }
.sp-fill { height: 100%; background: #3b82f6; animation: load 1.6s 0.5s ease forwards; width: 0; }

@keyframes popIn { from { transform: scale(0.6); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes fadeUp { from { transform: translateY(8px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes load { to { width: 100%; } }

/* APP */
#app { opacity: 0; transition: opacity 0.5s; }
#app.show { opacity: 1; }

/* TOPBAR */
.topbar {
  background: #090909; border-bottom: 1px solid #1a1a1a;
  padding: 0 24px; height: 52px;
  display: flex; align-items: center; gap: 10px;
}
.tb-icon {
  width: 30px; height: 30px; background: #3b82f6;
  border-radius: 8px; display: flex;
  align-items: center; justify-content: center;
}
.tb-icon svg { width: 16px; height: 16px; }
.tb-name { font-size: 14px; font-weight: 600; color: #fff; letter-spacing: 2px; }
.tb-date { margin-left: auto; font-size: 10px; color: #555; letter-spacing: 1px; }

/* MAIN */
.main { max-width: 620px; margin: 0 auto; padding: 28px 16px; }

/* STATS */
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 22px; }
.stat { background: #111; border: 1px solid #1f1f1f; border-radius: 12px; padding: 16px 18px; }
.stat-l { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.stat-v { font-size: 28px; font-weight: 600; letter-spacing: -1px; }
.stat-v.w { color: #fff; }
.stat-v.b { color: #3b82f6; }
.stat-v.o { color: #f97316; }

/* INPUT */
.input-row { display: flex; gap: 8px; margin-bottom: 16px; }
.ti {
  flex: 1;
  background: #0d0d0d;
  border: 1px solid #2a2a2a;
  border-radius: 10px;
  padding: 12px 14px;
  font-size: 13px;
  font-family: 'JetBrains Mono', monospace;
  color: #e0e0e0;
  outline: none;
  letter-spacing: 0.5px;
  transition: border-color 0.2s;
}
.ti::placeholder { color: #444; }
.ti:focus { border-color: #3b82f6; }

.ab {
  background: #3b82f6; color: #fff; border: none;
  border-radius: 10px; padding: 12px 22px;
  font-size: 12px; font-weight: 600;
  font-family: 'JetBrains Mono', monospace;
  cursor: pointer; white-space: nowrap; letter-spacing: 1px;
  transition: background 0.15s, transform 0.1s;
}
.ab:hover { background: #2563eb; }
.ab:active { transform: scale(0.97); }

/* FILTERS */
.filters { display: flex; gap: 6px; margin-bottom: 18px; }
.fb {
  font-size: 11px; font-weight: 500; padding: 7px 16px;
  border-radius: 20px; border: 1px solid #222;
  background: transparent; color: #666; cursor: pointer;
  font-family: 'JetBrains Mono', monospace; letter-spacing: 1px;
  transition: all 0.15s;
}
.fb:hover { color: #e0e0e0; border-color: #444; }
.fb.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }

/* SECTION LABEL */
.sec-label { font-size: 10px; font-weight: 600; color: #555; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 10px; }

/* TASK CARDS */
.tc {
  background: #111; border: 1px solid #1a1a1a;
  border-radius: 12px; padding: 13px 16px;
  display: flex; align-items: center; gap: 12px;
  margin-bottom: 8px;
  transition: border-color 0.15s, opacity 0.2s;
  animation: slideIn 0.2s ease both;
}
.tc:hover { border-color: #2a2a2a; }
.tc.done { opacity: 0.4; }
@keyframes slideIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }

.cb {
  width: 22px; height: 22px; border-radius: 6px;
  border: 1.5px solid #333; background: transparent;
  cursor: pointer; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; color: transparent; transition: all 0.15s;
}
.cb:hover { border-color: #3b82f6; }
.cb.checked { background: #3b82f6; border-color: #3b82f6; color: #fff; }

.tt { flex: 1; font-size: 13px; color: #d0d0d0; letter-spacing: 0.3px; }
.tt.done { text-decoration: line-through; color: #444; }

.badge { font-size: 9px; font-weight: 600; padding: 3px 8px; border-radius: 4px; letter-spacing: 1px; text-transform: uppercase; }
.badge.p { background: #1c1400; color: #f97316; border: 1px solid #2a1e00; }
.badge.d { background: #0c1a2e; color: #3b82f6; border: 1px solid #1a2e4a; }

.db { background: none; border: none; font-size: 13px; color: #2a2a2a; cursor: pointer; padding: 0 4px; transition: color 0.15s; }
.db:hover { color: #ef4444; }

.empty { text-align: center; padding: 40px 0; font-size: 11px; color: #333; letter-spacing: 1px; display: none; }
.footer { text-align: center; padding: 32px 0 8px; font-size: 10px; color: #222; letter-spacing: 1px; }
