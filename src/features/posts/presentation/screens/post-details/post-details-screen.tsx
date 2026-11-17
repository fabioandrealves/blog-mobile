import { useCallback, useRef, useEffect, useState } from 'react';

import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';

import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
  postDependencies,
  commentDependencies,
} from '@/src/di/container';

import { useAuth } from '@/src/features/auth/ui/contexts/auth-context';

import type { Post } from '@/src/features/posts/domain/entities/post';
import type { Comment } from '@/src/features/comments/domain/entities/comment';

import { CommentCard } from '@/src/features/comments/ui/components/comment-card';
import { CommentForm } from '@/src/features/comments/ui/components/comment-form';

import type { RootStackParamList } from '@/src/shared/navigation/root-stack-param-list';

import { styles } from './post-details.styles';

type NavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

type DetailsRoute =
  RouteProp<RootStackParamList, 'PostDetails'>;

function formatDate(value: string): string {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('pt-BR');
}

export default function PostDetailsScreen() {

  const { width, fontScale } = useWindowDimensions();
  const isCompact = width < 380;
  const isLargeText = fontScale >= 1.3;
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<DetailsRoute>();

  const { id } = route.params;
  const { user } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);

  const [isLoadingPost, setIsLoadingPost] = useState(true);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [deletingCommentId, setDeletingCommentId] =
    useState<number | null>(null);

  const [postError, setPostError] = useState('');
  const [commentsError, setCommentsError] = useState('');

  const [commentText, setCommentText] = useState('');
  const [editingComment, setEditingComment] =
    useState<Comment | null>(null);

  const canManagePost =
    user?.role === 'teacher' &&
    post !== null &&
    Number(user.id) === Number(post.userId);

  const canManageComment = (comment: Comment): boolean => {
    if (!user) {
      return false;
    }

    const isAllowedRole =
      user.role === 'teacher' ||
      user.role === 'student';

    const isCommentAuthor =
      Number(user.id) === Number(comment.userId);

    return isAllowedRole && isCommentAuthor;
  };

  const loadPost = useCallback(async () => {
    try {
      setIsLoadingPost(true);
      setPostError('');

      const result =
        await postDependencies.getPostById.execute(id);

      setPost(result);
    } catch (caughtError) {
      setPost(null);

      setPostError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível carregar a publicação.',
      );
    } finally {
      setIsLoadingPost(false);
    }
  }, [id]);

  const loadComments = useCallback(async () => {
    try {
      setIsLoadingComments(true);
      setCommentsError('');

      const result =
        await commentDependencies.listComments.execute(id);

      setComments(result);
    } catch (caughtError) {
      setComments([]);

      setCommentsError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível carregar os comentários.',
      );
    } finally {
      setIsLoadingComments(false);
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      void loadPost();
      void loadComments();
    }, [loadPost, loadComments]),
  );

  const handleEditPost = () => {
    if (!canManagePost || !post) return;

    navigation.navigate('CreatePost', {
      id: post.id,
    });
  };

  const handleDeletePost = () => {
    if (!canManagePost || !post || isDeletingPost) return;

    Alert.alert(
      'Excluir publicação',
      'Deseja realmente excluir esta publicação? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setIsDeletingPost(true);

              await postDependencies.deletePost.execute(post.id);

              navigation.navigate('MyPosts');
            } catch (caughtError) {
              Alert.alert(
                'Erro ao excluir',
                caughtError instanceof Error
                  ? caughtError.message
                  : 'Não foi possível excluir a publicação.',
              );
            } finally {
              setIsDeletingPost(false);
            }
          },
        },
      ],
    );
  };

  const handleEditComment = (comment: Comment) => {
    if (!canManageComment(comment) || isSubmittingComment) {
      return;
    }

    setEditingComment(comment);
    setCommentText(comment.content);
  };

  const handleCancelCommentEdit = () => {
    if (isSubmittingComment) return;

    setEditingComment(null);
    setCommentText('');
  };

  const handleSubmitComment = async () => {
    const content = commentText.trim();

    if (
      !user ||
      !content ||
      isSubmittingComment ||
      deletingCommentId !== null
    ) {
      return;
    }

    try {
      setIsSubmittingComment(true);

      if (editingComment) {
        if (!canManageComment(editingComment)) {
          throw new Error(
            'Você não tem permissão para editar este comentário.',
          );
        }

        await commentDependencies.updateComment.execute(
          editingComment.id,
          { content },
        );
      } else {
        await commentDependencies.createComment.execute({
          postId: id,
          content,
        });
      }

      setCommentText('');
      setEditingComment(null);

      await loadComments();
    } catch (caughtError) {
      Alert.alert(
        'Erro ao salvar comentário',
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível salvar o comentário.',
      );
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteComment = (comment: Comment) => {
    if (
      !canManageComment(comment) ||
      deletingCommentId !== null
    ) {
      return;
    }

    Alert.alert(
      'Excluir comentário',
      'Deseja realmente excluir este comentário?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              setDeletingCommentId(comment.id);

              await commentDependencies.deleteComment.execute(
                comment.id,
              );

              if (editingComment?.id === comment.id) {
                setEditingComment(null);
                setCommentText('');
              }

              await loadComments();
            } catch (caughtError) {
              Alert.alert(
                'Erro ao excluir comentário',
                caughtError instanceof Error
                  ? caughtError.message
                  : 'Não foi possível excluir o comentário.',
              );
            } finally {
              setDeletingCommentId(null);
            }
          },
        },
      ],
    );
  };

  if (isLoadingPost) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#711C1B"
        />

        <Text style={styles.helperText}>
          Carregando publicação...
        </Text>
      </View>
    );
  }

  if (postError || !post) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          {postError || 'Publicação não encontrada.'}
        </Text>

        <Pressable
          onPress={() => void loadPost()}
          style={styles.primaryButton}
        >
          <Text style={styles.primaryButtonText}>
            Tentar novamente
          </Text>
        </Pressable>
      </View>
    );
  }

  const authorName =
    post.user?.name ??
    post.authorName ??
    'Autor não informado';

  return (
      <KeyboardAwareScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        enableOnAndroid
        enableAutomaticScroll
        extraScrollHeight={120}
        keyboardOpeningTime={0}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Voltar para o início"
        accessibilityHint="Navega para a tela inicial do blog."
        onPress={() => navigation.navigate('Home')}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>
          Início / Publicação
        </Text>
      </Pressable>

      <View style={styles.postSection}>
        <Text
          accessibilityRole="header"
          style={[
              styles.title,
              isCompact && styles.titleCompact,
              isLargeText && styles.titleLargeText,
          ]}
        >
          {post.title}
        </Text>

        <Text style={styles.metadata}>
          Publicado em {formatDate(post.createdAt)}
          {' · '}por {authorName}
        </Text>

        {canManagePost && (
          <View
             style={[
                styles.actions,
                (isCompact || isLargeText) && styles.actionsStacked,
              ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Editar publicação"
              accessibilityState={{ disabled: isDeletingPost }}
              onPress={handleEditPost}
              disabled={isDeletingPost}
              style={styles.outlineButton}
            >
              <Text style={styles.outlineButtonText}>
                Editar post
              </Text>
            </Pressable>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Excluir publicação"
              accessibilityHint="Abre uma confirmação antes de excluir a publicação."
              accessibilityState={{
                disabled: isDeletingPost,
                busy: isDeletingPost,
              }}
              onPress={handleDeletePost}
              disabled={isDeletingPost}
              style={styles.deleteButton}
            >
              <Text style={styles.deleteButtonText}>
                {isDeletingPost
                  ? 'Excluindo...'
                  : 'Excluir post'}
              </Text>
            </Pressable>
          </View>
        )}

        <View style={styles.divider} />

        <Text style={styles.postContent}>
          {post.content}
        </Text>
      </View>

      <View style={styles.commentsCard}>
        <Text
          accessibilityRole="header"
          style={styles.commentsTitle}
        >
          Comentários ({comments.length})
        </Text>

        <Text style={styles.commentsDescription}>
          Compartilhe suas ideias sobre esta publicação.
        </Text>

        {isLoadingComments ? (
          <View
            style={styles.commentsLoading}
            accessibilityRole="progressbar"
            accessibilityLabel="Carregando comentários"
          >
            <ActivityIndicator
              color="#711C1B"
              size="small"
            />

            <Text style={styles.helperText}>
              Carregando comentários...
            </Text>
          </View>
        ) : commentsError ? (
          <View style={styles.commentsErrorContainer}>
            <Text style={styles.errorText}>
              {commentsError}
            </Text>

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Tentar carregar os comentários novamente"
              onPress={() => void loadComments()}
              style={styles.retryButton}
            >
              <Text style={styles.retryButtonText}>
                Tentar novamente
              </Text>
            </Pressable>
          </View>
        ) : comments.length === 0 ? (
          <Text style={styles.emptyComments}>
            Ainda não há comentários. Seja o primeiro a comentar!
          </Text>
        ) : (
          <View style={styles.commentsList}>
            {comments.map(comment => (
              <CommentCard
                key={comment.id}
                comment={comment}
                canManage={canManageComment(comment)}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
              />
            ))}
          </View>
        )}

        {user ? (
          <View style={styles.commentFormContainer}>
            <CommentForm
              value={commentText}
              onChangeText={setCommentText}
              onSubmit={() => void handleSubmitComment()}
              onCancel={handleCancelCommentEdit}
              isEditing={editingComment !== null}
              isSubmitting={isSubmittingComment}
              disabled={deletingCommentId !== null}
            />
          </View>
        ) : (
          <View style={styles.loginNotice}>
            <Text style={styles.loginNoticeText}>
              Entre na sua conta para participar da conversa.
            </Text>

            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={styles.primaryButton}
            >
              <Text style={styles.primaryButtonText}>
                Fazer login
              </Text>
            </Pressable>
          </View>
        )}
      </View>
  </KeyboardAwareScrollView>
);
}
