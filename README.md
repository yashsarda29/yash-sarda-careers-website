# Yash Sarda: Career Guidance

Static website for 1:1 career guidance sessions: a home page plus a blog. No build step. Open `index.html` in a browser, or host it free on GitHub Pages.

## Editing the home page (`index.html`)
- **WhatsApp, LinkedIn, Calendly:** `WHATSAPP_NUMBER`, `LINKEDIN_URL` and `CALENDLY_URL` near the top of `<body>`. The calendar appears as soon as `CALENDLY_URL` is filled in; until then a "message on WhatsApp" card shows instead.
- **Sessions:** the `STAGES` list near the bottom of the file
- **"Where are you stuck?" answers:** the `PAINS` list
- **Testimonials:** the `TESTIMONIALS` list. The current ones are SAMPLES: replace them with real student quotes (with permission) and set `sample: false` to remove the "Sample" tag.
- **Blog cards on the home page:** the `POSTS` list
- **Photo:** add `yash.jpg` to this folder and replace the `YS` placeholder in the About card with `<img src="yash.jpg" alt="Yash Sarda">`

## Blog (`blog/`)
- `blog/index.html` lists all posts; each post is its own `.html` file sharing `blog.css` and `blog.js`.
- To add a post: copy an existing post file, change the text, then add it to `blog/index.html` and (optionally) the `POSTS` list in `index.html`.
- Keep `WHATSAPP_NUMBER` in `blog/blog.js` in sync with the home page.
