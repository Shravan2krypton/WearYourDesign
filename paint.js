const canvas = document.getElementById('paintCanvas');
const ctx = canvas.getContext('2d');

const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const shapeSelect = document.getElementById('shape');
const eraserBtn = document.getElementById('eraserBtn');
const fillBtn = document.getElementById('fillBtn');
const clearBtn = document.getElementById('clearBtn');
const uploadBtn = document.getElementById('uploadBtn');
const imageInput = document.getElementById('imageInput');
const saveBtn = document.getElementById('saveBtn');
const submitBtn = document.getElementById('submitBtn');

canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 200;

let painting = false;
let erasing = false;
let shape = 'free';
let startX, startY;

function startPosition(e) {
    painting = true;
    startX = e.offsetX;
    startY = e.offsetY;
    if (shape === 'free') draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
    if (shape !== 'free') drawShape();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = brushSize.value;
    ctx.lineCap = 'round';
    ctx.strokeStyle = erasing ? '#fff' : colorPicker.value;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
}

function drawShape() {
    const endX = startX + 100;
    const endY = startY + 100;

    ctx.beginPath();
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;

    switch (shape) {
        case 'line':
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            break;
        case 'rectangle':
            ctx.rect(startX, startY, endX - startX, endY - startY);
            break;
        case 'circle':
            const radius = Math.abs(endX - startX) / 2;
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            break;
        case 'triangle':
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.lineTo(startX - 50, endY);
            ctx.closePath();
            break;
    }

    ctx.stroke();
}

// Eraser
eraserBtn.addEventListener('click', () => {
    erasing = !erasing;
    eraserBtn.textContent = erasing ? 'Draw' : 'Eraser';
});

// Fill Canvas
fillBtn.addEventListener('click', () => {
    ctx.fillStyle = colorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// Clear Canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Upload Image
uploadBtn.addEventListener('click', () => {
    imageInput.click();
});

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = event.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Save Canvas
saveBtn.addEventListener('click', () => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'custom-product.png';
    link.href = image;
    link.click();
    alert('Image saved successfully!');
});

// Submit Canvas
submitBtn.addEventListener('click', () => {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'submitted-product.png';
    link.href = image;
    link.click();
    alert('Drawing submitted successfully!');
});

// Event Listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

shapeSelect.addEventListener('change', () => {
    shape = shapeSelect.value;
});
// Add image preview functionality
const imagePreview = document.getElementById('imagePreview');

imageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            // Display image in preview container
            imagePreview.src = event.target.result;

            // Draw image on canvas
            const img = new Image();
            img.onload = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear canvas before drawing new image
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            };
            img.src = event.target.result;
        };

        reader.readAsDataURL(file);
    }
});
