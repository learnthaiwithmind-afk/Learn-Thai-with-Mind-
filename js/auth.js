/* ═══════════════════════════════════════════════════════
   AUTH UI — Learn Thai with Mind
   Sign-in / Create Account modal (UI prototype)
   No real backend — demonstrates the UX flow only.
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  const KEY      = 'ltm_user';
  const getUser  = () => JSON.parse(localStorage.getItem(KEY) || 'null');
  const setUser  = u  => localStorage.setItem(KEY, JSON.stringify(u));
  const clearUser    = () => localStorage.removeItem(KEY);
  const isLoggedIn   = () => !!getUser();

  /* ─── Inject sign-in button into nav ──────────────── */
  function injectSignInBtn() {
    if (document.getElementById('nav-user-btn')) return;
    const ham = document.querySelector('.nav-hamburger');
    if (!ham) return;
    let actions = document.getElementById('nav-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.id = 'nav-actions';
      ham.parentNode.insertBefore(actions, ham);
    }
    const btn = document.createElement('button');
    btn.id        = 'nav-user-btn';
    btn.className = 'nav-icon-btn nav-user-btn';
    btn.title     = 'Sign in';
    btn.innerHTML = `
      <span class="nav-user-avatar" id="nav-user-avatar" style="display:none"></span>
      <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
      <span id="nav-user-label">Sign In</span>`;
    btn.onclick = () => openModal();
    /* Insert BEFORE the cart button so order is: [Sign In] [Cart] [☰] */
    actions.insertBefore(btn, actions.firstChild);
  }

  function updateNavUser() {
    const u      = getUser();
    const avatar = document.getElementById('nav-user-avatar');
    const label  = document.getElementById('nav-user-label');
    if (!avatar || !label) return;
    if (u) {
      avatar.textContent  = (u.name || '?')[0].toUpperCase();
      avatar.style.display = 'flex';
      label.textContent   = u.name.split(' ')[0];
    } else {
      avatar.style.display = 'none';
      label.textContent   = 'Sign In';
    }
  }

  /* ─── Modal HTML ───────────────────────────────────── */
  const GOOGLE_SVG = `<svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"/>
    <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z"/>
  </svg>`;

  function ensureModal() {
    if (document.getElementById('auth-wrap')) return;
    const wrap = document.createElement('div');
    wrap.id = 'auth-wrap';
    wrap.innerHTML = `
      <div id="auth-overlay" onclick="LTMAuth.close()"></div>
      <div id="auth-modal" role="dialog" aria-modal="true" aria-label="Sign in to Learn Thai with Mind">

        <button class="auth-x" onclick="LTMAuth.close()" aria-label="Close">✕</button>

        <div class="auth-logo-wrap">
          <img src="images/logo.png" alt="Learn Thai with Mind" class="auth-logo-img"
               onerror="this.style.display='none'">
        </div>

        <div class="auth-notice" id="auth-notice" style="display:none"></div>

        <!-- Tab bar (hidden when user panel is active) -->
        <div class="auth-tabs" id="auth-tabs">
          <button class="auth-tab active" data-tab="signin" onclick="LTMAuth.tab('signin')">Sign In</button>
          <button class="auth-tab"        data-tab="signup" onclick="LTMAuth.tab('signup')">Create Account</button>
        </div>

        <!-- ── Sign In panel ───────────────────────── -->
        <div class="auth-panel active" id="auth-panel-signin">
          <button class="auth-google-btn" onclick="LTMAuth._google()">
            ${GOOGLE_SVG} Continue with Google
          </button>
          <div class="auth-or"><span>or sign in with email</span></div>
          <form onsubmit="LTMAuth._signin(event)" autocomplete="on">
            <div class="auth-field">
              <label for="si-email">Email address</label>
              <input type="email" id="si-email" placeholder="you@example.com" required autocomplete="email">
            </div>
            <div class="auth-field">
              <label for="si-pass">Password</label>
              <input type="password" id="si-pass" placeholder="••••••••" required minlength="6" autocomplete="current-password">
            </div>
            <div class="auth-opts">
              <label class="auth-check"><input type="checkbox"> Keep me signed in</label>
              <a href="#" class="auth-forgot" onclick="event.preventDefault();alert('Password reset link sent! (UI demo only)')">Forgot?</a>
            </div>
            <button type="submit" class="btn btn-yellow auth-submit" id="si-btn">Sign In</button>
          </form>
          <p class="auth-switch">No account yet? <a href="#" onclick="LTMAuth.tab('signup');return false;">Create one free →</a></p>
        </div>

        <!-- ── Create Account panel ────────────────── -->
        <div class="auth-panel" id="auth-panel-signup">
          <button class="auth-google-btn" onclick="LTMAuth._google()">
            ${GOOGLE_SVG} Sign up with Google
          </button>
          <div class="auth-or"><span>or create with email</span></div>
          <form onsubmit="LTMAuth._signup(event)" autocomplete="on">
            <div class="auth-field">
              <label for="su-name">Full name</label>
              <input type="text" id="su-name" placeholder="Your name" required autocomplete="name">
            </div>
            <div class="auth-field">
              <label for="su-email">Email address</label>
              <input type="email" id="su-email" placeholder="you@example.com" required autocomplete="email">
            </div>
            <div class="auth-field">
              <label for="su-pass">Password</label>
              <input type="password" id="su-pass" placeholder="Minimum 6 characters" required minlength="6" autocomplete="new-password">
            </div>
            <button type="submit" class="btn btn-yellow auth-submit" id="su-btn">Create Account</button>
          </form>
          <p class="auth-switch">Already have an account? <a href="#" onclick="LTMAuth.tab('signin');return false;">Sign in →</a></p>
          <p class="auth-terms">By signing up you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.</p>
        </div>

        <!-- ── Logged-in panel ──────────────────────── -->
        <div class="auth-panel" id="auth-panel-user">
          <div class="auth-user-card" id="auth-user-card"></div>
          <nav class="auth-user-menu" aria-label="Account menu">
            <a href="#" class="auth-menu-link">🎓 My Courses</a>
            <a href="#" class="auth-menu-link">📚 My Books</a>
            <a href="#" class="auth-menu-link">⚙️ Account Settings</a>
          </nav>
          <button class="btn btn-outline auth-submit" style="margin-top:24px;width:100%;justify-content:center;"
                  onclick="LTMAuth._signout()">Sign Out</button>
        </div>

      </div>`;
    document.body.appendChild(wrap);
  }

  /* ─── Open / close ────────────────────────────────── */
  function openModal(notice) {
    ensureModal();
    const u = getUser();
    if (u) { showPanel('user'); renderUserCard(); }
    else    { showPanel('signin'); }

    const noticeEl = document.getElementById('auth-notice');
    if (noticeEl) {
      if (notice) { noticeEl.innerHTML = `🔒 ${notice}`; noticeEl.style.display = 'block'; }
      else          noticeEl.style.display = 'none';
    }
    document.getElementById('auth-wrap').classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    document.getElementById('auth-wrap')?.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  function showPanel(name) {
    document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`auth-panel-${name}`)?.classList.add('active');
    const tabs = document.getElementById('auth-tabs');
    if (tabs) tabs.style.display = name === 'user' ? 'none' : 'flex';
    document.querySelectorAll('.auth-tab').forEach(t =>
      t.classList.toggle('active', t.dataset.tab === name));
  }

  function switchTab(name) {
    showPanel(name);
    const noticeEl = document.getElementById('auth-notice');
    if (noticeEl) noticeEl.style.display = 'none';
  }

  /* ─── Auth actions ────────────────────────────────── */
  function googleSignIn() {
    finishAuth({ name: 'Google User', email: 'user@gmail.com', method: 'google' });
  }

  function signIn(e) {
    e.preventDefault();
    const btn = document.getElementById('si-btn');
    btn.textContent = 'Signing in…'; btn.disabled = true;
    setTimeout(() => {
      const email = document.getElementById('si-email').value;
      const name  = email.split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      finishAuth({ name, email });
      btn.textContent = 'Sign In'; btn.disabled = false;
    }, 900);
  }

  function signUp(e) {
    e.preventDefault();
    const btn = document.getElementById('su-btn');
    btn.textContent = 'Creating account…'; btn.disabled = true;
    setTimeout(() => {
      finishAuth({
        name:  document.getElementById('su-name').value,
        email: document.getElementById('su-email').value,
      });
      btn.textContent = 'Create Account'; btn.disabled = false;
    }, 900);
  }

  function finishAuth(user) {
    setUser(user);
    updateNavUser();
    showPanel('user');
    renderUserCard();
    setTimeout(closeModal, 2000);
  }

  function renderUserCard() {
    const u  = getUser();
    const el = document.getElementById('auth-user-card');
    if (!u || !el) return;
    el.innerHTML = `
      <div class="auth-avatar-lg">${(u.name || '?')[0].toUpperCase()}</div>
      <div class="auth-user-info">
        <strong>Welcome back, ${u.name.split(' ')[0]}!</strong>
        <span>${u.email}</span>
      </div>`;
  }

  function signOut() {
    clearUser();
    updateNavUser();
    closeModal();
    toast('Signed out successfully.');
  }

  /* ─── Toast helper ────────────────────────────────── */
  function toast(msg) {
    let t = document.getElementById('ltm-toast');
    if (!t) { t = document.createElement('div'); t.id = 'ltm-toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ─── Public API ──────────────────────────────────── */
  window.LTMAuth = {
    open:       openModal,
    close:      closeModal,
    tab:        switchTab,
    isLoggedIn,
    _google:    googleSignIn,
    _signin:    signIn,
    _signup:    signUp,
    _signout:   signOut,
  };

  /* ─── Boot ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectSignInBtn();
    updateNavUser();
    /* Wire up [data-enroll] buttons — require login to access courses */
    document.querySelectorAll('[data-enroll]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        if (!isLoggedIn()) {
          openModal('Sign in to access this course');
        } else {
          toast('🎉 Enrolled! Course access is coming soon — we\'ll email you when it\'s live.');
        }
      });
    });
  });
})();
