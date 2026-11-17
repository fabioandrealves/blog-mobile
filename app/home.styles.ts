import { StyleSheet } from 'react-native';

export const homeStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3E8D0',
  },

  listContent: {
    width: '100%',
    maxWidth: 1600,
    alignSelf: 'center',
    paddingHorizontal: 32,
    paddingTop: 32,
    paddingBottom: 56,
    flexGrow: 1,
  },

  listContentSmall: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  header: {
    marginBottom: 28,
    gap: 24,
  },

  authActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
  },

  actionButton: {
    minHeight: 44,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#6B3A25',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },

  actionButtonOutline: {
    minHeight: 44,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#6B3A25',
    alignItems: 'center',
    justifyContent: 'center',
  },

  actionButtonOutlineText: {
    color: '#6B3A25',
    fontSize: 14,
    fontWeight: '700',
  },

  hero: {
    width: '100%',
    gap: 20,
  },

  heroDesktop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 32,
  },

  heroContent: {
    flex: 1,
    minWidth: 0,
    gap: 12,
  },

  title: {
    color: '#402718',
    fontSize: 42,
    lineHeight: 52,
    fontWeight: '700',
    letterSpacing: -1,
  },

  titleSmall: {
    fontSize: 30,
    lineHeight: 38,
  },

  description: {
    color: '#6F5B4E',
    fontSize: 16,
    lineHeight: 25,
    maxWidth: 520,
  },

  searchContainer: {
    width: '100%',
  },

  searchDesktop: {
    width: 300,
    flexShrink: 0,
  },

  gridRow: {
    gap: 20,
  },

  gridItem: {
    flex: 1,
    minWidth: 0,
    marginBottom: 20,
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 16,
  },

  statusText: {
    color: '#402718',
    fontSize: 16,
  },

  errorContainer: {
    gap: 12,
    alignItems: 'flex-start',
  },

  error: {
    color: '#A12727',
    fontSize: 15,
    lineHeight: 23,
  },

  empty: {
    color: '#806B5A',
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 40,
  },
});