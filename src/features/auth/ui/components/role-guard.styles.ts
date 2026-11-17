import { StyleSheet } from 'react-native';

export const roleGuardStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E8D0',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 12,
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700',
    color: '#402718',
    textAlign: 'center',
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#755B4C',
    textAlign: 'center',
    maxWidth: 420,
  },
});
