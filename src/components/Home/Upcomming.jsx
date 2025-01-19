"use client";
import { motion } from "framer-motion";

export default function Upcomming({ ParallaxText }) {
  const list = [
    {
      title: "Product Synchronization",
      excerpt:
        "This task involves building a product data management and synchronization system using Directus, MedusaJS, and integrating a storefront with Medusa Storefront.",
    },
    {
      title: "Socio-Ecommerce Application",
      excerpt:
        "This task involves developing a social-driven ecommerce platform that integrates social networking features with online shopping, enabling users to share, discuss, and shop for products seamlessly within the same ecosystem.",
    },
  ];

  return (
    <section className="min-h-screen py-44 px-4 md:px-8">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        <ParallaxText className={"mb-16 leading-snug"}>
          Upcomming {list?.length > 1 ? "Projects" : "Project"}
        </ParallaxText>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {list?.map((post, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="black_gray_gradient p-6 rounded-lg border border-gray-800"
          >
            <h3 className="text-2xl font-bold mb-4">{post.title}</h3>
            <p className="text-slate-300 mb-4">{post.excerpt}</p>
            <div className="text-slate-300 hover:text-white underline">
              Stay Tuned
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
