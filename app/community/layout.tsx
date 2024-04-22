import User from "@/app/community/components/User";
import Form from "@/app/community/components/Form";
import Topics from "@/app/community/components/Topics";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      <div
        className="flex animate-in items-center justify-between gap-8"
        style={{ "--index": 1 } as React.CSSProperties}
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Community</h1>
          <p className="text-secondary">
            Let&apos;s talk about it!
            <span className="font-semibold"> (beta)</span>
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
