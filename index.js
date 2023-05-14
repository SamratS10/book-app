let root = document.getElementById("root");
let userSearchBooks = document.getElementById("userRoot");
let searchInput = document.getElementById("search");
let searchUrl = null;
const url = " https://www.dbooks.org/api/recent";
const root_child = (object) => {
    const {
        image,
        url
    } = object;
    //div Element
    let divEl = document.createElement("div");
    divEl.classList.add("card");

    //anchor element
    let anchorEl = document.createElement("a");
    anchorEl.href = url;
    anchorEl.tab = "_blank";
    divEl.appendChild(anchorEl);

    //image tag
    let imageEl = document.createElement("img");
    imageEl.classList.add("card-image");
    imageEl.src = image;
    anchorEl.appendChild(imageEl);

    //append the children into root div element
    root.appendChild(divEl);
}

const search_result = (object) => {
    const {
        image,
        url
    } = object;
    //div element 
    const divEl = document.createElement("div");
    divEl.classList.add("card");

    //anchor element
    let anchorEl = document.createElement("a");
    anchorEl.href = url;
    anchorEl.tab = "_blank";
    divEl.appendChild(anchorEl);

    //image tag
    let imageEl = document.createElement("img");
    imageEl.classList.add("card-image");
    imageEl.src = image;
    anchorEl.appendChild(imageEl);

    userSearchBooks.appendChild(divEl);

};


const get_response = async (Url) => {
    try {
        const response = await fetch(Url);
        const jsonData = await response.json();
        const {
            books
        } = jsonData;
        for (let i of books) {
            root_child(i);
        }
    } catch (error) {
        console.log(error);
    }
}


const getSearchResults = async () => {
    try {
        const response = await fetch(searchUrl);
        const jsonData = await response.json();
        const {
            books
        } = jsonData;
        for (let i of books) {
            search_result(i);
        }
    } catch (error) {
        console.log(error);
    }
};
searchInput.addEventListener("keyup", function(event) {
    let userInput = event.target.value;
    if (event.key === "Enter") {
        userSearchBooks.textContent = "";
        searchUrl = "https://www.dbooks.org/api/search/" + userInput;
        root.classList.toggle("hide");
        userSearchBooks.classList.toggle("hide");
        getSearchResults();
    } else if (userInput === "" || userInput === undefined) {
        userSearchBooks.textContent = "";
        root.classList.toggle("hide");
        userSearchBooks.classList.toggle("hide");

    }
});
get_response(url);