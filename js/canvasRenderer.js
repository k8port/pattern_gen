// js/canvasRenderer.js
const canvasRenderer = {
    drawPattern: (canvas, colors) => {
        if (!canvas) {
            console.error("Canvas element is null.");
            return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.error("Could not get 2D context.");
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.reset();
        if (colors) {
            // Convert colors object to array of color values
            const colorValues = Object.values(colors);
            // Randomly select background color
            const bgIndex = Math.floor(Math.random() * colorValues.length);
            const bgColor = colorValues[bgIndex];
            // Create array of remaining colors
            const patternColors = colorValues.filter((_, index) => index !== bgIndex);
            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Pass remaining colors to pattern generator
            patternGenerator.generatePattern(canvas, ctx, patternColors);
        } else {
            colors = uiController.generateRandomPalette();
            patternGenerator.generatePattern(canvas, ctx, colors);
        }
    }
};
