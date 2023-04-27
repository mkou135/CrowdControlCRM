import React, { useState } from 'react';
import './SocialMediaIntegration.css';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

const SocialMediaIntegration = () => {
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle posting to Instagram, Facebook, and TikTok using their respective APIs
  };

  return (
    <div className="social-media-integration">
      <h2>Social Media</h2>
      <div className="social-icons">
        <a href="#" className="instagram">
          <FaInstagram />
        </a>
        <a href="#" className="facebook">
          <FaFacebook />
        </a>
        <a href="#" className="tiktok">
          <FaTiktok />
        </a>
      </div>
      <form onSubmit={handleSubmit} className="upload-form">
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption"
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default SocialMediaIntegration;
