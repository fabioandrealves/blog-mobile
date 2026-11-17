import {
  Pressable,
  Text,
  View,
} from 'react-native';

import type { Comment } from '../../domain/entities/comment';

import { commentCardStyles as styles } from './comment-card.styles';

interface CommentCardProps {
  comment: Comment;
  canManage: boolean;
  onEdit: (comment: Comment) => void;
  onDelete: (comment: Comment) => void;
}

function formatDate(value: string): string {
  const date = new Date(value);

  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString('pt-BR');
}

export function CommentCard({
  comment,
  canManage,
  onEdit,
  onDelete,
}: CommentCardProps) {
  const author = comment.user?.name?.trim() || 'Usuário';

  const initials = author
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={styles.avatar}
          accessible={false}
          importantForAccessibility="no-hide-descendants"
        >
          <Text style={styles.avatarText}>
            {initials || '?'}
          </Text>
        </View>

        <View style={styles.authorInfo}>
          <Text
            style={styles.author}
            accessibilityLabel={`Comentário de ${author}`}
          >
            {author}
          </Text>

          <Text
            style={styles.date}
            accessibilityLabel={`Publicado em ${formatDate(comment.createdAt)}`}
          >
            {formatDate(comment.createdAt)}
          </Text>
        </View>
      </View>

      <Text style={styles.content}>
        {comment.content}
      </Text>

      {canManage && (
        <View style={styles.actions}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Editar comentário de ${author}`}
            accessibilityHint="Abre o formulário para alterar o comentário."
            onPress={() => onEdit(comment)}
            style={styles.actionButton}
          >
            <Text style={styles.actionText}>
              Editar
            </Text>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Excluir comentário de ${author}`}
            accessibilityHint="Solicita confirmação antes de excluir o comentário."
            onPress={() => onDelete(comment)}
            style={styles.actionButton}
          >
            <Text style={styles.deleteText}>
              Excluir
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
