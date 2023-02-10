const container = document.querySelector(".grid_container");
const colorButton = document.querySelector(".drawing_color");
const eraserButton = document.querySelector(".eraser");
const rainbowButton = document.querySelector(".rainbow");
const clearButton = document.querySelector(".clear");
const allBtns = document.querySelectorAll("button");
let sizeDisplay = document.querySelector(".size");
let slider = document.querySelector(".slider");
let color = document.querySelector(".color_picker");
let allSquares = 0;
let squares = slider.value;


function createGrid(squares){
    for (i = 0; i < squares * squares; i++){
    const grid_square = document.createElement("div");
    grid_square.classList.add('grid_square');
    container.appendChild(grid_square);
    }
    sizeDisplay.textContent = `${squares} x ${squares}`;
    allSquares = document.querySelectorAll(".grid_square");
    allSquares.forEach(gridbox => gridbox.addEventListener('dragstart', function(event){
        event.preventDefault();
    }));
    container.style.cssText = `grid-template-columns: repeat(${squares}, 
                                1fr); grid-template-rows: repeat(${squares}, 1fr);`;
}

function resetGrid(){
    let allSquares = document.querySelectorAll(".grid_square");
    allSquares.forEach(element => {
        element.remove();
    });
}

function drawingColor(allSquares){
    let draw = function(e){
        e.target.style.background = `${color.value}`;
    };
    
    allSquares.forEach(box => box.addEventListener('mousedown', function(e){
        draw(e);
        allSquares.forEach(box => box.addEventListener('mouseenter', draw)); 
    }));

    allSquares.forEach(box => box.addEventListener('mouseup', function(e){
        allSquares.forEach(box => box.removeEventListener('mouseenter', draw));
    }));
}

function erasing(allSquares){
    let erase = function(e){
        e.target.style.background = "white";
    };

    allSquares.forEach(box => box.addEventListener('mousedown', function(e){
        erase(e);
        allSquares.forEach(box => box.addEventListener('mouseenter', erase));
    }));

    allSquares.forEach(box => box.addEventListener('mouseup', function(e){
        allSquares.forEach(box => box.removeEventListener('mouseenter', erase));
    }));
}

function drawingRainbow(allSquares){
    let rainbow = function(e){
        let red = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        e.target.style.background = `rgb(${red},${blue},${green})`;
    }

    allSquares.forEach(box => box.addEventListener('mousedown',function(){
        allSquares.forEach(box => box.addEventListener('mouseenter', rainbow));
    }));

    allSquares.forEach(box => box.addEventListener('mouseup', function(){
        allSquares.forEach(box => box.removeEventListener('mouseenter', rainbow));
    }));
}

function clearDrawing(allSquares){
    allSquares.forEach(box => box.style.background = "white");
}


colorButton.addEventListener('click', function(){
    drawingColor(allSquares);
});

eraserButton.addEventListener('click', function(){
    erasing(allSquares);
});

rainbowButton.addEventListener('click', function(){
    drawingRainbow(allSquares);
});

clearButton.addEventListener('click', function(){
    clearDrawing(allSquares);
});


slider.addEventListener('input', function(){
    sizeDisplay.textContent = `${slider.value} x ${slider.value}`;
});

slider.addEventListener('mouseup', function(){
    squares = slider.value
    resetGrid();
    createGrid(squares);
    drawingColor(allSquares);
})


for (let i = 0; i < allBtns.length; i++){
    allBtns[i].addEventListener('click', function(e){
        if (e.target == clearButton){
            e.target.style.background = "#20262E"
        }
        else{
        const currentColor = allBtns[i].style.background;
        allBtns.forEach(button => {
            button.style.background = "";
        })
        e.target.style.background = currentColor || "#913175";
    }
    })
}

createGrid(squares);

