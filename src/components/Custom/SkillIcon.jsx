"use client";
import Image from "next/image";
import { getSkillConfig } from "@/utils/skillsConfig";

const SkillIcon = ({ skill, className = "h-7 w-7 pr-1 sm:pr-2" }) => {
  const skillConfig = getSkillConfig(skill);

  return (
    <div className={`${className} flex items-center justify-center`}>
      <Image
        src={skillConfig.icon}
        alt={`${skill} icon`}
        width={20}
        height={20}
        className="object-contain"
        onError={(e) => {
          // Fallback to a default icon if the specific icon fails to load
          e.target.src = "/icons/skills/default.svg";
        }}
      />
    </div>
  );
};

export default SkillIcon;
