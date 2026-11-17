import { StyleSheet } from 'react-native';

export const authStyles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#F8F7F4',
  },

  shell: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 120,
  },

  shellSmall: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 120,
  },

  intro: {
    alignItems: 'center',
    marginBottom: 32,
  },

  introSmall: {
    marginBottom: 20,
  },

  mark: {
    width: 64,
    height: 64,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B3A70',
    marginBottom: 20,
  },

  markText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  introTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '700',
    color: '#2D2433',
    textAlign: 'center',
    marginBottom: 8,
  },

  introTitleSmall: {
    fontSize: 24,
    lineHeight: 32,
  },

  introDescription: {
    fontSize: 15,
    lineHeight: 23,
    color: '#746B78',
    textAlign: 'center',
  },

  note: {
    fontSize: 13,
    color: '#746B78',
    textAlign: 'center',
    marginTop: 12,
  },

  formWrap: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#EAE5ED',
  },

  formWrapSmall: {
    padding: 16,
    borderRadius: 16,
  },

  title: {
    fontSize: 25,
    lineHeight: 33,
    fontWeight: '700',
    color: '#2D2433',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 22,
    color: '#746B78',
    marginBottom: 24,
  },

  form: {
    gap: 18,
  },

  field: {
    gap: 8,
  },

  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#39303F',
  },

  input: {
    width: '100%',
    minHeight: 52,
    borderWidth: 1,
    borderColor: '#DCD5E2',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#2D2433',
    backgroundColor: '#FFFFFF',
  },

  error: {
    color: '#B42318',
    fontSize: 14,
    lineHeight: 21,
  },

  submit: {
    width: '100%',
    minHeight: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B3A70',
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 6,
  },

  submitPressed: {
    opacity: 0.85,
  },

  submitDisabled: {
    opacity: 0.6,
  },

  submitText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },

  linkButton: {
    minHeight: 48,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },

  link: {
    color: '#5B3A70',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },

  switchText: {
    fontSize: 14,
    lineHeight: 21,
    color: '#746B78',
    textAlign: 'center',
  },
});
