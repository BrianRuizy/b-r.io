
import ReactDOMServer from "react-dom/server";
import Link from "@/app/components/Link";

import LinkifyIt from "linkify-it";
import tlds from "tlds";

const linkify = LinkifyIt();
linkify.tlds(tlds);

export function getContentWithLinks(content: string) {
  return content
    .split(' ') // split by spaces only
    .map((word, index) => {
      const match = linkify.match(word);

      if (match) {
        const url = match[0].url;
        const displayUrl = url.replace(/(^\w+:|^)\/\//, ""); // remove http:// or https:// from the url
        const link = ReactDOMServer.renderToStaticMarkup(
          <Link key={index} href={url} className="break-words text-link">
            {displayUrl}
          </Link>,
        );
        return link + " "; // add a space only if the word is a URL
      }

      return word; // don't add a space if the word is not a URL
    })
    .join(" "); // join with a space
}