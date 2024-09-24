"use client";

import React, { useEffect, useState } from "react";

interface Quote {
  content: string;
  reference: string;
  translation: string;
}

const VERSES: Quote[] = [
  {
    content: "For God so loved the world...",
    reference: "John 3:16",
    translation: "NIV",
  },
  {
    content: "The Lord is my shepherd; I shall not want.",
    reference: "Psalm 23:1",
    translation: "ESV",
  },
  {
    content: "I can do all things through Christ who strengthens me.",
    reference: "Philippians 4:13",
    translation: "KJV",
  },
  {
    content: "In the beginning, God created the heavens and the earth.",
    reference: "Genesis 1:1",
    translation: "NKJV",
  },
  {
    content: "The Lord is my light and my salvation—whom shall I fear?",
    reference: "Psalm 27:1",
    translation: "NIV",
  },
  {
    content:
      "But the fruit of the Spirit is love, joy, peace, patience, kindness...",
    reference: "Galatians 5:22",
    translation: "ESV",
  },
  {
    content: "Trust in the Lord with all your heart...",
    reference: "Proverbs 3:5",
    translation: "NIV",
  },
  {
    content:
      "I am the way and the truth and the life. No one comes to the Father except through me.",
    reference: "John 14:6",
    translation: "NIV",
  },
  {
    content:
      "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.",
    reference: "Romans 6:23",
    translation: "KJV",
  },
  {
    content: "Therefore, if anyone is in Christ, he is a new creation...",
    reference: "2 Corinthians 5:17",
    translation: "ESV",
  },
  {
    content: "Be still, and know that I am God.",
    reference: "Psalm 46:10",
    translation: "NIV",
  },
  {
    content: "For we walk by faith, not by sight.",
    reference: "2 Corinthians 5:7",
    translation: "KJV",
  },
  {
    content: "Let all that you do be done in love.",
    reference: "1 Corinthians 16:14",
    translation: "ESV",
  },
  {
    content: "For I know the plans I have for you, declares the Lord...",
    reference: "Jeremiah 29:11",
    translation: "NIV",
  },
  {
    content: "The Lord is close to the brokenhearted...",
    reference: "Psalm 34:18",
    translation: "ESV",
  },
  {
    content: "Do not be anxious about anything, but in everything by prayer...",
    reference: "Philippians 4:6",
    translation: "ESV",
  },
  {
    content: "But they who wait for the Lord shall renew their strength...",
    reference: "Isaiah 40:31",
    translation: "NIV",
  },
  {
    content: "God is our refuge and strength, an ever-present help in trouble.",
    reference: "Psalm 46:1",
    translation: "NIV",
  },
  {
    content:
      "And we know that in all things God works for the good of those who love him...",
    reference: "Romans 8:28",
    translation: "NIV",
  },
  {
    content:
      "For where two or three are gathered in my name, there am I among them.",
    reference: "Matthew 18:20",
    translation: "NIV",
  },
  {
    content:
      "The name of the Lord is a strong tower; the righteous run to it and are safe.",
    reference: "Proverbs 18:10",
    translation: "NIV",
  },
  {
    content: "Cast all your anxiety on him because he cares for you.",
    reference: "1 Peter 5:7",
    translation: "NIV",
  },
  {
    content:
      "For the Spirit God gave us does not make us timid, but gives us power, love, and self-discipline.",
    reference: "2 Timothy 1:7",
    translation: "NIV",
  },
  {
    content: "Your word is a lamp for my feet, a light on my path.",
    reference: "Psalm 119:105",
    translation: "NIV",
  },
  {
    content:
      "Let the words of my mouth and the meditation of my heart be acceptable in your sight...",
    reference: "Psalm 19:14",
    translation: "ESV",
  },
  // Możesz dodać więcej wersetów tutaj
];

const DAILY_VERSES_COUNT = 3; // Liczba wersetów do pobrania każdego dnia

export default function BibleQuotesSection(): JSX.Element {
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const today = new Date().toDateString();
    const storedQuotes = localStorage.getItem(today);

    if (storedQuotes) {
      setQuotes(JSON.parse(storedQuotes));
    } else {
      // Losowanie wersetów na podstawie daty
      const shuffledVerses = VERSES.sort(() => Math.random() - 0.5); // Losowe przetasowanie
      const newQuotes = shuffledVerses.slice(0, DAILY_VERSES_COUNT); // Wybierz pierwsze 3 wersety
      setQuotes(newQuotes);
      localStorage.setItem(today, JSON.stringify(newQuotes));
    }
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto max-w-6xl px-4">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
          Verses of the Day
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {quotes.map((quote, index) => (
            <div
              key={index}
              className="bg-card rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              <p className="text-muted-foreground mb-4">
                &ldquo;{quote.content}&rdquo;
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full mr-4 flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {quote.reference.split(" ")[0][0]}
                  </span>
                </div>
                <div>
                  <p className="font-semibold">{quote.reference}</p>
                  <p className="text-sm text-muted-foreground">
                    {quote.translation}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
