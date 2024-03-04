const postsContainer=document.getElementById("posts-container")
let count = 0;
let indicatorColor="";

const handleSearch = async () =>{
  showLoadingSpinner()
  await new Promise((res)=>setTimeout(res,2000));
    const response = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await response.json();
    
    displayPosts(data)
    
   hideLoadingSpinner()
}

const displayPosts=(data)=>{
    data.posts.forEach((post)=>{
        if(post.isActive){
            indicatorColor="bg-green-500"
        }
        else{
            indicatorColor="bg-red-500"
        }
        const div =document.createElement('div');
        div.classList=`card mb-5 card-side bg-gray-200`
        div.innerHTML=`
        <div class="card-body">
                      <div class="flex flex-col lg:flex-row">
                        <div class="indicator">
                          <span class="indicator-item badge ${indicatorColor}"></span> 
                          <div class="grid w-32 h-32 bg-base-300 place-items-center"><img src="${post.image}" alt=""></div>
                        </div>
                        <div>
                          <div>
                            <div class="flex gap-x-3 lg:gap-x-7 text-right">
                              <h2 class="card-title ">
                                <h2 class="text-xs  mt-10 lg:text-2xl lg:mt-0" id="">${post.category}</h2>
                                <h2 class="text-xs  mt-10 lg:text-2xl lg:mt-0"  id="">${post.author.name}</h2>
                              </h2>
                            </div>
                            <div class="pl-5">
                              <h1 class="text-xs mt-5 lg:text-3xl lg:mt-0">
                                ${post.title}
                              </h1>
                              <p class="text-xs lg:text-xl">${post.description}</p>
                            </div>
                            <div class="divider mt-10"></div>
                           
                          </div>
                          <div class="inline-flex gap-x-10">
                            <div class="flex gap-x-2"><img src="images/Group 13.png" alt="">
                              <h2>${post.comment_count}</h2>
                            </div>
                            <div class="flex gap-x-2"><img src="images/Group 16.png" alt="">
                              <h2>${post.view_count}</h2>
                            </div>
                            <div class="flex gap-x-2"><img src="images/Group 18.png" alt="">
                              <h2>${post.posted_time}</h2>
                            </div>
                            
                          </div>
                          <div class="card-actions justify-end">
                            <button onclick="readPost(&#34;${post.title}&#34;,&#34;${post.view_count}&#34;)" class="btn"><img src="images/email 1.png" alt=""></button>
                          </div>
                        
      
                        </div>
      
                      </div>
                      
                      
                      
      
                      
                      
                      
                    </div>
        `;
        postsContainer.appendChild(div);
       });
    
}
const readPost=(title,view_count)=>{
    const readedPostContainer=document.getElementById('readed-post-container');
    const div=document.createElement("div");
    div.classList=`flex-col justify-between`;
    div.innerHTML=`
    <div class="flex">
    <p class=" mt-5  lg:mt-0">
                  ${title}
                </p>
                <div class="flex gap-x-2 "><img src="images/Group 16.png" alt="">
                  <p>${view_count}</p>
                </div>
    </div>
    
    `;
    readedPostContainer.appendChild(div);
    count++;
    const counter=document.getElementById('count');
    counter.innerText=count;
}

const latestPostContainer=document.getElementById("latestPost-containar")
const LatestPost = async () =>{
    const response = await fetch(' https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await response.json();
    // console.log(data)
    data.forEach((latest)=>{
        // console.log(latest)
        

        
     const div =document.createElement('div');  
     div.classList=`card flex w-full bg-base-100 shadow-xl`
     div.innerHTML=`
     
     <figure><img  src="${latest.cover_image}" alt="Shoes" /></figure>
     <div class="card-body">
       <div class="flex gap-2">
         <img src="images/Frame (1).png" alt="">
         <h1> ${latest.author.posted_date?latest.author.posted_date:"No publish date"}
         </h1>
       </div>
       <h2 class="card-title">
         ${latest.title}
         
       </h2>
       <p>${latest.description} </p>
       <div class="card-actions justify-start">
         <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
           <div class="w-10 rounded-full">
             <img alt="Tailwind CSS Navbar component" src="${latest.profile_image}" />
           </div>
         </div>
         <div>
           <h1>${latest.author.name}</h1>
           <p>${latest.author.designation?latest.author.designation:"Unknown"}
           </p>
         </div>
         
       </div>
     </div>
     ` ;
     latestPostContainer.appendChild(div);
    //  console.log(latestPostContainer)

    });
    // toggleLoadingSpinner(false);

}

const Search= async() =>{
  postsContainer.textContent=""
  showLoadingSpinner()
  await new Promise((resolve)=>setTimeout(resolve,2000));
    const searchContainar=document.getElementById("search-containar").value;
    console.log(searchContainar)
    
    const response = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchContainar}`);
    const data= await response.json();
    console.log(data)
    hideLoadingSpinner(); 
    displayPosts(data)
    

}
const loadingSpinner = document.getElementById('loading-spinner');
const showLoadingSpinner =() =>{
  
    loadingSpinner.classList.remove('hidden');
  
    
  }
const hideLoadingSpinner =() =>{
  
    loadingSpinner.classList.add('hidden');
  
    
  }


LatestPost()

handleSearch();

