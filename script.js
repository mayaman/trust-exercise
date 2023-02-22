let newString = "";
let newCaption = "";
let currentCaption = "";
let newCaptionArray = [];
let currentStringIndex = 0;
let currentCaptionIndex = 0;
let div;
let mark;
let captionDiv = document.getElementById("caption");
let allText = [];
let mode = "caption";
let width = window.innerWidth;
let height = window.innerHeight;
let typeSizeMin = 12;
let typeSizeMax = 88;
let speedMode = false;

let testCaptionIndex = 0;
// No more than 7 words?

let settingOptions = ["commentOnly", "captionOnly"];
currentSetting = "captionOnly";
captionDiv.style.display = "inline";
document.getElementById("comments").style.display = "none";
let switchMode = true;
let commentChoiceIndex = 0;
let captionChoiceIndex = 0;
let started = false;
let typingTimeout;
let newCommentTimeout;
let captionTimeout;

let colors = ["#4a2613", "#693517", "#93532e", "#ba6a36", "#c37f46", "#db9765", "#ecae78", "#eebf9d", "#FEC7CF", "#FCA88F", "#C25F6D", "#D9D9D9", "#000000"];
// let colorpalette = ["#C2B19F", "#D3DBD4", "#865140", "#ECAC9D", "#DC8BA8", "#A88373", "#A69A92", "#89919B", "#404143"];
// let colorpalette = ["#DC8BA8", "#A88373", "#89919B", "#A69A92", "#865140"];
// let before saturaiton colorpalette = ["#DC8BA8", "#ECAC9D", "#89919B","#A88373", "#865140"];
let colorpalette = ["#f38db2", "#8799ac", "#874830", "#c28c70", "#ecac9d"];
// "#A69A92"

let currentBackgroundColor = colorpalette[Math.floor(Math.random() * colorpalette.length)];
/* 💋 TODO
  + !!!!! Now
  - [] Change top text to no longer type out but fully switch like captions
  - [] Add way more comments
  - [] Choose title for piece
  - [] Create generative system for caption text
  - [] Fix issue with set timeout freaking out
  - [] Remove comment/caption once it's written, then restart once have shown all of them
  + DONE
  - [x] Separate caption and comment modes, don't need to be intertwined
  - [x] Find warmer color for background
  - [x] Key pressed to toggle between views
  - [x] Finalize color of the text
  - [x] Fix height of comment section so doesn't go off screen
*/

console.log("★.｡.:*☆:**:. ⓦ𝕖𝓑s𝕚𝓉𝐄 Ｂʸ 𝓶ⓐ𝐲ᗩ 𝐌𝕒𝓝 .:**:.☆*.:｡.★ ♡ www.mayaontheinter.net ♡ 萬美亞");
window.addEventListener("resize", onWindowResize);

setTypeSize();

toggleModes(mode);

function toggleModes(newMode) {
    if (newMode == "comment") {
        captionDiv.style.display = "none";
        document.getElementById("comments").style.display = "block";
        chooseNewComment();
        renderText();
        clearTimeout(captionTimeout);
        // document.body.style.backgroundColor = "#f0f5f7";
        // document.body.style.backgroundColor = currentBackgroundColor;
    } else {
        captionDiv.style.display = "inline";
        document.getElementById("comments").style.display = "none";
        chooseNewCaption();
        renderText();
        clearTimeout(newCommentTimeout);
        clearTimeout(typingTimeout);
        // document.body.style.backgroundColor = currentBackgroundColor;

    }
}

// Kick off rendering of type out of that thing
// setTimeout(renderText, 47);
renderText();

function setTypeSize() {
    console.log('setting type size: ', width);
    if (width >= 4000) {
        // 4K
        typeSizeMin = 64;
        typeSizeMax = 248;
    } else if (width > 2000) {
        // TV SIZE
        typeSizeMin = 24;
        typeSizeMax = 96;
    } else if (width > 820) {
        // DESKTOP
        typeSizeMin = 12;
        typeSizeMax = 48; // 48
    } else {
        // MOBILE
        typeSizeMin = 12;
        typeSizeMax = 24;
    }
}

