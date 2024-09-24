export default function Footer() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8"></div>
        <div className="mt-12 text-center text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Soulpath. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
