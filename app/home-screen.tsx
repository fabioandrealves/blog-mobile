import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import type {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import { useAuth } from '@/src/features/auth/ui/contexts/auth-context';
import { postDependencies } from '@/src/di/container';

import type { Post } from '@/src/features/posts/domain/entities/post';

import { PostCard } from '@/src/features/posts/presentation/components/post-card';
import { PostSearch } from '@/src/features/posts/presentation/components/post-search';

import { colors } from '@/src/shared/theme/colors';

import type { RootStackParamList } from '@/src/shared/navigation/root-stack-param-list';

import { homeStyles as styles } from './home.styles';

const SEARCH_DEBOUNCE_MS = 300;

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const { width } = useWindowDimensions();

  const numColumns =
    width >= 1100 ? 3 :
    width >= 700 ? 2 : 1;

  const isSmallScreen = width < 380;
  const isDesktop = width >= 1100;

  const {
    user,
    logout,
    isLoading: isAuthLoading,
  } = useAuth();
  const isAdmin = !isAuthLoading && user?.role === 'admin';
  const isTeacher = !isAuthLoading && user?.role === 'teacher';

  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [refreshVersion, setRefreshVersion] = useState(0);

  const requestIdRef = useRef(0);

  const normalizedSearch = search.trim();
  const filteredPosts = useMemo(() => {
    const query = search.trim().toLocaleLowerCase('pt-BR');

    if (!query) {
      return posts;
    }

    return posts.filter(post => {
      const title = post.title.toLocaleLowerCase('pt-BR');
      const content = post.content.toLocaleLowerCase('pt-BR');

      const author = (
        post.user?.name ??
        post.authorName ??
        ''
      ).toLocaleLowerCase('pt-BR');

      return (
        title.includes(query) ||
        content.includes(query) ||
        author.includes(query)
      );
    });
  }, [posts, search]);

  useFocusEffect(
    useCallback(() => {
      setRefreshVersion(current => current + 1);

      return () => {
        requestIdRef.current += 1;
      };
    }, []),
  );


useEffect(() => {
  const requestId = ++requestIdRef.current;

  const loadPosts = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result =
        await postDependencies.listPosts.execute();

      if (requestId !== requestIdRef.current) {
        return;
      }

      setPosts(result);
    } catch (caughtError) {
      if (requestId !== requestIdRef.current) {
        return;
      }

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível carregar os posts.',
      );
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  };

  void loadPosts();

  return () => {
    requestIdRef.current += 1;
  };
}, [refreshVersion]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setRefreshVersion(current => current + 1);
  }, []);

  const handleOpenPost = useCallback(
    (id: number) => {
      navigation.navigate('PostDetails', { id });
    },
    [navigation],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível sair da conta.',
      );
    }
  }, [logout]);

  const renderPost = useCallback(
    ({ item }: { item: Post }) => (
      <View style={styles.gridItem}>
        <PostCard
          post={item}
          onPress={handleOpenPost}
        />
      </View>
    ),
    [handleOpenPost],
  );

  return (
    <View style={styles.screen}>
      <FlatList
        key={`posts-${numColumns}`}
        data={filteredPosts}
        numColumns={numColumns}
        keyExtractor={post => String(post.id)}
        renderItem={renderPost}
        columnWrapperStyle={
          numColumns > 1
            ? styles.gridRow
            : undefined
        }
        contentContainerStyle={[
          styles.listContent,
          isSmallScreen && styles.listContentSmall,
        ]}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.authActions}>
              {!isAuthLoading && !user && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Entrar na conta"
                  onPress={() => navigation.navigate('Login')}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>
                    Entrar
                  </Text>
                </Pressable>
              )}

              {isAdmin && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Cadastrar professor"
                  onPress={() => navigation.navigate('RegisterTeacher')}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>
                    Cadastrar professor
                  </Text>
                </Pressable>
              )}

              {isAdmin && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Gerenciar professores"
                  onPress={() => navigation.navigate('Teachers')}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>
                    Gerenciar professores
                  </Text>
                </Pressable>
              )}

              {isTeacher && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Acessar meus posts"
                  onPress={() => navigation.navigate('MyPosts')}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>
                    Meus Posts
                  </Text>
                </Pressable>
              )}

              {isTeacher && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Gerenciar estudantes"
                  onPress={() => navigation.navigate('Students')}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>
                    Gerenciar estudantes
                  </Text>
                </Pressable>
              )}

              {!isAuthLoading && user && (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Sair da conta"
                  onPress={() => void handleLogout()}
                  style={styles.actionButtonOutline}
                >
                  <Text style={styles.actionButtonOutlineText}>
                    Sair
                  </Text>
                </Pressable>
              )}
            </View>

            <View style={[
              styles.hero,
              isDesktop && styles.heroDesktop,
            ]}>
              <View style={styles.heroContent}>
                <Text
                  accessibilityRole="header"
                  style={[
                    styles.title,
                    isSmallScreen && styles.titleSmall,
                  ]}
                >
                  Aprenda, ensine e repita
                </Text>

                <Text style={styles.description}>
                  Explore posts, dicas e conteúdos úteis para
                  evoluir no seu aprendizado.
                </Text>
              </View>

              <View style={[
                styles.searchContainer,
                isDesktop && styles.searchDesktop,
              ]}>
                <PostSearch
                  value={search}
                  onChangeText={setSearch}
                />
              </View>
            </View>

            {isLoading && !isRefreshing && (
              <View
                style={styles.status}
                accessibilityLiveRegion="polite"
              >
                <ActivityIndicator
                  color={colors.primary}
                  size="large"
                />

                <Text style={styles.statusText}>
                  Carregando posts...
                </Text>
              </View>
            )}

            {!isLoading && error !== '' && (
              <View style={styles.errorContainer}>
                <Text
                  style={styles.error}
                  accessibilityRole="alert"
                >
                  {error}
                </Text>

                <Pressable
                  accessibilityRole="button"
                  onPress={handleRefresh}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>
                    Tentar novamente
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        }
        ListEmptyComponent={
          !isLoading && error === '' ? (
            <Text style={styles.empty}>
              {normalizedSearch
                ? 'Nenhum post encontrado para sua pesquisa.'
                : 'Ainda não há posts publicados.'}
            </Text>
          ) : null
        }
      />
    </View>
  );
}
