import { useMDXComponent } from "next-contentlayer/hooks";

import CustomImage from "@/components/ui/Image";
import Link from "@/components/ui/Link";
import Alert from "./Alert";
import Parallax from "./parallax";
import Weather from "./Weather";
import WeatherList from "./WeatherList";

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
      <Link {...props} href={href} legacyBehavior>
        <a>{props.children}</a>
      </Link>
    );
  }
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const components = {
  Image: CustomImage,
  a: CustomLink,
  Link: CustomLink,
  Alert: Alert,
  Parallax: Parallax,
  Weather: Weather,
  WeatherList: WeatherList,
};

export default function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code, { components });

  return <Component components={components} />;
}
