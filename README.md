# Frontend Assignment - Tree View & Kanban Board

A React + TypeScript application featuring a fully functional Tree View component with lazy loading and a Kanban Board with drag-and-drop functionality.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── tree/              # Tree view components
│   │   ├── tree-view.tsx      # Main tree container
│   │   └── tree-node.tsx      # Individual node component
│   ├── kanban/            # Kanban board components
│   │   ├── kanban-board.tsx   # Board container
│   │   ├── kanban-column.tsx  # Column component
│   │   └── kanban-card.tsx    # Card component
│   └── ui/                # shadcn/ui components
├── data/                  # Mock data & API stubs
│   ├── tree-data.ts          # Tree mock data
│   └── kanban-data.ts        # Kanban mock data
├── types/                 # TypeScript interfaces
│   ├── tree.ts
│   └── kanban.ts
├── utils/                 # Helper functions
│   └── tree-utils.ts         # Tree operations
└── lib/
    └── utils.ts              # cn() utility
```

## 🌲 Tree View Component

### Features

1. **Expand/Collapse** - Click chevron or node to toggle
2. **Add Child Node** - Click `+` button, enter name, press Enter
3. **Edit Node** - Double-click node name or click edit icon
4. **Delete Node** - Click trash icon, confirm deletion (removes entire subtree)
5. **Lazy Loading** - Nodes with `children: undefined` load children on first expand (500ms delay)

### Data Structure

```typescript
interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]      // undefined = lazy load, [] = leaf node
  isExpanded?: boolean
  isLoading?: boolean
}
```

**Important:** 
- `children: undefined` = Node will lazy load children when expanded
- `children: []` = Leaf node, no expand icon shown
- Newly added nodes get `children: []` to prevent infinite loops

### Usage

```typescript
import { TreeView } from '@/components/tree/tree-view'
import { initialTreeData } from '@/data/tree-data'

function App() {
  const [treeData, setTreeData] = useState(initialTreeData)
  
  return <TreeView data={treeData} onDataChange={setTreeData} />
}
```

### Customizing Lazy Load

Edit `src/utils/tree-utils.ts` → `loadChildrenMock()`:

```typescript
export function loadChildrenMock(parentName: string): Promise<TreeNode[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Replace with your API call
      // Example: fetch(`/api/nodes/${parentId}/children`)
      resolve([
        { id: '...', name: 'Child 1', children: [] },
        { id: '...', name: 'Child 2', children: [] },
      ])
    }, 500)
  })
}
```

## 📋 Kanban Board Component

### Features

1. **Add Card** - Click "Add Card" button in any column
2. **Delete Card** - Hover over card, click trash icon
3. **Edit Card** - Double-click card or click edit icon
4. **Drag & Drop** - Drag cards between columns or reorder within column
5. **Responsive** - Columns stack vertically on mobile

### Data Structure

```typescript
interface KanbanCard {
  id: string
  title: string
  columnId: 'todo' | 'in-progress' | 'done'
}
```

### Usage

```typescript
import { KanbanBoard } from '@/components/kanban/kanban-board'

function App() {
  return <KanbanBoard />
}
```

### Customizing

- **Column definitions**: Edit `src/data/kanban-data.ts` → `kanbanColumns`
- **Initial cards**: Edit `src/data/kanban-data.ts` → `initialKanbanCards`
- **Column colors**: Edit `src/components/kanban/kanban-column.tsx` → `columnStyles`

## 🔧 Technical Stack

- **React 19** - UI framework
- **TypeScript 5** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **@dnd-kit** - Drag and drop
- **Lucide React** - Icons

## 🎨 Styling

This project uses Tailwind CSS with a dark theme. The color palette is defined in `src/index.css` using CSS variables.

To modify the theme, edit the CSS variables in `src/index.css`:

```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... more variables */
}
```

## 🧪 Adding New Components

Use shadcn/ui CLI to add components:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add card
npx shadcn@latest add select
```

## 📝 Code Conventions

- **File naming**: kebab-case (e.g., `tree-view.tsx`, `kanban-card.tsx`)
- **Component naming**: PascalCase (e.g., `TreeView`, `KanbanCard`)
- **Type imports**: Use `type` keyword (e.g., `import { type TreeNode }`)
- **Minimal comments**: Code should be self-documenting

## 🔄 Replacing Mock Data with API

### Tree View

```typescript
// src/components/tree/tree-view.tsx

const handleToggle = async (id: string) => {
  const node = findNode(treeData, id)
  if (!node || node.isExpanded) return

  // Replace loadChildrenMock with real API
  const children = await fetch(`/api/nodes/${id}/children`)
    .then(res => res.json())
  
  // Update tree...
}
```

### Kanban Board

```typescript
// src/components/kanban/kanban-board.tsx

useEffect(() => {
  // Replace initialKanbanCards with API call
  fetch('/api/kanban/cards')
    .then(res => res.json())
    .then(cards => setCards(cards))
}, [])
```

## 🐛 Common Issues

**Tree keeps expanding infinitely:**
- Make sure leaf nodes have `children: []`, not `children: undefined`
- Check `loadChildrenMock()` returns nodes with `children: []`

**Drag and drop not working:**
- Ensure unique `id` for all cards
- Check `@dnd-kit` dependencies are installed

**Styles not applying:**
- Run `npm install` to ensure Tailwind is configured
- Check `tailwind.config.cjs` includes all content paths

## 📄 License

This project is for assignment purposes.
