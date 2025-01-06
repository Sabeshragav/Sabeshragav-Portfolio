import React from "react";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen text-gray-300">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            1. Introduction
          </h2>
          <p className="mb-4">
            As a freelance web developer, I am committed to protecting your
            privacy and ensuring the security of your personal information. This
            Privacy Policy outlines how I collect, use, and safeguard your data
            when you engage my services or visit my website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            2. Information Collection
          </h2>
          <p className="mb-4">
            I may collect personal information such as your name, email address,
            phone number, and project details when you contact me or request my
            services. This information is used solely for the purpose of
            providing you with the requested services and maintaining
            communication throughout our professional relationship.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            3. Use of Information
          </h2>
          <p className="mb-4">The information collected is used to:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Respond to your inquiries and provide requested services</li>
            <li>Communicate with you about your project</li>
            <li>Improve my services and website functionality</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            4. Data Protection
          </h2>
          <p className="mb-4">
            I implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            5. Third-Party Disclosure
          </h2>
          <p className="mb-4">
            I do not sell, trade, or transfer your personal information to third
            parties without your consent, except as required by law or to
            fulfill service obligations (e.g., hosting providers, payment
            processors).
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights</h2>
          <p className="mb-4">
            You have the right to access, correct, or delete your personal
            information. If you wish to exercise these rights or have any
            privacy-related questions, please feel free to contact me using the
            information provided on my website.
            <br />
            <br /> Additionally, all my projects are free for users and aim to
            provide value without any associated costs.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            7. Changes to This Policy
          </h2>
          <p className="mb-4">
            I reserve the right to update this Privacy Policy at any time. Any
            changes will be reflected on this page.
          </p>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
