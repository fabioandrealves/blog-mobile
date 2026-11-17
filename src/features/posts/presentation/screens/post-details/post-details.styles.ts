
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5E9D7',
  },

  content: {
    width: '100%',
    maxWidth: 900,
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 70,
 },

  center: {
    flex: 1,
    backgroundColor: '#F5E9D7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },

  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 28,
    paddingVertical: 8,
  },

  backButtonText: {
    color: '#711C1B',
    fontSize: 13,
    fontWeight: '600',
  },

  postSection: {
    marginBottom: 30,
  },

  title: {
    color: '#3B281D',
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '500',
    marginBottom: 15,
  },

  titleCompact: {
    fontSize: 28,
    lineHeight: 36,
  },

  titleLargeText: {
    fontSize: 28,
    lineHeight: 38,
  },

  metadata: {
    color: '#87776B',
    fontSize: 12,
    lineHeight: 20,
  },

  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 22,
  },

  actionsStacked: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },

  outlineButton: {
    borderWidth: 1,
    borderColor: '#711C1B',
    borderRadius: 4,
    paddingHorizontal: 17,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  outlineButtonText: {
    color: '#711C1B',
    fontSize: 12,
    fontWeight: '700',
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: '#A12727',
    borderRadius: 6,
    minHeight: 48,
    paddingHorizontal: 17,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteButtonText: {
    color: '#A12727',
    fontSize: 12,
    fontWeight: '700',
  },

  divider: {
    height: 1,
    backgroundColor: '#D4C2AF',
    marginVertical: 28,
  },

  postContent: {
    color: '#493325',
    fontSize: 16,
    lineHeight: 29,
  },

  commentsCard: {
    backgroundColor: '#FFF9F0',
    borderTopWidth: 4,
    borderTopColor: '#711C1B',
    borderRadius: 4,
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

  commentsTitle: {
    color: '#3B281D',
    fontSize: 23,
    fontWeight: '600',
    marginBottom: 8,
  },

  commentsDescription: {
    color: '#87776B',
    fontSize: 13,
    lineHeight: 21,
    marginBottom: 18,
  },

  commentsList: {
    marginTop: 4,
  },

  commentsLoading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 25,
  },

  commentsErrorContainer: {
    alignItems: 'center',
    gap: 12,
    paddingVertical: 20,
  },

  emptyComments: {
    color: '#87776B',
    fontSize: 13,
    lineHeight: 22,
    textAlign: 'center',
    paddingVertical: 24,
  },

  commentFormContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E4D4C1',
    paddingTop: 8,
  },

  loginNotice: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E4D4C1',
    gap: 14,
    alignItems: 'center',
  },

  loginNoticeText: {
    color: '#87776B',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 21,
  },

  helperText: {
    color: '#87776B',
    fontSize: 13,
    lineHeight: 21,
  },

  errorText: {
    color: '#A12727',
    fontSize: 13,
    lineHeight: 21,
    textAlign: 'center',
  },

  primaryButton: {
    backgroundColor: '#711C1B',
    minHeight: 48,
    paddingHorizontal: 22,
    paddingVertical: 13,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  retryButton: {
    borderWidth: 1,
    borderColor: '#711C1B',
    borderRadius: 6,
    minHeight: 48,
    paddingHorizontal: 18,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },

  retryButtonText: {
    color: '#711C1B',
    fontSize: 12,
    fontWeight: '700',
  },
});
