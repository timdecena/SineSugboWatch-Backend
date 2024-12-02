import React from 'react';
import '../assets/AboutUs.css'; // Ensure to import the CSS

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <header className="about-us-header">
        <h1>About Us</h1>
      </header>

      <section className="about-us-content">
        <p>
          Welcome to <strong>SineSugboWatch</strong>! We're your go-to platform to discover, rate, and rent the latest movies from all over the world.
        </p>
        <p>
          At <strong>SineSugboWatch</strong>, we aim to offer an exceptional experience for movie lovers. Whether you're looking to rate your favorite films or rent a new release, we provide an easy and seamless way to do so.
        </p>
        <p>
          Our mission is to bring movies closer to you, allowing you to explore, rate, and even rent your favorites—all in one place. Join us in this cinematic journey, and discover a world of entertainment right at your fingertips.
        </p>
      </section>

      <section className="about-us-footer">
        <h3>Our Features:</h3>
        <ul>
          <li>Rate Movies: Share your thoughts on the latest releases.</li>
          <li>Rent Movies: Access a wide selection of movies for rental.</li>
          <li>Curated Collections: Browse movies based on genre, year, and rating.</li>
        </ul>
      </section>

      <section className="contact-us">
        <h3>Contact Us</h3>
        <p>If you have any questions or feedback, feel free to reach out to our development team:</p>
        <ul>
          <li>Email: <a href="mailto:developer@sinesugbowatch.com">developer@sinesugbowatch.com</a></li>
          <li>Phone: +1 (800) 123-4567</li>
        </ul>
      </section>

      <section className="developer-credits">
        <h3>Developed By:</h3>
        <p>Anthony Decena, Raymund Laude, Tyrone Beldad, and Barry Alico</p>
      </section>

      <footer className="footer">
        <p>© 2024 C9. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;
