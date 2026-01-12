import { type TreeNode } from '@/types/tree'

export function findNode(nodes: TreeNode[], id: string): TreeNode | null {
  for (const node of nodes) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

export function updateNode(
  nodes: TreeNode[],
  id: string,
  updater: (node: TreeNode) => TreeNode
): TreeNode[] {
  return nodes.map((node) => {
    if (node.id === id) return updater(node)
    if (node.children) {
      return { ...node, children: updateNode(node.children, id, updater) }
    }
    return node
  })
}

export function deleteNode(nodes: TreeNode[], id: string): TreeNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => {
      if (node.children) {
        return { ...node, children: deleteNode(node.children, id) }
      }
      return node
    })
}

export function addChildNode(
  nodes: TreeNode[],
  parentId: string,
  newNode: TreeNode
): TreeNode[] {
  return nodes.map((node) => {
    if (node.id === parentId) {
      return {
        ...node,
        children: [...(node.children || []), newNode],
        isExpanded: true,
      }
    }
    if (node.children) {
      return { ...node, children: addChildNode(node.children, parentId, newNode) }
    }
    return node
  })
}

export function loadChildrenMock(parentName: string): Promise<TreeNode[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: `${Date.now()}-1`, name: `${parentName} - Child 1`, children: [] },
        { id: `${Date.now()}-2`, name: `${parentName} - Child 2`, children: [] },
      ])
    }, 500)
  })
}
