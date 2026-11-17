import { useRef, useState } from 'react';

import {
  ActivityIndicator,
  Keyboard,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useAuth } from '@/src/features/auth/ui/contexts/auth-context';
import PasswordField from '@/src/features/auth/ui/components/password-field';
import { authStyles as styles } from '@/src/features/auth/ui/screens/auth.styles';
import { loginStyles } from '@/src/features/auth/ui/screens/login/login.styles';
import type { RootStackParamList } from '@/src/shared/navigation/root-stack-param-list';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth();

  const { width } = useWindowDimensions();
  const isSmallScreen = width < 380;

  const emailInputRef = useRef<TextInput>(null);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function updateField(
    field: 'email' | 'password',
    value: string,
  ) {
    setForm(current => ({
      ...current,
      [field]: value,
    }));

    if (error) setError('');
  }

  async function handleSubmit() {
    if (isLoading) return;

    setError('');

    const normalizedEmail = form.email.trim().toLowerCase();

    if (!normalizedEmail || !form.password) {
      setError('Informe seu e-mail e sua senha.');
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    try {
      await login({
        email: normalizedEmail,
        password: form.password,
      });

      navigation.replace('Home');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Não foi possível entrar na sua conta.',
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardAwareScrollView
      style={styles.page}
      contentContainerStyle={[
        styles.shell,
        isSmallScreen && styles.shellSmall,
      ]}
      enableOnAndroid
      enableAutomaticScroll
      extraScrollHeight={120}
      extraHeight={120}
      keyboardOpeningTime={0}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      showsVerticalScrollIndicator={false}
      enableResetScrollToCoords={false}
    >
      <View style={[
        styles.intro,
        isSmallScreen && styles.introSmall,
      ]}>
        <View
          style={styles.mark}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          <Text style={styles.markText}>B</Text>
        </View>

        <Text
          accessibilityRole="header"
          style={[
            styles.introTitle,
            isSmallScreen && styles.introTitleSmall,
          ]}
        >
          Aprenda, ensine e repita
        </Text>

        <Text style={styles.introDescription}>
          Entre na sua conta para continuar.
        </Text>
      </View>

      <View style={[
        styles.formWrap,
        isSmallScreen && styles.formWrapSmall,
      ]}>
        <Text
          accessibilityRole="header"
          style={styles.title}
        >
          Entrar
        </Text>

        <Text style={styles.subtitle}>
          Informe seus dados de acesso.
        </Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>
              E-mail
            </Text>

            <TextInput
              ref={emailInputRef}
              style={styles.input}
              value={form.email}
              onChangeText={value => updateField('email', value)}
              placeholder="seu@email.com"
              placeholderTextColor="#746B78"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="email"
              textContentType="emailAddress"
              editable={!isLoading}
              accessibilityLabel="E-mail"
              accessibilityHint="Digite o e-mail da sua conta."
              accessibilityState={{ disabled: isLoading }}
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => passwordInputRef.current?.focus()}
              allowFontScaling
            />
          </View>

          <View style={styles.field}>
            <PasswordField
              ref={passwordInputRef}
              value={form.password}
              onChange={value => updateField('password', value)}
              autoComplete="current-password"
              editable={!isLoading}
              returnKeyType="done"
              onSubmitEditing={() => void handleSubmit()}
            />
          </View>

          {error ? (
            <Text
              style={styles.error}
              accessibilityRole="alert"
              accessibilityLiveRegion="polite"
            >
              {error}
            </Text>
          ) : null}

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Entrar na conta"
            accessibilityState={{
              disabled: isLoading,
              busy: isLoading,
            }}
            style={({ pressed }) => [
              styles.submit,
              pressed && !isLoading && styles.submitPressed,
              isLoading && styles.submitDisabled,
            ]}
            onPress={() => void handleSubmit()}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator
                color="#FFFFFF"
                accessibilityLabel="Entrando na conta"
              />
            ) : (
              <Text style={styles.submitText}>
                Entrar
              </Text>
            )}
          </Pressable>
        </View>

        <View style={loginStyles.footer}>
          <Text style={styles.switchText}>
            Ainda não tem uma conta?
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Criar uma conta"
            accessibilityState={{ disabled: isLoading }}
            onPress={() => navigation.navigate('Register')}
            disabled={isLoading}
            style={styles.linkButton}
          >
            <Text style={styles.link}>
              Cadastre-se
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}