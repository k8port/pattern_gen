//js/algorithms/randomCircles.js
randomCircles = (canvas, ctx, colors) => {
    for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 50;
        const fillColor = colors[randInt(0, colors.length)];
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
};