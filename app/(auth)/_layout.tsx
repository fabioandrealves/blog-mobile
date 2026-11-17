
import { Stack } from 'expo-router';
import { authLayoutStyles as styles } from './_layout.styles';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: styles.header,
        headerTintColor: '#432818',
        headerTitleStyle: styles.headerTitle,
        contentStyle: styles.screen,
      }}
    >
      <Stack.Screen
        name="login"
        options={{ title: 'Entrar' }}
      />

      <Stack.Screen
        name="register"
        options={{ title: 'Criar conta' }}
      />

      <Stack.Screen
        name="register/teacher"
        options={{ title: 'Cadastrar professor' }}
      />
    </Stack>
  );
}
