import { Translations } from "./translations";

export const toolsTranslations: Translations = {
    EN: {
        title: "Tools",
        subTitle: "My toolbox",
        description: "These are the tools that I recommend, I don't necessarily use some of them yet, but if they are in this list, it might not be long 😉",
        button: "Go",
    },
    FR: {
        title: "Outils",
        subTitle: "Ma boîte à outil",
        description: "Se sont les outils que je recommande,je n utilise pas forcément encore certain d entre eux, mais si ils se trouvent dans cette liste, ça risque de ne pas tarder 😉",
        button: "Visiter",
    }
};

type Tool = {
    name: string;
    category: { [key: string]: string };
    image: string;
    description: { [key: string]: string };
    link: string;
};


export const tools: Tool[] = [
    {
        "name": "Visual Studio Code",
        "category": {
            "FR": "Environnements de Développement Intégré (IDE)",
            "EN": "Integrated Development Environments (IDE)"
        },
        "description": {
            "FR": "Éditeur de code multiplateforme avec extensions variées",
            "EN": "Multi-platform code editor with various extensions"
        },
        "image": "tools/vscode.svg",
        "link": "https://code.visualstudio.com/"
    },
    {
        "name": "Visual Studio",
        "category": {
            "FR": "Environnements de Développement Intégré (IDE)",
            "EN": "Integrated Development Environments (IDE)"
        },
        "description": {
            "FR": "Éditeur de code officiel pour le .NET, C#, Visual Basic",
            "EN": "Official code editor for .NET, C#, Visual Basic"
        },
        "image": "tools/visualstudio.svg",
        "link": "https://visualstudio.microsoft.com/"
    },
    {
        "name": "PyCharm",
        "category": {
            "FR": "Environnements de Développement Intégré (IDE)",
            "EN": "Integrated Development Environments (IDE)"
        },
        "description": {
            "FR": "IDE Python avec support étendu pour frameworks web",
            "EN": "Python IDE with extended support for web frameworks"
        },
        "image": "tools/pycharm.svg",
        "link": "https://www.jetbrains.com/pycharm/"
    },
    {
        "name": "Xcode",
        "category": {
            "FR": "Environnements de Développement Intégré (IDE)",
            "EN": "Integrated Development Environments (IDE)"
        },
        "description": {
            "FR": "IDE Apple pour développement macOS et iOS",
            "EN": "Apple IDE for macOS and iOS development"
        },
        "image": "tools/xcode.svg",
        "link": "https://developer.apple.com/xcode/"
    },
    {
        "name": "Android Studio",
        "category": {
            "FR": "Environnements de Développement Intégré (IDE)",
            "EN": "Integrated Development Environments (IDE)"
        },
        "description": {
            "FR": "IDE officiel pour développement d'applications Android",
            "EN": "Official IDE for Android app development"
        },
        "image": "tools/androidstudio.svg",
        "link": "https://developer.android.com/studio"
    },
    {
        "name": "PHPStorm",
        "category": {
            "FR": "Environnements de Développement Intégré (IDE)",
            "EN": "Integrated Development Environments (IDE)"
        },
        "description": {
            "FR": "IDE pour PHP, avec support pour HTML5, CSS, JS",
            "EN": "IDE for PHP, with support for HTML5, CSS, JS"
        },
        "image": "tools/phpstorm.svg",
        "link": "https://www.jetbrains.com/phpstorm/"
    },
    {
        "name": "WebStorm",
        "category": {
            "FR": "Environnements de Développement Intégré (IDE)",
            "EN": "Integrated Development Environments (IDE)"
        },
        "description": {
            "FR": "IDE pour JavaScript moderne et frameworks web",
            "EN": "IDE for modern JavaScript and web frameworks"
        },
        "image": "tools/webstorm.svg",
        "link": "https://www.jetbrains.com/webstorm/"
    },
    {
        "name": "Git",
        "category": {
            "FR": "Gestion de Version et Outils de Collaboration",
            "EN": "Version Control and Collaboration Tools"
        },
        "description": {
            "FR": "Système de contrôle de version distribué",
            "EN": "Distributed version control system"
        },
        "image": "tools/git.svg",
        "link": "https://git-scm.com/"
    },
    {
        "name": "GitHub",
        "category": {
            "FR": "Gestion de Version et Outils de Collaboration",
            "EN": "Version Control and Collaboration Tools"
        },
        "description": {
            "FR": "Plateforme de développement collaboratif pour héberger des projets",
            "EN": "Collaborative development platform for hosting projects"
        },
        "image": "tools/github.svg",
        "link": "https://github.com/"
    },
    {
        "name": "GitLab",
        "category": {
            "FR": "Gestion de Version et Outils de Collaboration",
            "EN": "Version Control and Collaboration Tools"
        },
        "description": {
            "FR": "Plateforme web pour la gestion de version et CI/CD",
            "EN": "Web platform for version control and CI/CD"
        },
        "image": "tools/gitlab.svg",
        "link": "https://about.gitlab.com/"
    },
    {
        "name": "Docker",
        "category": {
            "FR": "Outils DevOps et Infrastructure",
            "EN": "DevOps and Infrastructure Tools"
        },
        "description": {
            "FR": "Plateforme de conteneurisation pour le développement logiciel",
            "EN": "Containerization platform for software development"
        },
        "image": "tools/docker.svg",
        "link": "https://www.docker.com/"
    },
    {
        "name": "OpenShift",
        "category": {
            "FR": "Outils DevOps et Infrastructure",
            "EN": "DevOps and Infrastructure Tools"
        },
        "description": {
            "FR": "Plateforme d'application containerisée basée sur Kubernetes",
            "EN": "Containerized application platform based on Kubernetes"
        },
        "image": "tools/openshift.svg",
        "link": "https://www.openshift.com/"
    },
    {
        "name": "Jenkins",
        "category": {
            "FR": "Outils de Déploiement et Intégration Continue (CI/CD)",
            "EN": "Deployment and Continuous Integration (CI/CD) Tools"
        },
        "description": {
            "FR": "Outil d'automatisation pour l'intégration et la livraison continues",
            "EN": "Automation tool for continuous integration and delivery"
        },
        "image": "tools/jenkins.svg",
        "link": "https://www.jenkins.io/"
    },
    {
        "name": "GitLab CI",
        "category": {
            "FR": "Outils de Déploiement et Intégration Continue (CI/CD)",
            "EN": "Deployment and Continuous Integration (CI/CD) Tools"
        },
        "description": {
            "FR": "Solution CI/CD intégrée à GitLab",
            "EN": "Integrated CI/CD solution within GitLab"
        },
        "image": "tools/gitlab.svg",
        "link": "https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/"
    },
    {
        "name": "Github Actions",
        "category": {
            "FR": "Outils de Déploiement et Intégration Continue (CI/CD)",
            "EN": "Deployment and Continuous Integration (CI/CD) Tools"
        },
        "description": {
            "FR": "Automatisation des workflows directement depuis GitHub",
            "EN": "Workflow automation directly from GitHub"
        },
        "image": "tools/githubactions.svg",
        "link": "https://github.com/features/actions"
    },
    {
        "name": "N8N",
        "category": {
            "FR": "Outils de Déploiement et Intégration Continue (CI/CD)",
            "EN": "Deployment and Continuous Integration (CI/CD) Tools"
        },
        "description": {
            "FR": "Outil d'automatisation workflow",
            "EN": "Workflow automation tool"
        },
        "image": "tools/n8n.svg",
        "link": "https://n8n.io/"
    },
    {
        "name": "Zapier",
        "category": {
            "FR": "Outils de Déploiement et Intégration Continue (CI/CD)",
            "EN": "Deployment and Continuous Integration (CI/CD) Tools"
        },
        "description": {
            "FR": "Outil pour connecter des applications et automatiser des workflows",
            "EN": "Tool to connect applications and automate workflows"
        },
        "image": "tools/zapier.svg",
        "link": "https://zapier.com/"
    },
    {
        "name": "Checkly",
        "category": {
            "FR": "Outils de Déploiement et Intégration Continue (CI/CD)",
            "EN": "Deployment and Continuous Integration (CI/CD) Tools"
        },
        "description": {
            "FR": "Monitoring et tests pour les applications web modernes",
            "EN": "Monitoring and testing for modern web applications"
        },
        "image": "tools/checkly.svg",
        "link": "https://www.checklyhq.com/"
    },
    {
        "name": "Selenium",
        "category": {
            "FR": "Outils de Test, Assurance Qualité, Sécurité",
            "EN": "Testing, Quality Assurance, Security Tools"
        },
        "description": {
            "FR": "Outil pour l'automatisation des tests de navigateurs web",
            "EN": "Tool for automating web browser tests"
        },
        "image": "tools/selenium.svg",
        "link": "https://www.selenium.dev/"
    },
    {
        "name": "Postman",
        "category": {
            "FR": "Outils de Test, Assurance Qualité, Sécurité",
            "EN": "Testing, Quality Assurance, Security Tools"
        },
        "description": {
            "FR": "Plateforme pour le développement d'API",
            "EN": "Platform for API development"
        },
        "image": "tools/postman.svg",
        "link": "https://www.postman.com/"
    },
    {
        "name": "Cypress",
        "category": {
            "FR": "Outils de Test, Assurance Qualité, Sécurité",
            "EN": "Testing, Quality Assurance, Security Tools"
        },
        "description": {
            "FR": "Outil de test pour le web",
            "EN": "Web testing tool"
        },
        "image": "tools/cypress.svg",
        "link": "https://www.cypress.io/"
    },
    {
        "name": "Checkmarx",
        "category": {
            "FR": "Outils de Test, Assurance Qualité, Sécurité",
            "EN": "Testing, Quality Assurance, Security Tools"
        },
        "description": {
            "FR": "Solution de sécurité et de qualité du code source",
            "EN": "Source code security and quality solution"
        },
        "image": "tools/checkmarx.svg",
        "link": "https://www.checkmarx.com/"
    },
    {
        "name": "SonarCloud",
        "category": {
            "FR": "Outils de Test, Assurance Qualité, Sécurité",
            "EN": "Testing, Quality Assurance, Security Tools"
        },
        "description": {
            "FR": "Service cloud pour la qualité et la sécurité du code",
            "EN": "Cloud service for code quality and security"
        },
        "image": "tools/sonarcloud.svg",
        "link": "https://sonarcloud.io/"
    },
    {
        "name": "SonarQube",
        "category": {
            "FR": "Outils de Test, Assurance Qualité, Sécurité",
            "EN": "Testing, Quality Assurance, Security Tools"
        },
        "description": {
            "FR": "Plateforme d'inspection continue de la qualité du code",
            "EN": "Continuous code quality inspection platform"
        },
        "image": "tools/sonarqube.svg",
        "link": "https://www.sonarqube.org/"
    },
    {
        "name": "Jira",
        "category": {
            "FR": "Outils de Gestion de Projet et de Suivi des Tâches",
            "EN": "Project Management and Task Tracking Tools"
        },
        "description": {
            "FR": "Outil de suivi de projet et de gestion des problèmes",
            "EN": "Project tracking and issue management tool"
        },
        "image": "tools/jira.svg",
        "link": "https://www.atlassian.com/software/jira"
    },
    {
        "name": "Notion",
        "category": {
            "FR": "Outils de Gestion de Projet et de Suivi des Tâches",
            "EN": "Project Management and Task Tracking Tools"
        },
        "description": {
            "FR": "Application pour la prise de notes et la gestion de projet",
            "EN": "Note-taking and project management application"
        },
        "image": "tools/notion.svg",
        "link": "https://www.notion.so/"
    },
    {
        "name": "GitHub (Project Management)",
        "category": {
            "FR": "Outils de Gestion de Projet et de Suivi des Tâches",
            "EN": "Project Management and Task Tracking Tools"
        },
        "description": {
            "FR": "Plateforme collaborative également utilisée pour la gestion de projet",
            "EN": "Collaborative platform also used for project management"
        },
        "image": "tools/github.svg",
        "link": "https://github.com/"
    },
    {
        "name": "VersionOne",
        "category": {
            "FR": "Outils de Gestion de Projet et de Suivi des Tâches",
            "EN": "Project Management and Task Tracking Tools"
        },
        "description": {
            "FR": "Outil pour la planification agile et la gestion de livraison",
            "EN": "Tool for agile planning and delivery management"
        },
        "image": "tools/versionone.svg",
        "link": "https://www.collab.net/products/versionone"
    },
    {
        "name": "Slack",
        "category": {
            "FR": "Outils de Gestion de Projet et de Suivi des Tâches",
            "EN": "Project Management and Task Tracking Tools"
        },
        "description": {
            "FR": "Plateforme de communication d'équipe et de collaboration",
            "EN": "Team communication and collaboration platform"
        },
        "image": "tools/slack.svg",
        "link": "https://slack.com/"
    },
    {
        "name": "Vercel",
        "category": {
            "FR": "Déploiement et Hébergement Web",
            "EN": "Web Deployment and Hosting"
        },
        "description": {
            "FR": "Plateforme cloud pour sites web et applications front-end",
            "EN": "Cloud platform for websites and front-end applications"
        },
        "image": "tools/vercel.svg",
        "link": "https://vercel.com/"
    },
    {
        "name": "Render",
        "category": {
            "FR": "Déploiement et Hébergement Web",
            "EN": "Web Deployment and Hosting"
        },
        "description": {
            "FR": "Service cloud pour applications web et bases de données",
            "EN": "Cloud service for web applications and databases"
        },
        "image": "tools/render.svg",
        "link": "https://render.com/"
    },
    {
        "name": "PlanetScale",
        "category": {
            "FR": "Déploiement et Hébergement Web",
            "EN": "Web Deployment and Hosting"
        },
        "description": {
            "FR": "Plateforme de base de données comme service",
            "EN": "Database as a service platform"
        },
        "image": "tools/planetscale.svg",
        "link": "https://planetscale.com/"
    },
    {
        "name": "Figma",
        "category": {
            "FR": "Outils de Conception UX/UI et Graphiques",
            "EN": "UX/UI and Graphic Design Tools"
        },
        "description": {
            "FR": "Outil de conception graphique et de prototypage d'interface",
            "EN": "Graphic design and interface prototyping tool"
        },
        "image": "tools/figma.svg",
        "link": "https://www.figma.com/"
    },
    {
        "name": "BrandBird",
        "category": {
            "FR": "Outils de Conception UX/UI et Graphiques",
            "EN": "UX/UI and Graphic Design Tools"
        },
        "description": {
            "FR": "Outil pour créer des visuels de marque",
            "EN": "Tool to create brand visuals"
        },
        "image": "tools/brandbird.svg",
        "link": "https://www.brandbird.app/"
    },
    {
        "name": "MongoDB Compass",
        "category": {
            "FR": "Gestion et Exploration de Bases de Données",
            "EN": "Database Management and Exploration Tools"
        },
        "description": {
            "FR": "Outil GUI pour MongoDB",
            "EN": "GUI tool for MongoDB"
        },
        "image": "tools/mongodb.svg",
        "link": "https://www.mongodb.com/products/compass"
    },
    {
        "name": "MySQL Workbench",
        "category": {
            "FR": "Gestion et Exploration de Bases de Données",
            "EN": "Database Management and Exploration Tools"
        },
        "description": {
            "FR": "Outil GUI pour MySQL",
            "EN": "GUI tool for MySQL"
        },
        "image": "tools/workbench.svg",
        "link": "https://www.mysql.com/products/workbench/"
    },
    {
        "name": "SQL Server Management Studio (SSMS)",
        "category": {
            "FR": "Gestion et Exploration de Bases de Données",
            "EN": "Database Management and Exploration Tools"
        },
        "description": {
            "FR": "Outil de gestion pour SQL Server",
            "EN": "Management tool for SQL Server"
        },
        "image": "tools/ssms.svg",
        "link": "https://docs.microsoft.com/en-us/sql/ssms/sql-server-management-studio-ssms"
    },
    {
        "name": "CodePen",
        "category": {
            "FR": "Outils de Veille Technologique",
            "EN": "Technology Monitoring Tools"
        },
        "description": {
            "FR": "Plateforme de développement front-end",
            "EN": "Front-end development platform"
        },
        "image": "tools/codepen.svg",
        "link": "https://codepen.io/"
    },
    {
        "name": "Udemy",
        "category": {
            "FR": "Outils de Veille Technologique",
            "EN": "Technology Monitoring Tools"
        },
        "description": {
            "FR": "Plateforme d'apprentissage et de formation en ligne",
            "EN": "Online learning and training platform"
        },
        "image": "tools/udemy.svg",
        "link": "https://www.udemy.com/"
    },
    {
        "name": "OpenClassRoom",
        "category": {
            "FR": "Outils de Veille Technologique",
            "EN": "Technology Monitoring Tools"
        },
        "description": {
            "FR": "Site web d'éducation et de formation en ligne",
            "EN": "Online education and training website"
        },
            "image": "tools/openclassroom.svg",
        "link": "https://openclassrooms.com/"
    },
    {
        "name": "Stack Overflow",
        "category": {
            "FR": "Outils de Veille Technologique",
            "EN": "Technology Monitoring Tools"
        },
        "description": {
            "FR": "Plateforme de questions et réponses pour les développeurs",
            "EN": "Question and answer platform for developers"
        },
        "image": "tools/stackoverflow.svg",
        "link": "https://stackoverflow.com/"
    },
    {
        "name": "Reddit",
        "category": {
            "FR": "Outils de Veille Technologique",
            "EN": "Technology Monitoring Tools"
        },
        "description": {
            "FR": "Réseau de communautés basé sur les intérêts",
            "EN": "Interest-based community network"
        },
        "image": "tools/reddit.svg",
        "link": "https://www.reddit.com/"
    },
    {
        "name": "Wired",
        "category": {
            "FR": "Outils de Veille Technologique",
            "EN": "Technology Monitoring Tools"
        },
        "description": {
            "FR": "Magazine sur l'impact de la technologie",
            "EN": "Magazine focusing on the impact of technology"
        },
        "image": "tools/wired.svg",
        "link": "https://www.wired.com/"
    },
    {
        "name": "TED Talks",
        "category": {
            "FR": "Culture Tech",
            "EN": "Tech Culture"
        },
        "description": {
            "FR": "Série de conférences sur des sujets variés, y compris la technologie",
            "EN": "Series of talks on various subjects, including technology"
        },
        "image": "tools/ted.svg",
        "link": "https://www.ted.com/"
    },
    {
        "name": "Polygon",
        "category": {
            "FR": "Culture Tech",
            "EN": "Tech Culture"
        },
        "description": {
            "FR": "Site d'actualités et de médias sur le jeu vidéo et la culture pop",
            "EN": "News and media site about video games and pop culture"
        },
        "image": "tools/polygon.svg",
        "link": "https://www.polygon.com/"
    },
    {
        "name": "Twitter(X)",
        "category": {
            "FR": "Culture Tech",
            "EN": "Tech Culture"
        },
        "description": {
            "FR": "Plateforme sociale pour les actualités et les tendances tech",
            "EN": "Social platform for tech news and trends"
        },
        "image": "tools/x.svg",
        "link": "https://twitter.com/"
    }
];
