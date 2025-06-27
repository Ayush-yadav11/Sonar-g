// Helper to convert hex colors to HSL for CSS custom properties
function hexToHsl(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [
    Math.round(h * 360),
    Math.round(s * 100),
    Math.round(l * 100)
  ];
}

// Light theme colors
const lightColors = {
  "background": "#FAFAFA",
  "backgroundSecondary": "#F0F0F0", 
  "card": "#FFFFFF",
  "textPrimary": "#111111",
  "textSecondary": "#555555",
  "accentGold": "#D4AF37",
  "accentHover": "#BFA334",
  "border": "#E0E0E0",
  "success": "#28A745",
  "warning": "#FFB300",
  "error": "#D32F2F",
  "link": "#0056D2"
};

// Dark theme colors
const darkColors = {
  "background": "#121212",
  "backgroundSecondary": "#1E1E1E",
  "card": "#2F2F2F", 
  "textPrimary": "#EAEAEA",
  "textSecondary": "#AAAAAA",
  "accentGold": "#D4AF37",
  "accentHover": "#FFD700",
  "border": "#3A3A3A",
  "success": "#38C172",
  "warning": "#F4C430", 
  "error": "#E53935",
  "link": "#66B2FF"
};

console.log('Light theme HSL values:');
Object.entries(lightColors).forEach(([name, hex]) => {
  const [h, s, l] = hexToHsl(hex);
  console.log(`--${name}: ${h} ${s}% ${l}%; /* ${hex} */`);
});

console.log('\nDark theme HSL values:');
Object.entries(darkColors).forEach(([name, hex]) => {
  const [h, s, l] = hexToHsl(hex);
  console.log(`--${name}: ${h} ${s}% ${l}%; /* ${hex} */`);
});
