# 8. Core Gameplay Systems

## 8.1 Episode Structure
*Dead Roads* utilizes a highly structured episodic format designed to fit into mobile play sessions (15-20 minutes) while maintaining the pacing of a prestige television drama.

### The Template
1.  **"Previously On..." (30 Seconds):** A dynamic cutscene that recaps player-specific choices and consequences relevant to the upcoming episode.
2.  **Cold Open Cinematic (1 Minute):** High-tension opening. Often starts *in media res* or shows the perspective of a minor character/antagonist to build suspense.
3.  **Exploration & Scavenging Phase (5 Minutes):** The player navigates a 3D environment (isometric or 3rd person fixed-camera). They tap to search cabinets, read lore artifacts, and bypass simple environmental puzzles.
4.  **Character Moment (2 Minutes):** A campfire scene or quiet moment of dialogue. This is where relationships are built, trust is tested, and the "Social Simulation" occurs.
5.  **Combat/Tension Phase (5-7 Minutes):** A turn-based tactical encounter. Stealth is usually an option initially, escalating to loud combat if the player fails.
6.  **The Major Decision (1 Minute):** The climax of the episode. A harrowing binary or ternary choice (e.g., Who to save? Which faction to betray?). The UI highlights this as a "Crucial Choice."
7.  **Cliffhanger Ending (30 Seconds):** The immediate fallout of the decision leading to a dramatic cut to black.
8.  **"Next Time On..." & Recap Screen:** Shows the player what percentage of the global player base made the same choices they did, fostering community discussion.

## 8.2 Combat System (Mobile-First Tactical)
Combat is turn-based on a gridless environment, optimized for touch controls. It emphasizes positioning, resource scarcity, and extreme lethality.

*   **Action Point (AP) Economy:** Each character has 3 AP per turn. Moving costs 1 AP, shooting costs 1 AP, using a heavy weapon costs 2 AP. 
*   **The Noise Mechanic (The Threat Meter):** This is the core combat loop. Using firearms generates Noise. As the Threat Meter fills, more infected spawn from the edges of the map. 
    *   *Silenced Pistol:* +10 Threat
    *   *Assault Rifle:* +40 Threat
    *   *Shotgun:* +60 Threat (Guarantees reinforcements next turn).
    *   *Melee/Bow:* +0 Threat (Requires close range and high AP).
*   **Weapons & Ammo:** Ammo is incredibly scarce. Players might enter a 6-turn combat scenario with only 4 bullets. Weapons degrade and can jam if not maintained at the base.
*   **Injuries & Trauma:** HP is low. If a character takes damage from an infected, there is a % chance of Infection (requires immediate amputation/rare medicine) or a severe injury (e.g., "Mangled Leg" reduces movement by 50% for 3 episodes).
*   **Critical Hits:** Headshots are guaranteed kills on standard infected but require 2 AP to "Aim" and have a lower base hit percentage.
*   **Stealth:** Players can enter "Stealth Mode" if undetected. Tapping an enemy from behind executes a silent takedown (costs 2 AP). If a body is found, the Threat Meter spikes.
*   **Companion AI:** If the player does not issue a command, Companions will act autonomously based on their Personality Archetype (e.g., A "Pragmatist" will fall back to cover; a "Zealot" will charge forward).
*   **Difficulty Scaling:** The game dynamically adjusts enemy health and accuracy based on the player's current resource pool. If the player is starving, enemies are slightly more sluggish to prevent unwinnable death spirals, but the AI becomes more flanking-oriented to punish mistakes.

## 8.3 The Zombie System (The Infected)
The "Chimera Pathogen" evolves, meaning the infected the player faces in Season 1 are vastly different from Season 4.

### Zombie Types (Evolutionary Stages)
1.  **The Runners (Stage 1 - Days 1 to 30):** Freshly infected. Fast, erratic, fragile. They sprint in straight lines and try to tackle the player.
2.  **The Calcified (Stage 2 - Months 2 to 12):** The standard enemy. Slower, but their skin has hardened into a bone-like armor. They require blunt force or armor-piercing rounds.
3.  **The Spore-Carriers (Stage 3 - Year 1+):** Fungal growths have erupted from their bodies. Upon death, they explode in a toxic cloud, rendering that area of the battlefield uninhabitable for 3 turns.
4.  **The Screechers (Rare Variant):** Blind, but highly sensitive to sound. If they detect the player, they emit a massive shriek that instantly maxes out the Threat Meter.
5.  **The Behemoths (Boss Infected):** Host bodies that have fused together in damp environments. Massive, slow, and capable of instantly killing a companion if they get in melee range. Requires environmental hazards to defeat.

### AI Behavior Trees
*   *Swarm Logic:* Infected do not use cover. They calculate the shortest path to the loudest noise. If a path is blocked, they will attack the barricade.
*   *Grapple Mechanic:* If an infected reaches a companion, they initiate a "Grapple." The companion cannot move or shoot until another character frees them by killing the infected or using a "Shove" command.
*   *Dormancy:* Some infected enter a "dormant" state against walls or on the floor. They appear as environmental props until the player gets too close, creating jumpscares and punishing careless exploration.