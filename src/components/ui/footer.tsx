import React from "react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="w-full bg-white mt-auto py-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center relative w-[868px] mx-auto">
          <div className="absolute -top-4 left-0 right-0 h-px bg-gray-200"></div>
          <div className="flex items-center gap-2">
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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 mr-2">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-800 transition-colors">
                Terms
              </a>
            </div>
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4">
              <a href="https://x.com/?lang=en" className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="X (Twitter)">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0245 14.4253L6.03223 20H3.27084L9.73442 12.7254L3 4H8.6908L12.6779 9.0991L17.1761 4ZM16.2453 18.2662H17.7894L7.86325 5.6538H6.21768L16.2453 18.2662Z" />
                </svg>
              </a>
              <a href="mailto:contact@commentcrunch.com" className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Email">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 