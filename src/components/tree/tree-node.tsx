import { useState } from 'react'
import { ChevronRight, ChevronDown, Plus, Trash2, Edit2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { type TreeNodeProps } from '@/types/tree'

const levelColors = [
  'bg-sky-500',
  'bg-emerald-500',
  'bg-lime-500',
  'bg-orange-500',
]

export function TreeNodeComponent({ node, level, onToggle, onAdd, onDelete, onEdit }: TreeNodeProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(node.name)
  const [isAdding, setIsAdding] = useState(false)
  const [addValue, setAddValue] = useState('')
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const hasChildren = node.children && node.children.length > 0
  const colorClass = levelColors[level % levelColors.length]

  const handleSaveEdit = () => {
    if (editValue.trim()) {
      onEdit(node.id, editValue.trim())
      setIsEditing(false)
    }
  }

  const handleAddChild = () => {
    if (addValue.trim()) {
      onAdd(node.id, addValue.trim())
      setAddValue('')
      setIsAdding(false)
    }
  }

  return (
    <div className="select-none">
      <div
        className="flex items-center gap-3 py-2 group"
        style={{ paddingLeft: `${level * 20}px` }}
      >
        <div className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center text-white text-sm font-bold`}>
          {node.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded-full px-4 py-1.5 min-w-[150px]">
          <span className="text-sm text-white flex-1">{node.name}</span>
          
          {(hasChildren || node.children === undefined) && (
            <button
              onClick={() => onToggle(node.id)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
            >
              {node.isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
              ) : node.isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsAdding(true)}
            title="Add child"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              <Edit2 className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-red-400 hover:text-red-500"
              onClick={() => setShowDeleteDialog(true)}
              title="Delete"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="ml-12 mb-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSaveEdit()
              if (e.key === 'Escape') setIsEditing(false)
            }}
            onBlur={handleSaveEdit}
            autoFocus
            className="h-8 text-sm bg-gray-800 border-gray-700"
          />
        </div>
      )}

      {isAdding && (
        <div className="ml-12 mb-2">
          <Input
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddChild()
              if (e.key === 'Escape') {
                setIsAdding(false)
                setAddValue('')
              }
            }}
            onBlur={handleAddChild}
            placeholder="Enter node name"
            autoFocus
            className="h-8 text-sm bg-gray-800 border-gray-700"
          />
        </div>
      )}

      {node.isExpanded && (
        <div className="relative ml-6 pl-4 border-l border-dashed border-gray-700">
          {node.isLoading && (
            <div className="flex items-center gap-2 py-2 text-sm text-gray-400">
              <Loader2 className="w-4 h-4 animate-spin" />
              Loading children...
            </div>
          )}
          
          {hasChildren && node.children!.map((child) => (
            <TreeNodeComponent
              key={child.id}
              node={child}
              level={level + 1}
              onToggle={onToggle}
              onAdd={onAdd}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      )}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-white">Delete Node</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete "{node.name}" and all its children?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                onDelete(node.id)
                setShowDeleteDialog(false)
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
