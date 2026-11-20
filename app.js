/* ==========================================================================
   AYOUB BNINA — AVIONICS HUD PORTFOLIO INTERACTIVE ENGINE
   1. Live TRT (UTC+3) Telemetry Clock & Scroll Tracker
   2. Interactive C-UAS Swarm Radar Canvas (Mouse-Lock + Mode Switch)
   3. 4-Node AeroTrack HIL Signal-Flow Inspector
   4. Workstation vs. Jetson Edge Benchmark Switcher
   5. Project Category Filter & Tactical Media Lightbox (Video + Photo)
   ========================================================================== */

(() => {
  'use strict';

  /* ---------- 1. LIVE TRT CLOCK & SCROLL TELEMETRY ---------- */
  const clockEl = document.getElementById('hudClock');
  const scrollEl = document.getElementById('hudScroll');
  const progressEl = document.getElementById('scrollProgress');
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  function updateClock() {
    try {
      const now = new Date();
      const trt = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Istanbul',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      if (clockEl) clockEl.textContent = `TRT ${trt}`;
    } catch {
      const now = new Date();
      if (clockEl) clockEl.textContent = now.toTimeString().slice(0, 8);
    }
  }
  updateClock();
  setInterval(updateClock, 1000);

  function updateScroll() {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100)));
    if (scrollEl) scrollEl.textContent = `${String(pct).padStart(2, '0')}%`;
    if (progressEl) progressEl.style.width = `${pct}%`;

    const offset = window.scrollY + 140;
    let current = sections[0];
    for (const sec of sections) {
      if (sec.offsetTop <= offset) current = sec;
    }
    navLinks.forEach(a => {
      a.classList.toggle('active', current && a.getAttribute('href') === `#${current.id}`);
    });
  }
  window.addEventListener('scroll', updateScroll, { passive: true });
  updateScroll();

  /* ---------- 2. INTERACTIVE C-UAS RADAR SCOPE CANVAS ---------- */
  const canvas = document.getElementById('radarCanvas');
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
      hudModeLabel.textContent = 'P3 DYNAMIC GATE';
      hudFlops.textContent = '13.46 GFLOPs';
      hudFps.textContent = '130.7';
      hudLat.textContent = '2.9 ms';
    });
    modeFullBtn.addEventListener('click', () => {
      earlyExitMode = false;
      modeFullBtn.classList.add('active');
      modeEarlyBtn.classList.remove('active');
      hudModeLabel.textContent = 'FULL P3/P4/P5 FPN';
      hudFlops.textContent = '28.24 GFLOPs';
      hudFps.textContent = '117.9';
      hudLat.textContent = '8.5 ms';
    });
  }

  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = 460;
    let height = 268;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targets = [
      { id: 'TRK-01', r: 0.34, ang: 0.4, spd: 0.0042, conf: 0.97 },
      { id: 'TRK-02', r: 0.56, ang: 1.5, spd: -0.0031, conf: 0.94 },
      { id: 'TRK-03', r: 0.72, ang: 2.6, spd: 0.0026, conf: 0.91 },
      { id: 'TRK-04', r: 0.45, ang: 3.9, spd: 0.0036, conf: 0.98 },
      { id: 'TRK-05', r: 0.66, ang: 5.1, spd: -0.0024, conf: 0.93 },
      { id: 'TRK-06', r: 0.28, ang: 4.5, spd: 0.0050, conf: 0.96 }
    ];

    let sweep = 0;
    let mouse = { x: null, y: null, active: false };

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(260, rect.width);
      height = Math.max(220, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    canvas.addEventListener('mousemove', e => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      const dx = mouse.x - width / 2;
      const dy = mouse.y - height / 2;
      const az = ((Math.atan2(dy, dx) * 180) / Math.PI + 450) % 360;
      const el = Math.round(((height / 2 - mouse.y) / (height / 2)) * 45);
      if (hudCursor) {
        hudCursor.textContent = `AZ ${String(Math.round(az)).padStart(3, '0')}° · EL ${el >= 0 ? '+' : ''}${el}°`;
      }
    });

    canvas.addEventListener('mouseleave', () => {
      mouse.active = false;
      if (hudCursor) hudCursor.textContent = 'AUTO SWARM LOCK';
    });

    function drawRadar() {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const maxR = Math.min(width, height) * 0.43;

      // Range rings
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.17)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (maxR / 4) * i, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs & ticks
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.14)';
      ctx.beginPath();
      ctx.moveTo(cx - maxR - 14, cy);
      ctx.lineTo(cx + maxR + 14, cy);
      ctx.moveTo(cx, cy - maxR - 14);
      ctx.lineTo(cx, cy + maxR + 14);
      ctx.stroke();

      // Sweep cone
      sweep = (sweep + (earlyExitMode ? 0.024 : 0.015)) % (Math.PI * 2);
      const steps = 22;
      for (let i = 0; i < steps; i++) {
        const a0 = sweep - (i / steps) * 0.65;
        const a1 = sweep - ((i + 1) / steps) * 0.65;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, a1, a0);
        ctx.closePath();
        const alpha = (1 - i / steps) * 0.18;
        ctx.fillStyle = earlyExitMode
          ? `rgba(0, 229, 255, ${alpha})`
          : `rgba(125, 255, 107, ${alpha})`;
        ctx.fill();
      }

      // Leading sweep line
      ctx.strokeStyle = earlyExitMode ? 'rgba(0, 229, 255, 0.85)' : 'rgba(125, 255, 107, 0.85)';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(sweep) * maxR, cy + Math.sin(sweep) * maxR);
      ctx.stroke();

      // Update & draw targets
      let lockedTarget = targets[3];
      let bestDist = Infinity;

      const pts = targets.map(t => {
        t.ang += t.spd;
        const x = cx + Math.cos(t.ang) * (t.r * maxR);
        const y = cy + Math.sin(t.ang) * (t.r * maxR);
        return { ...t, x, y };
      });

      if (mouse.active) {
        for (const p of pts) {
          const d = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (d < bestDist) {
            bestDist = d;
            lockedTarget = p;
          }
        }
      } else {
        lockedTarget = pts[3];
      }

      if (hudLockId) {
        hudLockId.textContent = `${lockedTarget.id} [${Math.round(lockedTarget.conf * 100)}%]`;
      }

      // Centroid of swarm
      const centX = pts.reduce((s, p) => s + p.x, 0) / pts.length;
      const centY = pts.reduce((s, p) => s + p.y, 0) / pts.length;
      ctx.strokeStyle = 'rgba(255, 176, 32, 0.5)';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(centX, centY);
      ctx.stroke();
      ctx.setLineDash([]);

      for (const p of pts) {
        const isLocked = p.id === lockedTarget.id;
        // Velocity vector
        const vx = -Math.sin(p.ang) * (p.spd > 0 ? 12 : -12);
        const vy = Math.cos(p.ang) * (p.spd > 0 ? 12 : -12);
        ctx.strokeStyle = isLocked ? 'rgba(255, 59, 92, 0.85)' : 'rgba(125, 255, 107, 0.65)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + vx, p.y + vy);
        ctx.stroke();

        // Blip dot
        ctx.fillStyle = isLocked ? '#ff3b5c' : '#7dff6b';
        ctx.beginPath();
        ctx.arc(p.x, p.y, isLocked ? 3.5 : 2.6, 0, Math.PI * 2);
        ctx.fill();

        // NWD Tracking Bounding Brackets
        const b = isLocked ? 11 : 7;
        ctx.strokeStyle = isLocked ? '#ff3b5c' : 'rgba(0, 229, 255, 0.65)';
        ctx.lineWidth = isLocked ? 1.5 : 1;
        ctx.strokeRect(p.x - b, p.y - b, b * 2, b * 2);

        if (isLocked) {
          ctx.font = '600 9.5px "JetBrains Mono", monospace';
          ctx.fillStyle = '#ff6b84';
          ctx.fillText(p.id, p.x + 14, p.y - 4);
        }
      }

      // Mouse targeting reticle
      if (mouse.active) {
        ctx.strokeStyle = 'rgba(0, 229, 255, 0.75)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 14, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mouse.x - 20, mouse.y);
        ctx.lineTo(mouse.x - 8, mouse.y);
        ctx.moveTo(mouse.x + 8, mouse.y);
        ctx.lineTo(mouse.x + 20, mouse.y);
        ctx.moveTo(mouse.x, mouse.y - 20);
        ctx.lineTo(mouse.x, mouse.y - 8);
        ctx.moveTo(mouse.x, mouse.y + 8);
        ctx.lineTo(mouse.x, mouse.y + 20);
        ctx.stroke();
      }

      requestAnimationFrame(drawRadar);
    }

    drawRadar();
  }

  /* ---------- 3. INTERACTIVE 4-NODE HIL ARCHITECTURE INSPECTOR ---------- */
  const hilData = [
    {
      title: 'NODE 01 // NVIDIA Isaac Sim + ROS 2 Digital Twin',
      desc: 'Photorealistic physics-based Counter-UAS simulation spawning 20 kamikaze drones in complex sky/horizon scenes. Publishes live RGB frames and ground-truth kinematics over ROS 2 DDS while synchronizing physical turret motion in real time.',
      specs: ['NVIDIA Isaac Sim', 'ROS 2 Humble/Jazzy', 'isaac_track.py Bridge', 'EMA Filter (α = 0.60)', 'Asymmetrical PID'],
      packet: `TOPIC: /anti_uav/joint_command\nTYPE : sensor_msgs/msg/JointState\nCTRL : Pan=Velocity | Tilt=Position\nLOOP : 8.35 ms E2E (119.8 FPS)\nIDF1 : 85.1% Swarm Persistence`,
      repo: 'https://github.com/bnina-ayoub/Autonomous-CUAS-HIL',
      repoLabel: 'Autonomous-CUAS-HIL ↗'
    },
    {
      title: 'NODE 02 // AeroTrack Dual-Engine TensorRT Perception',
      desc: 'Edge-optimized UAV swarm tracker built on YOLOX CSP-ECA + ByteTrack with a P3/stride8 Dynamic Spatial Gate. Confident tiny-drone or empty-sky frames exit early at 13.46 GFLOPs (vs 28.24 full path), while NWD association replaces discrete IoU to prevent ID switches during swarm intersections.',
      specs: ['Dual-Engine TensorRT FP16', 'P3 Dynamic Early-Exit', 'NWD Association', '2.9 ms BCET', '−23.4% Jetson Energy'],
      packet: `EXIT_GATE : P3/stride8 (α-IoU Head)\nFULL_FPN  : 28.24 GFLOPs (8.5 ms)\nEARLY_EXIT: 13.46 GFLOPs (2.9 ms)\nJETSON    : 9641 J -> 7389 J (-23%)\nSTATUS    : IEEE Sensors (Under Review)`,
      repo: 'https://github.com/bnina-ayoub/AeroTrack',
      repoLabel: 'AeroTrack Repository ↗'
    },
    {
      title: 'NODE 03 // STM32F4 FreeRTOS micro-ROS Gateway',
      desc: 'Deterministic embedded communication bridge running an stm32_subscriber_node on FreeRTOS. Extracts pan_velocity and tilt_velocity from ROS 2 JointState messages and uses non-blocking OS thread flags + UART DMA (huart1) for zero-jitter hardware offloading.',
      specs: ['STM32F4 + STM32CubeIDE', 'FreeRTOS UART_Task', 'OS Thread Flags', 'micro-ROS Client', 'UART DMA Offload'],
      packet: `typedef struct __attribute__((packed)) {\n  float pan_velocity;   // 4 bytes\n  float tilt_velocity;  // 4 bytes\n} joints_t;             // 8-byte DMA\nHAL_UART_Transmit_DMA(&huart1, ...);`,
      repo: 'https://github.com/bnina-ayoub/CUAS-Actuation-STM32',
      repoLabel: 'CUAS-Actuation-STM32 ↗'
    },
    {
      title: 'NODE 04 // NXP FRDM-MCXA Zephyr RTOS Actuation Node',
      desc: 'Physical motor execution node on NXP FRDM silicon running Zephyr RTOS. Receives the 8-byte joints_t packet via interrupt-driven flexcomm0_lpuart0, enforces a 0.001 deadband, converts velocities across 4:1 pan & 3:1 tilt gear ratios into 50%-duty PWM step pulses, and closes the feedback loop using the upstreamed NXP eQDC sensor driver.',
      specs: ['Zephyr RTOS', 'NXP FRDM-MCXA', 'flexcomm0_lpuart0 ISR', '4:1 Pan / 3:1 Tilt Gears', 'Upstream eQDC Feedback'],
      packet: `f_step = |v| * 254.7 * GEAR_RATIO\nT_pwm  = 1.5 * (1e9 / f_step) ns\nDUTY   = T_pwm / 2  (50% STEP edge)\nFEEDBK : Zephyr Sensor API eQDC\nUPSTRM : zephyr PR #111927 MERGED`,
      repo: 'https://github.com/bnina-ayoub/CUAS-Gateway-Zephyr',
      repoLabel: 'CUAS-Gateway-Zephyr ↗'
    }
  ];

  const hilNodeBtns = Array.from(document.querySelectorAll('#hilNodes .hil-node'));
  const hilInspector = document.getElementById('hilInspector');

  function renderHilNode(idx) {
    const d = hilData[idx];
    if (!d || !hilInspector) return;
    hilNodeBtns.forEach((b, i) => b.classList.toggle('active', i === idx));
    hilInspector.innerHTML = `
      <div>
        <h3 class="inspector-title">${d.title}</h3>
        <p class="inspector-desc">${d.desc}</p>
        <div class="inspector-specs">
          ${d.specs.map(s => `<span class="spec-chip">${s}</span>`).join('')}
          <a class="btn btn-sm" href="${d.repo}" target="_blank" rel="noreferrer">${d.repoLabel}</a>
        </div>
      </div>
      <pre class="inspector-packet">${d.packet}</pre>
    `;
  }

  hilNodeBtns.forEach(btn => {
    btn.addEventListener('click', () => renderHilNode(Number(btn.dataset.node)));
  });
  renderHilNode(0);

  /* ---------- 4. WORKSTATION VS JETSON BENCHMARK SWITCHER ---------- */
  const benchmarks = {
    workstation: {
      rows: [
        ['Baseline', 'IoU', '6.7 ms', '8.5 ms', '117.2', '1983.9 J', false],
        ['Baseline', 'NWD', '6.4 ms', '8.5 ms', '117.9', '1983.9 J', false],
        ['Early Exit', 'IoU', '2.9 ms', '7.7 ms', '130.7', '1807.1 J', false],
        ['AeroTrack', 'NWD', '2.9 ms', '7.7 ms', '130.7', '1821.6 J', true]
      ],
      gains: [
        { label: 'P3 Early-Exit Compute Cut (28.24 → 13.46 GFLOPs)', val: '−52.3% FLOPs', pct: 86 },
        { label: 'Best-Case Execution Latency (6.7 → 2.9 ms)', val: '2.31× Faster', pct: 92 },
        { label: 'Throughput Gain (117.2 → 130.7 FPS)', val: '+11.5% FPS', pct: 74 }
      ]
    },
    jetson: {
      rows: [
        ['Baseline', 'IoU', '178.1 ms', '187.9 ms', '5.3', '8924.9 J', false],
        ['Baseline', 'NWD', '188.5 ms', '199.1 ms', '5.0', '9641.3 J', false],
        ['Early Exit', 'IoU', '68.6 ms', '157.1 ms', '6.4', '7754.4 J', false],
        ['AeroTrack', 'NWD', '65.8 ms', '152.6 ms', '6.6', '7389.6 J', true]
      ],
      gains: [
        { label: 'Edge Best-Case Latency (188.5 → 65.8 ms)', val: '2.86× Faster', pct: 95 },
        { label: 'Total Edge Energy Saved (9641.3 → 7389.6 J)', val: '−23.4% Energy', pct: 84 },
        { label: 'Edge Throughput Boost (5.0 → 6.6 FPS)', val: '+32.0% FPS', pct: 88 }
      ]
    }
  };

  const benchTable = document.getElementById('benchTable');
  const benchGains = document.getElementById('benchGains');
  const benchBtns = Array.from(document.querySelectorAll('#benchToggle button'));

  function renderBench(key) {
    const data = benchmarks[key];
    if (!data || !benchTable || !benchGains) return;
    benchBtns.forEach(b => b.classList.toggle('active', b.dataset.target === key));
    benchTable.innerHTML = `
      <thead>
        <tr>
          <th>Arch</th>
          <th>Assoc</th>
          <th>Min Lat</th>
          <th>Mean Lat</th>
          <th>FPS</th>
          <th>Energy</th>
        </tr>
      </thead>
      <tbody>
        ${data.rows.map(r => `
          <tr class="${r[6] ? 'hl-row' : ''}">
            <td>${r[0]}</td>
            <td>${r[1]}</td>
            <td>${r[2]}</td>
            <td>${r[3]}</td>
            <td>${r[4]}</td>
            <td>${r[5]}</td>
          </tr>
        `).join('')}
      </tbody>
    `;
    benchGains.innerHTML = data.gains.map(g => `
      <div class="gain-row">
        <div class="gain-meta"><span>${g.label}</span><strong>${g.val}</strong></div>
        <div class="bar-track"><div class="bar-fill" style="width:${g.pct}%"></div></div>
      </div>
    `).join('');
  }

  benchBtns.forEach(b => b.addEventListener('click', () => renderBench(b.dataset.target)));
  renderBench('workstation');

  /* ---------- 5. PROJECT CATEGORY FILTER ---------- */
  const filterBtns = Array.from(document.querySelectorAll('#projectFilters .filter-btn'));
  const sysCards = Array.from(document.querySelectorAll('#systemsGrid .sys-card'));

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.dataset.filter;
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      sysCards.forEach(card => {
        const cats = (card.dataset.cat || '').split(' ');
        const match = cat === 'all' || cats.includes(cat);
        card.classList.toggle('hidden', !match);
      });
    });
  });

  /* ---------- 6. TACTICAL LIGHTBOX MODAL (VIDEO + HIGH-RES PHOTO) ---------- */
  const modal = document.getElementById('lightboxModal');
  const modalStage = document.getElementById('modalStage');
  const modalTitle = document.getElementById('modalTitle');
  const modalCaption = document.getElementById('modalCaption');
  const modalClose = document.getElementById('modalClose');

  function openLightbox({ type, src, title, caption }) {
    if (!modal || !modalStage) return;
    modalTitle.textContent = title || 'MEDIA INSPECTOR';
    modalCaption.textContent = caption || '';
    modalStage.innerHTML = '';

    if (type === 'video') {
      const v = document.createElement('video');
      v.src = src;
      v.controls = true;
      v.autoplay = true;
      v.playsInline = true;
      modalStage.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = src;
      img.alt = title || 'Evidence Photo';
      modalStage.appendChild(img);
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!modal || !modalStage) return;
    const vid = modalStage.querySelector('video');
    if (vid) {
      vid.pause();
      vid.src = '';
    }
    modalStage.innerHTML = '';
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', e => {
    const vidEl = e.target.closest('[data-lightbox-video]');
    if (vidEl) {
      e.preventDefault();
      openLightbox({
        type: 'video',
        src: vidEl.dataset.lightboxVideo,
        title: vidEl.dataset.lightboxTitle,
        caption: vidEl.dataset.lightboxCaption
      });
      return;
    }
    const imgEl = e.target.closest('[data-lightbox-img]');
    if (imgEl) {
      e.preventDefault();
      openLightbox({
        type: 'image',
        src: imgEl.dataset.lightboxImg,
        title: imgEl.dataset.lightboxTitle,
        caption: imgEl.dataset.lightboxCaption
      });
    }
  });

  if (modalClose) modalClose.addEventListener('click', closeLightbox);
  if (modal) {
    modal.addEventListener('click', e => {
      if (e.target === modal) closeLightbox();
    });
  }
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeLightbox();
  });

  /* ---------- 7. ONE-CLICK COPY EMAIL ---------- */
  const copyBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');

  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2400);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText('bninayoub.pro@gmail.com');
        showToast('✓ COPIED: bninayoub.pro@gmail.com');
      } catch {
        showToast('EMAIL: bninayoub.pro@gmail.com');
      }
    });
  }
})();
