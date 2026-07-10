// 여기 있는 값들만 수정하면 사이트 전체 내용이 바뀝니다.

export const profile = {
  name: "Jinmok",
  role: "Software Engineer",
  tagline: "코드로 아이디어를 만듭니다.",
  location: "Seoul, South Korea",
  email: "jinmok0317@gmail.com",
  about: `안녕하세요, 문제를 해결하는 것을 좋아하는 개발자입니다. 사용자 경험과 코드 품질 모두를
중요하게 생각하며, 새로운 기술을 배우고 실제 프로젝트에 적용하는 과정을 즐깁니다.`,
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
    title: "Project One",
    description:
      "프로젝트에 대한 간단한 설명을 여기에 적어주세요. 어떤 문제를 해결했는지, 어떤 기술을 썼는지 한두 문장으로 요약합니다.",
    tags: ["React", "TypeScript", "Node.js"],
    link: "#",
    repo: "#",
  },
  {
    title: "Project Two",
    description:
      "두 번째 프로젝트 설명입니다. 실제 작업물로 교체해주세요.",
    tags: ["Next.js", "Tailwind"],
    link: "#",
    repo: "#",
  },
  {
    title: "Project Three",
    description:
      "세 번째 프로젝트 설명입니다. 링크와 레포지토리 주소도 함께 채워주세요.",
    tags: ["Python", "FastAPI"],
    link: "#",
    repo: "#",
  },
];

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["TypeScript", "JavaScript", "Python", "Java"],
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "FastAPI", "PostgreSQL"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Figma", "Notion"],
  },
];

export const socials = [
  { label: "GitHub", href: "https://github.com/jinmok0317-hue" },
  { label: "Email", href: "mailto:jinmok0317@gmail.com" },
  { label: "LinkedIn", href: "#" },
];
