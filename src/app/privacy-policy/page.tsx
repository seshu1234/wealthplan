export const metadata = {
  title: "Privacy Policy | WealthPath",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-slate dark:prose-invert">
      <h1>Privacy Policy</h1>
      <p>Last updated: [Date]</p>
      
      <h2>Data Collection</h2>
      <p>
        WealthPath calculators run purely in your browser. We do not transmit, save, 
        or collect the financial data you input into our calculators. All calculations 
        are performed locally on your device.
      </p>

      <h2>Analytics and Advertising</h2>
      <p>
        We may use third-party services such as Google Analytics and Google AdSense
        to analyze website traffic and display advertisements. These services may use 
        cookies to track your usage of our website.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update our Privacy Policy from time to time. Any changes will be posted 
        on this page.
      </p>
    </div>
  );
}
