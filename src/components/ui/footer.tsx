import React from "react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-white mt-auto py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex flex-col sm:flex-row justify-between items-center relative w-full max-w-4xl">
          <div className="absolute -top-4 left-0 right-0 h-px bg-gray-200"></div>
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <div className="bg-gray-100 rounded-md p-1.5">
              <Image 
                src="/logo.svg" 
                alt="Comment Crunch Logo" 
                width={16} 
                height={16} 
              />
            </div>
            <p className="text-sm text-gray-500">
              Comment Crunch © 2025
            </p>
          </div>
          <div className="flex items-center">
            <a href="https://github.com/florian-lup/comment-crunch" className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <div className="h-8 w-px bg-gray-200 mx-3"></div>
            <a href="mailto:contact@florianlup.com" className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 