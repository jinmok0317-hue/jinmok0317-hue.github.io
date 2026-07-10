// 여기 있는 값들만 수정하면 사이트 전체 내용이 바뀝니다.

export const profile = {
  name: "Jinmok",
  role: "Game Developer",
  tagline: "진목아 진목아~ 왜요 쌤 왜요 쌤~",
  location: "Seoul, South Korea",
  email: "jinmok0317@gmail.com",
  about: `빰빰 빠람~ 빰빰빰 빠라밤~`,
  highlights: [
    { label: "Years Coding", value: "3+" },
    { label: "Projects Shipped", value: "10+" },
    { label: "Cups of Coffee", value: "∞" },
  ],
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
};

export const projects: Project[] = [
  {
    title: "개발 야호~",
    description:
      "프로젝트를 변기에 넣고 내려",
    tags: ["React", "TypeScript", "Node.js"],
    link: "#",
    repo: "#",
  },
  {
    title: "야르~",
    description:
      "나는 사실상 개발자가 아니라 애기다 애기",
    tags: ["Next.js", "Tailwind"],
    link: "#",
    repo: "#",
  },
  {
    title: "눈치는 안보기 That's red, red~",
    description:
      "오늘 자기 전에 생각 많이 날 거야",
    tags: ["Python", "FastAPI"],
    link: "#",
    repo: "#",
  },
];

export type Skill = { name: string; level: number };

export const skills: { category: string; items: Skill[] }[] = [
  {
    category: "Languages",
    items: [
      { name: "C", level: 1 },
      { name: "C++", level: 1 },
      { name: "TypeScript", level: 1 },
      { name: "JavaScript", level: 1 },
      { name: "Python", level: 1 },
      { name: "Java", level: 1 },
    ],
  },
  {
    category: "Game Dev",
    items: [{ name: "Unreal Engine", level: 1 }],
  },
  {
    category: "Frontend",
    items: [
      { name: "React", level: 1 },
      { name: "Next.js", level: 1 },
      { name: "Vite", level: 1 },
      { name: "Tailwind CSS", level: 1 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 1 },
      { name: "Express", level: 1 },
      { name: "FastAPI", level: 1 },
      { name: "PostgreSQL", level: 1 },
    ],
  },
  {
    category: "Creative Tools",
    items: [
      { name: "Photoshop", level: 1 },
      { name: "Illustrator", level: 1 },
      { name: "After Effects", level: 1 },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git", level: 1 },
      { name: "Docker", level: 1 },
      { name: "Figma", level: 1 },
      { name: "Notion", level: 1 },
    ],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/jinmok0317-hue" },
  { label: "Email", href: "mailto:jinmok0317@gmail.com" },
  { label: "LinkedIn", href: "#" },
];
