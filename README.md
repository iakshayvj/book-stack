# BookStack

A modern web application to manage your reading list and track your reading progress. Built with React, Vite, and Tailwind CSS.

## Features

- **Book Management**
  - Add books and magazines to your reading list
  - Track reading status (Currently Reading, Next Up, Read Later, Read, Not Decided)
  - Record completion dates for finished books
  - Add genres and purpose categories for better organization
  - Write notes about where you found the book and why you want to read it

- **Reading Progress**
  - Monitor currently reading books
  - Plan your next reads
  - Track completed books with completion dates
  - Filter read books by year and month

- **Rich Interaction**
  - Comment system for each book
  - Edit and update book details
  - View detailed information in a side panel
  - Smooth animations and transitions

- **Data Management**
  - Persistent storage using localStorage
  - Export your reading list as JSON
  - Import reading lists from JSON files
  - Clear all data with confirmation

## Technology Stack

- React 18
- Vite
- Tailwind CSS
- shadcn/ui Components
- Lucide React Icons

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd reading-backlog
```

2. Install dependencies:
```bash
npm install
```

3. Install required shadcn/ui components:
```bash
npm install @radix-ui/react-dialog
npm install @radix-ui/react-select
npm install @radix-ui/react-slot
npm install class-variance-authority
npm install clsx
npm install tailwind-merge
npm install tailwindcss-animate
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
reading-backlog/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn/ui components
│   │   └── ReadingBacklogApp.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── public/
│   └── book.png         # App icon
└── package.json
```

## Usage

- **Adding a Book**: Click the "Add Book" button and fill in the details
- **Managing Status**: Use the Priority dropdown to set reading status
- **Completing a Book**: Set status to "Read" and enter completion date
- **Adding Comments**: Open book details and use the comments section
- **Filtering Read Books**: Use year and month dropdowns in the Read Books section
- **Data Backup**: Use Export/Import buttons to manage your data

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/awesome-feature`
3. Commit your changes: `git commit -am 'Add awesome feature'`
4. Push to the branch: `git push origin feature/awesome-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.