function renderText() {
    if (mode == "caption") {
        renderCaption();
    } else {
        renderComment();
    }
}

function renderComment() {
    if (currentStringIndex <= newString.length) {
        mark.innerHTML = newString.substring(0, currentStringIndex);
        currentStringIndex++;
        let newInterval = 47 + Math.random() * 111;
        // Testing
        // newInterval = 11;
        if (speedMode) {
            newInterval = 1;
        }
        typingTimeout = setTimeout(() => {
            renderText();
        }, newInterval);
    } else {
        currentStringIndex = 0;
        chooseNewComment();
        let newInterval = 2222 + Math.random() * 5555;
        // newInterval = 11;
        if (speedMode) {
            newInterval = 1;
        }
        newCommentTimeout = setTimeout(() => {
            // let newBackgroundColor = colorpalette[Math.floor(Math.random() * colorpalette.length)];
            // while (currentBackgroundColor == newBackgroundColor) {
            //     newBackgroundColor = colorpalette[Math.floor(Math.random() * colorpalette.length)];
            // }
            // document.body.style.backgroundColor = newBackgroundColor;
            // currentBackgroundColor = newBackgroundColor;
            renderText();
        }, newInterval);
    }
}

function renderCaption() {
    if (currentCaptionIndex < newCaptionArray.length) {
        if (currentCaptionIndex != 0) {
            currentCaption = currentCaption + " " + newCaptionArray[currentCaptionIndex];
        } else {
            currentCaption = newCaptionArray[currentCaptionIndex];

        }
        captionDiv.innerText = currentCaption;
        // captionDiv.innerText = "It's just to give me a little bit of depth.";
        currentCaptionIndex++;
        const newInterval = 111 + Math.random() * 333;
        // Testing
        // newInterval = 11;
        typingTimeout = setTimeout(() => {
            renderText();
        }, newInterval);
    } else {
        chooseNewCaption();
        // Set for new caption to appear
        const newInterval = 3333 + Math.random() * 11111;
        captionTimeout = setTimeout(() => {
            let newBackgroundColor = colorpalette[Math.floor(Math.random() * colorpalette.length)];
            while (currentBackgroundColor == newBackgroundColor) {
                newBackgroundColor = colorpalette[Math.floor(Math.random() * colorpalette.length)];
            }
            // document.body.style.backgroundColor = newBackgroundColor;
            // document.body.style.backgroundColor = "#f0f5f7";
            currentBackgroundColor = newBackgroundColor;
            renderCaption();
        }, newInterval);
    }
}

