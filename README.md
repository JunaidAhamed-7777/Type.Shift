# Type.Shift

```text
                            With Love  ⣠⣶⣶⣶⣦⠀⠀
                            ⠀⠀⣠⣤⣤⣄⣀⣾⣿⠟⠛⠻⢿⣷⠀
                            ⢰⣿⡿⠛⠙⠻⣿⣿⠁⠀⠀⠀⣶⢿⡇
                            ⢿⣿⣇⠀⠀⠀⠈⠏⠀⠀⠀ By Junaid
                            ⠀⠻⣿⣷⣦⣤⣀⠀⠀⠀⠀⣾⡿⠃⠀
                            ⠀⠀⠀⠀⠉⠉⠻⣿⣄⣴⣿⠟⠀⠀⠀
                            ⠀⠀⠀⠀⠀⠀⠀⣿⡿⠟⠁⠀⠀⠀⠀
```

---

## About

Type.Shift is a React-based typing speed test designed to help users improve typing speed, accuracy, and consistency.

The application provides multiple difficulty levels with typing passages drawn from books, scientific and technical subjects, and programming algorithms.

* Hosted on https://typeshift-alpha2.vercel.app
* No account is required to start a typing test.
* Results include Words Per Minute (WPM), accuracy, and time taken.
* Each test randomly selects a passage from the selected difficulty level.

### Preview

<img width="1863" height="876" alt="image" src="https://github.com/user-attachments/assets/6fcb2bec-f210-49bf-901a-06a984b99286" />
<img width="1866" height="862" alt="image" src="https://github.com/user-attachments/assets/5abf4b03-a874-4da0-822f-6478e1aa1e81" />

---

## Difficulty Levels

### Easy

* Beginner-friendly passages
* Simple vocabulary and sentence structure
* Generally 150–200 characters
* Primarily children's literature and other accessible texts

### Medium

* Moderate typing difficulty
* More varied vocabulary and sentence structure
* Generally 200–250 characters
* Primarily novels and literary passages

### Hard

* Advanced typing difficulty
* More complex vocabulary and sentence structure
* Generally 250–300 characters
* Scientific, technical, academic, and related subjects

### Code

* Short programming snippets
* Algorithms, data structures, and programming concepts
* Generally up to 100 characters
* No book-cover images are used for code passages

Source attribution and appropriate cover images are maintained for applicable non-code passages.

---

## Features

* Typing speed testing with WPM calculation
* Accuracy tracking
* Correct and total character counts
* Four difficulty levels
* Random passage selection
* Source attribution for passages
* Book-cover display for applicable passages
* Performance labels based on WPM
* Restart button and `TAB` restart shortcut
* Responsive layout for desktop and mobile
* Welcome information lightbox
* Privacy Policy and Terms of Use lightboxes
* Animated DarkVeil background
* Matrix-style result screen
* GitHub and LinkedIn links
* Vercel Web Analytics

---

## Tech Stack

* React.js
* JavaScript
* CSS
* OGL
* Vercel
* Vercel Web Analytics

Currently, the application does not use a backend or database.

---

## Project Structure

```text
Type.Shift/
├── docs/
│   └── superpowers/
├── public/
│   ├── assets/
│   │   ├── easy/
│   │   ├── medium/
│   │   ├── hard/
│   │   └── placeholder.png
│   ├── legal/
│   │   ├── privacy.txt
│   │   └── usage.txt
│   ├── 404.html
│   ├── Ads.txt
│   ├── faicon.ico
│   ├── index.html
│   ├── logo.png
│   ├── manifest.json
│   └── robots.txt
├── scripts/
│   ├── logs/
│   │   └── placeholders.txt
│   ├── addPlaceholder.js
│   └── fetchCovers.js
├── src/
│   ├── components/
│   │   ├── DarkVeil.css
│   │   └── DarkVeil.js
│   ├── data/
│   │   └── paragraphs.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── AGENTS.md
├── CONTRIBUTING.md
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── THIRD-PARTY-NOTICES.md
```

---

## Dataset

The typing-test dataset is stored separately from the main application logic in:

```text
src/data/paragraphs.js
```

It is divided into:

```text
easy
medium
hard
code
```

This keeps the dataset easier to maintain and allows new passages to be added without modifying the core typing-test logic.

Each applicable passage contains metadata such as:

```javascript
{
  text: "...",
  source: "...",
  image: "/assets/easy/example.png"
}
```

Code passages do not require book-cover metadata.

---

## Adding Passages

Contributors are encouraged to add new passages, particularly in bulk, while keeping the existing difficulty requirements and metadata structure.

For detailed contribution instructions, including book-cover handling and placeholder usage, see:

[CONTRIBUTING.md](CONTRIBUTING.md)

The general workflow for book-based passages is:

```text
Add passages
    ↓
Run fetchCovers.js
    ↓
Check for missing covers
    ↓
Add failed covers manually when possible
    ↓
Use addPlaceholder.js only when an actual cover cannot be added
    ↓
Update the placeholder log when required
```

---

## Book Cover Scripts

The project contains scripts for managing book-cover images.

### Fetch Covers

After adding book passages, run:

```bash
node scripts/fetchCovers.js
```

The script uses the book information in `src/data/paragraphs.js` to search available book-cover sources and add images to the appropriate difficulty folder.

### Placeholder Images

Only use:

```bash
node scripts/addPlaceholder.js
```

when an actual book cover cannot reasonably be obtained.

Do not run `addPlaceholder.js` before attempting to fetch or manually add the real cover.

Placeholder usage is tracked in:

```text
scripts/logs/placeholders.txt
```

Read the log before replacing or changing any placeholder image.

If a placeholder is later replaced by the actual cover, keep the existing log entry and append:

```text
ACTUAL IMAGE ADDED
```

to that entry.

---

## Legal Information

The project includes:

* Privacy Policy: `public/legal/privacy.txt`
* Terms of Use: `public/legal/usage.txt`

These documents are accessible from the application's footer.

---

## Developer Notes

```text
DO NOT REMOVE COMMENTS INSIDE CODE

COMMENTED CODE SECTIONS MUST BE RETAINED
```

Unless a contribution specifically requires otherwise, preserve existing comments and commented-out code.

Avoid modifying unrelated functionality when making focused changes.

---

## Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

Create a production build:

```bash
npm run build
```

Before submitting changes, verify that the application builds successfully and that the modified functionality works as expected.

---

## Planned Features

The following features may be added in future versions:

* Login system
* Personal WPM tracker
* WPM progress graphs
* Difficulty-based statistics
* Custom WPM goals
* Personal best leaderboard

---

## Contributing

Contributions are welcome, especially:

* New typing passages
* Book covers
* Code snippets
* Bug fixes
* UI and accessibility improvements
* Performance improvements
* Documentation improvements

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

Keep contributions focused and avoid unrelated modifications.

---

## Third-Party Components

Type.Shift uses third-party software and components.

Relevant licensing and attribution information is maintained in:

[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md)

In particular, the project uses the React Bits `DarkVeil` component and the OGL library.

---

## License

Type.Shift is released under the MIT License for the project's own code.

See [LICENSE](LICENSE) for the full license text.

Third-party components remain subject to their respective licenses and notices.

---

## Author

Built by Junaid
