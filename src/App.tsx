import { useState } from "react";
import { BriefDialog } from "./components/BriefDialog";
import { BrandMark, Icon } from "./components/PortfolioIcons";
import { SystemAtlas } from "./components/SystemAtlas";
import { ProductShowcase } from "./components/ProductShowcase";
import { CompanySections } from "./components/CompanySections";
import { companyBrief, type Brief } from "./data/portfolio";

export default function App() {
  const [brief, setBrief] = useState<Brief | null>(null);
  return (
    <>
      <a className="skip" href="#products">
        Skip to products
      </a>
      <header className="topbar" id="top">
        <div className="wrap header">
          <a className="brand" href="#top" aria-label="Ideolect home">
            <BrandMark />
            Ideolect
          </a>
          <nav className="nav" aria-label="Main navigation">
            <a href="#products">Products</a>
            <a href="#vision">Vision</a>
            <a href="#company">Company</a>
            <a className="btn" href="#contact">
              Let’s talk
            </a>
          </nav>
        </div>
      </header>
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap heroInner">
            <div className="intro">
              <div className="kicker">
                Independent minds. Intentional software.
              </div>
              <h1 id="hero-title">
                Intelligence,
                <br />
                <em>in formation.</em>
              </h1>
              <p className="hero-description">
                We’re building creative software, security intelligence and
                engineering agents for people who design, investigate and build.
              </p>
              <div className="actions">
                <a className="btn primary" href="#products">
                  <Icon name="grid" />
                  Discover our products
                </a>
                <button className="btn" onClick={() => setBrief(companyBrief)}>
                  Meet Ideolect
                </button>
              </div>
              <div className="hero-signature">
                <span>PenSuite</span>
                <i aria-hidden="true" />
                <span>Pencore</span>
                <i aria-hidden="true" />
                <span>Cortex 7.2</span>
              </div>
            </div>
            <SystemAtlas />
          </div>
        </section>
        <div className="statement">
          <div className="wrap">
            <span>Creative instinct.</span>
            <span>Investigative depth.</span>
            <span>Engineering intelligence.</span>
          </div>
        </div>
        <ProductShowcase onOpen={setBrief} />
        <CompanySections onOpen={setBrief} />
      </main>
      <BriefDialog brief={brief} onClose={() => setBrief(null)} />
    </>
  );
}
