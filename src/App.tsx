import { lazy, Suspense, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import Loader from "./components/Loader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

// three.js is heavy — split it out so the page paints before the 3D loads
const Background3D = lazy(() => import("./components/Background3D"));

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

function App() {
  const reducedMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {!reducedMotion && <Loader />}
      {!reducedMotion && (
        <Suspense fallback={null}>
          <Background3D />
        </Suspense>
      )}
      <div className="grain" />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}

export default App;
