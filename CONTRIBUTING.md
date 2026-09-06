# Contributing to Type.Shift

Thank you for contributing to Type.Shift.

The main way to contribute to the project is by adding new typing passages, improving existing content, adding missing book covers, fixing bugs, or improving the application.

---

## Before Contributing

Please read the project documentation and existing code structure before making changes.

In particular:

- `src/data/paragraphs.js` contains the typing-test dataset.
- `public/assets/easy/` contains Easy book covers.
- `public/assets/medium/` contains Medium book covers.
- `public/assets/hard/` contains Hard book covers.
- `scripts/fetchCovers.js` searches for book covers and adds them to the appropriate assets folder.
- `scripts/addPlaceholder.js` adds the placeholder image when a cover cannot be obtained.
- `scripts/logs/placeholders.txt` records placeholder-image usage.

Do not modify unrelated application functionality when making content-only contributions.

---

# Adding New Paragraphs

The preferred contribution is to bulk-add new paragraphs to:

```text
src/data/paragraphs.js
````

Each normal passage should contain the appropriate metadata:

```javascript
{
  text: "...",
  source: "...",
  image: "/assets/easy/example.png"
}
```

For code passages:

```javascript
{
  text: "...",
  source: "Example Algorithm"
}
```

Do not add an image to code passages unless the project specifically requires it.

### Difficulty Guidelines

Use the existing difficulty categories consistently.

### Easy

Easy passages should generally:

* Use simple vocabulary.
* Have straightforward sentence structure.
* Be suitable for beginner typing practice.
* Generally be around 150–200 characters.
* Use children's literature or similarly accessible material.

### Medium

Medium passages should generally:

* Use more varied vocabulary.
* Have moderately complex sentence structure.
* Generally be around 200–250 characters.
* Use novels and similar literary material.

### Hard

Hard passages should generally:

* Use advanced vocabulary.
* Have more complex sentence structure.
* Generally be around 250–300 characters.
* Use scientific, technical, academic, or similarly challenging material.

### Code

Code passages should:

* Be reasonably short.
* Be suitable for typing practice.
* Use recognizable algorithms, data structures, or programming concepts.
* Preserve valid syntax.
* Include an appropriate `source`.
* Not use book-cover images.

---

# Important: Adding Book Covers

For passages that use book covers, follow this order.

## Step 1: Add the Paragraphs

First add the new paragraph entries to:

```text
src/data/paragraphs.js
```

Make sure the book title is present in the `source` metadata so the cover-fetching script can identify it.

Do not manually add placeholder images at this stage.

---

## Step 2: Run the Cover Fetcher

After adding the paragraphs, run:

```bash
node scripts/fetchCovers.js
```

This script attempts to find and add the relevant book covers using the configured book-cover sources.

Do not skip this step when adding new book passages.

---

## Step 3: Check Which Covers Failed

After `fetchCovers.js` finishes:

* Check the relevant `public/assets/<difficulty>/` folder.
* Check the script output/logs.
* Identify every paragraph whose book cover was not successfully added.

Do not immediately run `addPlaceholder.js`.

A failed automatic lookup does NOT automatically mean a placeholder should be used.

---

# Manual Cover Addition

If `fetchCovers.js` was unable to obtain a cover, first try to add the actual cover manually.

For example, if a Medium passage needs:

```text
public/assets/medium/examplebook.png
```

manually add the correct cover image at that location.

Make sure the filename exactly matches the `image` metadata in:

```text
src/data/paragraphs.js
```

For example:

```javascript
image: "/assets/medium/examplebook.png"
```

After manually adding the actual image, do not create a placeholder for that book.

---

# When to Use `addPlaceholder.js`

Use:

```bash
node scripts/addPlaceholder.js
```

ONLY when the actual book cover cannot be added due to some circumstance.

Examples may include:

* The cover cannot be found.
* Available sources do not provide a usable cover.
* The book is not available through the configured search sources.
* The cover cannot reasonably be obtained or added.

Do NOT run `addPlaceholder.js` simply because `fetchCovers.js` failed.

Always attempt to add the actual image first.

---

# IMPORTANT WARNING ABOUT addPlaceholder.js

Do NOT run:

```bash
node scripts/addPlaceholder.js
```

before running:

```bash
node scripts/fetchCovers.js
```

`addPlaceholder.js` can create a placeholder image for a route that exists in `paragraphs.js` but does not yet have a real cover in `public/assets/`.

Running it too early can cause a placeholder to become the image used by the application even though the actual book cover could still have been added.

The required order is:

```text
1. Add paragraphs
2. Run fetchCovers.js
3. Check for missing covers
4. Manually add missing covers where possible
5. Run addPlaceholder.js only for covers that genuinely cannot be added
```

---

# Placeholder Log

Whenever `addPlaceholder.js` is used, the corresponding entry will be automatically recorded in:

```text
scripts/logs/placeholders.txt
```

Read this file before changing placeholder-related images.

The log exists to identify which image files are placeholders.

Do not delete the log.

If a placeholder image is later replaced with the actual book cover, keep the existing log entry and append:

```text
ACTUAL IMAGE ADDED
```

to the relevant entry.

Example:

```text
The Great Example - ACTUAL IMAGE ADDED
```

Do not remove historical placeholder information.

---

# Image Metadata Rules

For every non-code paragraph that has a book cover:

```javascript
image: "/assets/<difficulty>/<filename>.png"
```

The path must point to an image that actually exists.

Examples:

```javascript
image: "/assets/easy/example.png"
```

```javascript
image: "/assets/medium/example.png"
```

```javascript
image: "/assets/hard/example.png"
```

Do not use outdated root-level paths such as:

```javascript
image: "/assets/example.png"
```

when the image belongs in a difficulty folder.

Do not invent filenames.

Do not reference an image that does not exist.

---

# Content Accuracy

When adding source information:

* Do not invent books, authors, or publication information.
* Do not create fake citations.
* Keep source metadata accurate.
* Preserve the distinction between original content and sourced content.

Do not copy large amounts of copyrighted text into the dataset.

Prefer:

* Public-domain works.
* Appropriately licensed material.
* Original passages written for Type.Shift.
* Short quotations where legally appropriate.

If a passage is original, identify it clearly rather than attributing it to a real book.

---

# Code Contributions

For code changes:

* Keep existing functionality intact unless the contribution specifically changes it.
* Avoid unrelated refactors.
* Test the application before submitting the contribution.
* Keep the code readable.
* Preserve important existing comments.

---

# Existing Project Rule

The project currently contains the following developer requirement:

```text
DO NOT REMOVE COMMENTS INSIDE CODE

