# 7. Choice and Consequence System

The beating heart of *Dead Roads* is its Consequence Engine. Choices are not merely cosmetic flavor text; they are variables written to the save file that trigger cascading narrative and mechanical logic across the entire game.

## 7.1 Architecture of a Choice
Choices are categorized by their blast radius:

1.  **Micro-Choices (Conversational Tone):** Modifying trust or morale slightly. (e.g., Answering a question sarcastically vs. empathetically).
2.  **Tactical Choices (Episode Level):** Deciding how to approach an objective. (e.g., Sneaking through the vents vs. blasting through the front door). Changes the immediate combat scenario and loot availability.
3.  **Macro-Choices (Season/Game Level):** Binary or ternary decisions usually occurring at the climax of an episode. These fundamentally alter the state of the world.

## 7.2 The Ripple Effect (How Choices Propagate)

### Current Episode Consequence
*   **Example:** In Episode 2, the player finds a cache of military rations guarded by heavily armed, but currently peaceful, scavengers.
*   *Choice:* The player chooses to ambush them.
*   *Consequence:* Immediate intense combat. If successful, massive food boost. However, one scavenger escapes. The rest of the episode features higher enemy patrols as the local faction is now on high alert.

### Future Episode Consequence
*   *Following the previous example into Episode 4:* The player's group must pass through a toll-bridge controlled by a faction. The leader of the faction recognizes the player from the description given by the escaped scavenger.
*   *Consequence:* The peaceful negotiation option is locked out. The player is forced to either pay double the toll (crippling resources) or fight a drastically superior force.

### Future Season Consequence
*   *Following the example into Season 3:* The faction from the toll bridge has grown into a massive regional power.
*   *Consequence:* Because of the blood spilt in Season 1, this faction actively funds the player's rivals, sabotages player trade routes, and eventually launches a siege against the player's base. A single ambush two years prior results in a full-scale war.

## 7.3 Character Survival and The Butterfly Effect
A character's survival is rarely determined by a single quick-time event. It is usually the culmination of several previous choices.

*   **The Infection Scenario:** A companion, Elias, is bitten. 
*   *The Standard Choice:* Amputate the arm immediately or execute him.
*   *The Butterfly Effect:* If the player chose to raid a pharmacy in Episode 1 (a highly dangerous side-quest) *and* kept the antibiotics instead of trading them, *and* recruited Dr. Thorne in Episode 2... the player unlocks a third, hidden option: A highly risky surgical procedure that saves Elias's arm and his life, albeit with a permanent debuff to his aiming stat.

## 7.4 Faction Outcomes
Factions keep a "Reputation Score" with the player.
*   **Hostile (-100):** Kill on sight. Will attack base.
*   **Suspicious (-50 to -1):** Will trade, but at horrible margins. Will not offer quests.
*   **Neutral (0 to 49):** Standard interactions.
*   **Allied (50 to 99):** Provides military support during sieges. Discounts on trade.
*   **Integrated (100):** The faction merges with the player's community, unlocking their unique base structures.

Choices that benefit one faction almost always anger another. Giving fuel to the Free States inherently pisses off the Iron Syndicate.

## 7.5 Ending Outcomes Architecture
The game constantly tallies a set of hidden "World State" variables based on macro-choices:
*   *Humanity Score* (Ruthless vs. Compassionate)
*   *Infrastructure Score* (Ruined vs. Rebuilt)
*   *Pathogen Research* (Ignored vs. Studied)

These scores, combined with which Companions are alive and which Factions are allied, run through a massive logic gate at the end of Season 4 to select one of over 20 distinct endings (Detailed in Section 10).

## 7.6 Technical Implementation Logic (The Flag System)
Under the hood, the Consequence Engine uses a robust Boolean and Integer flag system stored in the cloud save profile.
*   `[Flag_Elias_Bitten = True]`
*   `[Int_IronSyndicate_Rep = -45]`
*   `[Flag_Pharmacy_Looted = True]`

During dialogue tree initialization or scene loading, the game checks these flags:
```json
IF [Flag_Elias_Bitten == True] AND [Flag_Pharmacy_Looted == True] AND [Flag_DrThorne_Alive == True]
    THEN Unlock Dialogue Node 4 (Attempt Surgery)
ELSE 
    THEN Lock Dialogue Node 4
    Display: "Requires Medical Supplies and a Surgeon."
```
This ensures the narrative remains logically consistent across years of development and millions of player paths.