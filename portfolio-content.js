// Profile content consumed by the existing GitHub Pages bundle.
window.portfolioContent = {
  seo: {
    title: "Nirmal Silwal | Backend Software Engineer",
    description: "Nirmal Silwal is a Senior Software Developer working through Kforce on HP PageWide Press in Oregon.",
    og: {
      title: "Nirmal Silwal | Backend Software Engineer",
      type: "website",
      url: "https://nirmalsilwal.github.io/",
    },
  },
  introduction: "I work through Kforce on the Digital Front End team for HP PageWide Press in Oregon. My background spans backend development, system design, and troubleshooting distributed systems.",
  social: {
    github: "https://github.com/NirmalSilwal",
    linkedin: "https://www.linkedin.com/in/nirmal-silwal/",
    email: "mailto:nirmalsilwal2019@gmail.com",
  },
  workHistory: [
    {
      title: "Senior Software Developer",
      company: "Kforce · Client: HP PageWide Press",
      company_url: "https://www.hp.com/us-en/commercial-industrial-printing/pagewide-web-press.html",
      logo_path: "experience.svg",
      duration: "Present",
      location: "Oregon, United States",
      description: "Work through Kforce on the Digital Front End (DFE) team for HP PageWide Press. Develop, maintain, and support the software that processes print jobs and coordinates workflows for high-speed industrial inkjet presses.",
      details: [
        {
          "title": "Digital Front End development",
          "items": [
            "Maintain the DFE backend that accepts print jobs and coordinates their processing for high-speed industrial inkjet presses.",
            "Develop and enhance services and microservices using Groovy, Grails, Java, and Kotlin. Work across application and service tiers when a change affects more than one part of the print workflow."
          ]
        },
        {
          "title": "Customer issue investigation",
          "items": [
            "Troubleshoot reports from customers using different HP PageWide Press products. Investigate failures in job submission, workflow orchestration, and how jobs behave on the press.",
            "Use application logs and MariaDB records to trace where a workflow breaks. Inspect Linux environments, virtual machines, and deployed services when the evidence points beyond the application layer.",
            "Work with software, firmware, and product engineering teams when an issue involves more than one tier or crosses the boundary between the DFE and the press."
          ]
        },
        {
          "title": "Testing, deployment, and releases",
          "items": [
            "Use Docker, Kubernetes, Jenkins, and CI/CD pipelines to support integration testing and deploy containerized services.",
            "Deliver customer fixes and backend enhancements in two-week Scrum sprints and collaborate with partner teams on production releases."
          ]
        }
      ],
      color: "#0879bf",
    },
    {
      title: "Senior Software Developer",
      company: "Kforce · Client: The Home Depot",
      company_url: "https://www.kforce.com/",
      logo_path: "experience.svg",
      duration: "September 2025 – March 2026",
      location: "Dallas, Texas, United States",
      description: "Worked through Kforce on The Home Depot’s Customer Order Management platform, where distributed services handle millions of shipment and fulfillment events daily.",
      details: [
        {
          "title": "Shipment and return processing",
          "items": [
            "Built Java and Spring Boot services that consume, validate, transform, and publish shipment and return events across distributed fulfillment systems.",
            "Separated validation, XML transformation, and publishing so each step could be maintained and tested independently. Built reusable XML-to-domain mappings for supplier advance shipment notices.",
            "Extended return workflows for automatic refund eligibility, reward-card refund routing, SORIS returns, and job-site pickups."
          ]
        },
        {
          "title": "Kafka-to-Pub/Sub migration",
          "items": [
            "Led the migration of high-volume event processing from Apache Kafka to Google Cloud Pub/Sub. Used Terraform to provision topics, subscriptions, dead-letter resources, and IAM roles.",
            "Added idempotent handling for duplicate messages, validation guards, and separate paths for retryable and non-retryable failures. Routed messages that couldn’t be processed to dead-letter queues for investigation.",
            "Validated the migrated pipelines end to end across shipments, returns, and supplier feeds, including event propagation to downstream services."
          ]
        },
        {
          "title": "Production reliability",
          "items": [
            "Used structured logs, metrics, distributed tracing, and BigQuery to investigate downstream failures and check how dependent services consumed events.",
            "Partnered with SRE and platform engineering through GitHub pull requests, CI/CD pipelines, and production releases. Maintained operational runbooks for support."
          ]
        }
      ],
      color: "#0879bf",
    },
    {
      title: "Senior Software Engineer",
      company: "Virtusa · Client: Amazon Web Services",
      company_url: "https://www.virtusa.com/",
      logo_path: "experience.svg",
      duration: "May 2023 – July 2025",
      location: "Dallas, Texas, United States",
      description: "Contracted through Virtusa with the AWS Blu Age team, modernizing legacy IBM AS/400 and COBOL applications into Java Spring Boot applications while preserving the original business workflows.",
      details: [
        {
          "title": "COBOL-to-Java modernization",
          "items": [
            "Supported the modernization of an IBM AS/400 and COBOL codebase of more than 5.5 million lines into a Java Spring Boot monolith.",
            "Used Java 17+ and Spring Boot to maintain APIs, debug converted business logic, and resolve regressions in enterprise workflows after migration.",
            "Resolved more than 150 customer-reported issues, reducing the backlog by 30% in three months."
          ]
        },
        {
          "title": "Database and JVM performance",
          "items": [
            "Tuned PostgreSQL queries and batch processing with pgAdmin, improving throughput by 40%.",
            "Profiled JVM memory and runtime behavior with JProfiler, reducing latency by 20% and memory usage by 15%.",
            "Built data analysis pipelines and dashboards to track migration accuracy, application latency, and readiness for release."
          ]
        },
        {
          "title": "AWS integration and developer tooling",
          "items": [
            "Worked with EC2, S3, RDS, Lambda, API Gateway, CloudWatch, SQS, and SNS to deploy, monitor, and support the modernized application and its integrations.",
            "Maintained source control in AWS CodeCommit and used Jenkins and AWS CodePipeline to support repeatable CI/CD workflows.",
            "Used CodeSplit, a Python automation tool, to extract dependencies from large codebases and speed up debugging and developer environment setup.",
            "Implemented OAuth 2.0, JWT authentication, and role-based access controls for backend APIs."
          ]
        },
        {
          "title": "Team delivery",
          "items": [
            "Participated in sprint planning, standups, and code reviews. Guided junior developers on Java backend development and AWS integration.",
            "Coordinated with infrastructure and cross-functional teams on monitoring, production issue investigation, and weekly deployments."
          ]
        }
      ],
      color: "#0879bf",
    },
    {
      title: "Junior Software Engineer",
      company: "LearningMate",
      company_url: "https://learningmate.com/",
      logo_path: "LearningMate-logo.png",
      duration: "April 2019 – January 2020",
      location: "Mumbai, India",
      description: "Built image-captioning workflows for accessible educational content using AWS SageMaker, TensorFlow, and Keras.",
      details: [
        {
          "title": "Accessibility and dataset preparation",
          "items": [
            "Worked on automated alt text for educational images so people who use screen readers could understand the image content.",
            "Prepared and cleaned captioning data using Flickr8k, Flickr30k, MS COCO, and Conceptual Captions. Created synthetic image-caption data to evaluate the feasibility of automated alt text.",
            "Automated data preparation and model training with Python, reducing manual effort by 90%."
          ]
        },
        {
          "title": "Model training and evaluation",
          "items": [
            "Built and trained image-captioning models with TensorFlow and Keras, including training jobs in AWS SageMaker script mode.",
            "Fine-tuned convolutional networks and applied transfer learning with ResNet and Inception. Model convergence was 40% faster with limited labeled data.",
            "Optimized distributed training workflows for 30% faster training and 25% lower latency."
          ]
        },
        {
          "title": "Natural language generation",
          "items": [
            "Prepared SQuAD data and GloVe word vectors for a separate natural question generation project."
          ]
        }
      ],
      color: "#0879bf",
    },
  ],
  internshipsAndTraining: [
    {
      title: "Junior Java Developer (Training)",
      company: "TechMentro",
      company_url: "https://in.linkedin.com/in/tech-mentro-12674167",
      logo_path: "techmentro-logo.png",
      duration: "June – November 2017",
      location: "Noida, Uttar Pradesh, India",
      description: "Built and tested REST APIs and web applications with Java, Spring, and Hibernate.",
      highlights: [
        "Implemented web and API functionality with Spring MVC and Hibernate persistence.",
        "Practiced test-driven development, performance tuning, and version control.",
      ],
      color: "#0879bf",
    },
    {
      title: "Big Data Trainee",
      company: "KARD India",
      company_url: "https://www.linkedin.com/company/kard-india/about/",
      logo_path: "kardIndia-logo.png",
      duration: "June – July 2017",
      location: "Noida, Uttar Pradesh, India",
      description: "Helped set up a Hadoop cluster and practiced batch data processing with HDFS, MapReduce, Hive, and Pig.",
      highlights: [
        "Used HDFS for distributed storage and MapReduce for batch processing.",
        "Practiced querying and transforming data with Hive and Pig.",
      ],
      color: "#ee3c26",
    },
  ],
  extracurriculars: [
    {
      title: "Robotics and Coding Competitions",
      company: "ABSS Institute of Technology",
      company_url: "https://www.abss.edu.in/",
      logo_path: "abss-logo.jfif",
      duration: "2014 – 2018",
      location: "Meerut, Uttar Pradesh, India",
      description: "My three-person team won the Live Project competition at Confluence with an Arduino line-following robot. I placed second in Codejam, a C debugging and program-output contest. Our team also won the Best Out of Waste challenge with a project made from reused campus materials.",
      video: "https://youtu.be/joTxrcp3HU0",
      color: "#4285F4",
    },
  ],
  latestDegree: {
    title: "Maharishi International University",
    subtitle: "M.S. in Computer Science",
    logo_path: "education.svg",
    alt_name: "",
    duration: "January 2022 – June 2025",
    descriptions: ["Fairfield, Iowa, United States"],
    website_link: "https://www.miu.edu/",
  },
  backendSkills: {
    title: "Backend Engineering",
    fileName: "FullStackImg",
    skills: [
      "Java, Spring Boot, REST APIs, and microservices",
      "Kafka, Google Cloud Pub/Sub, and reliable event processing",
      "PostgreSQL, SQL performance tuning, and JVM profiling",
      "AWS, Google Cloud, Docker, Terraform, and CI/CD",
    ],
    softwareSkills: [],
  },
  experienceSubtitle: "Backend Engineering and Cloud Modernization",
  experienceSummary: "I’m a Senior Software Developer working through Kforce on HP’s Digital Front End team in Oregon. Before HP, I built Spring Boot services for The Home Depot through Kforce and worked on COBOL-to-Java modernization with AWS Blu Age through Virtusa.",
  projectsSummary: "Explore backend development with Java and Spring, system design resources, and data structure and algorithm practice. You’ll also find my graduate coursework and earlier deep learning projects.",
  contact: {
    description: "Connect with me on LinkedIn or explore my open-source work on GitHub.",
    photo: {
      src: "/static/media/oregonprofilepic.jpg",
      alt: "Nirmal Silwal looking out over the Oregon coast at sunset",
      width: 900,
      height: 1200,
    },
    location: "Oregon, USA",
    map: "https://www.google.com/maps/search/?api=1&query=Oregon%2C+USA",
  },
};