COMMENTED CODE SECTIONS MUST BE RETAINED
```

Unless a contribution specifically requires changing one of these sections, preserve existing comments and commented-out code.

---

# Testing

Before submitting a contribution:

1. Run the application locally.
2. Verify the new passage appears in the intended difficulty category.
3. Verify the passage can be selected normally.
4. Verify the source metadata displays correctly.
5. Verify the book cover displays correctly when applicable.
6. Verify the image path exists.
7. Verify code passages do not reference unnecessary images.
8. Run the production build.

For example:

```bash
npm run build
```

Fix any errors introduced by your changes before submitting the contribution.

---

# Pull Requests

Pull requests should clearly describe:

* What was changed.
* Which passages were added or modified.
* Which images were added.
* Whether `fetchCovers.js` was used.
* Whether any covers had to be added manually.
* Whether `addPlaceholder.js` was required.
* Whether placeholder log entries were updated.

Keep pull requests focused on one logical change where possible.

---

# Contribution Workflow Summary

For a typical new batch of book passages:

```text
Add passages to src/data/paragraphs.js
              ↓
Run:
node scripts/fetchCovers.js
              ↓
Check for missing covers
              ↓
Manually add actual covers where possible
              ↓
Only for covers that genuinely cannot be obtained:
node scripts/addPlaceholder.js
              ↓
Update scripts/logs/placeholders.txt
when placeholders are used or later replaced
              ↓
Run the application
              ↓
Run:
npm run build
```

The goal is to keep the dataset complete, the image metadata accurate, and placeholder usage limited to cases where a real cover cannot reasonably be added.
