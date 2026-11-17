
import { StyleSheet } from 'react-native';

export const createPostStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5E9D7',
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 48,
  },

  contentWrapper: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 28,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 30,
    paddingVertical: 8,
    paddingRight: 12,
  },

  backButtonText: {
    color: '#711C1B',
    fontSize: 13,
    fontWeight: '600',
  },

  hero: {
    marginBottom: 32,
  },

  heroEyebrow: {
    color: '#9D694B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2.2,
    marginBottom: 12,
  },

  heroTitle: {
    color: '#3B281D',
    fontSize: 38,
    lineHeight: 46,
    fontWeight: '400',
    marginBottom: 12,
  },

  heroTitleCompact: {
    fontSize: 30,
    lineHeight: 38,
  },

  heroDescription: {
    color: '#806D61',
    fontSize: 14,
    lineHeight: 23,
    maxWidth: 480,
  },

  editorCard: {
    backgroundColor: '#FFF9F0',
    borderWidth: 1,
    borderColor: '#E4D4C1',
    borderRadius: 6,
    padding: 20,
    shadowColor: '#8F4B34',
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.12,
    shadowRadius: 0,
    elevation: 3,
  },

  editorHeader: {
    marginBottom: 24,
  },

  breadcrumb: {
    color: '#9D694B',
    fontSize: 11,
    marginBottom: 12,
  },

  pageTitle: {
    color: '#3B281D',
    fontSize: 25,
    fontWeight: '600',
    marginBottom: 8,
  },

  pageDescription: {
    color: '#806D61',
    fontSize: 13,
    lineHeight: 21,
  },

  modeSwitcher: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DCCDBB',
    marginBottom: 24,
    gap: 22,
  },

  modeButton: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },

  modeButtonActive: {
    borderBottomColor: '#711C1B',
  },

  modeButtonText: {
    color: '#998678',
    fontSize: 13,
    fontWeight: '500',
  },

  modeButtonTextActive: {
    color: '#711C1B',
    fontWeight: '700',
  },

  form: {
    gap: 22,
  },

  field: {
    gap: 9,
  },

  fieldLabel: {
    color: '#493325',
    fontSize: 13,
    fontWeight: '700',
  },

  titleInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D4C2AF',
    borderRadius: 4,
    color: '#493325',
    fontSize: 15,
    paddingHorizontal: 14,
    paddingVertical: 13,
    minHeight: 48,
  },

  characterCounter: {
    color: '#998678',
    fontSize: 11,
    textAlign: 'right',
  },

  contentInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D4C2AF',
    borderRadius: 4,
    color: '#493325',
    fontSize: 14,
    lineHeight: 23,
    minHeight: 230,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },

  previewContainer: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E4D4C1',
    borderRadius: 4,
    padding: 20,
    minHeight: 250,
  },

  previewEyebrow: {
    color: '#9D694B',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.8,
    marginBottom: 14,
  },

  previewTitle: {
    color: '#3B281D',
    fontSize: 25,
    fontWeight: '600',
    lineHeight: 33,
    marginBottom: 16,
  },

  previewContent: {
    color: '#594537',
    fontSize: 15,
    lineHeight: 26,
  },

  errorText: {
    color: '#A12727',
    fontSize: 12,
    lineHeight: 20,
    marginTop: 16,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 28,
  },

  actionsCompact: {
    flexDirection: 'column-reverse',
  },

  actionButtonCompact: {
    width: '100%',
  },

  cancelButton: {
    minHeight: 46,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#C8B6A4',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelButtonText: {
    color: '#594537',
    fontSize: 13,
    fontWeight: '600',
  },

  publishButton: {
    minHeight: 46,
    backgroundColor: '#711C1B',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  publishButtonDisabled: {
    opacity: 0.5,
  },

  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  loadingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },

  buttonPressed: {
    opacity: 0.75,
  },

  restrictedContainer: {
    flex: 1,
    backgroundColor: '#F5E9D7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    gap: 16,
  },

  restrictedTitle: {
    color: '#3B281D',
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
  },

  restrictedDescription: {
    color: '#806D61',
    fontSize: 14,
    lineHeight: 23,
    textAlign: 'center',
  },

  restrictedButton: {
    backgroundColor: '#711C1B',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 4,
    marginTop: 8,
  },
});
