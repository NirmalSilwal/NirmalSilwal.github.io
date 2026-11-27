window.renderPortfolioExperience = function renderPortfolioExperience(h) {
  const profile = window.portfolioContent;
  const { page, hero } = window.portfolioPages;

  function highlights(items) {
    return h("ul", { className: "px-highlights" }, items.map(text => h("li", { key: text }, text)));
  }

  function experienceCard(role) {
    return h("article", { className: "px-card", key: role.company, "data-current": role.duration === "Present" || undefined },
      h("header", { className: "px-card-header" },
        h("div", null,
          h("a", { className: "px-company", href: role.company_url, target: "_blank", rel: "noopener noreferrer" }, role.company),
          h("h3", null, role.title)
        ),
        h("div", { className: "px-dates" },
          h("p", null, role.duration === "Present" ? "Current role" : role.duration),
          h("p", null, role.location)
        )
      ),
      h("div", { className: "px-card-body" },
        h("p", { className: "px-description" }, role.description),
        role.highlights?.length ? highlights(role.highlights) : null,
        role.details?.map(group =>
          h("div", { className: "px-detail", key: group.title },
            h("h4", null, group.title),
            highlights(group.items)
          )
        ),
        role.video
          ? h("a", { className: "px-video pd-link", href: role.video, target: "_blank", rel: "noopener noreferrer" }, "Watch the robotics project on YouTube ↗")
          : null
      )
    );
  }

  const sections = [
    { id: "work-history", title: "Work history", roles: profile.workHistory },
    { id: "internship-history", title: "Internships and training", roles: profile.internshipsAndTraining },
    { id: "extracurriculars", title: "Extracurriculars", roles: profile.extracurriculars },
  ];

  return page(h, "experience",
    hero(h, "Experience", profile.experienceSubtitle, profile.experienceSummary,
      h("aside", { className: "pd-hero-aside px-outcomes" },
        h("h2", null, "AWS Blu Age via Virtusa"),
        h("p", null, h("strong", null, "150+"), " customer-reported issues resolved"),
        h("p", null, h("strong", null, "40%"), " higher batch throughput after PostgreSQL tuning")
      )
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
      h("section", { className: "pd-section px-section px-" + id, "aria-labelledby": id, key: id },
        h("h2", { id, tabIndex: -1 }, title),
        h("div", { className: "px-cards" }, roles.map(experienceCard))
      )
    )
  );
};
