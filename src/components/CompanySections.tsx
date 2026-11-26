import {
  companyBrief,
  COMPANY_PDF,
  CONTACT_EMAIL,
  LINKEDIN_URL,
  type Brief,
} from "../data/portfolio";
import { BrandMark, Icon } from "./PortfolioIcons";

export function CompanySections({
  onOpen,
}: {
  onOpen: (brief: Brief) => void;
}) {
  return (
    <>
      <section className="vision" id="vision" aria-labelledby="vision-title">
        <div className="wrap vision-grid">
          <div>
            <div className="kicker">Our perspective</div>
            <h2 id="vision-title">
              Powerful software.
              <br />
              <span className="serif">A human point of view.</span>
            </h2>
          </div>
          <div className="vision-text">
            <p className="vision-lead">
              The person doing the work should remain at the center of the
              system.
            </p>
            <p>
              A designer shapes what a product becomes. A researcher
              investigates where it breaks. An engineer makes the idea real. We
              are building for the depth of those disciplines.
            </p>
            <p>
              Ideolect brings them under one company, with room for each product
              to develop its own character.
            </p>
            <button className="btn" onClick={() => onOpen(companyBrief)}>
              <Icon name="brief" />
              The Ideolect perspective
            </button>
          </div>
        </div>
      </section>
      <section
        className="wrap principles"
        id="approach"
        aria-labelledby="approach-title"
      >
        <div className="section-head">
          <div>
            <div className="kicker">The way we build</div>
            <h2 id="approach-title">Depth in every decision.</h2>
          </div>
          <p>
            A shared design and engineering philosophy across the product
            family.
          </p>
        </div>
        <div className="principle-grid">
          <article>
            <span className="principle-mark mint" aria-hidden="true">
              ⌑
            </span>
            <h3>Clarity is a capability.</h3>
            <p>
              Interfaces should make complex work understandable. Every state,
              control and interaction has a job to do.
            </p>
          </article>
          <article>
            <span className="principle-mark copper" aria-hidden="true">
              ⊞
            </span>
            <h3>Evidence earns trust.</h3>
            <p>
              A finding needs a reproduction. A code change needs a check.
              Confidence should come from work that can be inspected.
            </p>
          </article>
          <article>
            <span className="principle-mark lilac" aria-hidden="true">
              ⊙
            </span>
            <h3>Craft reaches the core.</h3>
            <p>
              The experience and the engineering belong together. We choose the
              architecture for the work it needs to perform.
            </p>
          </article>
        </div>
      </section>
      <section className="company" id="company" aria-labelledby="company-title">
        <div className="wrap company-grid">
          <div>
            <div className="kicker">Independent by design</div>
            <h2 id="company-title">
              Built from India.
              <br />
              <span className="serif">Thinking beyond borders.</span>
            </h2>
          </div>
          <div className="company-copy">
            <p>
              Ideolect is an independent software company founded by Mahammadali
              Palsaniya, working across creative software, cybersecurity
              intelligence and AI engineering.
            </p>
            <p>
              PenSuite, Pencore and Cortex 7.2 are in development. This is where
              we share the direction of the products and the thinking behind
              them.
            </p>
            <a
              className="text-link"
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Meet the founder
            </a>
          </div>
        </div>
      </section>
      <section className="contact" id="contact" aria-labelledby="contact-title">
        <div className="wrap contact-inner">
          <div className="kicker">Start a conversation</div>
          <h2 id="contact-title">
            Good work begins
            <br />
            <span className="serif">with a connection.</span>
          </h2>
          <div className="actions">
            <a className="btn primary" href={`mailto:${CONTACT_EMAIL}`}>
              Talk to Ideolect
            </a>
            <a className="btn" href={COMPANY_PDF} download>
              <Icon name="brief" />
              Company brief
            </a>
          </div>
          <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </section>
      <footer>
        <div className="wrap">
          <div className="footer-top">
            <a className="brand" href="#top" aria-label="Ideolect home">
              <BrandMark />
              Ideolect
            </a>
            <span>Design. Investigate. Reason.</span>
            <a href="#top">Back to top</a>
          </div>
          <div className="footer-wordmark" aria-hidden="true">
            Ideolect<span>✳</span>
          </div>
          <div className="footer-bottom">
            <span>Independent software. Considered in every detail.</span>
            <span>India · {new Date().getFullYear()}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
