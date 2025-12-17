const apiKey = 'rvsSdl6Kh4dFnkBudDTPgge4tl5R8poIMSjgM9YL';
const apiUrl = 'https://api.nasa.gov/planetary/apod';

const datePicker = document.querySelector('#date-picker');
const searchBtn = document.querySelector('#search-btn');
const todayBtn = document.querySelector('#today-btn');
const loadingEl = document.querySelector('#loading');
const errorEl = document.querySelector('#error');
const errorMessage = document.querySelector('#error-message');
const apodContainer = document.querySelector('#apod-container');
const apodTitle = document.querySelector('#apod-title');
const apodDate = document.querySelector('#apod-date');
const apodImage = document.querySelector('#apod-image');
const apodExplanation = document.querySelector('#apod-explanation');

function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    
    return year + '-' + month + '-' + day;
}

function fetchAPOD(date) {
    loadingEl.classList.remove('hidden');
    errorEl.classList.add('hidden');
    apodContainer.classList.add('hidden');
    
    const url = apiUrl + '?api_key=' + apiKey + '&date=' + date;
    
    fetch(url)
        .then(function(response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to fetch data');
            }
        })
        .then(function(data) {
            displayAPOD(data);
            loadingEl.classList.add('hidden');
        })
        .catch(function(error) {
            console.log('Error:', error);
            errorMessage.textContent = 'Unable to load space picture. Please try again.';
            errorEl.classList.remove('hidden');
            loadingEl.classList.add('hidden');
        });
}

function displayAPOD(data) {
    apodTitle.textContent = data.title;
    apodDate.textContent = 'Date: ' + data.date;
    apodImage.src = data.url;
    apodImage.alt = data.title;
    apodExplanation.textContent = data.explanation;
    
    apodContainer.classList.remove('hidden');
}

function handleSearch() {
    const selectedDate = datePicker.value;
    
    if (selectedDate === '') {
        errorMessage.textContent = 'Please select a date.';
        errorEl.classList.remove('hidden');
    } else {
        fetchAPOD(selectedDate);
    }
}

function handleToday() {
    const today = getTodayDate();
    datePicker.value = today;
    fetchAPOD(today);
}

searchBtn.addEventListener('click', handleSearch);
todayBtn.addEventListener('click', handleToday);

const today = getTodayDate();
datePicker.max = today;
datePicker.value = today;
fetchAPOD(today);
