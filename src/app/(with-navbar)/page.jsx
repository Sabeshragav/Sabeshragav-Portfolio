import Home from "@components/Home/Home";

const logo = "/icons/logo.svg";

export const metadata = {
  icons: logo,
  title: "Sabeshragav's Portfolio",
  description:
    "A professional platform showcasing innovative projects, insightful blogs, and opportunities to connect with Sabeshragav G K, a dedicated expert in technology and creativity.",
};

export default function HomePage() {
  return <Home />;
}
