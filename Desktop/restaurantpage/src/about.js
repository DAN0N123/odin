import promotional_video from './pizza_video.mp4';
import './about.css';
function section_three(){
    
    const bigbox = document.createElement('div');
    bigbox.classList.add('bigbox_about');
    bigbox.style.opacity = 0;
    const video = document.createElement('video');

    fetch('./videos/pizza_video.mp4')
        .then(response => response.blob())
        .then(blob => {
            const videoURL = URL.createObjectURL(blob);
            video.src = videoURL;
            console.log(videoURL)
        });

    video.controls = true;
    video.autoplay = true;
    bigbox.appendChild(video);
    return bigbox;
}


export default section_three