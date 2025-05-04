"use client";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCallback } from "react";
import { Post } from "@/types/post";
import { Comment } from "@/types/comment";
import useToggleLike from "@/lib/useToggleLIke";
import PostDetailCard from "@/components/PostDetailCard";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
import { useUserStore } from "@/store/userStore";

export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const { userInfo, setUserInfo } = useUserStore();

  const params = useParams();
  const postId = params?.postId as string;
  const { user } = useUser();

  const fetchPost = useCallback(async () => {
    const res = await fetch(`/api/getPostById/${postId}`);
    const data = await res.json();
    setPost(data);
  }, [postId]);
  const { toggleLike } = useToggleLike(user?.id, fetchPost);

  const fetchComment = useCallback(async () => {
    const res = await fetch(`/api/getComments/${postId}`);
    const data = await res.json();
    setComments(data);
  }, [postId]);

  const fetchMyUserInfo = useCallback(async () => {
    if (!user?.id) return;

    const res = await fetch(`/api/getUserInfo/${user.id}`);
    const data = await res.json();
    setUserInfo(data);
  }, [user?.id,setUserInfo]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  useEffect(() => {
    fetchMyUserInfo();
  }, [fetchMyUserInfo]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

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

          {post && <PostDetailCard post={post} onLike={toggleLike} />}

          {/* Comments */}
          <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-4'>
            <h2 className='font-bold text-lg text-gray-900 dark:text-white mb-4'>
              コメント
            </h2>

            {/* Comment Input */}
            <div className='flex space-x-3 mb-6'>
              {userInfo && (
                <CommentForm
                  postId={postId}
                  clerkId={user?.id ?? ""}
                  myUserInfo={userInfo}
                  fetchComment={fetchComment}
                  fetchPost={fetchPost}
                />
              )}
            </div>

            {/* Comment List */}
            <div className='space-y-4'>
              <CommentList comments={comments} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
