# NextMove Careers: career guidance with Yash Sarda

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
- Live site: https://yashsarda29.github.io/yash-sarda-careers-website/ (GitHub Pages, from the `main` branch). Every push to `main` updates it within a minute or two.
- `404.html` is the "page not found" page. Its buttons point to `/yash-sarda-careers-website/`; change them if you move to a custom domain.

## Free tests (`tests.html`)
Three self-check tests that run entirely in the visitor's browser (nothing is sent or stored):
- **Profile evaluation**: 10 questions, score out of 100 across Academics, Experience, Proof of skills, Visibility and Direction.
- **Stream selector**: pick Engineering, Commerce or Arts & Humanities, rate 10 statements, get a % match for 6 streams in that track.
- **Placement readiness**: 10 questions, score out of 100 across Online tests, Interviews, GDs and cases, Targeting and research.

To edit questions, points, streams or result wording, change the `PROFILE`, `STREAM` and `PLACEMENT` objects in the `<script>` of `tests.html`. Direct links: `tests.html#profile`, `tests.html#stream`, `tests.html#placement`.

## SEO and sharing
- Every page has a canonical link, link-preview tags (`og-image.png`, 1200×630) and structured data (business + FAQ on the home page, articles on blog posts). These sit between `<!-- seo -->` and `<!-- /seo -->` in each page's `<head>`.
- `sitemap.xml` lists every page; `robots.txt` points to it. Submit the sitemap in Google Search Console.
- All of these use the live address `https://yashsarda29.github.io/yash-sarda-careers-website/`. If the site moves to its own domain, find-and-replace that address across the site.
- The home page FAQ is mirrored in the structured data: if you change a FAQ answer, update the FAQPage block in the `<!-- seo -->` section too.

## Downloads
- `downloads/cv-checklist.pdf`: free one-page CV checklist, linked from the home page, the blog, the CV post and the footer.
