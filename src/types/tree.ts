export interface TreeNode {
  id: string
  name: string
  children?: TreeNode[]
  isExpanded?: boolean
  isLoading?: boolean
}

export interface TreeViewProps {
  data: TreeNode[]
  onDataChange?: (data: TreeNode[]) => void
}

export interface TreeNodeProps {
  node: TreeNode
  level: number
  onToggle: (id: string) => void
  onAdd: (parentId: string, name: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, name: string) => void
}
