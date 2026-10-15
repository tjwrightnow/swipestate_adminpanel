import { Block, COMPANY_NAME, CONTACT_EMAIL, Section } from "@/assests/LegalContext";
import Link from "next/link";

type LegalPageProps = {
   title: string;
   subtitle: string;
   lastUpdated: string;
   sections: Section[];
   contactLabel: string;
   mailSubject: string;
   other: { href: string; label: string };
};

type Group = { kind: "p" | "h"; text: string } | { kind: "list"; items: string[] };

const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

// Text ke andar jo URL ho usay clickable link bana deta hai
const renderText = (text: string) =>
   text.split(URL_PATTERN).map((part, index) =>
      part.startsWith("http://") || part.startsWith("https://") ? (
         <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="break-all text-[color:var(--primary-color)] underline underline-offset-2">
            {part}
         </a>
      ) : (
         <span key={index}>{part}</span>
      ),
   );

// Lagataar aane wale bullet blocks ko ek list mein jor deta hai
const groupBlocks = (blocks: Block[]): Group[] => {
   const groups: Group[] = [];

   for (const block of blocks) {
      if (block.type === "b") {
         const last = groups[groups.length - 1];
         if (last && last.kind === "list") {
            last.items.push(block.text);
         } else {
            groups.push({ kind: "list", items: [block.text] });
         }
      } else {
         groups.push({ kind: block.type, text: block.text });
      }
   }

   return groups;
};

export default function LegalPage({ title, subtitle, lastUpdated, sections, contactLabel, mailSubject, other }: LegalPageProps) {
   return (
      <main className="min-h-screen bg-lightgray pb-16">
         {/* Header */}
         <header className="border-b border-gray-100 bg-white">
            <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-10 text-center">
               <p className="text-sm font-medium tracking-wide text-[color:var(--primary-color)]">{COMPANY_NAME}</p>
               <h1 className="mt-2 text-3xl font-semibold text-gray-900 sm:text-4xl">{title}</h1>
               <span className="mt-4 inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">Last updated: {lastUpdated}</span>
               <p className="mt-4 max-w-xl text-sm leading-6 text-[color:var(--text-color)]">{subtitle}</p>
            </div>
         </header>

         <div className="mx-auto max-w-3xl px-5">
            {/* Table of contents */}
            <nav aria-label="Table of contents" className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
               <h2 className="text-sm font-semibold text-gray-900">Contents</h2>
               <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                  {sections.map((section, index) => (
                     <li key={section.id}>
                        <a href={`#${section.id}`} className="text-[color:var(--text-color)] hover:text-[color:var(--primary-color)]">
                           {index + 1}. {section.title}
                        </a>
                     </li>
                  ))}
               </ol>
            </nav>

            {/* Sections */}
            <div className="mt-6 space-y-4">
               {sections.map((section, index) => (
                  <section key={section.id} id={section.id} className="scroll-mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                     <h2 className="flex items-center gap-3 text-lg font-semibold text-gray-900">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-[color:var(--primary-color)]">{index + 1}</span>
                        {section.title}
                     </h2>

                     <div className="mt-3">
                        {groupBlocks(section.blocks).map((group, groupIndex) => {
                           if (group.kind === "h") {
                              return (
                                 <h3 key={groupIndex} className="mt-5 text-sm font-semibold text-[color:var(--primary-color)]">
                                    {group.text}
                                 </h3>
                              );
                           }

                           if (group.kind === "list") {
                              return (
                                 <ul key={groupIndex} className="mt-3 space-y-2">
                                    {group.items.map((item, itemIndex) => (
                                       <li key={itemIndex} className="flex gap-3 text-[15px] leading-7 text-[color:var(--text-color)]">
                                          <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--primary-color)]" />
                                          <span>{renderText(item)}</span>
                                       </li>
                                    ))}
                                 </ul>
                              );
                           }

                           return (
                              <p key={groupIndex} className="mt-3 text-[15px] leading-7 text-[color:var(--text-color)]">
                                 {renderText(group.text)}
                              </p>
                           );
                        })}
                     </div>
                  </section>
               ))}
            </div>

            {/* Contact */}
            <section className="mt-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
               <h2 className="text-lg font-semibold text-gray-900">Contact Us</h2>
               <p className="mt-2 text-sm text-[color:var(--text-color)]">{contactLabel}</p>
               <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(mailSubject)}`} className="mt-2 inline-block text-base font-medium text-[color:var(--primary-color)] hover:underline">
                  {CONTACT_EMAIL}
               </a>
            </section>

            <footer className="mt-8 flex flex-col items-center gap-2 text-xs text-[color:var(--gray)]">
               <Link href={other.href} className="text-sm text-[color:var(--primary-color)] hover:underline">
                  {other.label}
               </Link>
               <p>
                  &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
               </p>
            </footer>
         </div>
      </main>
   );
}
