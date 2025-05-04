"use client";

import { useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import PostForm from "@/components/PostForm";
import { useUserStore } from "@/store/userStore";
import { useCallback, useEffect } from "react";

export default function CreatePostPage() {
  const { userInfo, setUserInfo } = useUserStore();

  const { user } = useUser();

  const getUserInfo = useCallback(async () => {
    const res = await fetch(`/api/getUserInfo/${user?.id}`);
    const data = await res.json();
    setUserInfo(data);
  }, [user, setUserInfo]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  if (!user) return null;

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Header */}
      <header className='sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='container mx-auto px-4 py-3 flex items-center justify-between'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
            >
              <ArrowLeft className='h-5 w-5 text-gray-700 dark:text-gray-300' />
            </Link>
            <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
              新規投稿
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6'>
        <PostForm
          clerkId={user.id}
          userImageUrl={userInfo?.imageUrl || "/shoki.png"}
        />
      </main>
    </div>
  );
}
