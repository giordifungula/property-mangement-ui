import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

interface ISocialLink {
  icon: React.ReactNode;
  url: string;
  id: number;
}

export const socialLinks: ISocialLink[] = [
  {
    id: 1,
    icon: <FiGithub />,
    url: 'https://github.com/giordifungula'
  },
  {
    id: 2,
    icon: <FiTwitter />,
    url: 'https://twitter.com/jodifungula'
  },
  {
    id: 3,
    icon: <FiLinkedin />,
    url: 'https://www.linkedin.com/in/giordi-fungula-b0a31295/'
  }
];
