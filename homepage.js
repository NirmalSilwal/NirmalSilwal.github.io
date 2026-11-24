// Rendered by the portfolio’s existing React router.
window.renderPortfolioHome = function renderPortfolioHome(h) {
  const profile = window.portfolioContent;
  const projects = window.portfolioGitHub.projects.data;
  const links = [
    ["Home", "#/home"],
    ["Experience", "#/experience"],
    ["Projects", "#/projects"],
    ["Education", "#/education"],
    ["Open Source", "#/opensource"],
    ["Contact", "#/contact"],
  ];
  const homepageProjects = [
    { name: "dockerizing-spring-boot-app", title: "Dockerizing Spring Boot", topic: "Software development" },
    { name: "system-design-resources", title: "System Design Resources", topic: "System design" },
    { name: "Data-Structure-and-Algorithm-Java-interview-kit", title: "Java Interview Kit", topic: "Problem solving" },
  ];

  const roleLabels = ["HP PageWide Press", "The Home Depot via Kforce", "AWS via Virtusa"];
  const roleHighlights = [
    "Backend software for industrial printing.",
    "Spring Boot services for order fulfillment and a Kafka-to-Pub/Sub migration.",
    "COBOL-to-Java modernization, PostgreSQL tuning, and JVM profiling.",
  ];

  function externalLink(text, href, className) {
    return h("a", { href, className, target: "_blank", rel: "noopener noreferrer" }, text);
  }

  return h("div", { className: "portfolio-home" },
    h("div", { className: "ph-shell" },
      h("header", { className: "ph-header" },
        h("a", { className: "ph-wordmark", href: "#/home", "aria-label": "Nirmal Silwal, home" }, "NS"),
        h("nav", { className: "ph-nav", "aria-label": "Portfolio" },
          links.map(([label, href]) =>
            h("a", { key: href, href, "aria-current": href === "#/home" ? "page" : undefined }, label)
          )
        )
      ),
      h("main", null,
        h("section", { className: "ph-hero", "aria-labelledby": "ph-title" },
          h("div", { className: "ph-intro" },
            h("p", { className: "ph-role" }, "Senior Software Developer at HP"),
            h("h1", { id: "ph-title" }, "Nirmal Silwal"),
            h("p", { className: "ph-summary" }, profile.introduction),
            h("div", { className: "ph-actions" },
              h("a", { className: "ph-button", href: "#/experience" }, "View experience", h("span", { "aria-hidden": true }, "↗")),
              h("a", { className: "ph-secondary", href: "#/projects" }, "Explore projects")
            )
          )
        ),
        h("section", { className: "ph-section", "aria-labelledby": "ph-work" },
          h("div", { className: "ph-section-heading" },
            h("h2", { id: "ph-work" }, "Experience"),
            h("a", { href: "#/experience" }, "Full work history ↗")
          ),
          h("ul", { className: "ph-roles" },
            profile.workHistory.slice(0, 3).map((role, index) =>
              h("li", { key: role.company },
                h("div", null,
                  h("h3", null, roleLabels[index]),
                  h("p", { className: "ph-job" }, role.title)
                ),
                h("p", { className: "ph-highlight" }, roleHighlights[index]),
                h("p", { className: "ph-date" }, role.duration)
              )
            )
          )
        ),
        h("section", { className: "ph-section ph-case", "aria-labelledby": "ph-case-title" },
          h("div", null,
            h("p", { className: "ph-topic" }, "System design in practice"),
            h("h2", { id: "ph-case-title" }, "Reliable order events")
          ),
          h("div", { className: "ph-case-detail" },
            h("p", null, "At The Home Depot through Kforce, I built Spring Boot services for shipment and return events and migrated event processing from Kafka to Google Cloud Pub/Sub."),
            h("p", null, "Duplicate events needed to be safe to process, transient failures needed a retry, and messages that couldn’t be processed needed a place for investigation. I implemented idempotent handling, retries, and dead-letter routing."),
            h("a", { href: "#/experience" }, "More about this role ↗")
          )
        ),
        h("section", { className: "ph-section", "aria-labelledby": "ph-projects" },
          h("div", { className: "ph-section-heading" },
            h("h2", { id: "ph-projects" }, "Selected projects"),
            h("a", { href: "#/projects" }, "All projects ↗")
          ),
          h("div", { className: "ph-projects" },
            homepageProjects.map(({ name, title, topic }) => {
              const project = projects.find(item => item.name === name);
              return h("article", { className: "ph-project", key: name },
                h("p", { className: "ph-topic" }, topic),
                h("h3", null, externalLink(title, project.url)),
                h("p", { className: "ph-project-summary" }, project.description)
              );
            })
          )
        )
      ),
      h("footer", { className: "ph-footer" },
        h("span", null, "Nirmal Silwal · ", profile.contact.location),
        h("div", { className: "ph-footer-links" },
          externalLink("GitHub", profile.social.github),
          externalLink("LinkedIn", profile.social.linkedin),
          h("a", { href: profile.social.email }, "Email")
        )
      )
    )
  );
};
