import { StyleSheet } from 'react-native';

import { colors } from '@/src/shared/theme/colors';

export const myPostsStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  listContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 36,
  },

  header: {
    gap: 20,
  },

  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
    backgroundColor: colors.background,
  },

  backButton: {
    alignSelf: 'flex-start',
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    paddingRight: 12,
  },

  backButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
  },

  heading: {
    gap: 10,
  },

  roleBadge: {
    alignSelf: 'flex-start',
    overflow: 'hidden',
    backgroundColor: colors.surface,
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.2,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
  },

  title: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '700',
    flexShrink: 1,
  },

  description: {
    color: colors.textSecondary,
    fontSize: 15,
    lineHeight: 23,
    flexShrink: 1,
  },

  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    gap: 7,
    borderWidth: 1,
    borderColor: colors.border,
  },

  profileLabel: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.1,
  },

  profileName: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '700',
    flexShrink: 1,
  },

  profileEmail: {
    color: colors.textSecondary,
    fontSize: 13,
    flexShrink: 1,
  },

  statsContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: 12,
  },

  statCard: {
    flex: 1,
    minWidth: 0,
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },

  statValue: {
    color: colors.primary,
    fontSize: 25,
    fontWeight: '800',
    flexShrink: 1,
  },

  statValueCompact: {
    fontSize: 19,
  },

  statLabel: {
    color: colors.textSecondary,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    lineHeight: 15,
    flexShrink: 1,
  },

  primaryButton: {
    minHeight: 50,
    width: '100%',
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
    flexShrink: 1,
  },

  buttonPressed: {
    opacity: 0.85,
  },

  sectionTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '700',
    marginTop: 8,
  },

  postCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 16,
  },

  postCardPressed: {
    opacity: 0.85,
  },

  postImagePlaceholder: {
    minHeight: 120,
    height: 145,
    backgroundColor: colors.primary,
    justifyContent: 'flex-end',
    padding: 14,
  },

  postBadge: {
    alignSelf: 'flex-start',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
    borderWidth: 1,
    borderColor: '#FFFFFF80',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  postContent: {
    padding: 16,
    gap: 10,
  },

  postTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 25,
    flexShrink: 1,
  },

  postDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    flexShrink: 1,
  },

  postDate: {
    color: colors.primary,
    fontSize: 12,
    marginTop: 4,
  },

  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 28,
    gap: 12,
  },

  statusText: {
    color: colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },

  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 14,
  },

  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },

  emptyDescription: {
    color: colors.textSecondary,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },

  errorText: {
    color: colors.primary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
  },

  retryButton: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  },

  retryButtonText: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 15,
  },

  restrictedTitle: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
  },

  restrictedDescription: {
    color: colors.textSecondary,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});