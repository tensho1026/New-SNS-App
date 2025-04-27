"use client";

import { useUser } from "@clerk/nextjs";
import { Bell, Home, Mail, User, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function HomePage() {
  const { user, isLoaded, isSignedIn } = useUser();

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
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <header className='sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
          <Link href='/' className='text-xl font-bold text-blue-500'>
            SocialApp
          </Link>
          <nav className='hidden md:flex items-center space-x-4'>
            <Link
              href='/profile/user123'
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
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-4 flex items-center space-x-4'>
            <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
              <Image
                src='/file.svg'
                alt='User avatar'
                width='100'
                height='100'
              />
            </div>
            <Link
              href='/create-post'
              className='flex-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-full py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-600'
            >
              今何してる？
            </Link>
          </div>

          {/* Posts */}
          {[1, 2, 3].map((post) => (
            <div
              key={post}
              className='bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition-shadow'
            >
              <div className='flex items-start space-x-3'>
                <Link
                  href={`/profile/user${post}`}
                  className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'
                >
                  <Image
                    src='/file.svg'
                    alt='User avatar'
                    width='100'
                    height='100'
                  />
                </Link>
                <div className='flex-1'>
                  <div className='flex items-center'>
                    <Link
                      href={`/profile/user${post}`}
                      className='font-bold text-gray-900 dark:text-white hover:underline'
                    >
                      ユーザー{post}
                    </Link>
                    <span className='ml-2 text-sm text-gray-500 dark:text-gray-400'>
                      @user{post}
                    </span>
                    <span className='mx-1 text-gray-500 dark:text-gray-400'>
                      ·
                    </span>
                    <span className='text-sm text-gray-500 dark:text-gray-400'>
                      {post}時間前
                    </span>
                  </div>

                  <Link
                    href={`/post/${post}`}
                    className='block mt-2 text-gray-800 dark:text-gray-200 hover:underline'
                  >
                    <p>
                      これはサンプル投稿{post}
                      です。ここに投稿の内容が表示されます。
                      {post === 2 &&
                        " 長めの投稿内容もこのように表示されます。Next.jsでSNSアプリを作るのは楽しいですね！"}
                    </p>

                    {post === 1 && (
                      <div className='mt-3 rounded-xl overflow-hidden'>
                        <Image
                          src='/file.svg'
                          alt='投稿画像'
                          width='100'
                          height='100'
                          className='w-full h-auto'
                        />
                      </div>
                    )}
                  </Link>

                  <div className='mt-4 flex space-x-6'>
                    {/* いいね・コメントボタン */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className='md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-2 z-10'>
        <div className='flex justify-around'>
          <Link href='/' className='p-2 text-blue-500 dark:text-blue-400'>
            <Home className='h-6 w-6' />
          </Link>
          <Link
            href='#'
            className='p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            <Bell className='h-6 w-6' />
          </Link>
          <Link href='/create-post' className='p-0'>
            <div className='bg-blue-500 rounded-full p-2 -mt-5 border-4 border-white dark:border-gray-900'>
              <Plus className='h-6 w-6 text-white' />
            </div>
          </Link>
          <Link
            href='#'
            className='p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            <Mail className='h-6 w-6' />
          </Link>
          <Link
            href='/profile/user123'
            className='p-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400'
          >
            <User className='h-6 w-6' />
          </Link>
        </div>
      </div>
    </div>
  );
}
