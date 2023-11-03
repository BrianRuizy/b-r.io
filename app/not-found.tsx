import Link from "@/components/ui/Link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Oscar Decloquement",
  description:
    "Uh oh! This page does not exist",
};

const Custom404 = (): JSX.Element => (
  <div className="flex flex-col gap-2">
    <h1>404 - Page non trouvée</h1>
    <p className="text-secondary">
      Oh! Cette page n&apos;existe pas, vous avez surement cliqué sur un mauvais lien. Merci de réessayer…
    </p>
    <div className="h-2" />
    <Link href="/" underline>
      Retourner sur la page d&apos;accueil
    </Link>
  </div>
);

export default Custom404;
