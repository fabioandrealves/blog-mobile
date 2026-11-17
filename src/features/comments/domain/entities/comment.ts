export interface CommentAuthor {
  id: number;
  name: string;
}

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  user?: CommentAuthor;
}

export interface CreateCommentInput {
  postId: number;
  content: string;
}

export interface UpdateCommentInput {
  content: string;
}