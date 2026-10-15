export const COMPANY_NAME = 'Swipe Estate';
export const CONTACT_EMAIL = 'Tj@noircash.com';
export const PRIVACY_LAST_UPDATED = 'February 25, 2026';
export const TERMS_LAST_UPDATED = 'October 15, 2026';

export type Block =
    | { type: 'p'; text: string }
    | { type: 'h'; text: string }
    | { type: 'b'; text: string };

export type Section = {
    id: string;
    title: string;
    blocks: Block[];
};

/* ----------------------------- PRIVACY POLICY ----------------------------- */
export const PRIVACY_SECTIONS: Section[] = [
    {
        id: 'intro',
        title: 'Introduction',
        blocks: [
            {
                type: 'p',
                text: 'This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.',
            },
            {
                type: 'p',
                text: 'We use Your Personal Data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.',
            },
        ],
    },
    {
        id: 'definitions',
        title: 'Definitions',
        blocks: [
            {
                type: 'p',
                text: 'Words with capitalized initial letters have the meanings below, whether they appear in singular or plural.',
            },
            {
                type: 'b',
                text: 'Account: a unique account created for You to access our Service or parts of it.',
            },
            {
                type: 'b',
                text: 'Affiliate: an entity that controls, is controlled by, or is under common control with a party (50% or more ownership).',
            },
            {
                type: 'b',
                text: 'Application: Swipe Estate, the software program provided by the Company.',
            },
            {
                type: 'b',
                text: 'Company ("We", "Us", "Our"): Swipe Estate.',
            },
            { type: 'b', text: 'Country: Texas, United States.' },
            {
                type: 'b',
                text: 'Device: any device that can access the Service, such as a computer, cell phone or digital tablet.',
            },
            {
                type: 'b',
                text: 'Personal Data: any information that relates to an identified or identifiable individual.',
            },
            { type: 'b', text: 'Service: the Application.' },
            {
                type: 'b',
                text: 'Service Provider: any person or company that processes data on behalf of the Company or helps deliver and analyze the Service.',
            },
            {
                type: 'b',
                text: 'Usage Data: data collected automatically from the use of the Service or its infrastructure (for example, the duration of a page visit).',
            },
            {
                type: 'b',
                text: 'You: the individual (or legal entity) accessing or using the Service.',
            },
        ],
    },
    {
        id: 'collect',
        title: 'Data We Collect',
        blocks: [
            { type: 'h', text: 'Personal Data' },
            {
                type: 'p',
                text: 'While using Our Service, We may ask You to provide personally identifiable information that can be used to contact or identify You, including:',
            },
            { type: 'b', text: 'Email address' },
            { type: 'b', text: 'First name and last name' },
            { type: 'b', text: 'Phone number' },
            { type: 'h', text: 'Usage Data' },
            {
                type: 'p',
                text: "Usage Data is collected automatically and may include Your Device's IP address, browser type and version, pages visited, time and date of visit, time spent on pages, unique device identifiers and other diagnostic data.",
            },
            {
                type: 'p',
                text: 'On a mobile device, We may also collect the type of device, its unique ID, IP address, operating system, mobile browser type and other diagnostic data.',
            },
            { type: 'h', text: 'Information Collected via the Application' },
            {
                type: 'p',
                text: 'With Your prior permission, We may collect:',
            },
            { type: 'b', text: 'Information regarding your location' },
            { type: 'b', text: "Information from your Device's phone book (contacts list)" },
            {
                type: 'b',
                text: "Pictures and other information from your Device's camera and photo library",
            },
            {
                type: 'p',
                text: "This information is used to provide and improve Our features. It may be uploaded to the Company's or a Service Provider's servers, or simply stored on Your device. You can enable or disable access at any time through Your Device settings.",
            },
        ],
    },
    {
        id: 'use',
        title: 'How We Use Your Data',
        blocks: [
            { type: 'p', text: 'The Company may use Personal Data to:' },
            {
                type: 'b',
                text: 'Provide and maintain our Service, including monitoring its usage.',
            },
            {
                type: 'b',
                text: 'Manage Your Account and registration as a user of the Service.',
            },
            {
                type: 'b',
                text: 'Perform a contract, including the purchase of products, items or services through the Service.',
            },
            {
                type: 'b',
                text: 'Contact You by email, phone, SMS or push notifications about updates, security and related communications.',
            },
            {
                type: 'b',
                text: 'Send news, special offers and information about similar goods, services and events (unless You opt out).',
            },
            { type: 'b', text: 'Attend to and manage Your requests.' },
            {
                type: 'b',
                text: 'Evaluate or conduct a merger, divestiture, restructuring or sale of assets (business transfers).',
            },
            {
                type: 'b',
                text: 'Other purposes such as data analysis, identifying usage trends, measuring promotional campaigns and improving Our Service and your experience.',
            },
        ],
    },
    {
        id: 'share',
        title: 'Sharing Your Data',
        blocks: [
            { type: 'p', text: 'We may share Your Personal Data in these situations:' },
            {
                type: 'b',
                text: 'With Service Providers: to monitor and analyze use of our Service and to contact You.',
            },
            {
                type: 'b',
                text: 'Business transfers: during a merger, sale of Company assets, financing, or acquisition.',
            },
            {
                type: 'b',
                text: 'With Affiliates: who are required to honor this Privacy Policy.',
            },
            {
                type: 'b',
                text: 'With business partners: to offer You certain products, services or promotions.',
            },
            {
                type: 'b',
                text: 'With other users: information You share in public areas may be viewed by all users and publicly distributed.',
            },
            {
                type: 'b',
                text: 'With Your consent: for any other purpose You agree to.',
            },
        ],
    },
    {
        id: 'retention',
        title: 'Data Retention',
        blocks: [
            {
                type: 'p',
                text: 'We retain Your Personal Data only as long as necessary for the purposes in this policy, to comply with legal obligations, resolve disputes and enforce our agreements. Where possible, We apply shorter retention periods or anonymize data. The periods below are maximums.',
            },
            {
                type: 'b',
                text: 'User accounts: duration of your account plus up to 24 months after closure.',
            },
            {
                type: 'b',
                text: 'Support tickets and correspondence: up to 24 months after ticket closure.',
            },
            {
                type: 'b',
                text: 'Chat transcripts: up to 24 months for quality assurance and training.',
            },
            {
                type: 'b',
                text: 'Application usage statistics: up to 24 months.',
            },
            {
                type: 'b',
                text: 'Server logs (IP addresses, access times): up to 24 months for security and troubleshooting.',
            },
            { type: 'h', text: 'We may keep data longer when' },
            { type: 'b', text: 'The law requires it (e.g. tax records).' },
            {
                type: 'b',
                text: 'It is needed to establish, exercise or defend legal claims.',
            },
            { type: 'b', text: 'You explicitly ask Us to retain it.' },
            {
                type: 'b',
                text: 'It sits in backup systems scheduled for routine deletion.',
            },
            { type: 'h', text: 'When retention ends' },
            {
                type: 'b',
                text: 'Deletion: data is removed from Our systems and no longer actively processed.',
            },
            {
                type: 'b',
                text: 'Backups: residual copies may remain in encrypted backups for a limited period and are not restored except for security, disaster recovery or legal compliance.',
            },
            {
                type: 'b',
                text: 'Anonymization: data may be converted to anonymous statistics that cannot be linked back to You and may be kept indefinitely.',
            },
        ],
    },
    {
        id: 'transfer',
        title: 'Transfer of Your Data',
        blocks: [
            {
                type: 'p',
                text: "Your information is processed at the Company's operating offices and any other places where the parties involved in processing are located. It may be transferred to, and maintained on, computers outside Your state, province or country where data protection laws may differ.",
            },
            {
                type: 'p',
                text: 'Where required by law, We ensure international transfers are subject to appropriate safeguards. We take all steps reasonably necessary to ensure Your data is treated securely, and no transfer takes place unless adequate controls are in place.',
            },
        ],
    },
    {
        id: 'delete',
        title: 'Delete Your Data',
        blocks: [
            {
                type: 'p',
                text: 'You have the right to delete, or request that We assist in deleting, the Personal Data We have collected about You.',
            },
            {
                type: 'p',
                text: 'You can update, amend or delete Your information at any time by signing in to Your Account and visiting the account settings section. You may also contact Us to request access to, correction of, or deletion of Personal Data You have provided.',
            },
            {
                type: 'p',
                text: 'Note that We may need to retain certain information when We have a legal obligation or lawful basis to do so.',
            },
        ],
    },
    {
        id: 'disclosure',
        title: 'Disclosure of Your Data',
        blocks: [
            { type: 'h', text: 'Business transactions' },
            {
                type: 'p',
                text: 'If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. We will provide notice before it becomes subject to a different Privacy Policy.',
            },
            { type: 'h', text: 'Law enforcement' },
            {
                type: 'p',
                text: 'We may be required to disclose Your Personal Data if required by law or in response to valid requests by public authorities (e.g. a court or government agency).',
            },
            { type: 'h', text: 'Other legal requirements' },
            {
                type: 'p',
                text: 'We may disclose Your Personal Data in good faith belief that it is necessary to:',
            },
            { type: 'b', text: 'Comply with a legal obligation.' },
            { type: 'b', text: 'Protect and defend the rights or property of the Company.' },
            {
                type: 'b',
                text: 'Prevent or investigate possible wrongdoing in connection with the Service.',
            },
            {
                type: 'b',
                text: 'Protect the personal safety of Users of the Service or the public.',
            },
            { type: 'b', text: 'Protect against legal liability.' },
        ],
    },
    {
        id: 'security',
        title: 'Security',
        blocks: [
            {
                type: 'p',
                text: 'The security of Your Personal Data is important to Us. We use commercially reasonable means to protect it, but no method of transmission over the Internet or electronic storage is 100% secure, so We cannot guarantee its absolute security.',
            },
        ],
    },
    {
        id: 'thirdparty',
        title: 'Third-Party Services',
        blocks: [
            {
                type: 'p',
                text: 'Service Providers We use may have access to Your Personal Data. These vendors collect, store, use, process and transfer information about Your activity on Our Service in accordance with their own Privacy Policies.',
            },
            { type: 'h', text: 'Mouseflow' },
            {
                type: 'p',
                text: 'A session replay and heatmap tool that shows how visitors click, move, scroll and browse. It may collect information from Your device.',
            },
            { type: 'h', text: 'Google Places' },
            {
                type: 'p',
                text: 'A service that returns information about places using HTTP requests, operated by Google. It may collect information from You and Your Device for security purposes.',
            },
        ],
    },
    {
        id: 'children',
        title: "Children's Privacy",
        blocks: [
            {
                type: 'p',
                text: 'Our Service does not address anyone under the age of 16. We do not knowingly collect personally identifiable information from anyone under 16.',
            },
            {
                type: 'p',
                text: 'If You are a parent or guardian and know that Your child has provided Us with Personal Data, please contact Us. If We learn that We have collected such data without verified parental consent, We take steps to remove it from Our servers.',
            },
            {
                type: 'p',
                text: "If We rely on consent as a legal basis and Your country requires parental consent, We may require Your parent's consent before collecting and using that information.",
            },
        ],
    },
    {
        id: 'links',
        title: 'Links to Other Websites',
        blocks: [
            {
                type: 'p',
                text: 'Our Service may contain links to third-party websites not operated by Us. If You click a third-party link, You will be directed to that site. We strongly advise You to review the Privacy Policy of every site You visit.',
            },
            {
                type: 'p',
                text: 'We have no control over, and assume no responsibility for, the content, privacy policies or practices of any third-party sites or services.',
            },
        ],
    },
    {
        id: 'changes',
        title: 'Changes to This Policy',
        blocks: [
            {
                type: 'p',
                text: 'We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.',
            },
            {
                type: 'p',
                text: 'We will let You know via email and/or a prominent notice on Our Service prior to the change becoming effective, and update the "Last updated" date at the top of this policy.',
            },
            {
                type: 'p',
                text: 'You are advised to review this Privacy Policy periodically. Changes are effective when they are posted on this page.',
            },
        ],
    },
];

