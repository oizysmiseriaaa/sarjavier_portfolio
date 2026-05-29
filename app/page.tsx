import Certification from "@/components/certification";
import Chatbot from "@/components/chatbot/Chatbot";
import Contact from "@/components/contact";
import FeaturedProject from "@/components/featured-project";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Profile from "@/components/profile";
import Projects from "@/components/projects";
import Skills from "@/components/skills";

export default function Home() {
  return (
    <main className="w-full overflow-hidden bg-[var(--background)]">
      <Navbar />
      <Hero />
      <Profile />
      <Skills />
      <FeaturedProject />
      <Projects />
      <Certification />
      <Contact />
      <Footer />
      <Chatbot />
    </main>
  );
}
