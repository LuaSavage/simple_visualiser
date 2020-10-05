let visualiser = {
  linesCount: 6,
  lines: [],

  initialise: function(){
    let container = document.createElement('div');
    container.className = "container";
    document.body.append(container);

    for (var i = 0; i < this.linesCount; i++) {
      let div = document.createElement('div');
      div.className = "line";
      container.append(div);
      this.lines[i] = div;
    }
  },

  applyWaveData: function(waveData){

    if ((typeof waveData) != "object") {
        return false
    }

    if (waveData.length < this.lines.length) {
      let startPosition = waveData.length >= 0 ? waveData.length-1:0;

      for (let i = startPosition; i<this.lines.length; i++) {
        waveData[i] = 0;
      }
      
    } else {
      let groupLen = 1 + Math.floor(waveData.length/this.lines.length);
      let position = 0;

      while (waveData.length > this.lines.length) {
        let mathAvg = waveData.slice(position, position+groupLen).reduce(summ)/groupLen;
        waveData.splice(position, groupLen, mathAvg); 
        position++;
      }
    }

    for (let i = 0; i<this.lines.length; i++){
      this.lines[i].style.height = waveData[i] +"%";
    }

    return true;

  }  
}

visualiser.initialise();

//test
function tryModifyHeight(){
  let testArr = [];

  for (let i = 0; i<256; i ++) {
    testArr[i]= Math.random()*100;
  }

  visualiser.applyWaveData(testArr);
}

setInterval(tryModifyHeight, 500 );
