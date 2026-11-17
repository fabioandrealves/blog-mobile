import { StyleSheet } from 'react-native';

export const teachersScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E8D0',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    gap: 16,
  },

  loadingText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#755B4C',
    textAlign: 'center',
  },

  errorContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FCE8E6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E6B8B3',
    gap: 12,
  },

  errorText: {
    fontSize: 15,
    lineHeight: 23,
    color: '#A23D37',
  },

  retryButton: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#704632',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },

  retryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
