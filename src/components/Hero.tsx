import { motion } from "framer-motion";
import { profile } from "../data/content";
import "./Hero.css";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-orb one" />
      <div className="hero-orb two" />

      <div className="container hero-inner">
        <motion.div initial="hidden" animate="show" variants={container}>
          <motion.p className="eyebrow" variants={item}>
            {profile.role} · {profile.location}
          </motion.p>

          <h1 className="hero-title">
            <motion.span variants={item}>나를 모르냐.</motion.span>
            <motion.span className="accent" variants={item}>
              {profile.name}
            </motion.span>
          </h1>

          <motion.p className="hero-sub" variants={item}>
            {profile.tagline}
          </motion.p>

          <motion.div className="hero-meta" variants={item}>
            {profile.highlights.map((h) => (
              <div key={h.label}>
                {h.label}
                <strong>{h.value}</strong>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
