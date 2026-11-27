// Rendered by the portfolio’s existing React router.
window.addEventListener("hashchange", () => window.scrollTo(0, 0));

window.renderPortfolioHeader = function renderPortfolioHeader(h, route) {
  const links = [
    ["Home", "#/home"],
    ["Experience", "#/experience"],
    ["Projects", "#/projects"],
    ["Education", "#/education"],
    ["Open Source", "#/opensource"],
    ["Contact", "#/contact"],
  ];
  return h("header", { className: "ph-header" },
    h("a", { className: "ph-wordmark", href: "#/home", "aria-label": "Nirmal Silwal, home" }, "NS"),
    h("nav", { className: "ph-nav", "aria-label": "Portfolio" },
      links.map(([label, href]) =>
        h("a", { key: href, href, "aria-current": href === "#/" + route ? "page" : undefined }, label)
      )
    )
  );
};

window.renderPortfolioHome = function renderPortfolioHome(h) {
  const profile = window.portfolioContent;
  const projects = window.portfolioGitHub.projects.data;
  const homepageProjects = [
    { name: "dockerizing-spring-boot-app", title: "Dockerizing Spring Boot", topic: "Software development" },
    { name: "system-design-resources", title: "System Design Resources", topic: "System design" },
    { name: "Data-Structure-and-Algorithm-Java-interview-kit", title: "Java Interview Kit", topic: "Problem solving" },
  ];

  const roleLabels = ["HP PageWide Press via Kforce", "The Home Depot via Kforce", "AWS via Virtusa"];
  const roleHighlights = [
    "Digital Front End development and customer issue resolution across industrial presses.",
    "Spring Boot services for order fulfillment and a Kafka-to-Pub/Sub migration.",
    "COBOL-to-Java modernization, PostgreSQL tuning, and JVM profiling.",
  ];

  function externalLink(text, href, className) {
    return h("a", { href, className, target: "_blank", rel: "noopener noreferrer" }, text);
  }

  return h("div", { className: "portfolio-home" },
    h("div", { className: "ph-shell" },
      window.renderPortfolioHeader(h, "home"),
      h("main", null,
        h("section", { className: "ph-hero", "aria-labelledby": "ph-title", ref: window.mountPortfolioHomeBackdrop },
          h("canvas", { className: "ph-signal-art", "aria-hidden": true }),
          h("div", { className: "ph-intro" },
            h("p", { className: "ph-role" }, "Nirmal Silwal · Senior Backend Software Developer"),
            h("h1", { id: "ph-title" }, "I build and operate backend services."),
            h("p", { className: "ph-summary" }, "I work through Kforce on HP PageWide Press in Oregon. My work includes Java and Spring Boot services, an event-processing migration I led for The Home Depot, and COBOL-to-Java modernization with AWS Blu Age."),
            h("div", { className: "ph-actions" },
              h("a", { className: "ph-button", href: "#/experience" }, "View experience", h("span", { "aria-hidden": true }, "↗")),
              h("a", { className: "ph-secondary", href: "/resume.html" }, "Résumé"),
              h("a", { className: "ph-secondary", href: profile.social.email }, "Email me")
            )
          ),
          h("aside", { className: "ph-proof", "aria-labelledby": "ph-proof-title" },
            h("h2", { id: "ph-proof-title" }, "AWS Blu Age via Virtusa"),
            h("dl", null,
              h("div", null, h("dt", null, "30%"), h("dd", null, "Reduction in customer issue backlog in three months")),
              h("div", null, h("dt", null, "40%"), h("dd", null, "Higher batch throughput after PostgreSQL tuning"))
            )
          ),
          h("button", { className: "ph-motion-toggle", type: "button", hidden: true },
            h("span", { className: "ph-motion-icon", "aria-hidden": true }),
            h("span", null, "Pause background")
          )
        ),
        h("section", { className: "ph-section", "aria-labelledby": "ph-case-title" },
          h("div", { className: "ph-section-heading" },
            h("h2", { id: "ph-case-title" }, "Engineering case studies")
          ),
          h("article", { className: "ph-case" },
            h("div", null,
              h("p", { className: "ph-topic" }, "The Home Depot via Kforce"),
              h("h3", null, "Reliable order events")
            ),
            h("div", { className: "ph-case-detail" },
              h("p", null, "Shipment and return events needed to keep flowing during a migration from Kafka to Google Cloud Pub/Sub. I led the migration and built Spring Boot services that validate, transform, and publish those events."),
              h("p", null, "I made duplicate events safe to process and separated retryable failures from messages that needed investigation. I validated the migrated pipelines end to end, from supplier feeds to downstream fulfillment services."),
              h("details", { className: "ph-case-more" },
                h("summary", null, "Event processing and failure handling"),
                h("ol", { className: "ph-flow", "aria-label": "Simplified message processing flow" },
                  ["Validate", "Transform", "Publish", "Deliver"].map(step => h("li", { key: step }, step))
                ),
                h("dl", { className: "ph-decisions" },
                  h("div", null, h("dt", null, "Duplicates"), h("dd", null, "Idempotent handling lets a repeated event reach the service without repeating its effect.")),
                  h("div", null, h("dt", null, "Temporary failures"), h("dd", null, "Retry messages when the failure can clear.")),
                  h("div", null, h("dt", null, "Messages that need investigation"), h("dd", null, "Route them to a dead-letter queue so the main processing path can continue."))
                )
              )
            )
          ),
          h("article", { className: "ph-case" },
            h("div", null,
              h("p", { className: "ph-topic" }, "AWS Blu Age via Virtusa"),
              h("h3", null, "Stabilizing a COBOL-to-Java migration")
            ),
            h("div", { className: "ph-case-detail" },
              h("p", null, "I helped migrate a COBOL codebase of more than 5.5 million lines into a Spring Boot monolith and debugged converted business logic after migration."),
              h("p", null, "I resolved more than 150 customer issues and used PostgreSQL query tuning and JVM profiling to improve throughput and reduce latency and memory usage."),
              h("details", { className: "ph-case-more" },
                h("summary", null, "How I investigated performance"),
                h("dl", { className: "ph-decisions" },
                  h("div", null, h("dt", null, "Database"), h("dd", null, "Tuned PostgreSQL queries and batch processing, improving throughput by 40%.")),
                  h("div", null, h("dt", null, "Runtime"), h("dd", null, "Profiled the JVM with JProfiler, reducing latency by 20% and memory use by 15%.")),
                  h("div", null, h("dt", null, "Release readiness"), h("dd", null, "Used dashboards to track migration accuracy, latency, and readiness for release."))
                )
              )
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
                h("p", { className: "ph-project-summary" }, project.description),
                name === "system-design-resources" && project.stars > 0
                  ? h("p", { className: "ph-repo-stat" }, new Intl.NumberFormat("en-US").format(project.stars), " GitHub stars")
                  : null
              );
            })
          )
        ),
        h("section", { className: "ph-section ph-community", "aria-labelledby": "ph-community" },
          h("div", null,
            h("h2", { id: "ph-community" }, "Open-source contributions"),
            h("p", null, "Read merged changes and bug reports to see how I work with other developers.")
          ),
          h("a", { className: "ph-community-link", href: "#/opensource" }, "Explore contributions ↗")
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
