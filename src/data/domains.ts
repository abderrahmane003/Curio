import { DomainInfo, DomainId } from '../types';

export const DOMAINS: DomainInfo[] = [
  {
    id: 'histoire_civilisations',
    label: 'Histoire & Civilisations',
    icon: '🏛️',
    description: 'Antiquité, grands empires, révolutions et traités mondiaux.',
    colorName: 'blue'
  },
  {
    id: 'geographie_peuples',
    label: 'Géographie & Peuples',
    icon: '🌍',
    description: 'Capitales, reliefs, géopolitique, cultures et peuples du monde.',
    colorName: 'sky'
  },
  {
    id: 'sciences_univers',
    label: 'Sciences & Univers',
    icon: '🔬',
    description: 'Astrophysique, physique quantique, chimie et mathématiques.',
    colorName: 'indigo'
  },
  {
    id: 'arts_architecture',
    label: 'Arts & Architecture',
    icon: '🎨',
    description: 'Peinture, sculpture, mouvements artistiques et chefs-d’œuvre bâtis.',
    colorName: 'amber'
  },
  {
    id: 'litterature_philosophie',
    label: 'Littérature & Philosophie',
    icon: '📚',
    description: 'Grands auteurs, courants de pensée, épopées et citations marquantes.',
    colorName: 'emerald'
  },
  {
    id: 'musique_spectacle',
    label: 'Musique & Spectacle',
    icon: '🎵',
    description: 'Musique classique, jazz, opéra, instruments et scènes légendaires.',
    colorName: 'violet'
  },
  {
    id: 'cinema_series',
    label: 'Cinéma & Séries',
    icon: '🎬',
    description: 'Histoire du 7e art, réalisateurs cultes, palmes et bandes originales.',
    colorName: 'rose'
  },
  {
    id: 'inventions_technologies',
    label: 'Inventions & Technologies',
    icon: '💡',
    description: 'Grandes découvertes, pionniers de l’informatique et révolutions industrielles.',
    colorName: 'cyan'
  },
  {
    id: 'nature_vivant',
    label: 'Nature & Vivant',
    icon: '🌿',
    description: 'Biologie, biodiversité, écosystèmes, règne animal et botanique.',
    colorName: 'emerald'
  },
  {
    id: 'sports_exploits',
    label: 'Sports & Exploits',
    icon: '⚽',
    description: 'Jeux Olympiques, records mythiques, tactiques et héros du sport.',
    colorName: 'orange'
  },
  {
    id: 'gastronomie_terroirs',
    label: 'Gastronomie & Terroirs',
    icon: '🍷',
    description: 'Histoire culinaire, cépages, grands chefs et traditions du goût.',
    colorName: 'yellow'
  },
  {
    id: 'langues_mythologies',
    label: 'Langues, Mots & Mythologies',
    icon: '🗣️',
    description: 'Étymologie, panthéons mythologiques, linguistique et expressions rares.',
    colorName: 'purple'
  }
];

export const DOMAINS_MAP: Record<DomainId, DomainInfo> = DOMAINS.reduce((acc, domain) => {
  acc[domain.id] = domain;
  return acc;
}, {} as Record<DomainId, DomainInfo>);
