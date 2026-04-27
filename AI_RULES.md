# AI Rules & Tech Stack

## Tech Stack
- **Framework**: React 18+ with Vite for fast builds and HMR.
- **Language**: TypeScript for type safety and better developer experience.
- **Styling**: Tailwind CSS for utility-first styling and rapid UI development.
- **UI Components**: shadcn/ui (Radix UI based) for accessible, high-quality components.
- **Icons**: Lucide-React for general UI and Phosphor Icons for brand-specific needs.
- **Routing**: React Router for client-side navigation.
- **State Management**: React Hooks (useState, useEffect, useMemo) for simplicity.

## Development Rules
- **Component Architecture**: Every new component must have its own file in `src/components/`. Keep components under 100 lines.
- **Styling**: Use Tailwind CSS classes exclusively. Avoid custom CSS files unless defining global variables or complex animations.
- **Responsive Design**: All components must be mobile-first and fully responsive using Tailwind's breakpoint prefixes.
- **File Naming**: Use PascalCase for components (e.g., `Button.tsx`) and camelCase for hooks/utils.
- **Routing**: Maintain all application routes in `src/App.tsx`.
- **Integrations**: Use the provided integration buttons for adding Supabase or other services.
- **Cleanup**: Delete unused files promptly to keep the codebase clean.