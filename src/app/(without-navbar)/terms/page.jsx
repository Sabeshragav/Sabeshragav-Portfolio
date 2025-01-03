import React from "react";
import Link from "next/link";

const TermsOfService = () => {
  return (
    <div className="min-h-screen text-gray-300">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            1. Acceptance of Terms
          </h2>
          <p className="mb-4">
            By engaging my services as a freelance web developer, you agree to
            be bound by these Terms of Service. If you do not agree to these
            terms, please do not use my services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            2. Services Provided
          </h2>
          <p className="mb-4">
            I offer web development services including but not limited to
            website design, development, maintenance, hosting and consulting.
            The specific services to be provided will be outlined in a separate
            agreement or proposal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            3. Project Timeline and Deliverables
          </h2>
          <p className="mb-4">
            Project timelines and deliverables will be agreed upon at the start
            of each project. While I strive to meet all deadlines, unforeseen
            circumstances may occasionally cause delays. I will communicate any
            potential delays promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            4. Payment Terms
          </h2>
          <p className="mb-4">
            Payment terms, including rates and schedules, will be specified in
            the project agreement.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            5. Intellectual Property Rights
          </h2>
          <p className="mb-4">
            Upon full payment, you will own the rights to the final deliverables
            created specifically for your project.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            6. Client Responsibilities
          </h2>
          <p className="mb-4">
            I kindly request your support in providing the necessary content,
            assets, and feedback in a timely manner. Please note that delays in
            sharing the required materials could affect the project timelines.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            7. Limitation of Liability
          </h2>
          <p className="mb-4">
            I will not be liable for any indirect, incidental, or consequential
            damages arising from the use of my services. My total liability
            shall not exceed the total amount paid for the services rendered.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            8. Changes to Terms
          </h2>
          <p className="mb-4">
            I reserve the right to modify these Terms of Service at any time.
            Changes will be effective immediately upon posting on my website.
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

export default TermsOfService;
