window.renderPortfolioOpenSource = function renderPortfolioOpenSource(h) {
  const github = window.portfolioGitHub;
  const { pullRequests, issues } = github;
  const { page, hero } = window.portfolioPages;

  const featured = [
    {
      url: "https://github.com/deAshish/Online-Shopping-Cart-System/pull/45",
      title: "Fixed email and transaction modules",
      description: "Updated both modules in a collaborative shopping cart project and submitted the changes for review.",
    },
    {
      url: "https://github.com/Nikzy7/Algorithm-Snippets/pull/36",
      title: "Contributed Java algorithm implementations",
      description: "Added three implementations after discussing the contribution in the project’s issue tracker.",
    },
    {
      url: "https://github.com/pravashupreti/waa-june-2022-final-project/pull/97",
      title: "Fixed duplicate seed data",
      description: "Corrected duplicate user-table values in a team web application’s data-loading workflow.",
    },
    {
      url: "https://github.com/QasimWani/LeetHub/issues/377",
      title: "Reported a LeetHub sync regression",
      description: "Documented the expected behavior, actual behavior, and a screenshot for an accepted alternate solution that failed to sync to GitHub.",
    },
  ];
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
  });

  function external(url, text, className) {
    return h("a", { href: url, className, target: "_blank", rel: "noopener noreferrer" }, text);
  }

  function contribution(item) {
    const repo = item.baseRepository || item.repository;
    const type = item.baseRepository ? "Pull request" : "Issue";
    const status = item.state || (item.closed ? "CLOSED" : "OPEN");
    return { repo: repo.owner.login + "/" + repo.name, type, status };
  }

  function counts(title, data, statuses) {
    return h("section", { className: "pd-tile os-counts", key: title },
      h("h3", null, data.totalCount + " " + title),
      h("div", { className: "os-meter", "aria-hidden": true },
        statuses.map(([key]) => h("span", { key, className: "os-" + key, style: { flexGrow: data[key] } }))
      ),
      h("dl", { className: "os-count-list" }, statuses.map(([key, label]) =>
        h("div", { key }, h("dt", null, label), h("dd", null, data[key]))
      ))
    );
  }

  function activityList(title, data) {
    return h("details", { className: "os-archive" },
      h("summary", null, title + " (" + data.length + ")"),
      h("ul", null, data.map(item => {
        const metadata = contribution(item);
        return h("li", { key: item.id },
          h("div", null, external(item.url, item.title, "pd-link"), h("p", null, metadata.repo + " #" + item.number)),
          h("span", { className: "os-archive-meta" }, metadata.status.toLowerCase(), " · ", dateFormatter.format(new Date(item.createdAt)))
        );
      }))
    );
  }

  const allItems = new Map([...pullRequests.data, ...issues.data].map(item => [item.url, item]));
  const selected = featured.filter(item => allItems.has(item.url));

  return page(h, "opensource",
    hero(h, "Open Source", "Public contributions and collaboration.",
      "Browse selected pull requests and bug reports, then explore the full GitHub activity behind them.",
      h("aside", { className: "pd-hero-aside" },
        h("h2", null, "GitHub activity"),
        h("p", null, pullRequests.totalCount, " public pull requests · ", pullRequests.merged, " merged"),
        h("p", null, issues.totalCount, " public issues"),
        external(github.profileUrl, "View GitHub profile ↗", "pd-hero-link")
      )
    ),
    h("section", { className: "pd-section", "aria-labelledby": "os-featured" },
      h("h2", { id: "os-featured" }, "Selected contributions"),
      h("div", { className: "pd-grid os-featured-grid" }, selected.map(item => {
        const metadata = contribution(allItems.get(item.url));
        return h("article", { className: "pd-tile", key: item.url },
          h("p", { className: "pd-tile-label" }, metadata.type + " · " + metadata.status.toLowerCase()),
          h("h3", null, item.title),
          h("p", null, item.description),
          h("p", { className: "os-repo" }, metadata.repo),
          external(item.url, metadata.type === "Issue" ? "Read bug report ↗" : "Review pull request ↗", "pd-link")
        );
      }))
    ),
    h("section", { className: "pd-section", "aria-labelledby": "os-activity" },
      h("div", { className: "pd-section-heading" },
        h("h2", { id: "os-activity" }, "Contribution activity"),
        h("p", { className: "os-as-of" }, "Snapshot from ", h("time", { dateTime: github.updatedAt }, dateFormatter.format(new Date(github.updatedAt))))
      ),
      h("div", { className: "pd-grid os-activity-grid" },
        counts("pull requests", pullRequests, [["open", "Open"], ["merged", "Merged"], ["closed", "Closed without merge"]]),
        counts("issues", issues, [["open", "Open"], ["closed", "Closed"]])
      ),
      activityList("Browse pull requests", pullRequests.data),
      activityList("Browse issues", issues.data)
    ),
    h("section", { className: "pd-section", "aria-labelledby": "os-organizations" },
      h("h2", { id: "os-organizations" }, "Public GitHub organizations"),
      h("ul", { className: "os-organizations" }, github.organizations.data.map(org =>
        h("li", { key: org.login }, external("https://github.com/" + org.login, org.login, "pd-link"))
      ))
    )
  );
};
