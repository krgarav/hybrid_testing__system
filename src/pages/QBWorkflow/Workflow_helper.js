export const SAMPLE_CSS = `#diagramEventsControlSection .sb-mobile-palette {
    width: 200px;
    height: 100%;
    float: left;
  }

 #diagramEventsControlSection .sb-mobile-palette-bar {
    display: none;
}

 #diagramEventsControlSection .sb-mobile-diagram {
    width: calc(100% - 200px);
    height: 100%;
    float: left;
    border: 1px solid #d9dedd;
  }
  

  @media (max-width: 550px) {
    #diagramEventsControlSection .sb-mobile-palette {
      z-index: 19;
      position: absolute;
      display: none;
      transition: transform 300ms linear, visibility 0s linear 300ms;
      width: 39%;
      height: 100%;
    }

    #diagramEventsControlSection .sb-mobile-palette-bar {
      display: block;
      width: 100%;
      background: #fafafa;
      padding: 10px 10px;
      border: 0.5px solid #e0e0e0;
      min-height: 40px;
    }

    #diagramEventsControlSection .sb-mobile-diagram {
      width: 100%;
      height: 100%;
      float: left;
      left: 0px;
    }

    #diagramEventsControlSection #palette-icon {
      font-size: 20px;
    }
  }

  #diagramEventsControlSection .sb-mobile-palette-open {
    position: absolute;
    display: block;
    right: 15px;
  }

  @font-face {
    font-family: "e-ddb-icons1";
    src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj1tSfIAAAEoAAAAVmNtYXDnEOdVAAABiAAAADZnbHlmdC1P4gAAAcgAAAAwaGVhZBJhohMAAADQAAAANmhoZWEIVQQDAAAArAAAACRobXR4CAAAAAAAAYAAAAAIbG9jYQAYAAAAAAHAAAAABm1heHABDgAUAAABCAAAACBuYW1lm+wy9gAAAfgAAAK1cG9zdLnsYngAAASwAAAAMAABAAAEAAAAAFwEAAAAAAAD+AABAAAAAAAAAAAAAAAAAAAAAgABAAAAAQAAgNcenF8PPPUACwQAAAAAANelrs4AAAAA16WuzgAAAAAD+AN6AAAACAACAAAAAAAAAAEAAAACAAgAAgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQQAAZAABQAAAokCzAAAAI8CiQLMAAAB6wAyAQgAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnAAQAAAAAXAQAAAAAAAABAAAAAAAABAAAAAQAAAAAAAACAAAAAwAAABQAAwABAAAAFAAEACIAAAAEAAQAAQAA5wD//wAA5wD//wAAAAEABAAAAAEAAAAAAAAAGAAAAAIAAAAAA/gDegACAAcAACUhCQEhATUhAQQC9P6G/YoBMQFF/YqGAjf+hgH0QwAAAAAAEgDeAAEAAAAAAAAAAQAAAAEAAAAAAAEAEwABAAEAAAAAAAIABwAUAAEAAAAAAAMAEwAbAAEAAAAAAAQAEwAuAAEAAAAAAAUACwBBAAEAAAAAAAYAEwBMAAEAAAAAAAoALABfAAEAAAAAAAsAEgCLAAMAAQQJAAAAAgCdAAMAAQQJAAEAJgCfAAMAAQQJAAIADgDFAAMAAQQJAAMAJgDTAAMAAQQJAAQAJgD5AAMAAQQJAAUAFgEfAAMAAQQJAAYAJgE1AAMAAQQJAAoAWAFbAAMAAQQJAAsAJAGzIERpYWdyYW1fU2hhcGVzX0ZPTlRSZWd1bGFyRGlhZ3JhbV9TaGFwZXNfRk9OVERpYWdyYW1fU2hhcGVzX0ZPTlRWZXJzaW9uIDEuMERpYWdyYW1fU2hhcGVzX0ZPTlRGb250IGdlbmVyYXRlZCB1c2luZyBTeW5jZnVzaW9uIE1ldHJvIFN0dWRpb3d3dy5zeW5jZnVzaW9uLmNvbQAgAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQAUgBlAGcAdQBsAGEAcgBEAGkAYQBnAHIAYQBtAF8AUwBoAGEAcABlAHMAXwBGAE8ATgBUAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQAVgBlAHIAcwBpAG8AbgAgADEALgAwAEQAaQBhAGcAcgBhAG0AXwBTAGgAYQBwAGUAcwBfAEYATwBOAFQARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAdQBzAGkAbgBnACAAUwB5AG4AYwBmAHUAcwBpAG8AbgAgAE0AZQB0AHIAbwAgAFMAdAB1AGQAaQBvAHcAdwB3AC4AcwB5AG4AYwBmAHUAcwBpAG8AbgAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgECAQMABlNoYXBlcwAA)
      format("truetype");
    font-weight: normal;
    font-style: normal;
  }

  .e-ddb-icons1 {
    font-family: "e-ddb-icons1";
    speak: none;
    font-size: 16px;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #diagramEventsControlSection .e-toggle-palette::before {
    content: "\e700";
  }

  
  #diagramEventsPropertySection .event-tracer {
    width: 240px;
    height: 700px;
    min-height: 700px;
    float: left;
  }

 #diagramEventsPropertySection .heading {
    color: #807f7f;
    font-size: 15px;
    height: 50px;
    width: 100%;
    border-bottom: 1px solid #d9dedd;
    padding: 10px;
  }

  #EventLog b {
    color: #388e3c;
  }

  hr {
    margin: 1px 10px 1px 0px;
    border-top: 1px solid #eee;
  }

  .property-section {
    padding-top: 20px;
    padding-bottom: 20px;
    height: 740px;
    padding-right: 0px;
  }

  #diagramEventsPropertySection .evtbtn { 
    float: right; 
  }

  #diagramEventsPropertySection .listbox {
    width: 100%;
    height: 50%;
  }

 #diagramEventsPropertySection .event-tracer .prop-grid {
    width: 100%;
    height: 50%;
  }

 #diagramEventsPropertySection #EventLog {
    height: calc(100% - 50px);
    padding: 15px;
    overflow: auto;
    width: 100%;
  }`;

