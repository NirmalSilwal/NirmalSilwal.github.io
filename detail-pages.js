// Components for the portfolio’s detailed pages.
window.portfolioPages = (() => {
  const profile = window.portfolioContent;

  function external(h, href, label, className) {
    return h("a", { href, className, target: "_blank", rel: "noopener noreferrer" }, label);
  }

  function page(h, route, ...content) {
    return h("div", { className: "portfolio-interior pd-page pd-" + route },
      h("div", { className: "ph-shell" },
        window.renderPortfolioHeader(h, route),
        h("main", { className: "pd-main" }, ...content),
        h("footer", { className: "ph-footer" },
          h("span", null, "Nirmal Silwal · ", profile.contact.location),
          h("div", { className: "ph-footer-links" },
            external(h, profile.social.github, "GitHub"),
            external(h, profile.social.linkedin, "LinkedIn"),
            h("a", { href: profile.social.email }, "Email")
          )
        )
      )
    );
  }

  function hero(h, title, heading, summary, aside) {
    return h("header", { className: "pd-hero" },
      h("div", { className: "pd-hero-copy" },
        h("p", { className: "pd-label" }, title),
        h("h1", null, heading),
        h("p", { className: "pd-lead" }, summary)
      ),
      aside
    );
  }

  function tags(h, values) {
    return h("ul", { className: "pd-tags", "aria-label": "Topics" },
      values.map(value => h("li", { key: value }, value))
    );
  }

  function education(h, degrees, certificates) {
    const degree = degrees[0];
    const courseRepo = "https://github.com/NirmalSilwal/MIU_MSCS";
    const coursework = [
      ["Programming in Java", "Fundamental Programming Practice and Modern Programming Practices assignments.", courseRepo + "/tree/main/FPP"],
      ["Algorithms", "Course exercises and coding problems in the public M.S. repository.", courseRepo + "/tree/main/Algorithms"],
      ["Enterprise architecture", "Enterprise Architecture coursework and implementation exercises.", courseRepo + "/tree/main/EA"],
      ["Web applications", "Web Application Programming labs covering forms, JavaScript exercises, and fetching API data.", "https://github.com/NirmalSilwal/WAP_Assignments"],
    ];
    const earlier = [
      {
        title: degrees[2].subtitle,
        school: "C-DAC · SM VITA",
        period: "2018 – 2019",
        description: "Built data pipelines in Google Cloud and configured Hadoop clusters locally and with Dataproc. Studied Python, statistics, machine learning, Linux, and cloud computing.",
        url: degrees[2].website_link,
      },
      {
        title: "B.Tech. in Computer Science & Engineering, Honors",
        school: degrees[1].title,
        period: "2014 – 2018",
        description: "Studied algorithms, operating systems, databases, computer networks, and distributed systems. Completed coursework in Java and web development and earned an honors degree.",
        url: degrees[1].website_link,
      },
    ];
    return page(h, "education",
      hero(h, "Education", degree.subtitle,
        "Graduate study in Java, algorithms, web applications, and enterprise architecture, with coursework available to review on GitHub.",
        h("aside", { className: "pd-hero-aside" },
          h("h2", null, degree.title),
          h("p", null, degree.descriptions[0]),
          h("p", null, degree.duration),
          external(h, degree.website_link, "University website ↗", "pd-hero-link")
        )
      ),
      h("section", { className: "pd-section", "aria-labelledby": "pd-coursework" },
        h("div", { className: "pd-section-heading" },
          h("h2", { id: "pd-coursework" }, "Graduate coursework"),
          external(h, courseRepo, "View coursework repository ↗", "pd-link")
        ),
        h("div", { className: "pd-grid pd-course-grid" }, coursework.map(([title, description, url]) =>
          h("article", { className: "pd-tile", key: title },
            h("h3", null, title),
            h("p", null, description),
            external(h, url, "View " + title.toLowerCase() + " coursework ↗", "pd-link")
          )
        ))
      ),
      h("section", { className: "pd-section", "aria-labelledby": "pd-degrees" },
        h("h2", { id: "pd-degrees" }, "Earlier education"),
        h("div", { className: "pd-grid pd-degree-grid" }, earlier.map(item =>
          h("article", { className: "pd-tile", key: item.title },
            h("p", { className: "pd-tile-label" }, item.period),
            h("h3", null, item.title),
            h("p", { className: "pd-school" }, item.school),
            h("p", null, item.description),
            external(h, item.url, "Institution website ↗", "pd-link")
          )
        ))
      ),
      h("section", { className: "pd-section", "aria-labelledby": "pd-credentials" },
        h("h2", { id: "pd-credentials" }, "Certifications and training"),
        h("ul", { className: "pd-certificates" }, certificates.map(cert =>
          h("li", { key: cert.title },
            h("div", null, h("h3", null, cert.title), h("p", null, cert.alt_name)),
            cert.certificate_link ? external(h, cert.certificate_link, "View credential ↗", "pd-link") : null
          )
        ))
      )
    );
  }

  function projects(h) {
    const repos = new Map(window.portfolioGitHub.projects.data.map(repo => [repo.name, repo]));
    const featured = [
      ["system-design-resources", "System Design Resources", "Architecture reference", "A curated reference for designing data-intensive systems. It covers caching, sharding, replication, message queues, and consistent hashing, with examples of common system design problems.", ["Distributed systems", "Scalability", "Architecture trade-offs"]],
      ["dockerizing-spring-boot-app", "Dockerizing Spring Boot", "Backend engineering", "A Java Spring Boot example that shows the application alongside the Dockerfile and Maven wrapper used to build and package it.", ["Java", "Spring Boot", "Docker"]],
      ["Data-Structure-and-Algorithm-Java-interview-kit", "Java Algorithms & Data Structures", "Problem solving", "Java implementations and practice exercises for working through data structures and algorithm problems.", ["Java", "Data structures", "Algorithms"]],
    ];
    const additional = [
      ["SpringFrameworkDemo", "Spring Framework Demo", "Java practice", "A small Java 21 and Maven project for exploring Spring Framework fundamentals.", ["Java 21", "Spring", "Maven"]],
      ["MIU_MSCS", "Computer Science Graduate Coursework", "Academic work", "Course exercises from my M.S. program in programming, algorithms, and enterprise architecture.", ["Java", "Algorithms"]],
      ["UDACITY-Deep-Learning-Nanodegree-PROJECTS", "Deep Learning Nanodegree Projects", "Earlier coursework", "Course projects from my Udacity Deep Learning Nanodegree.", ["Deep learning"]],
    ];

    function projectTile([name, title, category, description, topics]) {
      return h("article", { className: "pd-tile pd-project-tile", key: name },
        h("p", { className: "pd-tile-label" }, category),
        h("h3", null, title),
        h("p", null, description),
        tags(h, topics),
        h("a", {
          href: repos.get(name).url,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "pd-link",
          "aria-label": "View " + title + " on GitHub",
        }, name === "system-design-resources" ? "Explore the collection ↗" : "View repository ↗")
      );
    }

    return page(h, "projects",
      hero(h, "Projects", "Software, system design, and problem solving.",
        "Public work you can inspect, from a containerized Spring Boot example to architecture references and Java algorithm implementations."
      ),
      h("section", { className: "pd-section", "aria-labelledby": "pd-featured" },
        h("div", { className: "pd-section-heading" },
          h("h2", { id: "pd-featured" }, "Featured projects"),
          external(h, profile.social.github, "GitHub profile ↗", "pd-link")
        ),
        h("div", { className: "pd-grid pd-featured-grid" }, featured.map(projectTile))
      ),
      h("section", { className: "pd-section", "aria-labelledby": "pd-additional" },
        h("h2", { id: "pd-additional" }, "More projects and coursework"),
        h("div", { className: "pd-grid pd-additional-grid" }, additional.map(projectTile))
      )
    );
  }

  function contact(h) {
    const { photo, location, map } = profile.contact;
    return page(h, "contact",
      h("section", { className: "pd-contact-panel", "aria-labelledby": "pd-contact-title" },
        h("div", { className: "pd-contact-copy" },
          h("p", { className: "pd-label" }, external(h, map, location, "pd-hero-link")),
          h("h1", { id: "pd-contact-title" }, "Let’s talk backend engineering."),
          h("p", { className: "pd-lead" }, "If you’re hiring for backend engineering or want to talk about system design and modernization, send me an email or a LinkedIn message."),
          h("div", { className: "pd-contact-actions" },
            h("a", { href: profile.social.email, className: "pd-primary" }, "Email Nirmal"),
            external(h, profile.social.linkedin, "Connect on LinkedIn ↗", "pd-hero-link"),
            h("a", { href: "/resume.html", className: "pd-hero-link" }, "Résumé")
          ),
          h("a", { className: "pd-address", href: profile.social.email }, profile.social.email.slice("mailto:".length))
        ),
        h("figure", { className: "pd-contact-photo" },
          h("img", { src: photo.src, alt: photo.alt, width: photo.width, height: photo.height })
        )
      ),
      h("div", { className: "pd-contact-paths" },
        h("article", { className: "pd-tile" },
          h("h2", null, "Review my engineering work"),
          h("p", null, "See the systems I’ve worked on and the results from my work at HP, The Home Depot, and AWS."),
          h("a", { href: "#/experience", className: "pd-link" }, "View experience ↗")
        ),
        h("article", { className: "pd-tile" },
          h("h2", null, "Explore my code"),
          h("p", null, "Browse my public repositories for Java, Spring Boot, and system design."),
          external(h, profile.social.github, "View GitHub ↗", "pd-link")
        )
      )
    );
  }

  return { page, hero, education, projects, contact };
})();
