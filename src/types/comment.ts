export type Comment = {
  id: string;
  authorId: string;
  content: string;
  postId: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    imageUrl: string;
  };
};