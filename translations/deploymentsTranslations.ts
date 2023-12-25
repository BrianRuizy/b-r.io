import { Translations } from "./translations";

export const deploymentsTranslations : Translations = {
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
    description: {[key: string]: string};
    status?: string;
    statusLink: string;
    githubLink: string;
}

export const deployments: Deployment[] = [
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
            "FR": "API pour une utilisations externe de vos portfeuille finary",
            "EN": "API for external use of your finary wallets"
        },
        "statusLink": "",
        "githubLink": "https://github.com/Fyleek/finapi",
        "image": ""
    },
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
    }
];
