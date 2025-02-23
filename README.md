# Talk2Win 🎮

A retro-style game where you win by talking! Use your speech and persuasion skills to influence different scenarios.

## Features 🚀

- Real-time speech recognition
- Multiple engaging scenarios:

  - **Warriors to Battle**: Motivate your warriors to fight (maximize fighting spirit)
  - **Announce Layoffs**: Handle difficult company announcements (minimize resignations)
  - **Political Rally**: Inspire supporters at a political rally (maximize support)
  - **Create Your Own**: (Coming Soon) Design your own persuasion scenario

- Retro game aesthetics with modern web technologies
- Real-time feedback on your persuasion effectiveness

## Tech Stack 💻

- React
- TypeScript
- Speech Recognition API
- ElevenLabs for voice generation
- Gemini 2.0 Flash

## Getting Started 🏁

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd talk2win-hackathon
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables

   Obtain api keys from:

   - [AI Studio API Key](https://aistudio.google.com/app/apikey)
   - [Eleven Labs API Key](https://elevenlabs.io/app/settings/api-keys)

   Export them:

   ```
   export API_KEY="... your AI Studio API Key ..."
   export ELEVENLABS_API_KEY="... your Eleven Labs API Key ..."
   ```

4. Start the development server:

   ```bash
   npm run start
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Game Flow 🎯

1. Start at the intro screen
2. Select your scenario
3. Read the scenario briefing
4. Use your microphone to deliver your speech
5. Watch the real-time impact of your words
6. Try to achieve the highest possible score!

## Development 🛠️

- `npm run start` - Start development server
