const loadNavItems = () => {
    const URL = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(URL)
        .then((res) => res.json())
        .then((data) => displayNavItems(data.data.news_category))
        .catch((err) => console.log(err));
};

const displayNavItems = (categories) => {
    const categoryContainer = document.getElementById("category");
    categoryContainer.classList.add("categoryDiv");
    for (const category of categories) {
        const categoryDiv = document.createElement("div");
        categoryDiv.innerHTML = `
                <button class="navtext border border-0" style="font-size: 17px;"  value="${category.category_id}" id="button  btn_${category.category_id}">${category.category_name}</button>     
        `;
        categoryContainer.appendChild(categoryDiv);

        document
            .getElementById(`btn_${category.category_id}`)
            .addEventListener("click", function (e) {
                e.preventDefault();

                console.log(e);
            });
    }
};

const loadAllCategory = () => {
    const URL = `https://openapi.programming-hero.com/api/news/category/01`;
    fetch(URL)
        .then((res) => res.json())
        .then((data) => displayAllCategory(data.data));
};
const displayAllCategory = (news) => {
    const newsCategoryContainer = document.getElementById("newsContainer");
    for (const singleNews of news) {
        console.log(singleNews);
        const newsDiv = document.createElement("div");
        newsDiv.classList.add("newsCardStyle");
        newsDiv.innerHTML = `
        <div class=" card mb-3 border border-0" style="max-width: 100%;">
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
                        <p class="card-text">
                            <small class="text-muted d-flex justify-content-between">
                               <span>${singleNews.author.name} </span>  <span>${singleNews.total_view} </span>  
                               </small>
                        </p>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsCategoryContainer.appendChild(newsDiv);
    }
};

loadNavItems();
loadAllCategory();
