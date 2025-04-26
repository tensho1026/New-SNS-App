import { ArrowLeft, ImageIcon} from "lucide-react"
import Link from "next/link"

export default function CreatePostPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">新規投稿</h1>
          </div>
          <button className="px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full text-sm">
            投稿する
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <div className="flex space-x-4">
            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <img src="/placeholder.svg?height=48&width=48" alt="User avatar" />
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <textarea
                  className="w-full border-0 bg-transparent text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 focus:outline-none resize-none"
                  placeholder="今何してる？"
                  rows={5}
                ></textarea>
              </div>

              {/* Preview Area (Optional) */}
              <div className="mb-4 rounded-xl overflow-hidden border border-dashed border-gray-300 dark:border-gray-600 p-2 flex items-center justify-center h-60 bg-gray-50 dark:bg-gray-700">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <ImageIcon className="h-8 w-8 mx-auto mb-2" />
                  <p>画像をアップロード</p>
                </div>
              </div>

              <div className="flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex space-x-4">
                  <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-full">
                    <ImageIcon className="h-5 w-5" />
                  </button>
                
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span>0/280</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
