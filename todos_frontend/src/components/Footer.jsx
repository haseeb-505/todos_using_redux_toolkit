import React from "react";

function Footer() {
  return (
    <footer className="text-white text-center p-6 border-4 border-b-blue-400 border-t-green-400 border-r-red-400 border-l-yellow-400 rounded-lg shadow-lg mt-8">
      {/* Footer Content */}
      <div className="space-y-4">
        <h1 className="text-2xl font-serif font-medium">
          This todo-app is created using React Redux Toolkit
        </h1>
        {/* Social Media Links */}
        <div className="flex justify-center space-x-6">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Twitter
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Facebook
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Instagram
          </a>
        </div>

        {/* Contact Information */}
        <div className="text-sm">
          <p>Email: support@todoapp.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        {/* Copyright Notice */}
        <div className="text-sm">
          <p>
            &copy; {new Date().getFullYear()} Todo App. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
