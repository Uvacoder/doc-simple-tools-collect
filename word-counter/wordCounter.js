var counterInput = document.getElementById('counter-input');
var wordCount = document.getElementsByClassName('word-count');
var wordCountSmall = document.getElementById('word-count-small');
var charCount = document.getElementsByClassName('char-count');
var charCountSmall = document.getElementById('char-count-small');
var sentanceCountObj = document.getElementById('sentance-count');
var paragraphCountObj = document.getElementById('paragraph-count');
var readingTimeObj = document.getElementById('reading-time');
var speakingTimeObj = document.getElementById('speaking-time');

var readingTimeSeconds;
var speakingTimeSeconds;


counterInput.addEventListener('keyup', function(e){
    wordCounter(e.target.value);
    charCountUpdate(e.target.value)
    readingTime();
    speakingTime();
});

// Get word count
function wordCounter(text) {
    var text = counterInput.value.split(' ');
    var count = 0;
    for (var i = 0; i < text.length; i++) {
        if (text[i] !== ' ' && isWord(text[i])) {
            count++;
        }
    }
    for(var i = 0; i < wordCount.length; i++) {
        if (count > 1 || count == 0) {
            wordCount[i].innerText = count + ' words';
        }
        else {
            wordCount[i].innerText = count + ' word';
        }
    }
    // Set the small word count for the details box
    wordCountSmall.innerText = count;

    // Set the sentance and paragraph count
    sentanceCountObj.innerText = counterInput.value.split(/[.?!]\s/).length;
    paragraphCountObj.innerText = counterInput.value.replace(/\n$/gm, '').split(/\n/).length;

    // Reading time on average is 4.6 words per second, Speaking time is 3 words per second.
    readingTimeSeconds = count / 4.6;
    speakingTimeSeconds = count / 3;
}

// Check if text entered is actually a word
function isWord(str) {
    var alphaNumericFound = false;
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      if ((code > 47 && code < 58) || // numeric (0-9)
          (code > 64 && code < 91) || // upper alpha (A-Z)
          (code > 96 && code < 123)) { // lower alpha (a-z)
        alphaNumericFound = true;
        return alphaNumericFound;
      }
    }
    return alphaNumericFound;
}

// Get character count
function charCountUpdate(str) {
	var count = str.length;
    for(var i = 0; i < wordCount.length; i++) {
        if (count > 1 || count == 0) {
            charCount[i].innerText = count + ' characters';
        }
        else {
            charCount[i].innerText = count + ' character';
        }
    }
    charCountSmall.innerText = count;
}

// Get time taken to read text
function readingTime() {
    if (readingTimeSeconds < 60) {
        readingTimeObj.innerText = Math.round(readingTimeSeconds) + ' sec';
    }
    else if (readingTimeSeconds > 60) {
        if (readingTimeSeconds > 3600) {
            var hours = Math.floor(readingTimeSeconds / 3600);
            var minutes = Math.round(readingTimeSeconds - hours * 3600);
    
            readingTimeObj.innerText = hours + ' hrs ' + minutes + ' mins';
        }
        else {
            var minutes = Math.floor(readingTimeSeconds / 60);
            var seconds = Math.round(readingTimeSeconds - minutes * 60);
    
            readingTimeObj.innerText = minutes + ' mins ' + seconds + ' sec';
        }
    }
}

// Get time taken to speak text
function speakingTime() {
    if (speakingTimeSeconds < 60) {
        speakingTimeObj.innerText = Math.round(speakingTimeSeconds) + ' sec';
    }
    else if (speakingTimeSeconds > 60) {
        if (speakingTimeSeconds > 3600) {
            var hours = Math.floor(speakingTimeSeconds / 3600);
            var minutes = Math.round(speakingTimeSeconds - hours * 3600);
    
            speakingTimeObj.innerText = hours + ' hrs ' + minutes + ' mins';
        }
        else {
            var minutes = Math.floor(speakingTimeSeconds / 60);
            var seconds = Math.round(speakingTimeSeconds - minutes * 60);
    
            speakingTimeObj.innerText = minutes + ' mins ' + seconds + ' sec';
        }
    }
}
