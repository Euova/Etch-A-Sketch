const container = document.querySelector(".grid_container");
const squareNumberSelector = document.querySelector(".num_squares");
const blackButton = document.querySelector(".drawing_black");
const eraserButton = document.querySelector(".eraser");
let allSquares = 0;
let squares = 16;

function createGrid(squares){
    for (i = 0; i < squares * squares; i++){
    const grid_square = document.createElement("div");
    grid_square.classList.add('grid_square');
    container.appendChild(grid_square);
    }
    allSquares = document.querySelectorAll(".grid_square");
    container.style.cssText = `grid-template-columns: repeat(${squares}, 
                                1fr); grid-template-rows: repeat(${squares}, 1fr);`;
}

function resetGrid(){
    let allSquares = document.querySelectorAll(".grid_square");
    allSquares.forEach(element => {
        element.remove();
    });
}

function drawingBlack(allSquares){
    // allSquares.forEach(box => box.addEventListener('mouseover', function(e){
    //     e.target.style.background = "black";
    // }));
    let draw = function(e){
        e.target.style.background = "black";
    };

    allSquares.forEach(box => box.addEventListener('mousedown', function(e){
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
        allSquares.forEach(box => box.addEventListener('mouseenter', erase));
    }));

    allSquares.forEach(box => box.addEventListener('mouseup', function(e){
        allSquares.forEach(box => box.removeEventListener('mouseenter', erase));
    }));
}



blackButton.addEventListener('click', function(){
    drawingBlack(allSquares);
});

eraserButton.addEventListener('click', function(){
    erasing(allSquares);
});

squareNumberSelector.addEventListener('click', function(){
    squares = prompt("Squares Per Side: ");
    if (squares > 100){
        alert("Please enter a number less than 100");
    }
    else{   
    resetGrid();
    createGrid(squares);
    drawingBlack(allSquares);
    }
});

createGrid(squares);
