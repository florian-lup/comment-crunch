import React from "react";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-auto py-6">
      <div className="notion-container">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gray-100 rounded-md p-1.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.527 12.2659L12.0003 16.7659L5.47363 12.2659V5.26587L12.0003 0.765869L18.527 5.26587V12.2659Z" fill="#2e75cc" fillOpacity="0.3" />
                <path d="M12.0003 16.7659L18.527 12.2659V5.26587L12.0003 0.765869V16.7659Z" fill="#2e75cc" fillOpacity="0.7" />
              </svg>
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