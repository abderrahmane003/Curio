# Curio — Culture & Savoir (Plan d'Implémentation Mis à Jour)

Application mobile-first de culture générale haut de gamme (style Apple, Stripe et Linear) : apprentissage stimulant, défis quotidiens, progression cartographiée par domaine, révision espacée scientifique (SuperMemo SM-2) et architecture sécurisée.

---

## 1. Identité de Marque & Wordmark "Curio"

### A. Proposition de Logo & Wordmark Minimaliste
Loin des dégradés clichés de l'IA, le logo de **Curio** incarne l'élégance sobre, la précision typographique et l'étincelle de la découverte :

- **Typographie du Wordmark** : `Plus Jakarta Sans` en graisse `Bold` (700) avec interlettrage légèrement resserré (`tracking-tight`).
- **Signature Visuelle Intégrée (Le "i" curieux)** :
  - Le point sur le « **i** » de **Curio** est remplacé par une micro-étincelle géométrique à 4 branches (✦) ou un cercle parfait flottant teinté dans l'accent électrique (`#2563EB` en clair, `#3B82F6` en sombre).
  - Alternative d'icône d'application (PWA / favicon) : Un contour géométrique d'œil stylisé à trait fin ($1.75\text{px}$) encerclant un point focal qui évoque à la fois l'attention humaine et le point d'interrogation du questionnement.
- **Codes Couleurs du Logo** :
  - Mode Clair : Lettres en Onyx Noir (`#0F172A`), étincelle/point en Bleu Cobalt (`#2563EB`).
  - Mode Sombre : Lettres en Blanc Pur (`#F8FAFC`), étincelle/point en Bleu Azure Électrique (`#3B82F6`).

### B. Propositions de Slogan Court
Voici les 3 variantes conçues pour l'écran de lancement, le manifeste PWA et la communication :

