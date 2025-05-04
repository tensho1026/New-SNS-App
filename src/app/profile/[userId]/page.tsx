"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateProfileInput, createProfileSchema } from "@/lib/schemas/prifile";
import { uploadImage } from "@/lib/uploadImage";
import { useImagePreview } from "@/lib/useImagePreview";
import { UserInfo } from "@/types/user";
import ProfilePostCard from "@/components/ProfilePostCard";
import useToggleLike from "@/lib/useToggleLIke";
import useDeletePost from "@/lib/useDeletePost";
import EditProfileDialog from "@/components/EditProfileDialog";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [userinfo, setUserInfo] = useState<UserInfo>();
  const [openPostId, setOpenPostId] = useState<string | null>(null);

  const [visibleCommentPostId, setVisibleCommentPostId] = useState<
    string | null
  >(null);

  const params = useParams();
  const userId = params?.userId as string;
  const {
    previewUrl,
    imageFile,
    handleImageChange,
    resetImage,
    setPreviewUrl,
  } = useImagePreview();


  const form = useForm<CreateProfileInput>({
    resolver: zodResolver(createProfileSchema),
  });
  
  const { reset } = form;
  

  const getUserInfo = useCallback(async () => {
    const res = await fetch(`/api/getUserInfo/${userId}`);
    const data = await res.json();
    setUserInfo(data);
  }, [userId]);
  const onSubmit = async (data: CreateProfileInput) => {
    let imageUrl: string | null = null;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
    }
    await fetch(`/api/create-profile/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        imageUrl,
      }),
    });
    await getUserInfo();

    reset();
    resetImage();
  };

  useEffect(() => {
    if (userinfo?.imageUrl && !previewUrl) {
      setPreviewUrl(userinfo.imageUrl);
    }
  }, [userinfo, previewUrl, setPreviewUrl]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const { toggleLike } = useToggleLike(userId, getUserInfo);
  const { deletePost } = useDeletePost(getUserInfo);
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      <header className='sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700'>
        <div className='container mx-auto px-4 py-3 flex items-center'>
          <Link
            href='/'
            className='mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
          >
            <ArrowLeft className='h-5 w-5 text-gray-700 dark:text-gray-300' />
          </Link>
          <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
            プロフィール
          </h1>
        </div>
      </header>

      <main className='container mx-auto px-4 py-10'>
        <div className='max-w-3xl mx-auto space-y-8'>
          <Card>
            <CardContent className='p-6'>
              <div className='flex flex-col md:flex-row gap-6 items-center md:items-start'>
                <div className='w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden'>
                  <Image
                    src={userinfo?.imageUrl || "/shoki.png"}
                    width={100}
                    height={100}
                    alt='プロフィール画像'
                    className='w-full h-full object-cover'
                  />
                </div>

                <div className='flex-1 text-center md:text-left space-y-2'>
                  <div className='flex flex-col md:flex-row md:items-center gap-2 justify-between'>
                    <h1 className='text-2xl font-bold'>{userinfo?.username}</h1>
                    <EditProfileDialog
                      open={open}
                      setOpen={setOpen}
                      onSubmit={onSubmit}
                      previewUrl={previewUrl}
                      handleImageChange={handleImageChange}
                      form={form}
                    />
                  </div>

                  <p>{userinfo?.myself || "自己紹介を書きましょう"}</p>

                  <div className='flex gap-4 justify-center md:justify-start pt-2'>
                    <div>
                      <span className='font-bold'>
                        {userinfo?._count?.posts ?? 0}
                      </span>
                      投稿
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-md py-6 px-4 space-y-6'>
            <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
              自分の投稿一覧
            </h2>
            {userinfo?.posts.map((post) => (
              <ProfilePostCard
                key={post.id}
                post={post}
                userinfo={userinfo}
                openPostId={openPostId}
                setOpenPostId={setOpenPostId}
                visibleCommentPostId={visibleCommentPostId}
                setVisibleCommentPostId={setVisibleCommentPostId}
                onLike={toggleLike}
                onDelete={deletePost}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
