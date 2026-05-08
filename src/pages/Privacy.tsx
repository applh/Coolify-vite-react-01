import { SEO } from "../components/SEO";

export function Privacy() {
  return (
    <>
      <SEO 
        title="Privacy Policy" 
        description="Our policy regarding the collection and use of your data."
      />
      <div className="max-w-3xl mx-auto px-6 py-24 flex-1 w-full prose prose-invert prose-primary max-w-none">
        <h1 className="font-display text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
        <p className="text-sm text-white/60 mb-8">Last updated: May 8, 2026</p>
        
        <h2>1. Information We Collect</h2>
        <p>We only collect information about you if we have a reason to do so—for example, to provide our Services, to communicate with you, or to make our Services better.</p>
        
        <h3>Information you provide to us directly:</h3>
        <ul>
          <li><strong>Basic account information:</strong> We ask for basic information from you in order to set up your account.</li>
          <li><strong>Transaction and billing information:</strong> If you buy something from us, you will provide additional personal and payment information.</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <p>We use information about you for the purposes listed below:</p>
        <ul>
          <li>To provide our Services.</li>
          <li>To further develop and improve our Services.</li>
          <li>To monitor and analyze trends and better understand how users interact with our Services.</li>
        </ul>

        <h2>3. Security</h2>
        <p>While no online service is 100% secure, we work very hard to protect information about you against unauthorized access, use, alteration, or destruction, and take reasonable measures to do so.</p>
        
        <h2>4. Changes to This Policy</h2>
        <p>We may change this Privacy Policy from time to time. We encourage visitors to frequently check this page for any changes. Your further use of the Services after a change to our Privacy Policy will be subject to the updated policy.</p>
      </div>
    </>
  );
}
