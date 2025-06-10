
/* Blog post */
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('entry');
    const postList = document.getElementById('post_list');
    let Posts = []; // Define the post array

    loadPostsFromLocalStorage();

    // Add event listeners to the "post" button
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const item = document.getElementById('item').value;
        const user = document.getElementById('user').value;
        const date_created = new Date();
        const last_edit = 0;

        if(title && item && user) {
            Posts.push({ title, item, user, date_created, last_edit});
            savePostToLocalStorage();
            updatePostList();
            form.reset();
        }
    });
    
    function updatePostList() {
        postList.innerHTML = '';
        Posts.forEach((post, index) => {
            const li = document.createElement('section');
            li.innerHTML = `
                <div class='post_list'>
                    <span class="postitem">
                        <span class="title">
                            ${post.title}
                        </span>
                        <span class="item">
                            ${post.item}
                        </span>
                        <span class="user">
                            ${post.user}
                        </span>
                        <button onclick="editItem(${index})">edit</button>
                        <button onclick="removeItem(${index})">delete</button>
                        <span class="date">
                            ${post.date_created}
                        </span>
                    </span>
                </div>
            `;
            postList.appendChild(li);
        });
    } 
    
    window.removeItem = function(index) {
        Posts.splice(index, 1);
        savePostToLocalStorage();
        updatePostList();
    }

    window.editItem = function(index) {
        const event = Posts[index];
        const li = postList.children[index];
    
        li.innerHTML = `
            <input type="text" class="edit-title" value="${event.title}">
            <input type="text" class="edit-item" value="${event.item}">
            <input type="text" class="edit-user" value="${event.user}">
            <button onclick="saveEdit(${index})">Save</button>
            <button onclick="cancelEdit(${index})">Cancel</button>
        `;
    }
    
    window.saveEdit = function(index) {
        const li = postList.children[index];
        const newtitle = li.querySelector('.edit-title').value;
        const newitem = li.querySelector('.edit-item').value;
        const newuser = li.querySelector('.edit-user').value;
        const event = Posts[index];
        const olddate = event.date_created;
        const newedit = new Date();

        if (newtitle && newitem && newuser) {
            Posts[index] = { title: newtitle, item: newitem, user: newuser, date_created: olddate, last_edit: newedit };
            updatePostList();
            savePostToLocalStorage;
        }
    }

    window.cancelEdit = function(index) {
        updatePostList();
    }

    function savePostToLocalStorage() {
        localStorage.setItem('post', JSON.stringify(Posts));
    }

    function loadPostsFromLocalStorage() {
        const storedPosts = JSON.parse(localStorage.getItem('post'));
        if (storedPosts) {
            Posts = storedPosts;
            updatePostList();
        }
    }
})