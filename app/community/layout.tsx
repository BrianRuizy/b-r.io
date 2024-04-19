import { getCommunityTopics } from "@/app/db/queries";
import User from "@/app/community/components/User";
import TopicBadge from "@/app/community/components/TopicBadge";
import Form from "@/app/community/components/Form";
import Topics from "@/app/community/components/Topics";

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { topic: string };
}) {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div className="flex animate-in items-center justify-between gap-8">
        <div>
          <h1 className="animate-in text-3xl font-bold tracking-tight">
            Community
          </h1>
          <p
            className="animate-in text-secondary"
            style={{ "--index": 1 } as React.CSSProperties}
          >
            Let&apos;s talk about it!
          </p>
        </div>
        <User />
      </div>
      <div
        className="flex animate-in flex-col gap-8"
        style={{ "--index": 2 } as React.CSSProperties}
      >
        <Topics />
        <Form />
        {children}
      </div>
    </div>
  );
}
