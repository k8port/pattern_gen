// js/algorithms/randomLines.js
randomLines = (canvas, ctx, colors) => { //receive canvas, context and colors.
    for (let i = 0; i < 50; i++) {
        ctx.beginPath();
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
        const lineColor = colors[randInt(0, colors.length)];
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = Math.random() * 3;
        ctx.stroke();
    }
};
