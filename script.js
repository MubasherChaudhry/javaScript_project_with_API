const accessKey = "fKWNRUH5OEHS7Vaa-2g1eJYtuEa8s_Ovqick0fG2nCM";

const formEl = document.querySelector("form");
const inputEl = document.getElementById("searchBar");
const searchResultEl = document.querySelector(".container");
const showMoreBtn = document.querySelector("#show_more_button");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;
  if (page === 1) {
    searchResultEl.innerHTML = "";
  }

  results.map((result) => {
    const imageWraper = document.createElement("div");
    imageWraper.classList.add("search_result");
    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageWraper.appendChild(image);
    imageWraper.appendChild(imageLink);
    searchResultEl.appendChild(imageWraper);
  });
  
  page++;

  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});
showMoreBtn.addEventListener("click", () => {
  searchImages();
});
