import { type NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const username = searchParams.get('username')

  if (!username) {
    return new Response("Please provide a username", {status: 200})
  }
  try {
    const url = `https://api.github.com/users/${username}/repos?per_page=100`;

    const response = await fetch(url);
    const data = await response.json();
    const numberOfProject = data.length;

    const languagesLinks: Array<string> = [];

    if (data.message && data.documentation_url) {
      throw new Error('API rate limit exceeded');
    }

    data.forEach((project : {languages_url: string}) => {
      languagesLinks.push(project.languages_url);
    });

    const languesData = await Promise.all(languagesLinks.map(async (link: string) => {
      const response = await fetch(link);
      const result = await response.json();
      return result;
    }));

    const languageTotals: { [key: string]: number } = {};

    languesData.forEach((data) => {
      Object.keys(data).forEach((languageName) => {
        const numberOfLine = data[languageName];
        if (languageTotals[languageName]) {
          languageTotals[languageName] += numberOfLine;
        } else {
          languageTotals[languageName] = numberOfLine;
        }
      });
    });

    return Response.json({ "numberOfProject": numberOfProject, "languageTotals": languageTotals});
  } catch (err) {
    return new Response(`Something went wrong: ${err}`, {status: 200})
  }
}
