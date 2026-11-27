// Decorative signal routes for the homepage hero.
(() => {
  const schematicWidth = 540;
  const schematicHeight = 330;
  const colors = {
    cyan: { rail: "#66c7ed", signal: "#a3efff" },
    indigo: { rail: "#8296ee", signal: "#c0c9ff" },
    violet: { rail: "#9e82e6", signal: "#e0c2ff" },
    amber: { rail: "#ab9383", signal: "#ffdbac" },
  };

  // Each route has its own pace and starting point so the signals do not move in lockstep.
  const lanes = [
    ["cyan", .31, 72, [[-54, 93], [27, 93], [69, 135], [145, 135], [194, 184], [288, 184], [334, 138], [429, 138], [473, 94], [571, 94]]],
    ["indigo", .64, 62, [[-62, 129], [9, 129], [61, 181], [128, 181], [170, 223], [269, 223], [330, 162], [444, 162], [488, 118], [579, 118]]],
    ["cyan", .78, 89, [[-34, 199], [37, 199], [95, 257], [177, 257], [222, 212], [279, 212], [347, 280], [420, 280], [471, 229], [559, 229]]],
    ["violet", .13, 64, [[-23, 234], [31, 234], [98, 301], [166, 301], [232, 235], [269, 235], [325, 291], [433, 291], [465, 259], [574, 259]]],
    ["violet", .46, 53, [[35, 25], [100, 25], [136, 61], [238, 61], [293, 116], [363, 116], [434, 45], [576, 45]]],
    ["indigo", .18, 74, [[-8, 52], [69, 52], [108, 91], [224, 91], [278, 145], [307, 145], [363, 89], [409, 89], [453, 45], [557, 45]]],
    ["cyan", .59, 64, [[85, 338], [166, 338], [217, 287], [262, 287], [303, 246], [365, 246], [411, 200], [550, 200]]],
    ["amber", .84, 50, [[175, 329], [218, 329], [264, 283], [303, 283], [366, 220], [413, 220], [460, 173], [567, 173]]],
  ];
  const terminals = [
    [145, 135, "cyan"], [194, 184, "cyan"], [269, 223, "indigo"],
    [238, 61, "violet"], [363, 116, "violet"], [224, 91, "indigo"],
    [420, 280, "cyan"], [365, 246, "cyan"], [413, 220, "amber"],
    [444, 162, "indigo"], [433, 291, "violet"], [429, 138, "cyan"],
  ];

  let paused = false;
  let dispose = () => {};

  function buildRoute(coords) {
    const path = new Path2D();
    const stops = [{ x: coords[0][0], y: coords[0][1], distance: 0 }];
    path.moveTo(stops[0].x, stops[0].y);
    for (const [x, y] of coords.slice(1)) {
      const previous = stops[stops.length - 1];
      stops.push({ x, y, distance: previous.distance + Math.hypot(x - previous.x, y - previous.y) });
      path.lineTo(x, y);
    }
    return { path, stops, length: stops[stops.length - 1].distance };
  }

  function pointAt(stops, distance) {
    const end = stops.findIndex(stop => stop.distance >= distance);
    if (end <= 0) return stops[end === 0 ? 0 : stops.length - 1];
    const from = stops[end - 1];
    const to = stops[end];
    const fraction = (distance - from.distance) / (to.distance - from.distance);
    return { x: from.x + (to.x - from.x) * fraction, y: from.y + (to.y - from.y) * fraction };
  }

  function drawSignal(ctx, route, distance) {
    const point = pointAt(route.stops, distance);
    const opacity = Math.min(distance / 28, (route.length - distance) / 28, 1);
    ctx.strokeStyle = route.tone.signal;
    ctx.lineWidth = 2;
    for (let step = 5; step > 0; step -= 1) {
      const from = pointAt(route.stops, Math.max(0, distance - step * 6));
      const to = pointAt(route.stops, Math.max(0, distance - (step - 1) * 6));
      ctx.globalAlpha = opacity * (6 - step) / 8;
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    }
    ctx.globalAlpha = opacity;
    ctx.fillStyle = route.tone.signal;
    ctx.shadowColor = route.tone.signal;
    ctx.shadowBlur = 11;
    ctx.beginPath();
    ctx.arc(point.x, point.y, 2.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  function mount(hero) {
    const canvas = hero.querySelector(".ph-signal-art");
    const button = hero.querySelector(".ph-motion-toggle");
    const ctx = canvas.getContext("2d");
    if (!ctx || !("Path2D" in window)) return () => {};

    const routes = lanes.map(([color, phase, speed, coords]) => ({
      ...buildRoute(coords), tone: colors[color], phase, speed,
    }));
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactLayout = window.matchMedia("(max-width: 700px)");
    let frame = null;
    let visible = !("IntersectionObserver" in window);
    let elapsed = 0;
    let previousTime = 0;
    let drawingScale = 1;
    let originX = 0;
    let originY = 0;
    let pixelRatio = 1;

    function draw() {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(drawingScale * pixelRatio, 0, 0, drawingScale * pixelRatio, originX * pixelRatio, originY * pixelRatio);
      ctx.lineJoin = "round";
      ctx.lineCap = "round";

      // Faint rings and precise lines give the moving light a visual structure.
      ctx.lineWidth = 1;
      ctx.strokeStyle = "#7aa8d953";
      ctx.setLineDash([2, 7]);
      for (const radius of [64, 104, 133]) {
        ctx.beginPath();
        ctx.arc(350, 167, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.lineWidth = 1.15;
      for (const route of routes) {
        ctx.strokeStyle = route.tone.rail;
        ctx.globalAlpha = .56;
        ctx.stroke(route.path);
      }
      ctx.globalAlpha = 1;
      for (const [x, y, color] of terminals) {
        ctx.strokeStyle = colors[color].rail;
        ctx.fillStyle = "#10223c";
        ctx.beginPath();
        ctx.arc(x, y, 3.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      }
      for (const route of routes) {
        drawSignal(ctx, route, (route.length * route.phase + elapsed * route.speed) % route.length);
      }
    }

    function resize() {
      const { clientWidth: width, clientHeight: height } = canvas;
      if (!width || !height) return;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      if (compactLayout.matches) {
        drawingScale = Math.max(width / schematicWidth, .67);
        originX = width - schematicWidth * drawingScale + 50;
        originY = height / 3;
      } else {
        drawingScale = Math.min(width * .86 / schematicWidth, (height - 8) / schematicHeight);
        originX = width - schematicWidth * drawingScale + 12;
        originY = (height - schematicHeight * drawingScale) / 2;
      }
      draw();
    }

    function animate(now) {
      if (previousTime) elapsed += Math.min(now - previousTime, 40) / 1000;
      previousTime = now;
      draw();
      frame = requestAnimationFrame(animate);
    }

    function syncPlayback() {
      const canAnimate = hero.isConnected && visible && !document.hidden && !paused && !reducedMotion.matches;
      button.hidden = reducedMotion.matches;
      button.dataset.action = paused ? "play" : "pause";
      button.lastElementChild.textContent = paused ? "Play background" : "Pause background";

      if (canAnimate && frame === null) {
        frame = requestAnimationFrame(animate);
      } else if (!canAnimate && frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
        previousTime = 0;
      }
    }

    function toggle() {
      paused = !paused;
      syncPlayback();
    }

    const viewport = visible ? null : new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncPlayback();
    });
    const size = "ResizeObserver" in window ? new ResizeObserver(resize) : null;
    viewport?.observe(hero);
    size?.observe(canvas);
    if (!size) window.addEventListener("resize", resize);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    button.addEventListener("click", toggle);
    resize();
    syncPlayback();

    return () => {
      viewport?.disconnect();
      size?.disconnect();
      if (!size) window.removeEventListener("resize", resize);
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      button.removeEventListener("click", toggle);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }

  window.mountPortfolioHomeBackdrop = hero => {
    dispose();
    dispose = hero ? mount(hero) : () => {};
  };
})();
