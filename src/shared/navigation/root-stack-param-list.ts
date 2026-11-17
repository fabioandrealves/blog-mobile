export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Register: undefined;
  RegisterTeacher: undefined;
  MyPosts: undefined;
  CreatePost: { id?: number } | undefined;
  PostDetails: { id: number };
  Teachers: undefined;
  Students: undefined;
};
