// js/algorithms/randomGradients.js
randomGradients = (canvas, ctx, colors) => {
    // const gradient = Math.random() < 0.5
    // ? ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    // : ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2);

// const primaryColorIndex = Math.floor(Math.random() * colors.length);    
// const primaryColor = colors[primaryColorIndex];
// colors = colors.filter((_, index) => index !== primaryColorIndex);

// const secondaryColorIndex = Math.floor(Math.random() * colors.length);
// const secondaryColor = colors[secondaryColorIndex];
// const gradientColor1 = primaryColor;
// const gradientColor2 = secondaryColor;
// gradient.addColorStop(0, gradientColor1);
// gradient.addColorStop(1, gradientColor2);
    // Generate random number between 1-3 to determine gradient type
    const gradientType = Math.floor(Math.random() * 3) + 1;
    
    let gradient;
    switch (gradientType) {
        case 1: // Linear gradient
            gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            break;
        case 2: // Radial gradient
            gradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0, 
                canvas.width / 2, canvas.height / 2, canvas.width / 2
            );
            break;
        case 3: // Conic gradient
            gradient = ctx.createConicGradient(0, canvas.width / 2, canvas.height / 2);
            break;
    }

    // Determine number of color stops
    let numColorStops = Math.floor(Math.random() * 4) + 2; // Random between 2-5
    
    // For conic gradient, always use 5 color stops
    if (gradientType === 3) {
        numColorStops = 5;
    }
    
    // Create a copy of colors to work with
    let availableColors = [...colors];
    
    // Select colors for gradient stops
    for (let i = 0; i < numColorStops; i++) {
        // If we're out of colors and need more (especially for conic gradient)
        if (availableColors.length === 0) {
            // Take a random color from original colors and adjust brightness
            const baseColorIndex = Math.floor(Math.random() * colors.length);
            const baseColor = colors[baseColorIndex];
            
            // Convert hex to RGB, adjust brightness, convert back to hex
            const rgb = hexToRgb(baseColor);
            const adjustment = Math.random() * 0.5 - 0.25; // -25% to +25% brightness
            const newColor = rgbToHex(
                Math.min(255, Math.max(0, Math.round(rgb.r * (1 + adjustment)))),
                Math.min(255, Math.max(0, Math.round(rgb.g * (1 + adjustment)))),
                Math.min(255, Math.max(0, Math.round(rgb.b * (1 + adjustment))))
            );
            
            availableColors.push(newColor);
        }
        
        // Pick a random color from available colors
        const colorIndex = Math.floor(Math.random() * availableColors.length);
        const color = availableColors[colorIndex];
        
        // Remove the color from available colors to avoid repetition
        availableColors.splice(colorIndex, 1);
        
        // Add color stop
        gradient.addColorStop(i / (numColorStops - 1), color);
    }

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
};

// Helper function to convert hex color to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Helper function to convert RGB to hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}