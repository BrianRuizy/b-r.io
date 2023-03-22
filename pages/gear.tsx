import Section from "components/Section";

interface ItemProps {
  title: string;
  description: string;
}

const Item = ({ title, description }: ItemProps) => (
  <li className="flex gap-4 items-center">
    <div className="bg-tertiary rounded-lg border border-primary overflow-hidden aspect-square w-[4rem] min-w-[4rem] h-16"></div>
    <div>
      <h3 className="text-primary">{title}</h3>
      <p className="text-sm text-secondary line-clamp-1 mb-1">{description}</p>
    </div>
    <a className="ml-auto text-sm rounded-full px-3 bg-secondary text-blue w-fit">Get</a>

  </li>
);

const gear = [
  {
    category: "Computer",
    title: "16-inch MacBook Pro",
    description: "A Real Workhorse",
  },
  {
    category: "Computer",
    title: "16-inch MacBook Pro",
    description: "My main computer lorem",
  },
  {
    category: "Computer",
    title: "16-inch MacBook Pro",
    description: "My main computer lorem",
  },
  {
    category: "Camera",
    title: "16-inch MacBook Pro",
    description: "I lorem",
  },
  {
    category: "Computer",
    title: "16-inch MacBook Pro",
    description: "My main lorem)",
  },
  {
    category: "Computer",
    title: "16-inch MacBook Pro",
    description: "My main computer lorem",
  },
];

export default function Gear() {
  const categories = gear.reduce((acc, item) => {
    if (!acc.includes(item.category)) {
      acc.push(item.category);
    }
    return acc;
  }, [] as string[]);

  return (
    <>
      <div className="flex flex-col gap-20 md:gap-28">
        <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">My Gear</h1>
            <p className="animate-in text-secondary">Things I use and recommend.</p>
          </div>
        </div>
        <div
          className="flex flex-col gap-16 animate-in md:gap-24"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          {categories.map((category, index) => (
            <section className="flex flex-col gap-4 " key={index}>
              <h2>{category}</h2>
              <ul className="grid md:grid-cols-2 gap-6 animated-list">
                {gear.map((item, index) => {
                  if (item.category === category) {
                    return (
                      <Item
                        key={index}
                        title={item.title}
                        description={item.description}
                      />
                    );
                  } else {
                    return null;
                  }
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
