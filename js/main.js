/*
*  Copyright (c) 2016 The WebRTC project authors. All Rights Reserved.
*
*  Use of this source code is governed by a BSD-style license
*  that can be found in the LICENSE file in the root of the source
*  tree.
*/
'use strict';

// const leftVideo = document.getElementById('leftVideo');
const video = createVideoDomNode();
const videoCanvas = document.getElementById('videoCanvas');
const canvasCtx = videoCanvas.getContext('2d');

const playPause = document.getElementById('play-pause');
playPause.addEventListener("click", (e) => {
    if (video.paused || video.ended) {
        video.play();
    } else {
        video.pause();
    }
});

video.addEventListener('loadeddata', () =>{
    videoCanvas.width = video.videoWidth;
    videoCanvas.height = video.videoHeight;
});

video.addEventListener('canplay', () => {
    update();
});

function update(){
    // console.log('callback goes brrrrr');
    let textX = 50;
    let textY = 50;
    let textMaxWidth = 230;
    let globalAlpha = 1.0;
    let textBackgroundGlobalAlpha = 0.5;
    let fontStyle = "15px sans-serif"

    let dw = videoCanvas.width;
    let dh = videoCanvas.height;
    canvasCtx.drawImage(video, 0, 0, dw, dh);

    canvasCtx.globalAlpha = textBackgroundGlobalAlpha;
    canvasCtx.fillStyle = "black";
    canvasCtx.fillRect(textX - 5, textY - 15, textMaxWidth, 20);
    
    canvasCtx.font = fontStyle;
    canvasCtx.fillStyle = "yellow";
    canvasCtx.globalAlpha = globalAlpha;
    canvasCtx.fillText(new Date().toUTCString(), textX, textY, textMaxWidth);
    requestAnimationFrame(update);
}

function createVideoDomNode() {
    const leftVideo = document.createElement('video');
    const videoSrc = document.createElement('source');
    
    const sourceAttribute = document.createAttribute('src');
    sourceAttribute.value = 'video/chrome.webm';
    videoSrc.setAttributeNode(sourceAttribute);
    
    const typeAttribute = document.createAttribute('type');
    typeAttribute.value = 'video/webm';
    videoSrc.setAttributeNode(typeAttribute);
    
    leftVideo.setAttributeNode(document.createAttribute('loop'));
    leftVideo.setAttributeNode(document.createAttribute('muted'));
    
    leftVideo.appendChild(videoSrc);
    
    return leftVideo;
}