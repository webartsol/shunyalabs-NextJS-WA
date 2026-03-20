This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started


### Configuration

Set up your environment variables:

1. Create a `.env.local` file in the root directory
2. Add your ShunyaLabs API key:

```env
# ShunyaLabs API Configuration
NEXT_PUBLIC_SHUNYALABS_API_KEY=your_api_key_here
```

**Note**: Contact the ShunyaLabs team to obtain your API key.

### Running the Application

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Real-time Transcription

The real-time transcription feature is available at [http://localhost:3000/realtime](http://localhost:3000/realtime).

Features:
- Real-time speech-to-text transcription using ShunyaLabs API
- Support for 35+ languages
- Live metrics (WPM, latency, word count)
- Audio level monitoring
- Transcript export functionality

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
