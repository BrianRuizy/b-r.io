"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CreditCard() {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  const [copied, setCopied] = useState(false);

  return (
    <div
      className="not-prose relative -ml-6 flex w-[calc(100%+48px)] max-w-none select-none items-center justify-center overflow-clip border-secondary bg-secondary p-6 md:-ml-20 md:w-[calc(100%+160px)] md:rounded-lg md:border"
      style={{ height: 400 }}
    >
      <motion.div
        onClick={handleFlip}
        animate={flipped ? "flipped" : "notFlipped"}
        whileHover={{ scale: 0.95 }}
        style={{ transformStyle: "preserve-3d" }}
        transition={{ type: "spring", duration: 1 }}
        variants={{
          flipped: {
            rotateY: 180,
            rotateX: 5,
            translateY: -50,
          },
        }}
        className="z-10 mx-auto h-56 w-96 rounded-xl border border-secondary bg-white shadow-soft hover:cursor-pointer dark:bg-[#f1f1f1]"
      >
        {/* front side */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="absolute bottom-9 left-9 flex h-full w-full flex-col justify-end gap-3"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="h-8 w-12 rounded border border-b border-neutral-500/10 border-t-black/5 bg-gradient-to-b from-neutral-100/25 to-neutral-500/25" />
            {/* prettier-ignore */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 rotate-90 text-tertiary">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"/>
            </svg>
          </div>
          <div>
            <p className="text-xs">Expires 12-2030</p>
            <p className="</svg>text-xl text-black">Brian Ruiz</p>
          </div>
        </div>

        {/* backside */}
        <div
          className="absolute bottom-9 right-9 ml-auto flex h-full w-full flex-col justify-end gap-3"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* prettier-ignore */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-tertiary">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
          </svg>
          <p className="bg-gradient-to-r from-neutral-900 to-neutral-400 bg-clip-text font-mono text-xl text-transparent">
            1234-5678-9101-1213
          </p>
        </div>
      </motion.div>

      {/* button to copy card number to clipboard */}

      <button
        onClick={() => {
          navigator.clipboard.writeText("1234-5678-9101-1213");
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="absolute bottom-24 z-0 mx-auto rounded-full border border-secondary bg-secondary px-3 py-1 text-center text-sm text-secondary transition-colors hover:bg-tertiary"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
