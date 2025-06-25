// Brand colors utility for social media icons
export interface BrandColors {
  bg: string;
  hover: string;
  icon: string;
}

export const getBrandColors = (name: string): BrandColors => {
  const brandColors: { [key: string]: BrandColors } = {
    'GitHub': {
      bg: 'bg-github hover:bg-github/80',
      hover: 'hover:shadow-github/30',
      icon: 'text-white'
    },
    'LinkedIn': {
      bg: 'bg-linkedin hover:bg-linkedin/80',
      hover: 'hover:shadow-linkedin/30',
      icon: 'text-white'
    },
    'Twitter': {
      bg: 'bg-twitter hover:bg-twitter/80',
      hover: 'hover:shadow-twitter/30',
      icon: 'text-white'
    },
    'LeetCode': {
      bg: 'bg-leetcode hover:bg-leetcode/80',
      hover: 'hover:shadow-leetcode/30',
      icon: 'text-white'
    },
    'Email': {
      bg: 'bg-gmail hover:bg-gmail/80',
      hover: 'hover:shadow-gmail/30',
      icon: 'text-white'
    },
    'Instagram': {
      bg: 'bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:from-[#6c2a95] hover:via-[#d11919] hover:to-[#e09937]',
      hover: 'hover:shadow-[#833ab4]/30',
      icon: 'text-white'
    },
    'YouTube': {
      bg: 'bg-[#ff0000] hover:bg-[#cc0000]',
      hover: 'hover:shadow-[#ff0000]/30',
      icon: 'text-white'
    },
    'Discord': {
      bg: 'bg-[#5865f2] hover:bg-[#4752c4]',
      hover: 'hover:shadow-[#5865f2]/30',
      icon: 'text-white'
    },
    'Stack Overflow': {
      bg: 'bg-[#f48024] hover:bg-[#d4700a]',
      hover: 'hover:shadow-[#f48024]/30',
      icon: 'text-white'
    },
    'Medium': {
      bg: 'bg-[#000000] hover:bg-[#1a1a1a]',
      hover: 'hover:shadow-black/30',
      icon: 'text-white'
    },
    'Dev.to': {
      bg: 'bg-[#0a0a0a] hover:bg-[#2d2d2d]',
      hover: 'hover:shadow-black/30',
      icon: 'text-white'
    },
    'CodePen': {
      bg: 'bg-[#000000] hover:bg-[#1a1a1a]',
      hover: 'hover:shadow-black/30',
      icon: 'text-white'
    },
    'Dribbble': {
      bg: 'bg-[#ea4c89] hover:bg-[#d73670]',
      hover: 'hover:shadow-[#ea4c89]/30',
      icon: 'text-white'
    },
    'Behance': {
      bg: 'bg-[#1769ff] hover:bg-[#0052cc]',
      hover: 'hover:shadow-[#1769ff]/30',
      icon: 'text-white'
    }
  };
  
  return brandColors[name] || {
    bg: 'bg-slate-800 hover:bg-slate-700',
    hover: 'hover:shadow-primary/20',
    icon: 'text-gray-400 hover:text-primary'
  };
};

// Social media brand hex colors (for reference)
export const BRAND_HEX_COLORS = {
  GitHub: '#24292e',
  LinkedIn: '#0077b5',
  Twitter: '#1da1f2',
  LeetCode: '#ffa116',
  Email: '#ea4335',
  Instagram: '#833ab4',
  YouTube: '#ff0000',
  Discord: '#5865f2',
  'Stack Overflow': '#f48024',
  Medium: '#000000',
  'Dev.to': '#0a0a0a',
  CodePen: '#000000',
  Dribbble: '#ea4c89',
  Behance: '#1769ff'
} as const;