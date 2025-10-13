# Safe Wallet Transfer Model - Design Guidelines

## Design Approach
**System-Based Approach**: Chakra UI Design System
This is a blockchain dashboard/utility application prioritizing clarity, professionalism, and functional design. The interface should feel technical yet accessible, using Chakra UI components with modern crypto-themed aesthetics.

## Core Design Elements

### A. Color Palette

**Primary Colors (Dark Mode - Default)**
- Background: 220 26% 14% (Deep blue-gray base)
- Card Background: 220 26% 18% (Slightly elevated blue-gray)
- Primary Accent (Turquoise): 180 80% 50% (Bright turquoise for headers and key elements)
- Secondary Accent (Neon Blue): 210 100% 60% (Vibrant blue for CTAs)

**Light Mode**
- Background: 210 40% 98% (Soft white-blue)
- Card Background: 0 0% 100% (Pure white)
- Primary Accent: 180 70% 45% (Deeper turquoise for contrast)
- Secondary Accent: 210 90% 55% (Rich blue)

**Status Colors**
- Success: 142 76% 36% (Green for successful transfers)
- Alert/Info: 48 96% 53% (Amber for notifications)

### B. Typography

**Font System**: System font stack via Chakra UI defaults
- Heading (Title): 2.5rem (40px), Bold 700, Gradient effect on "Safe Wallet Transfer"
- Subtitle: 1.125rem (18px), Regular 400, Muted color
- Card Headers: 1.25rem (20px), Semibold 600
- Body Text: 1rem (16px), Regular 400
- Button Text: 1rem (16px), Semibold 600
- Footer: 0.875rem (14px), Regular 400

### C. Layout System

**Spacing Units**: Chakra UI spacing scale (4, 6, 8, 12, 16, 24)
- Section padding: p-8 to p-12
- Card padding: p-6
- Element gaps: gap-6 for cards, gap-4 for buttons

**Responsive Grid**
- Desktop: Two-column card layout (Owner A | Owner B)
- Tablet/Mobile: Single column stack
- Max container width: 1200px, centered

### D. Component Library

**Header Component**
- Centered alignment with py-12 spacing
- Gradient text using Chakra's bgGradient (turquoise to neon blue)
- Subtitle with reduced opacity (0.8)
- Optional subtle border-bottom separator

**Owner Cards (2x)**
- Side-by-side layout with equal width
- Semi-transparent background with glassmorphism effect
- Truncated wallet address display (0x1234...5678)
- FiUser or FiKey icon from react-icons at top
- Subtle border with glow effect (boxShadow: 0 0 20px turquoise/25%)
- Rounded corners (borderRadius: lg)

**Status Box (Central)**
- Prominent placement between owner cards or above buttons
- Current owner display with dynamic update
- Fade/scale animation on ownership change (Framer Motion)
- Background with stronger glow during state change

**Action Buttons (2x)**
- Primary: "Kết nối ví MetaMask" - Turquoise with wallet icon
- Secondary: "Bàn giao quyền kiểm soát" - Neon blue
- Both with neon glow on hover (boxShadow increase)
- Full width on mobile, fixed width on desktop (min 200px)
- Height: 48px, rounded-lg

**Transaction Log/Alert Box**
- Below buttons, full width
- Success messages with checkmark icon (✅)
- Glassmorphism background
- Smooth fade-in animation when displaying results

**Explanation Card**
- Glassmorphism style (backdrop-filter: blur(10px), background with 10% opacity)
- Three key bullet points as provided
- Subtle border with low opacity
- Positioned below main dashboard or in sidebar

**Footer**
- Centered text, muted color
- py-8 spacing from content
- Simple one-line attribution

### E. Visual Effects & Interactions

**Glassmorphism Implementation**
- Background: rgba with 8-12% opacity
- Backdrop blur: 10-16px
- Border: 1px solid with 15% opacity

**Neon Glow Effects**
- Cards: boxShadow: 0 0 20px rgba(turquoise, 0.25)
- Buttons hover: boxShadow: 0 0 30px rgba(color, 0.4)
- Active states: Increased glow intensity

**Animations (Framer Motion)**
- Ownership transfer: Fade out → Scale 0.95 → Fade in with new owner
- Duration: 400-600ms, ease-in-out
- Success message: Slide up + fade in

**Color Mode Transitions**
- Smooth transitions between light/dark (300ms)
- Use Chakra's useColorModeValue throughout
- Consistent glow effects across modes (adjust opacity)

## Layout Structure

1. **Header Section** - Centered, py-12
2. **Dashboard Container** - Max-width 1200px, centered, px-6
3. **Owner Cards Row** - Flex/Grid, gap-6
4. **Status Box** - Central placement, mb-8
5. **Button Group** - Flex row (desktop), column (mobile), gap-4
6. **Transaction Log** - Full width, mt-6
7. **Explanation Card** - mt-12, glassmorphism
8. **Footer** - mt-16, centered

## Images

No hero images required. This is a functional dashboard interface where visual hierarchy is established through card layouts, gradients, and glow effects rather than imagery. Icon usage from react-icons (FiUser, FiKey, wallet icons) provides sufficient visual interest.