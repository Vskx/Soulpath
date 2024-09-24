import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto max-w-4xl px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4">
          Ready to find more special quotes?
        </h2>
        <p className="text-xl text-muted-foreground mb-8">
          Press the button below to explore a wide variety of Bible quotes
          across different categories. If you prefer, you can also receive a
          random quote to inspire and uplift you.
        </p>
        <Link href="/quotes">
          <Button size="lg">Start</Button>
        </Link>
      </div>
    </section>
  );
}
