const r = document.querySelector(':root');
const container = document.querySelector('.cont');
const slider = document.querySelector('#slider');
const sliderLabel = document.querySelector("#slider-label"); 
const clear = document.querySelector('#clear');
const black = document.querySelector('#black');
const eraser = document.querySelector('#eraser');
const rgb = document.querySelector('#rgb');
const cur = document.querySelector('#current-selector');
cur.setAttribute('style','font-size:2em')

const makeRows = (noOfRows) => 
{
    container.style.setProperty('--rowsNo',noOfRows);
    container.style.setProperty('--columnsNo',noOfRows);
    for(let i=0;i<(noOfRows*noOfRows);i++)
    {
        let newrowcell = document.createElement('div');
        container.appendChild(newrowcell).className = "grid-item";
    }
};

function colorchange (color){
    let cells = document.querySelectorAll('div.grid-item');
    cells.forEach((cell)=>{
        cell.addEventListener('mouseover',(e)=>cell.setAttribute('style',`background:${color}`));
    });
};

const randomcolor = () => {
    let a =Math.floor(Math.random()*255);
    let b =Math.floor(Math.random()*255);
    let c =Math.floor(Math.random()*255);
    let d =Math.random();
    function round(value,precision)
    {   
        var multiplier = Math.pow(10,precision||0);
        return Math.round(value*multiplier)/multiplier;
    }
    d = round(d,1);
    return (`rgb(${a},${b},${c},${d}`);
}

function rgbchange (){
    cur.textContent = ':RGB';
    let cells = document.querySelectorAll('div.grid-item');
    cells.forEach((cell)=>{
        cell.addEventListener('mouseover',(e)=>{
            let rgbcolor = randomcolor();
            cell.setAttribute('style',`background:${rgbcolor}`);
    });
});
}

const def =()=>{
    makeRows(16,16);
    sliderLabel.innerHTML = `<span>16</span>`;
    cur.textContent = ':black';
};

def();
const clrscr = ()=>{
    clear.addEventListener('click',()=>{
        colorchange('black');
        let cells = document.querySelectorAll('div.grid-item');
        cells.forEach((cell)=>{
            cell.setAttribute('style','background:white');
        })
    });
}

const blackscreen = ()=>{
    black.addEventListener('click',()=>{
        cur.textContent = ':black';
        colorchange('black');
    });
}

const erase = () =>{
    eraser.addEventListener('click',()=>{
        cur.textContent = ':white';
        colorchange('white');
    })
}

const rainbow = ()=>{
    rgb.addEventListener('click',()=>{
        rgbchange();
    });
}
const defcolchange = ()=>{
    colorchange('black');
    clrscr();
    blackscreen();
    erase();
    rainbow();
}
defcolchange();


slider.addEventListener('mouseup',function(e)
{
    cur.textContent = ':black';
    while(container.firstChild)
    {
        container.removeChild(container.firstChild);
    }
    sliderLabel.innerHTML = `<span>${e.target.value}</span>`;
    makeRows(e.target.value); 
    colorchange('black');
    clrscr();
    blackscreen();
    erase();
    rainbow();
});