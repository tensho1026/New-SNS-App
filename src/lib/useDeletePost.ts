export default function useDeletePost(updatePosts: () => void) {
  const deletePost = async (postId: string) => {
    const res = await fetch(`/api/delete-post/${postId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      updatePosts();
    } else {
      console.error("削除に失敗");
    }
  };

  return { deletePost };
}
