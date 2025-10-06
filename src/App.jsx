import React, { useEffect, useState } from "react";
import "./App.css";
import logo from "../src/assets/logo.png";
import hero_pic from "../src/assets/hero-pic.png";

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [testiIndex, setTestiIndex] = useState(0);

  // contact form status
  const [status, setStatus] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const testimonials = [
    {
      quote:
        "Pure Vision transformed our kitchen. Fast, tidy and the color choice was perfect.",
      author: "— Jenna P., Homeowner",
    },
    {
      quote:
        "Great communication, on time, and excellent finish. Highly recommended.",
      author: "— Marcus D.",
    },
    {
      quote: "Would definitely use their service again. Absolutely fantastic!",
      author: "— Ronan M. ",
    },
    {
      quote:
        "Professional crew and very careful when working around furniture.",
      author: "— Leslie R.",
    },
    {
      quote: "Quick, clean, and very professional. Im delighted!",
      author: "— Fionnuala K. ",
    },
  ];

  // rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  // SEO meta tags + JSON-LD structured data injected into <head>
  useEffect(() => {
    // helper to convert imported asset path to absolute URL
    const getAbsoluteUrl = (path) => {
      if (!path) return "";
      try {
        // if path looks absolute already
        if (path.startsWith("http://") || path.startsWith("https://"))
          return path;
      } catch (err) {
        err.message = "Something went wrong!";
      }
      // most bundlers return a root-relative path (e.g. /static/media/logo.xxx.png)
      return `${window.location.origin}${path}`;
    };

    // tags we will create (so we can remove them on cleanup)
    const created = [];

    // convenience creator for meta tags (name OR property attr)
    const createMeta = (attrName, attrValue, content) => {
      const m = document.createElement("meta");
      m.setAttribute(attrName, attrValue);
      m.setAttribute("content", content);
      document.head.appendChild(m);
      created.push(m);
      return m;
    };

    // basic tags
    document.title =
      "Pure Vision Painting — Dublin | Interior & Commercial Painting";

    createMeta(
      "name",
      "description",
      "Serving Dublin and nearby towns with professional interior and commercial painting — specialist work for cottages, fences and select exterior details. Free quotes."
    );
    createMeta(
      "name",
      "keywords",
      "painting dublin, interior painting, commercial painting, cottage painting, fence painting, cabinet refinishing, color consultancy"
    );
    createMeta("name", "robots", "index,follow");
    createMeta("name", "theme-color", "#0f3240");

    // Open Graph (social)
    createMeta("property", "og:title", "Pure Vision Painting — Dublin");
    createMeta(
      "property",
      "og:description",
      "Professional interior and commercial painting serving Dublin and nearby towns. Request a free quote."
    );
    createMeta("property", "og:type", "website");
    createMeta("property", "og:url", window.location.href);
    createMeta("property", "og:image", getAbsoluteUrl(logo));

    // Twitter card
    createMeta("name", "twitter:card", "summary_large_image");
    createMeta("name", "twitter:title", "Pure Vision Painting — Dublin");
    createMeta(
      "name",
      "twitter:description",
      "Interior, commercial and select exterior painting services. Free quotes."
    );
    createMeta("name", "twitter:image", getAbsoluteUrl(logo));

    // canonical link
    const linkCanonical = document.createElement("link");
    linkCanonical.setAttribute("rel", "canonical");
    linkCanonical.setAttribute("href", window.location.href);
    document.head.appendChild(linkCanonical);
    created.push(linkCanonical);

    // JSON-LD structured data (Local business / Home & Construction)
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "HomeAndConstructionBusiness",
      name: "Pure Vision Painting",
      image: getAbsoluteUrl(logo),
      telephone: "123-456-7890",
      areaServed: [
        {
          "@type": "Place",
          name: "Dublin, Ireland",
        },
      ],
      description:
        "Professional interior and commercial painting serving Dublin and nearby towns. Specialist cottage and fence work available. Free quotes.",
      url: window.location.origin,
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    created.push(script);

    // cleanup on unmount: remove tags we created
    return () => {
      created.forEach((el) => {
        if (el && el.parentNode) el.parentNode.removeChild(el);
      });
    };
  }, [logo]);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    setStatus("sending");

    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xanpbqgd", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
        setShowPopup(true);
        form.reset();
      } else {
        setStatus("error");
        setShowPopup(true);
      }
    } catch (error) {
      // fixed: show the error in console so the caught variable is used (no lint error)
      console.error("Form submission error:", error);
      setStatus("error");
      setShowPopup(true);
    }

    // hide popup automatically after 4s
    setTimeout(() => setShowPopup(false), 4000);
  };
  useEffect(() => {
  const handleScroll = () => {
    setNavOpen(false); // closes menu when scrolling
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);

  return (
    <>
      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <a
            className="logo"
            href="#home"
            aria-label="Pure Vision Painting home"
          >
            <img
              src={logo}
              alt="Pure Vision Painting Logo"
              className="brand-logo"
            />
            <span className="brand-text">
              <strong>Pure Vision</strong>
              <small>Painting</small>
            </span>
          </a>

          {/* <nav className={`main-nav ${navOpen ? "open" : ""}`} id="main-nav">
            <ul>
              <li>
                <a href="#home" onClick={() => setNavOpen(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href="#services" onClick={() => setNavOpen(false)}>
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" onClick={() => setNavOpen(false)}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#reviews" onClick={() => setNavOpen(false)}>
                  Reviews
                </a>
              </li>
              <li>
                <a href="#contact" onClick={() => setNavOpen(false)}>
                  Contact Us
                </a>
              </li>
            </ul>
          </nav> */}

          <nav className={`main-nav ${navOpen ? "open" : ""}`}>
            <ul>
              <li>
                <a
                  href="#home"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector("#home");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => setNavOpen(false), 300); // slight delay
                  }}
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector("#services");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => setNavOpen(false), 300);
                  }}
                >
                  Services
                </a>
              </li>

              <li>
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector("#portfolio");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => setNavOpen(false), 300);
                  }}
                >
                  Gallery
                </a>
              </li>

              <li>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector("#reviews");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => setNavOpen(false), 300);
                  }}
                >
                  Reviews
                </a>
              </li>

              <li>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector("#contact");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                    setTimeout(() => setNavOpen(false), 300);
                  }}
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          <div className="header-ctas">
            <a className="btn btn-primary" href="#contact">
              Get a Free Quote
            </a>
            <button
              aria-label="Toggle navigation"
              className="nav-toggle"
              onClick={() => setNavOpen(!navOpen)}
            >
              {navOpen ? "✖" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="home" className="hero">
          <div className="container hero-grid">
            <div className="hero-content">
              <h1>Professional Painting Services You Can Trust</h1>
              <p className="sub">
                Serving Dublin and nearby towns with precision, care, and color
                — interiors, commercial spaces, and select exterior projects.
              </p>
              <p className="meta">Your space, your vision, our brush.</p>
              <div className="hero-ctas">
                <a className="btn btn-primary" href="#contact">
                  Request a Free Estimate
                </a>
                <a className="btn btn-outline" href="#portfolio">
                  See Our Work
                </a>
              </div>
            </div>

            <div className="hero-image" aria-hidden="true">
              <img src={hero_pic} className="hero-pic" alt="hero_pic" />
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="services container">
          <h2>Services</h2>
          <p className="lead">
            We offer a wide range of painting services, tailored to your
            project.
          </p>

          <div className="cards">
            <article className="card">
              <div className="card-ico">🎨</div>
              <h3>Interior Painting</h3>
              <p>
                Wall & ceiling painting, trim, doors, and cabinetry finishes
                with clean lines and neat prep.
              </p>
            </article>

            <article className="card">
              <div className="card-ico">🏢</div>
              <h3>Commercial Painting</h3>
              <p>
                Minimal disruption, fast turnaround, and high-quality finishes
                for commercial properties.
              </p>
            </article>

            <article className="card">
              <div className="card-ico">✨</div>
              <h3>Specialty Services</h3>
              <p>
                Cabinet refinishing, decorative finishes and color consulting.
              </p>
            </article>
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="why container">
          <h2>Why Choose Us</h2>
          <div className="features">
            <div className="feature">
              <svg className="feat-ico" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 1L3 5v6c0 5 3.7 9.5 9 10 5.3-.5 9-5 9-10V5l-9-4z"
                />
              </svg>
              <h4>Quality Workmanship</h4>
            </div>

            <div className="feature">
              <svg className="feat-ico" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zM12 14c-4.4 0-8 2-8 4v2h16v-2c0-2-3.6-4-8-4z"
                />
              </svg>
              <h4>Experienced Team</h4>
            </div>

            <div className="feature">
              <svg className="feat-ico" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 1L3 5v6c0 5 3.7 9.5 9 10 5.3-.5 9-5 9-10V5l-9-4z"
                />
              </svg>
              <h4>Transparent Pricing</h4>
            </div>
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="portfolio container">
          <h2>Our Portfolio</h2>
          <p className="lead">Before & afters — examples of recent projects.</p>

          <div className="gallery">
            <figure className="thumb">
              <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
                <rect width="100%" height="100%" fill="#f6f6f6" />
                <rect width="100%" height="100%" fill="#e9e9e9" />
              </svg>
              <figcaption>Interior — Living Room</figcaption>
            </figure>

            <figure className="thumb">
              <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
                <rect width="100%" height="100%" fill="#dff3ff" />
              </svg>
              <figcaption>Exterior — Cottage</figcaption>
            </figure>

            <figure className="thumb">
              <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice">
                <rect width="100%" height="100%" fill="#eef7f0" />
              </svg>
              <figcaption>Commercial Office</figcaption>
            </figure>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section id="reviews" className="testimonials container">
          <h2>What Clients Say</h2>
          <div className="testi-wrap">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`testi ${i === testiIndex ? "active" : ""}`}
              >
                <blockquote>{t.quote}</blockquote>
                <cite>{t.author}</cite>
              </div>
            ))}
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="cta-banner">
          <div className="container cta-inner">
            <h3>Ready to transform your home or business?</h3>
            <a className="btn btn-primary" href="#contact">
              Get Your Free Quote Today
            </a>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact container">
          <h2>Contact</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <p>
                <strong>Pure Vision Painting</strong>
              </p>
              <p>
                📞 Phone: <a href="tel:0873498258">087-3498258</a>
              </p>
              <p>
                📧 Email:{" "}
                <a href="mailto:info.purevisionpainting@gmail.com">
                  info.purevisionpainting@gmail.com
                </a>
              </p>
              <p>🏠 Serving Dublin and nearby towns.</p>
            </div>

            {/* Contact form with Formspree */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input type="text" name="name" required />
              </label>

              <label>
                Email
                <input type="email" name="email" required />
              </label>

              <label>
                Phone
                <input type="tel" name="phone" />
              </label>

              <label>
                Message
                <textarea name="message" rows="4" required></textarea>
              </label>

              <div className="form-row">
                <button
                  className="btn btn-primary"
                  type="submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>
                <a className="btn btn-outline" href="tel:+353873498258">
                  Call Us
                </a>
                <a
                  href="https://wa.me/353873498258" // 👈 replace with your WhatsApp number, e.g., 353871234567
                  className="whatsapp-float"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt="WhatsApp"
                  />
                </a>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-left">
            <p>&copy; {new Date().getFullYear()} Pure Vision Painting</p>
            <p>
              <small>
                Licensed & Insured • Quality workmanship • Free quotes
              </small>
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer">
            <a href="#home">Home</a>
            <a href="#services">Services</a>
            <a href="#portfolio">Gallery</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </footer>

      {/* Popup Notification */}
      {showPopup && (
        <div className={`popup ${status}`}>
          {status === "success" && "✅ Thank you! Your message has been sent."}
          {status === "error" &&
            "❌ Oops! Something went wrong. Please try again."}
        </div>
      )}
    </>
  );
}
