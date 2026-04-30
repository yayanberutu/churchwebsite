# Design System Strategy: The Reverent Echo

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Reverent Echo."** 

In a digital space for HKBP Kernolong, we must bridge the weight of tradition with the clarity of modern fellowship. This system moves away from the "app-as-a-utility" look and toward an "app-as-a-sanctuary" feel. We achieve this through a high-end editorial approach: using intentional asymmetry, generous white space (breathing room), and a hierarchy that favors storytelling over data-entry. The design breaks the standard grid by overlapping typography onto high-quality imagery, creating a sense of depth and connection that feels both premium and spiritual.

## 2. Colors & Tonal Soul
Our palette is anchored in deep, authoritative blues and warm, community-focused maroons. This isn't just about color; it’s about the emotional resonance of the HKBP identity.

*   **Primary (#00236f):** Represents the steadfastness of faith. Used for structural anchors and primary actions.
*   **Secondary (#af2b3e):** Represents the blood of the covenant and the warmth of the congregation. Used for accents and spiritual highlights.
*   **The "No-Line" Rule:** To maintain a high-end feel, **1px solid borders are prohibited** for sectioning content. Divisions must be created through background color shifts. Use `surface-container-low` (#f3f4f5) to set apart a section from the main `background` (#f8f9fa).
*   **Surface Hierarchy & Nesting:** Treat the UI as layers of fine paper.
    *   Level 0: `surface` (Base)
    *   Level 1: `surface-container-low` (Subtle sections)
    *   Level 2: `surface-container-lowest` (The "Card" layer, pure white #ffffff, for maximum focus).
*   **The "Glass & Gradient" Rule:** For floating headers or navigation bars, use Glassmorphism. Apply `surface` with 80% opacity and a 20px backdrop blur. For main CTAs, use a subtle linear gradient from `primary` (#00236f) to `primary_container` (#1e3a8a) at a 135-degree angle to add "soul" and dimension.

## 3. Typography: Editorial Authority
The typography system uses a pairing of **Public Sans** for structure and **Be Vietnam Pro** for accessibility.

*   **Display & Headlines (Public Sans):** These are our "Voice of the Church." Use `display-lg` (3.5rem) for hero scripture verses or welcoming statements. The high-contrast scale between a `display-lg` headline and `body-md` text creates an editorial, magazine-like sophistication.
*   **Titles & Body (Be Vietnam Pro):** This font provides modern readability. `title-lg` (1.375rem) should be used for section headers, while `body-md` (0.875rem) handles the majority of the congregation's reading experience.
*   **Hierarchy Note:** Always lead with high-contrast typography. A large headline should sit near ample white space to signify "Peace" and "Focus."

## 4. Elevation & Depth
We eschew traditional "box-shadow" presets in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking." A card (`surface-container-lowest`) placed on a section (`surface-container-low`) provides a natural, soft lift without a single pixel of shadow.
*   **Ambient Shadows:** If a floating element (like a FAB or Menu) requires a shadow, it must be an "Ambient Shadow." Use a blur of 30px-40px with a 6% opacity of the `on-surface` color. It should look like a soft glow, not a dark stain.
*   **The "Ghost Border":** If a boundary is strictly required for accessibility (e.g., in high-contrast modes), use the `outline_variant` (#c5c5d3) at 15% opacity. 
*   **Glassmorphism:** Use semi-transparent surface tokens for overlays to let the vibrant imagery of the HKBP congregation bleed through, making the digital experience feel integrated with the physical church.

## 5. Components

### Buttons
*   **Primary:** Rounded-md (`0.75rem`), using the Primary-to-Container gradient. No border.
*   **Secondary:** `surface-container-highest` background with `on-primary-fixed-variant` text.
*   **Tertiary:** Text-only using `primary` color, with an icon for "spiritual direction" (e.g., an arrow).

### Cards & Lists
*   **The Rule of Zero Dividers:** Traditional horizontal lines are forbidden. Separate list items using vertical spacing (`1.5rem` to `2rem`) or by placing items inside `surface-container-lowest` tiles with soft `md` corners.
*   **Sermon/Event Cards:** Use a 16:9 aspect ratio for imagery. Overlay the `title-lg` text on a gradient scrim (bottom-to-top: 60% black to transparent) to ensure the photography remains the hero.

### Inputs & Selection
*   **Fields:** Use `surface-container-highest` for the input fill. The "Ghost Border" (15% `outline_variant`) should only appear on focus, alongside a 2px `primary` bottom indicator.
*   **Chips:** Use `full` roundedness. For unselected states, use `surface-container-low`. For selected, use `secondary` to provide a warm, welcoming "active" state.

### Specialized Church Components
*   **Scripture Block:** A `surface-container-low` container with an asymmetrical layout—large `display-sm` opening quote and `body-lg` italicized text.
*   **Giving/Donation Tracker:** A soft, glassmorphic progress bar using the `surface_tint` to represent "Filling the Cup."

## 6. Do's and Don'ts

### Do:
*   **Use Asymmetry:** Place a heading on the left and a supporting image slightly offset to the right. It feels more human and less "templated."
*   **Embrace White Space:** If a screen feels crowded, increase the spacing between sections. Silence in design is as important as silence in prayer.
*   **Prioritize Real Faces:** Use high-quality photography of the HKBP Kernolong congregation. Authentic connection builds trust.

### Don't:
*   **Don't use "Pure Black":** Use `on-surface` (#191c1d) for text. It’s softer on the eyes and feels more premium.
*   **Don't use Default Shadows:** Never use the standard (0, 4, 10, 0) drop shadow. It breaks the "Reverent Echo" aesthetic.
*   **Don't use Lines:** Avoid 1px dividers between list items; let the space do the work.