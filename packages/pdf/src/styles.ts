import { StyleSheet } from '@react-pdf/renderer';

/**
 * PDF uses ARCANE style — cream/ivory, art deco, printable.
 * Courier for monospace consistency across platforms.
 */
export const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f5f0e8',
    color: '#1a1208',
    fontFamily: 'Courier',
    fontSize: 10,
    padding: 40,
    paddingBottom: 60,
  },

  // Cover page
  cover: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    letterSpacing: 8,
    color: '#8b6914',
    marginBottom: 8,
  },
  coverTagline: {
    fontSize: 10,
    color: '#3d2b0a',
    marginBottom: 40,
    fontStyle: 'italic',
  },
  coverName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1208',
    marginBottom: 4,
  },
  coverDate: {
    fontSize: 11,
    color: '#3d2b0a',
  },
  coverNotice: {
    marginTop: 50,
    padding: 16,
    borderWidth: 1,
    borderColor: '#8b6914',
    maxWidth: 400,
  },
  coverNoticeTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#8b6914',
    marginBottom: 6,
    textAlign: 'center',
  },
  coverNoticeBody: {
    fontSize: 8,
    color: '#3d2b0a',
    textAlign: 'center',
    lineHeight: 1.5,
  },

  // Section headers
  sectionTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#8b6914',
    marginBottom: 10,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#8b6914',
    paddingBottom: 4,
  },

  // Number display
  numberRow: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: '#a0845c',
  },
  numberLabel: {
    width: 100,
    fontSize: 9,
    color: '#3d2b0a',
    fontWeight: 'bold',
  },
  numberValue: {
    width: 40,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8b6914',
  },
  numberMaster: {
    fontSize: 7,
    color: '#8b6914',
    marginLeft: 4,
  },
  numberInterpretation: {
    flex: 1,
    fontSize: 8,
    color: '#3d2b0a',
    lineHeight: 1.4,
  },

  // Lens labels
  lensLabel: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#8b6914',
    marginTop: 4,
    marginBottom: 1,
  },
  lensText: {
    fontSize: 8,
    color: '#3d2b0a',
    lineHeight: 1.4,
    marginBottom: 3,
  },

  // Correspondences table
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#a0845c',
    paddingVertical: 3,
  },
  tableHeader: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#8b6914',
  },
  tableCell: {
    fontSize: 8,
    color: '#3d2b0a',
    flex: 1,
  },

  // System comparison
  compCol: {
    flex: 1,
    textAlign: 'center',
    fontSize: 8,
  },

  // Footer disclaimer
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
    fontSize: 6,
    color: '#a0845c',
    lineHeight: 1.3,
  },

  // Decorative border
  ornamentTop: {
    borderTopWidth: 2,
    borderTopColor: '#8b6914',
    marginBottom: 20,
  },
});
