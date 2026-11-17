
import { StyleSheet } from 'react-native';

export const commentCardStyles = StyleSheet.create({
  container: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#DCCDBB',
    paddingVertical: 18,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },

  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#711C1B',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  avatarText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },

  authorInfo: {
    flex: 1,
    minWidth: 0,
  },

  author: {
    color: '#711C1B',
    fontSize: 15,
    fontWeight: '700',
    flexShrink: 1,
  },

  date: {
    color: '#75675D',
    fontSize: 12,
    marginTop: 4,
  },

  content: {
    color: '#493325',
    fontSize: 15,
    lineHeight: 24,
    flexShrink: 1,
  },

  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },

  actionButton: {
    minHeight: 48,
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  actionText: {
    color: '#711C1B',
    fontSize: 14,
    fontWeight: '700',
  },

  deleteText: {
    color: '#A12727',
    fontSize: 14,
    fontWeight: '700',
  },
});