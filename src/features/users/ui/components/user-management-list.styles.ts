import { StyleSheet } from 'react-native';

export const userManagementListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3E8D0',
  },

  list: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
    gap: 16,
  },

  header: {
    marginBottom: 12,
    gap: 6,
  },

  heading: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: '700',
    color: '#402718',
  },

  headingCompact: {
    fontSize: 23,
    lineHeight: 32,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: '#755B4C',
  },

  gridRow: {
    gap: 16,
  },

  card: {
    flex: 1,
    minWidth: 0,
    padding: 20,
    backgroundColor: '#DFC8B9',
    borderRadius: 14,
    gap: 12,
    marginBottom: 16,
  },

  cardGrid: {
    flex: 1,
  },

  name: {
    fontSize: 19,
    lineHeight: 27,
    fontWeight: '700',
    color: '#402718',
  },

  email: {
    fontSize: 15,
    lineHeight: 23,
    color: '#654B3D',
  },

  editForm: {
    gap: 10,
  },

  fieldLabel: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '600',
    color: '#402718',
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#A98B79',
    borderRadius: 10,
    backgroundColor: '#FFF9F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: '#402718',
    fontSize: 16,
  },

  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },

  actionsCompact: {
    flexDirection: 'column',
  },

  button: {
    minHeight: 48,
    minWidth: 96,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#EADFD3',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#402718',
  },

  primaryButton: {
    minHeight: 48,
    minWidth: 96,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#704632',
    alignItems: 'center',
    justifyContent: 'center',
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  deleteButton: {
    minHeight: 48,
    minWidth: 96,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    backgroundColor: '#A23D37',
    alignItems: 'center',
    justifyContent: 'center',
  },

  deleteText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  disabledButton: {
    opacity: 0.5,
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },

  emptyText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#755B4C',
    textAlign: 'center',
  },
});
