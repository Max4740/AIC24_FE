const videos = [
    { title: 'Video 1', description: 'Fun video about cats', category: 'fun', src: 'video1.mp4', thumbnail: 'thumb1.jpg' },
    { title: 'Video 2', description: 'Educational video on science', category: 'educational', src: 'video2.mp4', thumbnail: 'thumb2.jpg' },
    { title: 'Video 3', description: 'Documentary about nature', category: 'documentary', src: 'video3.mp4', thumbnail: 'thumb3.jpg' },
    // Add more videos here
];

function loadVideos() {
    const videoGrid = document.getElementById('videoGrid');
    videoGrid.innerHTML = '';

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <button class="submit-button" onclick="event.stopPropagation(); submitForm();">Submit</button>
            <button class="similarity-button" onclick="event.stopPropagation(); findSimilarity('${video.src}')">Find Similarity</button>
        `;
        videoItem.onclick = function(event) {
            if (!event.target.classList.contains('submit-button') && !event.target.classList.contains('similarity-button')) {
                openModal(video.src);
            }
        };
        videoGrid.appendChild(videoItem);
    });
}

function openModal(videoSrc) {
    const modal = document.getElementById('videoModal');
    const modalVideoSource = document.getElementById('modalVideoSource');
    const modalVideo = document.getElementById('modalVideo');

    modal.style.display = 'block';
    modalVideoSource.src = videoSrc;
    modalVideo.load();
    modalVideo.play();

    // Add event listener for clicks outside the modal content
    window.addEventListener('click', closeModalOnOutsideClick);
}

function closeModal() {
    const modal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');

    modal.style.display = 'none';
    modalVideo.pause();

    // Remove the event listener when the modal is closed
    window.removeEventListener('click', closeModalOnOutsideClick);
}

function closeModalOnOutsideClick(event) {
    const modal = document.getElementById('videoModal');

    // Close the modal if the user clicks outside the modal (i.e., on the modal itself)
    if (event.target === modal) {
        closeModal();
    }
}


function searchVideos() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchInput) ||
        video.description.toLowerCase().includes(searchInput)
    );
    updateVideoGrid(filteredVideos);
}

function filterVideos() {
    const category = document.getElementById('categoryFilter').value;
    const filteredVideos = category === 'all'
        ? videos
        : videos.filter(video => video.category === category);
    updateVideoGrid(filteredVideos);
}

function updateVideoGrid(filteredVideos) {
    const videoGrid = document.getElementById('videoGrid');
    videoGrid.innerHTML = '';

    filteredVideos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}">
            <h3>${video.title}</h3>
            <p>${video.description}</p>
            <button class="submit-button" onclick="event.stopPropagation(); submitForm();">Submit</button>
            <button class="similarity-button" onclick="event.stopPropagation(); findSimilarity('${video.src}')">Find Similarity</button>
        `;
        videoItem.onclick = function(event) {
            if (!event.target.classList.contains('submit-button') && !event.target.classList.contains('similarity-button')) {
                openModal(video.src);
            }
        };
        videoGrid.appendChild(videoItem);
    });
}

function submitForm() {
    alert('Form submitted');
}

function findSimilarity(videoSrc) {
    alert('Finding similarity for ' + videoSrc);
}

function triggerOCR() {
    alert('OCR triggered');
}

function triggerSpeechToText() {
    alert('Speech-to-Text triggered');
}

// Initialize video grid
document.addEventListener('DOMContentLoaded', loadVideos);

function adjustVideoSize(value) {
    const modalVideo = document.getElementById('modalVideo');
    modalVideo.style.width = value + '%';
    modalVideo.style.height = value + '%';
}
document.addEventListener('DOMContentLoaded', function() {
    loadVideos();

    // Add keydown event listener for Ctrl + Enter
    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault();  // Prevent the default action
            const searchInput = document.getElementById('searchInput');
            searchInput.focus();  // Focus on the search input field
        }
    });
});
