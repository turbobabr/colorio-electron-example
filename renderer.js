

document.getElementById('color-button').addEventListener('click',function() {
    window.ipcRenderer.send('pickColor');
});

function objToCSSColor(color) {
    return 'rgb('+Math.round(color.r*255) + ',' + Math.round(color.g*255) + ',' + Math.round(color.b*255)+')'
}

window.ipcRenderer.on('onColorPicked',function(event,res) {    
    if(res.result !== 'picked') {
        return;
    }
    
    const color = objToCSSColor(res.color);
    document.getElementById('color-preview').style.backgroundColor = color;
    document.getElementById('selected-color').innerText = color;
});
