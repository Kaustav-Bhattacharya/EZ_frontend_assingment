import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { KanbanCard } from './kanban-card'
import { type KanbanColumnProps } from '@/types/kanban'

const columnStyles = {
  todo: {
    bg: 'bg-slate-800/50',
    border: 'border-slate-700',
    badge: 'bg-slate-700 text-slate-200',
  },
  'in-progress': {
    bg: 'bg-amber-900/20',
    border: 'border-amber-700/50',
    badge: 'bg-amber-700/50 text-amber-200',
  },
  done: {
    bg: 'bg-emerald-900/20',
    border: 'border-emerald-700/50',
    badge: 'bg-emerald-700/50 text-emerald-200',
  },
}

export function KanbanColumn({ column, cards, onAddCard, onEditCard, onDeleteCard }: KanbanColumnProps) {
  const columnCards = cards.filter((card) => card.columnId === column.id)
  const styles = columnStyles[column.id]

  return (
    <div
      className={`flex flex-col ${styles.bg} border ${styles.border} rounded-lg p-4 w-full md:min-w-[280px] md:max-w-[280px] h-fit max-h-[600px]`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-white">{column.title}</h3>
        <span className={`text-xs px-2 py-1 rounded ${styles.badge}`}>
          {columnCards.length}
        </span>
      </div>

      <SortableContext items={columnCards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 overflow-y-auto space-y-2 min-h-[100px]">
          {columnCards.map((card) => (
            <KanbanCard key={card.id} card={card} onEdit={onEditCard} onDelete={onDeleteCard} />
          ))}
        </div>
      </SortableContext>

      <Button
        variant="ghost"
        className="mt-4 w-full justify-start text-gray-400 hover:text-white hover:bg-gray-700"
        onClick={() => onAddCard(column.id)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Card
      </Button>
    </div>
  )
}
