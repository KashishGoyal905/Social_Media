// {
//     // method to submit the data to create a new post using ajax 
//     let createPost = function () {
//         let newPost = $('#newPostForm');
//         newPost.submit(function (e) {
//             // by this form will not submit itself by clicking button will do it via ajax manually
//             e.preventDefault();
//             $.ajax({
//                 type: 'POST',
//                 url: '/posts/create-post',
//                 data: newPost.serialize(),
//                 success: function (data) {
//                     console.log(data);
//                     let newPost = newPostDom(data.data.post);
//                     $('#posts-list').prepend(newPost);
//                     deletePost($(' .deletePostButton', newPost));
//                 },
//                 error: function (error) {
//                     console.log(error.responseText);
//                 }
//             })
//         })

//     }


//     let newPostDom = function (post) {
//         return $(`
//         <li id="post-${post._id}">
//             <h2>
//             ${post.content}
//                 -${post.user.username}
//                         <a href="/posts/destroy/${post._id}" class="deletePostButton">X</a>
//             </h2>

//             <div class="comments">
//                     <form action="/comments/create-comment/${post._id}" method="post">
//                         <textarea name="content" cols="30" rows="1"
//                             placeholder="enter your comment here"></textarea>
//                         <button type="submit">Comment</button>
//                     </form>
//                     <div class="comment-list">
//                     <ol type="I" id="comment-list-"${post._id}>
//                     </ol>
//                     </div>
//             </div>
//         </li>
//         `)
//     }


//     let deletePost = function (deleteLink) {
//         $(deleteLink).click(function (e) {
//             e.preventDefault();

//             $.ajax({
//                 method: "get",
//                 url: $(deleteLink).prop('href'),
//                 success: function (data) {
//                     $(`post-${data.data.post._id}`).remove();
//                 },
//                 error: function (error) {
//                     console.log(error.responseText);
//                 }
//             })
//         })
//     }
//     createPost();
// }
