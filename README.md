# Frontend Mentor - Typing Speed Test solution

![Typing Speed Test - Active Game](./design/desktop-started.jpg)

This is a solution to the [Typing Speed Test challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/typing-speed-test). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Start a typing test by clicking the start button or clicking the passage and typing
- Type a passage and see real-time WPM, accuracy, and time stats
- Choose between Easy, Medium, and Hard difficulty levels
- Switch between Timed (60s) and Passage mode
- See correct characters highlighted in green and wrong ones in red
- View a results screen with WPM, accuracy, and character stats
- Track their personal best score (persisted in localStorage)
- See a "Baseline Established!" message on their first test
- See a "High Score Smashed!" celebration with confetti when beating their PB
- Restart the test at any time during gameplay
- View the optimal layout depending on their device's screen size
- See hover and focus states for all interactive elements
- Use mobile-friendly dropdown selectors on smaller screens

### Screenshot

![Desktop - Not Started](./design/desktop-not-started.jpg)
![Desktop - Results](./design/desktop-results.jpg)

### Links

- Solution URL: [Frontend Mentor Solution](https://www.frontendmentor.io/solutions/)
- Live Site URL: [Live Demo](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- Mobile-first responsive design
- [React 19](https://react.dev/) - JS library
- [Vite 7](https://vite.dev/) - Build tool

### What I learned

This project was a great exercise in managing complex state across multiple components in React. Key learnings include:

- **Real-time WPM calculation** using `Date.now()` timestamps and character-per-word ratios
- **Character-by-character input tracking** with keyboard events and state arrays
- **Timer management** with `useEffect` and `setInterval`, including proper cleanup
- **localStorage persistence** for personal best scores across sessions
- **Responsive design patterns**: inline button selectors on desktop, custom dropdown menus with radio buttons on mobile
- **CSS-only confetti animation** using `nth-child` selectors and staggered `animation-delay`
- **React 19 best practices**: avoiding setState in effects, using key-based component resets, and proper dependency management in hooks

### Continued development

- Adding keyboard shortcut support (e.g., Tab to restart)
- Implementing a leaderboard with backend integration
- Adding more typing modes (custom text, code snippets)
- Improving accessibility with screen reader support

## Author

- **Emanuele Squillante** - Front End Developer | React & Angular
- LinkedIn - [Emanuele Squillante](https://www.linkedin.com/in/emanuele-squillante/)
- Frontend Mentor - [@emanuelesquillante](https://www.frontendmentor.io/profile/emanuelesquillante)
