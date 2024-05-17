import { useMDXComponent } from "next-contentlayer/hooks";

import CustomImage from "@/app/blog/components/Image";
import Link from "@/app/components/Link";
import Map from "@/app/components/bento/Map";
import Alert from "./mdx/Alert";
import Weather from "./mdx/Weather";
import WeatherList from "./mdx/WeatherList";
import LinkPreview from "./mdx/LinkPreview";
import SeriesCollapsible from "./mdx/SeriesCollapsible";

interface CustomLinkProps
  extends React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const CustomLink: React.FC<CustomLinkProps> = (props) => {
  const href = props?.href;
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"));

  if (isInternalLink) {
    return (
      <Link {...props} href={href} underline>
        {props.children}
      </Link>
    );
  }
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className="font-normal underline underline-offset-4 text-link"
      {...props}
    />
  );
};

const components = {
  Image: CustomImage,
  a: CustomLink,
  Link: CustomLink,
  Alert: Alert,
  Weather: Weather,
  WeatherList: WeatherList,
  LinkPreview: LinkPreview,
  Map: Map,
  SeriesCollapsible: SeriesCollapsible,
};

export default function MdxWrapper({ code }: { code: string }) {
  const Component = useMDXComponent(code, { components });

  return <Component components={components} />;
}
