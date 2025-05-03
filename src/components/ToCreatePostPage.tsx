import { Plus } from "lucide-react";
import Link from "next/link";

export default function ToCreatePost() {
  return (
    <div className='bg-white rounded-xl shadow p-4 flex items-center space-x-4'>
      <Link
        href='/create-post'
        className='flex items-center space-x-4 group w-full'
      >
        <div className='h-10 w-10 flex items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600 transition'>
          <Plus size={20} className='text-white' />
        </div>
        <span className='text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition'>
          今何してる？
        </span>
      </Link>
    </div>
  );
}
