function selectTab(tabId) {
    // Remove 'active' class from all tabs
    const tabs = document.querySelectorAll('.step');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Add 'active' class to the clicked tab
    const clickedTab = document.getElementById(tabId);
    clickedTab.classList.add('active');

    // Invoke any other JavaScript method or perform actions related to the clicked tab
    //console.log(`Selected ${tabId}`);
    // You can add more actions related to the tab selection here
    const panelSize = document.getElementById("size")
    const panelColor = document.getElementById("color")
    const panelFeatures = document.getElementById("features")
    const panelOrder = document.getElementById("order")
    panelSize.classList.remove("active")
    panelColor.classList.remove("active")
    panelFeatures.classList.remove("active")
    panelOrder.classList.remove("active")
    switch(tabId) {
        case "step1": { panelSize.classList.add("active") ; break }
        case "step2": { panelColor.classList.add("active") ; break }
        case "step3": { panelFeatures.classList.add("active") ; break }
        case "step4": { panelOrder.classList.add("active") ; break }
    }
}

function handleImageClick(imageId) {
    // Log the image ID or perform other actions
    console.log(`Image clicked: ${imageId}`);

    // Optional: Add a border to highlight the selected image
    const images = document.querySelectorAll('.image');
    images.forEach(img => {
        img.style.borderColor = 'transparent'; // Reset border color
    });
    const selectedImage = document.getElementById(imageId);
    selectedImage.style.borderColor = '#f44336'; // Highlight selected image
    var imgURL = "";
    for(var i = 0; i<wallImageIDs.length; i++)
        if (wallImageIDs[i] === (imageId)) {
            selectedWallID = i
            imgURL = wallImageURLs[i]
        }
    if(imageId == "imageCustom")
        img.src = document.getElementById("imageCustom").src
    else
        img.src = imgURL+document.getElementById("myCanvas").width //document.getElementById("svgDivID").style.backgroundImage = `url(${imgURL})`/*${selectedImage.src}urls[id]*/
    refreshScreen()
}

function handleFileSelect() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            // Create a new image element to display the selected image
            const newImage = document.createElement('img');
            newImage.id = 'imageCustom'
            newImage.src = e.target.result;
            newImage.className = 'image';
            newImage.onclick = () => handleImageClick(newImage.id);

            // Add the new image to the bottom bar
            const bottomBar = document.querySelector('.bottom-bar');
            bottomBar.insertBefore(newImage, bottomBar.lastElementChild); // Insert before the button
            img.src = newImage.src
            refreshScreen()
        };
        reader.readAsDataURL(file);
    }
}
function updatePreview() {
    refreshScreen()
    //rect.attr({fill: selectedColor})
    // previewBox.style.backgroundColor = selectedColor;
    // if (selectedTexture !== 'none') {
    //     previewBox.style.backgroundImage = `url(${selectedTexture})`;
    //     previewBox.style.backgroundColor = 'transparent'; // Hide color if texture is applied
    // } else {
    //     previewBox.style.backgroundImage = 'none';
    // }
}

function heightSliderTweak(){
    var rangeHeight = document.getElementById("rangeHeight")
    doorHeight = parseInt(rangeHeight.value)
    var numberHeight = document.getElementById("height")
    numberHeight.value = doorHeight
    coords.h = doorHeight
    refreshScreen()
}

function heightNumberTweak(){
    var rangeHeight = document.getElementById("rangeHeight")
    var numberHeight = document.getElementById("height")
    doorHeight = parseInt(numberHeight.value)
    rangeHeight.value = doorHeight
    coords.h = doorHeight
    refreshScreen()
}


function widthSliderTweak(){
    var rangeWidth = document.getElementById("rangeWidth")
    doorWidth = parseInt(rangeWidth.value)
    var numberWidth = document.getElementById("width")
    numberWidth.value = doorWidth
    coords.w = doorWidth
    refreshScreen()
}

function widthNumberTweak(){
    var rangeWidth = document.getElementById("rangeWidth")
    var numberWidth = document.getElementById("width")
    doorWidth = parseInt(numberWidth.value)
    rangeWidth.value = doorWidth
    coords.w = doorWidth
    refreshScreen()
}

