import { type KanbanCard, type KanbanColumn } from '@/types/kanban'

export const kanbanColumns: KanbanColumn[] = [
  { id: 'todo', title: 'Todo', color: 'slate' },
  { id: 'in-progress', title: 'In Progress', color: 'amber' },
  { id: 'done', title: 'Done', color: 'emerald' },
]

export const initialKanbanCards: KanbanCard[] = [
  { id: '1', title: 'Design landing page', columnId: 'todo' },
  { id: '2', title: 'Setup database', columnId: 'todo' },
  { id: '3', title: 'Implement auth', columnId: 'in-progress' },
  { id: '4', title: 'Create README', columnId: 'done' },
]

export async function fetchKanbanCards(): Promise<KanbanCard[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialKanbanCards)
    }, 300)
  })
}
