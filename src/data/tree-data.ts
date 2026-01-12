import { type TreeNode } from '@/types/tree'

// Note: nodes without 'children' property will lazy load when expanded
export const initialTreeData: TreeNode[] = [
  {
    id: '1',
    name: 'Root 1',
  },
  {
    id: '2',
    name: 'Root 2',
  },
  {
    id: '3',
    name: 'Root 3',
    children: [],
  },
]

export async function fetchTreeData(): Promise<TreeNode[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(initialTreeData)
    }, 300)
  })
}
