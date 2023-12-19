import { Translations } from "./translations";

export const toolsTranslations: Translations = {
    EN: {
        title: "Tools",
        subTitle: "My toolbox",
        description: "These are the tools that I recommend, I don't necessarily use some of them yet, but if they are in this list, it might not be long 😉",
    },
    FR: {
        title: "Outils",
        subTitle: "Ma boîte à outil",
        description: "Se sont les outils que je recommande, je n utilise pas forcément encore certain d entre eux, mais si ils se trouvent dans cette liste, ça risque de ne pas tarder 😉",
    }
};

type Tool = {
    name: string;
    category: string;
    image: string;
    description: string;
    link: string;
};

type ToolsByLanguage = {
    [key: string]: Tool[];
};

export const tools: ToolsByLanguage = {
    FR: [
        {
            name: "Test",
            category: "Test",
            image: "",
            description: "Test description",
            link: "https://test.com",
        }
    ],
    EN: [
        {
            name: "Test",
            category: "Test",
            image: "",
            description: "Test description",
            link: "https://test.com",
        }
    ]
}