"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { User, Plus, MessageCircle, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  _count: { comment: number };
};

export default function HomePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const saveUserToDatabase = async () => {
      await fetch("/api/save-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user?.id,
          username: user?.fullName,
          imageUrl: user?.imageUrl,
        }),
      });
    };
    if (isLoaded && isSignedIn && user) {
      saveUserToDatabase();
    }
  }, [user, isLoaded, isSignedIn]);

  useEffect(() => {
    const getPosts = async () => {
      const res = await fetch("/api/getPosts", {});
      const data = await res.json();
      setPosts(data);
    };
    getPosts();
  }, []);

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}

      <header className='sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
          <div className='scale-120'>
            <UserButton />
          </div>

          <Link href='/' className='text-xl font-bold text-blue-500'>
            SocialApp
          </Link>
          <nav className='hidden md:flex items-center space-x-4'>
            <Link
              href={`/profile/${user?.id}`}
              className='p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
            >
              <User className='h-6 w-6' />
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6'>
        <div className='max-w-2xl mx-auto space-y-6'>
          {/* Create Post Button */}
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

          {/* Posts */}
          {posts.map((post) => (
            <div
              key={post.id}
              className='bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition-shadow'
            >
              <div className='flex items-start space-x-3'>
                <Link
                  href={`/profile/${post.user.id}`}
                  className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'
                >
                  <Image
                    src={post.user.imageUrl}
                    alt='User avatar'
                    width='100'
                    height='100'
                  />
                </Link>
                <div className='flex-1'>
                  <div className='flex items-center'>
                    <Link
                      href={`/profile/${post.user.id}`}
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
                          width='600'
                          height='400'
                          className='w-full h-auto'
                        />
                      </div>
                    )}
                  </Link>
                  <div className='mt-4 flex space-x-6 text-gray-500 dark:text-gray-400 text-sm'>
                    {/* いいねボタン */}
                    <button className='flex items-center space-x-1 hover:text-red-500 transition'>
                      <Heart size={18} />
                      <span>0</span>
                    </button>

                    {/* コメントボタン */}
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
          ))}
        </div>
      </main>
    </div>
  );
}
