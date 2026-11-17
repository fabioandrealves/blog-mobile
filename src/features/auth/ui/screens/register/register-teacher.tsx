import { useRef, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Keyboard,
  Platform,
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
import { useAuth } from '@/src/features/auth/ui/contexts/auth-context';
import type { RootStackParamList } from '@/src/shared/navigation/root-stack-param-list';
import { colors } from '@/src/shared/theme/colors';

import { teacherStyles as styles } from './register-teacher.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function RegisterTeacherScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user, isLoading: isAuthLoading } = useAuth();

  const { width, fontScale } = useWindowDimensions();

  const isSmallScreen = width < 380;
  const isLargeText = fontScale >= 1.3;

  const scrollRef = useRef<KeyboardAwareScrollView>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  async function handleRegisterTeacher() {
    if (isSubmitting) return;

    if (user?.role !== 'admin') {
      Alert.alert(
        'Acesso negado',
        'Somente administradores podem cadastrar professores.',
      );
      return;
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail || !password) {
      setFormError('Preencha todos os campos.');
      return;
    }

    if (normalizedName.length < 2) {
      setFormError('Informe um nome com pelo menos 2 caracteres.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setFormError('Informe um e-mail válido.');
      return;
    }

    if (password.length < 8) {
      setFormError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }

    setFormError('');
    Keyboard.dismiss();
    setIsSubmitting(true);

    try {
      const teacher = await container.auth.registerTeacher.execute({
        name: normalizedName,
        email: normalizedEmail,
        password,
      });

      setPassword('');

      Alert.alert(
        'Cadastro realizado',
        `O professor ${teacher.name} foi cadastrado com sucesso.`,
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home'),
          },
        ],
      );
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : 'Não foi possível cadastrar o professor. Tente novamente.',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isAuthLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator
          color={colors.primary}
          size="large"
          accessibilityLabel="Verificando sessão"
        />
        <Text style={styles.helperText}>
          Verificando sessão...
        </Text>
      </View>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <View style={styles.centered}>
        <Text
          accessibilityRole="header"
          style={styles.title}
        >
          Acesso restrito
        </Text>

        <Text style={styles.helperText}>
          Somente administradores podem cadastrar professores.
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar para o início"
          onPress={() => navigation.navigate('Home')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Voltar para o início
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAwareScrollView
      ref={scrollRef}
      style={styles.screen}
      contentContainerStyle={[
        styles.content,
        isSmallScreen && styles.contentSmall,
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
      <View style={styles.formHeader}>
        <Text
          accessibilityRole="header"
          style={[
            styles.title,
            isSmallScreen && styles.titleSmall,
            isLargeText && styles.titleLargeText,
          ]}
        >
          Cadastrar professor
        </Text>

        <Text style={styles.description}>
          Preencha os dados para criar uma conta de professor.
        </Text>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Nome completo
        </Text>

        <TextInput
          value={name}
          onChangeText={value => {
            setName(value);
            if (formError) setFormError('');
          }}
          placeholder="Digite o nome completo"
          placeholderTextColor={colors.textSecondary}
          autoCapitalize="words"
          autoCorrect={false}
          autoComplete="name"
          textContentType="name"
          editable={!isSubmitting}
          accessibilityLabel="Nome completo"
          accessibilityHint="Digite o nome completo do professor."
          accessibilityState={{ disabled: isSubmitting }}
          style={styles.input}
          returnKeyType="next"
          onSubmitEditing={() => emailInputRef.current?.focus()}
          blurOnSubmit={false}
          allowFontScaling
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          E-mail
        </Text>

        <TextInput
          ref={emailInputRef}
          value={email}
          onChangeText={value => {
            setEmail(value);
            if (formError) setFormError('');
          }}
          placeholder="professor@exemplo.com"
          placeholderTextColor={colors.textSecondary}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          editable={!isSubmitting}
          accessibilityLabel="E-mail"
          accessibilityHint="Digite o endereço de e-mail do professor."
          accessibilityState={{ disabled: isSubmitting }}
          style={styles.input}
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current?.focus()}
          blurOnSubmit={false}
          allowFontScaling
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>
          Senha
        </Text>

        <View style={styles.passwordContainer}>
          <TextInput
            ref={passwordInputRef}
            value={password}
            onChangeText={value => {
              setPassword(value);
              if (formError) setFormError('');
            }}
            placeholder="Mínimo de 8 caracteres"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="new-password"
            textContentType="newPassword"
            editable={!isSubmitting}
            accessibilityLabel="Senha"
            accessibilityHint="Digite uma senha com pelo menos oito caracteres."
            accessibilityState={{ disabled: isSubmitting }}
            style={styles.passwordInput}
            returnKeyType="done"
            onSubmitEditing={() => void handleRegisterTeacher()}
            allowFontScaling
          />

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              showPassword ? 'Ocultar senha' : 'Mostrar senha'
            }
            accessibilityState={{
              disabled: isSubmitting,
            }}
            disabled={isSubmitting}
            onPress={() => setShowPassword(current => !current)}
            style={styles.passwordToggle}
          >
            <Text style={styles.passwordToggleText}>
              {showPassword ? 'Ocultar' : 'Mostrar'}
            </Text>
          </Pressable>
        </View>
      </View>

      {formError ? (
        <Text
          style={styles.errorText}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {formError}
        </Text>
      ) : null}

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Cadastrar professor"
        accessibilityHint="Envia os dados para criar uma conta de professor."
        accessibilityState={{
          disabled: isSubmitting,
          busy: isSubmitting,
        }}
        disabled={isSubmitting}
        onPress={() => void handleRegisterTeacher()}
        style={({ pressed }) => [
          styles.button,
          pressed && !isSubmitting && styles.buttonPressed,
          isSubmitting && styles.buttonDisabled,
        ]}
      >
        {isSubmitting ? (
          <ActivityIndicator
            color="#FFFFFF"
            accessibilityLabel="Cadastrando professor"
          />
        ) : (
          <Text style={styles.buttonText}>
            Cadastrar professor
          </Text>
        )}
      </Pressable>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Cancelar cadastro"
        accessibilityState={{
          disabled: isSubmitting,
        }}
        disabled={isSubmitting}
        onPress={() => navigation.navigate('Home')}
        style={styles.cancelButton}
      >
        <Text style={styles.cancelButtonText}>
          Cancelar
        </Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

