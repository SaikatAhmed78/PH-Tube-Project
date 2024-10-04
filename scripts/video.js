

function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour} hour ${minute} minute ${remainingSecond} second ago`
}

const removeActiveClass=()=>{
const buttons = document.getElementsByClassName('category-btn')
console.log(buttons)
for(let btn of buttons){
    btn.classList.remove('active')
}
}


// Creat LoadCategories
const loadCategories = () => {

    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))

};



const loadVideos = () => {

    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch((error) => console.log(error))

};

const loadCategoryVideos = (id) => {
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveClass();
            
            const activeBtn = document.getElementById(`btn-${id}`);
            activeBtn.classList.add('active')
            displayVideos(data.category)
        })
        .catch((error) => console.log(error))

};

const loadDetails = async(videoId)=>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
    const res = await fetch(url)
    const data = await res.json()
    displayDetails(data.video);
   
    
};

const displayDetails =(video)=>{
    const detailsContainer = document.getElementById('modal-content');
    detailsContainer.innerHTML = `
    <img src=${video.thumbnail}>
    <p>${video.description}</p>
    `
    document.getElementById('customModal').showModal();
}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos');
    videosContainer.innerHTML = "";

    if (videos.length === 0) {
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="./assets/Icon.png" alt="">
        <h2 class ="text-xl text-center font-bold">Oops!! Sorry, <br>There is no content here</h2>
    </div>
        `;
       
        return;
    } 
    else{
        videosContainer.classList.add('grid')
    }

    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = 'card card-compact'

        card.innerHTML = `
       
        <figure class = "h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover" />
    
      ${video.others.posted_date?.length === 0 ? "" :
                ` <span class="absolute right-2 bottom-2 text-white bg-black rounded p-1 text-xs">${getTimeString(video.others.posted_date)}</span>`}
     
  </figure>
  
  <div class="px-0 py-2 flex gap-3">
   
    <div>
    <img class= "w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}>
</div>

<div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex items-center gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>

    ${video.authors[0].verified === true ? ' <img class = "w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png">' : ''}
</div>

    <p><button onclick= "loadDetails('${video.video_id}')" class="btn btn-sm btn-error">Description</button></p>
</div>
  </div>
        `;

        videosContainer.append(card)
    })
};



// Creat displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories')

    categories.forEach((item) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML = `
             
             <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
             ${item.category}
             </button>
             `


        categoryContainer.append(buttonContainer);
    })

};

loadCategories()
loadVideos()

