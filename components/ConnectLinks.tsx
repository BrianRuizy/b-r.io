import {FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

interface ConnectLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const ConnectLinks: ConnectLink[] = [
  {
    label: "Email",
    href: "mailto:contact@o-d.me",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Fyleek",
    icon: <FaGithub />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/oscar.dqt/",
    icon: <FaInstagram />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/oscar-decloquement/",
    icon: <FaLinkedin />,
  },
];

export default ConnectLinks;