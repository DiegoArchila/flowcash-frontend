// colors.js
const colors = {
  brand: {
    50: "#e9f5ff",
    100: "#c2e0ff",
    200: "#99ccff",
    300: "#70b8ff",
    400: "#47a3ff",
    500: "#1e90ff", // Main brand color, for primary actions and highlights
    600: "#0077e6",
    700: "#005bb4",
    800: "#003f82",
    900: "#002351",
  },
  gray: {
    50: "#f7fafc",
    100: "#edf2f7",
    200: "#e2e8f0", 
    300: "#cbd5e0",
    400: "#a0aec0",
    500: "#718096", // Common gray for general use parragraphs and borders
    600: "#4a5568",
    700: "#2d3748",
    800: "#1a202c", 
    900: "#000000", 
  },

  // Colors for status indicators
  error: {
    50: "#ffebee", // Light red, almost white (background)
    100: "#ffcdd2",
    500: "#e53e3e", // Main red (text, border, icon)
    700: "#c53030", // Darker red for contrast in text or borders
  },
  success: {
    50: "#e8f5e9", // Light green (background)
    100: "#c8e6c9",
    500: "#38a169", // Main green
    700: "#2f855a", // Darker green
  },
  info: {
    50: "#e3f2fd", // Light blue (background)
    100: "#bbdefb",
    500: "#3182ce", // Main blue
    700: "#2c5282", // Darker blue
  },
  warning: {
    50: "#fff3e0", // Light orange/yellow (background)
    100: "#ffe0b2",
    500: "#dd6b20", // Main orange
    700: "#c05621", // Darker orange
  },

  // Colors for text elements
  text: {
    headings: "#1a202c", // Almost pure black for headings, using a shade of your gray
    subheadings: "#2d3748", // A dark gray for subheadings
    paragraphs: "#4a5568", // Medium-dark gray for paragraph readability
    labels: "#718096", // Slightly lighter gray for labels or auxiliary text
    links: "#1e90ff", // Brand color for links
    disabled: "#a0aec0", // Color for disabled text
  },

};

export default colors;