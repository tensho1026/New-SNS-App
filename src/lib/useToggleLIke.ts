export default function useToggleLike(
  userId?: string,
  updatePosts?: () => void
) {
  const toggleLike = async (postId: string) => {
    if (!userId) return;

    await fetch("/api/toggleLike", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postId, clerkId: userId }),
    });

    if (updatePosts) {
      updatePosts();
    }
  };

  return { toggleLike };
}
