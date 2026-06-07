# 11. Endgame Design

*Dead Roads* culminates in a massive, branching finale at the end of Season 4. There is no canon ending; the Consequence Engine calculates the state of the world based on 40 hours of gameplay. 

## 11.1 The 20 Unique Endings Architecture
The endings are not just a color swap; they represent fundamentally different fates for humanity. 

**Category 1: The "Cure" Endings (Requires Apex BioSolutions Alliance & High Medicine)**
1.  **The Perfect Sacrifice:** The PC sacrifices themselves to synthesize a stable cure. The Community thrives in peace. The highest possible "Hero" ending.
2.  **The Flawed Vaccine:** The PC sacrifices an immune child to create a cure. It works, but the PC is forever broken, abandoning the community to wander alone.
3.  **The Weaponized Cure:** The PC uses the cure to blackmail all other factions into submission, becoming the totalitarian ruler of the new world.

**Category 2: The "Community" Endings (Requires High Infrastructure & Free States Alliance)**
4.  **The New Republic (Perfect Community):** The PC successfully unites the Free States and the Iron Syndicate. The infected are pushed back. A true democratic rebuilding begins.
5.  **The Fortress State:** The PC builds an impenetrable fortress but refuses to help outsiders. The community survives, but the rest of the world burns.
6.  **The Tragic Fall:** The community is fully built but betrayed from within by a low-loyalty companion, resulting in a massive massacre right before winter.

**Category 3: The "Tyrant" Endings (Requires Iron Syndicate / Rust Wolves Alliance)**
7.  **The Warlord:** The PC abandons all morality, uniting the raiders to conquer the remaining safe zones. Humanity regresses to barbarism under the PC's rule.
8.  **The Syndicate CEO:** The PC becomes the new "Broker," controlling all food and water. They live in luxury while thousands starve outside their walls.

**Category 4: The "Failure" Endings (Triggered by terrible resource management/combat deaths)**
9.  **The Lone Survivor:** Every single companion dies. The PC survives the final siege alone, wandering off into the snow, deeply traumatized.
10. **The Starving Winter:** The community simply runs out of food during the final siege. They freeze and starve, fading into history.
11. **Overrun:** The base defenses fail. The player fights a final, unwinnable turn-based battle until the PC is killed.

**Category 5: The "Ideological" Endings**
12. **The Sower Ascendant:** The PC joins Mother Superior Grace, willingly infecting the community to "evolve."
13. **The Federal Order:** The PC surrenders command to the Remnant, becoming a general in a new fascist empire.
14. **The Whisperer's Path:** The community abandons their base and adopts the silent, nomadic life of the Whisperers.

*(Additional hidden endings include the "Secret UFO/Flare" ending if specific obscure artifacts are found, the "Mutiny Execution" ending if the PC's stress caps at the finale, and various combinations of companion-specific survival states).*

---

# 12. Art Direction

The goal is to achieve "AAA Console Fidelity on Mobile." This requires meticulous optimization and a highly stylized, readable aesthetic.

## 12.1 Visual Style
*   **Style:** "Grounded Graphic Novel." Realistic proportions and physically-based rendering (PBR) materials, but with high-contrast, slightly painterly textures (akin to *Arcane* or Telltale's later engine, but more realistic). This ensures readability on small screens while masking lower poly counts.

## 12.2 Character & Environment Design
*   **Characters:** Faces are highly expressive. Clothing tells a story (duct-taped armor, faded logos). As seasons progress, characters visually degrade.
*   **Environments:** The "Beautiful Decay." Nature is aggressively taking over. Overgrown highways, flooded malls, rust, and moss. The environments must look distinct from a top-down isometric perspective.

## 12.3 Lighting, Weather, and Color Scripting
*   **Color Scripting:** 
    *   *Season 1 (Panic):* High contrast, stark reds and emergency yellows.
    *   *Season 2 (The Road):* Blinding, washed-out whites and oppressive heat hazes.
    *   *Season 3 (Settlement):* Earthy greens, warm campfire oranges (safety).
    *   *Season 4 (The End):* Desaturated blues and stark, freezing greys.
*   **Weather:** Dynamic weather directly affects gameplay and mood. Rain creates mud (slows movement) and dampens sound. Fog reduces vision range in combat.

---

# 13. Audio Direction

Audio is 50% of the emotional experience. It must be designed for both high-end headphones and standard phone speakers.

## 13.1 Music and Emotional Audio Design
*   **Score:** Acoustic, mournful, and sparse. Plucked cellos, distorted violins, and rhythmic, heartbeat-like percussion during combat. It avoids bombastic orchestral swells in favor of intimate, psychological tension (Inspired by Gustavo Santaolalla).
*   **Dynamic Stems:** The music seamlessly transitions. In stealth, only a low bass drone plays. Upon being spotted, the percussion kicks in immediately.

## 13.2 Sound Effects (Foley)
*   **Weaponry:** Gunshots must sound deafening and terrifying, contrasting with the quiet exploration. The click of an empty magazine should induce panic.
*   **The Infected:** The "Chimera Pathogen" causes the infected to make clicking, chattering noises (calcified vocal cords) mixed with ragged human gasps, making them sound deeply unnatural.

## 13.3 Voice Acting
*   100% voice-acted main story. 
*   **Direction:** The acting must be naturalistic and understated. No "video game" over-acting. Characters should stutter, whisper, and sound genuinely exhausted. During combat, voice barks change based on the character's Morale and Health (a confident shout vs. a panicked scream).