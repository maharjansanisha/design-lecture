/* Beyond Beautiful Interfaces — deck engine (no dependencies)
   - Scales a 1600×900 stage to fit any screen (16:9, letterboxed)
   - Slides + step-by-step reveals (elements with .frag and data-f="n")
   - Keyboard, clicker, swipe, hash URLs (#3 or #3.2)
   - Notes panel (N), presenter window (P) synced via BroadcastChannel
*/
(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const PREVIEW = params.has("preview");
  const SHOW_ALL = params.has("all");
  const stage = document.getElementById("stage");
  const slides = Array.from(stage.querySelectorAll(".slide"));
  const notes = window.DECK_NOTES || [];
  const channel = ("BroadcastChannel" in window && !PREVIEW) ? new BroadcastChannel("bbi-deck") : null;

  if (PREVIEW) document.body.classList.add("preview");
  if (SHOW_ALL) document.body.classList.add("show-all");

  const maxStep = slides.map(s => {
    let m = 0;
    s.querySelectorAll(".frag[data-f]").forEach(el => { m = Math.max(m, +el.dataset.f || 0); });
    return m;
  });

  const state = { slide: 0, step: 0 };

  /* ---------- Scale stage to viewport ---------- */
  function fit() {
    const w = window.innerWidth, h = window.innerHeight;
    const s = Math.min(w / 1600, h / 900);
    stage.style.transform = `scale(${s}) translate(-50%, -50%)`;
    stage.style.transformOrigin = "0 0";
    // translate after scale uses scaled units; position via left/top 50%
  }
  window.addEventListener("resize", fit);
  fit();

  /* ---------- Render ---------- */
  function render(opts) {
    opts = opts || {};
    slides.forEach((s, i) => {
      s.classList.toggle("is-active", i === state.slide);
      s.classList.toggle("is-past", i < state.slide);
      s.setAttribute("aria-hidden", i === state.slide ? "false" : "true");
      s.inert = i !== state.slide;
      const step = i === state.slide ? state.step : (i < state.slide ? maxStep[i] : 0);
      s.querySelectorAll(".frag[data-f]").forEach(el => el.classList.toggle("is-shown", +el.dataset.f <= step));
      if (s.dataset.compactAt) s.classList.toggle("compact", step >= +s.dataset.compactAt);
    });

    const n = slides.length;
    const counter = document.getElementById("counter");
    if (counter) counter.textContent = `${String(state.slide + 1).padStart(2, "0")} / ${String(n).padStart(2, "0")}`;
    const prog = document.getElementById("progress");
    if (prog) {
      const total = maxStep.reduce((a, b) => a + b + 1, 0);
      const done = maxStep.slice(0, state.slide).reduce((a, b) => a + b + 1, 0) + state.step + 1;
      prog.style.width = (done / total * 100) + "%";
    }
    document.title = `${state.slide + 1}. ${slides[state.slide].dataset.title || ""} — Beyond Beautiful Interfaces`;

    if (!PREVIEW) {
      const hash = `#${state.slide + 1}${state.step ? "." + state.step : ""}`;
      if (location.hash !== hash) history.replaceState(null, "", hash);
      renderNotes();
      if (!opts.silent) broadcast();
    }
    if (state.slide !== 3) pauseActivityTimer();
  }

  function go(slide, step, opts) {
    slide = Math.max(0, Math.min(slides.length - 1, slide | 0));
    step = Math.max(0, Math.min(maxStep[slide], step | 0));
    state.slide = slide; state.step = step;
    render(opts);
  }
  function next() {
    if (state.step < maxStep[state.slide]) go(state.slide, state.step + 1);
    else if (state.slide < slides.length - 1) go(state.slide + 1, 0);
  }
  function prev() {
    if (state.step > 0) go(state.slide, state.step - 1);
    else if (state.slide > 0) go(state.slide - 1, maxStep[state.slide - 1]);
  }
  function nextState(s, st) {
    if (st < maxStep[s]) return { slide: s, step: st + 1 };
    if (s < slides.length - 1) return { slide: s + 1, step: 0 };
    return null;
  }

  /* ---------- Hash ---------- */
  function readHash() {
    const m = location.hash.match(/^#(\d+)(?:\.(\d+))?/);
    if (m) go(+m[1] - 1, +(m[2] || 0), { silent: true });
    else render({ silent: true });
  }
  window.addEventListener("hashchange", readHash);

  /* ---------- Notes panel ---------- */
  function esc(s) { return String(s).replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c])); }
  function notesHTML(i) {
    const n = notes[i]; if (!n) return "<p>No notes.</p>";
    let h = "";
    if (n.intro) h += `<h4>How to open</h4><p>${esc(n.intro)}</p>`;
    if (n.clicks) h += `<h4>Clicks on this slide</h4><p>${esc(n.clicks)}</p>`;
    if (n.script && n.script.length) h += `<h4>What to say</h4>` + n.script.map(p => `<p>${esc(p)}</p>`).join("");
    if (n.ask && n.ask.length) h += `<h4>Ask the room</h4><ul>` + n.ask.map(p => `<li>${esc(p)}</li>`).join("") + `</ul>`;
    if (n.pause) h += `<h4>Pause</h4><p>${esc(n.pause)}</p>`;
    if (n.ifSilent) h += `<h4>If nobody answers</h4><p>${esc(n.ifSilent)}</p>`;
    if (n.transition) h += `<h4>Transition</h4><p>${esc(n.transition)}</p>`;
    return h;
  }
  window.DECK_NOTES_HTML = notesHTML;
  const notesEl = document.getElementById("notes");
  function renderNotes() {
    if (!notesEl) return;
    const n = notes[state.slide] || {};
    notesEl.innerHTML = `<div class="nh"><span>Slide ${state.slide + 1} · ${esc(n.title || "")}</span><span>Target ${n.minutes || "?"} min · Press N to hide</span></div>` + notesHTML(state.slide);
  }

  /* ---------- Presenter sync ---------- */
  function broadcast() { if (channel) channel.postMessage({ type: "state", slide: state.slide, step: state.step }); }
  if (channel) {
    channel.onmessage = (e) => {
      const d = e.data || {};
      if (d.type === "nav") { d.dir > 0 ? next() : prev(); }
      else if (d.type === "goto") go(d.slide, d.step || 0);
      else if (d.type === "hello") broadcast();
      else if (d.type === "timer") toggleActivityTimer();
    };
  }

  /* ---------- Interactions ---------- */
  // Slide 2 — hand tallies
  stage.querySelectorAll("[data-tally]").forEach(card => {
    const out = card.querySelector(".tally b");
    let count = 0;
    card.addEventListener("click", (e) => {
      count = Math.max(0, count + (e.shiftKey ? -1 : 1));
      out.textContent = count;
      card.classList.toggle("is-hit", count > 0);
    });
    card.addEventListener("contextmenu", (e) => { e.preventDefault(); count = Math.max(0, count - 1); out.textContent = count; card.classList.toggle("is-hit", count > 0); });
  });

  // Slide 3 — phone toggle
  const captions = {
    bad: "Same app, same food. Which one would you order from?",
    good: "Clear location, search, prices, time, and one obvious next step."
  };
  function setScreen(id) {
    stage.querySelectorAll("[data-screen]").forEach(b => b.setAttribute("aria-pressed", b.dataset.screen === id ? "true" : "false"));
    stage.querySelectorAll("[data-screen-id]").forEach(s => s.classList.toggle("is-hidden", s.dataset.screenId !== id));
    const cap = stage.querySelector("[data-caption]"); if (cap) cap.textContent = captions[id];
  }
  stage.querySelectorAll("[data-screen]").forEach(b => b.addEventListener("click", () => setScreen(b.dataset.screen)));
  function toggleScreen() {
    const cur = stage.querySelector('[data-screen][aria-pressed="true"]');
    setScreen(cur && cur.dataset.screen === "bad" ? "good" : "bad");
  }

  // Slide 4 — activity timer
  const tc = stage.querySelector("[data-timer]");
  let tDur = tc ? +tc.dataset.timer : 45, tLeft = tDur, tInt = null, tEnd = 0;
  const C = 326.7;
  function drawTimer() {
    if (!tc) return;
    tc.querySelector("[data-timer-val]").textContent = Math.ceil(tLeft);
    tc.querySelector(".bar").style.strokeDashoffset = String(C * (1 - tLeft / tDur));
    tc.classList.toggle("done", tLeft <= 0);
    tc.querySelector("[data-timer-start]").textContent = tInt ? "❚❚ Pause" : (tLeft <= 0 ? "↺ Reset" : "▶ Start");
  }
  function startActivityTimer() {
    if (tLeft <= 0) { tLeft = tDur; }
    tEnd = Date.now() + tLeft * 1000;
    tInt = setInterval(() => {
      tLeft = Math.max(0, (tEnd - Date.now()) / 1000);
      if (tLeft <= 0) { clearInterval(tInt); tInt = null; }
      drawTimer();
    }, 100);
    drawTimer();
  }
  function pauseActivityTimer() { if (tInt) { clearInterval(tInt); tInt = null; drawTimer(); } }
  function toggleActivityTimer() { if (state.slide !== 3) return; tInt ? pauseActivityTimer() : startActivityTimer(); }
  if (tc) {
    tc.querySelector("[data-timer-start]").addEventListener("click", () => { tInt ? pauseActivityTimer() : startActivityTimer(); });
    tc.querySelectorAll("[data-timer-set]").forEach(b => b.addEventListener("click", () => { pauseActivityTimer(); tDur = tLeft = +b.dataset.timerSet; drawTimer(); }));
    drawTimer();
  }

  /* ---------- Chrome buttons ---------- */
  function toggleFull() {
    if (!document.fullscreenElement) (document.documentElement.requestFullscreen || function(){}).call(document.documentElement);
    else document.exitFullscreen && document.exitFullscreen();
  }
  function toggleNotes() { notesEl && notesEl.classList.toggle("is-open"); }
  function openPresenter() {
    const w = window.open("presenter.html" + location.hash, "bbi-presenter", "width=1280,height=800");
    if (!w) alert("Please allow pop-ups for this site to open the presenter window.");
  }
  function toggleHelp(force) { const h = document.getElementById("help"); h && h.classList.toggle("is-open", force); }
  const $ = id => document.getElementById(id);
  if (!PREVIEW) {
    $("btn-prev").onclick = prev; $("btn-next").onclick = next;
    $("btn-notes").onclick = toggleNotes; $("btn-presenter").onclick = openPresenter;
    $("btn-full").onclick = toggleFull; $("btn-help").onclick = () => toggleHelp();
    $("help").onclick = (e) => { if (e.target.id === "help") toggleHelp(false); };
  }

  /* ---------- Keyboard ---------- */
  document.addEventListener("keydown", (e) => {
    if (PREVIEW || e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (["ArrowRight", "ArrowDown", "PageDown", " ", "Enter"].includes(k)) { e.preventDefault(); next(); }
    else if (["ArrowLeft", "ArrowUp", "PageUp", "Backspace"].includes(k)) { e.preventDefault(); prev(); }
    else if (k === "Home") go(0, 0);
    else if (k === "End") go(slides.length - 1, maxStep[slides.length - 1]);
    else if (/^[1-9]$/.test(k)) go(+k - 1, 0);
    else if (k === "f" || k === "F") toggleFull();
    else if (k === "n" || k === "N") toggleNotes();
    else if (k === "p" || k === "P") openPresenter();
    else if (k === "t" || k === "T") toggleActivityTimer();
    else if ((k === "b" || k === "B") && state.slide === 2) toggleScreen();
    else if (k === "?" || k === "h" || k === "H") toggleHelp();
    else if (k === "Escape") { toggleHelp(false); notesEl && notesEl.classList.remove("is-open"); }
  });
  // Buttons inside slides shouldn't swallow Space/Enter navigation focus
  stage.addEventListener("mouseup", () => { if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); });

  /* ---------- Touch swipe ---------- */
  let tx = null, ty = null;
  window.addEventListener("touchstart", (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, { passive: true });
  window.addEventListener("touchend", (e) => {
    if (tx === null) return;
    const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) dx < 0 ? next() : prev();
    tx = ty = null;
  }, { passive: true });

  /* ---------- HUD visibility on mouse move ---------- */
  let idle;
  window.addEventListener("mousemove", () => {
    document.body.classList.add("show-hud"); document.body.style.cursor = "";
    clearTimeout(idle);
    idle = setTimeout(() => { document.body.classList.remove("show-hud"); if (document.fullscreenElement) document.body.style.cursor = "none"; }, 2200);
  });

  /* ---------- Public API (used by presenter iframes) ---------- */
  window.deck = { go, next, prev, nextState, state, count: slides.length, maxStep, notesHTML };

  readHash();
})();
