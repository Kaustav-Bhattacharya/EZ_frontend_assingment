import { useState, useCallback } from 'react'
import { TreeNodeComponent } from './tree-node'
import { type TreeNode, type TreeViewProps } from '@/types/tree'
import { findNode, updateNode, deleteNode, addChildNode, loadChildrenMock } from '@/utils/tree-utils'

export function TreeView({ data, onDataChange }: TreeViewProps) {
  const [treeData, setTreeData] = useState<TreeNode[]>(data)

  const updateData = useCallback(
    (newData: TreeNode[]) => {
      setTreeData(newData)
      onDataChange?.(newData)
    },
    [onDataChange]
  )

  const handleToggle = useCallback(
    async (id: string) => {
      const node = findNode(treeData, id)
      if (!node) return

      if (!node.isExpanded && node.children === undefined) {
        const loadingData = updateNode(treeData, id, (n) => ({
          ...n,
          isLoading: true,
          isExpanded: true,
        }))
        updateData(loadingData)

        const children = await loadChildrenMock(node.name)
        
        const newData = updateNode(treeData, id, (n) => ({
          ...n,
          children,
          isLoading: false,
          isExpanded: true,
        }))
        updateData(newData)
      } else {
        const newData = updateNode(treeData, id, (n) => ({
          ...n,
          isExpanded: !n.isExpanded,
        }))
        updateData(newData)
      }
    },
    [treeData, updateData]
  )

  const handleAdd = useCallback(
    (parentId: string, name: string) => {
      const newNode: TreeNode = {
        id: `${Date.now()}-${Math.random()}`,
        name,
        children: [],
      }
      const newData = addChildNode(treeData, parentId, newNode)
      updateData(newData)
    },
    [treeData, updateData]
  )

  const handleDelete = useCallback(
    (id: string) => {
      const newData = deleteNode(treeData, id)
      updateData(newData)
    },
    [treeData, updateData]
  )

  const handleEdit = useCallback(
    (id: string, name: string) => {
      const newData = updateNode(treeData, id, (n) => ({ ...n, name }))
      updateData(newData)
    },
    [treeData, updateData]
  )

  return (
    <div className="w-full bg-gray-900 text-white rounded-lg border border-gray-700 p-6">
      <h2 className="text-xl font-semibold mb-4 text-white">Tree View</h2>
      <div className="space-y-1">
        {treeData.map((node) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            level={0}
            onToggle={handleToggle}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  )
}
