let newString = "";
let newCaption = "";
let currentCaption = "";
let newCaptionArray = [];
let currentStringIndex = 0;
let currentCaptionIndex = 0;
let div;
let mark;
let captionDiv = document.getElementById("caption");
let captionsDiv = document.getElementById("captions");
let allText = [];
let mode = "caption";
let width = window.innerWidth;
let height = window.innerHeight;
let typeSizeMin = 12;
let typeSizeMax = 88;
let speedMode = false;
const originalCaptions = [...captions];
const originalComments = [...comments];
let commentChoiceIndex = 0;
let captionChoiceIndex = 0;
let typingTimeout;
let captionTypingTimeout;
let newCommentTimeout;
let captionTimeout;
let colorpalette = ["#f38db2", "#8799ac", "#874830", "#c28c70", "#ecac9d"];
captionDiv.style.display = "inline";
document.getElementById("comments").style.display = "none";
/* 💋 TODO
  + !!!!! Now
  - [] Remove comment/caption once it's written, then restart once have shown all of them
  + DONE
  - [x] if it's a [] type it out all at once
  - [x] Separate caption and comment modes, don't need to be intertwined
  - [x] Find warmer color for background
  - [x] Key pressed to toggle between views
  - [x] Finalize color of the text
  - [x] Fix height of comment section so doesn't go off screen
*/

console.log("★.｡.:*☆:**:. ⓦ𝕖𝓑s𝕚𝓉𝐄 Ｂʸ 𝓶ⓐ𝐲ᗩ 𝐌𝕒𝓝 .:**:.☆*.:｡.★ ♡ www.mayaontheinter.net ♡ 萬美亞");
console.log("https://www.youtube.com/watch?v=dntyqXZLk3g&list=PLztAHXmlMZFS9ZN7GTlZ2UOB2JmxICdt8&index=7&ab_channel=Vogue");
console.log(comments[Math.floor(Math.random() * comments.length)]);
window.addEventListener("resize", onWindowResize);

setTypeSize();

toggleModes(mode);

function toggleModes(newMode) {
    if (newMode == "comment") {
        captionsDiv.style.display = "none";
        document.getElementById("comments").style.display = "block";
        chooseNewComment();
        renderText();
        clearTimeout(captionTimeout);
        clearTimeout(captionTypingTimeout);
    } else {
        captionsDiv.style.display = "inline";
        document.getElementById("comments").style.display = "none";
        chooseNewCaption();
        renderText();
        clearTimeout(newCommentTimeout);
        clearTimeout(typingTimeout);
    }
}

function setTypeSize() {
    // console.log('setting type size: ', width);
    if (width >= 4000) {
        // 4K
        typeSizeMin = 56;
        typeSizeMax = 108;
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
        if (speedMode) {
            newInterval = 1;
        }
        newCommentTimeout = setTimeout(() => {
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
        currentCaptionIndex++;
        const newInterval = 111 + Math.random() * 333;
        captionTypingTimeout = setTimeout(() => {
            renderText();
        }, newInterval);
    } else {
        chooseNewCaption();
        const newInterval = 3333 + Math.random() * 11111;
        captionTimeout = setTimeout(() => {
            renderCaption();
        }, newInterval);
    }
}

// Choose random new caption
function chooseNewCaption() {
    currentCaptionIndex = 0;
    currentCaption = "";
    const newCaptionIndex = Math.floor(Math.random() * captions.length);

    newCaption = captions[newCaptionIndex].replaceAll('.', '').replaceAll(',', '');
    captions.splice(newCaptionIndex, 1);

    // If all captions have been shown, reset caption library
    if (captions.length < 1) {
        captions = [...originalCaptions];
    }

    const maxCaptionLength = 86;
    while (newCaption.length > maxCaptionLength) {
        newCaption = captions[Math.floor(Math.random() * captions.length)].replaceAll('.', '').replaceAll(',', '');
    }

    newCaption = newCaption.toLowerCase();
    newCaption = newCaption.replaceAll(/\bi\b/g, "I"); // Only an isolated I should be uppercase
    newCaption = newCaption.replaceAll(/i'/g, "I'");

    const doubleLineLength = 43;

    if (isAudioDescription(newCaption)) {
        // [Audio description]
        newCaptionArray = [newCaption];
    } else {
        newCaptionArray = newCaption.split(" ");
        // console.log(audioPop(newCaptionArray));
        newCaptionArray = audioPop(newCaptionArray);
        if (newCaption.length >= doubleLineLength) {
            const halfCaptionIndex = Math.floor(newCaptionArray.length * .47);
            newCaptionArray[halfCaptionIndex] = newCaptionArray[halfCaptionIndex] + "\n";
        }
    }
}

// TO DO
function audioPop(array) {
    let newArray = [];
    // let descriptionIndex = -1;
    let description = "";
    let describing = false;

    for (let i = 0; i < array.length; i++) {
        let currentWord = array[i];
        if (currentWord.indexOf("[") > -1) {
            description += currentWord;
            describing = true;
        } else if (describing) {
            description = description + " " + currentWord;
            if (currentWord.indexOf("]") > -1) {
                describing = false;
                newArray.push(description);
                description = "";
            }
        } else {
            newArray.push(currentWord);
        }
    }
    return newArray;
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

    const newCommentIndex = Math.floor(Math.random() * comments.length);
    newString = comments[newCommentIndex];
    const newFontSize = typeSizeMin + Math.random() * typeSizeMax;

    console.log('newComment: ', newString);
    comments.splice(newCommentIndex, 1);
    // If all comments have been shown, reset comment library
    if (comments.length < 1) {
        comments = originalComments;
    }

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
    const divTop = randomIntFromInterval(0, height - maxHeight);
    div.style.top = divTop + "px";
    div.style.left = randomIntFromInterval(0, width - maxWidth) + "px";
    div.style.maxWidth = maxWidth + "px";
    div.style.fontSize = newFontSize + "px";
    div.style.opacity = "1";
    mark = document.createElement("mark");
    mark.style.color = colorpalette[Math.floor(Math.random() * colorpalette.length)];
    div.appendChild(mark);
    document.getElementById("comments").appendChild(div);
    testDiv.remove();
    allText.push(div);
    if (allText.length > 47) {
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