/* ----------------------------- TERMS OF USE ----------------------------- */
export const TERMS_SECTIONS: Section[] = [
    {
        id: 'agreement',
        title: 'Agreement to Terms',
        blocks: [
            {
                type: 'p',
                text: `These Terms of Use ("Terms") are a legal agreement between You and Swipe Estate ("We", "Us", "Our") governing Your access to and use of the Swipe Estate mobile application and any related services (the "Service").`,
            },
            {
                type: 'p',
                text: 'By creating an account, subscribing, or otherwise using the Service, You confirm that You have read, understood and agree to be bound by these Terms and Our Privacy Policy. If You do not agree, do not use the Service.',
            },
        ],
    },
    {
        id: 'eligibility',
        title: 'Eligibility',
        blocks: [
            {
                type: 'p',
                text: 'You must be at least 18 years old and legally able to enter into a binding contract to create an account or purchase a subscription.',
            },
        ],
    },
    {
        id: 'account',
        title: 'Your Account',
        blocks: [
            { type: 'p', text: 'When You create an account, You agree to:' },
            { type: 'b', text: 'Provide accurate, current and complete information and keep it up to date.' },
            { type: 'b', text: 'Keep Your login credentials confidential and not share them with anyone.' },
            { type: 'b', text: 'Be responsible for all activity that happens under Your account.' },
            { type: 'b', text: 'Notify Us promptly at the contact email below if You suspect unauthorized use of Your account.' },
        ],
    },
    {
        id: 'service',
        title: 'The Service',
        blocks: [
            {
                type: 'p',
                text: 'Swipe Estate helps users discover and browse real estate listings and connect with real estate agents.',
            },
            {
                type: 'p',
                text: 'We are a technology platform. We are not a real estate broker, agent or lender, and We are not a party to any transaction between users. Listings, prices, availability and other property information are provided by agents, other users or third parties, and We do not guarantee that they are accurate, complete or up to date. You should independently verify all information before making any decision.',
            },
        ],
    },
    {
        id: 'subscriptions',
        title: 'Subscriptions and Payments',
        blocks: [
            {
                type: 'p',
                text: 'Some features require a paid subscription ("Subscription"). We offer a free plan and paid plans. The features and price of each plan are shown in the app before You subscribe.',
            },
            { type: 'h', text: 'Purchases on iOS' },
            {
                type: 'b',
                text: 'Subscriptions purchased in the iOS app are processed by Apple through In-App Purchase. Payment is charged to Your Apple ID account at confirmation of purchase.',
            },
            {
                type: 'b',
                text: 'Subscriptions renew automatically each billing period (monthly) unless they are cancelled at least 24 hours before the end of the current period.',
            },
            {
                type: 'b',
                text: 'Your account is charged for renewal within 24 hours before the end of the current period, at the price then shown in the App Store.',
            },
            {
                type: 'b',
                text: 'You can manage or cancel Your Subscription at any time in Your Apple ID Account Settings after purchase. Deleting the app does not cancel Your Subscription.',
            },
            {
                type: 'b',
                text: 'Refund requests for purchases made through Apple are handled by Apple under its policies. We are not able to issue refunds for Apple purchases.',
            },
            { type: 'h', text: 'Other payment methods' },
            {
                type: 'p',
                text: 'If You subscribe through another payment provider (for example, Stripe on Android or for certain account types), payments are processed by that provider and are subject to its terms. Billing and cancellation details for those purchases are shown at the time of purchase.',
            },
            { type: 'h', text: 'Price changes' },
            {
                type: 'p',
                text: 'We may change subscription prices or features from time to time. Changes for existing subscribers take effect in line with the rules of the relevant payment platform and, where required, only after You have been notified and, if required, have agreed.',
            },
        ],
    },
    {
        id: 'apple',
        title: 'Apple Terms (iOS)',
        blocks: [
            {
                type: 'p',
                text: 'If You use the iOS app, these Terms are between You and Swipe Estate only, and not with Apple. Apple is not responsible for the app or its content, maintenance or support, or for any claims relating to it.',
            },
            {
                type: 'p',
                text: `Apple and its subsidiaries are third-party beneficiaries of these Terms and may enforce them against You to the extent permitted by law. Unless We provide a custom license, Your use of the app is also subject to Apple's Licensed Application End User License Agreement (Standard EULA): https://www.apple.com/legal/internet-services/itunes/dev/stdeula/`,
            },
        ],
    },
    {
        id: 'content',
        title: 'User Content and Listings',
        blocks: [
            {
                type: 'p',
                text: 'You may be able to submit content such as profile information, photos, messages and, for agents, property listings ("User Content"). You keep ownership of Your User Content. You grant Us a worldwide, non-exclusive, royalty-free license to host, store, display, reproduce and distribute it as needed to operate and promote the Service.',
            },
            {
                type: 'p',
                text: 'You are responsible for Your User Content and confirm that You have the right to submit it, that it is accurate, and that it does not violate any law or third-party right. Agents are responsible for making sure their listings are accurate, authorized, and comply with applicable real estate, advertising and fair housing laws.',
            },
        ],
    },
    {
        id: 'acceptable',
        title: 'Acceptable Use',
        blocks: [
            { type: 'p', text: 'You agree not to:' },
            { type: 'b', text: 'Use the Service for any unlawful, fraudulent or deceptive purpose.' },
            {
                type: 'b',
                text: 'Post false, misleading, discriminatory, harassing, defamatory or infringing content, including listings You are not authorized to advertise.',
            },
            { type: 'b', text: 'Impersonate another person or misrepresent Your identity or affiliation.' },
            {
                type: 'b',
                text: 'Scrape, copy, reverse-engineer or collect data from the Service by automated means without Our permission.',
            },
            {
                type: 'b',
                text: "Interfere with or disrupt the Service, its security features, or other users' use of it.",
            },
            {
                type: 'b',
                text: 'Upload malware or try to gain unauthorized access to the Service or to other accounts.',
            },
            {
                type: 'b',
                text: 'Use contact information from the Service to send spam or unsolicited promotions.',
            },
        ],
    },
    {
        id: 'ip',
        title: 'Intellectual Property',
        blocks: [
            {
                type: 'p',
                text: 'The Service, including its software, design, logos, text and graphics (other than User Content), is owned by Swipe Estate or its licensors and is protected by intellectual property laws.',
            },
            {
                type: 'p',
                text: 'We grant You a limited, non-exclusive, non-transferable, revocable license to use the app for Your personal, non-commercial use in line with these Terms. All rights not expressly granted are reserved.',
            },
        ],
    },
    {
        id: 'thirdparty',
        title: 'Third-Party Services and Links',
        blocks: [
            {
                type: 'p',
                text: 'The Service may integrate with or link to third-party services such as maps and location services, payment providers and analytics tools. We do not control and are not responsible for third-party services, and Your use of them is subject to their own terms and privacy policies.',
            },
        ],
    },
    {
        id: 'termination',
        title: 'Suspension and Termination',
        blocks: [
            {
                type: 'p',
                text: 'You may stop using the Service and delete Your account at any time through Your account settings or by contacting Us. Deleting Your account does not automatically cancel a Subscription purchased through Apple or another provider. You must cancel it separately.',
            },
            {
                type: 'p',
                text: 'We may suspend or terminate Your access, with or without notice, if You breach these Terms, if required by law, or if We discontinue the Service. Provisions that by their nature should survive termination will continue to apply.',
            },
        ],
    },
    {
        id: 'disclaimers',
        title: 'Disclaimers',
        blocks: [
            {
                type: 'p',
                text: `The Service is provided "as is" and "as available" without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, accuracy and non-infringement, to the extent permitted by law. We do not warrant that the Service will be uninterrupted, secure or error-free, that any listing or information is accurate, or that any transaction will be completed.`,
            },
            {
                type: 'p',
                text: 'Nothing in the Service is legal, financial, tax or professional real estate advice.',
            },
        ],
    },
    {
        id: 'liability',
        title: 'Limitation of Liability',
        blocks: [
            {
                type: 'p',
                text: 'To the maximum extent permitted by law, Swipe Estate and its affiliates, officers, employees and service providers will not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits, data or goodwill, arising out of or related to Your use of the Service or any transaction with other users.',
            },
            {
                type: 'p',
                text: 'Our total liability for any claim relating to the Service will not exceed the greater of the amount You paid Us for the Service in the 12 months before the claim arose or US$100. Some jurisdictions do not allow certain limitations, so these may not apply to You in full.',
            },
        ],
    },
    {
        id: 'indemnification',
        title: 'Indemnification',
        blocks: [
            {
                type: 'p',
                text: 'You agree to defend and indemnify Swipe Estate against claims, damages and expenses (including reasonable legal fees) arising from Your User Content, Your breach of these Terms, or Your violation of any law or third-party right.',
            },
        ],
    },
    {
        id: 'law',
        title: 'Governing Law',
        blocks: [
            {
                type: 'p',
                text: 'These Terms are governed by the laws of the State of Texas, United States, without regard to conflict-of-law rules. Any dispute relating to these Terms or the Service will be brought in the state or federal courts located in Texas, and You consent to their jurisdiction, unless applicable law gives You the right to bring a claim elsewhere.',
            },
        ],
    },
    {
        id: 'changes',
        title: 'Changes to These Terms',
        blocks: [
            {
                type: 'p',
                text: 'We may update these Terms from time to time. We will post the updated Terms in the app and on Our website and update the "Last updated" date. If a change is material, We will give reasonable notice.',
            },
            {
                type: 'p',
                text: 'Continuing to use the Service after the changes take effect means You accept the updated Terms.',
            },
        ],
    },
];