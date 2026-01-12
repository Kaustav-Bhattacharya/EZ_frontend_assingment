import { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  PointerSensor,
  useSensor,
  useSensors,
  closestCorners,
} from '@dnd-kit/core'
import { KanbanColumn } from './kanban-column'
import { kanbanColumns, initialKanbanCards } from '@/data/kanban-data'
import { type KanbanCard, type ColumnId } from '@/types/kanban'

export function KanbanBoard() {
  const [cards, setCards] = useState<KanbanCard[]>(initialKanbanCards)
  const [addingToColumn, setAddingToColumn] = useState<ColumnId | null>(null)
  const [newCardTitle, setNewCardTitle] = useState('')

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  )

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event
    if (!over) return

    const activeCard = cards.find((c) => c.id === active.id)
    if (!activeCard) return

    const overId = over.id as string

    if (kanbanColumns.some((col) => col.id === overId)) {
      if (activeCard.columnId !== overId) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === active.id ? { ...card, columnId: overId as ColumnId } : card
          )
        )
      }
      return
    }

    const overCard = cards.find((c) => c.id === overId)
    if (overCard && activeCard.columnId !== overCard.columnId) {
      setCards((prev) =>
        prev.map((card) =>
          card.id === active.id ? { ...card, columnId: overCard.columnId } : card
        )
      )
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over) return

    const activeCard = cards.find((c) => c.id === active.id)
    if (!activeCard) return

    const overId = over.id as string

    if (kanbanColumns.some((col) => col.id === overId)) {
      if (activeCard.columnId !== overId) {
        setCards((prev) =>
          prev.map((card) =>
            card.id === active.id ? { ...card, columnId: overId as ColumnId } : card
          )
        )
      }
      return
    }

    const overCard = cards.find((c) => c.id === overId)
    if (!overCard) return

    if (activeCard.columnId === overCard.columnId) {
      const columnCards = cards.filter((c) => c.columnId === activeCard.columnId)
      const oldIndex = columnCards.findIndex((c) => c.id === active.id)
      const newIndex = columnCards.findIndex((c) => c.id === over.id)

      if (oldIndex !== newIndex) {
        const reordered = [...columnCards]
        const [removed] = reordered.splice(oldIndex, 1)
        reordered.splice(newIndex, 0, removed)

        setCards((prev) => {
          const otherCards = prev.filter((c) => c.columnId !== activeCard.columnId)
          return [...otherCards, ...reordered]
        })
      }
    }
  }

  const handleAddCard = (columnId: ColumnId) => {
    setAddingToColumn(columnId)
    setNewCardTitle('')
  }

  const handleSaveCard = () => {
    if (newCardTitle.trim() && addingToColumn) {
      const newCard: KanbanCard = {
        id: `card-${Date.now()}`,
        title: newCardTitle.trim(),
        columnId: addingToColumn,
      }
      setCards((prev) => [...prev, newCard])
      setNewCardTitle('')
      setAddingToColumn(null)
    }
  }

  const handleEditCard = useCallback((id: string, title: string) => {
    setCards((prev) => prev.map((card) => (card.id === id ? { ...card, title } : card)))
  }, [])

  const handleDeleteCard = useCallback((id: string) => {
    setCards((prev) => prev.filter((card) => card.id !== id))
  }, [])

  return (
    <div className="w-full bg-gray-900 text-white rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Kanban Board</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map((column) => (
            <div key={column.id} className="flex-shrink-0 w-full md:w-auto">
              <KanbanColumn
                column={column}
                cards={cards}
                onAddCard={handleAddCard}
                onEditCard={handleEditCard}
                onDeleteCard={handleDeleteCard}
              />
              {addingToColumn === column.id && (
                <div className="mt-2 bg-gray-800 border border-gray-700 rounded-lg p-3">
                  <Input
                    value={newCardTitle}
                    onChange={(e) => setNewCardTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSaveCard()
                      if (e.key === 'Escape') {
                        setAddingToColumn(null)
                        setNewCardTitle('')
                      }
                    }}
                    placeholder="Enter card title"
                    autoFocus
                    className="bg-gray-700 border-gray-600 text-white mb-2"
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSaveCard} className="flex-1">
                      Add
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setAddingToColumn(null)
                        setNewCardTitle('')
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  )
}
