"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import ReactMarkdown from "react-markdown"; // Import react-markdown

// Function to handle API requests to Google Gemini
async function fetchResponse(prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(
    process.env.NEXT_PUBLIC_API_KEY as string
  );

  const model = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return await response.text();
}

export default function HeroSection() {
  const [searchInput, setSearchInput] = useState("");
  const [responseText, setResponseText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSearch = async () => {
    setIsDrawerOpen(true);
    const result = await fetchResponse(searchInput);
    setResponseText(result);
  };

  return (
    <section className="pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
          Open your heart to God&apos;s Word
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Immerse yourself in the words of Scripture and discover God who is
          always near
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Input
            type="text"
            placeholder="Search for biblical texts"
            className="max-w-xs"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Button size="lg" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Response</DrawerTitle>
            <DrawerDescription>
              Here is the response to your prompt:
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">
            {responseText ? (
              <ReactMarkdown>{responseText}</ReactMarkdown>
            ) : (
              <p>Loading...</p>
            )}
          </div>
          <DrawerFooter>
            <DrawerClose>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </section>
  );
}