//Initialize the basicshapes for the symbol palatte
export let basicShapes = [
    { id: 'Rectangle', shape: { type: 'Basic', shape: 'Rectangle' } },
    { id: 'Ellipse', shape: { type: 'Basic', shape: 'Ellipse' } },
    // { id: 'Parallelogram', shape: { type: 'Basic', shape: 'Parallelogram' } },
    // { id: 'Triangle', shape: { type: 'Basic', shape: 'Triangle' } },
    // { id: 'Hexagon', shape: { type: 'Basic', shape: 'Hexagon' } },
    // { id: 'Pentagon', shape: { type: 'Basic', shape: 'Pentagon' } },
    // { id: 'Cylinder', shape: { type: 'Basic', shape: 'Cylinder' } },
    // { id: 'Plus', shape: { type: 'Basic', shape: 'Plus' } },
    // { id: 'Heptagon', shape: { type: 'Basic', shape: 'Heptagon' } },
    // { id: 'Octagon', shape: { type: 'Basic', shape: 'Octagon' } },
    // { id: 'Trapezoid', shape: { type: 'Basic', shape: 'Trapezoid' } },
    // { id: 'Decagon', shape: { type: 'Basic', shape: 'Decagon' } },
    // { id: 'RightTriangle', shape: { type: 'Basic', shape: 'RightTriangle' } },
    // { id: 'Diamond', shape: { type: 'Basic', shape: 'Diamond' } },
    // { id: 'Star', shape: { type: 'Basic', shape: 'Star' } }
];
//Initializes connector symbols for the symbol palette
export let connectorSymbols = [
    {
        id: 'Link1', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
        id: 'link3', type: 'Orthogonal', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'Link21', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        targetDecorator: { shape: 'Arrow', style: { strokeColor: '#757575', fill: '#757575' } }, style: { strokeWidth: 1, strokeColor: '#757575' }
    },
    {
        id: 'link23', type: 'Straight', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
    {
        id: 'link33', type: 'Bezier', sourcePoint: { x: 0, y: 0 }, targetPoint: { x: 60, y: 60 },
        style: { strokeWidth: 1, strokeColor: '#757575' }, targetDecorator: { shape: 'None' }
    },
];