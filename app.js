/****************************************************************
      This app is a demonstration of using the 3d.js library and SVG.
      When clicking anywhere on the screen bubbles with colored borders appear:
          1) from the bottom of the page towards the top of the page;
          2) from the top of the page towards the bottom of the page;
          3) The bubbles shrink in size until they disappear.
      Shows a text message in a bubble with instructions to click on the screen
/****************************************************************/
import('main.js')

function app() {
  d3.select(bubbleShape.bubbleUp(), bubbleShape.bubbleDown())
}
d3.select('#bubbleOne').on('click', app)
