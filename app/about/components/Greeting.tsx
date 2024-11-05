'use client';

import { useEffect, useState } from 'react';

export default function Greeting() {
  const [greeting, setGreeting] = useState("Hi there");

  useEffect(() => {
    const currentHour = new Date().getHours();
    const newGreeting =
      currentHour >= 5 && currentHour < 12
        ? "Good morning,"
        : currentHour >= 12 && currentHour < 17
        ? "Good afternoon,"
        : currentHour >= 17 && currentHour < 23
        ? "Good evening,"
        : "Hello, night owl!";
    
    setGreeting(newGreeting);
  }, []);

  return <span>{greeting}</span>;
} 