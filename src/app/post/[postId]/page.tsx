"use client";
import { ArrowLeft, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
  id: string;
  authorId: string;
  content: string;
  image: string | null;
  createdAt: string;
  updateAt: string;
  user: {
    id: string;
    username: string;
    imageUrl: string;
  };
};

export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null);

  const params = useParams();
  const postId = params?.postId as string;

  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      const res = await fetch(`/api/getPostById/${postId}`);
      if (!res.ok) throw new Error("投稿取得に失敗しました");
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
  }, [postId]);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <header className='sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='container mx-auto px-4 py-3 flex items-center'>
          <Link
            href='/'
            className='mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <ArrowLeft className='h-5 w-5 text-gray-700 dark:text-gray-300' />
          </Link>
          <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
            投稿
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6'>
        <div className='max-w-2xl mx-auto'>
          {/* Post Detail */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-4'>
            <div className='flex items-start space-x-3'>
              <Link
                href='/profile/user1'
                className='h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'
              >
                <Image
                  src={post?.user.imageUrl || "/shoki.png"}
                  alt='User avatar'
                  width={100}
                  height={100}
                />
              </Link>
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <div>
                    <Link
                      href='/profile/user1'
                      className='font-bold text-gray-900 dark:text-white hover:underline'
                    ></Link>
                    <div className='text-sm text-gray-500 dark:text-gray-400'>
                      <p>{post?.user.username}</p>
                    </div>
                  </div>
                  <button className='p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'>
                    <MoreHorizontal className='h-5 w-5 text-gray-500 dark:text-gray-400' />
                  </button>
                </div>

                <p className='mt-2 text-gray-800 dark:text-gray-200 text-lg'>
                  {post?.content}
                </p>

                {post?.image && (
                  <div className='mt-3 rounded-xl overflow-hidden'>
                    <Image
                      src={post.image}
                      alt='投稿画像'
                      className='w-full h-auto'
                      width='600'
                      height='400'
                    />
                  </div>
                )}

                <div className='mt-4 text-sm text-gray-500 dark:text-gray-400'>
                  {post?.createdAt}
                </div>

                <div className='flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
                  <div className='flex space-x-10'>
                    <button className='flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'>
                      <Heart className='h-5 w-5 mr-1' />
                      <span>42</span>
                    </button>
                    <button className='flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'>
                      <MessageCircle className='h-5 w-5 mr-1' />
                      <span>12</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comments */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-4'>
            <h2 className='font-bold text-lg text-gray-900 dark:text-white mb-4'>
              コメント
            </h2>

            {/* Comment Input */}
            <div className='flex space-x-3 mb-6'>
              <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
                <Image
                  src='/vercel.svg'
                  alt='User avatar'
                  width={100}
                  height={100}
                />
              </div>
              <div className='flex-1'>
                <textarea
                  className='w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                  placeholder='コメントを追加...'
                  rows={2}
                ></textarea>
                <div className='flex justify-end mt-2'>
                  <button className='px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full text-sm'>
                    返信
                  </button>
                </div>
              </div>
            </div>

            {/* Comment List */}
            <div className='space-y-4'>
              {[1].map((comment) => (
                <div
                  key={comment}
                  className='flex space-x-3 pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0'
                >
                  <Link
                    href={`/profile/commenter${comment}`}
                    className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'
                  >
                    <Image
                      src='/vercel.svg'
                      alt='User avatar'
                      width={100}
                      height={100}
                    />
                  </Link>
                  <div className='flex-1'>
                    <div className='flex items-center'>
                      <Link
                        href={`/profile/commenter${comment}`}
                        className='font-bold text-gray-900 dark:text-white hover:underline'
                      >
                        コメントユーザー{comment}
                      </Link>

                      <span className='mx-1 text-gray-500 dark:text-gray-400'>
                        ·
                      </span>
                      <span className='text-sm text-gray-500 dark:text-gray-400'>
                        {comment}時間前
                      </span>
                    </div>

                    <p className='mt-1 text-gray-800 dark:text-gray-200'>
                      これはコメント{comment}
                      です。投稿に対するコメントがここに表示されます。
                      {comment === 2 &&
                        " 長めのコメント内容もこのように表示されます。"}
                    </p>

                    <div className='mt-2 flex space-x-4'>
                      <button className='flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'>
                        <Heart className='h-4 w-4 mr-1' />
                        <span className='text-sm'>{comment * 3}</span>
                      </button>
                      <button className='text-sm text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'>
                        返信
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
