
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import type { RouteProp } from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { container } from '@/src/di/container';

import { useAuth } from '@/src/features/auth/ui/contexts/auth-context';

import type {
  RootStackParamList,
} from '@/src/shared/navigation/root-stack-param-list';

import {
  createPostStyles as styles,
} from './create-post.styles';

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type CreatePostRoute =
  RouteProp<RootStackParamList, 'CreatePost'>;

type EditorMode = 'edit' | 'preview';

const MAX_TITLE_LENGTH = 150;

export default function CreatePostScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<CreatePostRoute>();

  const { user, isLoading: isAuthLoading } = useAuth();

  const { width } = useWindowDimensions();

  const isCompactScreen = width < 360;

  const editingPostId = route.params?.id;
  const isEditing = editingPostId !== undefined;

  const contentInputRef = useRef<TextInput>(null);
  const publishingRef = useRef(false);

  const [mode, setMode] = useState<EditorMode>('edit');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [initialTitle, setInitialTitle] = useState('');
  const [initialContent, setInitialContent] = useState('');

  const [isPublishing, setIsPublishing] = useState(false);
  const [isLoadingPost, setIsLoadingPost] = useState(isEditing);

  const [canEditLoadedPost, setCanEditLoadedPost] =
    useState(false);

  const [error, setError] = useState('');

  const trimmedTitle = title.trim();
  const trimmedContent = content.trim();

  const hasUnsavedChanges = isEditing
    ? title !== initialTitle || content !== initialContent
    : trimmedTitle.length > 0 || trimmedContent.length > 0;

  const canPublish =
    trimmedTitle.length > 0 &&
    trimmedContent.length > 0 &&
    !isPublishing &&
    !isLoadingPost &&
    !isAuthLoading &&
    user?.role === 'teacher' &&
    (!isEditing || canEditLoadedPost);

  useEffect(() => {
    let active = true;

    setCanEditLoadedPost(false);
    setError('');
    setMode('edit');

    if (!isEditing || editingPostId === undefined) {
      setTitle('');
      setContent('');
      setInitialTitle('');
      setInitialContent('');
      setIsLoadingPost(false);

      return () => {
        active = false;
      };
    }

    if (isAuthLoading) {
      setIsLoadingPost(true);

      return () => {
        active = false;
      };
    }

    if (user?.role !== 'teacher') {
      setIsLoadingPost(false);
      setError('Apenas professores podem editar publicações.');

      return () => {
        active = false;
      };
    }

    const loadPost = async () => {
      try {
        setIsLoadingPost(true);

        const post =
          await container.posts.getPostById.execute(
            editingPostId,
          );

        if (!active) return;

        if (Number(post.userId) !== Number(user.id)) {
          setError(
            'Você não tem permissão para editar esta publicação.',
          );
          return;
        }

        setTitle(post.title);
        setContent(post.content);

        setInitialTitle(post.title);
        setInitialContent(post.content);

        setCanEditLoadedPost(true);
      } catch (caughtError) {
        if (!active) return;

        setError(
          caughtError instanceof Error
            ? caughtError.message
            : 'Não foi possível carregar a publicação.',
        );
      } finally {
        if (active) {
          setIsLoadingPost(false);
        }
      }
    };

    void loadPost();

    return () => {
      active = false;
    };
  }, [
    editingPostId,
    isEditing,
    isAuthLoading,
    user?.id,
    user?.role,
  ]);

  const handleChangeTitle = useCallback((value: string) => {
    setTitle(value);
    setError('');
  }, []);

  const handleChangeContent = useCallback((value: string) => {
    setContent(value);
    setError('');
  }, []);

  const handleChangeMode = useCallback(
    (nextMode: EditorMode) => {
      if (isPublishing || isLoadingPost) return;

      Keyboard.dismiss();
      setMode(nextMode);
    },
    [isPublishing, isLoadingPost],
  );

  const handleCancel = useCallback(() => {
    if (isPublishing) return;

    Keyboard.dismiss();

    const goBack = () => {
      if (isEditing && editingPostId !== undefined) {
        if (navigation.canGoBack()) {
          navigation.goBack();
        } else {
          navigation.navigate('PostDetails', {
            id: editingPostId,
          });
        }
      } else if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('MyPosts');
      }
    };

    if (!hasUnsavedChanges) {
      goBack();
      return;
    }

    Alert.alert(
      'Descartar alterações?',
      'As alterações realizadas serão perdidas.',
      [
        {
          text: 'Continuar editando',
          style: 'cancel',
        },
        {
          text: 'Descartar',
          style: 'destructive',
          onPress: goBack,
        },
      ],
    );
  }, [
    isPublishing,
    hasUnsavedChanges,
    isEditing,
    editingPostId,
    navigation,
  ]);

  const handlePublish = useCallback(async () => {
    if (
      publishingRef.current ||
      !canPublish
    ) {
      return;
    }

    publishingRef.current = true;

    setIsPublishing(true);
    setError('');

    Keyboard.dismiss();

    try {
      const input = {
        title: trimmedTitle,
        content: trimmedContent,
      };

      const post =
        isEditing && editingPostId !== undefined
          ? await container.posts.updatePost.execute(
              editingPostId,
              input,
            )
          : await container.posts.createPost.execute(
              input,
            );

      Alert.alert(
        isEditing
          ? 'Post atualizado!'
          : 'Post publicado!',
        isEditing
          ? 'As alterações foram salvas com sucesso.'
          : 'Sua publicação foi criada com sucesso.',
        [
          {
            text: 'Ver publicação',
            onPress: () => {
              navigation.replace('PostDetails', {
                id: post.id,
              });
            },
          },
        ],
      );
    } catch (caughtError) {
      console.error(
        '[CreatePostScreen] Erro ao salvar publicação:',
        caughtError,
      );

      const message =
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível salvar a publicação.';

      setError(message);

      Alert.alert(
        'Erro ao salvar',
        message,
      );
    } finally {
      publishingRef.current = false;
      setIsPublishing(false);
    }
  }, [
    canPublish,
    isEditing,
    editingPostId,
    trimmedTitle,
    trimmedContent,
    navigation,
  ]);

  if (isAuthLoading || isLoadingPost) {
    return (
      <View style={styles.restrictedContainer}>
        <ActivityIndicator
          size="large"
          color="#711C1B"
        />

        <Text style={styles.restrictedDescription}>
          {isAuthLoading
            ? 'Verificando sessão...'
            : 'Carregando publicação...'}
        </Text>
      </View>
    );
  }

  if (user?.role !== 'teacher') {
    return (
      <View style={styles.restrictedContainer}>
        <Text
          accessibilityRole="header"
          style={styles.restrictedTitle}
        >
          Acesso restrito
        </Text>

        <Text style={styles.restrictedDescription}>
          Apenas professores podem criar e editar publicações.
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('Home')}
          style={styles.restrictedButton}
        >
          <Text style={styles.publishButtonText}>
            Voltar ao início
          </Text>
        </Pressable>
      </View>
    );
  }

  if (isEditing && !canEditLoadedPost) {
    return (
      <View style={styles.restrictedContainer}>
        <Text
          accessibilityRole="header"
          style={styles.restrictedTitle}
        >
          Não foi possível editar
        </Text>

        <Text style={styles.restrictedDescription}>
          {error ||
            'Você não tem permissão para editar esta publicação.'}
        </Text>

        <Pressable
          accessibilityRole="button"
          onPress={() => navigation.navigate('MyPosts')}
          style={styles.restrictedButton}
        >
          <Text style={styles.publishButtonText}>
            Voltar aos meus posts
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : undefined
      }
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isEditing
                ? 'Voltar para publicação'
                : 'Voltar para meus posts'
            }
            accessibilityState={{
              disabled: isPublishing,
            }}
            onPress={handleCancel}
            disabled={isPublishing}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.buttonPressed,
            ]}
            hitSlop={8}
          >
            <Text style={styles.backButtonText}>
              ‹ {isEditing ? 'Voltar ao post' : 'Meus posts'}
            </Text>
          </Pressable>

          <View style={styles.hero}>
            <Text style={styles.heroEyebrow}>
              ESTÚDIO DO PROFESSOR
            </Text>

            <Text
              accessibilityRole="header"
              style={[
                styles.heroTitle,
                isCompactScreen &&
                  styles.heroTitleCompact,
              ]}
            >
              {isEditing
                ? 'Aprimore sua publicação.'
                : 'Compartilhe o que você sabe.'}
            </Text>

            <Text style={styles.heroDescription}>
              {isEditing
                ? 'Atualize o conteúdo e compartilhe novas ideias.'
                : 'Crie um novo post para sua comunidade de aprendizagem.'}
            </Text>
          </View>

          <View style={styles.editorCard}>
            <View style={styles.editorHeader}>
              <Text style={styles.breadcrumb}>
                Meus posts /{' '}
                {isEditing ? 'Editar post' : 'Novo post'}
              </Text>

              <Text
                accessibilityRole="header"
                style={styles.pageTitle}
              >
                {isEditing ? 'Editar post' : 'Novo post'}
              </Text>

              <Text style={styles.pageDescription}>
                {isEditing
                  ? 'Faça as alterações necessárias na publicação.'
                  : 'Publique uma ideia, dica ou experiência.'}
              </Text>
            </View>

            <View
              style={styles.modeSwitcher}
              accessibilityRole="tablist"
            >
              <Pressable
                accessibilityRole="tab"
                accessibilityLabel="Editar publicação"
                accessibilityState={{
                  selected: mode === 'edit',
                  disabled: isPublishing,
                }}
                disabled={isPublishing}
                onPress={() => handleChangeMode('edit')}
                style={({ pressed }) => [
                  styles.modeButton,
                  mode === 'edit' &&
                    styles.modeButtonActive,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.modeButtonText,
                    mode === 'edit' &&
                      styles.modeButtonTextActive,
                  ]}
                >
                  Editar
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="tab"
                accessibilityLabel="Visualizar publicação"
                accessibilityState={{
                  selected: mode === 'preview',
                  disabled: isPublishing,
                }}
                disabled={isPublishing}
                onPress={() => handleChangeMode('preview')}
                style={({ pressed }) => [
                  styles.modeButton,
                  mode === 'preview' &&
                    styles.modeButtonActive,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text
                  style={[
                    styles.modeButtonText,
                    mode === 'preview' &&
                      styles.modeButtonTextActive,
                  ]}
                >
                  Visualizar
                </Text>
              </Pressable>
            </View>

            {mode === 'edit' ? (
              <View style={styles.form}>
                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>
                    Título *
                  </Text>

                  <TextInput
                    accessibilityLabel="Título do post, obrigatório"
                    accessibilityHint="Digite o título da publicação"
                    accessibilityState={{
                      disabled: isPublishing,
                    }}
                    placeholder="Digite o título da publicação"
                    placeholderTextColor="#806D61"
                    value={title}
                    onChangeText={handleChangeTitle}
                    style={styles.titleInput}
                    maxLength={MAX_TITLE_LENGTH}
                    returnKeyType="next"
                    autoCapitalize="sentences"
                    editable={!isPublishing}
                    onSubmitEditing={() => {
                      contentInputRef.current?.focus();
                    }}
                  />

                  <Text style={styles.characterCounter}>
                    {title.length}/{MAX_TITLE_LENGTH}
                  </Text>
                </View>

                <View style={styles.field}>
                  <Text style={styles.fieldLabel}>
                    Conteúdo *
                  </Text>

                  <TextInput
                    ref={contentInputRef}
                    accessibilityLabel="Conteúdo do post, obrigatório"
                    accessibilityHint="Digite o conteúdo da publicação"
                    accessibilityState={{
                      disabled: isPublishing,
                    }}
                    placeholder="Compartilhe suas ideias..."
                    placeholderTextColor="#806D61"
                    value={content}
                    onChangeText={handleChangeContent}
                    style={styles.contentInput}
                    multiline
                    textAlignVertical="top"
                    autoCapitalize="sentences"
                    editable={!isPublishing}
                  />
                </View>
              </View>
            ) : (
              <View
                style={styles.previewContainer}
                accessibilityLabel="Pré-visualização da publicação"
              >
                <Text style={styles.previewEyebrow}>
                  PRÉ-VISUALIZAÇÃO
                </Text>

                <Text
                  accessibilityRole="header"
                  style={styles.previewTitle}
                >
                  {trimmedTitle ||
                    'Título do novo post'}
                </Text>

                <Text style={styles.previewContent}>
                  {trimmedContent ||
                    'Conteúdo do meu novo post'}
                </Text>
              </View>
            )}

            {error !== '' && (
              <Text
                accessibilityRole="alert"
                style={styles.errorText}
              >
                {error}
              </Text>
            )}

            <View
              style={[
                styles.actions,
                isCompactScreen &&
                  styles.actionsCompact,
              ]}
            >
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Cancelar edição ou criação"
                accessibilityState={{
                  disabled: isPublishing,
                }}
                onPress={handleCancel}
                disabled={isPublishing}
                style={({ pressed }) => [
                  styles.cancelButton,
                  isCompactScreen &&
                    styles.actionButtonCompact,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.cancelButtonText}>
                  Cancelar
                </Text>
              </Pressable>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={
                  isEditing
                    ? 'Salvar alterações'
                    : 'Publicar post'
                }
                accessibilityState={{
                  disabled: !canPublish,
                  busy: isPublishing,
                }}
                onPress={() => void handlePublish()}
                disabled={!canPublish}
                style={({ pressed }) => [
                  styles.publishButton,
                  isCompactScreen &&
                    styles.actionButtonCompact,
                  !canPublish &&
                    styles.publishButtonDisabled,
                  pressed && styles.buttonPressed,
                ]}
              >
                {isPublishing ? (
                  <View style={styles.loadingContent}>
                    <ActivityIndicator
                      color="#FFFFFF"
                      size="small"
                    />

                    <Text style={styles.publishButtonText}>
                      {isEditing
                        ? 'Salvando...'
                        : 'Publicando...'}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.publishButtonText}>
                    {isEditing
                      ? 'Salvar alterações'
                      : 'Publicar post'}
                  </Text>
                )}
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