// Choose random new caption
function chooseNewCaption() {
    currentCaptionIndex = 0;
    currentCaption = "";
    // newCaption = captions[Math.floor(Math.random() * captions.length)].replaceAll('.', '').replaceAll(',', '');
    newCaption = captions[testCaptionIndex].replaceAll('.', '').replaceAll(',', '');
    testCaptionIndex++;
    // newCaption = "It may be a bit controversial, but I like it and I was able to find it, so I'm gonna";
    console.log('cap lenght: ', newCaption.length);
    const maxCaptionLength = 86;
    while (newCaption.length > maxCaptionLength) {
        newCaption = captions[Math.floor(Math.random() * captions.length)].replaceAll('.', '').replaceAll(',', '');
    }
    // newCaption = newCaption[0].toLowerCase() + newCaption.substring(1, newCaption.length);
    newCaption = newCaption.toLowerCase();
    newCaption = newCaption.replaceAll(/\bi\b/g, "I"); // Only an isolated I should be uppercase
    newCaption = newCaption.replaceAll(/i'/g, "I'");

    const doubleLineLength = 42;

    if (isAudioDescription(newCaption)) {
        // [Audio description]
        newCaptionArray = [newCaption];
    } else {
        newCaptionArray = newCaption.split(" ");

        if (newCaption.length >= doubleLineLength) {
            const halfCaptionIndex = Math.floor(newCaptionArray.length * .47);
            newCaptionArray[halfCaptionIndex] = newCaptionArray[halfCaptionIndex] + "\n";
            // newCaption = newCaption.substring(0, halfCaption) + "\n" + newCaption.substring(halfCaption, newCaption.length);
        }
    }
}

function isAudioDescription(caption) {
    const leftBracketIndex = caption.indexOf("[");
    const rightBracketIndex = caption.indexOf("]");

    if (leftBracketIndex == 0 && rightBracketIndex == caption.length - 1) {
        return true;
    } else {
        return false;
    }
}

// Choose random new comment
function chooseNewComment() {
    newString = comments[Math.floor(Math.random() * comments.length)];
    const newFontSize = typeSizeMin + Math.random() * typeSizeMax;

    div = document.createElement("div");
    div.classList.add("text");

    let maxWidth = this.randomIntFromInterval(
        newFontSize * 13,
        newFontSize * 22
    );

    if (maxWidth > width) {
        maxWidth = width * 0.95;
    }

    // Test to calculate height / width
    const testDiv = document.createElement("div");
    const testContent = document.createTextNode(newString);
    testDiv.appendChild(testContent);
    testDiv.style.fontSize = newFontSize + "px";
    testDiv.style.width = maxWidth + "px";
    testDiv.style.visibility = "hidden";
    testDiv.classList.add("text");
    testDiv.id = "test";

    document.getElementById("comments").appendChild(testDiv);

    const maxHeight = testDiv.clientHeight;

    // const maxWidth = width - testDiv.clientWidth - widthPadding;
    // const maxWidth = width / 4 + Math.random() * width * 0.75;

    const divTop = randomIntFromInterval(0, height - maxHeight);
    // console.log('div top: ', divTop)
    div.style.top = divTop + "px";
    // console.log('max width: ', maxWidth);

    div.style.left = randomIntFromInterval(0, width - maxWidth) + "px";
    div.style.maxWidth = maxWidth + "px";
    div.style.fontSize = newFontSize + "px";
    div.style.opacity = "1";

    // div.style.textShadow = "0 0 " + (newFontSize / 22 ) + "px #ffffff, " + "0 0 " + (newFontSize / 16) + "px #ffffff";
    // div.style.textShadow = "0 0 " + (newFontSize / 22 ) + "px #000000, " + "0 0 " + (newFontSize / 16) + "px #000000";


    // div.style.textShadow = "0 0 " + (newFontSize / 33) + "px #000000";

    mark = document.createElement("mark");
    mark.style.color = colorpalette[Math.floor(Math.random() * colorpalette.length)];
    // mark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    div.appendChild(mark);
    document.getElementById("comments").appendChild(div);
    testDiv.remove();
    allText.push(div);
    // freaks out around 280


    if (allText.length > 3) {
        // console.log('removing a div');
        // let toRemove = allText.shift();
        // toRemove.remove();

        for (let i = 0; i < allText.length / 2; i++) {
            let currentTextDiv = allText[i];
            let currentOpacity = currentTextDiv.style.opacity;

            if (currentOpacity > 0) {
                currentTextDiv.style.opacity -= 0.01;
            } else {
                currentTextDiv.remove();
                allText.splice(i, 1);
            }
        }
    }
}


function randomBool(percentChanceTrue) {
    return (Math.random() < percentChanceTrue);
}

document.addEventListener('keyup', event => {
    if (event.code === 'Space') {
        if (mode == "caption") {
            mode = "comment";
        } else {
            mode = "caption";
        }
        toggleModes(mode);
        console.log('MODE RESET TO: ', mode);
    } else if (event.code == 'KeyS') {
        speedMode = !speedMode;
        console.log('speed mode: ', speedMode);
    }
});

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
}