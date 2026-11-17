
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider } from '@/src/features/auth/ui/contexts/auth-context';
import HomeScreen from './app/home-screen';
import LoginScreen from './src/features/auth/ui/screens/login/login';
import RegisterScreen from './src/features/auth/ui/screens/register/register';
import RegisterTeacherScreen from './src/features/auth/ui/screens/register/register-teacher';
import MyPostsScreen from '@/src/features/posts/presentation/screens/my-posts/my-posts-screen';
import CreatePostScreen from '@/src/features/posts/presentation/screens/my-posts/create-post/create-post-screen';
import PostDetailsScreen from '@/src/features/posts/presentation/screens/post-details/post-details-screen';
import { TeachersScreen } from '@/src/features/users/ui/screens/teachers-screen';
import { StudentsScreen } from '@/src/features/users/ui/screens/students-screen';

import type { RootStackParamList } from './src/shared/navigation/root-stack-param-list';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'Início' }}
          />

          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ title: 'Entrar' }}
          />

          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Criar conta' }}
          />

          <Stack.Screen
            name="RegisterTeacher"
            component={RegisterTeacherScreen}
            options={{ title: 'Cadastrar professor' }}
          />

          <Stack.Screen
            name="MyPosts"
            component={MyPostsScreen}
            options={{
              title: 'Meus Posts',
              headerShown: false
            }}
          />

          <Stack.Screen
            name="CreatePost"
            component={CreatePostScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PostDetails"
            component={PostDetailsScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Teachers"
            component={TeachersScreen}
            options={{title: 'Gerenciar professores'}}
            />

          <Stack.Screen
            name="Students"
            component={StudentsScreen}
            options={{title: 'Gerenciar estudantes'}}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
