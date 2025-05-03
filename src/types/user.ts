export type UserInfo = {
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

    comment: {
      id: string;
      postId: string;
      authorId: string;
      content: string;
      createdAt: string;
      author: {
        username: string;
        imageUrl: string;
      };
    }[];
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
    author: {
      username: string;
      imageUrl: string;
    };
  }[];

  _count: {
    posts: number;
    like: number;
  };
};