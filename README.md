💪 My Fitness AI

Your Personalized AI-Powered Fitness Coach
Transform the way you train, eat, and stay motivated — powered by intelligent insights and real-time AI support.

🌐 Live Demo  https://my-fitness-ai-one.vercel.app/

 My Fitness AI

** Overview **

My Fitness AI is an intelligent, next-generation fitness assistant built to provide a personalized workout and diet experience.
It combines the power of Next.js, TypeScript, Gemini API, and ElevenLabs Text-to-Speech API to guide users through customized fitness plans, motivational insights, and AI-generated visualizations.

Whether you’re a beginner or an experienced athlete, My Fitness AI helps you:

Generate personalized workout and diet plans

Access AI-powered fitness tips and daily motivation

Understand each body part’s workout plan

View AI-generated images for better posture and exercise understanding

Receive read-aloud voice feedback for a more interactive experience

** Key Features **
🏋️ Personalized Workout Plan Generator

Generates AI-based workout plans according to your goals, experience level, and body type.

Divided by body parts: Chest, Legs, Arms, Shoulders, Back, and Core.

Plans are adjustable and unique for every user session.

🥗 Diet Plan Creator

AI analyzes your body type, activity level, and goals (e.g., weight loss, muscle gain, maintenance) to create a personalized meal plan.

Suggests nutritional balance between proteins, carbs, and fats.

Includes AI-generated visual meal representations for clarity.

💬 AI-Powered Motivation & Tips

Delivers daily motivational quotes and fitness tips generated using the Gemini API.

Keeps users consistent and motivated in their fitness journey.

🧩 Workout Plan by Body Part

Explore AI-curated exercise libraries categorized by body parts.

Learn how to train efficiently and safely with visual assistance.

🧠 AI-Generated Images for Understanding

Uses Gemini’s image generation capabilities to visually represent exercises and diets.

Helps beginners learn proper form and technique intuitively.

🔊 Read-Aloud Feedback (ElevenLabs API)

Converts AI-generated text (plans, advice, or motivation) into natural voice output.

Enhances user engagement with an interactive, voice-guided fitness coach experience.

📈 Personalized Report

Get a summary of your fitness plan and AI recommendations.

Track your progress and make adjustments based on feedback.

** Tech Stack **

Category	Technology
Frontend Framework	Next.js 16 (Turbopack)
Language	TypeScript
AI APIs	Google Gemini API (for text & image generation)
Voice Integration	ElevenLabs Text-to-Speech API
Styling	CSS Modules / Tailwind (if applicable)
Deployment	Vercel
Environment Variables	Managed through .env.local

** Project Structure **

FitnessApp/
│
├── app/                    # Next.js app directory (routes & pages)
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Helper functions and API integration
├── public/                 # Static assets
├── styles/                 # Global and modular CSS
├── .env.local              # API keys and environment variables
├── next.config.mjs         # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json           # TypeScript configuration

** API Integrations

🔹 Gemini API

Used for:

Generating text-based content like diet plans, workouts, and motivational quotes.

Creating AI-generated images for exercises or food visuals.

🔹 ElevenLabs API

Used for:

Text-to-speech conversion, allowing users to listen to workout instructions or motivational content.

Enhancing accessibility for users who prefer voice guidance.

🧑‍💻 Setup Instructions

Clone the repository

git clone  https://github.com/princepratapsingh26/myAiFitnessCoach/tree/main
cd myFitnessAi


Install dependencies

npm install


Add environment variables
Create a .env.local file in the root directory and add your API keys:

GEMINI_API_KEY=your_gemini_api_key
ELEVEN_API_KEY=your_elevenlabs_api_key


Run the development server

npm run dev


Build for production

npm run build
npm start


Deploy on Vercel
Just connect your GitHub repo to Vercel
 and hit Deploy — Vercel will handle the rest.

** Future Enhancements

🔸 AI-based progress tracking and analytics dashboard

🔸 Voice-controlled interactions for a hands-free experience

🔸 Integration with wearable devices (Fitbit, Apple Health)

🔸 Community leaderboard for motivation and accountability

** Feedback

Have suggestions or found a bug?
Create an issue or open a pull request — contributions are welcome!

Developed with 💪 passion and intelligence — because your fitness deserves personalization.
