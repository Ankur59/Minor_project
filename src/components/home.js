import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './home.css';

const Home = () => {
  const [news, setNews] = useState([]);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            category: 'technology',
            apiKey: '255ca4d4621544278838280645a9a21d'
          }
        });
        setNews(response.data.articles.slice(0, 3)); // Get first 3 articles
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();

    // Add scroll event listener
    const handleScroll = () => {
      if (window.pageYOffset > 100) {  // Changed from 300 to 100 for earlier appearance
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="home">
      <nav className="navbar">
        <div className="navbar-logo">
          <img src='https://img.freepik.com/premium-vector/va-letters-creative-corporate-logo-design_920742-197.jpg'></img>
          </div>
        <div className="navbar-options">
          <a href="#" className="navbar-option">Home</a>
          <Link to="/dashboard" className="navbar-option">Dashboard</Link>
          <a href="#" className="navbar-option">About Us</a>
        </div>
        <div className="navbar-auth">
          <Link to="/login" className="auth-button signin-button">Sign In</Link>
          <Link to="/register" className="auth-button register-button">Register</Link>
        </div>
      </nav>

      <div className="home-content">
        <div className="text-content">
          <h1>Easy Online Election Excellence</h1>
          <p>ElectionBuddy guarantees election integrity, boosts voter engagement and saves serious hours. It's free to test and free for up to 20 voters.</p>
          <button className="start-election-button">Start A Free Election</button>
          <button className="explore-options-button">Explore Service Options</button>
        </div>
        <img 
          src="home-cover-removebg-preview.png"
          alt="Election Cover" 
          className="election-cover-image"
        />
      </div>

      <h2>Our Clients</h2>
      <div className="company-logos">
        
        <img src="https://my.adtu.in/themes/wondertag/img/og.jpg?v=1.0" alt="Deloitte" className="company-logo" />
        <img src="https://www.shutterstock.com/image-vector/ngo-logo-children-foundation-organization-260nw-1516420154.jpg" alt="NAACP" className="company-logo" />
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSej4fyN97OIQFe5S-exVlehtT-AtnA1bR2bg&s" alt="Columbia University" className="company-logo" />
        <img src="https://cdn2.hubspot.net/hubfs/53/image8-2.jpg" alt="IATSE" className="company-logo" />
        <img src="https://1000logos.net/wp-content/uploads/2016/10/Apple-Logo.jpg" alt="Australian Red Cross" className="company-logo" />
      </div>

      {/* New second page section */}
      <div className="second-page">
        
        
        
        {/* New "Why administrators and voters love us" section */}
        <div className="why-love-us">
          <h2>Why administrators and voters love us</h2>
          <div className="love-us-features">
            <div className="love-us-feature">
              <div className="feature-icon"></div>
              <div className="feature-content">
                <h3>Easy and convenient</h3>
                <p>Voters choose where and when they vote <a href="#" className="learn-more">learn more</a></p>
              </div>
            </div>
            <div className="love-us-feature">
              <div className="feature-icon"></div>
              <div className="feature-content">
                <h3>Anonymous and secure</h3>
                <p>Voters vote using secret ballots with verifiable results <a href="#" className="learn-more">learn more</a></p>
              </div>
            </div>
            <div className="love-us-feature">
              <div className="feature-icon"></div>
              <div className="feature-content">
                <h3>Reach voters easily</h3>
                <p>Notify voters by email, text message and mail <a href="#" className="learn-more">learn more</a></p>
              </div>
            </div>
            <div className="love-us-feature">
              <div className="feature-icon"></div>
              <div className="feature-content">
                <h3>Speedy results</h3>
                <p>Share reports with statistics and graphs when voting ends <a href="#" className="learn-more">learn more</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* News box remains unchanged */}
        <div className="news-box">
          <h3>Latest Tech News</h3>
          <div className="news-list">
            {news.map((article, index) => (
              <div key={index} className="news-item">
                <h4>{article.title}</h4>
                <p>{article.description}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
              </div>
            ))}
          </div>
        </div>

        <button className="learn-more-button">Learn More About Our Features</button>
      </div>

      {showScrollTop && (
        <button className="scroll-to-top" onClick={scrollToTop}>
          ↑
        </button>
      )}
    </div>
  );
};

export default Home;