colorGrid.addEventListener('click', function(event) {
    if (event.target.classList.contains('color')) {
        selectedColor = event.target.getAttribute('data-color');
        selectedTexture = ""
        updatePreview();
    }
});

textureGrid.addEventListener('click', function(event) {
    if (event.target.classList.contains('texture')) {
        selectedTexture = event.target .getAttribute('data-texture');
        selectedColor = ""
        updatePreview();
    }
});

function drawImageWithRectangle(imageUrl, rectColor, rectSize) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    //console.log('A ' + canvas.width)
    var div = document.getElementById('svgDivID').getBoundingClientRect()
    canvas.width = div.width
    canvas.height = div.height
    //console.log('B ' + canvas.width)
    // Create an image object
/*    var img = new Image();
    img.onload = function() {
        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    }*/ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        var canvasScaleX = canvas.width/800;
        var canvasScaleY = canvas.height/600;/*height*/
        var w = doorWidth * 0.5
        var h = doorHeight * 0.5
        var y = 50
        var rectX = canvas.width * 0.5 /** canvasScaleX*/ - coords.w * 0.5 /** canvasScaleX*/
        var rectY = canvas.height * 0.5 /** canvasScaleY*/ - coords.h * 0.5 /** canvasScaleY*/
        // Draw the rectangle on top of the image
        ctx.fillStyle = 'white' //brown
        ctx.fillRect(rectX-3, rectY-3, coords.w+6, coords.h+6)
        ctx.fillStyle = rectColor
        if (selectedColor != "")
            ctx.fillRect(rectX/*+rectX*canvasScaleX*/, /*50+*/rectY/**canvasScaleY*/, coords.w/**canvasScaleX*//*w*0.5*/, coords.h/**canvasScaleY*//*h*0.5*/)
        else if (selectedTexture != ""){ //console.log(textures[selectedTexture]) /*textures.forEach(item => {})*/
            ctx.drawImage(textures[selectedTexture], rectX, /*50+*/rectY, coords.w/**0.5*/, coords.h/**0.5*/)}
        //ctx.fillRect(100,/*canvas.width/2 - rectSize/2,*/ 19+(105-doorHeight/5)/*canvas.height/2 - rectSize/2*/, doorWidth/3/**canvasScaleX*/, doorHeight/5/**canvasScaleY*/);
        //drawDoor(5*100/doorWidth, 5*100/doorHeight) //svg()
        // var svgUrl = 'data:image/svg+xml;base64,' + btoa(new XMLSerializer().serializeToString(document.getElementById('svgCanvas')));
        ctx.fillStyle = "green"
        var drawLock = document.getElementById("lock").checked
        var drawHandle = document.getElementById("handle").checked
        var drawHinges = document.getElementById("hinges").checked
        var drawPeephole = document.getElementById("peephole").checked
        var drawDoorbell = document.getElementById("doorbell").checked
        // var drawPetdoor = document.getElementById("petdoor").checked
        if(drawLock) { feature(rectX+coords.w-30, 50+rectY+coords.h*0.35, 9, 16, ctx) }
        if(drawHandle) { feature(rectX+coords.w-30/**0.3*/, 50+rectY+coords.h*0.31, 16, 5, ctx) }
        if(drawHinges) { feature(rectX-6, 50+rectY+coords.h*0.05+3, 16, 16, ctx) ; feature(rectX-6, /*50+*/rectY+coords.h-coords.h*0.3+3, 16, 16, ctx) }
        if(drawPeephole) { feature(rectX+coords.w*0.5-3, 50+rectY+coords.h*0.1-3, 16, 16, ctx); }
        if(drawDoorbell) { feature(rectX+coords.w, 50+rectY+coords.h*0.1, 9, 9, ctx) }
        // if(drawPetdoor) ctx.fillRect(rectX+w*0.35, 5+rectY+h*0.8, 16, 16)
        // var imgSVG = new Image();
        // imgSVG.onload = function() {
        // ctx.drawImage(img, 0, 0);
        // };
        // imgSVG.src = svgUrl;
        arrow(rectX/*+coords.w*/, rectY/*-coords.h-19*/, coords.w, coords.h, ctx)
    //if (selectedWallID != 3)
    //    img.src = `${imageUrl}${canvas.width}`
    //else
    //    img.src = document.getElementById("imageCustom").src
}
function feature(x, y, sizeW, sizeH, ctx) {
    ctx.fillStyle = "white"
    ctx.fillRect(x-3, y-3, sizeW+6, sizeH+6)
    ctx.fillStyle = "green"
    ctx.fillRect(x, y, sizeW, sizeH)
}
function arrow(x, y, w, h, ctx)
{
    var a = x/*+ w + 35*/
    var b = y + (/*50+*/h)
    var c = /*x + */w /*+ 35*/
    var d = /*y+*/5 /*270*/
    ctx.font = "bold 16px serif"
    ctx.fillRect(a, b-19-h, c, d) ; ctx.fillRect(a-1, b-23-h, 5, 16) ; ctx.fillRect(a+w-1, b-23-h, 5, 16)
    ctx.fillText(`Width: ${doorWidth} cm`, a+w*0.1, b-19-h-19)
    ctx.fillRect(a+w+19, b-h, 5, h) ; ctx.fillRect(a+w+13, b-h-1, 16, 5) ; ctx.fillRect(a+w+13, b-1, 16, 5)
    ctx.fillText(`Height: ${doorHeight} cm`, a+w+35, b-h*0.5-5)
    // ctx.strokeStyle = "green"
    // var currLineWidth = ctx.lineWidth
    // ctx.lineWidth = 3
    // ctx.beginPath()
    // ctx.moveTo(a,b)
    // ctx.lineTo(c,d)
    // ctx.lineTo(a+5,d+5)
    // ctx.lineTo(a,b)
    // ctx.closePath()
    // ctx.stroke()
    // ctx.lineWidth = currLineWidth
}
// function svg(){
//     var coords = {x: 10, y:10, w:100, h:100}
//     var svg = Snap("#svgCanvas")
//     svg.clear() // children.forEach(function(item){item.remove()})
//     var rect = svg.rect(coords.x, coords.y + (260 - coords.h), coords.w, coords.h)
//     rect.attr({ fill: "brown" })
//     var hinges = 3
//     // if (document.getElementById("radioA").checked) hinges = 1
//     // if (document.getElementById("radioB").checked) hinges = 2
//     // if (document.getElementById("radioC").checked) hinges = 3
//     var hindersCoords = [210 - coords.h + 80, 210 - coords.h + coords.h / 3 * 2 + 80, 210 - coords.h + coords.h / 3 + 80]
//     for (var i = 0; i < hinges; i++) {
//         var rectSVG = svg.rect(x = 160, y = hindersCoords[i], w = 19, h = 30) /*[1,2,3].forEach(function(item){svg.append(`<rect x='19' y='35' width='19' height='19' style='fill: brown'></rect>`)*//*})*/
//         rectSVG.attr({ fill: "yellow", ry: 5, ry: 5 })
//     }
//     var colorAttrs = { stroke: "green", strokeWidth: 3 }
//     // switch (pageID) {
//     //     case 0: {
//             var a = coords.x + coords.w + 35, b = coords.y + (260 - coords.h), c = coords.x + coords.w + 35, d = 270
//             svg.line(a, b, c, d).attr(colorAttrs)
//             svg.line(a - 5, b + 5, a, b).attr(colorAttrs)
//             svg.line(a + 5, b + 5, a, b).attr(colorAttrs)
//             svg.line(c - 5, d - 5, c, d).attr(colorAttrs)
//             svg.line(c + 5, d - 5, c, d).attr(colorAttrs)
//             svg.text(a + 5, b + coords.h * 0.5, `${coords.h} cm`).attr({ fill: "green" })
//         //     break
//         // }
//         // case 1: {
//             var a = coords.x, b = 35, c = coords.x + coords.w, d = 35
//             svg.line(a, b, c, d).attr(colorAttrs)
//             svg.line(a + 5, b - 5, a, b).attr(colorAttrs)
//             svg.line(a + 5, b + 5, a, b).attr(colorAttrs)
//             svg.line(c - 5, d - 5, c, d).attr(colorAttrs)
//             svg.line(c - 5, d + 5, c, d).attr(colorAttrs)
//             svg.text(a + coords.w / 3, b - 5, `${coords.w} cm`).attr({ fill: "green" })
//         //     break
//         // }
//         // case 2: { break }
// }
  // Function to draw the door rectangle
  function drawDoor(widthPercentage, heightPercentage) {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    // Calculate dimensions based on canvas size
    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;

    // Calculate door dimensions based on percentages
    var doorWidthA = canvasWidth * widthPercentage;
    var doorHeightA = canvasHeight * heightPercentage;

    // Clear canvas
    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw door rectangle
    ctx.fillStyle = 'brown'; // Door color
    ctx.fillRect((canvasWidth - doorWidthA) / 2, (canvasHeight - doorHeightA) / 2, doorWidthA, doorHeightA);
  }

