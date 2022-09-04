const loadNavItems = () => {
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            displayNavItems(data.data.news_category);
            return data;
        })
        .then((data) => {
            btnHandle(data.data.news_category);
        });
};

const displayNavItems = (categories) => {
    const categoryContainer = document.getElementById("category");
    categoryContainer.classList.add("categoryDiv");
    for (const category of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
                <button class="navtext border border-0 btn_${category.category_id}" style="font-size: 17px;" value="${category.category_id}" id="button">${category.category_name}</button>     
        `;

        categoryContainer.appendChild(categoryDiv);
    }
};

const btnHandle = (categories) => {
    for (const category of categories) {
        document
            .querySelector(`.btn_${category.category_id}`)
            .addEventListener("click", (e) => {
                loadAllCategory(e.target.value);
            });
    }
};

const loadAllCategory = (id) => {
    const newsCategoryContainer = document.getElementById("newsContainer");
    newsCategoryContainer.innerHTML = "";

    toggleSpinner(true);

    if (!id) {
        const URL = `https://openapi.programming-hero.com/api/news/category/01`;
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                displayAllCategory(data.data);
                return data;
            })
            .then((data) => {
                handleSingleNews(data.data);
            });
    } else {
        const URL = `https://openapi.programming-hero.com/api/news/category/${id}`;
        fetch(URL)
            .then((res) => res.json())
            .then((data) => {
                displayAllCategory(data.data);
                return data;
            })
            .then((data) => {
                handleSingleNews(data.data);
            });
    }
};

const loadSingleNews = (id) => {
    const URL = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(URL)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data[0]);
            displayModal(data.data[0]);
            // displayAllCategory(data.data);
        });
};

const displayAllCategory = (news) => {
    const newsCategoryContainer = document.getElementById("newsContainer");

    for (const singleNews of news) {
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("newsCardStyle");
        newsDiv.innerHTML = `
        <div type="button" data-bs-toggle="modal" data-bs-target="#newsModal" class="card mb-3 border border-0 card_${singleNews._id}" style="max-width: 100%;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img
                        src="${singleNews.image_url}"
                        class="img-fluid rounded-start"
                        alt="..."
                    />
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title mb-4">${singleNews.title}</h5>
                        <p class="card-text d-inline-block text-truncate"style="max-width: 100%;">
                            ${singleNews.details}
                        </p>
                        <p class="card-text mt-4">
                            <small class="text-muted d-flex justify-content-between">
                    
                              <span><img
                              src="${singleNews.author.img}"
                              class="img-fluid author-img"
                              alt="..."
                              <span>${singleNews.author.name} </span>
                           </span>
                           
                          <span> views: ${singleNews.total_view} </span>  
                               </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsCategoryContainer.appendChild(newsDiv);
    }

    toggleSpinner(false);
};

const handleSingleNews = (news) => {
    for (const singleNews of news) {
        document
            .querySelector(`.card_${singleNews._id}`)
            .addEventListener("click", (e) => {
                loadSingleNews(singleNews._id);
            });
    }

    toggleSpinner(false);
};

const displayModal = (singleNews) => {
    const modalDiv = document.querySelector("#newsModal");

    modalDiv.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="newsModalLabel">
                    ${singleNews.title}
                </h5>
                <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
            </div>
            <div class="modal-body">
                <div class="card" >
                <img src="${singleNews.image_url}" class="card-img-top" alt="...">
                <div class="card-body">
                    <p class="card-text">${singleNews.details}</p>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Close
                </button>
            </div>
        </div>
    </div>
    `;
};
// loadSingleNews(${singleNews._id})

// ------------------------loader------------------->
const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById("loader");
    if (isLoading) {
        loaderSection.classList.remove("d-none");
    } else {
        loaderSection.classList.add("d-none");
    }
};

loadNavItems();
loadAllCategory();
