import React from "react";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export function Footer() {
  return (
    <footer className="w-full bg-white mt-auto py-4">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex flex-col sm:flex-row justify-between items-center relative w-full max-w-4xl">
          <div className="absolute -top-4 left-0 right-0 h-px bg-gray-200"></div>
          <div className="flex items-center gap-2 mb-4 sm:mb-0">
            <div className="p-1.5">
              <Image 
                src="/logo.svg" 
                alt="Comment Crunch Logo" 
                width={20} 
                height={20} 
              />
            </div>
            <p className="text-sm text-gray-500">
              Comment Crunch © 2025
            </p>
          </div>
          <div className="flex items-center">
            <a href="https://github.com/florian-lup/comment-crunch" className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <FaGithub size={16} />
            </a>
            <div className="h-8 w-px bg-gray-200 mx-3"></div>
            <a href="mailto:contact@florianlup.com" className="text-gray-500 hover:text-gray-800 transition-colors" aria-label="Email">
              <MdEmail size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 