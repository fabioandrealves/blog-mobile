import {
  ActivityIndicator,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';

import { commentFormStyles as styles } from './comment-form.styles';

interface CommentFormProps {
  value: string;
  onChangeText: (value: string) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  isEditing?: boolean;
  isSubmitting?: boolean;
  disabled?: boolean;
}

export function CommentForm({
  value,
  onChangeText,
  onSubmit,
  onCancel,
  onFocus,
  onBlur,
  isEditing = false,
  isSubmitting = false,
  disabled = false,
}: CommentFormProps) {
  const canSubmit =
    value.trim().length > 0 &&
    !isSubmitting &&
    !disabled;

  const submitLabel = isEditing
    ? 'Salvar comentário'
    : 'Publicar comentário';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {isEditing ? 'Editar comentário' : 'Deixe uma ideia'}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder="Escreva um comentário..."
        placeholderTextColor="#75675D"
        multiline
        textAlignVertical="top"
        editable={!isSubmitting && !disabled}
        style={styles.input}
        accessibilityLabel="Conteúdo do comentário"
        accessibilityHint="Digite o texto do comentário que deseja publicar."
        allowFontScaling
      />

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={submitLabel}
        accessibilityHint={
          isEditing
            ? 'Salva as alterações do seu comentário.'
            : 'Publica seu comentário nesta publicação.'
        }
        accessibilityState={{
          disabled: !canSubmit,
          busy: isSubmitting,
        }}
        disabled={!canSubmit}
        onPress={onSubmit}
        style={({ pressed }) => [
          styles.button,
          !canSubmit && styles.disabledButton,
          pressed && canSubmit && styles.pressedButton,
        ]}
      >
        {isSubmitting ? (
          <ActivityIndicator
            color="#FFFFFF"
            accessibilityLabel="Salvando comentário"
          />
        ) : (
          <Text style={styles.buttonText}>
            {submitLabel}
          </Text>
        )}
      </Pressable>

      {isEditing && onCancel && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cancelar edição do comentário"
          accessibilityState={{
            disabled: isSubmitting,
          }}
          onPress={onCancel}
          disabled={isSubmitting}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelText}>
            Cancelar edição
          </Text>
        </Pressable>
      )}
    </View>
  );
}