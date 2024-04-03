import Card from "@/app/components/bento/CardTemplate";

export default function Github() {
  return (
    <Card className="grid-rows-7 grid aspect-square grid-cols-7 gap-1 p-6">
      {/* 7x7 grid */}
      {Array.from({ length: 49 }).map((_, i) => (
        <div
          key={i}
          className="col-span-1 row-span-1 aspect-square rounded bg-primary"
        ></div>
      ))}
    </Card>
  );
}
