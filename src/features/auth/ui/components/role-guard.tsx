import type { ReactNode } from 'react';

import {
  ActivityIndicator,
  Text,
  View,
} from 'react-native';

import { useAuth } from '@/src/features/auth/ui/contexts/auth-context';

import { roleGuardStyles as styles } from './role-guard.styles';

interface RoleGuardProps {
  allowedRoles: Array<'admin' | 'teacher' | 'student'>;
  children: ReactNode;
}

export function RoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View
        style={styles.container}
        accessibilityLiveRegion="polite"
      >
        <ActivityIndicator
          size="large"
          color="#704632"
          accessibilityLabel="Verificando permissões"
        />

        <Text style={styles.description}>
          Verificando permissões...
        </Text>
      </View>
    );
  }

  if (!user || !allowedRoles.includes(user.role)) {
    return (
      <View
        style={styles.container}
        accessibilityLiveRegion="assertive"
      >
        <Text
          style={styles.title}
          accessibilityRole="header"
        >
          Acesso negado
        </Text>

        <Text style={styles.description}>
          Você não possui permissão para acessar
          esta página.
        </Text>
      </View>
    );
  }

  return <>{children}</>;
}
