'use strict';


// Draw a cloud shape.
var drawCloudShape = function (ctx, cloudX, cloudY, cloudWidth, cloudHeight) {
  ctx.beginPath();
  ctx.moveTo(cloudX, cloudY);
  ctx.lineTo(cloudX + cloudWidth / 2, cloudY + 10);
  ctx.lineTo(cloudX + cloudWidth, cloudY);
  ctx.lineTo(cloudX + cloudWidth - 10, cloudY + cloudHeight / 2);
  ctx.lineTo(cloudX + cloudWidth, cloudY + cloudHeight);
  ctx.lineTo(cloudX + cloudWidth / 2, cloudY + cloudHeight - 10);
  ctx.lineTo(cloudX, cloudY + cloudHeight);
  ctx.lineTo(cloudX + 10, cloudY + cloudHeight / 2);
  ctx.closePath();
  ctx.fill();
};

// Draw a cloud with a shade.
var drawCloud = function (ctx, cloudX, cloudY, cloudWidth, cloudHeight) {
  var cloudColor = 'white';
  var shadeColor = 'rgba(0, 0, 0, 0.7)';

  ctx.fillStyle = shadeColor;
  drawCloudShape(ctx, cloudX + 10, cloudY + 10, cloudWidth, cloudHeight);
  ctx.fillStyle = cloudColor;
  drawCloudShape(ctx, cloudX, cloudY, cloudWidth, cloudHeight);
};


// Find a maximum value in an numbers array.
var findMax = function (numbers) {
  var maxValue = numbers[0];
  for (var i = 1; i < numbers.length; i++) {
    if (maxValue < numbers[i])
      maxValue = numbers[i];
  }

  return maxValue;
};


// Draw a single histogram bar.
var drawHistogramBar = function (
  ctx, histogramX, histogramY, maxValue,
  i, value, label, barColor, textColor, textFont, lineHeight) {

  var histogramHeight = 150;
  var barWidth = 40;
  var barIndent = 50;
  var step = histogramHeight / maxValue;

  ctx.fillStyle = barColor;

  // Draw the bar.
  var barHeight = value * step;
  var barX = histogramX + (barWidth + barIndent) * i;
  var barY = histogramY + histogramHeight - barHeight;
  ctx.fillRect(barX, barY, barWidth, barHeight);

  // Draw the bar labels.
  ctx.fillStyle = textColor;
  ctx.font = textFont;
  ctx.fillText(Math.floor(value), barX, barY - 5);
  ctx.fillText(label, barX, histogramY + histogramHeight + lineHeight);
};


// Render game result statistics.
var renderStatistics = function (ctx, names, times) {
  var cloudX = 100;
  var cloudY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  drawCloud(ctx, cloudX, cloudY, cloudWidth, cloudHeight);

  var leftIndent = 30;
  var topIndent = 35;
  var lineHeight = 20;

  var textColor = 'black';
  var textFont = '16px PT Mono';

  // Draw result messages.
  ctx.fillStyle = textColor;
  ctx.font = textFont;
  ctx.fillText('Ура вы победили!', cloudX + leftIndent, cloudY + topIndent);
  ctx.fillText('Список результатов:', cloudX + leftIndent, cloudY + topIndent + lineHeight);

  // Find a maximal game time.
  var maxTime = findMax(times);

  // Draw the times histogram.
  var histogramLeftIndent = 45;
  var histogramX = cloudX + leftIndent + lineHeight;
  var histogramY = cloudY + topIndent + histogramLeftIndent;

  for (var i = 0; i < names.length; i++) {
    // Calculate the histograma bar color.
    var barColor = names[i] === 'Вы' ?
        'red' : 'rgb(0, 0, ' + Math.floor(Math.random() * 255) + ')';

    // Draw the histogram bar.
    drawHistogramBar(
      ctx, histogramX, histogramY, maxTime,
      i, times[i], names[i], barColor,
      textColor, textFont, lineHeight);
  }
};
