
class Triangle {
  constructor (a, b, c, angle, height) {
    this.a = a
    this.b = b
    this.c = c
    this.angle = angle
    this.height = height
  }

  draw (ctx, color, steps, stepSize, lineWidth, bgColor, accentColor) {
    ctx.strokeStyle = accentColor 
    ctx.lineWidth = lineWidth
    ctx.beginPath();
    ctx.moveTo(this.a.x, this.a.y)
    ctx.lineTo(this.b.x, this.b.y)
    ctx.lineTo(this.c.x, this.c.y)
    ctx.lineTo(this.a.x, this.a.y)
    ctx.fillStyle = color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    var height = Math.sqrt(Math.pow(this.height, 2)) - this.height / 2
    var d = new Point((this.b.x + this.c.x) / 2, (this.b.y + this.c.y) / 2)

    // Draw inner lines
    ctx.strokeStyle = bgColor
    ctx.lineWidth = lineWidth

    for (var i = 1; i <= steps; i++) {
      var r = (stepSize * i) / height
      var c = new Point(
        this.a.x + (d.x - this.a.x) * r,
        this.a.y + (d.y - this.a.y) * r,
      )
      var innerTriangle = newTriangle(c, this.angle, this.height - r * this.height)
      ctx.beginPath();
      ctx.moveTo(innerTriangle.a.x, innerTriangle.a.y)
      ctx.lineTo(innerTriangle.b.x, innerTriangle.b.y)
      ctx.moveTo(innerTriangle.a.x, innerTriangle.a.y)
      ctx.lineTo(innerTriangle.c.x, innerTriangle.c.y)
      ctx.stroke();
      ctx.closePath();
    }

    // Draw hollow part
    var r = (stepSize * steps) / height
    var c = new Point(
      this.a.x + (d.x - this.a.x) * r,
      this.a.y + (d.y - this.a.y) * r,
    )
    var innerTriangle = newTriangle(c, this.angle, this.height - r * this.height)
    ctx.beginPath();
    ctx.moveTo(innerTriangle.a.x, innerTriangle.a.y)
    ctx.lineTo(innerTriangle.b.x, innerTriangle.b.y)
    ctx.lineTo(innerTriangle.c.x, innerTriangle.c.y)
    ctx.lineTo(innerTriangle.a.x, innerTriangle.a.y)
    ctx.fillStyle = accentColor;
    ctx.fill();
    ctx.closePath();
  }
}

function degreesToRadians(angle) {
  return angle * Math.PI / 180
}

function newTriangle(center, angle, height) {
  var b = new Point(
    height * Math.cos(degreesToRadians(angle - 30)) + center.x,
    height * Math.sin(degreesToRadians(angle - 30)) + center.y
  )
  var c = new Point(
    height * Math.cos(degreesToRadians(angle + 30)) + center.x,
    height * Math.sin(degreesToRadians(angle + 30)) + center.y
  )
  return new Triangle(center, b, c, angle, height)
}

function randomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

runStellaTriangles = (canvas, ctx, colors) => {
    var patternColors = colors;
    // Begin drawing
    if (patternColors) {
        const primaryColorIndex = Math.floor(Math.random() * patternColors.length);
        const primaryColor = patternColors[primaryColorIndex];
        patternColors = patternColors.filter((_, index) => index !== primaryColorIndex);
       
        const secondaryColorIndex = Math.floor(Math.random() * patternColors.length);
        const secondaryColor = patternColors[secondaryColorIndex];
        patternColors = patternColors.filter((_, index) => index !== secondaryColorIndex);  

        const tertiaryColorIndex = Math.floor(Math.random() * patternColors.length);
        const tertiaryColor = patternColors[tertiaryColorIndex];
        patternColors = patternColors.filter((_, index) => index !== tertiaryColorIndex);

        const bgColorIndex = Math.floor(Math.random() * patternColors.length);
        const bgColor = patternColors[bgColorIndex];
        patternColors = patternColors.filter((_, index) => index !== bgColorIndex);

        const accentColorIndex = Math.floor(Math.random() * colors.length);
        const accentColor = colors[accentColorIndex];

      newTriangle(new Point(450, 100), -210, 400).draw(ctx, primaryColor, 8, 15, 3, bgColor, accentColor)
      newTriangle(new Point(450, 100), -270, 400).draw(ctx, secondaryColor, 8, 15, 3, bgColor, accentColor)
      newTriangle(new Point(450, 100), -330, 400).draw(ctx, tertiaryColor, 8, 15, 3, bgColor, accentColor)
    } else {
    newTriangle(new Point(450, 100), -210, 400).draw(ctx, randomColor(), 8, 15, 3, 'white')
      newTriangle(new Point(450, 100), -270, 400).draw(ctx, randomColor(), 8, 15, 3, 'white')
      newTriangle(new Point(450, 100), -330, 400).draw(ctx, randomColor(), 8, 15, 3, 'white')
    }
}