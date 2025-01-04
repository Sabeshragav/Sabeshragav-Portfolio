import About from "@components/About";
const logo = "/main/logo.png";

export const metadata = {
  icons: logo,
  title: "About Sabeshragav",
  description:
    "Learn more about Sabeshragav, a passionate developer specializing in modern web technologies. Discover their journey, skills, and accomplishments in the tech world.",
};

export default function AboutPage() {
  return <About />;
}
