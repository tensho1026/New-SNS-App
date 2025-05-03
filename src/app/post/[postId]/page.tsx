"use client";
import { CreateCommentInput, createCommentSchema } from "@/lib/schemas/comment";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";

type UserInfo = {
  username: string;
  myself: string;
  imageUrl: string;

  posts: {
    id: string;
    authorId: string;
    content: string;
    image: string | null;
    createdAt: string;
    updateAt: string;

    _count: {
      like: number;
      comment: number;
    };
  }[];

  like: {
    id: string;
    postId: string;
    authorId: string;
    createdAt: string;
  }[];

  comment: {
    id: string;
    postId: string;
    authorId: string;
    content: string;
    createdAt: string;
  }[];

  _count: {
    posts: number;
    like: number;
  };
};

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

type Comment = {
  id: string;
  authorId: string;
  content: string;
  postId: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    imageUrl: string;
  };
};
export default function PostDetailPage() {
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [likeCount, setLikeCount] = useState<number>(0);
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
  const toggleLike = async () => {
    const res = await fetch("/api/toggleLike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, clerkId: user?.id }),
    });
    const data = await res.json();

    if (data.message === "Like Added") {
      setLikeCount((prev) => prev + 1);
    } else {
      setLikeCount((prev) => prev - 1);
    }
    getLikes();
  };

  const getLikes = useCallback(async () => {
    const res = await fetch(`/api/getLike/${postId}`);
    const data = await res.json();
    setLikeCount(data.count);
  }, [postId]);

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
  };

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch(`/api/getPostById/${postId}`);
      const data = await res.json();
      setPost(data);
    };

    fetchPost();
    getLikes();
  }, [postId, getLikes]);

  const fetchComment = useCallback(async () => {
    const res = await fetch(`/api/getComments/${postId}`);
    const data = await res.json();
    setComments(data);
  }, [postId]);

  useEffect(() => {
    fetchComment();
  }, [fetchComment]);

  const fetchMyUserInfo = useCallback(async () => {
    if (!user?.id) return;

    const res = await fetch(`/api/getUserInfo/${user.id}`);
    const data = await res.json();
    setMyUserInfo(data); // useState で myUserInfo を定義
  }, [user?.id]);
  useEffect(() => {
    fetchMyUserInfo();
  }, [fetchMyUserInfo]);

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
              <div className='h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
                <Image
                  src={post?.user.imageUrl || "/shoki.png"}
                  alt='User avatar'
                  width={100}
                  height={100}
                />
              </div>
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='font-bold text-gray-900 dark:text-white'>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        <p>{post?.user.username}</p>
                      </div>
                    </div>
                  </div>
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
                    <button
                      className='flex items-center text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400'
                      onClick={() => {
                        toggleLike();
                      }}
                    >
                      <Heart className='h-5 w-5 mr-1' />
                      <span>{likeCount}</span>
                    </button>
                    <button className='flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'>
                      <MessageCircle className='h-5 w-5 mr-1' />
                      <span>{comments.length}</span>
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

                      <span className='mx-1 text-gray-500 dark:text-gray-400'>
                        ·
                      </span>
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
          </div>
        </div>
      </main>
    </div>
  );
}
