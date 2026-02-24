export const metadata = {
  title: "About | WealthPath",
  description: "Learn more about WealthPath and our mission to provide accurate US financial tools.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-slate dark:prose-invert">
      <h1>About WealthPath</h1>
      <p>
        WealthPath provides free, accurate financial calculators designed specifically for 
        the US tax and financial system. Our goal is to make complex financial planning 
        accessible to everyone without collecting personal data.
      </p>
      <h2>Our Mission</h2>
      <p>
        We believe that everyone deserves access to high-quality financial tools. 
        Whether you are planning for retirement, trying to get out of debt, or simply 
        curious about how compound interest works, our calculators are here to help.
      </p>
    </div>
  );
}
