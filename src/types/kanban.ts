export interface KanbanCard {
  id: string
  title: string
  columnId: string
}

export type ColumnId = 'todo' | 'in-progress' | 'done'

export interface KanbanColumn {
  id: ColumnId
  title: string
  color: string
}

export interface KanbanBoardProps {
  initialCards?: KanbanCard[]
}

export interface KanbanColumnProps {
  column: KanbanColumn
  cards: KanbanCard[]
  onAddCard: (columnId: ColumnId) => void
  onEditCard: (id: string, title: string) => void
  onDeleteCard: (id: string) => void
}

export interface KanbanCardProps {
  card: KanbanCard
  onEdit: (id: string, title: string) => void
  onDelete: (id: string) => void
}
