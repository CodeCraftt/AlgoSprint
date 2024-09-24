import { people01, people02, people03, facebook, instagram, linkedin, twitter, airbnb, binance, coinbase, dropbox, send, shield, star  } from "../assets";

export const navLinks = [
  {
    id: "home",
    title: "Home",
  },
  {
    id: "features",
    title: "Features",
  },
  {
    id: "product",
    title: "Product",
  },
  {
    id: "clients",
    title: "Clients",
  },
];

export const features = [
  {
    id: "feature-1",
    icon: star,
    title: "Personalized Pathways",
    content:"Our AI-powered system adapts to your skills, providing tailored problem sets and micro-goals designed to optimize your learning experience." 
   },
  {
    id: "feature-2",
    icon: shield,
    title: "Collaborative & Secure",
    content:"Collaborate in real-time with peers while we ensure your data, code, and solutions remain secure with top-tier encryption and protection."
  },
  {
    id: "feature-3",
    icon: send,
    title: "Real-World Challenges",
    content:"Solve coding problems used by top tech companies in interviews. AlgoSprint’s real-world problem-solving feature helps you prepare for your dream job."
  },
];


export const stats = [
  {
    id: "stats-1",
    title: "DSA problems",
    value: "100+",
  },
  {
    id: "stats-2",
    title: "MNC's interview problems",
    value: "15+",
  },
  {
    id: "stats-3",
    title: "DSA topics",
    value: "25+",
  },
];

export const footerLinks = [
  {
    title: "Useful Links",
    links: [
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Problem List",
        link: "/problems",
      },
      {
        name: "Algo Sensai",
        link: "/chat",
      },
      
    ],
  },

  {
    title: "Community",
    links: [
      {
        name: "Blog",
        link: "/blog",
      },
      {
        name: "Discord",
        link: "/discord",
      },
      {
        name: "Newsletters",
        link: "/newsletters",
      },
    ],
  },
  {
    title: "Lerning",
    links: [
      {
        name: "Articles",
        link: "/articles",
      },
      {
        name: "DSA videos",
        link: "/videos",
      },
    ],
  },
];



export const clients = [
  {
    id: "client-1",
    logo: airbnb,
  },
  {
    id: "client-2",
    logo: binance,
  },
  {
    id: "client-3",
    logo: coinbase,
  },
  {
    id: "client-4",
    logo: dropbox,
  },
];