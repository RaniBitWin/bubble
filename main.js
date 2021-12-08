/****************************************************************
    Constant settings
/****************************************************************/
const settings = {
  r: 255, //argument to the r parameter of the d3.rgb() function
  g: 255, //argument to the g parameter of the d3.rgb() function
  b: 255, //argument to the b parameter of the d3.rgb() function
  nBubbleStop: 2, //maximum amount of bubbles per event
  cxStart: 1350, //the x maximum limit where bubbles start on the screen
  cxStop: 1350, //the x maximum limit where bubbles stop on the screen
  cyStartUp: 660, //the y maximum limit where bubbles start on the screen
  cyStopUp: 10, //the y maximum limit where bubbles stop on the screen
  cyStartDown: -35, //the x maximum limit where bubbles start on the screen
  cyStopDown: 600, //the y maximum limit where bubbles start on the screen
  cxText: 65, //positions the text in the center of the bubble
  cyStartText: 660, //the cy maximum limit where bubbles  start on the screen
  cyStopText: 81, //the cy maximum limit where bubbles stop on the screen
  xStartText: 1200, //the x maximum limit where text start on the screen
  xStopText: 1200, //the x maximum limit where text stop on the screen
  yStartText: 660, //the y maximum limit where text start on the screen
  yStopText: 81, //the y maximum limit where text stop on the screen
  fontFamily: 'Arial',
  fontWeight: 900,
  fontSize: 16,
  fillTextInit: 'black',
  fillTextEnd: 'red',
  fillUp: 'transparent', //bubble fill color
  fillDown: 'transparent', //bubble fill color
  fillBubbleText: 'transparent', //bubble fill color
  transitionDuration: 15000, //the transition time
  bubbleRayText: 80, //the radius of the bubble text
  bubbleRayInit: 35, //the radius of the bubble init
  bubbleRayStop: 0, //the radius of the bubble stop
  strokeWidth: 0.9 //bubble edge thickness
}

/****************************************************************
    Generates random integers
/****************************************************************/
function randInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/****************************************************************
    Access the svg tag by its id and append an element (circle) to it.
/****************************************************************/
class Bubble {
  constructor() {
    this.bubbleOne = d3.select('#bubbleOne').append('circle')
  }
}

/****************************************************************
    Create an array of circle and assign each element an name. The new element in the array is guaranteed by the constructor Bubble().
/****************************************************************/
function newsBubbles() {
  let bubbleslist = []
  let bubblesNames
  bubblesNames = window
  for (let nBubble = 0; nBubble < settings.nBubbleStop; nBubble++) {
    bubbleslist.push((window['bubble' + nBubble] = new Bubble()))
  }
  return bubbleslist
}

/****************************************************************
    Transforms array of circles - newsBubbles() - by index.
    Randomly sets the color of the bubble border, decreases the radius of the bubbles up to a value of 0 (disappearing effect), performs the bouncing effect on the page border.
/****************************************************************/
let bubbleShape = {
  /****************************************************************
    Directs the bubbles from the bottom to the top of the page.
/****************************************************************/
  bubbleUp() {
    for (let nBubble = 0; nBubble < settings.nBubbleStop; nBubble++) {
      newsBubbles()
        [nBubble].bubbleOne.attr('cx', randInt(0, settings.cxStart))
        .attr('cy', settings.cyStartUp)
        .attr('r', settings.bubbleRayInit)
        .style('fill', settings.fillUp)
        .style(
          'stroke',
          d3.rgb(
            randInt(0, settings.r),
            randInt(0, settings.g),
            randInt(0, settings.b)
          )
        )
        .style('stroke-width', settings.strokeWidth)
        .transition()
        .duration(settings.transitionDuration)
        .attr('cx', randInt(0, settings.cxStop))
        .attr('cy', settings.cyStopUp)
        .ease(d3.easeElastic)
        .ease(d3.easeBackIn)
        .ease(d3.easeElasticIn)
        .ease(d3.easeBounce)
        .ease(d3.easeElasticOut)
        .ease(d3.easeBounce)
        .attr('r', settings.bubbleRayStop)
        .remove()
    }
  },

  /****************************************************************
    Directs the bubbles from the top to the bottom of the page.
/****************************************************************/
  bubbleDown() {
    for (let nBubble = 0; nBubble < settings.nBubbleStop; nBubble++) {
      newsBubbles()
        [nBubble].bubbleOne.attr('cx', randInt(0, settings.cxStart))
        .attr('cy', settings.cyStartDown)
        .attr('r', settings.bubbleRayInit)
        .style('fill', settings.fillDown)
        .style(
          'stroke',
          d3.rgb(
            randInt(0, settings.r),
            randInt(0, settings.g),
            randInt(0, settings.b)
          )
        )
        .style('stroke-width', settings.strokeWidth)
        .transition()
        .duration(settings.transitionDuration)
        .attr('cx', randInt(0, settings.cxStop))
        .attr('cy', settings.cyStopDown)
        .ease(d3.easeElastic)
        .ease(d3.easeBackIn)
        .ease(d3.easeElasticIn)
        .ease(d3.easeBounce)
        .ease(d3.easeElasticOut)
        .ease(d3.easeBounce)
        .attr('r', settings.bubbleRayStop)
        .remove()
    }
  },

  /****************************************************************
    Shows a text message in a bubble with instructions to click on the screen
/****************************************************************/
  bubbleText(text) {
    let positionStartX = randInt(0, settings.xStartText)
    let positionStopX = randInt(0, settings.xStopText)
    let messageInBubble = d3.select('#bubbleOne').append('g')

    let clickAnywhere = messageInBubble
      .append('text')
      .text(text)
      .attr('x', positionStartX)
      .attr('y', settings.yStartText)
      .style('font-family', settings.fontFamily)
      .style('font-weight', settings.fontWeight)
      .style('font-size', settings.fontSize)
      .style('fill', settings.fillTextInit)
      .transition()
      .duration(settings.transitionDuration)
      .attr('x', positionStopX)
      .attr('y', settings.yStopText)
      .ease(d3.easeElastic)
      .ease(d3.easeBackIn)
      .ease(d3.easeElasticIn)
      .ease(d3.easeBounce)
      .ease(d3.easeElasticOut)
      .ease(d3.easeBounce)
      .style('fill', settings.fillTextEnd)

    let textInBubble = messageInBubble
      .append('circle')
      .attr('cx', settings.cxText + positionStartX)
      .attr('cy', settings.cyStartText)
      .attr('r', settings.bubbleRayText)
      .style('fill', settings.fillBubbleText)
      .style(
        'stroke',
        d3.rgb(
          randInt(0, settings.r),
          randInt(0, settings.g),
          randInt(0, settings.b)
        )
      )
      .style('stroke-width', settings.strokeWidth)
      .transition()
      .duration(settings.transitionDuration)
      .attr('cx', settings.cxText + positionStopX)
      .attr('cy', settings.cyStopText)
      .ease(d3.easeElastic)
      .ease(d3.easeBackIn)
      .ease(d3.easeElasticIn)
      .ease(d3.easeBounce)
      .ease(d3.easeElasticOut)
      .ease(d3.easeBounce)
  }
}

bubbleShape.bubbleUp()
bubbleShape.bubbleDown()
bubbleShape.bubbleText('click anywhere')
bubbleShape.bubbleText('high frequency')