function refreshScreen() {
    drawImageWithRectangle(wallImageURLs[selectedWallID], selectedColor, doorWidth)
}
var img = new Image()

// selectTab('step1')
var wallImageURLs = ["https://img.freepik.com/free-photo/empty-room-gray-wall-room-with-wooden-floor_53876-128781.jpg?w=", "https://img.freepik.com/free-photo/plants-on-a-wooden-floor-in-empty-white-room_41470-4664.jpg?w=", "https://img.freepik.com/free-photo/dark-wall-empty-room-with-plants-on-a-floor-3d-rendering_41470-3847.jpg?w="]
var wallImageIDs = [ 'image1', 'image2', 'image3', 'imageCustom' ]
img.src = `${wallImageURLs[0]}${Math.round(document.getElementById('svgDivID').getBoundingClientRect().width)}`
// Get available screen width and height
const availWidth = screen.availWidth;
const availHeight = screen.availHeight;
var selectedColor = "brown"
var selectedTexture = ""
var selectedWallID = 0
window.addEventListener('resize', function() { refreshScreen() })
var textures = {"texture1.png": new Image("images/texture1.png"), "texture2.png": new Image("images/texture2.png"), "texture3.png": new Image("images/texture3.png"), "texture4.png": new Image("images/texture4.png"), "texture5.png": new Image("images/texture5.png"), "texture6.png": new Image("images/texture6.png"), "texture7.png": new Image("images/texture7.png"), "texture8.png": new Image("images/texture8.png"), "texture9.png": new Image("images/texture9.png")}
for(var i = 1; i <= 9; i++) { textures[`texture${i}.png`] = new Image(); textures[`texture${i}.png`].src = `images/texture${i}.png`}
   // Initialize Snap.svg with the SVG canvas
    // var s = Snap("#svgCanvas");
    var coords = {x: 100, y: 100, w:90, h: 210}
    // Define door dimensions and position
    var doorWidth = 90;
    var doorHeight = 210;
    var doorX = 100;
    var doorY = 100;
    //var rect = s.rect(0, 0, s.node.clientWidth, s.node.clientHeight);
    // // Set the fill color to green
    // rect.attr({
    //     fill: "#00FF00" // Green color
    // });
    img.onload = function() { refreshScreen() }
    // // Draw the door panel with texture
    // var doorPanel = s.rect(doorX, doorY, doorWidth, doorHeight).attr({
    //   fill: 'url(#texture)',  // Use a texture pattern for fill
    //   stroke: '#000',
    //   strokeWidth: 2
    // });
    //
    // // Define a texture pattern (for example, diagonal lines)
    // var texturePattern = s.pattern(0, 0, 10, 10).attr({ // Adjust pattern size as needed
    //   patternUnits: 'userSpaceOnUse'
    // });
    // texturePattern.line(0, 0, 10, 10).attr({
    //   stroke: '#999',
    //   strokeWidth: 1
    // });
    //
    // // Add the texture pattern to the defs section of SVG
    // s.append(texturePattern);
    //
    // // Draw hinges
    // var hinge1 = s.circle(doorX + 20, doorY + doorHeight / 2, 5).attr({
    //   fill: '#333'
    // });
    // var hinge2 = s.circle(doorX + doorWidth - 20, doorY + doorHeight / 2, 5).attr({
    //   fill: '#333'
    // });
    //
    // // Draw lock
    // var lock = s.rect(doorX + doorWidth / 2 - 5, doorY + doorHeight - 30, 10, 20).attr({
    //   fill: '#777'
    // });
    //
    // // Draw handle
    // var handle = s.path("M" + (doorX + 20) + "," + (doorY + doorHeight / 2 - 20) + "h20v40h-20z").attr({
    //   fill: '#777'
    // });
