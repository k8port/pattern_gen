//js/algorithms/fractalLines.j
fractalLines = (canvas, ctx, x1, y1, length, angle, depth, lineColor, patternColors) => {
    if (depth === 0) return;
    const x2 = x1 + Math.cos(angle) * length;
    const y2 = y1 + Math.sin(angle) * length;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = lineColor;
    ctx.stroke();

    let colorGroup = patternColors;
    const lineColor2Index = Math.floor(Math.random() * patternColors.length);   
    const lineColor2 = patternColors[lineColor2Index];
    patternColors = patternColors.filter((_, index) => index !== lineColor2Index);

    fractalLines(canvas, ctx, x2, y2, length * 0.7, angle - 0.3, depth - 1, lineColor2, colorGroup);

    const lineColor3Index = Math.floor(Math.random() * patternColors.length);
    const lineColor3 = patternColors[lineColor3Index];
    patternColors = patternColors.filter((_, index) => index !== lineColor3Index);

    fractalLines(canvas, ctx, x2, y2, length * 0.7, angle + 0.3, depth - 1, lineColor3, colorGroup);
};

runFractalLines = (canvas, ctx, colors) => {
    let patternColors = colors;
    ctx.lineWidth = 3;
    const lineColorIndex = Math.floor(Math.random() * colors.length);
    const lineColor = colors[lineColorIndex];
    patternColors = patternColors.filter((_, index) => index !== lineColorIndex);

    const lineColor2Index = Math.floor(Math.random() * patternColors.length);
    const lineColor2 = patternColors[lineColor2Index];
    patternColors = patternColors.filter((_, index) => index !== lineColor2Index);
    
    const lineColor3Index = Math.floor(Math.random() * patternColors.length);
    const lineColor3 = patternColors[lineColor3Index];
    patternColors = patternColors.filter((_, index) => index !== lineColor3Index);

    fractalLines(canvas, ctx, canvas.width / 2, canvas.height, 150, -Math.PI / 2, 8, lineColor, colors);
};


