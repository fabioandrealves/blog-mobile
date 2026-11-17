export interface PostAuthor {
  id: number;
  name: string;
  email: string;
  role: 'teacher' | 'student' | 'admin';
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user?: PostAuthor;
}

export interface CreatePostInput {
  title: string;
  content: string;
}

export interface UpdatePostInput {
  title?: string;
  content?: string;
}