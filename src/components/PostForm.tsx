"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImage } from "@/lib/uploadImage";
import { createPostSchema, CreatePostInput } from "@/lib/schemas/post";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { useImagePreview } from "@/lib/useImagePreview";

type Props = {
  clerkId: string;
  userImageUrl: string;
};

export default function PostForm({ clerkId, userImageUrl }: Props) {
  const { previewUrl, imageFile, handleImageChange, resetImage } =
    useImagePreview();

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
        clerkId,
      }),
    });

    reset();
    resetImage();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow p-4'>
        <div className='flex space-x-4'>
          <div className='h-12 w-12 rounded-full overflow-hidden'>
            {userImageUrl ? (
              <Image
                src={userImageUrl}
                alt='ユーザー画像'
                width={30}
                height={30}
                className='w-full h-full rounded-full object-cover'
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
                <p className='text-red-500 text-sm'>{errors.content.message}</p>
              )}

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
              <label className='hover:bg-blue-50 p-2 rounded-full transition-colors cursor-pointer text-blue-500'>
                <ImageIcon size={20} />
                <input
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleImageChange}
                />
              </label>

              <div className='text-sm text-gray-500 dark:text-gray-400'>
                {contentValue.length}/280
              </div>
            </div>

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
  );
}
