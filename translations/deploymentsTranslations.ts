import { Translations } from "./translations";

export const deploymentsTranslations: Translations = {
    EN: {
        title: "Deployments",
        subTitle: "My deployed projects",
        description: "Here are the projects that I have developed and their live deployed statuses ! 🟢",
    },
    FR: {
        title: "Déploiements",
        subTitle: "Mes projets déployés",
        description: "Voici les projets que j'ai développé et leurs statuts de déploiements en direct ! 🟢",
    }
};

type Deployment = {
    name: string;
    image: string;
    description: { [key: string]: string };
    status?: string;
    statusLink: string;
    githubLink: string;
}

export const deployments: Deployment[] = [
    {
        "name": "Portfolio",
        "description": {
            "FR": "Mon site personnel avec mes blogs (vous y êtes actuellement !)",
            "EN": "My personal website with my blogs (your are currently on it !)"
        },
        "statusLink": "https://o-d.me/",
        "status": "pending",
        "githubLink": "https://github.com/Fyleek/o-d.me",
        "image": "/deployments/portfolio.svg"
    },
    {
        "name": "Eslint-Sort-Object-Keys",
        "description": {
            "FR": "Un plugin Eslint pour trier les clés des objets",
            "EN": "An Eslint plugin to sort object keys"
        },
        "statusLink": "online",
        "status": "pending",
        "githubLink": "",
        "image": "/deployments/eslint.svg"
    },
    {
        "name": "Reverse-Proxy",
        "description": {
            "FR": "Un reverse proxy pour mes projets déployés sur mon serveur",
            "EN": "A reverse proxy for my deployed projects on my server"
        },
        "statusLink": "online",
        "status": "pending",
        "githubLink": "",
        "image": "/deployments/traefik.svg"
    },
    {
        "name": "Home-Assistant",
        "description": {
            "FR": "Un serveur Home Assistant pour la domotique de mon domicile",
            "EN": "A Home Assistant server for the home automation of my home"
        },
        "statusLink": "online",
        "status": "pending",
        "githubLink": "",
        "image": "/deployments/homeAssistant.svg"
    },
    {
        "name": "Render-API",
        "description": {
            "FR": "CI/CD pour les statuts de déploiement entre Render et Github",
            "EN": "CI/CD for deployment statuses between Render and Github"
        },
        "statusLink": "https://render-api-gi2s.onrender.com",
        "status": "pending",
        "githubLink": "https://github.com/Fyleek/render-api",
        "image": "/deployments/renderAPI.svg"
    },
    {
        "name": "Finapi",
        "description": {
            "FR": "API pour une utilisations externe de vos portfeuille finary (Archivé)",
            "EN": "API for external use of your finary wallets (Archived)"
        },
        "statusLink": "",
        "githubLink": "https://github.com/Fyleek/finapi",
        "image": "/deployments/finary.svg"
    },
];
