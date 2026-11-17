import { StyleSheet } from 'react-native';

export const passwordFieldStyles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 8,
  },

  label: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#39303F',
    flexShrink: 1,
  },

  inputContainer: {
    width: '100%',
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCD5E2',
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },

  containerDisabled: {
    opacity: 0.7,
  },

  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2D2433',
  },

  inputDisabled: {
    opacity: 0.6,
  },

  visibilityButton: {
    minWidth: 76,
    minHeight: 48,
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  visibilityPressed: {
    opacity: 0.7,
  },

  visibilityText: {
    color: '#5B3A70',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
});
