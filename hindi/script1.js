const photoUpload = document.getElementById('photoUpload');
const idProofUpload = document.getElementById('idProofUpload');
const addressProofUpload = document.getElementById('addressProofUpload');
const continueBtn = document.getElementById('continueBtn');
const errorMessage = document.getElementById('errorMessage');

const photoFileName = document.getElementById('photoFileName');
const idProofFileName = document.getElementById('idProofFileName');
const addressProofFileName = document.getElementById('addressProofFileName');

const uploadContainer = document.getElementById('uploadContainer');
const myVoteContainer = document.getElementById('myVoteContainer');
const profilePic = document.getElementById('profilePic');

// Function to validate file type
function isValidFile(file) {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    return validTypes.includes(file.type);
}

// Function to update file name display
function updateFileNameDisplay(fileInput, displayElement) {
    if (fileInput.files.length > 0) {
        displayElement.textContent = fileInput.files[0].name;
    } else {
        displayElement.textContent = '';
    }
}

// Function to check if all files are uploaded
function checkFilesUploaded() {
    return (
        photoUpload.files.length > 0 &&
        idProofUpload.files.length > 0 &&
        addressProofUpload.files.length > 0
    );
}

// Event listeners for file inputs
photoUpload.addEventListener('change', function() {
    if (this.files.length > 0 && !isValidFile(this.files[0])) {
        errorMessage.textContent = 'Invalid file type for photo. Please upload an image.';
        this.value = '';
    } else {
        errorMessage.textContent = '';
        updateFileNameDisplay(this, photoFileName);
    }
    continueBtn.disabled = !checkFilesUploaded();
});

idProofUpload.addEventListener('change', function() {
    if (this.files.length > 0 && !isValidFile(this.files[0])) {
        errorMessage.textContent = 'Invalid file type for ID proof. Please upload an image or PDF.';
        this.value = '';
    } else {
        errorMessage.textContent = '';
        updateFileNameDisplay(this, idProofFileName);
    }
    continueBtn.disabled = !checkFilesUploaded();
});

addressProofUpload.addEventListener('change', function() {
    if (this.files.length > 0 && !isValidFile(this.files[0])) {
        errorMessage.textContent = 'Invalid file type for address proof. Please upload an image or PDF.';
        this.value = '';
    } else {
        errorMessage.textContent = '';
        updateFileNameDisplay(this, addressProofFileName);
    }
    continueBtn.disabled = !checkFilesUploaded();
});

// Continue button handler
continueBtn.addEventListener('click', function() {
    if (checkFilesUploaded()) {
        // Convert the uploaded photo to a base64 string
        const photoFile = photoUpload.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const base64Image = e.target.result;

            // Set the profile picture
            profilePic.src = base64Image;

            // Switch to the MyVote Home section
            uploadContainer.style.display = 'none';
            myVoteContainer.style.display = 'block';
        };
        reader.readAsDataURL(photoFile);
    } else {
        errorMessage.textContent = 'Please upload all required documents.';
    }
});

// Function to update the countdown timer
function updateCountdown() {
    const countdownElement = document.getElementById('countdown');
    let time = 8 * 3600 + 45 * 60 + 57; // 8 hours, 45 minutes, 57 seconds

    const timer = setInterval(() => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        countdownElement.textContent = 
            `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        if (time <= 0) {
            clearInterval(timer);
            countdownElement.textContent = "Polling Closed";
        } else {
            time--;
        }
    }, 1000);
}

// Function to handle navigation
function navigate(page) {
    alert(`Navigating to ${page}`);
    // Add actual navigation logic here
}

// Initialize the page
updateCountdown();