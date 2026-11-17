import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { postDependencies } from '@/src/di/container';
import { useAuth } from '@/src/features/auth/ui/contexts/auth-context';
import type { Post } from '@/src/features/posts/domain/entities/post';
import type { RootStackParamList } from '@/src/shared/navigation/root-stack-param-list';
import { colors } from '@/src/shared/theme/colors';

import { myPostsStyles as styles } from './my-posts.styles';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const formatDate = (date: string): string => {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return 'Data indisponível';
  }

  return parsedDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export default function MyPostsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { width } = useWindowDimensions();

  const isCompactScreen = width < 360;

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadMyPosts = useCallback(async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    setError('');

    try {
      const result = await postDependencies.listMyPosts.execute();
      setPosts(result);
    } catch {
      setError(
        'Não foi possível carregar seus posts. Tente novamente.',
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthLoading && user?.role === 'teacher') {
      void loadMyPosts();
    }
  }, [isAuthLoading, user?.role, loadMyPosts]);

  const handleOpenPost = useCallback(
    (id: number) => {
      navigation.navigate('PostDetails', { id });
    },
    [navigation],
  );

  const handleCreatePost = useCallback(() => {
    navigation.navigate('CreatePost');
  }, [navigation]);

  const handleGoHome = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  const mostRecentPost = useMemo(
    () =>
      posts.reduce<Post | null>((latest, current) => {
        if (!latest) {
          return current;
        }

        const currentDate = new Date(current.createdAt).getTime();
        const latestDate = new Date(latest.createdAt).getTime();

        return currentDate > latestDate ? current : latest;
      }, null),
    [posts],
  );

  if (isAuthLoading) {
    return (
      <View
        style={styles.centered}
        accessibilityRole="progressbar"
        accessibilityLabel="Verificando sessão"
      >
        <ActivityIndicator
          color={colors.primary}
          size="large"
        />

        <Text style={styles.statusText}>
          Verificando sessão...
        </Text>
      </View>
    );
  }

  if (user?.role !== 'teacher') {
    return (
      <View style={styles.centered}>
        <Text
          accessibilityRole="header"
          style={styles.restrictedTitle}
        >
          Acesso restrito
        </Text>

        <Text style={styles.restrictedDescription}>
          Esta área está disponível somente para professores.
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Voltar para o início"
          onPress={handleGoHome}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
          hitSlop={8}
        >
          <Text style={styles.primaryButtonText}>
            Voltar para o início
          </Text>
        </Pressable>
      </View>
    );
  }

  const renderHeader = () => (
    <View style={styles.header}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Voltar para o início"
        onPress={handleGoHome}
        style={styles.backButton}
        hitSlop={8}
      >
        <Text style={styles.backButtonText}>
          ‹ Início
        </Text>
      </Pressable>

      <View style={styles.heading}>
        <Text style={styles.roleBadge}>
          PROFESSOR
        </Text>

        <Text
          accessibilityRole="header"
          style={styles.title}
        >
          Meus posts
        </Text>

        <Text style={styles.description}>
          Compartilhe seu conhecimento, suas ideias e
          experiências com seus alunos.
        </Text>
      </View>

      <View
        style={styles.profileCard}
        accessible
        accessibilityLabel={`Professor ${user.name}. E-mail: ${user.email}`}
      >
        <Text style={styles.profileLabel}>
          PROFESSOR
        </Text>

        <Text
          style={styles.profileName}
          numberOfLines={2}
        >
          {user.name}
        </Text>

        <Text
          style={styles.profileEmail}
          numberOfLines={2}
        >
          {user.email}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <View
          style={styles.statCard}
          accessible
          accessibilityLabel={`${posts.length} posts publicados`}
        >
          <Text style={styles.statValue}>
            {posts.length}
          </Text>

          <Text style={styles.statLabel}>
            POSTS PUBLICADOS
          </Text>
        </View>

        <View
          style={styles.statCard}
          accessible
          accessibilityLabel={
            mostRecentPost
              ? `Publicação mais recente em ${formatDate(mostRecentPost.createdAt)}`
              : 'Nenhuma publicação realizada'
          }
        >
          <Text
            style={[
              styles.statValue,
              isCompactScreen && styles.statValueCompact,
            ]}
            numberOfLines={2}
          >
            {mostRecentPost
              ? formatDate(mostRecentPost.createdAt)
              : '--'}
          </Text>

          <Text style={styles.statLabel}>
            PUBLICAÇÃO MAIS RECENTE
          </Text>
        </View>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Criar novo post"
        onPress={handleCreatePost}
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.buttonPressed,
        ]}
        hitSlop={4}
      >
        <Text style={styles.primaryButtonText}>
          + Criar novo post
        </Text>
      </Pressable>

      <Text
        accessibilityRole="header"
        style={styles.sectionTitle}
      >
        Suas publicações
      </Text>

      {isLoading && (
        <View
          style={styles.statusContainer}
          accessibilityRole="progressbar"
          accessibilityLabel="Carregando seus posts"
        >
          <ActivityIndicator
            color={colors.primary}
            size="large"
          />

          <Text style={styles.statusText}>
            Carregando seus posts...
          </Text>
        </View>
      )}

      {!isLoading && error !== '' && (
        <View style={styles.emptyContainer}>
          <Text
            style={styles.errorText}
            accessibilityRole="alert"
          >
            {error}
          </Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tentar carregar os posts novamente"
            onPress={() => void loadMyPosts()}
            style={styles.retryButton}
            hitSlop={8}
          >
            <Text style={styles.retryButtonText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );

  const renderEmptyList = () => {
    if (isLoading || error !== '') {
      return null;
    }

    return (
      <View style={styles.emptyContainer}>
        <Text
          accessibilityRole="header"
          style={styles.emptyTitle}
        >
          Você ainda não publicou nenhum post.
        </Text>

        <Text style={styles.emptyDescription}>
          Comece compartilhando seu conhecimento com
          seus alunos.
        </Text>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Criar meu primeiro post"
          onPress={handleCreatePost}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>
            Criar meu primeiro post
          </Text>
        </Pressable>
      </View>
    );
  };

  const renderPost = ({ item }: { item: Post }) => (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir post: ${item.title}`}
      accessibilityHint="Abre os detalhes desta publicação"
      onPress={() => handleOpenPost(item.id)}
      style={({ pressed }) => [
        styles.postCard,
        pressed && styles.postCardPressed,
      ]}
    >
      <View style={styles.postImagePlaceholder}>
        <Text style={styles.postBadge}>
          POST
        </Text>
      </View>

      <View style={styles.postContent}>
        <Text
          style={styles.postTitle}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text
          style={styles.postDescription}
          numberOfLines={3}
        >
          {item.content}
        </Text>

        <Text style={styles.postDate}>
          Publicado em {formatDate(item.createdAt)}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.screen}>
      <FlatList
        data={isLoading || error !== '' ? [] : posts}
        keyExtractor={(post) => String(post.id)}
        renderItem={renderPost}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={() => void loadMyPosts(true)}
            tintColor={colors.primary}
            colors={[colors.primary]}
            accessibilityLabel="Atualizar publicações"
          />
        }
      />
    </View>
  );
}