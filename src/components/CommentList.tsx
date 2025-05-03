// components/CommentList.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Comment } from "@/types/comment";

type Props = {
  comments: Comment[];
};

export default function CommentList({ comments }: Props) {
  return (
    <div className='space-y-4'>
      {comments.map((comment) => (
        <div
          key={comment.id}
          className='flex space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0'
        >
          <Link
            href={`/profile/${comment.author.id}`}
            className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'
          >
            <Image
              src={comment.author.imageUrl}
              alt='User avatar'
              width={100}
              height={100}
              className='w-full h-full object-cover'
            />
          </Link>
          <div className='flex-1'>
            <div className='flex items-center'>
              <Link
                href={`/profile/${comment.author.id}`}
                className='font-bold text-gray-500 dark:text-white hover:underline'
              >
                {comment.author.username}
              </Link>
              <span className='mx-1 text-gray-500 dark:text-gray-400'>·</span>
              <span className='text-sm text-gray-500 dark:text-gray-400'>
                {comment.createdAt}
              </span>
            </div>
            <p className='mt-1 text-gray-800 dark:text-gray-200'>
              {comment.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
