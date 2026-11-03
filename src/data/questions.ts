import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  // 1. HISTOIRE & CIVILISATIONS
  {
    id: 'hist-001',
    domainId: 'histoire_civilisations',
    domainLabel: 'Histoire & Civilisations',
    difficulty: 2,
    questionText: 'Quel traité signé en 1494 a fixé le partage des terres du Nouveau Monde entre l’Espagne et le Portugal ?',
    options: ['Traité d’Utrecht', 'Traité de Tordesillas', 'Traité de Saragosse', 'Traité de Westphalie'],
    correctIndex: 1,
    explanation: 'Négocié directement entre les couronnes de Castille et de Portugal en 1494, le traité a déplacé la ligne de démarcation papale de 1493 à 370 lieues à l’ouest des îles du Cap-Vert. Ce décalage vers l’ouest permettra plus tard au Portugal de revendiquer le Brésil après sa découverte par Cabral en 1500.',
    source: 'Archives générales des Indes (Séville) / Encyclopaedia Universalis',
    tags: ['renaissance', 'explorations', 'espagne', 'portugal']
  },
  {
    id: 'hist-002',
    domainId: 'histoire_civilisations',
    domainLabel: 'Histoire & Civilisations',
    difficulty: 1,
    questionText: 'Qui était le premier empereur de Rome, inaugurant le principat en 27 av. J.-C. ?',
    options: ['Jules César', 'Auguste (Octave)', 'Tibère', 'Marc Antoine'],
    correctIndex: 1,
    explanation: 'Bien que Jules César ait été dictateur à vie, c’est son fils adoptif Octave qui devient le premier empereur officiel sous le titre d’Auguste en 27 avant notre ère.',
    source: 'Suétone, "Vie des douze Césars" / Oxford Classical Dictionary',
    tags: ['antiquité', 'rome', 'empire']
  },
  {
    id: 'hist-003',
    domainId: 'histoire_civilisations',
    domainLabel: 'Histoire & Civilisations',
    difficulty: 2,
    questionText: 'En quelle année a eu lieu la célèbre prise de Constantinople par les Ottomans conduits par Mehmed II ?',
    options: ['1453', '1492', '1515', '1348'],
    correctIndex: 0,
    explanation: 'La chute de Constantinople le 29 mai 1453 met fin à l’Empire byzantin millénaire et est traditionnellement considérée par les historiens comme marquant le passage du Moyen Âge à la Renaissance.',
    source: 'Steven Runciman, "La Chute de Constantinople"',
    tags: ['byzance', 'ottomans', 'moyen-age']
  },
  {
    id: 'hist-004',
    domainId: 'histoire_civilisations',
    domainLabel: 'Histoire & Civilisations',
    difficulty: 3,
    questionText: 'Quel pharaon de la XVIIIe dynastie a tenté d’imposer une révolution religieuse hénothéiste centrée sur Aton ?',
    options: ['Ramsès II', 'Akhenaton (Aménophis IV)', 'Thoutmôsis III', 'Séthi Ier'],
    correctIndex: 1,
    explanation: 'Akhenaton a déplacé la capitale à Tell el-Amarna et supprimé le culte des dieux traditionnels, notamment celui d’Amon de Thèbes, avant que son successeur Toutânkhamon ne rétablisse l’orthodoxie.',
    source: 'Nicolas Grimal, "Histoire de l’Égypte ancienne"',
    tags: ['egypte', 'pharaons', 'antiquité']
  },

  // 2. GÉOGRAPHIE & PEUPLES
  {
    id: 'geo-001',
    domainId: 'geographie_peuples',
    domainLabel: 'Géographie & Peuples',
    difficulty: 1,
    questionText: 'Quelle est la capitale officielle du Canada ?',
    options: ['Toronto', 'Montréal', 'Ottawa', 'Vancouver'],
    correctIndex: 2,
    explanation: 'Ottawa a été choisie par la reine Victoria en 1857 en tant que compromis politique et linguistique entre les populations anglophones et francophones, tout en étant éloignée de la frontière américaine.',
    source: 'Commission de la capitale nationale du Canada',
    tags: ['capitales', 'amérique', 'canada']
  },
  {
    id: 'geo-002',
    domainId: 'geographie_peuples',
    domainLabel: 'Géographie & Peuples',
    difficulty: 2,
    questionText: 'Quel est le lac d’eau douce le plus profond et le plus ancien du monde ?',
    options: ['Le lac Supérieur', 'Le lac Baïkal', 'Le lac Tanganyika', 'Le lac Victoria'],
    correctIndex: 1,
    explanation: 'Situé en Sibérie, le lac Baïkal atteint 1 642 mètres de profondeur et contient environ 20 % de toute l’eau douce liquide non gelée de la planète.',
    source: 'UNESCO World Heritage Centre / Limnological Institute of Siberia',
    tags: ['nature', 'lacs', 'russie']
  },
  {
    id: 'geo-003',
    domainId: 'geographie_peuples',
    domainLabel: 'Géographie & Peuples',
    difficulty: 3,
    questionText: 'Quel détroit maritime sépare la péninsule du Sinaï de la péninsule arabique et donne accès au golfe d’Aqaba ?',
    options: ['Détroit de Bab-el-Mandeb', 'Détroit d’Ormuz', 'Détroit de Tiran', 'Détroit de Malacca'],
    correctIndex: 2,
    explanation: 'Le détroit de Tiran contrôle l’accès maritime vers le port israélien d’Eilat et la Jordanie. Son blocus par l’Égypte en 1967 a été le casus belli déclencheur de la guerre des Six Jours.',
    source: 'Atlas géopolitique mondial / Britannica',
    tags: ['détroits', 'moyen-orient', 'géopolitique']
  },

  // 3. SCIENCES & UNIVERS
  {
    id: 'sci-001',
    domainId: 'sciences_univers',
    domainLabel: 'Sciences & Univers',
    difficulty: 2,
    questionText: 'Quel est le gaz le plus abondant dans l’atmosphère terrestre actuelle ?',
    options: ['L’oxygène (O2)', 'Le diazote (N2)', 'Le dioxyde de carbone (CO2)', 'L’argon (Ar)'],
    correctIndex: 1,
    explanation: 'Le diazote constitue environ 78,08 % du volume de l’air sec, loin devant l’oxygène (environ 20,95 %) et l’argon (0,93 %).',
    source: 'NASA Earth Fact Sheet / Union internationale de chimie pure et appliquée (IUPAC)',
    tags: ['chimie', 'atmosphère', 'terre']
  },
  {
    id: 'sci-002',
    domainId: 'sciences_univers',
    domainLabel: 'Sciences & Univers',
    difficulty: 2,
    questionText: 'Combien de temps faut-il environ à la lumière émise par le Soleil pour parvenir jusqu’à la Terre ?',
    options: ['8 secondes', '8 minutes et 20 secondes', '1 heure', 'Immédiat'],
    correctIndex: 1,
    explanation: 'À une vitesse d’environ 300 000 km/s et sur une distance moyenne Terre-Soleil de 149,6 millions de kilomètres (1 UA), les photons mettent approximativement 499 secondes pour arriver.',
    source: 'Observatoire de Paris / NASA JPL',
    tags: ['physique', 'astronomie', 'soleil']
  },
  {
    id: 'sci-003',
    domainId: 'sciences_univers',
    domainLabel: 'Sciences & Univers',
    difficulty: 3,
    questionText: 'Quel phénomène quantique décrit le fait que deux particules intriquées restent corrélées instantanément quelle que soit la distance qui les sépare ?',
    options: ['L’effet tunnel', 'L’intrication quantique', 'Le principe d’incertitude', 'La décohérence'],
    correctIndex: 1,
    explanation: 'Qualifié dédaigneusement par Albert Einstein d’"action fantomatique à distance", ce phénomène a été rigoureusement validé expérimentalement par Alain Aspect en 1982, récompensé par le prix Nobel de physique en 2022.',
    source: 'Académie royale des sciences de Suède (Prix Nobel de Physique 2022)',
    tags: ['quantique', 'physique', 'alain-aspect']
  },

  // 4. ARTS & ARCHITECTURE
  {
    id: 'art-001',
    domainId: 'arts_architecture',
    domainLabel: 'Arts & Architecture',
    difficulty: 1,
    questionText: 'Dans quel musée parisien peut-on admirer le tableau original de "La Joconde" de Léonard de Vinci ?',
    options: ['Musée d’Orsay', 'Musée du Louvre', 'Centre Pompidou', 'Musée de l’Orangerie'],
    correctIndex: 1,
    explanation: 'Acquise par François Ier en 1518, Mona Lisa fait partie des collections nationales françaises conservées au Musée du Louvre dans la salle des États.',
    source: 'Musée du Louvre, Département des Peintures',
    tags: ['peinture', 'louvre', 'vinci']
  },
  {
    id: 'art-002',
    domainId: 'arts_architecture',
    domainLabel: 'Arts & Architecture',
    difficulty: 2,
    questionText: 'Quel mouvement architectural fondé à Weimar en 1919 par Walter Gropius prônait l’union de l’artisanat et de l’industrie ?',
    options: ['L’Art nouveau', 'Le Bauhaus', 'Le Constructivisme', 'L’Art déco'],
    correctIndex: 1,
    explanation: 'Le Bauhaus a révolutionné le design moderne, l’urbanisme et la typographie au XXe siècle sous la devise "la forme suit la fonction", avant d’être contraint à la fermeture par le régime nazi en 1933.',
    source: 'Bauhaus-Archiv Berlin / Centre Pompidou',
    tags: ['design', 'architecture', 'bauhaus']
  },
  {
    id: 'art-003',
    domainId: 'arts_architecture',
    domainLabel: 'Arts & Architecture',
    difficulty: 3,
    questionText: 'Quel architecte de la Renaissance a conçu la monumentale coupole autoportante de Santa Maria del Fiore à Florence ?',
    options: ['Leon Battista Alberti', 'Filippo Brunelleschi', 'Donatello', 'Michel-Ange'],
    correctIndex: 1,
    explanation: 'Filippo Brunelleschi a résolu un problème technique jugé impossible pendant un siècle en inventant un double dôme sans cintre en bois, posé en arête de poisson (spina di pesce) entre 1420 et 1436.',
    source: 'Giorgio Vasari, "Les Vies des meilleurs peintres, sculpteurs et architectes"',
    tags: ['renaissance', 'florence', 'architecture']
  },

  // 5. LITTÉRATURE & PHILOSOPHIE
  {
    id: 'lit-001',
    domainId: 'litterature_philosophie',
    domainLabel: 'Littérature & Philosophie',
    difficulty: 1,
    questionText: 'Qui est l’auteur du monumental roman en sept tomes "À la recherche du temps perdu" ?',
    options: ['Marcel Proust', 'Gustave Flaubert', 'Émile Zola', 'André Gide'],
    correctIndex: 0,
    explanation: 'Publié entre 1913 et 1927, ce chef-d’œuvre immortalisé par la fameuse scène de la madeleine trempée dans le thé explore les mécanismes involontaires de la mémoire.',
    source: 'Bibliothèque nationale de France (BnF)',
    tags: ['littérature', 'roman', 'proust']
  },
  {
    id: 'lit-002',
    domainId: 'litterature_philosophie',
    domainLabel: 'Littérature & Philosophie',
    difficulty: 2,
    questionText: 'Quel philosophe des Lumières a rédigé le traité politique "Du contrat social" en 1762 ?',
    options: ['Voltaire', 'Montesquieu', 'Jean-Jacques Rousseau', 'Denis Diderot'],
    correctIndex: 2,
    explanation: 'Rousseau y formule le concept de la "volonté générale" et affirme la souveraineté populaire, inspirant directement la Déclaration des droits de l’homme et du citoyen de 1789.',
    source: 'Jean-Jacques Rousseau, "Du contrat social", Édition Garnier-Flammarion',
    tags: ['philosophie', 'lumières', 'politique']
  },
  {
    id: 'lit-003',
    domainId: 'litterature_philosophie',
    domainLabel: 'Littérature & Philosophie',
    difficulty: 3,
    questionText: 'Dans l’allégorie de la caverne de Platon (La République, Livre VII), que représentent les ombres projetées sur le mur ?',
    options: ['La vérité intelligible', 'Les illusions du monde sensible', 'L’âme humaine', 'Les dieux olympiens'],
    correctIndex: 1,
    explanation: 'Pour Platon, les prisonniers enchaînés prennent les reflets et les ombres pour la réalité véritable, alors que la vérité (les Idées) ne s’atteint qu’en s’élevant vers la lumière du soleil hors de la caverne.',
    source: 'Platon, "La République", Traduction Georges Leroux',
    tags: ['philosophie', 'antiquité', 'platon']
  },

  // 6. MUSIQUE & SPECTACLE
  {
    id: 'mus-001',
    domainId: 'musique_spectacle',
    domainLabel: 'Musique & Spectacle',
    difficulty: 1,
    questionText: 'Combien de symphonies achevées Ludwig van Beethoven a-t-il composées ?',
    options: ['7', '9', '12', '41'],
    correctIndex: 1,
    explanation: 'Beethoven a composé neuf symphonies majeures. La 9e symphonie en ré mineur intègre le célèbre poème de Schiller "L’Ode à la joie", devenu l’hymne officiel de l’Union européenne.',
    source: 'Beethoven-Haus Bonn / Philharmonie de Paris',
    tags: ['musique', 'classique', 'beethoven']
  },
  {
    id: 'mus-002',
    domainId: 'musique_spectacle',
    domainLabel: 'Musique & Spectacle',
    difficulty: 2,
    questionText: 'Quel trompettiste de jazz de génie a enregistré l’album légendaire "Kind of Blue" en 1959 ?',
    options: ['Louis Armstrong', 'Miles Davis', 'Dizzy Gillespie', 'Chet Baker'],
    correctIndex: 1,
    explanation: '"Kind of Blue" est l’album le plus vendu de toute l’histoire du jazz. Il a popularisé le jazz modal, avec des solistes mythiques comme John Coltrane et Bill Evans.',
    source: 'Columbia Records / Library of Congress National Recording Registry',
    tags: ['jazz', 'musique', 'miles-davis']
  },

  // 7. CINÉMA & SÉRIES
  {
    id: 'cin-001',
    domainId: 'cinema_series',
    domainLabel: 'Cinéma & Séries',
    difficulty: 1,
    questionText: 'Quel réalisateur a signé le chef-d’œuvre du suspense "Psychose" en 1960 ?',
    options: ['Alfred Hitchcock', 'Stanley Kubrick', 'Billy Wilder', 'Orson Welles'],
    correctIndex: 0,
    explanation: 'Alfred Hitchcock a financé lui-même ce film en noir et blanc tourné avec l’équipe de sa série télévisée. La scène de la douche a nécessité à elle seule 7 jours de tournage et 78 plans coupés.',
    source: 'François Truffaut, "Hitchcock / Truffaut", Éditions Gallimard',
    tags: ['cinéma', 'hitchcock', 'suspense']
  },
  {
    id: 'cin-002',
    domainId: 'cinema_series',
    domainLabel: 'Cinéma & Séries',
    difficulty: 2,
    questionText: 'En quelle année a eu lieu la toute première projection publique payante du cinématographe des frères Lumière à Paris ?',
    options: ['1889', '1895', '1900', '1905'],
    correctIndex: 1,
    explanation: 'Le 28 décembre 1895, dans le salon indien du Grand Café boulevard des Capucines, les frères Auguste et Louis Lumière présentaient leurs dix premiers courts-métrages, dont "La Sortie de l’usine Lumière à Lyon".',
    source: 'Institut Lumière de Lyon / CNC',
    tags: ['cinéma', 'histoire', 'lumière']
  },

  // 8. INVENTIONS & TECHNOLOGIES
  {
    id: 'inv-001',
    domainId: 'inventions_technologies',
    domainLabel: 'Inventions & Technologies',
    difficulty: 2,
    questionText: 'Qui est universellement crédité pour la création du World Wide Web (WWW) au CERN en 1989 ?',
    options: ['Tim Berners-Lee', 'Alan Turing', 'Vint Cerf', 'Steve Wozniak'],
    correctIndex: 0,
    explanation: 'L’informaticien britannique Tim Berners-Lee a conçu les trois technologies fondatrices du Web : le protocole HTTP, le langage HTML et les adresses URL, rendant son invention libre de droits pour le bien de l’humanité.',
    source: 'CERN / World Wide Web Consortium (W3C)',
    tags: ['informatique', 'web', 'internet']
  },
  {
    id: 'inv-002',
    domainId: 'inventions_technologies',
    domainLabel: 'Inventions & Technologies',
    difficulty: 2,
    questionText: 'Quelle mathématicienne pionnière du XIXe siècle a écrit le premier algorithme destiné à être exécuté par une machine, étant considérée comme la première programmeuse de l’histoire ?',
    options: ['Ada Lovelace', 'Marie Curie', 'Grace Hopper', 'Katherine Johnson'],
    correctIndex: 0,
    explanation: 'En 1843, Ada Lovelace a détaillé dans ses notes sur la machine analytique de Charles Babbage un programme complet pour calculer les nombres de Bernoulli, anticipant l’informatique moderne plus d’un siècle avant son avènement.',
    source: 'The Royal Society Archives / Oxford University History of Science',
    tags: ['informatique', 'pionniers', 'mathématiques']
  },

  // 9. NATURE & VIVANT
  {
    id: 'nat-001',
    domainId: 'nature_vivant',
    domainLabel: 'Nature & Vivant',
    difficulty: 1,
    questionText: 'Quel est le plus grand animal vivant connu sur notre planète, pouvant peser plus de 150 tonnes ?',
    options: ['Le cachalot', 'La baleine bleue (rorqual bleu)', 'L’éléphant d’Afrique', 'Le requin-baleine'],
    correctIndex: 1,
    explanation: 'La baleine bleue dépasse en masse corporelle n’importe quel dinosaure ayant jamais vécu sur Terre : son seul cœur a la taille d’une petite voiture et sa langue peut peser autant qu’un éléphant.',
    source: 'WWF / Muséum national d’Histoire naturelle',
    tags: ['animaux', 'océan', 'biologie']
  },
  {
    id: 'nat-002',
    domainId: 'nature_vivant',
    domainLabel: 'Nature & Vivant',
    difficulty: 2,
    questionText: 'Quel composé organique vert permet aux plantes d’absorber l’énergie lumineuse indispensable à la photosynthèse ?',
    options: ['La chlorophylle', 'Le carotène', 'La cellulose', 'La lignine'],
    correctIndex: 0,
    explanation: 'La molécule de chlorophylle possède en son cœur un atome de magnésium. Elle absorbe principalement les longueurs d’onde bleues et rouges du spectre visible, et réfléchit la lumière verte.',
    source: 'Campbell Biology, 12e édition',
    tags: ['botanique', 'plantes', 'photosynthèse']
  },

  // 10. SPORTS & EXPLOITS
  {
    id: 'spo-001',
    domainId: 'sports_exploits',
    domainLabel: 'Sports & Exploits',
    difficulty: 1,
    questionText: 'Dans quelle ville historique se sont tenus les premiers Jeux Olympiques de l’ère moderne en 1896 ?',
    options: ['Paris', 'Athènes', 'Rome', 'Londres'],
    correctIndex: 1,
    explanation: 'Sous l’impulsion du baron Pierre de Coubertin, ces premiers Jeux ont réuni 241 athlètes masculins de 14 nations dans le stade panathénaïque d’Athènes restauré en marbre blanc.',
    source: 'Comité International Olympique (CIO)',
    tags: ['sport', 'olympisme', 'histoire']
  },
  {
    id: 'spo-002',
    domainId: 'sports_exploits',
    domainLabel: 'Sports & Exploits',
    difficulty: 2,
    questionText: 'Quel joueur d’échecs légendaire a été le premier à s’incliner dans un match régulier contre le supercalculateur Deep Blue d’IBM en 1997 ?',
    options: ['Anatoli Karpov', 'Garry Kasparov', 'Bobby Fischer', 'Magnus Carlsen'],
    correctIndex: 1,
    explanation: 'Cette victoire historique de l’ordinateur contre le champion du monde en titre a marqué un tournant psychologique mondial dans l’histoire de l’intelligence artificielle.',
    source: 'Fédération Internationale des Échecs (FIDE) / IBM Archives',
    tags: ['échecs', 'kasparov', 'ia']
  },

  // 11. GASTRONOMIE & TERROIRS
  {
    id: 'gas-001',
    domainId: 'gastronomie_terroirs',
    domainLabel: 'Gastronomie & Terroirs',
    difficulty: 1,
    questionText: 'De quel pays est originaire la boisson fermentée à base de riz appelée le saké (nihonshu) ?',
    options: ['La Chine', 'Le Japon', 'La Corée du Sud', 'Le Vietnam'],
    correctIndex: 1,
    explanation: 'Le saké japonais est produit par une double fermentation parallèle de grains de riz polis à l’aide d’eau pure et d’un champignon microscopique appelé Aspergillus oryzae (kōji-kin).',
    source: 'Japan Sake and Shochu Makers Association',
    tags: ['gastronomie', 'japon', 'terroirs']
  },
  {
    id: 'gas-002',
    domainId: 'gastronomie_terroirs',
    domainLabel: 'Gastronomie & Terroirs',
    difficulty: 2,
    questionText: 'Quel champignon souterrain précieux récolté au pied des chênes truffiers est surnommé le "diamant noir du Périgord" ?',
    options: ['Tuber magnatum', 'Tuber melanosporum', 'Tuber aestivum', 'Boletus edulis'],
    correctIndex: 1,
    explanation: 'Tuber melanosporum est la reine des truffes noires en gastronomie française. Tuber magnatum désigne quant à elle la truffe blanche d’Alba en Italie.',
    source: 'Fédération Française des Trufficulteurs / Larousse Gastronomique',
    tags: ['terroir', 'cuisine', 'truffes']
  },

  // 12. LANGUES, MOTS & MYTHOLOGIES
  {
    id: 'lan-001',
    domainId: 'langues_mythologies',
    domainLabel: 'Langues, Mots & Mythologies',
    difficulty: 1,
    questionText: 'Dans la mythologie grecque, qui a condamné Sisyphe à faire rouler éternellement un rocher au sommet d’une colline ?',
    options: ['Zeus', 'Hadès', 'Poséidon', 'Arès'],
    correctIndex: 0,
    explanation: 'Pour avoir défié et trompé la Mort (Thanatos) à deux reprises, le roi Sisyphe a été condamné par Zeus à ce châtiment absurde qui a inspiré l’essai philosophique éponyme d’Albert Camus.',
    source: 'Homère, "Odyssée", Chant XI / Dictionnaire de la mythologie grecque et romaine',
    tags: ['mythologie', 'grèce', 'camus']
  },
  {
    id: 'lan-002',
    domainId: 'langues_mythologies',
    domainLabel: 'Langues, Mots & Mythologies',
    difficulty: 2,
    questionText: 'D’où vient étymologiquement le mot français "albatros", désignant le grand oiseau marin immortalisé par Baudelaire ?',
    options: ['Du grec "albatros" signifiant blanc', 'De l’arabe "al-ghattas" (le plongeur) via le portugais', 'Du vieux norrois scandinave', 'Du celte gaulois'],
    correctIndex: 1,
    explanation: 'Le mot dérive de l’arabe "al-ġaṭṭās" (le plongeur de mer), transmis aux marins portugais sous la forme "alcatraz" (qui a aussi donné le nom de l’île prison), puis adapté en anglais et français avec l’influence du latin "albus" (blanc).',
    source: 'Dictionnaire historique de la langue française (Alain Rey)',
    tags: ['étymologie', 'linguistique', 'baudelaire']
  }
];

export function getQuestionsByDomain(domainId: string): Question[] {
  return INITIAL_QUESTIONS.filter(q => q.domainId === domainId);
}

export function getRandomQuestions(count: number, domainFilter?: string): Question[] {
  let pool = domainFilter 
    ? INITIAL_QUESTIONS.filter(q => q.domainId === domainFilter)
    : [...INITIAL_QUESTIONS];
  
  if (pool.length === 0) pool = [...INITIAL_QUESTIONS];

  const shuffled = [...pool].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
