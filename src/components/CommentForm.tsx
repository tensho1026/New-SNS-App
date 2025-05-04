import { CreateCommentInput, createCommentSchema } from "@/lib/schemas/comment";
import { UserInfo } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";

type CreateCommentFormInput = Omit<CreateCommentInput, "postId">;

type Props = {
  postId: string;
  clerkId: string;
  myUserInfo: UserInfo;
  fetchComment: () => Promise<void>;
  fetchPost: () => Promise<void>;
};

export default function CommentForm({
  postId,
  clerkId,
  myUserInfo,
  fetchComment,
  fetchPost,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCommentFormInput>({
    resolver: zodResolver(createCommentSchema.omit({ postId: true })),
  });

  const onSubmit = async (data: CreateCommentFormInput) => {
    await fetch("/api/create-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        postId,
        clerkId,
      }),
    });
    reset();
    await fetchComment();
    await fetchPost();
  };
  return (
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
  );
}
