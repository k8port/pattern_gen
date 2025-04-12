
function rand (min, max) {
  return Math.random() * (max - min) + min
}

function randInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randNormal (mu, sigma) {
  var sum = 0
  for (var i = 0; i < 6; i += 1) {
    sum += rand(-1, 1)
  }
  return mu + sigma * sum / 6
}

function normalPDF (x, mu, sigma) {
  var sigma2 = Math.pow(sigma, 2)
  var numerator = Math.exp(-Math.pow((x - mu), 2) / (2 * sigma2))
  var denominator = Math.sqrt(2 * Math.PI * sigma2)
  return numerator / denominator
}

runUnknownPleasures = (canvas, ctx, colors) => {
    var patternColors = colors;
    if (colors) {
        const colorValues = Object.values(colors);
        const bgColorIndex = Math.floor(Math.random() * colorValues.length);
        const bgColor = colorValues[bgColorIndex];
        patternColors = colorValues.filter((_, index) => index !== bgColor);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Determine x and y range
    var xMin = 140
    var xMax = canvas.width - xMin
    var yMin = 100
    var yMax = canvas.height - yMin

    // Determine the number of lines and the number of points per line
    var nLines = 80
    var nPoints = 80

    var mx = (xMin + xMax) / 2
    var dx = (xMax - xMin) / nPoints
    var dy = (yMax - yMin) / nLines

    var x = xMin
    var y = yMin
    ctx.moveTo(xMin, yMin)
   
    

    if (patternColors) {
        const bgIndex = Math.floor(Math.random() * patternColors.length);
        const bgColor = patternColors[bgIndex];
        patternColors = patternColors.filter((_, index) => index !== bgIndex);
        const strokeColorIndex = Math.floor(Math.random() * patternColors.length);  
        const strokeColor = patternColors[strokeColorIndex];  
        ctx.fillStyle = bgColor;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 1.2
    } else {
        ctx.fillStyle = 'black'
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 1.2
    }
    for (var i = 0; i < nLines; i++) {
        ctx.beginPath()
        // Generate random parameters for the line's normal distribution
        var nModes = randInt(1, 4)
        var mus = []
        var sigmas = []
        for (var j = 0; j < nModes; j++) {
            mus[j] = rand(mx - 50, mx + 50)
            sigmas[j] = randNormal(24, 30)
        }
        var w = y
        for (var k = 0; k < nPoints; k++) {
            x = x + dx
            var noise = 0
            for (var l = 0; l < nModes; l++) {
                noise += normalPDF(x, mus[l], sigmas[l])
            }
            var yy = 0.3 * w + 0.7 * (y - 600 * noise + noise * Math.random() * 200 + Math.random())
            ctx.lineTo(x, yy)
            w = yy
        }
        // Cover the previous lines
        ctx.fill()
        // Draw the current line
        ctx.stroke()
        // Go to the next line
        x = xMin
        y = y + dy
        ctx.moveTo(x, y)
    }
}
