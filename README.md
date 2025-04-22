# Mira Booking

A multilingual booking application for visa services with support for English, French, and Arabic.

## Features

- Multilingual support (English, French, Arabic)
- Fully responsive design
- Visa application form with dynamic requirements
- Email notification system
- Mobile-friendly language selector
- RTL support for Arabic language

## Technology Stack

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- React Hooks

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/mklffm/Mira-Booking.git
cd Mira-Booking
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project can be deployed to any hosting platform that supports Next.js applications, such as Vercel, Netlify, or a custom server.

## Pushing to GitHub

To push this code to your GitHub repository, follow these steps:

1. Create a Personal Access Token on GitHub:
   - Go to GitHub Settings > Developer Settings > Personal Access Tokens
   - Generate a new token with 'repo' scope
   - Copy the token

2. Set up your Git credentials:
```bash
git config --global user.name "Your GitHub Username"
git config --global user.email "your.email@example.com"
```

3. Push to GitHub using your token:
```bash
git push -u origin master
```
When prompted for a password, use your Personal Access Token instead.

Alternatively, you can use the GitHub CLI:
```bash
gh auth login
gh repo create mklffm/Mira-Booking --public --source=. --push
```

## License

This project is licensed under the MIT License. 