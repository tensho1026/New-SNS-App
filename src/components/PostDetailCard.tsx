import { Post } from "@/types/post";
import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

type Props = {
  post: Post;
  onLike: (postId: string) => void;
};

export default function PostDetailCard({ post, onLike }: Props) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4'>
      <div className='flex items-start space-x-3'>
        <div className='h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
          <Image
            src={post.user.imageUrl || "/shoki.png"}
            alt='User avatar'
            width={100}
            height={100}
          />
        </div>
        <div className='flex-1'>
          <p className='font-bold text-gray-900 dark:text-white'>
            {post.user.username}
          </p>
          <p className='mt-2 text-gray-800 dark:text-gray-200 text-lg'>
            {post.content}
          </p>
          {post.image && (
            <div className='mt-3 rounded-xl overflow-hidden'>
              <Image
                src={post.image}
                alt='投稿画像'
                width={600}
                height={400}
                className='w-full h-auto'
              />
            </div>
          )}
          <div className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
            {post.createdAt}
          </div>

          <div className='flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex space-x-10'>
              <button
                className='flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                onClick={() => onLike(post.id)}
              >
                <Heart className='h-5 w-5 mr-1' />
                <span>{post._count.like}</span>
              </button>
              <div className='flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'>
                <MessageCircle className='h-5 w-5 mr-1' />
                <span>{post._count.comment}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
