import { UserInfo } from "@/types/user";
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
import { Heart, MessageCircle, Trash } from "lucide-react";
import Image from "next/image";

type Props = {
  post: UserInfo["posts"][number];
  userinfo: UserInfo;
  openPostId: string | null;
  setOpenPostId: (id: string | null) => void;
  visibleCommentPostId: string | null;
  setVisibleCommentPostId: (id: string | null) => void;
  onLike: (postId: string) => void;
  onDelete: (postId: string) => void;
};

export default function ProfilePostCard({
  post,
  userinfo,
  openPostId,
  setOpenPostId,
  visibleCommentPostId,
  setVisibleCommentPostId,
  onLike,
  onDelete,
}: Props) {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition-shadow'>
      <div className='flex items-start space-x-3'>
        <div className='h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden'>
          <Image
            src={userinfo.imageUrl}
            alt='User avatar'
            width={100}
            height={100}
            className='w-full h-full object-cover'
          />
        </div>
        <div className='flex-1 relative'>
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

          <Dialog
            open={openPostId === post.id}
            onOpenChange={(open) => setOpenPostId(open ? post.id : null)}
          >
            <DialogTrigger asChild>
              <div className='absolute top-0 right-0 text-gray-400 hover:text-red-500 transition cursor-pointer'>
                <Trash size={18} />
              </div>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>投稿の削除</DialogTitle>
                <DialogDescription>
                  この投稿を削除してもよろしいですか？この操作は元に戻せません。
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className='flex justify-end gap-2'>
                <Button variant='outline' onClick={() => setOpenPostId(null)}>
                  キャンセル
                </Button>
                <Button variant='destructive' onClick={() => onDelete(post.id)}>
                  削除する
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

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
            <div
              className='flex items-center space-x-1 hover:text-red-500 transition'
              onClick={() => onLike(post.id)}
            >
              <Heart size={18} />
              <span>{post._count.like}</span>
            </div>
            <div
              className='flex items-center space-x-1 hover:text-blue-500 transition'
              onClick={() =>
                setVisibleCommentPostId(
                  visibleCommentPostId === post.id ? null : post.id
                )
              }
            >
              <MessageCircle size={18} />
              <span>{post._count.comment}</span>
            </div>
          </div>

          {visibleCommentPostId === post.id && (
            <div className='mt-3 border-t pt-3 space-y-2 text-sm text-gray-800 dark:text-gray-200'>
              {post.comment?.length === 0 ? (
                <p>コメントはまだありません</p>
              ) : (
                post.comment.map((comment) => (
                  <div
                    key={comment.id}
                    className='bg-gray-50 dark:bg-gray-700 p-2 rounded flex items-start space-x-3'
                  >
                    <Image
                      src={comment.author.imageUrl || "/shoki.png"}
                      alt='アイコン'
                      width={32}
                      height={32}
                      className='rounded-full object-cover w-8 h-8'
                    />
                    <div>
                      <div className='font-bold text-sm'>
                        {comment.author.username}
                      </div>
                      <p>{comment.content}</p>
                      <span className='text-xs text-gray-500'>
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
