export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  duration: string;
  description: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tags: string[];
}

export interface MemoryCard {
  id: number;
  iconName: string;
  label: string;
  colorClass: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}
