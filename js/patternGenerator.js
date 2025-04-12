// js/patternGenerator.js 
const patternGenerator = { 
    generatePattern: (canvas, ctx, colors) => { //receive canvas and context.
        const algorithms = [randomLines, randomRectangles, runFractalLines, randomGradients, randomCircles, runRecursivePolygons, runMondrian, runUnknownPleasures, runMorelletCrosses, runStellaTriangles];
        const randomAlgorithm = algorithms[Math.floor(Math.random() * algorithms.length)];
        randomAlgorithm(canvas, ctx, colors); //pass canvas, context and colors.
    }
};