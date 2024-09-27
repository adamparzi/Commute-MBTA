import React from 'react';
import { FaGithub } from 'react-icons/fa';

const GithubIcon = () => {
  return (
    <div className="flex justify-center items-center">
      <a
        href="https://github.com/adamparzi/Commute-MBTA"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-500 hover:text-gray-400">
        <FaGithub size={40} />
      </a>
    </div>
  );
};

export default GithubIcon;
