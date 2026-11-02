import { LegalPage } from "@/components/sections/LegalPage";
import { resort } from "@/content/resort";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Mamalla Beach Resort collects, uses and protects the personal information you share through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      label="Privacy"
      path="/privacy"
      updated="2 November 2026"
      note="This policy describes how this website handles information. It should be reviewed by the resort's management and legal adviser before launch."
      sections={[
        {
          id: "who",
          title: "Who we are",
          body: (
            <p>
              This website is operated for {resort.name}, {resort.address.street}, {resort.address.locality},{" "}
              {resort.address.region} {resort.address.postalCode}. Contact: <a href={resort.email.href}>{resort.email.display}</a>.
            </p>
          ),
        },
        {
          id: "collect",
          title: "What we collect",
          body: (
            <>
              <p>When you send an enquiry or reservation request, we collect the details you enter:</p>
              <ul>
                <li>your name, email address and phone number;</li>
                <li>stay or event details such as dates, guest numbers and preferences;</li>
                <li>anything you write in the message field.</li>
              </ul>
              <p>
                We do not collect payment card details on this website. Our server may record basic technical information (such
                as IP address and browser type) for security and to prevent spam.
              </p>
            </>
          ),
        },
        {
          id: "use",
          title: "How we use it",
          body: (
            <ul>
              <li>to respond to your enquiry and arrange your stay or event;</li>
              <li>to keep records of our correspondence with you;</li>
              <li>to protect the website from abuse.</li>
            </ul>
          ),
        },
        {
          id: "share",
          title: "Who we share it with",
          body: (
            <p>
              Enquiries are delivered to the resort through an email or form-processing service. If you continue to an external
              booking engine, the booking provider&apos;s own privacy policy applies to the information you give them. We do not
              sell your personal information.
            </p>
          ),
        },
        {
          id: "third-party",
          title: "Third-party content",
          body: (
            <p>
              Some features — such as the 360° virtual tour and links to Google Maps — are provided by third parties and only
              load when you choose to use them. Those services may set their own cookies.
            </p>
          ),
        },
        {
          id: "cookies",
          title: "Cookies",
          body: <p>This website does not use advertising or analytics cookies. If that changes, this policy will be updated first.</p>,
        },
        {
          id: "retention",
          title: "Keeping and deleting your information",
          body: (
            <p>
              We keep enquiry information only as long as needed to respond and for reasonable record-keeping. To ask what we
              hold about you, or to ask us to correct or delete it, email <a href={resort.email.href}>{resort.email.display}</a>.
            </p>
          ),
        },
        {
          id: "changes",
          title: "Changes to this policy",
          body: <p>We may update this policy from time to time. The date at the top shows when it last changed.</p>,
        },
      ]}
    />
  );
}
