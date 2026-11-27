// Reveal mounted content once, when it enters the viewport.
(() => {
  const root = document.getElementById("root");
  if (!root || !("IntersectionObserver" in window)) return;

  const selector = [
    ".ph-hero", ".ph-proof", ".ph-case", ".ph-roles > li", ".ph-project", ".ph-community",
    ".pd-hero", ".pd-hero-aside", ".pd-tile", ".px-card", ".pd-certificates",
    ".pd-contact-panel", ".pd-contact-photo", ".os-dashboard", ".os-archive", ".os-organizations > li",
  ].join(", ");
  const observed = new WeakSet();
  const observer = new IntersectionObserver(entries => {
    for (const { target, isIntersecting } of entries) {
      if (!isIntersecting) continue;
      target.classList.add("motion-entered");
      observer.unobserve(target);
    }
  });

  function visit(element, action) {
    if (element.nodeType !== Node.ELEMENT_NODE) return;
    if (element.matches(selector)) action(element);
    element.querySelectorAll(selector).forEach(action);
  }

  function observe(element) {
    if (observed.has(element)) return;
    observed.add(element);
    observer.observe(element);
  }

  function unobserve(element) {
    if (element.isConnected) return;
    observer.unobserve(element);
    if (!element.classList.contains("motion-entered")) observed.delete(element);
  }

  const changes = new MutationObserver(records => {
    for (const record of records) {
      record.removedNodes.forEach(element => visit(element, unobserve));
      record.addedNodes.forEach(element => visit(element, observe));
    }
  });
  visit(root, observe);
  changes.observe(root, { childList: true, subtree: true });
})();
