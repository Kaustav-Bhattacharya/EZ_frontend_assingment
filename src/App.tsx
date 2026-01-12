import { useState } from 'react'
import { TreeView } from '@/components/tree/tree-view'
import { KanbanBoard } from '@/components/kanban/kanban-board'
import { Button } from '@/components/ui/button'
import { FolderTree, Kanban } from 'lucide-react'
import { initialTreeData } from '@/data/tree-data'

function App() {
  const [activeTab, setActiveTab] = useState<'tree' | 'kanban'>('tree')
  const [treeData, setTreeData] = useState(initialTreeData)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-white">Frontend Assignment</h1>
          <p className="text-gray-400">Tree View & Kanban Board Components</p>
        </header>

        <div className="flex gap-2 mb-6 border-b border-gray-800">
          <Button
            variant={activeTab === 'tree' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('tree')}
            className="rounded-b-none"
          >
            <FolderTree className="w-4 h-4 mr-2" />
            Tree View
          </Button>
          <Button
            variant={activeTab === 'kanban' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('kanban')}
            className="rounded-b-none"
          >
            <Kanban className="w-4 h-4 mr-2" />
            Kanban Board
          </Button>
        </div>

        <div className="min-h-[600px]">
          {activeTab === 'tree' ? (
            <TreeView data={treeData} onDataChange={setTreeData} />
          ) : (
            <KanbanBoard />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
