import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateProfileInput } from "@/lib/schemas/prifile";
import { Button } from "./ui/button";
import Image from "next/image";
import { Edit, ImageIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSubmit: (data: CreateProfileInput) => void;
  previewUrl: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  form: UseFormReturn<CreateProfileInput>;
};

export default function EditProfileDialog({
  open,
  setOpen,
  onSubmit,
  previewUrl,
  handleImageChange,
  form,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='gap-1'>
          <Edit className='h-4 w-4' />
          プロフィール編集
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>プロフィール編集</DialogTitle>
            <DialogDescription>
              プロフィール情報を更新します。完了したら保存ボタンをクリックしてください。
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <div className='flex justify-center'>
              <div className='relative'>
                <div className='w-24 h-24 md:w-32 md:h-32 '>
                  <Image
                    src={previewUrl || "/shoki.png"}
                    width={90}
                    height={90}
                    alt='プロフィール画像'
                    className='rounded-full object-cover w-full h-full'
                  />
                </div>
                <label className='absolute bottom-[-10px] right-[-20px] rounded-full w-8 h-8 bg-gray-200 hover:bg-gray-300 flex items-center justify-center cursor-pointer'>
                  <ImageIcon className='h-4 w-4 text-gray-700' />
                  <input
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='name' className='text-right '>
                名前
              </label>
              <input
                {...form.register("username")}
                className='col-span-3 border-2'
              />
              {form.formState.errors.username && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors.username.message}
                </p>
              )}
            </div>

            <div className='grid grid-cols-4 items-center gap-4'>
              <label htmlFor='bio' className='text-right'>
                自己紹介
              </label>
              <textarea
                {...form.register("content")}
                className='col-span-3 border-2'
                rows={3}
              />
              {form.formState.errors.content && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors.content.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type='submit'>保存する</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
