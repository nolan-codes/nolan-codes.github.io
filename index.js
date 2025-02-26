////BASIC FUNCTIONS
function tween(s, e, t) {
    return s + (e - s) * t;
}

function shuffle(array) {
    return array.sort((a, b) => -1 + Math.random()*2)
}

////MOUSE STUFF
var mouse_x  = 0;
var mouse_y  = 0;
var cursor_x = 0;
var cursor_y = 0;
var speed = 0.15;

const hover  = document.querySelectorAll('.hover');
const cursor = document.getElementById('cursor')

function updateCursor() {
    cursor_x = tween(cursor_x, mouse_x, speed);
    cursor_y = tween(cursor_y, mouse_y, speed)

    document.documentElement.style.setProperty('--x', cursor_x + 'px');
    document.documentElement.style.setProperty('--y', cursor_y + 'px');
}

function startHover() {
    cursor.style.transform = 'scale(3) translate(-12%, -12%)'
}

function stopHover() {
    cursor.style.transform = 'scale(1) translate(-50%, -50%)'
}

document.onmousemove = function(e) {
    mouse_x = e.clientX + window.scrollX;
    mouse_y = e.clientY + window.scrollY;
}

hover.forEach((_, i) => {
    hover[i].addEventListener('mouseenter', startHover);
    hover[i].addEventListener('mouseleave', stopHover);
})

////DARK/LIGHT MODE
lightMode = false

function toggleLight() {
    lightMode = !lightMode
    document.getElementById("lightmode").style.opacity = lightMode/1
    
    lmtopElements = document.querySelectorAll("lmtop")
    
    lmtopElements.forEach(function(element) {
        element.style.filter = "filter("+lightMode/1+")"
    })
}

////MENU
expanded = false
menu = document.getElementById("menu")

function toggleMenu() {
    expanded = !expanded;
    menu.style.transform = expanded ? 'scale(1)' : 'scale(0)';
}

rotation = 0;
scrolling = false;
lastY = 0;

menu.addEventListener('mouseenter', () => {
    scrolling = true; 
});

menu.addEventListener('mouseleave', () => {
    scrolling = false;
});

menu.addEventListener('wheel', (event) => {
    event.preventDefault(); 
    rotation += event.deltaY > 0 ? 15 : -15;
    menu.style.transform = `rotate(${rotation}deg)`;
});

menu.addEventListener('touchstart', (event) => {
    scrolling = true;
    lastY = event.touches[0].clientY; 
});

menu.addEventListener('touchmove', (event) => {
    if (scrolling) {
        event.preventDefault();
        const currentY = event.touches[0].clientY;
        const deltaY = lastY - currentY;
        rotation += deltaY > 0 ? 3 : -3;
        menu.style.transform = `rotate(${rotation}deg)`;
        lastY = currentY; 
    }
});

menu.addEventListener('touchend', () => {
    scrolling = false; 
});

menuItems = menu.getElementsByClassName('menuitem');

const radius = (menu.offsetWidth / 2.5);

for (let index = 0; index < menuItems.length; index++) {
    const angle = (360 / menuItems.length) * index;

    menuItems[index].style.position = 'absolute';
    menuItems[index].style.transform = `rotate(${angle}deg) translateX(${-radius}px)`;
    menuItems[index].style.transformOrigin = '0 0';
}


////PROJECTS SCREEN TRANSITION
showprojects   = false
projects       = document.getElementById('projects')
projectsButton = document.getElementById('projectsbutton')
pbchevron      = document.getElementById('pbchevron')
function toggleProjects() {
    showprojects = !showprojects
    projects.style.transform = showprojects? 'translate(0, 0)' : 'translate(-100%, 0)'
    projectsButton.style.transform = showprojects? 'translate(calc(100vw - 100%), 0)' : 'translate(0, 0)'
    pbchevron.style.transform = showprojects? 'rotateZ(180deg)' : "rotateZ(0deg)"
}

////HOME BUTTON 
home = document.getElementById('home')
shuffling = true
fonts = shuffle([
    '"Times New Roman", Times, serif',
    '"Arial", Helvetica, sans-serif',
    '"Courier Prime", serif',
    '"Cheria", serif',
    '"Sigmar", serif',
    '"Monoton", serif',
    '"Krona One", serif',
    '"MuseoModerno", serif',
    '"Gravitas One", serif',
    '"Caveat", serif',
    '"Kalam", serif'
])
fontindex = 0
font = fonts[Math.trunc(fontindex)]
function shuffleFont() {
    if (shuffling){
        fontindex += 0.125
        font = fonts[Math.trunc(fontindex) % fonts.length]
        home.style.fontFamily = font
    }
}

////MAIN
function main() {
    updateCursor(); 
    shuffleFont(); 
    requestAnimationFrame(main);
}

main();