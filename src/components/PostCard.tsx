"use client";

import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/post";

type Props = {
  post: Post;
  onLike: (postId: string) => void;
};

export default function PostCard({ post, onLike }: Props) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition-shadow'>
      <div className='flex items-start space-x-3'>
        <Link
          href={`/post/${post.id}`}
          className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'
        >
          <Image
            src={post.user.imageUrl}
            alt='User avatar'
            width={100}
            height={100}
          />
        </Link>
        <div className='flex-1'>
          <div className='flex items-center'>
            <Link
              href={`/post/${post.id}`}
              className='font-bold text-gray-900 dark:text-white hover:underline'
            >
              {post.user.username}
            </Link>
            <span className='mx-2 text-sm text-gray-500 dark:text-gray-400'>
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>
          <Link
            href={`/post/${post.id}`}
            className='block mt-2 text-gray-800 dark:text-gray-200 hover:underline'
          >
            <p>{post.content}</p>
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
          </Link>
          <div className='mt-4 flex space-x-6 text-gray-500 dark:text-gray-400 text-sm'>
            <button
              className='flex items-center space-x-1 hover:text-red-500 transition'
              onClick={() => onLike(post.id)}
            >
              <Heart size={18} />
              <span>{post._count.like}</span>
            </button>

            <Link href={`/post/${post.id}`}>
              <button className='flex items-center space-x-1 hover:text-blue-500 transition'>
                <MessageCircle size={18} />
                <span>{post._count.comment}</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
