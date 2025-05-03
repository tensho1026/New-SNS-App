"use client";
import { CreateCommentInput, createCommentSchema } from "@/lib/schemas/comment";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { UserInfo } from "@/types/user";
import { Post } from "@/types/post";
import { Comment } from "@/types/comment";
import useToggleLike from "@/lib/useToggleLIke";
import PostDetailCard from "@/components/PostDetailCard";
import CommentList from "@/components/CommentList";

export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [myUserInfo, setMyUserInfo] = useState<UserInfo | null>(null);

  const params = useParams();
  const postId = params?.postId as string;
  const { user } = useUser();
  type CreateCommentFormInput = Omit<CreateCommentInput, "postId">;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentFormInput>({
    resolver: zodResolver(createCommentSchema.omit({ postId: true })),
  });
  const fetchPost = useCallback(async () => {
    const res = await fetch(`/api/getPostById/${postId}`);
    const data = await res.json();
    setPost(data);
  }, [postId]);
  const { toggleLike } = useToggleLike(user?.id, fetchPost);

  const onSubmit = async (data: CreateCommentFormInput) => {
    await fetch("/api/create-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        postId,
        clerkId: user?.id,
      }),
    });
    reset();
    await fetchComment();
    await fetchPost();
  };

  const fetchComment = useCallback(async () => {
    const res = await fetch(`/api/getComments/${postId}`);
    const data = await res.json();
    setComments(data);
  }, [postId]);

  const fetchMyUserInfo = useCallback(async () => {
    if (!user?.id) return;

    const res = await fetch(`/api/getUserInfo/${user.id}`);
    const data = await res.json();
    setMyUserInfo(data);
  }, [user?.id]);

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
              <form onSubmit={handleSubmit(onSubmit)} className='mb-6 w-full'>
                <div className='flex space-x-3'>
                  <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
                    <Image
                      src={myUserInfo?.imageUrl || "/shoki.png"}
                      alt='User avatar'
                      width={100}
                      height={100}
                      className='w-full h-full object-cover'
                    />
                  </div>
                  <div className='flex-1'>
                    <textarea
                      {...register("content")}
                      className='w-full border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500'
                      placeholder='コメントを追加...'
                      rows={2}
                    />
                    {errors.content && (
                      <p className='text-red-500 text-sm mt-1'>
                        {errors.content.message}
                      </p>
                    )}
                    <div className='flex justify-end mt-2'>
                      <button
                        type='submit'
                        className='px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full text-sm'
                      >
                        返信
                      </button>
                    </div>
                  </div>
                </div>
              </form>
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
