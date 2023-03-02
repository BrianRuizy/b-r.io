import Section from "components/Section";

export default function Gear() {
  return (
    <>
      <div className="flex flex-col gap-20 md:gap-28">
        <div
          className="flex flex-col gap-8 animate-in"
          style={{ "--index": 1 } as React.CSSProperties}
        >
          <div>
            <h1 className="animate-in text-3xl font-bold tracking-tight">
              Gear
            </h1>
            <p
              className="animate-in text-secondary"
              style={{ "--index": 1 } as React.CSSProperties}
            >
              List of things I use and recommend.
            </p>
          </div>
          <p className="max-w-xl">
            I often get asked a lot about the things I use to build software,
            stay productive, or just to have fun. Here is a list of things I use
            and recommend.
          </p>
        </div>
        <div
          className="flex flex-col gap-16 animate-in md:gap-24"
          style={{ "--index": 2 } as React.CSSProperties}
        >
          <div className="border-primary border-0 pl-0 md:pl-4 md:border-l">
            <Section heading="Workstation" headingAlignment="left">
              <div className="flex flex-col gap-6">
                <div className="space-y-1">
                  <p>16-inch MacBook Pro</p>
                  <p className="text-secondary">
                    My main computer is a 16-inch MacBook Pro (2019) with 2.6
                    GHz 6-Core Intel Core i7, 16 GB 2667 MHz DDR4, and 1 TB SSD.
                    I use it for everything from coding to video editing.
                  </p>
                </div>
                <div className="space-y-1">
                  <p>16-inch MacBook Pro</p>
                  <p className="text-secondary">
                    My main computer is a 16-inch MacBook Pro (2019) with 2.6
                    GHz 6-Core Intel Core i7, 16 GB 2667 MHz DDR4, and 1 TB SSD.
                    I use it for everything from coding to video editing.
                  </p>
                </div>
              </div>
            </Section>
          </div>
          <div className="border-primary border-0 pl-0 md:pl-4 md:border-l">
            <Section heading="Camera" headingAlignment="left">
              <div className="flex flex-col gap-6">
                <div className="space-y-1">
                  <p>DJI Mini 3 Pro</p>
                  <p className="text-secondary">
                    The DJI Mini 3 Pro is a great drone for beginners. It has a
                    4K camera, 30 minutes of flight time, and a 3-axis gimbal.
                  </p>
                </div>{" "}
                <div className="space-y-1">
                  <p>Nikon Z6 Mirrorless</p>
                  <p className="text-secondary">
                    The Nikon Z6 is a great camera for hybrid shooting (photo
                    and video). It has a 24.5MP full-frame sensor, 273-point
                    autofocus system, and 4K video.
                  </p>
                </div>
              </div>
            </Section>
          </div>
        </div>
      </div>
    </>
  );
}
