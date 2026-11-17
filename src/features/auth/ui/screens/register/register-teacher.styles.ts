import { StyleSheet } from 'react-native';
import { colors } from '@/src/shared/theme/colors';

export const teacherStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 560,
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 160,
    gap: 20,
  },

  contentSmall: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 160,
    gap: 16,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    padding: 24,
    gap: 16,
  },

  formHeader: {
    gap: 10,
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
    color: colors.text,
    flexShrink: 1,
  },

  titleSmall: {
    fontSize: 23,
    lineHeight: 31,
  },

  titleLargeText: {
    fontSize: 24,
    lineHeight: 34,
  },

  description: {
    fontSize: 15,
    lineHeight: 23,
    color: colors.textSecondary,
    flexShrink: 1,
  },

  field: {
    width: '100%',
    gap: 10,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
    flexShrink: 1,
  },

  input: {
    width: '100%',
    minHeight: 52,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    backgroundColor: colors.surface,
    fontSize: 16,
  },

  passwordContainer: {
    width: '100%',
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.surface,
  },

  passwordInput: {
    flex: 1,
    minWidth: 0,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: colors.text,
    fontSize: 16,
  },

  passwordToggle: {
    minWidth: 72,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },

  passwordToggleText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },

  button: {
    width: '100%',
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.primary,
    marginTop: 4,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },

  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    minHeight: 48,
  },

  cancelButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },

  helperText: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },

  errorText: {
    color: '#A12727',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
});
