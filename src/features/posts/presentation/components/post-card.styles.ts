import { StyleSheet } from 'react-native';

export const postCardStyles = StyleSheet.create({
  card: {
    flex: 1,
    width: '100%',
    backgroundColor: '#DFC8B9',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#5C3826',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },

  cardPressed: {
    opacity: 0.85,
  },

  coverContainer: {
    width: '100%',
    aspectRatio: 3.4,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#6B3A25',
    justifyContent: 'flex-end',
  },

  cover: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  coverBadge: {
    alignSelf: 'flex-start',
    margin: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#C79B74',
    borderRadius: 20,
    backgroundColor: 'rgba(60, 30, 16, 0.7)',
  },

  coverBadgeText: {
    color: '#F3E8D0',
    fontSize: 11,
    fontWeight: '700',
  },

  content: {
    paddingTop: 16,
    gap: 12,
    flexGrow: 1,
  },

  title: {
    color: '#402718',
    fontSize: 18,
    lineHeight: 25,
    fontWeight: '700',
  },

  description: {
    color: '#6F5146',
    fontSize: 14,
    lineHeight: 22,
  },

  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
    marginTop: 'auto',
    paddingTop: 10,
  },

  author: {
    color: '#805D4F',
    fontSize: 12,
    lineHeight: 18,
  },

  authorName: {
    color: '#793E32',
    fontWeight: '700',
  },

  date: {
    color: '#805D4F',
    fontSize: 12,
    lineHeight: 18,
  },
});