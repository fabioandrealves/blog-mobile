import { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';

import type { ManagedUser } from '../../domain/entities/managed-user';
import type { UpdateManagedUserInput } from '../../domain/repositories/user-management-repository';

import { userManagementListStyles as styles } from './user-management-list.styles';

interface Props {
  title: string;
  users: ManagedUser[];
  loading: boolean;
  onRefresh: () => void | Promise<void>;
  onUpdate: (
    id: number,
    input: UpdateManagedUserInput,
  ) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function UserManagementList({
  title,
  users,
  loading,
  onRefresh,
  onUpdate,
  onDelete,
}: Props) {
  const { width, fontScale } = useWindowDimensions();

  const numColumns =
    width >= 760 && fontScale <= 1.3 ? 2 : 1;

  const isCompact = width < 380 || fontScale > 1.3;

  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const isBusy = saving || deletingId !== null;

  const startEditing = useCallback((user: ManagedUser) => {
    if (isBusy) return;

    setEditingId(user.id);
    setName(user.name);
    setEmail(user.email);
  }, [isBusy]);

  const cancelEditing = useCallback(() => {
    if (saving) return;

    setEditingId(null);
    setName('');
    setEmail('');
  }, [saving]);

  const save = useCallback(async () => {
    if (editingId === null || isBusy) return;

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (normalizedName.length < 2) {
      Alert.alert(
        'Nome inválido',
        'Informe um nome com pelo menos 2 caracteres.',
      );
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      Alert.alert(
        'E-mail inválido',
        'Informe um endereço de e-mail válido.',
      );
      return;
    }

    setSaving(true);

    try {
      await onUpdate(editingId, {
        name: normalizedName,
        email: normalizedEmail,
      });

      setEditingId(null);
      setName('');
      setEmail('');
    } catch (caughtError) {
      Alert.alert(
        'Erro ao atualizar',
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível atualizar o usuário.',
      );
    } finally {
      setSaving(false);
    }
  }, [editingId, isBusy, name, email, onUpdate]);

  const confirmDelete = useCallback(
    (user: ManagedUser) => {
      if (isBusy) return;

      Alert.alert(
        'Excluir usuário',
        `Deseja realmente excluir ${user.name}?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Excluir',
            style: 'destructive',
            onPress: () => {
              const remove = async () => {
                setDeletingId(user.id);

                try {
                  await onDelete(user.id);
                } catch (caughtError) {
                  Alert.alert(
                    'Erro ao excluir',
                    caughtError instanceof Error
                      ? caughtError.message
                      : 'Não foi possível excluir o usuário.',
                  );
                } finally {
                  setDeletingId(null);
                }
              };

              void remove();
            },
          },
        ],
      );
    },
    [isBusy, onDelete],
  );

  const renderUser = useCallback(
    ({ item }: { item: ManagedUser }) => {
      const isEditing = editingId === item.id;
      const isDeleting = deletingId === item.id;

      return (
        <View
          style={[
            styles.card,
            numColumns > 1 && styles.cardGrid,
          ]}
        >
          {isEditing ? (
            <View style={styles.editForm}>
              <Text style={styles.fieldLabel}>
                Nome
              </Text>

              <TextInput
                accessibilityLabel={`Nome de ${item.name}`}
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="Nome completo"
                placeholderTextColor="#755B4C"
                autoCapitalize="words"
                autoCorrect={false}
                maxLength={120}
                editable={!saving}
                returnKeyType="next"
              />

              <Text style={styles.fieldLabel}>
                E-mail
              </Text>

              <TextInput
                accessibilityLabel={`E-mail de ${item.name}`}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                placeholder="E-mail"
                placeholderTextColor="#755B4C"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={255}
                editable={!saving}
              />

              <View
                style={[
                  styles.actions,
                  isCompact && styles.actionsCompact,
                ]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Cancelar edição de ${item.name}`}
                  accessibilityState={{ disabled: saving }}
                  style={styles.button}
                  onPress={cancelEditing}
                  disabled={saving}
                >
                  <Text style={styles.buttonText}>
                    Cancelar
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Salvar alterações de ${item.name}`}
                  accessibilityState={{
                    disabled: saving,
                    busy: saving,
                  }}
                  style={[
                    styles.primaryButton,
                    saving && styles.disabledButton,
                  ]}
                  onPress={() => void save()}
                  disabled={saving}
                >
                  {saving ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.primaryButtonText}>
                      Salvar
                    </Text>
                  )}
                </Pressable>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.name}>
                {item.name}
              </Text>

              <Text style={styles.email}>
                {item.email}
              </Text>

              <View
                style={[
                  styles.actions,
                  isCompact && styles.actionsCompact,
                ]}
              >
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Editar ${item.name}`}
                  accessibilityHint="Abre os campos de nome e e-mail para edição"
                  accessibilityState={{ disabled: isBusy }}
                  style={[
                    styles.button,
                    isBusy && styles.disabledButton,
                  ]}
                  onPress={() => startEditing(item)}
                  disabled={isBusy}
                >
                  <Text style={styles.buttonText}>
                    Editar
                  </Text>
                </Pressable>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Excluir ${item.name}`}
                  accessibilityHint="Solicita confirmação antes de excluir"
                  accessibilityState={{
                    disabled: isBusy,
                    busy: isDeleting,
                  }}
                  style={[
                    styles.deleteButton,
                    isBusy && styles.disabledButton,
                  ]}
                  onPress={() => confirmDelete(item)}
                  disabled={isBusy}
                >
                  {isDeleting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Text style={styles.deleteText}>
                      Excluir
                    </Text>
                  )}
                </Pressable>
              </View>
            </>
          )}
        </View>
      );
    },
    [
      editingId,
      deletingId,
      name,
      email,
      saving,
      isBusy,
      isCompact,
      numColumns,
      startEditing,
      cancelEditing,
      save,
      confirmDelete,
    ],
  );

  return (
    <View style={styles.container}>
      <FlatList
        key={`users-${numColumns}`}
        data={users}
        numColumns={numColumns}
        keyExtractor={item => String(item.id)}
        renderItem={renderUser}
        refreshing={loading}
        onRefresh={onRefresh}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.list}
        columnWrapperStyle={
          numColumns > 1 ? styles.gridRow : undefined
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <Text
              accessibilityRole="header"
              style={[
                styles.heading,
                isCompact && styles.headingCompact,
              ]}
            >
              {title}
            </Text>

            <Text
              style={styles.subtitle}
              accessibilityLiveRegion="polite"
            >
              {users.length} usuário(s) cadastrado(s)
            </Text>
          </View>
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Nenhum usuário encontrado.
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}
