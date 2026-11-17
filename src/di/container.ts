
import Config from 'react-native-config';

import { FetchHttpClient } from '@/src/core/http/fetch-http-client';
import { SecureTokenStorage } from '@/src/core/storage/secure-token-storage';
import { commentApiContract } from '@/src/features/comments/data/repositories/comment-api-contract';

import { AuthRepositoryImpl } from '@/src/features/auth/data/repositories/auth-repository-impl';
import { PostRepositoryImpl } from '@/src/features/posts/data/repositories/post-repository-impl';
import { CommentRepositoryImpl } from '@/src/features/comments/data/repositories/comment-repository-impl';
import { UserManagementRepositoryImpl } from '@/src/features/users/data/repositories/user-management-repository-impl';

import { LoginUseCase } from '@/src/features/auth/application/use-cases/login';
import { RegisterUseCase } from '@/src/features/auth/application/use-cases/register';
import { RegisterTeacherUseCase } from '@/src/features/auth/application/use-cases/register-teacher';
import { GetCurrentUserUseCase } from '@/src/features/auth/application/use-cases/get-current-user';
import { LogoutUseCase } from '@/src/features/auth/application/use-cases/logout';
import { ListPosts } from '@/src/features/posts/application/use-cases/list-posts';
import { GetPostById } from '@/src/features/posts/application/use-cases/get-post-by-id';
import { ListMyPosts } from '@/src/features/posts/application/use-cases/list-my-posts';
import { CreatePost } from '@/src/features/posts/application/use-cases/create-post';
import { UpdatePost } from '@/src/features/posts/application/use-cases/update-post';
import { DeletePost } from '@/src/features/posts/application/use-cases/delete-post';
import { CreateComment } from '@/src/features/comments/application/use-cases/create-comment';
import { ListComments } from '@/src/features/comments/application/use-cases/list-comments';
import { UpdateComment } from '@/src/features/comments/application/use-cases/update-comment';
import { DeleteComment } from '@/src/features/comments/application/use-cases/delete-comment';
import { ListTeachers } from '@/src/features/users/application/use-cases/list-teachers';
import { UpdateTeacher } from '@/src/features/users/application/use-cases/update-teacher';
import { DeleteTeacher } from '@/src/features/users/application/use-cases/delete-teacher';
import { ListStudents } from '@/src/features/users/application/use-cases/list-students';
import { UpdateStudent } from '@/src/features/users/application/use-cases/update-student';
import { DeleteStudent } from '@/src/features/users/application/use-cases/delete-student';

const apiUrl = Config.API_URL?.replace(/\/+$/, '');

if (!apiUrl) {
  throw new Error('A variável API_URL não foi configurada.');
}

const tokenStorage = new SecureTokenStorage();

const httpClient = new FetchHttpClient(
  apiUrl,
  tokenStorage,
);

const authRepository = new AuthRepositoryImpl(httpClient);
const postRepository = new PostRepositoryImpl(httpClient);
const commentRepository = new CommentRepositoryImpl(
  httpClient,
  commentApiContract,
);
const userManagementRepository = new UserManagementRepositoryImpl(httpClient);

export const container = {
  auth: {
    login: new LoginUseCase(
      authRepository,
      tokenStorage,
    ),
    register: new RegisterUseCase(authRepository),
    registerTeacher: new RegisterTeacherUseCase(authRepository),
    logout: new LogoutUseCase(tokenStorage),
    getCurrentUser: new GetCurrentUserUseCase(authRepository),
  },
  posts: {
      listPosts: new ListPosts(postRepository),
      getPostById: new GetPostById(postRepository),
      listMyPosts: new ListMyPosts(postRepository),
      createPost: new CreatePost(postRepository),
      updatePost: new UpdatePost(postRepository),
      deletePost: new DeletePost(postRepository),
  },
  comments:{
      listComments: new ListComments(commentRepository),
      createComment: new CreateComment(commentRepository),
      updateComment: new UpdateComment(commentRepository),
      deleteComment: new DeleteComment(commentRepository),
  },
  users: {
      repository: userManagementRepository,
      listTeachers: new ListTeachers(userManagementRepository),
      updateTeacher: new UpdateTeacher(userManagementRepository),
      deleteTeacher: new DeleteTeacher(userManagementRepository),
      listStudents: new ListStudents(userManagementRepository),
      updateStudent: new UpdateStudent(userManagementRepository),
      deleteStudent: new DeleteStudent(userManagementRepository),
    },
};

export const postDependencies = container.posts;
export const commentDependencies = container.comments;
export const userManagementDependencies = container.users;