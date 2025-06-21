// Skills configuration with icon mapping
export const skillsConfig = {
  // Programming Languages
  Java: {
    icon: "/icons/skills/java.svg",
  },
  JavaScript: {
    icon: "/icons/skills/javascript.svg",
  },
  Typescript: {
    icon: "/icons/skills/typescript.svg",
  },
  Python: {
    icon: "/icons/skills/python.svg",
  },
  HTML: {
    icon: "/icons/skills/html5.svg",
  },
  CSS: {
    icon: "/icons/skills/css3.svg",
  },

  // Databases
  MySQL: {
    icon: "/icons/skills/mysql.svg",
  },
  PostgreSQL: {
    icon: "/icons/skills/postgresql.svg",
  },
  MongoDB: {
    icon: "/icons/skills/mongodb.svg",
  },
  Redis: {
    icon: "/icons/skills/redis.svg",
  },

  // Frameworks & Libraries
  React: {
    icon: "/icons/skills/react.svg",
  },
  "Next.js": {
    icon: "/icons/skills/nextjs.svg",
  },
  Vite: {
    icon: "/icons/skills/vite.svg",
  },
  TailwindCSS: {
    icon: "/icons/skills/tailwindcss.svg",
  },
  "Redux-Toolkit": {
    icon: "/icons/skills/redux.svg",
  },
  Express: {
    icon: "/icons/skills/express.svg",
  },
  "Node.js": {
    icon: "/icons/skills/nodejs.svg",
  },
  "Spring Boot": {
    icon: "/icons/skills/spring.svg",
  },
  Flask: {
    icon: "/icons/skills/flask.svg",
  },
  JWT: {
    icon: "/icons/skills/jwt.svg",
  },
  WebSocket: {
    icon: "/icons/skills/websocket.svg",
  },
  Prisma: {
    icon: "/icons/skills/prisma.svg",
  },
  "Shadcn UI": {
    icon: "/icons/skills/shadcn.svg",
  },

  // Tools & Technologies
  Git: {
    icon: "/icons/skills/git.svg",
  },
  Docker: {
    icon: "/icons/skills/docker.svg",
  },
  Vercel: {
    icon: "/icons/skills/vercel.svg",
  },
  Netlify: {
    icon: "/icons/skills/netlify.svg",
  },
  Postman: {
    icon: "/icons/skills/postman.svg",
  },
  Figma: {
    icon: "/icons/skills/figma.svg",
  },
  "Linux (Ubuntu)": {
    icon: "/icons/skills/ubuntu.svg",
  },
  Notion: {
    icon: "/icons/skills/notion.svg",
  },
  Linear: {
    icon: "/icons/skills/linear.svg",
  },

  // Generic/Default icons for skills without specific icons
  "Server Side Rendering(SSR)": {
    icon: "/icons/skills/default-web.svg",
  },
  "REST API": {
    icon: "/icons/skills/api.svg",
  },
  "AWS(S3, Amplify, SES)": {
    icon: "/icons/skills/aws.svg",
  },
  Testing: {
    icon: "/icons/skills/testing.svg",
  },
  "Problem Solving": {
    icon: "/icons/skills/problem-solving.svg",
  },
  Agile: {
    icon: "/icons/skills/agile.svg",
  },
  MVC: {
    icon: "/icons/skills/mvc.svg",
  },
};

// Helper function to get skill config
export const getSkillConfig = (skillName) => {
  return (
    skillsConfig[skillName] || {
      icon: "/icons/skills/default.svg",
    }
  );
};

// Helper function to get all skills that need icons downloaded
export const getSkillsNeedingIcons = () => {
  return Object.keys(skillsConfig);
};
