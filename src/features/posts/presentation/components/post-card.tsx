import {
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';

import type { Post } from '@/src/features/posts/domain/entities/post';

import { postCardStyles as styles } from './post-card.styles';

interface PostCardProps {
  post: Post;
  onPress: (id: number) => void;
}

const postCover = require('../../../../../assets/images/post/post_cover.png');

function formatDate(value?: string | null): string {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}

function getPreview(
  content: string,
  maxLength = 150,
): string {
  const normalizedContent = content.trim();

  if (normalizedContent.length <= maxLength) {
    return normalizedContent;
  }

  return `${normalizedContent.slice(0, maxLength).trimEnd()}...`;
}

export function PostCard({
  post,
  onPress,
}: PostCardProps) {
  const author =
    post.user?.name ??
    post.authorName ??
    'Autor desconhecido';
    const formattedDate = formatDate(post.createdAt);

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Abrir post: ${post.title}, escrito por ${author}`}
      accessibilityHint="Abre o conteúdo completo do post."
      onPress={() => onPress(post.id)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
    >
      <View style={styles.coverContainer}>
        <Image
          source={postCover}
          style={styles.cover}
          resizeMode="cover"
          accessible={false}
        />

        <View style={styles.coverBadge}>
          <Text style={styles.coverBadgeText}>
            POST
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={3}
        >
          {post.title}
        </Text>

        <Text
          style={styles.description}
          numberOfLines={4}
        >
          {getPreview(post.content)}
        </Text>

        <View style={styles.footer}>
          <Text style={styles.author}>
            Escrito por{' '}
            <Text style={styles.authorName}>
              {author}
            </Text>

            {formattedDate ? (
              <Text style={styles.date}>
                {' '}em {formattedDate}
              </Text>
            ) : null}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
