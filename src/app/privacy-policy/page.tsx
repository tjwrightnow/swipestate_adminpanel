import { PRIVACY_LAST_UPDATED, PRIVACY_SECTIONS } from "@/assests/LegalContext";
import LegalPage from "@/views/LegalPage/LegalPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
   title: "Privacy Policy | Swipe Estate",
   description: "How Swipe Estate collects, uses and protects your information.",
};

export default function page() {
   return (
      <LegalPage
         title="Privacy Policy"
         subtitle="Your privacy matters to Us. Here is how We collect, use and protect Your information."
         lastUpdated={PRIVACY_LAST_UPDATED}
         sections={PRIVACY_SECTIONS}
         contactLabel="Questions about this Privacy Policy?"
         mailSubject="Swipe Estate Privacy Policy"
         other={{ href: "/terms-of-use", label: "Read our Terms of Use" }}
      />
   );
}
