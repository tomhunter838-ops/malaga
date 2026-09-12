/* Hunters to Málaga — app logic.
   Read-only plan from plan.js; ticks shared through the Cloudflare worker
   (same store and localStorage keys as the original tracker, so one
   switch-on link covers both pages). */
(function () {
  "use strict";
  var PLAN = window.PLAN || { tasks: [], gates: [], tracks: [], streams: [], chain: null, moveDate: "2027-01-18" };

  /* ---------- small utilities ---------- */
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  function parseD(s) { var p = s.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function today() { var n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); }
  function fmt(s, withYear) {
    var d = parseD(s);
    var out = DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()];
    if (withYear && d.getFullYear() !== new Date().getFullYear()) out += " " + d.getFullYear();
    return out;
  }
  function fmtStamp(iso) { // "Fri 12 Sep" from an ISO timestamp
    var d = new Date(iso);
    if (isNaN(d)) return "";
    return DAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()];
  }
  function daysFrom(a, b) { return Math.round((b - a) / 864e5); }
  function daysUntil(s) { return daysFrom(today(), parseD(s)); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function el(html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
  function store(k, v) { try { if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  function read(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  var byId = {}; PLAN.tasks.forEach(function (t) { byId[t.id] = t; });
  var trackById = {}; PLAN.tracks.forEach(function (t) { trackById[t.id] = t; });

  /* ---------- state & sync config ---------- */
  var SYNC_URL = "", SYNC_KEY = "";
  (function () {
    try {
      var q = new URLSearchParams(location.search);
      if (q.get("sync")) store("mmt.sync", q.get("sync"));
      if (q.get("key")) store("mmt.key", q.get("key"));
      if (q.get("sync") || q.get("key")) history.replaceState(null, "", location.pathname);
    } catch (e) {}
    SYNC_URL = read("mmt.sync") || SYNC_URL;
    SYNC_KEY = read("mmt.key") || SYNC_KEY;
  })();
  var me = read("mmt.me") || "";
  var chipView = read("mmt.appview") || "all";
  var ticks = {}; try { ticks = JSON.parse(read("mmt.ticks") || "{}") || {}; } catch (e) { ticks = {}; }
  var queue = []; try { queue = JSON.parse(read("mmt.queue") || "[]") || []; } catch (e) { queue = []; }
  function saveTicks() { store("mmt.ticks", JSON.stringify(ticks)); }
  function saveQueue() { store("mmt.queue", JSON.stringify(queue)); updateBanner(); }
  function isDone(id) { return !!(ticks[id] && ticks[id].done); }

  /* ---------- render locking (undo window holds the layout still) ---------- */
  var renderLock = 0, renderDirty = false;
  function lockRender() { renderLock++; }
  function unlockRender() { renderLock = Math.max(0, renderLock - 1); if (!renderLock && renderDirty) { renderDirty = false; render(); } }

  /* ---------- sync ---------- */
  var flushing = false;
  function merge(remote) {
    var changed = false;
    Object.keys(remote || {}).forEach(function (id) {
      var r = remote[id], l = ticks[id];
      if (!l || String(l.at || "") <= String(r.at || "")) {
        if (!l || l.done !== r.done || l.at !== r.at || l.by !== r.by) { ticks[id] = r; changed = true; }
      }
    });
    if (changed) { saveTicks(); render(); }
    return changed;
  }
  function pull() {
    if (!SYNC_URL) return Promise.resolve(false);
    return fetch(SYNC_URL + "?key=" + encodeURIComponent(SYNC_KEY), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) { merge(j.ticks || {}); return true; })
      .catch(function () { return false; });
  }
  function flush() {
    if (!SYNC_URL || flushing || !queue.length) { updateBanner(); return Promise.resolve(); }
    flushing = true;
    var item = queue[0];
    return fetch(SYNC_URL + "?key=" + encodeURIComponent(SYNC_KEY), {
      method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(item)
    }).then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (j) {
        queue.shift(); saveQueue(); flushing = false;
        merge(j.ticks || {});
        if (queue.length) return flush();
      })
      .catch(function () { flushing = false; updateBanner(); });
  }
  function updateBanner() {
    // queued ticks before switch-on flush once the private link is opened; only nag when sync exists
    document.getElementById("banner").classList.toggle("show", queue.length > 0 && !!SYNC_URL);
  }
  function doTick(id, done) {
    var at = new Date().toISOString();
    ticks[id] = { done: done, by: me || "", at: at };
    saveTicks();
    queue.push({ id: id, done: done, by: me || "", at: at });
    saveQueue();
    flush();
  }

  /* ---------- undo pill ---------- */
  var undoState = null;
  function showUndo(id) {
    clearUndo(true);
    lockRender();
    var box = document.getElementById("undo");
    document.getElementById("undotext").textContent = "Done";
    box.classList.add("show");
    undoState = { id: id, timer: setTimeout(function () { clearUndo(); }, 5000) };
  }
  function clearUndo(skipRender) {
    if (!undoState) return;
    clearTimeout(undoState.timer);
    undoState = null;
    document.getElementById("undo").classList.remove("show");
    if (skipRender) { renderLock = Math.max(0, renderLock - 1); } else { unlockRender(); }
  }
  document.getElementById("undobtn").addEventListener("click", function () {
    if (!undoState) return;
    var id = undoState.id;
    doTick(id, false);
    clearUndo(true);
    render();
  });

  /* ---------- toast ---------- */
  var toastTimer = null;
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2600);
  }

  /* ---------- shared row ---------- */
  function ownerLabel(o) {
    return o === "tom" ? "Tom" : o === "chelsea" ? "Chelsea" : o === "both" ? "Both of us"
      : o === "adviser" ? "The adviser" : o === "driver" ? "The driver" : o;
  }
  function rowEl(t) {
    var done = isDone(t.id);
    var tk = ticks[t.id] || {};
    var over = !done && daysUntil(t.due) < 0;
    var meta;
    if (done) {
      meta = '<span>Done' + (tk.by ? " by " + esc(tk.by) : "") + (tk.at ? ", " + fmtStamp(tk.at) : "") + "</span>";
    } else {
      meta = '<span class="' + (over ? "over" : "") + '">' + (over ? "was due " : "do by ") + fmt(t.due) + "</span>";
      if (t.hard) meta += '<span class="badge b-hard">hard gate</span>';
      if (t.quick) meta += '<span class="badge b-quick">15 min</span>';
    }
    var row = el('<div class="trow' + (done ? " done" : "") + '" data-id="' + t.id + '">' +
      '<button class="tick' + (done ? " done" : "") + '" aria-label="' + (done ? "Undo: " : "Mark done: ") + esc(t.title) + '"></button>' +
      '<button class="tx"><div class="tt">' + esc(t.title) + '</div><div class="tm">' + meta + "</div></button></div>");
    row.querySelector(".tick").addEventListener("click", function (e) {
      e.stopPropagation();
      if (!me) { openWho(); return; }
      var nowDone = isDone(t.id);
      if (nowDone) { doTick(t.id, false); render(); return; }
      doTick(t.id, true);
      // settle the row in place: pop, strike through, show who/when; stack re-sorts after the undo window
      var btn = row.querySelector(".tick");
      btn.classList.add("done", "pop");
      row.classList.add("done");
      var tkNow = ticks[t.id];
      row.querySelector(".tm").innerHTML = "<span>Done by " + esc(tkNow.by || "") + ", " + fmtStamp(tkNow.at) + "</span>";
      showUndo(t.id);
    });
    row.querySelector(".tx").addEventListener("click", function () { openSheet(t.id); });
    return row;
  }

  /* ---------- NOW ---------- */
  function renderNow() {
    var t0 = today();
    var n = daysFrom(t0, parseD(PLAN.moveDate));
    var count = document.getElementById("count");
    if (n > 0) count.innerHTML = n + " day" + (n === 1 ? "" : "s") + "<small>to Málaga</small>";
    else if (n === 0) count.innerHTML = "We fly today";
    else count.innerHTML = "We're in Málaga";
    var sdays = document.getElementById("sdays");
    if (sdays) sdays.innerHTML = n > 0 ? "<b>" + n + " days</b>to Málaga · " + fmt(PLAN.moveDate, true) : "<b>Málaga</b>home";

    var gate = null;
    for (var i = 0; i < PLAN.gates.length; i++) { if (daysUntil(PLAN.gates[i].date) >= 0) { gate = PLAN.gates[i]; break; } }
    document.getElementById("gateline").innerHTML = gate
      ? "Next hard gate — <b>" + esc(gate.label) + "</b>, " + (gate.dateLabel ? esc(gate.dateLabel) : fmt(gate.date)) +
        " · " + (daysUntil(gate.date) === 0 ? "today" : "in " + daysUntil(gate.date) + " days")
      : "All the hard gates are behind us.";

    var open = PLAN.tasks.filter(function (t) { return !isDone(t.id); });
    function fill(sectionId, owner) {
      var sec = document.getElementById(sectionId);
      var list = open.filter(function (t) { return t.owner === owner; })
        .sort(function (a, b) { return a.due < b.due ? -1 : a.due > b.due ? 1 : 0; }).slice(0, 5);
      var card = sec.querySelector(".card");
      card.innerHTML = "";
      if (!list.length) {
        if (owner === "both") { sec.style.display = "none"; return; }
        card.appendChild(el('<div class="empty">Nothing waiting — lovely.</div>'));
      } else {
        list.forEach(function (t) { card.appendChild(rowEl(t)); });
      }
      sec.style.display = "";
    }
    fill("stack-tom", "tom");
    fill("stack-chelsea", "chelsea");
    fill("stack-both", "both");

    // Everything / Mine
    if (chipView === "mine" && me) {
      if (me !== "Tom") document.getElementById("stack-tom").style.display = "none";
      if (me !== "Chelsea") document.getElementById("stack-chelsea").style.display = "none";
    }

    var next7 = open.filter(function (t) { var d = daysUntil(t.due); return d >= 0 && d <= 6; }).length;
    var overdue = open.filter(function (t) { return daysUntil(t.due) < 0; }).length;
    document.getElementById("weekline").innerHTML =
      next7 + " due this week" + (overdue ? " · <b>" + overdue + " overdue</b>" : " · nothing overdue");
  }

  /* ---------- TIMELINE ---------- */
  var TL_START = new Date(2026, 8, 1), TL_END = new Date(2027, 2, 31); // Sep 2026 – Mar 2027
  function renderTimeline() {
    var inner = document.getElementById("tl-inner");
    var LBL = 96;
    var pxd = window.innerWidth >= 900 ? 9 : 6;
    var totalDays = daysFrom(TL_START, TL_END) + 1;
    var width = LBL + totalDays * pxd;
    inner.style.width = width + "px";
    inner.innerHTML = "";
    function x(dateStr) { return LBL + daysFrom(TL_START, parseD(dateStr)) * pxd; }

    // month header
    var mrow = el('<div id="tl-months"><div class="m" style="width:' + LBL + 'px;position:sticky;left:0;z-index:7;border-left:0;background:var(--card)"></div></div>');
    var d = new Date(TL_START);
    while (d <= TL_END) {
      var dim = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      mrow.appendChild(el('<div class="m" style="width:' + dim * pxd + 'px">' + MONTHS[d.getMonth()] +
        (d.getMonth() === 0 ? " ’27" : "") + "</div>"));
      d = new Date(d.getFullYear(), d.getMonth() + 1, 1);
    }
    inner.appendChild(mrow);

    // gate + today lines (behind the lanes' pills)
    PLAN.gates.forEach(function (g) {
      inner.appendChild(el('<div class="vline" style="left:' + x(g.date) + 'px;top:33px"></div>'));
    });
    var tISO = today(); var tStr = tISO.getFullYear() + "-" + String(tISO.getMonth() + 1).padStart(2, "0") + "-" + String(tISO.getDate()).padStart(2, "0");
    if (parseD(tStr) >= TL_START && parseD(tStr) <= TL_END)
      inner.appendChild(el('<div class="vline today" style="left:' + x(tStr) + 'px;top:33px"></div>'));

    // lanes
    PLAN.tracks.forEach(function (tr) {
      var tasks = PLAN.tasks.filter(function (t) { return t.track === tr.id; })
        .sort(function (a, b) { return a.due < b.due ? -1 : 1; });
      var lane = el('<div class="lane" style="--tc:' + tr.color + '"><div class="lbl">' + esc(tr.name) + "</div></div>");
      var rows = [];
      tasks.forEach(function (t) {
        var label = t.title.length > 19 ? t.title.slice(0, 18).replace(/\s+\S*$/, "") + "…" : t.title;
        var w = Math.min(9 + label.length * 6.2 + 9, 150);
        var left = x(t.due) - 4;
        var ri = 0;
        while (ri < rows.length && left < rows[ri] + 4) ri++;
        rows[ri] = left + w;
        var pill = el('<button class="pill' + (t.hard ? " hard" : "") + (isDone(t.id) ? " done" : "") +
          '" style="left:' + left + "px;top:" + (10 + ri * 30) + 'px" title="' + esc(t.title) + '">' + esc(label) + "</button>");
        pill.addEventListener("click", function () { openSheet(t.id); });
        lane.appendChild(pill);
      });
      lane.style.height = (18 + Math.max(rows.length, 1) * 30) + "px";
      inner.appendChild(lane);
    });

    // hard-gate cards
    var gc = document.getElementById("gatecards");
    gc.innerHTML = "";
    PLAN.gates.forEach(function (g) {
      var dn = daysUntil(g.date);
      var when = dn > 1 ? "in " + dn + " days" : dn === 1 ? "tomorrow" : dn === 0 ? "today" : "passed";
      gc.appendChild(el('<div class="gcard' + (dn < 0 ? " past" : "") + '"><div class="gl">' + esc(g.label) +
        '</div><div class="gd">' + (g.dateLabel ? esc(g.dateLabel) : fmt(g.date, true)) + '</div><div class="gn">' + when + "</div></div>"));
    });

    // start the view around today
    var sc = document.getElementById("tl-scroll");
    requestAnimationFrame(function () { sc.scrollLeft = Math.max(0, x(tStr) - LBL - 40); });
  }

  /* ---------- TRACKS ---------- */
  function renderTracks() {
    var grid = document.getElementById("trackgrid");
    grid.innerHTML = "";
    PLAN.tracks.forEach(function (tr) {
      var tasks = PLAN.tasks.filter(function (t) { return t.track === tr.id; })
        .sort(function (a, b) { return a.due < b.due ? -1 : 1; });
      var total = tasks.length;
      var done = tasks.filter(function (t) { return isDone(t.id); }).length;
      var next = tasks.filter(function (t) { return !isDone(t.id); })[0];
      var nextHard = tasks.filter(function (t) { return !isDone(t.id) && t.hard; })[0];
      var isChain = PLAN.chain && PLAN.chain.track === tr.id;
      var card = el('<button class="tkcard' + (isChain ? " wide" : "") + '" style="--tc:' + tr.color + '"></button>');
      var C = 2 * Math.PI * 19;
      var frac = total ? done / total : 0;
      card.appendChild(el('<div class="tkhead"><div class="ring"><svg viewBox="0 0 44 44">' +
        '<circle cx="22" cy="22" r="19" fill="none" stroke="var(--line)" stroke-width="3.5"/>' +
        '<circle cx="22" cy="22" r="19" fill="none" stroke="' + tr.color + '" stroke-width="3.5" stroke-linecap="round" ' +
        'stroke-dasharray="' + (C * frac) + " " + C + '"/></svg><div class="n">' + done + "/" + total + "</div></div>" +
        '<div class="tkname">' + esc(tr.name) + "</div></div>"));
      if (next) {
        card.appendChild(el('<div class="tknext">Next: <b>' + esc(next.title) + "</b> · " + fmt(next.due) + "</div>"));
      } else if (!total) {
        card.appendChild(el('<div class="tknext">Runs in its own thread — see the workstreams on Us.</div>'));
      } else {
        card.appendChild(el('<div class="tknext">All done here.</div>'));
      }
      if (nextHard) card.appendChild(el('<div class="tkgate">Hard gate: ' + fmt(nextHard.lastSafe || nextHard.due) + "</div>"));
      if (isChain) card.appendChild(chainEl(tr));
      card.addEventListener("click", function () { openTrack(tr.id); });
      grid.appendChild(card);
    });
  }
  function chainEl(tr) {
    var wrap = el('<div class="chain" style="--tc:' + tr.color + '"></div>');
    var steps = PLAN.chain.steps;
    var doneUpTo = -1;
    steps.forEach(function (s, i) {
      var tid = PLAN.chain.taskMap[s];
      if (tid && isDone(tid) && doneUpTo === i - 1) doneUpTo = i;
    });
    steps.forEach(function (s, i) {
      var tid = PLAN.chain.taskMap[s];
      var done = tid ? isDone(tid) : false;
      if (i) wrap.appendChild(el('<div class="cbar' + (done || i <= doneUpTo ? " done" : "") + '"></div>'));
      wrap.appendChild(el('<div class="cstep"><div class="cdot' + (done ? " done" : i === doneUpTo + 1 ? " next" : "") +
        '"></div><div class="clabel">' + esc(s) + "</div></div>"));
    });
    return wrap;
  }
  function openTrack(trackId) {
    var tr = trackById[trackId];
    var panel = document.getElementById("tdetail");
    document.getElementById("tdtitle").textContent = tr.name;
    document.getElementById("tdtitle").style.color = "";
    var body = document.getElementById("tdbody");
    body.innerHTML = "";
    var tasks = PLAN.tasks.filter(function (t) { return t.track === trackId; })
      .sort(function (a, b) { return a.due < b.due ? -1 : 1; });
    if (!tasks.length) {
      body.appendChild(el('<div class="empty">Nothing tracked here — this one runs in its own thread.</div>'));
    } else {
      var card = el('<div class="card"></div>');
      tasks.forEach(function (t) { card.appendChild(rowEl(t)); });
      body.appendChild(card);
    }
    panel.classList.add("open");
    panel.dataset.track = trackId;
    body.scrollTop = 0;
  }
  document.getElementById("tdback").addEventListener("click", function () {
    document.getElementById("tdetail").classList.remove("open");
  });

  /* ---------- US ---------- */
  function renderUs() {
    var av = document.getElementById("avatars");
    av.innerHTML = "";
    av.appendChild(el('<div class="av"><img src="head-tom.png" alt="Tom">Tom</div>'));
    av.appendChild(el('<div class="av"><img src="head-chelsea.png" alt="Chelsea">Chelsea</div>'));
    av.appendChild(el('<div class="av"><img src="head-oliver.png" alt="Oliver">Oliver</div>'));
    av.appendChild(el('<div class="av"><div class="im">R</div>Ronnie</div>'));
    document.getElementById("movedate").textContent = "We fly on " + fmt(PLAN.moveDate, true) + ".";

    var rail = document.getElementById("rail");
    rail.innerHTML = "";
    [["us-beach.jpg", "The beach, ten minutes from the flats we liked."],
     ["us-swing.jpg", "Chelsea and Oliver, beach swings, El Palo."],
     ["us-gardens.jpg", "The cathedral gardens, out of the sun."],
     ["us-arcade.jpg", "Palms by the cathedral."],
     ["us-lunch.jpg", "Lunch at the beach bar — Oliver approved."]
    ].forEach(function (p) {
      rail.appendChild(el('<figure class="rcard" style="margin:0"><img src="' + p[0] + '" alt="" loading="lazy"><figcaption>' + esc(p[1]) + "</figcaption></figure>"));
    });

    var st = document.getElementById("streams");
    st.innerHTML = "";
    PLAN.streams.forEach(function (s) {
      st.appendChild(el('<div class="stream"><div class="sn">' + esc(s.name) + '</div><div class="ss">' +
        esc(s.status) + '</div><div class="sw">' + esc(s.who) + "</div></div>"));
    });
  }
  var gearBtn = document.getElementById("gear"), gearMenu = document.getElementById("gearmenu");
  gearBtn.addEventListener("click", function (e) { e.stopPropagation(); gearMenu.classList.toggle("open"); });
  document.addEventListener("click", function () { gearMenu.classList.remove("open"); });
  document.getElementById("mi-switch").addEventListener("click", function () { openWho(); });
  document.getElementById("mi-sync").addEventListener("click", function () {
    toast("Syncing…");
    Promise.all([flush(), pull()]).then(function (r) {
      toast(SYNC_URL ? (r[1] ? "Up to date — ticks are shared." : "Sync unreachable — ticks are saved on this phone.")
                     : "Not switched on for shared ticks yet — open the private link once on this phone.");
    });
  });

  /* ---------- SHEET ---------- */
  var sheetTask = null;
  function openSheet(id) {
    var t = byId[id]; if (!t) return;
    sheetTask = id;
    buildSheet(t);
    document.getElementById("backdrop").classList.add("open");
    document.getElementById("sheet").classList.add("open");
  }
  function buildSheet(t) {
    var tr = trackById[t.track] || { name: t.track, color: "#888" };
    var done = isDone(t.id), tk = ticks[t.id] || {};
    var over = !done && daysUntil(t.due) < 0;
    var b = document.getElementById("sheetbody");
    var chips = '<div class="shrow"><span class="tchip" style="--tc:' + tr.color + '">' + esc(tr.name) + "</span>";
    if (t.hard) chips += '<span class="badge b-hard">hard gate</span>';
    if (t.quick) chips += '<span class="badge b-quick">15 min</span>';
    chips += "</div>";
    var who;
    if (t.owner === "tom") who = '<img src="head-tom.png" alt="">';
    else if (t.owner === "chelsea") who = '<img src="head-chelsea.png" alt="">';
    else if (t.owner === "both") who = '<img src="head-tom.png" alt="" style="margin-right:-14px">' + '<img src="head-chelsea.png" alt="">';
    else who = '<div class="im">' + esc(ownerLabel(t.owner).replace("The ", "")[0].toUpperCase()) + "</div>";
    var dates = '<span class="' + (over ? "over" : "") + '">' + (over ? "was due " : "do by ") + fmt(t.due, true) + "</span>";
    if (t.lastSafe && t.lastSafe !== t.due) dates += ' · last safe ' + fmt(t.lastSafe, true);
    b.innerHTML = chips +
      "<h2>" + esc(t.title) + "</h2>" +
      (t.next ? '<div class="next">' + esc(t.next) + "</div>" : "") +
      '<div class="who">' + who + "<span>" + esc(ownerLabel(t.owner)) + "</span></div>" +
      '<div class="dates">' + dates + "</div>" +
      (t.hard && t.miss ? '<div class="miss"><b>If we miss it:</b> ' + esc(t.miss) + "</div>" : "") +
      '<button id="bigtick" class="' + (done ? "isdone" : "") + '">' +
      (done ? "Done by " + esc(tk.by || "someone") + (tk.at ? ", " + fmtStamp(tk.at) : "") + " — tap to undo"
            : "Mark it done") + "</button>";
    document.getElementById("bigtick").addEventListener("click", function () {
      if (!me) { openWho(); return; }
      var nowDone = isDone(t.id);
      doTick(t.id, !nowDone);
      buildSheet(t);
      if (!nowDone) showUndo(t.id); else clearUndo(true);
      renderDirty = true; // stacks refresh when the sheet closes / undo expires
    });
  }
  function closeSheet() {
    document.getElementById("backdrop").classList.remove("open");
    document.getElementById("sheet").classList.remove("open");
    sheetTask = null;
    if (!renderLock && renderDirty) { renderDirty = false; render(); }
  }
  document.getElementById("backdrop").addEventListener("click", closeSheet);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeSheet(); document.getElementById("tdetail").classList.remove("open"); } });

  /* ---------- identity ---------- */
  function openWho() {
    gearMenu.classList.remove("open");
    document.getElementById("who").classList.add("open");
  }
  document.querySelectorAll("#who [data-who]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      me = btn.getAttribute("data-who");
      store("mmt.me", me);
      document.getElementById("who").classList.remove("open");
      render();
    });
  });

  /* ---------- chips ---------- */
  document.querySelectorAll("#chips .chip").forEach(function (c) {
    c.addEventListener("click", function () {
      var v = c.getAttribute("data-chip");
      if (v === "mine" && !me) { openWho(); return; }
      chipView = v;
      store("mmt.appview", v);
      document.querySelectorAll("#chips .chip").forEach(function (x) { x.classList.toggle("on", x === c); });
      renderNow();
    });
  });
  (function () {
    document.querySelectorAll("#chips .chip").forEach(function (x) {
      x.classList.toggle("on", x.getAttribute("data-chip") === chipView);
    });
  })();

  /* ---------- tabs, sidebar, layout ---------- */
  var ICONS = {
    now: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5 5l2.1 2.1M16.9 16.9 19 19M19 5l-2.1 2.1M7.1 16.9 5 19"/></svg>',
    timeline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><path d="M4 6.5h9M8 12h12M4 17.5h7"/><path d="M17 3.5v17" opacity=".45"/></svg>',
    tracks: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><circle cx="12" cy="12" r="8.5" opacity=".35"/><path d="M12 3.5a8.5 8.5 0 0 1 8.5 8.5" stroke-linecap="round"/><circle cx="12" cy="12" r="3.4"/></svg>',
    us: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"><path d="M12 20.5s-7.8-4.9-7.8-10A4.6 4.6 0 0 1 12 7.6a4.6 4.6 0 0 1 7.8 2.9c0 5.1-7.8 10-7.8 10Z"/></svg>'
  };
  var TABS = [["now", "Now"], ["timeline", "Timeline"], ["tracks", "Tracks"], ["us", "Us"]];
  var active = "now";
  var mq = window.matchMedia("(min-width: 900px)");
  function buildNav() {
    var bar = document.getElementById("tabbar");
    var side = document.getElementById("sidebar");
    bar.innerHTML = "";
    TABS.forEach(function (t) {
      var b = el("<button data-tab=\"" + t[0] + "\">" + ICONS[t[0]] + "<span>" + t[1] + "</span></button>");
      b.addEventListener("click", function () { setTab(t[0]); });
      bar.appendChild(b);
      var s = el("<button data-tab=\"" + t[0] + "\">" + ICONS[t[0]] + "<span>" + t[1] + "</span></button>");
      s.addEventListener("click", function () { setTab(t[0]); });
      side.insertBefore(s, document.getElementById("sdays"));
    });
  }
  function relocateViews() {
    var right = document.getElementById("col-right");
    var shell = document.getElementById("shell");
    ["view-timeline", "view-tracks", "view-us"].forEach(function (id) {
      var v = document.getElementById(id);
      if (mq.matches) { if (v.parentElement !== right) right.appendChild(v); }
      else if (v.parentElement !== shell) shell.appendChild(v);
    });
    if (mq.matches && active === "now") active = "timeline";
    setTab(active, true);
  }
  function setTab(tab, silent) {
    if (mq.matches) {
      // desktop: Now is always on screen; the other three swap in the right pane
      if (tab === "now") {
        document.getElementById("col-now").scrollTo({ top: 0, behavior: silent ? "auto" : "smooth" });
      } else {
        active = tab;
      }
      document.querySelectorAll(".view").forEach(function (v) {
        v.classList.toggle("active", v.dataset.view === active);
      });
    } else {
      active = tab;
      document.querySelectorAll(".view").forEach(function (v) {
        v.classList.toggle("active", v.dataset.view === tab);
      });
      window.scrollTo(0, 0);
    }
    document.querySelectorAll("#tabbar button, #sidebar button[data-tab]").forEach(function (b) {
      b.classList.toggle("active", b.dataset.tab === active || (!mq.matches && b.dataset.tab === tab));
    });
    if (active === "timeline") renderTimeline();
  }

  /* ---------- render ---------- */
  function render() {
    if (renderLock) { renderDirty = true; return; }
    renderNow();
    renderTracks();
    renderUs();
    var tdet = document.getElementById("tdetail");
    if (tdet.classList.contains("open") && tdet.dataset.track) openTrack(tdet.dataset.track);
    if (document.getElementById("view-timeline").classList.contains("active")) renderTimeline();
    if (sheetTask && document.getElementById("sheet").classList.contains("open")) buildSheet(byId[sheetTask]);
  }

  /* ---------- boot ---------- */
  buildNav();
  relocateViews();
  mq.addEventListener ? mq.addEventListener("change", relocateViews) : mq.addListener(relocateViews);
  var rsz = null;
  window.addEventListener("resize", function () {
    clearTimeout(rsz);
    rsz = setTimeout(function () { if (document.getElementById("view-timeline").classList.contains("active")) renderTimeline(); }, 180);
  });
  render();
  updateBanner();
  if (!me) openWho();
  flush().then(pull);
  setInterval(function () { pull(); flush(); }, 60000);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) { pull(); flush(); } });
  window.addEventListener("online", function () { flush(); pull(); });

  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
