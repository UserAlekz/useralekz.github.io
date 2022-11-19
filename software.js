var coords = { x: 170, y: 10, w: 95, h: 210 }
var pageID = 0
var stuff = ""
function uiSetImage(id){
    var urls = ["https://img.freepik.com/free-photo/empty-room-gray-wall-room-with-wooden-floor_53876-128781.jpg?w=510&t=st=1668364114~exp=1668364714~hmac=6f85b3492a1a19a46a1e31435bc4f01bfee4bbf844db2b91a46f0a393fce603f", "https://img.freepik.com/free-photo/plants-on-a-wooden-floor-in-empty-white-room_41470-4664.jpg?w=510&t=st=1668447664~exp=1668448264~hmac=51b5144b43ba4d1bf3452c7b37cfc76219c1731519bc4863266ec865321912a1", "https://img.freepik.com/free-photo/dark-wall-empty-room-with-plants-on-a-floor-3d-rendering_41470-3847.jpg?w=510&t=st=1668447682~exp=1668448282~hmac=06bbff5abe10efc3ce51de79d8c4462489032dc183205076f73d4be696e8297b"]
    document.getElementById("tool").style.backgroundImage = `url('${urls[id]}')`
}
function uiButtonPage(str){
    var label = document.getElementById("labelID")
    var units = document.getElementById("unitsID")
    var number = document.getElementById("numberID")
    var radioDiv = document.getElementById("hingesID")
    var buttonA = document.getElementById("buttonA")
    var buttonB = document.getElementById("buttonB")
    if (str == 'previous'){
        if(pageID > 0) pageID--
    }
    else if(str == 'proceed'){
        if (pageID < 2) pageID++
    }
    
    switch(pageID){
        case 0: {
            label.innerText = "Please specify height"
            number.value = coords.h
            number.style.visibility = "visible"
            units.style.visibility = "visible"
            radioDiv.style.visibility = "hidden"
            buttonA.style.visibility = "hidden"
            break
        }
        case 1: { 
            label.innerText = "Please specify width"
            number.value = coords.w
            number.style.visibility = "visible"
            units.style.visibility = "visible"
            radioDiv.style.visibility = "hidden"
            buttonA.style.visibility = "visible"
            buttonB.style.visibility = "visible"
            break
        }
        case 2: {
            label.innerText = "Please specify count of hinges"
            number.style.visibility = "hidden"
            units.style.visibility = "hidden"
            radioDiv.style.visibility = "visible"
            buttonB.style.visibility = "hidden"
            break
        }
        case 3: { break }
    }

    uiToolTweak()
}

function uiToolTweak(){
    var svg = document.getElementById("svgID")
    var number = document.getElementById("numberID")
    var rect = document.getElementById("rectID")
    if(pageID == 0) { coords.h = parseInt(number.value) } else if(pageID == 1) { coords.w = parseInt(number.value) }
    //rect.setAttribute("width", `${coords.w}`)
    //rect.setAttribute("height", `${coords.h}`)
    var svg = Snap("#svgID")
    svg.clear() // children.forEach(function(item){item.remove()})
    var rect = svg.rect(coords.x, coords.y + (260-coords.h), coords.w, coords.h)
    rect.attr({fill: "brown"})
    var hinges = 3
    if(document.getElementById("radioA").checked) hinges = 1
    if(document.getElementById("radioB").checked) hinges = 2
    if(document.getElementById("radioC").checked) hinges = 3
    var hindersCoords = [210-coords.h+80, 210-coords.h+coords.h/3*2+80, 210-coords.h+coords.h/3+80]
    for(var i = 0; i < hinges; i++) {
        var rectSVG = svg.rect(x=160, y=hindersCoords[i], w=19, h=30) /*[1,2,3].forEach(function(item){svg.append(`<rect x='19' y='35' width='19' height='19' style='fill: brown'></rect>`)*//*})*/
        rectSVG.attr({fill: "yellow", ry: 5, ry: 5})
    }
    var colorAttrs = {stroke:"green", strokeWidth: 3}
    switch(pageID){
        case 0: {
            var a = coords.x + coords.w + 35, b = coords.y + (260-coords.h), c = coords.x + coords.w + 35, d = 270
            svg.line(a, b, c, d).attr(colorAttrs)
            svg.line(a-5, b+5, a, b).attr(colorAttrs)
            svg.line(a+5, b+5, a, b).attr(colorAttrs)
            svg.line(c-5, d-5, c, d).attr(colorAttrs)
            svg.line(c+5, d-5, c, d).attr(colorAttrs)
            svg.text(a+5, b+coords.h*0.5, `${coords.h} cm`).attr({fill: "green"})
            break }
        case 1: {
            var a = coords.x, b = 35, c = coords.x + coords.w, d = 35
            svg.line(a, b, c, d).attr(colorAttrs)
            svg.line(a+5, b-5, a, b).attr(colorAttrs)
            svg.line(a+5, b+5, a, b).attr(colorAttrs)
            svg.line(c-5, d-5, c, d).attr(colorAttrs)
            svg.line(c-5, d+5, c, d).attr(colorAttrs)
            svg.text(a+coords.w/3, b-5, `${coords.w} cm`).attr({fill: "green"})
            break }
        case 2: { break }
    }
}
