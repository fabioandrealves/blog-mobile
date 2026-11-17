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
import { studentsScreenStyles as styles } from './students-screen.styles';

function StudentsManagementContent() {
  const [students, setStudents] = useState<ManagedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);

  const loadStudents = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const result =
        await userManagementDependencies.listStudents.execute();

      if (requestId !== requestIdRef.current) return;

      setStudents(result);
    } catch (caughtError) {
      if (requestId !== requestIdRef.current) return;

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : 'Não foi possível carregar os estudantes.',
      );
    } finally {
      if (requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadStudents();

      return () => {
        requestIdRef.current += 1;
      };
    }, [loadStudents]),
  );

  const handleUpdate = useCallback(
    async (id: number, input: UpdateManagedUserInput) => {
      await userManagementDependencies.updateStudent.execute(
        id,
        input,
      );

      await loadStudents();
    },
    [loadStudents],
  );

  const handleDelete = useCallback(
    async (id: number) => {
      await userManagementDependencies.deleteStudent.execute(id);
      await loadStudents();
    },
    [loadStudents],
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
            accessibilityLabel="Tentar carregar estudantes novamente"
            onPress={() => void loadStudents()}
            style={styles.retryButton}
          >
            <Text style={styles.retryButtonText}>
              Tentar novamente
            </Text>
          </Pressable>
        </View>
      )}

      {loading && students.length === 0 ? (
        <View
          style={styles.loadingContainer}
          accessibilityLiveRegion="polite"
        >
          <ActivityIndicator
            size="large"
            color="#704632"
            accessibilityLabel="Carregando estudantes"
          />

          <Text style={styles.loadingText}>
            Carregando estudantes...
          </Text>
        </View>
      ) : (
        <UserManagementList
          title="Gerenciar estudantes"
          users={students}
          loading={loading}
          onRefresh={loadStudents}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </View>
  );
}

export function StudentsScreen() {
  return (
    <RoleGuard allowedRoles={['teacher']}>
      <StudentsManagementContent />
    </RoleGuard>
  );
}
