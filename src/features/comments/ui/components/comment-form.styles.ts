import { StyleSheet } from 'react-native';

export const commentFormStyles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
  },

  label: {
    color: '#493325',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 10,
  },

  input: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#8A7868',
    borderRadius: 6,
    minHeight: 120,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#493325',
    fontSize: 16,
    lineHeight: 24,
  },

  button: {
    backgroundColor: '#711C1B',
    minHeight: 48,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },

  pressedButton: {
    opacity: 0.85,
  },

  disabledButton: {
    opacity: 0.5,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
    textAlign: 'center',
  },

  cancelButton: {
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  cancelText: {
    color: '#711C1B',
    fontSize: 14,
    fontWeight: '600',
  },
});