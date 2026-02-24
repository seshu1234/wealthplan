export const metadata = {
  title: "Disclaimer | WealthPath",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-slate dark:prose-invert">
      <h1>Financial Disclaimer</h1>
      <p>
        The content and calculators provided on WealthPath are for informational and educational 
        purposes only. We do not provide financial, investment, tax, or legal advice.
      </p>
      <p>
        Calculations are estimates based on the information you provide and certain assumptions,
        which may not reflect your actual outcomes due to market fluctuations, taxes, fees, 
        and other factors.
      </p>
      <p>
        Always consult with a qualified financial advisor, tax professional, or other authorized 
        expert before making any financial decisions.
      </p>
    </div>
  );
}
