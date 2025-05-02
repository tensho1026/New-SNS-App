"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Edit, Heart, ImageIcon, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

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

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
  const [userinfo, setUserInfo] = useState<UserInfo>();

  const params = useParams();
  const userId = params?.userId as string;

  const getUserInfo = useCallback(async () => {
    const res = await fetch(`/api/getUserInfo/${userId}`);
    const data = await res.json();
    setUserInfo(data);
  }, [userId]);

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);
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
                    <Dialog open={open} onOpenChange={setOpen}>
                      <DialogTrigger asChild>
                        <Button variant='outline' size='sm' className='gap-1'>
                          <Edit className='h-4 w-4' />
                          プロフィール編集
                        </Button>
                      </DialogTrigger>
                      <DialogContent className='sm:max-w-[425px]'>
                        <form>
                          <DialogHeader>
                            <DialogTitle>プロフィール編集</DialogTitle>
                            <DialogDescription>
                              プロフィール情報を更新します。完了したら保存ボタンをクリックしてください。
                            </DialogDescription>
                          </DialogHeader>
                          <div className='grid gap-4 py-4'>
                            <div className='flex justify-center'>
                              <div className='relative'>
                                <div className='w-24 h-24 md:w-32 md:h-32'>
                                  <Image
                                    src='/shoki.png'
                                    width={100}
                                    height={100}
                                    alt='プロフィール画像'
                                  />
                                  <p>ユーザー</p>
                                </div>
                                <Button
                                  size='icon'
                                  variant='secondary'
                                  className='absolute bottom-0 right-0 rounded-full w-8 h-8'
                                >
                                  <ImageIcon className='h-4 w-4' />
                                </Button>
                              </div>
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                              <label htmlFor='name' className='text-right '>
                                名前
                              </label>
                              <input
                                id='name'
                                className='col-span-3 border-2'
                              />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                              <label htmlFor='bio' className='text-right'>
                                自己紹介
                              </label>
                              <textarea
                                id='bio'
                                className='col-span-3 border-2'
                                rows={3}
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type='submit'>保存する</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
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
            {/* Posts */}.
            {userinfo?.posts.map((post) => (
              <div
                key={post.id}
                className='bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition-shadow'
              >
                <div className='flex items-start space-x-3'>
                  <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
                    <Image
                      src={userinfo.imageUrl}
                      alt='User avatar'
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center'>
                      <span className='font-bold text-gray-900 dark:text-white'>
                        {userinfo.username}
                      </span>
                      <span className='mx-2 text-sm text-gray-500 dark:text-gray-400'>
                        {new Date(post.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <p className='block mt-2 text-gray-800 dark:text-gray-200'>
                      {post.content}
                    </p>

                    {post.image && (
                      <div className='mt-3 rounded-xl overflow-hidden'>
                        <Image
                          src={post.image}
                          alt='投稿画像'
                          width={600}
                          height={400}
                          className='w-full h-auto'
                        />
                      </div>
                    )}

                    <div className='mt-4 flex space-x-6 text-gray-500 dark:text-gray-400 text-sm'>
                      <div className='flex items-center space-x-1 hover:text-red-500 transition'>
                        <Heart size={18} />
                        <span>{post._count.like}</span>
                      </div>

                      <div className='flex items-center space-x-1 hover:text-blue-500 transition'>
                        <MessageCircle size={18} />
                        <span>{post._count.comment}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
