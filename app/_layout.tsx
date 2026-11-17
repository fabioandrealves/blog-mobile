import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { colors } from '@/src/shared/theme/colors';
import { rootLayoutStyles } from './_layout.styles';

export default function RootLayout() {
  return (
    <>
      <StatusBar
        style="dark"
        backgroundColor={colors.surface}
      />

      <Stack screenOptions={rootLayoutStyles.screenOptions}>
        <Stack.Screen
          name="index"
          options={{
            title: 'Aprenda, ensine e repita',
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="posts/[id]"
          options={{
            title: 'Detalhes do post',
            headerBackTitle: 'Voltar',
          }}
        />

        <Stack.Screen
          name="(auth)/login"
          options={{
            title: 'Entrar',
          }}
        />

        <Stack.Screen
          name="(auth)/register"
          options={{
            title: 'Criar conta',
          }}
        />

        <Stack.Screen
          name="create"
          options={{
            title: 'Novo post',
          }}
        />
      </Stack>
    </>
  );
}
