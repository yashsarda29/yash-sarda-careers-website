/* =====================================================================
   NextMove lead gate
   Asks for name + email (or "Continue with Google") before a Career
   Check test starts and before any report or PDF download.

   SETUP: paste your two values below (see README, "Email capture").
   Until SHEET_ENDPOINT is filled in, the box still appears and visitors
   can continue, but nothing is saved anywhere.
   ===================================================================== */
(function () {
  var CONFIG = {
    SHEET_ENDPOINT: "https://script.google.com/macros/s/AKfycbxRV0q7SqIJOEz89IK5BLLzw1D2qNQ1DpU69m6okRJhN-FzfGIIykhHCfHZa580lq_I5A/exec",   // Google Apps Script web app ("NextMove leads" sheet, yashsarda21@gmail.com)
    GOOGLE_CLIENT_ID: "1093729567613-e6n18ukd52ivouosapd7ikq0phn97lsk.apps.googleusercontent.com"  // Google Cloud project "nextmove-careers", client "NextMove website"
  };

  /* privacy.html sits next to this script, wherever the page is */
  var PRIVACY_URL = (document.currentScript && document.currentScript.src || "").replace(/lead-gate\.js.*$/, "privacy.html") || "privacy.html";
  var KEY = "nextmove-lead";   // remembered in this browser so people are asked only once
  var read = function () { try { return JSON.parse(localStorage.getItem(KEY) || "null"); } catch (e) { return null; } };
  var remember = function (v) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} };
  var known = function () { var l = read(); return !!(l && l.email && l.phone); };

  /* Indian mobile numbers: 10 digits, with or without +91 / 0 in front. Returns +91XXXXXXXXXX or "" */
  function cleanPhone(v) {
    var d = String(v || "").replace(/\D/g, "");
    if (d.length === 12 && d.indexOf("91") === 0) d = d.slice(2);
    if (d.length === 11 && d[0] === "0") d = d.slice(1);
    return /^[6-9]\d{9}$/.test(d) ? "+91" + d : "";
  }

  /* Send one row to the Google Sheet (fire-and-forget; never blocks the visitor) */
  function send(lead, source) {
    if (!CONFIG.SHEET_ENDPOINT || !lead) return;
    var body = new URLSearchParams({ name: lead.name || "", email: lead.email || "", phone: lead.phone || "", method: lead.method || "", source: source || "", page: location.pathname });
    try { fetch(CONFIG.SHEET_ENDPOINT, { method: "POST", mode: "no-cors", body: body, keepalive: true }); } catch (e) {}
  }

  /* ---------- Styles (kept here so one file does everything) ---------- */
  var css = "" +
    ".lg-backdrop{position:fixed;inset:0;z-index:200;display:grid;place-items:center;padding:16px;background:rgba(11,27,43,.55);backdrop-filter:blur(4px);animation:lgFade .2s both}" +
    ".lg-box{position:relative;width:100%;max-width:420px;background:#fff;color:#0B1B2B;border-radius:24px;padding:28px 26px 22px;box-shadow:0 40px 80px -30px rgba(0,0,0,.5);font-family:inherit;animation:lgRise .3s cubic-bezier(.2,.8,.2,1) both}" +
    ".lg-x{position:absolute;top:12px;right:12px;width:36px;height:36px;border-radius:50%;border:0;background:#F4F6F8;color:#0B1B2B;font-size:20px;line-height:1;cursor:pointer}" +
    ".lg-kicker{display:block;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:#0A66C2}" +
    ".lg-box h2{font-size:1.5rem;line-height:1.1;letter-spacing:-.03em;margin:8px 0 6px}" +
    ".lg-sub{color:#4A5868;font-size:.95rem;margin:0 0 18px}" +
    ".lg-google{display:flex;justify-content:center;min-height:44px}" +
    ".lg-or{display:flex;align-items:center;gap:10px;margin:16px 0;color:#4A5868;font-size:.8rem}" +
    ".lg-or::before,.lg-or::after{content:'';flex:1;height:1px;background:rgba(11,27,43,.12)}" +
    ".lg-box label{display:block;font-size:.85rem;font-weight:600;margin-bottom:12px}" +
    ".lg-box input{display:block;width:100%;margin-top:6px;padding:12px 14px;border-radius:12px;border:1.5px solid rgba(11,27,43,.15);font:inherit;font-weight:400;color:#0B1B2B;background:#fff}" +
    ".lg-box input:focus{outline:none;border-color:#0A66C2;box-shadow:0 0 0 3px rgba(10,102,194,.15)}" +
    ".lg-go{width:100%;margin-top:4px;padding:14px;border:0;border-radius:999px;background:#0A66C2;color:#fff;font:inherit;font-weight:600;cursor:pointer}" +
    ".lg-go:hover{background:#004182}" +
    ".lg-err{color:#B42318;font-size:.85rem;margin:-4px 0 10px;min-height:0}" +
    ".lg-note{color:#4A5868;font-size:.78rem;margin:12px 0 0;text-align:center}.lg-note a{color:#0A66C2;text-decoration:underline}" +
    "@keyframes lgFade{from{opacity:0}}@keyframes lgRise{from{opacity:0;transform:translateY(16px)}}" +
    "@media (prefers-reduced-motion:reduce){.lg-backdrop,.lg-box{animation:none}}";
  var style = document.createElement("style"); style.textContent = css; document.head.appendChild(style);

  /* ---------- Google sign-in (only when a client ID is set) ---------- */
  var googleReady = null;
  function loadGoogle() {
    if (!CONFIG.GOOGLE_CLIENT_ID) return Promise.reject();
    return googleReady || (googleReady = new Promise(function (ok, fail) {
      var s = document.createElement("script");
      s.src = "https://accounts.google.com/gsi/client"; s.async = true;
      s.onload = ok; s.onerror = function () { googleReady = null; fail(); };
      document.head.appendChild(s);
    }));
  }
  function decodeJwt(token) {
    var part = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    while (part.length % 4) part += "=";
    return JSON.parse(decodeURIComponent(Array.prototype.map.call(atob(part), function (c) { return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2); }).join("")));
  }

  /* ---------- The box ---------- */
  function open(opts) {
    var prev = document.activeElement;
    var wrap = document.createElement("div");
    wrap.className = "lg-backdrop";
    wrap.innerHTML =
      '<form class="lg-box" role="dialog" aria-modal="true" aria-labelledby="lgTitle" novalidate>' +
        '<button type="button" class="lg-x" aria-label="Close">&times;</button>' +
        '<span class="lg-kicker">NextMove Careers</span>' +
        '<h2 id="lgTitle"></h2>' +
        '<p class="lg-sub">Enter your details to continue. It takes 15 seconds.</p>' +
        (CONFIG.GOOGLE_CLIENT_ID ? '<div class="lg-google" id="lgGoogle"></div><div class="lg-or">or</div>' : "") +
        '<label>Your name<input name="name" autocomplete="name" maxlength="80" required></label>' +
        '<label>Email<input name="email" type="email" autocomplete="email" maxlength="120" required></label>' +
        '<label>Mobile number<input name="phone" type="tel" inputmode="tel" autocomplete="tel" maxlength="16" placeholder="10-digit mobile number" required></label>' +
        '<p class="lg-err" role="alert"></p>' +
        '<button class="lg-go" type="submit">Continue</button>' +
        '<p class="lg-note">We save your name, email and number so Yash can follow up. We never share them. <a href="' + PRIVACY_URL + '" target="_blank" rel="noopener">Privacy policy</a></p>' +
      "</form>";
    wrap.querySelector("#lgTitle").textContent = opts.title || "Before you continue";
    document.body.appendChild(wrap);
    var form = wrap.querySelector("form"), err = wrap.querySelector(".lg-err");
    var first = form.querySelector('input[name="name"]');
    setTimeout(function () { first.focus(); }, 50);

    var done = false;
    function close(ok, lead) {
      if (done) return; done = true;
      wrap.remove(); document.removeEventListener("keydown", onKey);
      if (prev && prev.focus) prev.focus();
      if (ok) { remember(lead); send(lead, opts.source); opts.then && opts.then(lead); }
      else if (opts.cancel) opts.cancel();
    }
    function onKey(e) {
      if (e.key === "Escape") close(false);
      if (e.key === "Tab") { /* keep focus inside the box */
        var f = form.querySelectorAll("button, input, iframe"); if (!f.length) return;
        var a = f[0], z = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    wrap.querySelector(".lg-x").addEventListener("click", function () { close(false); });
    wrap.addEventListener("mousedown", function (e) { if (e.target === wrap) close(false); });

    var nameEl = form.querySelector('input[name="name"]'), emailEl = form.querySelector('input[name="email"]'), phoneEl = form.querySelector('input[name="phone"]');
    var method = "Email form";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = nameEl.value.trim(), email = emailEl.value.trim(), phone = cleanPhone(phoneEl.value);
      if (!name) { err.textContent = "Please enter your name."; nameEl.focus(); return; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { err.textContent = "Please enter a valid email address."; emailEl.focus(); return; }
      if (!phone) { err.textContent = "Please enter a valid 10-digit mobile number."; phoneEl.focus(); return; }
      close(true, { name: name, email: email, phone: phone, method: method, at: new Date().toISOString() });
    });

    if (CONFIG.GOOGLE_CLIENT_ID) {
      loadGoogle().then(function () {
        if (done) return;
        google.accounts.id.initialize({
          client_id: CONFIG.GOOGLE_CLIENT_ID,
          callback: function (resp) {
            try {
              /* Google gives name and email; the visitor still adds their mobile number */
              var p = decodeJwt(resp.credential);
              nameEl.value = p.name || nameEl.value; emailEl.value = p.email || emailEl.value;
              method = "Google";
              err.textContent = "";
              form.querySelector(".lg-sub").textContent = "Signed in with Google. Add your mobile number to continue.";
              phoneEl.focus();
            } catch (x) { err.textContent = "Google sign-in didn't work. Please use the form instead."; }
          }
        });
        google.accounts.id.renderButton(wrap.querySelector("#lgGoogle"), { theme: "outline", size: "large", text: "continue_with", shape: "pill", width: 300 });
      }).catch(function () {
        var g = wrap.querySelector("#lgGoogle"), or = wrap.querySelector(".lg-or");
        if (g) g.remove(); if (or) or.remove();
      });
    }
  }

  /* ---------- Public: run `then` once we know who the visitor is ---------- */
  function require(source, then, opts) {
    opts = opts || {};
    if (known()) { send(read(), source); then(read()); return; }
    open({ source: source, then: then, cancel: opts.cancel, title: opts.title });
  }
  window.LeadGate = { require: require, known: known };

  /* Every downloadable PDF on the site goes through the box first */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href$=".pdf"]');
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    var what = "Download: " + (a.getAttribute("href").split("/").pop() || "PDF");
    if (known()) { send(read(), what); return; }        // let the download carry on
    e.preventDefault();
    require(what, function () {
      var d = document.createElement("a");
      d.href = a.href; d.setAttribute("download", ""); document.body.appendChild(d); d.click(); d.remove();
    }, { title: "Get your free download" });
  });
})();
