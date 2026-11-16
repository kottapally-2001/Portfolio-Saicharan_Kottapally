import React from "react";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaPhone,
  FaArrowUp,
} from "react-icons/fa6";

function Footer() {
  return (
    <section id="contact" className="section contact-section">
      <footer className="footer">
        <div className="container">
          <div className="footer-card spot" data-reveal="scale">
            <div className="footer-glow" aria-hidden="true" />

            <span className="eyebrow footer-tag">
              <span className="eyebrow-index">05</span>
              Contact
            </span>

            <h2>
              Let's Build <em>Something Amazing</em>
            </h2>

            <p>
              Passionate about building scalable backend systems, enterprise
              applications, AI-powered products, and cloud-native solutions.
              I'm always excited to collaborate on meaningful projects.
            </p>

            <div className="footer-buttons">
              <a
                href="mailto:saicharan.kottapally@gmail.com"
                className="btn btn-primary magnetic"
              >
                <FaEnvelope />
                Email Me
              </a>

              <a href="tel:+919154500348" className="btn btn-ghost magnetic">
                <FaPhone />
                Call Me
              </a>

              <a
                href="https://github.com/kottapally-2001"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost magnetic"
              >
                <FaGithub />
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/saicharan-kottapally-69bb1a1a4"
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost magnetic"
              >
                <FaLinkedin />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="copyright">
              © {new Date().getFullYear()} Sai Charan Kottapally • Software
              Engineer • Design. Develop. Deliver.
            </div>

            <a href="#hero" className="back-top magnetic" data-strength="0.35">
              Back to top
              <span className="back-top-icon">
                <FaArrowUp />
              </span>
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
