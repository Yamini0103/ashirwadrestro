import { createFileRoute } from "@tanstack/react-router";
import { About, Contact, Footer, Gallery, Hero, Marquee, Menu, MobileBar, Navbar, Preloader, Reviews, Specials, Thali, Why } from "@/components/Site";
import { Cursor, ProgressBar, useLenis } from "@/components/motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ASHIRWAD Restaurant — Pure Veg North Indian, Indore" },
      { name: "description", content: "Royal pure-veg North Indian dining on Navlakha Road, Indore. Paneer specials, tandoor, thalis and sweets." },
      { property: "og:title", content: "ASHIRWAD Restaurant — Pure Veg, Pure Royal" },
      { property: "og:description", content: "Pure veg North Indian restaurant in Indore. Explore the full menu, specials and visit us." },
      { property: "og:type", content: "restaurant" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "Restaurant", name: "ASHIRWAD Restaurant", servesCuisine: "North Indian, Vegetarian", priceRange: "₹1–1,000",
        telephone: "+917987827020",
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
