// js/algorithms/randomRectangles.js
randomRectangles = (canvas, ctx, colors) => {
    // Helper functions for color manipulation
    const adjustBrightness = (color, factor) => {
        // Handle non-hex colors
        if (!color || typeof color !== 'string' || !color.startsWith('#')) {
            return color; // Return original color if not in hex format
        }
        
        try {
            // Convert hex to RGB
            let r = parseInt(color.slice(1, 3), 16);
            let g = parseInt(color.slice(3, 5), 16);
            let b = parseInt(color.slice(5, 7), 16);
            
            // Adjust brightness
            r = Math.min(255, Math.max(0, Math.round(r * factor)));
            g = Math.min(255, Math.max(0, Math.round(g * factor)));
            b = Math.min(255, Math.max(0, Math.round(b * factor)));
            
            // Convert back to hex
            return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        } catch (e) {
            return color; // Return original color if any error occurs
        }
    };
    
    const withTransparency = (color, alpha) => {
        // Handle non-hex colors and existing rgba colors
        if (!color || typeof color !== 'string') {
            return color;
        }
        
        // If it's already rgba, just return it or adjust its alpha
        if (color.startsWith('rgba(')) {
            return color;
        }
        
        // If it's rgb format, convert to rgba
        if (color.startsWith('rgb(')) {
            return color.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
        }
        
        // Handle hex format
        if (color.startsWith('#')) {
            try {
                // Convert hex to RGBA
                let r = parseInt(color.slice(1, 3), 16);
                let g = parseInt(color.slice(3, 5), 16);
                let b = parseInt(color.slice(5, 7), 16);
                
                return `rgba(${r}, ${g}, ${b}, ${alpha})`;
            } catch (e) {
                return color; // Return original color if any error occurs
            }
        }
        
        // For named colors or other formats, use as is
        return color;
    };
    
    for (let i = 0; i < 30; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const width = Math.random() * 100;
        const height = Math.random() * 100;
        
        // Get base color from palette
        const baseColor = colors[randInt(0, colors.length)];
        
        // Apply random color transformations
        const colorVariation = Math.random();
        let fillColor;
        
        if (colorVariation < 0.33) {
            // Adjust brightness (darker or brighter)
            const brightnessFactor = 0.5 + Math.random() * 1.5; // 0.5 to 2.0
            fillColor = adjustBrightness(baseColor, brightnessFactor);
        } else if (colorVariation < 0.66) {
            // Add transparency
            const alpha = 0.3 + Math.random() * 0.7; // 0.3 to 1.0
            fillColor = withTransparency(baseColor, alpha);
        } else {
            // Use base color (sometimes with slight transparency)
            fillColor = Math.random() > 0.5 ? 
                baseColor : 
                withTransparency(baseColor, 0.8 + Math.random() * 0.2); // 0.8 to 1.0
        }
        
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, width, height);
    }
}