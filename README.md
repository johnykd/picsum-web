## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repo-url>
cd picsum-web
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Create a `.env.local` file in the root directory (if needed for future environment variables)

## Features

- **Responsive Image Gallery**
  - Grid layout that adapts to different screen sizes
  - Beautiful hover effects on image cards
  - Image information display for each photo

- **Infinite Scrolling**
  - Automatic loading of more images as you scroll
  - Smooth loading states with skeleton loading
  - Efficient image loading with pagination

- **Modal View**
  - Full-size image viewing
  - Detailed image information display
  - Loading states for image transitions
  - Background click to close

## Running the Project

1. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

2. Open [http://localhost:3000/picsum](http://localhost:3000/picsum) in your browser to see the gallery.