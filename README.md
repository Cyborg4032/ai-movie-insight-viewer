# 🎬 AI Movie Insight Viewer

> Enter an IMDb ID. Get the full picture — powered by AI.

A sleek web app that fetches movie details from the **OMDb API** and uses **Google Gemini AI** (via Firebase Genkit) to generate smart sentiment summaries from reviews. Built with Next.js 15 and deployed live on Vercel.

🔗 **[Live Demo → ai-movie-insight-viewer.vercel.app](https://ai-movie-insight-viewer.vercel.app/)**

---

## ✨ Features

- 🔍 **Movie Lookup** — Search any movie by IMDb ID and instantly pull its title, poster, ratings, and plot
- 🤖 **AI Sentiment Summary** — Gemini AI analyzes reviews and generates a natural-language insight about audience reception
- 🎨 **Clean, Responsive UI** — Built with Tailwind CSS and Radix UI components for a polished experience across all devices
- ⚡ **Fast** — Powered by Next.js 15 with Turbopack for rapid development and optimized production builds

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + Radix UI |
| AI | Google Gemini via Firebase Genkit |
| Movie Data | OMDb API |
| Backend | Next.js API Routes |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- An [OMDb API key](https://www.omdbapi.com/apikey.aspx) (free)
- A [Google AI / Gemini API key](https://aistudio.google.com/)

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/Cyborg4032/ai-movie-insight-viewer.git
cd ai-movie-insight-viewer

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your API keys (see below)

# 4. Start the dev server
npm run dev
```

The app runs on **http://localhost:9002**

### Environment Variables

Create a `.env.local` file in the root with:

```env
OMDB_API_KEY=your_omdb_api_key
GOOGLE_GENAI_API_KEY=your_gemini_api_key
```

---

## 📜 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on port 9002 (Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run TypeScript type checks |
| `npm run genkit:dev` | Start Genkit AI dev server |

---

## 📁 Project Structure

```
src/
├── app/              # Next.js App Router pages & layouts
├── ai/               # Genkit AI flows and configuration
│   └── dev.ts        # AI development entry point
├── components/       # Reusable UI components (Radix + custom)
└── lib/              # Utilities, API helpers
```

---

## 💡 How It Works

1. User enters an **IMDb ID** (e.g. `tt0111161` for The Shawshank Redemption)
2. The app calls the **OMDb API** to fetch movie metadata (title, poster, rating, plot)
3. A **Genkit AI flow** sends review/plot context to **Google Gemini**, which returns a sentiment insight
4. Everything is displayed in a clean card-based UI

> **Note:** Reviews are currently simulated for sentiment analysis since OMDb doesn't provide full review text.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

MIT — feel free to use, modify, and build on this project.
