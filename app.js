/* ==========================================================================
   AYOUB BNINA — V2 DARK TECH INTERACTIVE ENGINE
   - Ambient Interactive Particle Constellation Background
   - Cursor Spotlight Glow & 3D Perspective Tilt HUD Deck
   - Live Sweeping C-UAS Radar Canvas + Live PID Oscilloscope Waveform
   - Typewriter Cycling Role Ticker & Scroll-Triggered Count-Up KPIs
   - Organized Tabbed Workbench, Animated Benchmarks & Teknofest Gallery
   - Hover-to-Play Live Bench Videos + Full HD Lightbox
   - Interactive ⌘K / Ctrl+K Engineer Command Terminal
   ========================================================================== */

(() => {
  'use strict';

  /* ---------- 1. AMBIENT INTERACTIVE PARTICLE CONSTELLATION ---------- */
  const bg = document.getElementById('bgCanvas');
  if (bg) {
    const bctx = bg.getContext('2d');
    let bw = window.innerWidth;
    let bh = window.innerHeight;
    let ptr = { x: -999, y: -999 };
    const nodes = [];
    const COUNT = Math.min(58, Math.floor((bw * bh) / 28000));

    function initBg() {
      bw = window.innerWidth;
      bh = window.innerHeight;
      bg.width = bw;
      bg.height = bh;
      nodes.length = 0;
      for (let i = 0; i < COUNT; i++) {
        nodes.push({
          x: Math.random() * bw,
          y: Math.random() * bh,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.4 + 0.6
        });
      }
    }
    initBg();
    window.addEventListener('resize', initBg);
    window.addEventListener('mousemove', e => { ptr.x = e.clientX; ptr.y = e.clientY; }, { passive: true });

    function drawBg() {
      bctx.clearRect(0, 0, bw, bh);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < 0 || a.x > bw) a.vx *= -1;
        if (a.y < 0 || a.y > bh) a.vy *= -1;

        bctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        bctx.beginPath();
        bctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        bctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 135) {
            bctx.strokeStyle = `rgba(56, 189, 248, ${(1 - d / 135) * 0.12})`;
            bctx.lineWidth = 0.8;
            bctx.beginPath();
            bctx.moveTo(a.x, a.y);
            bctx.lineTo(b.x, b.y);
            bctx.stroke();
          }
        }
        const md = Math.hypot(a.x - ptr.x, a.y - ptr.y);
        if (md < 170) {
          bctx.strokeStyle = `rgba(52, 211, 153, ${(1 - md / 170) * 0.22})`;
          bctx.lineWidth = 1;
          bctx.beginPath();
          bctx.moveTo(a.x, a.y);
          bctx.lineTo(ptr.x, ptr.y);
          bctx.stroke();
        }
      }
      requestAnimationFrame(drawBg);
    }
    drawBg();
  }

  /* ---------- 2. CURSOR SPOTLIGHT SHEEN ON ALL BENTO CARDS ---------- */
  document.addEventListener('mousemove', e => {
    const card = e.target.closest('.bento');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });

  /* ---------- 3. 3D PERSPECTIVE TILT ON HERO HUD DECK ---------- */
  const tiltDeck = document.getElementById('tiltDeck');
  if (tiltDeck && window.matchMedia('(pointer:fine)').matches) {
    tiltDeck.addEventListener('mousemove', e => {
      const r = tiltDeck.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      tiltDeck.style.transform = `rotateY(${px * 7}deg) rotateX(${-py * 6}deg)`;
    });
    tiltDeck.addEventListener('mouseleave', () => {
      tiltDeck.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ---------- 4. CYCLING TYPEWRITER ROLE TICKER ---------- */
  const typeEl = document.getElementById('typewriter');
  const phrases = [
    'Zephyr RTOS Upstream Silicon Contributor (NXP MCXA eQDC)',
    'AeroTrack C-UAS HIL Architect · 130.7 FPS / 2.9 ms BCET',
    'Team Leader · TEKNOFEST Team OMÜ SUNGUR',
    'IEEE Sensors Journal Manuscript · Currently Under Review',
    'STM32 · NXP MCX · FreeRTOS · ThreadX · ROS 2 / micro-ROS'
  ];
  if (typeEl) {
    let pIdx = 0;
    let cIdx = phrases[0].length;
    let deleting = true;
    setTimeout(function tick() {
      const target = phrases[pIdx];
      if (!deleting) {
        cIdx++;
        typeEl.textContent = target.slice(0, cIdx);
        if (cIdx === target.length) {
          deleting = true;
          setTimeout(tick, 2200);
          return;
        }
        setTimeout(tick, 34);
      } else {
        cIdx--;
        typeEl.textContent = target.slice(0, cIdx);
        if (cIdx === 0) {
          deleting = false;
          pIdx = (pIdx + 1) % phrases.length;
          setTimeout(tick, 260);
          return;
        }
        setTimeout(tick, 18);
      }
    }, 2400);
  }

  /* ---------- 5. SCROLL REVEAL + ANIMATED COUNT-UP NUMBERS + NAV ACTIVE ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in-view');
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        if (el.dataset.counted) return;
        el.dataset.counted = '1';
        const end = parseFloat(el.dataset.count);
        const dec = parseInt(el.dataset.decimals || '0', 10);
        const suf = el.dataset.suffix || '';
        const dur = 950;
        const t0 = performance.now();
        function step(now) {
          const p = Math.min(1, (now - t0) / dur);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = `${(end * ease).toFixed(dec)}${suf}`;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
      revObs.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  reveals.forEach(el => revObs.observe(el));

  const navLinks = Array.from(document.querySelectorAll('.nav-pills a'));
  const navSecs = navLinks.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  window.addEventListener('scroll', () => {
    const pos = window.scrollY + 180;
    let cur = navSecs[0];
    for (const s of navSecs) if (s.offsetTop <= pos) cur = s;
    navLinks.forEach(a => a.classList.toggle('active', cur && a.getAttribute('href') === `#${cur.id}`));
  }, { passive: true });

  /* ---------- 6. LIVE C-UAS RADAR CANVAS + PID OSCILLOSCOPE ---------- */
  const radar = document.getElementById('radarCanvas');
  const osc = document.getElementById('oscCanvas');
  const modeEarlyBtn = document.getElementById('modeEarlyExit');
  const modeFullBtn = document.getElementById('modeFull');
  const hudModeLabel = document.getElementById('hudModeLabel');
  const hudFlops = document.getElementById('hudFlops');
  const hudFps = document.getElementById('hudFps');
  const hudLat = document.getElementById('hudLat');
  const hudLockId = document.getElementById('hudLockId');
  const hudCursor = document.getElementById('hudCursor');

  let earlyExitMode = true;
  if (modeEarlyBtn && modeFullBtn) {
    modeEarlyBtn.addEventListener('click', () => {
      earlyExitMode = true;
      modeEarlyBtn.classList.add('active');
      modeFullBtn.classList.remove('active');
      hudModeLabel.textContent = 'GATE: P3 EARLY-EXIT';
      hudFlops.textContent = '13.46 GFLOPs (−52%)';
      hudFps.textContent = '130.7 FPS';
      hudLat.textContent = 'BCET 2.9 ms';
    });
    modeFullBtn.addEventListener('click', () => {
      earlyExitMode = false;
      modeFullBtn.classList.add('active');
      modeEarlyBtn.classList.remove('active');
      hudModeLabel.textContent = 'GATE: FULL P3/P4/P5';
      hudFlops.textContent = '28.24 GFLOPs (100%)';
      hudFps.textContent = '117.9 FPS';
      hudLat.textContent = 'MEAN 8.5 ms';
    });
  }

  if (radar) {
    const rctx = radar.getContext('2d');
    let rw = 440, rh = 244, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const drones = [
      { id: 'TRK-01', r: 0.34, a: 0.4, v: 0.0045, c: 97 },
      { id: 'TRK-02', r: 0.56, a: 1.5, v: -0.0032, c: 94 },
      { id: 'TRK-03', r: 0.72, a: 2.7, v: 0.0028, c: 92 },
      { id: 'TRK-04', r: 0.44, a: 4.0, v: 0.0037, c: 98 },
      { id: 'TRK-05', r: 0.64, a: 5.2, v: -0.0025, c: 95 }
    ];
    let sweep = 0;
    let m = { x: 0, y: 0, on: false };

    function resizeRadar() {
      const rect = radar.getBoundingClientRect();
      rw = Math.max(240, rect.width);
      rh = Math.max(200, rect.height);
      radar.width = rw * dpr;
      radar.height = rh * dpr;
      rctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeRadar();
    window.addEventListener('resize', resizeRadar);

    radar.addEventListener('mousemove', e => {
      const rect = radar.getBoundingClientRect();
      m.x = e.clientX - rect.left;
      m.y = e.clientY - rect.top;
      m.on = true;
      const az = ((Math.atan2(m.y - rh / 2, m.x - rw / 2) * 180) / Math.PI + 450) % 360;
      hudCursor.textContent = `AZ ${String(Math.round(az)).padStart(3, '0')}° · TRACKING`;
    });
    radar.addEventListener('mouseleave', () => {
      m.on = false;
      hudCursor.textContent = 'AUTO NWD LOCK';
    });

    function drawRadar() {
      rctx.clearRect(0, 0, rw, rh);
      const cx = rw / 2, cy = rh / 2, maxR = Math.min(rw, rh) * 0.42;

      rctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
      rctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        rctx.beginPath();
        rctx.arc(cx, cy, (maxR / 4) * i, 0, Math.PI * 2);
        rctx.stroke();
      }
      rctx.beginPath();
      rctx.moveTo(cx - maxR - 10, cy); rctx.lineTo(cx + maxR + 10, cy);
      rctx.moveTo(cx, cy - maxR - 10); rctx.lineTo(cx, cy + maxR + 10);
      rctx.stroke();

      sweep = (sweep + (earlyExitMode ? 0.025 : 0.015)) % (Math.PI * 2);
      for (let i = 0; i < 20; i++) {
        const a0 = sweep - (i / 20) * 0.62;
        const a1 = sweep - ((i + 1) / 20) * 0.62;
        rctx.beginPath();
        rctx.moveTo(cx, cy);
        rctx.arc(cx, cy, maxR, a1, a0);
        rctx.closePath();
        rctx.fillStyle = earlyExitMode
          ? `rgba(56, 189, 248, ${(1 - i / 20) * 0.18})`
          : `rgba(52, 211, 153, ${(1 - i / 20) * 0.18})`;
        rctx.fill();
      }

      rctx.strokeStyle = earlyExitMode ? 'rgba(56, 189, 248, 0.85)' : 'rgba(52, 211, 153, 0.85)';
      rctx.lineWidth = 1.5;
      rctx.beginPath();
      rctx.moveTo(cx, cy);
      rctx.lineTo(cx + Math.cos(sweep) * maxR, cy + Math.sin(sweep) * maxR);
      rctx.stroke();

      const pts = drones.map(d => {
        d.a += d.v;
        return { ...d, x: cx + Math.cos(d.a) * d.r * maxR, y: cy + Math.sin(d.a) * d.r * maxR };
      });

      let lock = pts[3];
      if (m.on) {
        let best = Infinity;
        for (const p of pts) {
          const dist = Math.hypot(p.x - m.x, p.y - m.y);
          if (dist < best) { best = dist; lock = p; }
        }
      }
      hudLockId.textContent = `LOCK: ${lock.id} [${lock.c}%]`;

      for (const p of pts) {
        const isL = p.id === lock.id;
        rctx.fillStyle = isL ? '#fb7185' : '#34d399';
        rctx.beginPath();
        rctx.arc(p.x, p.y, isL ? 3.5 : 2.5, 0, Math.PI * 2);
        rctx.fill();

        const b = isL ? 11 : 7;
        rctx.strokeStyle = isL ? '#fb7185' : 'rgba(56, 189, 248, 0.6)';
        rctx.lineWidth = isL ? 1.5 : 1;
        rctx.strokeRect(p.x - b, p.y - b, b * 2, b * 2);

        if (isL) {
          rctx.font = '600 9.5px "JetBrains Mono", monospace';
          rctx.fillStyle = '#fb7185';
          rctx.fillText(p.id, p.x + 14, p.y - 3);
        }
      }

      if (m.on) {
        rctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        rctx.lineWidth = 1;
        rctx.beginPath();
        rctx.arc(m.x, m.y, 13, 0, Math.PI * 2);
        rctx.stroke();
      }
      requestAnimationFrame(drawRadar);
    }
    drawRadar();
  }

  // Live PID Oscilloscope Trace
  if (osc) {
    const octx = osc.getContext('2d');
    let phase = 0;
    function drawOsc() {
      const rect = osc.getBoundingClientRect();
      const ow = Math.max(200, rect.width), oh = 44;
      osc.width = ow;
      osc.height = oh;
      octx.clearRect(0, 0, ow, oh);

      // Centerline
      octx.strokeStyle = 'rgba(255,255,255,0.08)';
      octx.beginPath();
      octx.moveTo(0, oh / 2);
      octx.lineTo(ow, oh / 2);
      octx.stroke();

      phase += 0.045;
      // Pan velocity wave (cyan)
      octx.strokeStyle = '#38bdf8';
      octx.lineWidth = 1.6;
      octx.beginPath();
      for (let x = 0; x < ow; x += 3) {
        const damp = Math.exp(-((x / ow) * 1.4));
        const y = oh / 2 + Math.sin(x * 0.045 - phase) * 14 * damp + Math.sin(x * 0.11 - phase * 1.4) * 3;
        x === 0 ? octx.moveTo(x, y) : octx.lineTo(x, y);
      }
      octx.stroke();

      // Tilt EMA filtered wave (emerald)
      octx.strokeStyle = '#34d399';
      octx.lineWidth = 1.4;
      octx.beginPath();
      for (let x = 0; x < ow; x += 3) {
        const y = oh / 2 + Math.cos(x * 0.032 - phase * 0.85) * 8;
        x === 0 ? octx.moveTo(x, y) : octx.lineTo(x, y);
      }
      octx.stroke();

      requestAnimationFrame(drawOsc);
    }
    drawOsc();
  }

  /* ---------- 7. GENERIC ORGANIZED TAB GROUPS (AEROTRACK + CAREER) ---------- */
  document.querySelectorAll('[data-tab-group]').forEach(bar => {
    const group = bar.dataset.tabGroup;
    const btns = Array.from(bar.querySelectorAll('.tab-btn'));
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.tab;
        btns.forEach(b => b.classList.toggle('active', b === btn));
        document.querySelectorAll(`[data-panel^="${group}:"]`).forEach(p => {
          p.classList.toggle('active', p.dataset.panel === `${group}:${target}`);
        });
      });
    });
  });

  /* ---------- 8. INTERACTIVE 4-NODE HIL SIGNAL INSPECTOR ---------- */
  const hilData = [
    {
      title: 'Node 01 · NVIDIA Isaac Sim + ROS 2 Digital Twin',
      desc: 'Photorealistic Counter-UAS simulation spawning 20 kamikaze drones with physics-based pan-tilt actuation. Bridges synthetic telemetry to AeroTrack, runs EMA smoothing (α = 0.60), and executes asymmetrical PID visual servoing.',
      tags: ['NVIDIA Isaac Sim', 'ROS 2', 'EMA α=0.60', 'Asymmetrical PID', '85.1% IDF1'],
      code: `TOPIC: /anti_uav/joint_command\nTYPE : sensor_msgs/msg/JointState\nCTRL : Pan=Velocity | Tilt=Position\nLOOP : 8.35 ms E2E (119.8 FPS)`,
      url: 'https://github.com/bnina-ayoub/Autonomous-CUAS-HIL',
      label: 'Autonomous-CUAS-HIL ↗'
    },
    {
      title: 'Node 02 · AeroTrack Dual-Engine TensorRT Perception',
      desc: 'Edge-optimized UAV swarm tracker built on YOLOX CSP-ECA + ByteTrack with a P3/stride8 Dynamic Spatial Gate. Skips deep P4/P5 compute on clear/confident frames (28.24 → 13.46 GFLOPs) while NWD preserves IDs through swarm crossings.',
      tags: ['TensorRT FP16', 'P3 Early-Exit', 'NWD Association', '130.7 FPS', '−23.4% Jetson Energy'],
      code: `EXIT_GATE  : P3/stride8 (α-IoU Head)\nFULL_PATH  : 28.24 GFLOPs (8.5 ms)\nEARLY_EXIT : 13.46 GFLOPs (2.9 ms)\nPAPER      : IEEE Sensors (Under Review)`,
      url: 'https://github.com/bnina-ayoub/AeroTrack',
      label: 'AeroTrack Repo ↗'
    },
    {
      title: 'Node 03 · STM32F4 FreeRTOS micro-ROS Gateway',
      desc: 'Deterministic communication bridge running stm32_subscriber_node on FreeRTOS. Uses OS thread flags and UART DMA (huart1) to offload 8-byte velocity structs without blocking real-time control.',
      tags: ['STM32F4', 'FreeRTOS', 'micro-ROS Client', 'UART DMA', 'OS Thread Flags'],
      code: `typedef struct __attribute__((packed)) {\n  float pan_velocity;   // 4 bytes\n  float tilt_velocity;  // 4 bytes\n} joints_t;             // 8-byte DMA\nHAL_UART_Transmit_DMA(&huart1, ...);`,
      url: 'https://github.com/bnina-ayoub/CUAS-Actuation-STM32',
      label: 'CUAS-Actuation-STM32 ↗'
    },
    {
      title: 'Node 04 · NXP FRDM-MCXA Zephyr RTOS Actuation Node',
      desc: 'Physical motor execution node on NXP FRDM silicon running Zephyr RTOS. Receives 8-byte joints_t payloads over flexcomm0_lpuart0 ISR, drives 4:1 pan & 3:1 tilt steppers at 50%-duty PWM, and closes position feedback via the upstreamed NXP eQDC driver.',
      tags: ['Zephyr RTOS', 'NXP FRDM-MCXA', 'LPUART ISR', '4:1 & 3:1 Gears', 'Upstream eQDC'],
      code: `f_step = |v| * 254.7 * GEAR_RATIO\nT_pwm  = 1.5 * (1e9 / f_step) ns\nDUTY   = T_pwm / 2  (50% STEP edge)\nUPSTRM : zephyr PR #111927 MERGED`,
      url: 'https://github.com/bnina-ayoub/CUAS-Gateway-Zephyr',
      label: 'CUAS-Gateway-Zephyr ↗'
    }
  ];

  const hilBtns = Array.from(document.querySelectorAll('#hilNodes .hil-chip'));
  const hilInspector = document.getElementById('hilInspector');
  function renderHil(idx) {
    const d = hilData[idx];
    if (!d || !hilInspector) return;
    hilBtns.forEach((b, i) => b.classList.toggle('active', i === idx));
    hilInspector.innerHTML = `
      <div>
        <h3>${d.title}</h3>
        <p>${d.desc}</p>
        <div class="tags" style="margin-bottom:0">
          ${d.tags.map(t => `<span class="tag">${t}</span>`).join('')}
          <a class="text-link" style="margin-left:6px" href="${d.url}" target="_blank" rel="noreferrer">${d.label}</a>
        </div>
      </div>
      <pre class="code-terminal">${d.code}</pre>
    `;
  }
  hilBtns.forEach(b => b.addEventListener('click', () => renderHil(Number(b.dataset.node))));
  renderHil(0);

  /* ---------- 9. BENCHMARK SWITCHER ---------- */
  const benchData = {
    workstation: {
      rows: [
        ['Baseline', 'IoU', '6.7 ms', '8.5 ms', '117.2', '1983.9 J', false],
        ['Baseline', 'NWD', '6.4 ms', '8.5 ms', '117.9', '1983.9 J', false],
        ['Early Exit', 'IoU', '2.9 ms', '7.7 ms', '130.7', '1807.1 J', false],
        ['AeroTrack', 'NWD', '2.9 ms', '7.7 ms', '130.7', '1821.6 J', true]
      ],
      bars: [
        ['Compute Reduction (28.24 → 13.46 GFLOPs)', '−52.3% FLOPs', 88],
        ['Best-Case Latency (6.7 → 2.9 ms)', '2.31× Faster', 94],
        ['Throughput Gain (117.2 → 130.7 FPS)', '+11.5% FPS', 76]
      ]
    },
    jetson: {
      rows: [
        ['Baseline', 'IoU', '178.1 ms', '187.9 ms', '5.3', '8924.9 J', false],
        ['Baseline', 'NWD', '188.5 ms', '199.1 ms', '5.0', '9641.3 J', false],
        ['Early Exit', 'IoU', '68.6 ms', '157.1 ms', '6.4', '7754.4 J', false],
        ['AeroTrack', 'NWD', '65.8 ms', '152.6 ms', '6.6', '7389.6 J', true]
      ],
      bars: [
        ['Edge Best-Case Latency (188.5 → 65.8 ms)', '2.86× Faster', 96],
        ['Total Edge Energy Saved (9641 → 7389 J)', '−23.4% Energy', 84],
        ['Edge Throughput Gain (5.0 → 6.6 FPS)', '+32.0% FPS', 89]
      ]
    }
  };

  const benchTable = document.getElementById('benchTable');
  const benchGains = document.getElementById('benchGains');
  const benchBtns = Array.from(document.querySelectorAll('#benchToggle button'));

  function renderBench(key) {
    const d = benchData[key];
    if (!d || !benchTable || !benchGains) return;
    benchBtns.forEach(b => b.classList.toggle('active', b.dataset.target === key));
    benchTable.innerHTML = `
      <thead><tr><th>Arch</th><th>Dist</th><th>Min</th><th>Mean</th><th>FPS</th><th>Energy</th></tr></thead>
      <tbody>${d.rows.map(r => `<tr class="${r[6] ? 'hl' : ''}"><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join('')}</tbody>
    `;
    benchGains.innerHTML = d.bars.map(b => `
      <div>
        <div class="bar-item-meta"><span>${b[0]}</span><strong>${b[1]}</strong></div>
        <div class="bar-bg"><div class="bar-fg" style="width:${b[2]}%"></div></div>
      </div>
    `).join('');
  }
  benchBtns.forEach(b => b.addEventListener('click', () => renderBench(b.dataset.target)));
  renderBench('workstation');

  /* ---------- 10. TEKNOFEST INTERACTIVE GALLERY SWITCHER ---------- */
  const tfMainPhoto = document.getElementById('tfMainPhoto');
  const tfMainImg = document.getElementById('tfMainImg');
  const tfMainLabel = document.getElementById('tfMainLabel');
  const tfBtns = Array.from(document.querySelectorAll('#tfSwitcher .switch-card'));

  tfBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tfBtns.forEach(b => b.classList.toggle('active', b === btn));
      tfMainImg.src = btn.dataset.img;
      tfMainLabel.textContent = btn.dataset.label;
      tfMainPhoto.dataset.lightboxImg = btn.dataset.img;
      tfMainPhoto.dataset.lightboxTitle = btn.dataset.title;
      tfMainPhoto.dataset.lightboxCaption = btn.dataset.caption;
    });
  });

  /* ---------- 11. HOVER-TO-PLAY LIVE HARDWARE VIDEOS ---------- */
  document.querySelectorAll('.hover-play-box').forEach(box => {
    const video = box.querySelector('.hover-video');
    const src = box.dataset.videoSrc;
    if (!video || !src) return;

    box.addEventListener('mouseenter', () => {
      if (!video.src) video.src = src;
      box.classList.add('playing');
      video.play().catch(() => {});
    });
    box.addEventListener('mouseleave', () => {
      box.classList.remove('playing');
      video.pause();
    });
  });

  /* ---------- 12. PROJECT CATEGORY FILTER ---------- */
  const filterBtns = Array.from(document.querySelectorAll('#projectFilters .tab-btn'));
  const sysCards = Array.from(document.querySelectorAll('#systemsGrid .sys-card'));

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      sysCards.forEach(c => {
        const cats = (c.dataset.cat || '').split(' ');
        c.classList.toggle('hidden', !(f === 'all' || cats.includes(f)));
      });
    });
  });

  /* ---------- 13. MEDIA LIGHTBOX MODAL ---------- */
  const lbModal = document.getElementById('lightboxModal');
  const lbStage = document.getElementById('modalStage');
  const lbTitle = document.getElementById('modalTitle');
  const lbCap = document.getElementById('modalCaption');
  const lbClose = document.getElementById('modalClose');

  function openLightbox({ type, src, title, caption }) {
    lbTitle.textContent = title || 'MEDIA';
    lbCap.textContent = caption || '';
    lbStage.innerHTML = '';
    if (type === 'video') {
      const v = document.createElement('video');
      v.src = src;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      lbStage.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title || 'Photo';
      lbStage.appendChild(img);
    }
    lbModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    const v = lbStage.querySelector('video');
    if (v) { v.pause(); v.src = ''; }
    lbStage.innerHTML = '';
    lbModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const vEl = e.target.closest('[data-lightbox-video]');
    if (vEl) {
      e.preventDefault();
      openLightbox({ type: 'video', src: vEl.dataset.lightboxVideo, title: vEl.dataset.lightboxTitle, caption: vEl.dataset.lightboxCaption });
      return;
    }
    const iEl = e.target.closest('[data-lightbox-img]');
    if (iEl) {
      e.preventDefault();
      openLightbox({ type: 'image', src: iEl.dataset.lightboxImg, title: iEl.dataset.lightboxTitle, caption: iEl.dataset.lightboxCaption });
    }
  });
  lbClose.addEventListener('click', closeLightbox);
  lbModal.addEventListener('click', e => { if (e.target === lbModal) closeLightbox(); });

  /* ---------- 14. INTERACTIVE ENGINEER TERMINAL (⌘K / CTRL+K) ---------- */
  const cmdModal = document.getElementById('cmdModal');
  const cmdOut = document.getElementById('cmdOutput');
  const cmdInput = document.getElementById('cmdInput');
  const cmdClose = document.getElementById('cmdClose');

  const commands = {
    help: () => [
      '<span class="cmd-ok">Available commands:</span>',
      '  whoami     — Engineer summary, location &amp; languages',
      '  aerotrack  — Flagship C-UAS HIL architecture &amp; IEEE Sensors paper',
      '  zephyr     — Upstream Zephyr RTOS NXP MCXA eQDC contribution',
      '  teknofest  — Active TEKNOFEST Team OMU Sungur mission',
      '  awards     — National IEEE embedded &amp; EU hackathon podiums',
      '  stack      — Hardware-to-AI capability layers',
      '  contact    — Direct email, phone, GitHub &amp; LinkedIn',
      '  pdf        — Open/download 4-page A4 engineering portfolio PDF',
      '  clear      — Clear terminal output'
    ],
    whoami: () => [
      '<span class="cmd-ok">AYOUB BNINA</span> // Embedded Robotics &amp; Real-Time Autonomy Engineer',
      'Base      : Samsun, Türkiye (Türkiye Scholarships / YTB MSc Scholar at OMU)',
      'Research  : Defended ENSI MSc Research (Sep 2026) · IEEE Sensors (Under Review)',
      'Languages : Arabic (Native) · French (C2) · English (C1) · Turkish (C1)'
    ],
    aerotrack: () => [
      '<span class="cmd-ok">AEROTRACK C-UAS HIL STACK</span> [4-Node Closed-Loop Visual Servoing]',
      'Throughput: 130.7 FPS (2.9 ms min) · −52.3% FLOPs (28.24 → 13.46 GFLOPs)',
      'Jetson    : −23.4% Energy (9641 J → 7389 J) · 8.35 ms HIL · 85.1% IDF1',
      'Hardware  : Isaac Sim + TensorRT → STM32F4 FreeRTOS DMA → NXP MCXA Zephyr'
    ],
    zephyr: () => [
      '<span class="cmd-ok">THE ZEPHYR PROJECT — UPSTREAM CONTRIBUTOR</span>',
      'Driver    : NXP MCXA Enhanced Quadrature Decoder (eQDC) Sensor API Wrapper',
      'Collab    : Co-developed with NXP Semiconductors engineer (MCUXpresso HAL + INPUTMUX)',
      'PRs       : zephyrproject-rtos/zephyr #111927 (MERGED) &amp; #111977 (FRDM-MCXA156)'
    ],
    teknofest: () => [
      '<span class="cmd-warn">ACTIVE MISSION: TEAM LEADER · TEKNOFEST TEAM OMÜ SUNGUR</span>',
      'Location  : Ondokuz Mayıs University (Enerji İstasyonu &amp; 3B Üretim Lab)',
      'Focus     : Leading flight-grade RTOS firmware, HIL verification &amp; onboard perception'
    ],
    awards: () => [
      '<span class="cmd-ok">PODIUM RECORD:</span>',
      '  1st Place — NRW 6.0 ECPC (STM32 UART/SPI/I2C · STMicroelectronics / ACTIA)',
      '  2nd Place — NRW 7.0 ECPC 2.0 (1 point behind 1st · IEEE RAS INSAT)',
      '  Hat-Trick — TWISE Night Challenge (Won 3/5 industry challenges · Horizon Europe)',
      '  3rd Place — ECPP Embedded Contest · 4th Place — SWAFYTHON (EU4Youth)'
    ],
    stack: () => [
      'L1 Silicon : STM32 (F4/H7/U5), NXP MCXA, ARM Cortex-M, ESP32, Bare-Metal C/C++',
      'L2 RTOS/Bus: Zephyr RTOS, FreeRTOS, ThreadX, ROS 2/micro-ROS, CAN, UART/SPI/I2C, PLC',
      'L3 Edge AI : NVIDIA Isaac Sim, TensorRT FP16, Jetson, PyTorch, YOLOX, NWD, MuJoCo'
    ],
    contact: () => [
      'Email    : bninayoub.pro@gmail.com',
      'Phone    : +90 501 631 10 31',
      'GitHub   : https://github.com/bnina-ayoub',
      'LinkedIn : https://www.linkedin.com/in/ayoub-bnina'
    ],
    pdf: () => {
      window.open('Ayoub_Bnina_Engineering_Portfolio.pdf', '_blank');
      return ['<span class="cmd-ok">✓ Launching Ayoub_Bnina_Engineering_Portfolio.pdf...</span>'];
    }
  };

  function printLines(lines) {
    lines.forEach(l => {
      const d = document.createElement('div');
      d.innerHTML = l;
      cmdOut.appendChild(d);
    });
    cmdOut.scrollTop = cmdOut.scrollHeight;
  }

  function runCmd(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;
    printLines([`<span class="cmd-prompt">❯ ${cmd}</span>`]);
    if (cmd === 'clear') {
      cmdOut.innerHTML = '';
      return;
    }
    if (commands[cmd]) {
      printLines(commands[cmd]());
    } else {
      printLines([`<span class="cmd-warn">Unknown command "${cmd}". Type "help" for available commands.</span>`]);
    }
  }

  function openCmd() {
    if (!cmdOut.innerHTML) {
      printLines([
        '<span class="cmd-ok">AYOUB BNINA // EMBEDDED ROBOTICS INTERACTIVE SHELL v2.0</span>',
        'Type <span class="cmd-prompt">help</span> or click a quick command below.'
      ]);
    }
    cmdModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => cmdInput.focus(), 40);
  }

  function closeCmd() {
    cmdModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('openCmdBtn')?.addEventListener('click', openCmd);
  document.getElementById('openCmdBtn2')?.addEventListener('click', openCmd);
  cmdClose.addEventListener('click', closeCmd);
  cmdModal.addEventListener('click', e => { if (e.target === cmdModal) closeCmd(); });

  cmdInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      runCmd(cmdInput.value);
      cmdInput.value = '';
    }
  });
  document.querySelectorAll('#cmdQuick button').forEach(b => {
    b.addEventListener('click', () => runCmd(b.dataset.cmd));
  });

  document.addEventListener('keydown', e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdModal.classList.contains('open') ? closeCmd() : openCmd();
    } else if (e.key === 'Escape') {
      if (lbModal.classList.contains('open')) closeLightbox();
      if (cmdModal.classList.contains('open')) closeCmd();
    }
  });

  /* ---------- 15. COPY EMAIL TOAST ---------- */
  const toast = document.getElementById('toast');
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2300);
  }
  document.getElementById('copyEmailBtn')?.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('bninayoub.pro@gmail.com');
      showToast('✓ Copied bninayoub.pro@gmail.com');
    } catch {
      showToast('bninayoub.pro@gmail.com');
    }
  });
})();
