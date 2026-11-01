import { createFileRoute } from "@tanstack/react-router";
import { About, Contact, Footer, Gallery, Hero, Journey, Marquee, Menu, MobileBar, Navbar, Preloader, Reviews, Specials, Thali, Why } from "@/components/Site";
import { Cursor, ProgressBar, useLenis } from "@/components/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ASHIRWAD RESTAURANT" },
      { name: "description", content: "100% pure-veg North Indian dining on Navlakha Road, Indore — slow-cooked paneer gravies, tandoor grills, thalis and mithai. Call 9981401199 to book a table." },
      { property: "og:title", content: "ASHIRWAD RESTAURANT" },
      { property: "og:description", content: "Pure-veg North Indian restaurant in Indore. Explore the full menu, signature specials and thalis, then come dine with us." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Restaurant", name: "ASHIRWAD RESTAURANT", servesCuisine: "North Indian, Vegetarian", priceRange: "₹1–1,000",
        telephone: "+919981401199",
        email: "sharmabhanu517@gmail.com",
        address: { "@type": "PostalAddress", streetAddress: "8, Navlakha Rd, Janki Nagar", addressLocality: "Indore", addressRegion: "MP", postalCode: "452001", addressCountry: "IN" },
        aggregateRating: { "@type": "AggregateRating", ratingValue: 4.2, reviewCount: 407 },
      }),
    }],
  }),
  component: Index,
});

function Index() {
  useLenis();
  return (
    <main className="overflow-x-clip">
      <Preloader />
      <ProgressBar />
      <Cursor />
      <Navbar />
      <Hero />
      <Marquee />
      <About />
      <Journey />
      <Specials />
      <Menu />
      <Thali />
      <Gallery />
      <Reviews />
      <Why />
      <Contact />
      <Footer />
      <MobileBar />
    </main>
  );
}
