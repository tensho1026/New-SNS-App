"use client";

import PostCard from "@/components/PostCard";
import ToCreatePost from "@/components/ToCreatePostPage";
import useToggleLike from "@/lib/useToggleLIke";
import { Post } from "@/types/post";
import { UserButton, useUser } from "@clerk/nextjs";
import { User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  const updatePosts = async () => {
    const res = await fetch("/api/getPosts");
    const data = await res.json();
    setPosts(data);
  };

  const { toggleLike } = useToggleLike(user?.id, updatePosts);

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
          <ToCreatePost />

          {/* Posts */}
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => toggleLike(post.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
