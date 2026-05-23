import { useEffect, useState } from "react";
import { ArrowRight, Calendar, MessageCircle } from "lucide-react";
import Scene from "./components/Scene";

const SIMULATION = {
  chaos: 0,
  noiseStrength: 0,
  noiseFrequency: 0.18,
  returnSpeed: 1.35,
  baseSize: 0.026,
  interactionRadius: 1.8,
  mouseStrength: 0,
  amberColor: "#a84f08",
  goldColor: "#b88616",
  standoutColor: "#d8c6a2",
  resetSignal: 0,
};

function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollableHeight <= 0 ? 0 : window.scrollY / scrollableHeight;
      setProgress(Math.min(1, Math.max(0, nextProgress)));
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return progress;
}

export default function App() {
  const scrollProgress = useScrollProgress();

  return (
    <main className="min-h-screen bg-[#030305] text-[#f5f2ea] selection:bg-[#ff7b00] selection:text-black">
      <div className="fixed inset-0 z-0">
        <Scene {...SIMULATION} scrollProgress={scrollProgress} />
      </div>

      <div className="fixed inset-0 z-[1] pointer-events-none bg-[radial-gradient(circle_at_54%_36%,transparent_0,rgba(3,3,5,0.08)_28%,rgba(3,3,5,0.78)_82%)]" />
      <div className="fixed inset-0 z-[1] pointer-events-none bg-[linear-gradient(90deg,rgba(3,3,5,0.9)_0%,rgba(3,3,5,0.42)_36%,rgba(3,3,5,0.18)_60%,rgba(3,3,5,0.76)_100%)]" />
      <div className="grain-overlay" />

      <div className="relative z-10">
        <header className="fixed left-0 right-0 top-0 z-20 flex items-center justify-between px-5 py-5 md:px-10">
          <a className="site-mark" href="#top" aria-label="The Chalant Society home">
            The Chalant Society
          </a>
          <nav className="hidden items-center gap-8 text-[0.68rem] uppercase tracking-[0.32em] text-[#f5f2ea]/58 md:flex">
            <a className="nav-link" href="#practice">practice</a>
            <a className="nav-link" href="#work">work</a>
            <a className="nav-link" href="#show-up">show up</a>
          </nav>
        </header>

        <section id="top" className="section-frame min-h-screen items-end pb-[12vh] pt-28">
          <div className="max-w-[88rem]">
            <p className="eyebrow">courage / charisma / care</p>
            <h1 className="hero-title">
              you&apos;ve been trained to be nonchalant.
            </h1>
            <p className="hero-subcopy">
              chalant is the opposite. it means caring on purpose, taking up space,
              and putting your effort where everyone can see it.
            </p>
          </div>
        </section>

        <section id="practice" className="section-frame min-h-screen justify-center">
          <div className="statement-block">
            <p className="section-kicker">the problem</p>
            <h2>
              most people are not calm.
              <br />
              they are rehearsed.
            </h2>
            <div className="spoken-copy">
              <p>say less. want less. risk less.</p>
              <p>pretend you did not care, so rejection has nowhere to land.</p>
              <p>that script is clean. it is also boring.</p>
            </div>
          </div>
        </section>

        <section id="work" className="section-frame min-h-screen justify-center">
          <div className="split-section">
            <div>
              <p className="section-kicker">what we do</p>
              <h2>we build the permission structure.</h2>
            </div>
            <div className="work-list">
              <p>
                small-group rejection therapy challenges that move you one percent
                outside your comfort zone.
              </p>
              <p>
                weekly meetups where being bold is not weird. it is the room.
              </p>
              <p>
                1-on-1 coaching for communication, social courage, and living with
                more deliberate effort.
              </p>
            </div>
          </div>
        </section>

        <section className="section-frame min-h-[84vh] justify-center">
          <div className="three-cs" aria-label="The three C's">
            <span>courage</span>
            <span>charisma</span>
            <span>care</span>
          </div>
        </section>

        <section id="show-up" className="section-frame min-h-screen justify-end pb-[12vh]">
          <div className="invitation">
            <p className="section-kicker">the invitation</p>
            <h2>are you chalant enough to show up?</h2>
            <p>
              you do not need to become fearless. you just need one room where
              effort is normal, and one person willing to go first.
            </p>
            <div className="cta-row">
              <a className="primary-cta" href="https://www.instagram.com/thechalantsociety/" target="_blank" rel="noreferrer">
                <Calendar size={18} />
                join a meetup
                <ArrowRight size={18} />
              </a>
              <a className="secondary-cta" href="https://www.instagram.com/thechalantsociety/" target="_blank" rel="noreferrer">
                <MessageCircle size={18} />
                ask about coaching
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
