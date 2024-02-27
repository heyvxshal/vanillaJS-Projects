// Unsplash Access Key : Get yours at : https://unsplash.com/developers
const accessKey = "";

const formEl = document.querySelector("form"); // Form
const searchInputEl = document.getElementById("search-input"); // Input - Search-Bar
const searchResultsEl = document.querySelector(".results-container"); // Images Container
const showMoreButtonEl = document.getElementById("show_btn-More"); // Show More Button
const messages = document.querySelector(".messages"); // Message El

let inputData = "";
let page = 1;

async function searchImages() {
  try {
    messages.textContent = "";
    inputData = searchInputEl.value;
    document.activeElement.blur();

    // Fetch Data from API
    const base_url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(base_url);
    const data = await response.json();

    if (page === 1) {
      searchResultsEl.innerHTML = "";
    }

    const results = data.results;

    // Map over each Image Data
    results.map((result) => {
      // Create parent div container
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search--results_img");

      //////////////////////////////////////////
      // Create img El
      const image = document.createElement("img");
      image.src = result.urls.small;
      image.alt = result.alt_description;

      // Create link
      const imageLink = document.createElement("a");
      imageLink.href = result.links.download;
      imageLink.target = "_blank";

      //////////////////////////////////////////

      //////////////////////////////////////////
      // Create Credits El
      const imgCred = document.createElement("div");
      imgCred.classList.add("img-cred");

      // Create Name El
      const nameCreator = document.createElement("p");
      nameCreator.textContent = `By ${result.user.first_name} ${result.user.last_name}`;

      // Create Likes El
      const likes = document.createElement("p");
      likes.textContent = `❤️ : ${result.user.total_likes}`;

      //////////////////////////////////////////

      // Insert in parent div container
      imageWrapper.appendChild(imageLink);
      imageWrapper.appendChild(imgCred);
      imageLink.appendChild(image);

      // Insert in Credits div container
      imgCred.appendChild(nameCreator);
      imgCred.appendChild(likes);

      // Insert on DOM El - search results container
      searchResultsEl.appendChild(imageWrapper);
    });

    page++;

    // If more than 1 pages are present
    if (page > 1) {
      showMoreButtonEl.style.display = "block";
    }

    // If nothing is returned
    if (!results || results.length === 0) {
      throw new Error("No searches found :)");
    }

    // For Single page search results
    if (data.total_pages === 1) {
      showMoreButtonEl.style.display = "none";
    }
  } catch (err) {
    // Catch Errors
    messages.textContent = `${err.message}`; // Display errors to user
    showMoreButtonEl.style.display = "none";
  }
}

// Search query submitted
formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

// Shore More Button results
showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});
