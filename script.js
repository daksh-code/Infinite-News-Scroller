let postsContainer = document.querySelector("#posts-container");
let pageNumber = 1;

async function getPosts() {
	const res = await fetch(`https://hn.algolia.com/api/v1/search?page=${pageNumber}&tags=story`);
	const data = await res.json();
	return data ;
}  

async function showPosts() {
	const posts =await getPosts();
	const hits = posts.hits;
	console.log(hits);
	hits.forEach((post) => {
		const postEl = document.createElement("div");
		postEl.classList.add("post");
		postEl.innerHTML = `
		<a target = "_blank" href=${post.url}>
			<div class ="number">${post.points}</div>
			<div class ="post-info">
				<h2 class ="post-title">${post.title}</h2>
				<p class ="post-body">${post.author}</p>
			</div>
		`;
		postsContainer.appendChild(postEl);
	}); 
}

showPosts();

window.addEventListener("scroll",() => {
	const scrollTop = document.documentElement.scrollTop ;
	const scrollHeight = document.documentElement.scrollHeight ; 
	const clientHeight = document.documentElement.clientHeight ;

	if ( scrollTop + clientHeight >= scrollHeight - 5 ){
		pageNumber++;
		showPosts();
	}
});

function filterPosts(e) {
    const userInput=e.target.value.toUpperCase();
    const posts=document.querySelectorAll(".post");
    posts.forEach((post) => {
        const title=post.querySelector(".post-title").innerHTML.toUpperCase();
        const author=post.querySelector(".post-body").innerHTML.toUpperCase();
        if(title.indexOf(userInput) > -1 || author.indexOf(userInput) > -1){
            post.style.display="flex";
        }
        else{
            post.style.display="none";
        }
    });
}

let inputField=document.querySelector("#filter");
inputField.addEventListener("input",filterPosts);