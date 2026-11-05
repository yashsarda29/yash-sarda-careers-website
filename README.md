# Yash Sarda: Career Guidance

Static website for 1:1 career guidance sessions: a home page plus a blog. No build step. Open `index.html` in a browser, or host it free on GitHub Pages.

## Editing the home page (`index.html`)
- **WhatsApp, LinkedIn, Calendly:** `WHATSAPP_NUMBER`, `LINKEDIN_URL`, `CALENDLY_URL` (free 15-min intro call, shown on the page) and `CALENDLY_SESSION_URL` (full 30-min session link) near the top of `<body>`. The calendar appears as soon as `CALENDLY_URL` is filled in; until then a "message on WhatsApp" card shows instead. LinkedIn buttons stay hidden until `LINKEDIN_URL` is a real profile link (`https://www.linkedin.com/in/...`).
- **Sessions:** the `STAGES` list near the bottom of the file
- **"Where are you stuck?" answers:** the `PAINS` list
- **Testimonials:** the `TESTIMONIALS` list (real quotes only, with permission). One quote shows as a full-width feature; two or more switch to the card grid automatically.
- **Blog cards on the home page:** the `POSTS` list
- **Photo:** `yash.png` (used in the hero, the About card and blog bylines). Replace the file with a larger square photo (600×600 or more) for a sharper result.

## Blog (`blog/`)
- `blog/index.html` lists all posts (newest first, with topic filters); each post is its own `.html` file sharing `blog.css` and `blog.js`. Reading times are based on ~200 words per minute.
- To add a post: copy an existing post file, change the text, then add it to `blog/index.html` and (optionally) the `POSTS` list in `index.html`.
- Keep `WHATSAPP_NUMBER` in `blog/blog.js` in sync with the home page.

## Hosting
- `404.html` is the "page not found" page. Its buttons link to `/`, which is correct on a custom domain or a `username.github.io` site; on a project site (`username.github.io/repo/`) change them to `/repo/`.

## Free tests (`tests.html`)
Three self-check tests that run entirely in the visitor's browser (nothing is sent or stored):
- **Profile evaluation**: 10 questions, score out of 100 across Academics, Experience, Proof of skills, Visibility and Direction.
- **Stream selector**: pick Engineering, Commerce or Arts & Humanities, rate 10 statements, get a % match for 6 streams in that track.
- **Placement readiness**: 10 questions, score out of 100 across Online tests, Interviews, GDs and cases, Targeting and research.

To edit questions, points, streams or result wording, change the `PROFILE`, `STREAM` and `PLACEMENT` objects in the `<script>` of `tests.html`. Direct links: `tests.html#profile`, `tests.html#stream`, `tests.html#placement`.
