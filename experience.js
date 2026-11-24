window.renderPortfolioExperience = function renderPortfolioExperience(h) {
  const profile = window.portfolioContent;

  function experienceCard(role) {
    return h("article", { className: "px-card", key: role.company },
      h("header", { className: "px-card-header" },
        h("div", null,
          h("h3", null, role.title),
          h("a", { href: role.company_url, target: "_blank", rel: "noopener noreferrer" }, role.company)
        ),
        h("div", { className: "px-dates" },
          h("p", null, role.duration === "Present" ? "Current role" : role.duration),
          h("p", null, role.location)
        )
      ),
      h("p", { className: "px-description" }, role.description),
      role.highlights?.length
        ? h("ul", { className: "px-highlights" }, role.highlights.map(text => h("li", { key: text }, text)))
        : null,
      role.video
        ? h("a", { className: "px-video", href: role.video, target: "_blank", rel: "noopener noreferrer" }, "Watch the robotics project on YouTube ↗")
        : null
    );
  }

  const sections = [
    { id: "work-history", title: "Work history", roles: profile.workHistory },
    { id: "internship-history", title: "Internships and training", roles: profile.internshipsAndTraining },
    { id: "extracurriculars", title: "Extracurriculars", roles: profile.extracurriculars },
  ];

  return h("div", { className: "portfolio-interior portfolio-experience" },
    h("div", { className: "ph-shell" },
      window.renderPortfolioHeader(h, "experience"),
      h("main", null,
        h("div", { className: "px-intro" },
          h("h1", null, "Experience"),
          h("p", { className: "px-subtitle" }, profile.experienceSubtitle),
          h("p", { className: "px-summary" }, profile.experienceSummary)
        ),
        h("nav", { className: "px-jumps", "aria-label": "Experience sections" },
          sections.map(({ id, title }) => h("button", {
            key: id,
            type: "button",
            onClick: () => {
              const heading = document.getElementById(id);
              heading.focus({ preventScroll: true });
              heading.scrollIntoView({ block: "start" });
            },
          }, title))
        ),
        sections.map(({ id, title, roles }) =>
          h("section", { className: "px-section px-" + id, "aria-labelledby": id, key: id },
            h("h2", { id, tabIndex: -1 }, title),
            h("div", { className: "px-cards" }, roles.map(experienceCard))
          )
        )
      )
    )
  );
};
