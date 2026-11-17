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

import { container } from '@/src/di/container';
import PasswordField from '@/src/features/auth/ui/components/password-field';
import { authStyles as styles } from '@/src/features/auth/ui/screens/auth.styles';
import { registerStyles } from '@/src/features/auth/ui/screens/register/register.styles';
import type { RootStackParamList } from '@/src/shared/navigation/root-stack-param-list';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterScreen() {
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const navigation = useNavigation<NavigationProp>();
  const { width } = useWindowDimensions();

  const isSmallScreen = width < 380;

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function updateField(
    field: 'name' | 'email' | 'password',
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

    const normalizedName = form.name.trim();
    const normalizedEmail = form.email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !form.password) {
      setError('Preencha todos os campos para continuar.');
      return;
    }

    if (normalizedName.length < 2) {
      setError('Informe um nome com pelo menos 2 caracteres.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Informe um e-mail válido.');
      return;
    }

    if (form.password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    try {
      await container.auth.register.execute({
        name: normalizedName,
        email: normalizedEmail,
        password: form.password,
        role: 'student',
      });

      navigation.replace('Login');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Não foi possível criar a conta.',
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
          <Text style={styles.markText}>
            B
          </Text>
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
          Crie sua conta para começar.
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
          Criar conta
        </Text>

        <Text style={styles.subtitle}>
          Preencha seus dados para se cadastrar.
        </Text>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.label}>
              Nome
            </Text>

            <TextInput
              style={styles.input}
              value={form.name}
              onChangeText={value => updateField('name', value)}
              placeholder="Seu nome"
              placeholderTextColor="#746B78"
              autoCapitalize="words"
              autoComplete="name"
              textContentType="name"
              editable={!isLoading}
              accessibilityLabel="Nome completo"
              accessibilityHint="Digite seu nome completo."
              accessibilityState={{ disabled: isLoading }}
              returnKeyType="next"
              submitBehavior="submit"
              onSubmitEditing={() => emailInputRef.current?.focus()}
              allowFontScaling
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>
              E-mail
            </Text>

            <TextInput
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
              accessibilityHint="Digite seu endereço de e-mail."
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
              autoComplete="new-password"
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
            accessibilityLabel="Cadastrar nova conta"
            accessibilityHint="Cria uma conta de estudante."
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
                accessibilityLabel="Cadastrando conta"
              />
            ) : (
              <Text style={styles.submitText}>
                Cadastrar
              </Text>
            )}
          </Pressable>
        </View>

        <View style={registerStyles.footer}>
          <Text style={styles.switchText}>
            Já tem uma conta?
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Ir para a tela de login"
            accessibilityState={{ disabled: isLoading }}
            onPress={() => navigation.navigate('Login')}
            disabled={isLoading}
            style={styles.linkButton}
          >
            <Text style={styles.link}>
              Entrar
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
