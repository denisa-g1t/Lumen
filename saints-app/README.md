# Lumen — Walk with Christ

A small, focused web app for young Catholics: a daily Gospel reminder, a
"Holy Hour" timer (a votive candle that burns down as you spend time in
prayer or Scripture), a simple daily task manager, a gallery of saints
(Augustine, Padre Pio, Carlo Acutis, John Bosco, Thérèse of Lisieux,
Alphonsus Liguori, Philip Neri, the Twelve Apostles, and Jesus Christ
Himself), the complete Bible (King James Version, Genesis to Revelation),
and an About page. Fully bilingual — Shqip (default) and English, with a
toggle in the header.

Built with React + Vite. No backend, no accounts — tasks and your holy
hour progress are saved in your own browser's local storage. The Bible
text is served as static JSON files and fetched on demand, so the app
stays fast even with the whole Bible included.

A note on the Bible text: the King James Version is public domain, so
it's included in full and unrestricted. A modern, properly licensed
Albanian Bible translation was not available to include (the "Albanian
Bible" text that circulates online as supposedly public domain is
actually copyrighted by the Albanian Bible Society) — see the About page
in the app for the full explanation.

## Run it locally

You'll need **Node.js 20.19+ or 22.12+** (this version of Vite doesn't run
on Node 18). If `node -v` shows something older, the easiest fix is
[nvm](https://github.com/nvm-sh/nvm):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# then open a brand new terminal window, then:
nvm install 22
nvm use 22
```

Then, from inside this project folder:

```bash
npm install
npm run dev
```

Then open the URL it prints (usually `http://localhost:5173`).

The app opens in **Albanian (Shqip)** by default, with an **EN** toggle
in the top-right corner of the header — your choice is remembered
between visits.

## Project structure

```
src/
  data/saints.json        the saints' bios, quotes, feast days
  data/verses.json         daily Gospel verses (rotates automatically)
  data/bible-books.json    Bible book names (English + Albanian) and file map
  components/
    DailyVerse.jsx         today's word from the Gospels
    HolyHour.jsx           the candle timer
    TaskManager.jsx        the daily to-do list
    Saints.jsx             the saints gallery + detail popup
    BibleReader.jsx        the full Bible reader (KJV)
    About.jsx              the About / confession page
  App.jsx                  ties the tabs/pages together
  i18n.js                  all UI text, English + Albanian
  index.css                all styling, using CSS variables at the top
public/
  bible/kjv/               the 66 Bible books as static JSON (King James Version)
```

To add or edit a saint, just edit `src/data/saints.json` — no code changes
needed. Same for the daily verses in `src/data/verses.json`, and all UI
text lives in `src/i18n.js`.

## Deploy it for free (GitHub + Vercel)

1. **Create a GitHub repo and push this project.**

   ```bash
   cd saints-app
   git init
   git add .
   git commit -m "Lumen: daily companion for prayer, tasks, and the saints"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/lumen.git
   git push -u origin main
   ```

   (Create the empty repo first at github.com/new, then copy its URL into
   the `git remote add` line above.)

2. **Deploy on Vercel.**

   - Go to [vercel.com](https://vercel.com) and sign in with GitHub.
   - Click **Add New → Project**, pick your `lumen` repo.
   - Vercel auto-detects Vite. Leave the defaults:
     - Build command: `npm run build`
     - Output directory: `dist`
   - Click **Deploy**. In under a minute you'll get a live URL like
     `lumen-yourname.vercel.app`.

   From then on, every `git push` to `main` auto-deploys the update.

   Alternatively, from the terminal:

   ```bash
   npm install -g vercel
   vercel login
   vercel        # first deploy, follow the prompts
   vercel --prod # subsequent production deploys
   ```

## Ideas for what to add next

- A push notification / reminder at a set time to start the Holy Hour
- A "streak" counter for consecutive days the daily goal was met
- A short daily reflection or examen question alongside the verse
- More saints, or a "saint of the day" that rotates like the verse does
