export type Post = {
  id: string;
  authorId: string;
  content: string;
  image: string | null;
  createdAt: string;
  updateAt: string;
  user: {
    id: string;
    username: string;
    imageUrl: string;
  };
  _count: {
    comment: number;
    like: number;
  };
};
