# 14. User Interface (UI/UX)

The UI must be completely unobtrusive during narrative moments and highly legible during tactical combat, designed specifically for touch inputs (thumbs).

## 14.1 HUD and Screen Flow
*   **Exploration HUD:** Almost entirely clean. A minimal, contextual interaction prompt appears only when near an object. Swipe to move camera, tap to move character.
*   **Combat HUD:** Bottom third of the screen becomes the tactical bar. Large, easily tappable icons for abilities (Shoot, Reload, Overwatch). The "Threat Meter" is prominently displayed at the top center.
*   **Dialogue Screens:** Cinematic black bars appear. Dialogue choices are arrayed in a radial menu around the point of touch, allowing for one-handed play.
*   **Base Management Screens:** Flat, 2D architectural menus. Drag-and-drop mechanics to assign Companions to facilities.

## 14.2 Accessibility
*   Colorblind modes (Deuteranopia, Protanopia, Tritanopia) affecting UI highlights and enemy threat ranges.
*   Scalable text sizes for dialogue subtitles.
*   "Tap to Hold" toggles for any QTEs (Quick Time Events) to accommodate motor disabilities.

---

# 15. Technical Design

*Dead Roads* will be developed using **Unity 6**, leveraging its advanced Universal Render Pipeline (URP) optimized for mobile hardware.

## 15.1 Unity Architecture & Data Structure
*   **Entity Component System (ECS):** Used specifically for the Zombie Horde logic to allow dozens of infected on-screen simultaneously without dropping frame rates.
*   **Data Architecture:** All dialogue trees, item stats, and consequence flags are stored externally in JSON/CSV formats and parsed at runtime. This allows Game Designers to balance the game and write dialogue without requiring engineering support.

## 15.2 Save System & Cloud
*   **Cloud Save:** Mandatory. The game syncs the "Consequence Flag Array" to an AWS backend. This allows players to switch seamlessly between iPhone and iPad, and prevents save-scumming (the game auto-saves immediately after every major decision).

## 15.3 Folder Structure
*   `/Assets/Art/` (Split into /Characters, /Environments, /UI)
*   `/Assets/Audio/` (Foley, Music, Voice)
*   `/Assets/Scripts/` (CoreLogic, Combat, Narrative, UI)
*   `/Assets/Data/` (JSON databases for Dialogues and Economy)

## 15.4 Performance Budgets (Target: iPhone 12 / mid-range Android)
*   **Target Framerate:** 30 FPS locked (to save battery) with an optional 60 FPS performance mode for high-end devices.
*   **Polycount Budget:** Max 150k triangles on-screen during combat.
*   **Texture Streaming:** Aggressive mip-mapping and texture streaming to keep memory footprint under 1.5GB.

---

# 16. Content Roadmap & Live Operations

*Dead Roads* is a premium game, but it requires a "Live" approach to maintain community engagement between Seasons.

*   **Launch:** Season 1 (Episodes 1-5).
*   **Post-Launch (Months 1-3):** Weekly "Community Challenges" (e.g., "Collectively kill 1 million runners"). Rewards are cosmetic outfits. Free bug fixes and optimization patches.
*   **Expansion Strategy:** Season 2 releases 6 months after Season 1 as a paid expansion. Season 3 and Season 4 follow at 6-month intervals.
*   **Community Growth:** Implementing a web portal where players can view global statistics ("72% of players chose to save Elias") and vote on minor aesthetic additions to upcoming episodes.

---

# 17. Risk Analysis

*   **Monetization Risk:** The mobile market heavily resists premium pricing. *Mitigation:* Offer Episode 1 completely free as a demo. The "paywall" hits only when the player is fully emotionally invested at the Episode 1 cliffhanger.
*   **Narrative Risk:** Branching narratives grow exponentially complex and expensive to produce. *Mitigation:* Use "choke points." Divergent paths must occasionally collapse back into a shared main narrative spine to keep voice acting and animation costs manageable.
*   **Technical Risk:** High-fidelity graphics causing thermal throttling on phones. *Mitigation:* Heavy use of baked lighting in environments and strictly limiting the number of dynamic lights.
*   **Scope Risk:** 50 major survivors is a massive undertaking. *Mitigation:* Systemic generation for background survivors, focusing bespoke writing on a core group of 15 "Main" companions.

---

# 18. Final Vision

*Dead Roads* is not just another zombie game; it is an interactive crucible of human morality. It is designed to be the definitive mobile narrative RPG—a game that proves mobile devices can host stories as dark, complex, and emotionally devastating as any console blockbuster. 

By marrying the agonizing branching choices of Telltale's *The Walking Dead* with the punishing systemic survival of *State of Decay*, we are creating an experience where the player is not just watching a story unfold; they are carrying the crushing weight of its outcome on their shoulders. When the final credits roll at the end of Season 4, the player should feel exhausted, transformed, and deeply connected to the community they bled to build. *Dead Roads* will set a new high-water mark for prestige mobile gaming.