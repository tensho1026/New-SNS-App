"use client";

import { uploadImage } from "@/lib/uploadImage";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPostSchema, CreatePostInput } from "@/lib/schemas/post";

export default function CreatePostPage() {
  const { user } = useUser();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<CreatePostInput>({
    resolver: zodResolver(createPostSchema),
  });

  const contentValue = watch("content") || "";

  const onSubmit = async (data: CreatePostInput) => {
    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }

    await fetch("/api/create-post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        imageUrl: imageUrl || undefined,
        clerkId: user?.id,
      }),
    });

    reset();
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setImageFile(file);
    }
  };

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
          {/* 投稿ボタンはformの外に置かず、formの中にtype="submit"で置く */}
        </div>
      </header>

      {/* Main Content */}
      <main className='container mx-auto px-4 py-6'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-4'>
            <div className='flex space-x-4'>
              <div className='h-12 w-12 rounded-full  overflow-hidden'>
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt='ユーザー画像'
                    width={40}
                    height={40}
                    className='rounded-full text-center'
                  />
                ) : (
                  <div className='h-10 w-10 rounded-full bg-gray-300' />
                )}
              </div>
              <div className='flex-1'>
                <div className='mb-4'>
                  <textarea
                    {...register("content")}
                    placeholder='今何してる？'
                    rows={5}
                    className='w-full border-0 bg-transparent text-gray-900 dark:text-white text-lg placeholder-gray-500 dark:placeholder-gray-400 focus:ring-0 focus:outline-none resize-none'
                  />
                  {errors.content && (
                    <p className='text-red-500 text-sm'>
                      {errors.content.message}
                    </p>
                  )}

                  {/* プレビュー表示（画像が選択されたときだけ） */}
                  {previewUrl && (
                    <div className='mt-4 mb-2 flex justify-center'>
                      <Image
                        src={previewUrl}
                        alt='プレビュー'
                        className='w-full rounded'
                        width={400}
                        height={300}
                      />
                    </div>
                  )}
                </div>

                <div className='flex justify-between items-center border-t border-gray-200 dark:border-gray-700 pt-3'>
                  <div className='flex space-x-4'>
                    <label className='hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer text-blue-500'>
                      <ImageIcon size={20} />
                      <input
                        type='file'
                        accept='image/*'
                        className='hidden'
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                  {/* 文字数カウント */}
                  <div className='text-sm text-gray-500 dark:text-gray-400'>
                    {/* ここはcontentの長さではなく、react-hook-form管理だからバリデーション側で制御 */}
                    {contentValue.length}/280
                  </div>
                </div>

                {/* 送信ボタン */}
                <div className='flex justify-end mt-4'>
                  <button
                    type='submit'
                    className='px-4 py-1.5 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-full text-sm'
                  >
                    投稿する
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}
