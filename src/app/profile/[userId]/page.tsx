"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Camera, Edit, Heart, MessageCircle } from "lucide-react";
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
import { useState } from "react";

export default function ProfilePage() {
  const [open, setOpen] = useState(false);
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
                <div className='w-24 h-24 md:w-32 md:h-32'>
                  <Image
                    src='/shoki.png'
                    width={100}
                    height={100}
                    alt='プロフィール画像'
                  />
                  <p>ユーザー</p>
                </div>

                <div className='flex-1 text-center md:text-left space-y-2'>
                  <div className='flex flex-col md:flex-row md:items-center gap-2 justify-between'>
                    <h1 className='text-2xl font-bold'>username</h1>
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
                                  <Camera className='h-4 w-4' />
                                </Button>
                              </div>
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                              <label htmlFor='name' className='text-right'>
                                名前
                              </label>
                              <input id='name' className='col-span-3' />
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                              <label htmlFor='username' className='text-right'>
                                ユーザーID
                              </label>
                              <div className='col-span-3 flex items-center'>
                                <span className='mr-1 text-muted-foreground'>
                                  @
                                </span>
                                <input id='username' />
                              </div>
                            </div>

                            <div className='grid grid-cols-4 items-center gap-4'>
                              <label htmlFor='bio' className='text-right'>
                                自己紹介
                              </label>
                              <textarea
                                id='bio'
                                className='col-span-3'
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

                  <p className='text-muted-foreground'>@handle</p>
                  <p>bio</p>

                  <div className='flex gap-4 justify-center md:justify-start pt-2'>
                    <div>
                      <span className='font-bold'>42</span> 投稿
                    </div>
                    <div>
                      <span className='font-bold'>1.2k</span> フォロワー
                    </div>
                    <div>
                      <span className='font-bold'>567</span> フォロー中
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6'>
            <h2 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
              自分の投稿一覧
            </h2>

            {/* Posts */}
            {[1, 2].map((i) => (
                <div key={i} className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                  <div className="flex items-start space-x-3">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
                      <Image src="/shoki.png" alt="User avatar" width={100} height={100} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-bold text-gray-900 dark:text-white">ユーザー{i}</span>
                        <span>2025/05/01</span>
                      </div>
                      <p className="mt-1 text-gray-800 dark:text-gray-200">
                        これは投稿内容のサンプルです。
                      </p>
                      <div className="mt-3 rounded-lg overflow-hidden">
                        <Image src="/vercel.svg" alt="投稿画像" width={600} height={400}  />
                      </div>
                      <div className="mt-4 flex gap-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Heart size={16} /> <span>24</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={16} /> <span>5</span>
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
