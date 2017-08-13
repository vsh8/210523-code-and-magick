'use strict';


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

var drawCloud = function (ctx, cloudX, cloudY, cloudWidth, cloudHeight) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  drawCloudShape(ctx, cloudX + 10, cloudY + 10, cloudWidth, cloudHeight);
  ctx.fillStyle = 'white';
  drawCloudShape(ctx, cloudX, cloudY, cloudWidth, cloudHeight);
};


window.renderStatistics = function (ctx, names, times) {
  var cloudX = 100;
  var cloudY = 10;
  var cloudWidth = 420;
  var cloudHeight = 270;
  drawCloud(ctx, cloudX, cloudY, cloudWidth, cloudHeight);

  var leftIndent = 30;
  var topIndent = 35;
  var lineHeight = 20;

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', cloudX + leftIndent, cloudY + topIndent);
  ctx.fillText('Список результатов:', cloudX + leftIndent, cloudY + topIndent + lineHeight);

  // Find a maximal game time.
  var maxTime = times[0];
  for (var i = 1; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = times[i];
    }
  }

  // Draw the times histogram.
  var histogramLeftIndent = 45;
  var histogramX = cloudX + leftIndent + lineHeight;
  var histogramY = cloudY + topIndent + histogramLeftIndent;
  var histogramHeight = 150;
  var barWidth = 40;
  var barIndent = 50;
  var step = histogramHeight / maxTime;
  for (i = 0; i < names.length; i++) {
    // Set the bar color.
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = 'rgb(0, 0, ' + Math.floor(Math.random() * 255) + ')';
    }

    // Draw the bar.
    var barHeight = times[i] * step;
    var barX = histogramX + (barWidth + barIndent) * i;
    var barY = histogramY + histogramHeight - barHeight;
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // Draw the bar labels.
    ctx.fillStyle = 'black';
    ctx.fillText(Math.floor(times[i]), barX, barY - 5);
    ctx.fillText(names[i], barX, histogramY + histogramHeight + lineHeight);
  }
};
