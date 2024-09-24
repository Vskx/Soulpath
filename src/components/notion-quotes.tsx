"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Heart as HeartIcon, Menu, Search } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface Quote {
  id: string;
  text: string;
  author: string;
  categoryId: string;
}

const categories: Category[] = [
  { id: "all", name: "All Quotes" },
  { id: "courage", name: "Courage" },
  { id: "love", name: "Love" },
  { id: "comfort", name: "Comfort" },
  { id: "sadness", name: "Sadness" },
  { id: "strength", name: "Strength" },
  { id: "anxiety", name: "Anxiety" },
  { id: "favourites", name: "Favourites" },
];

export function NotionQuotesComponent(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [favouriteQuotes, setFavouriteQuotes] = useState<string[]>([]);

  const fetchBibleQuotes = async () => {
    try {
      const response = await fetch("quotes.json");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error("Error fetching quotes:", error);
    }
  };

  const updateLocalStorage = (updatedFavourites: string[]) => {
    localStorage.setItem("favouriteQuotes", JSON.stringify(updatedFavourites));
  };

  const loadFavouriteQuotes = () => {
    const savedFavourites = localStorage.getItem("favouriteQuotes");
    if (savedFavourites) {
      setFavouriteQuotes(JSON.parse(savedFavourites));
    }
  };

  const filteredQuotes = quotes.filter(
    (quote) =>
      (selectedCategory === "all" ||
        (selectedCategory === "favourites" &&
          favouriteQuotes.includes(quote.id)) ||
        quote.categoryId === selectedCategory) &&
      (quote.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  useEffect(() => {
    fetchBibleQuotes();
    loadFavouriteQuotes();
  }, []);

  const toggleFavourite = (quoteId: string) => {
    const updatedFavourites = favouriteQuotes.includes(quoteId)
      ? favouriteQuotes.filter((id) => id !== quoteId)
      : [...favouriteQuotes, quoteId];

    setFavouriteQuotes(updatedFavourites);
    updateLocalStorage(updatedFavourites);
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside
        className={cn(
          "fixed md:relative w-64 border-r bg-muted/50 transition-transform duration-300 ease-in-out h-full z-10",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">Soulpath</h1>
          <nav>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "secondary" : "ghost"
                }
                className="w-full justify-start mb-1"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </nav>
        </div>
      </aside>

      <main
        className={cn(
          "flex-1 flex flex-col overflow-hidden transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-0"
        )}
      >
        <header className="border-b p-4 flex items-center justify-between md:justify-start">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-6 w-6" />
          </Button>
          <div className="flex-1 mx-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search quotes..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <ScrollArea className="flex-1 p-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredQuotes.map((quote) => (
              <Card
                key={quote.id}
                className="flex flex-col cursor-pointer"
                onClick={() => setSelectedQuote(quote)}
              >
                <CardHeader>
                  <CardTitle className="text-lg leading-tight">
                    {quote.text}
                  </CardTitle>
                  <CardDescription>- {quote.author}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">
                    {categories.find((c) => c.id === quote.categoryId)?.name}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavourite(quote.id);
                    }}
                    className="p-1"
                  >
                    <HeartIcon
                      className={`h-6 w-6 ${
                        favouriteQuotes.includes(quote.id)
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </main>

      {selectedQuote && (
        <AlertDialog
          open={!!selectedQuote}
          onOpenChange={() => setSelectedQuote(null)}
        >
          <AlertDialogTrigger asChild>
            <Button className="hidden">Open</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Quote</AlertDialogTitle>
              <AlertDialogDescription>
                "{selectedQuote.text}" - {selectedQuote.author}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter></AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
