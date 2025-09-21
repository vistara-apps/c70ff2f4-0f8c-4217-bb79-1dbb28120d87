# RhythmFlow AI - Base Mini App

Choreo your vibe with AI-powered dance sequences. A comprehensive dance choreography assistant built as a Base Mini App.

## Features

- **AI Choreography Generator**: Create unique dance routines based on genre, mood, and style
- **Routine Sequencer**: Arrange and customize dance sequences with drag-and-drop interface
- **Interactive Practice Mirror**: Practice with visual feedback and timing guidance
- **Move Library & Tutorials**: Learn individual moves with step-by-step guides
- **Base Wallet Integration**: Seamless onchain interactions and micro-transactions

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom cosmic theme
- **Blockchain**: Base network integration via MiniKit
- **AI**: OpenRouter API with Gemini 2.0 Flash
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd rhythmflow-ai
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_MINIKIT_API_KEY`: Your MiniKit API key
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key  
   - `OPENROUTER_API_KEY`: Your OpenRouter API key for AI generation

3. **Development**
   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build
   npm start
   ```

## Project Structure

```
app/
├── layout.tsx          # Root layout with providers
├── page.tsx           # Main dashboard page
├── providers.tsx      # MiniKit provider configuration
├── globals.css        # Global styles and cosmic theme
└── api/
    └── generate-choreography/
        └── route.ts   # AI choreography generation endpoint

components/
├── AppShell.tsx       # Main app layout with navigation
├── DashboardView.tsx  # Home dashboard with featured content
├── ChoreoGeneratorForm.tsx  # AI generation form
├── DanceCard.tsx      # Dance routine display cards
├── MoveListItem.tsx   # Individual move components
├── PracticeMirrorPlayer.tsx # Practice interface
├── Navigation.tsx     # Bottom navigation
└── CreditCounter.tsx  # Credit balance display

lib/
├── types.ts          # TypeScript type definitions
├── utils.ts          # Utility functions and constants
└── constants.ts      # App configuration constants
```

## Key Components

### AI Choreography Generator
- Generates unique dance sequences based on user preferences
- Supports multiple genres, moods, and difficulty levels
- Uses OpenRouter API with Gemini 2.0 Flash model

### Practice Mirror
- Interactive practice interface with video overlay
- Adjustable playback speed and mirror mode
- Progress tracking and session management

### Base Mini App Integration
- MiniKit provider for Base wallet connectivity
- OnchainKit components for identity and transactions
- Credit-based micro-transaction system

## Design System

The app uses a cosmic-themed design with:
- **Colors**: Purple, pink, blue gradients with neon accents
- **Typography**: Clean, modern fonts with neon text effects
- **Components**: Glass-morphism cards with cosmic shadows
- **Animations**: Smooth transitions and glow effects

## API Endpoints

- `POST /api/generate-choreography`: Generate AI choreography
- Additional endpoints for routines, moves, and user management (to be implemented)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
