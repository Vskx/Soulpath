import { NotionQuotesComponent } from "@/components/notion-quotes";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <NotionQuotesComponent />
    </div>
  );
}
