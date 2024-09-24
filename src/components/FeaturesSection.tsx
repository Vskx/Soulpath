"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const features = [
  {
    title: "Daily Bible Verses for Every Moment",
    description:
      "Receive inspiring Bible verses tailored to your mood and needs. A new message every day to help you find peace, hope, and strength. ✝️",
  },
  {
    title: "Save Your Favorite Scriptures",
    description:
      "Bookmark your favorite verses and build a personal library of spiritual inspiration. Return to them whenever you need comfort or a reminder of God's presence. 📖",
  },
  {
    title: "Share God's Word with Others",
    description:
      "Easily share meaningful Bible verses with friends and family, spreading love, hope, and encouragement through God’s word. 🛜",
  },
];

export default function FeaturesSection() {
  const [expandedFeatures, setExpandedFeatures] = useState<number[]>([]);

  const toggleFeature = (index: number) => {
    setExpandedFeatures((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
          Features
        </h2>
        <div className="space-y-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-card rounded-lg shadow-sm p-6">
              <button
                className="flex justify-between items-center w-full text-left"
                onClick={() => toggleFeature(index)}
              >
                <span className="text-xl font-semibold">{feature.title}</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    "transition-transform duration-200",
                    expandedFeatures.includes(index) ? "rotate-180" : ""
                  )}
                />
              </button>
              <p
                className={cn(
                  "mt-4 text-muted-foreground transition-all duration-200 overflow-hidden",
                  expandedFeatures.includes(index)
                    ? "max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
