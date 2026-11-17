import { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { userManagementDependencies } from '@/src/di/container';
import { RoleGuard } from '@/src/features/auth/ui/components/role-guard';

import type { ManagedUser } from '../../domain/entities/managed-user';
import type { UpdateManagedUserInput } from '../../domain/repositories/user-management-repository';

import { UserManagementList } from '../components/user-management-list';
import { teachersScreenStyles as styles } from './teachers-screen.styles';

function TeachersManagementContent() {
  const [teachers, setTeachers] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);

  const loadTeachers = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const result =
        await userManagementDependencies.listTeachers.execute();

      if (requestId !== requestIdRef.current) return;

      setTeachers(result);
    } catch (caughtError) {
      if (requestId !== requestIdRef.current) return;

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível carregar os professores.',
      );
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadTeachers();

      return () => {
        requestIdRef.current += 1;
      };
    }, [loadTeachers]),
  );

  const handleUpdate = useCallback(
    async (id: number, input: UpdateManagedUserInput) => {
      await userManagementDependencies.updateTeacher.execute(
        id,
        input,
      );

      await loadTeachers();
    },
    [loadTeachers],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await userManagementDependencies.deleteTeacher.execute(id);
      await loadTeachers();
    },
    [loadTeachers],
  );

  return (
    <View style={styles.container}>
      {error && (
        <View
          style={styles.errorContainer}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          <Text style={styles.errorText}>{error}</Text>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Tentar carregar professores novamente"
            onPress={() => void loadTeachers()}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      )}

      {loading && teachers.length === 0 ? (
        <View
          style={styles.loadingContainer}
          accessibilityLiveRegion="polite"
        >
          <ActivityIndicator
            size="large"
            color="#704632"
            accessibilityLabel="Carregando professores"
          />

          <Text style={styles.loadingText}>
            Carregando professores...
          </Text>
        </View>
      ) : (
        <UserManagementList
          title="Gerenciar professores"
          users={teachers}
          loading={loading}
          onRefresh={loadTeachers}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </View>
  );
}

export function TeachersScreen() {
  return (
    <RoleGuard allowedRoles={['admin']}>
      <TeachersManagementContent />
    </RoleGuard>
  );
}