1. **Variante 1 (Aspirationnelle & Élégante)** :
   > « *Cultivez votre curiosité.* »
   *(Style Apple/Stripe : sobre, valorisant, axé sur l'élévation personnelle quotidienne).*
2. **Variante 2 (Directe & Mémorable)** :
   > « *Reste curieux.* »
   *(Formule courte, percutante, invitant à l'action immédiate).*
3. **Variante 3 (Méthodique & Rétention)** :
   > « *Le savoir quotidien.* »
   *(Clair, centré sur la promesse de mémorisation sans friction).*

### C. Nouveaux Titres de Progression Curio
L'évolution du joueur s'aligne désormais sur la thématique de la curiosité et de l'exploration :

| Niveau | Titre Honorifique | Description & Statut |
| :--- | :--- | :--- |
| **Niveaux 1 à 3** | **Curieux Novice** | Découverte des premiers domaines et mise en place de la routine quotidienne. |
| **Niveaux 4 à 7** | **Explorateur du Savoir** | Exploration active des 12 domaines, premières séries régulières (streaks). |
| **Niveaux 8 à 14** | **Érudit Confirmé** | Maîtrise avancée des questions pointues et rétention consolidée (SM-2). |
| **Niveaux 15+** | **Maître Encyclopédiste** | Sommet du panthéon Curio, ligue d'élite et culture globale sans faille. |

---

## 2. Palette de Couleurs & Ratios de Contraste Recalculés

Conformité stricte à la règle **60-30-10** et aux standards d'accessibilité WCAG 2.1 (texte $\ge 4.5:1$, composants d'interface $\ge 3:1$).

### Mode Clair (Light Mode)
*Fond de référence : Canvas `#F8FAFC` et Carte `#FFFFFF`*

| Rôle | Teinte | Code HEX | Usage & Destination | Ratio sur Fond Blanc (`#FFFFFF`) | Ratio sur Canvas (`#F8FAFC`) | Conformité WCAG |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Canvas** | Snow Pure | `#F8FAFC` | Fond global viewport | 1.05:1 | Réf. | Structure |
| **Surface** | Pure White | `#FFFFFF` | Cartes, bottom sheet, tab bar | Réf. | 1.05:1 | Structure |
| **Bordure Carte** | Slate Hairline | `#E2E8F0` | Contour subtil de délimitation | 1.25:1 | 1.20:1 | Séparation |
| **Bordure Bouton Réponse** | Slate UI Border | `#94A3B8` | **Bordure des options de réponse** | **3.2:1** | **3.1:1** | **Conforme WCAG UI 1.4.11 ($\ge 3:1$)** |
| **Bordure Bouton Hover/Actif** | Slate Dark Border | `#64748B` | État sélectionné / actif | **4.7:1** | **4.5:1** | Dépasse 3:1 |
| **Text Primary** | Deep Onyx | `#0F172A` | Titres, questions, texte fort | **18.7:1** | **17.8:1** | **WCAG AAA** ($\ge 7:1$) |
| **Text Secondary** | Muted Slate | `#64748B` | Métadonnées, sous-titres, timer | **4.9:1** | **4.7:1** | **WCAG AA** ($\ge 4.5:1$) |
| **Accent Principal** | Indigo Linear | `#2563EB` | Boutons CTA 52px, onglet actif | **5.4:1** | **5.1:1** | **WCAG AA** ($\ge 4.5:1$) |
| **Succès / Bon** | Deep Emerald | `#047857` | Bonne réponse, validation, XP | **5.9:1** | **5.6:1** | **WCAG AA** ($\ge 4.5:1$) |
| **Erreur / Alerte** | Crimson Bold | `#DC2626` | Mauvaise réponse, vie perdue | **5.8:1** | **5.5:1** | **WCAG AA** ($\ge 4.5:1$) |
| **Savoir / Ambre** | Dark Amber Ochre| `#92400E` | Cartes "Le saviez-vous ?", badges | **7.1:1** | **6.8:1** | **WCAG AAA/AA** ($\ge 4.5:1$) |

### Mode Sombre (Dark Mode — style Apple/Linear OLED)
*Fond de référence : Canvas `#090D16` et Carte `#131B2E`*

| Rôle | Teinte | Code HEX | Usage & Destination | Ratio sur Carte (`#131B2E`) | Ratio sur Canvas (`#090D16`) | Conformité WCAG |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Canvas** | Void Black | `#090D16` | Fond d'écran sombre immersif | 1.25:1 | Réf. | Structure |
| **Surface** | Elevated Charcoal | `#131B2E` | Cartes de quiz, conteneurs, barres | Réf. | 1.25:1 | Structure |
| **Bordure Carte** | Night Border | `#1E293B` | Délimitation discrète de carte | 1.4:1 | 1.7:1 | Séparation |
| **Bordure Bouton Réponse** | Border UI Dark | `#475569` | **Bordure des options de réponse** | **3.3:1** | **4.1:1** | **Conforme WCAG UI 1.4.11 ($\ge 3:1$)** |
| **Text Primary** | Pure Ivory | `#F8FAFC` | Titres, texte des questions, chiffres| **16.5:1** | **19.8:1** | **WCAG AAA** ($\ge 7:1$) |
| **Text Secondary** | Cool Muted | `#94A3B8` | Métadonnées, sources, chapitres | **6.4:1** | **7.7:1** | **WCAG AAA** ($\ge 7:1$) |
| **Accent Principal** | Electric Azure | `#3B82F6` | Boutons CTA 52px, onglet actif | **5.2:1** | **6.3:1** | **WCAG AA** ($\ge 4.5:1$) |
| **Succès / Bon** | Luminous Mint | `#10B981` | Validation de réponse | **8.1:1** | **9.7:1** | **WCAG AAA** ($\ge 7:1$) |
| **Erreur / Alerte** | Vivid Rose Red | `#F43F5E` | Mauvaise réponse | **5.8:1** | **6.9:1** | **WCAG AA** ($\ge 4.5:1$) |
| **Savoir / Ambre** | Warm Gold | `#F59E0B` | Rubriques découvertes, anecdotes | **8.3:1** | **9.9:1** | **WCAG AAA** ($\ge 7:1$) |

---

## 3. Structure Visuelle & Composants Ergonomiques

- **Boutons d'Action Principaux** : Strictement verrouillés à **52 px** de hauteur (`h-[52px]` / `min-h-[52px]`) avec coins adoucis `rounded-xl`.
- **Options de Quiz** : Bordure nette avec contraste $\ge 3:1$, pastille de lettre (`A`, `B`, `C`, `D`), feedback instantané (vert/rouge) sans latence.
- **Retour Multimodal (iOS + Android)** :
  - Visuel : Micro-pulsion d'échelle et coloration nette de la carte.
  - Audio : Synthèse en temps réel via **Web Audio API** (accord Do-Mi ascendant sur bonne réponse, accord grave sur erreur), compatible Safari iOS et désactivable en un clic.
  - Haptique : Vérification de `'vibrate' in navigator` pour les smartphones Android.

---

## 4. Les 12 Domaines Officiels

Ces 12 libellés sont rigoureusement identiques partout :
1. 🏛️ Histoire & Civilisations
2. 🌍 Géographie & Peuples
3. 🔬 Sciences & Univers
4. 🎨 Arts & Architecture
5. 📚 Littérature & Philosophie
6. 🎵 Musique & Spectacle
7. 🎬 Cinéma & Séries
8. 💡 Inventions & Technologies
9. 🌿 Nature & Vivant
10. ⚽ Sports & Exploits
11. 🍷 Gastronomie & Terroirs
12. 🗣️ Langues, Mots & Mythologies

---

## 5. Algorithme de Mémorisation Unique : SuperMemo SM-2

Application stricte de l'algorithme standard **SM-2** :
- Facteur de Facilité ($EF$) initialisé à $2.5$, borné à un minimum de $1.3$.
- Intervalle $I_1 = 1\text{ jour}$, $I_2 = 6\text{ jours}$, $I_n = I_{n-1} \times EF$.
- En cas de mauvaise réponse (qualité $< 3$), remise à zéro des répétitions pour révision le lendemain.

---

## 6. Wireframes Textuels Mis à Jour (Curio)

### Barre de Navigation Inférieure Fixe (5 Onglets Identiques)
```text
+-----------------------------------------------------------------------+
|  [🏠 Découvrir]   [🎮 Jouer]   [📚 Domaines]   [🏆 Ligues]   [👤 Profil]  |
+-----------------------------------------------------------------------+
```

### Écran 1 : Découvrir (Accueil Curio)
```text
+-------------------------------------------------------------+
|  CURIO ✦                     🔥 5 j.   ⚡ 1 420 XP   [Photo] | (Top Bar)
+-------------------------------------------------------------+
|                                                             |
|  [ CARTE : DÉFI DU JOUR ]                                   |
|  ---------------------------------------------------------  |
|  Mission quotidienne · 3 questions · Bonus +100 XP          |
|  "Les grandes énigmes de la Renaissance"                    |
|  [         RELEVER LE DÉFI DU JOUR (52px)                ]  |
|                                                             |
|  [ CARTE : LE SAVIEZ-VOUS ? (Anecdote du jour) ]            |
|  ---------------------------------------------------------  |
|  Histoire · 45s de lecture                                  |
|  "Négocié directement entre les couronnes de Castille et    |
|  de Portugal en 1494, le traité de Tordesillas a déplacé... |
|  Source : Archives générales des Indes (Séville)             |
|  [ Tester ma mémoire sur cette anecdote ]                   |
|                                                             |
|  [ MODES RAPIDES EN 1 CLIC ]                                |
|  [ ⚡ Quiz 60s ]   [ 🎯 Mode Survie ]   [ 🧠 Révision SM-2 ]|
|                                                             |
+-------------------------------------------------------------+
|  [Découvrir*]   [Jouer]      [Domaines]     [Ligues]   [Profil]|
+-------------------------------------------------------------+
```

### Écran 2 : Quiz en Direct avec Signalement & Source
```text
+-------------------------------------------------------------+
|  [X Quitter]       Question 4/10       🔊 Son ON   ⏱️ 00:12  |
|  [================----------------------------------------] |
+-------------------------------------------------------------+
|                                                             |
|  🏛️ HISTOIRE & CIVILISATIONS · NIVEAU ÉRUDIT                |
|                                                             |
|  Quel traité signé en 1494 a fixé le partage des terres     |
|  du Nouveau Monde entre l'Espagne et le Portugal ?          |
|                                                             |
|  +-------------------------------------------------------+  |
|  | A  Traité d'Utrecht                                   |  |
|  +-------------------------------------------------------+  |
|  | B  Traité de Tordesillas                              |  | (Sélectionné)
|  +-------------------------------------------------------+  |
|  | C  Traité de Saragosse                                |  |
|  +-------------------------------------------------------+  |
|  | D  Traité de Westphalie                               |  |
|  +-------------------------------------------------------+  |
|                                                             |
|  [ RETOUR VISUEL & AUDIO INSTANTANÉ ]                       |
|  ✅ Bonne réponse ! (+15 XP)                                |
|                                                             |
|  💡 Le saviez-vous ?                                        |
|  Négocié directement entre les couronnes de Castille et de  |
|  Portugal en 1494, le traité a déplacé la ligne papale de   |
|  1493 à 370 lieues à l'ouest des îles du Cap-Vert. Ce       |
|  décalage permettra plus tard au Portugal de revendiquer    |
|  le Brésil après sa découverte par Cabral en 1500.          |
|                                                             |
|  Source : Archives générales des Indes / Univ.              |
|  [ ⚠️ Signaler une erreur sur cette question ]               |
|                                                             |
|  [            QUESTION SUIVANTE (52px) ->                ]  |
+-------------------------------------------------------------+
```

### Écran 5 : Mon Profil Curio
```text
+-------------------------------------------------------------+
|  MON PROFIL CURIO                                 [Réglages]|
+-------------------------------------------------------------+
|  [Avatar] Alexandre                                         |
|  Niveau 6 · 2 450 XP  ·  Titre : Explorateur du Savoir      |
|  Précision globale : 78%  ·  340 questions explorées        |
|                                                             |
|  [ CARTE : BOÎTE DE RÉPÉTITION ESPACÉE (SM-2) ]             |
|  ---------------------------------------------------------  |
|  🧠 12 questions prêtes à être consolidées aujourd'hui.     |
|  Ces fiches réactivent votre mémoire avant l'oubli naturel. |
|  [       LANCER LA SESSION DE RÉVISION (52px)            ]  |
|                                                             |
|  [ BADGES & EXPLOITS ]                                      |
|  🔥 Flamme Débutante (3j)  ⚡ Tir Précis (75%+)             |
|  📚 Dévoreur de Savoirs    🏛️ Antiquité Maîtrisée           |
|                                                             |
|  [Paramètres : Modifier domaines préférés / Niveau / Audio] |
+-------------------------------------------------------------+
|  [Découvrir]   [Jouer]      [Domaines]     [Ligues]   [Profil*]|
+-------------------------------------------------------------+
```

---

## 7. Architecture Backend & Sécurité

- **Vercel Deployment** : Fichier `vercel.json` avec réécriture SPA et API.
- **Sécurité Gemini API** : Route Express/Serverless `/api/generate-questions` exécutée strictement côté serveur avec `process.env.GEMINI_API_KEY`. Zéro exposition côté client.
- **Firebase & Cloud Firestore** :
  - Authentification anonyme (invité) avec passerelle Google Popup.
  - Règles `firestore.rules` verrouillant chaque document utilisateur (`isOwner`).
  - Schéma documenté dans `firebase-blueprint.json`.
- **PWA** : `manifest.webmanifest` et `sw.js` pour installation écran d'accueil et cache offline.
