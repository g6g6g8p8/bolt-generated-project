export function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

export async function getImageColor(imageUrl: string): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        resolve('#000000');
        return;
      }
      
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0, count = 0;
      
      // Sample pixels from the bottom third of the image
      const startY = Math.floor(canvas.height * 0.66);
      for (let y = startY; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
          const i = (y * canvas.width + x) * 4;
          r += imageData[i];
          g += imageData[i + 1];
          b += imageData[i + 2];
          count++;
        }
      }
      
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      
      resolve(`rgb(${r},${g},${b})`);
    };
    
    img.onerror = () => {
      resolve('#000000');
    };
    
    img.src = imageUrl;
  });
}

export function useTheme() {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const root = document.documentElement;
  
  if (isDarkMode) {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', 'light');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (e.matches) {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  });
}