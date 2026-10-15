import { TERMS_LAST_UPDATED, TERMS_SECTIONS } from "@/assests/LegalContext";
import LegalPage from "@/views/LegalPage/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Terms of Use | Swipe Estate",
   description: "The terms that apply when you use Swipe Estate, including subscriptions and payments.",
};

export default function page() {
   return (
      <LegalPage
         title="Terms of Use"
         subtitle="Please read these Terms carefully. They explain the rules for using Swipe Estate, including subscriptions and payments."
         lastUpdated={TERMS_LAST_UPDATED}
         sections={TERMS_SECTIONS}
         contactLabel="Questions about these Terms?"
         mailSubject="Swipe Estate Terms of Use"
         other={{ href: "/privacy-policy", label: "Read our Privacy Policy" }}
      />
   );
}
