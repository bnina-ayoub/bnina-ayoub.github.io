import "./App.css";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import Nav from "./components/Nav";
import FloatingScene from "./components/FloatingScene";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import HUDStatusBar from "./components/HUDStatusBar";

function App() {
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="App relative min-h-screen overflow-x-hidden bg-graphite-800 text-foreground antialiased"
      data-testid="app-root"
    >
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] noise" />
      <FloatingScene />
      <Nav />
      <main
        className={`relative z-10 transition-opacity duration-700 ${
          booted ? "opacity-100" : "opacity-0"
        }`}
      >
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Awards />
        <Contact />
        <Footer />
      </main>
      <HUDStatusBar />
      <Toaster
        theme="dark"
        position="top-right"
        toastOptions={{
          style: {
            background: "#161A20",
            border: "1px solid #30363D",
            color: "#F0F6FC",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "12px",
            borderRadius: "2px",
          },
        }}
      />
    </div>
  );
}

export default App;
