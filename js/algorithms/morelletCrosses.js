

class Square {
  constructor (origin, length, colour) {
    this.origin = origin
    this.length = length
    this.colour = colour
  }

  draw (ctx) {
    // Draw clockwise
    ctx.beginPath()
    ctx.moveTo(this.origin.x, this.origin.y)
    ctx.lineTo(this.origin.x + this.length, this.origin.y)
    ctx.lineTo(this.origin.x + this.length, this.origin.y + this.length)
    ctx.lineTo(this.origin.x, this.origin.y + this.length)
    ctx.lineTo(this.origin.x, this.origin.y)
    // We want the border color and the fill color to match
    ctx.strokeStyle = this.colour;
    ctx.fillStyle = this.colour;
    // Color the border and the body
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}

class Cross {
  constructor (left, top, right, bottom, center) {
    this.left = left
    this.top = top
    this.right = right
    this.bottom = bottom
    this.center = center
  }

  draw (ctx) {
    this.left.draw(ctx);
    this.top.draw(ctx);
    this.right.draw(ctx);
    this.bottom.draw(ctx);
    this.center.draw(ctx);
  }
}

function makeCross(center, squareLength, color) {
  // For convenience
  var l = squareLength
  var x = center.x
  var y = center.y
  // The position of each square can be guessed from the center of the cross
  var left   = new Square(new Point(x - 1.5 * l, y - 0.5 * l), l, color)
  var top    = new Square(new Point(x - 0.5 * l, y - 1.5 * l), l, color)
  var right  = new Square(new Point(x + 0.5 * l, y - 0.5 * l), l, color)
  var bottom = new Square(new Point(x - 0.5 * l, y + 0.5 * l), l, color)
  var center = new Square(new Point(x - 0.5 * l, y - 0.5 * l), l, color)
  // Assemble the squares and return the resulting cross
  return new Cross(left, top, right, bottom, center)
}

function drawRow(start, squareLength, color1, color2, ctx) {
  var x = start.x
  var y = start.y
  var i = 0
  while (true) {
    var color = [color1, color2][i % 2]
    makeCross(new Point(x, y), squareLength, color).draw(ctx)
    if (x > 800) { break }
    x = x + 5 * squareLength
    i = i + 1
  }
}

function adjustColorBrightness(color, factor) {
  let r, g, b;
  
  if (color.startsWith('#')) {
    const hex = color.substring(1);
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (color.startsWith('rgb(')) {
    const match = color.match(/\d+/g);
    r = parseInt(match[0]);
    g = parseInt(match[1]);
    b = parseInt(match[2]);
  } else {
    return color; 
  }

  // adjust brightness
  r = Math.max(0, Math.min(255, Math.round(r * factor)));
  g = Math.max(0, Math.min(255, Math.round(g * factor)));
  b = Math.max(0, Math.min(255, Math.round(b * factor)));
  
  // return hex 
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

runMorelletCrosses = (canvas, ctx, colors) => {
    var squareLength = 800 / 16;

    // create color array wht 6 distinct colors
    let colorArray = [...colors];
    // generate additonal colors if not enough
    while (colorArray.length < 6) {
      // create a new color by brightening existing color
      const baseColor = colorArray[colorArray.length % colorArray.length];
      const newColor = adjustColorBrightness(baseColor, colorArray.length % 2 === 0 ? 1.3 : 0.7);
      colorArray.push(newColor);
    }

    // var blue = '#006597';
    // var orange = '#ff5c30';
    // var yellow = '#ffd652';
    // var purple =  '#562b42';
    // var red = '#df2933';
    // var green = '#177b4b';

    var blue = colorArray[0];
    var orange = colorArray[1];
    var yellow = colorArray[2];
    var purple = colorArray[3];
    var red = colorArray[4];
    var green = colorArray[5];

    var x = 1.5 * squareLength;
    var y = -0.5 * squareLength;
    var i = 0;
    var j = 5;
    var rc = 0;
    var colors = [purple, blue, green, yellow, orange, red];
    var mirror = [yellow, orange, red, purple, blue, green];

    while (true) {
        if (rc % 2 == 0) {
            var idx = i;
            i = (i + 1) % 6;
        } else {
            var idx = j;
            j = (j + 1) % 6;
        }
        var color1 = colors[idx];
        var color2 = mirror[idx];
        drawRow(new Point(x, y), squareLength, color1, color2, ctx);
        // Stop if we've gone past the bottom of the canvas
        if (y > 800) { break }
            // Update the first cross coordinates and the row counter
            if (rc % 2 == 0) {
                x = x - 3 * squareLength;
            } else {
            x = x + 2 * squareLength;
        }
        y = y + 1 * squareLength;
        rc = rc + 1;
    }
}
