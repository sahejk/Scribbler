const queryString = new Array();
let editMode = false;
let num = 0;

function onEdit() {
        num += 1;
        console.log(num);
        if (!editMode) {
                document.getElementById('editHeading').style.borderWidth = '1px';
                document.getElementById('editHeading').style.borderStyle = 'solid';
                document.getElementById('editHeading').style.borderColor = 'red';

                document.getElementById('editContent').style.borderWidth = '1px';
                document.getElementById('editContent').style.borderStyle = 'solid';
                document.getElementById('editContent').style.borderColor = 'red';

                document.getElementById('editButton').innerHTML =
                        'Save<i class="fa fa-save" style="padding-left: 4px;"></i></button>';
                editMode = true;
        } else {
                if (num === 2) {
                        var temp = document.getElementById('editHeading');
                        document.getElementById('editHeading').innerHTML = `<span>UPDATED:</span>${temp.innerHTML}`;

                        var temp = document.getElementById('editContent');
                        document.getElementById('editContent').innerHTML = `<div>UPDATED:</div>${temp.innerHTML}`;
                }

                document.getElementById('editContent').style.border = 'none';
                document.getElementById('editHeading').style.border = 'none';

                document.getElementById('editButton').innerHTML =
                        'Edit<i class="fa fa-edit" style="padding-left: 4px;"></i>';
                document.getElementById('editButton').disabled = true;
        }
}

window.onload = function() {
        if (queryString.length == 0) {
                if (window.location.search.split('?').length > 1) {
                        const params = window.location.search.split('?')[1].split('&');
                        for (let i = 0; i < params.length; i++) {
                                const key = params[i].split('=')[0];
                                const value = decodeURIComponent(params[i].split('=')[1]);
                                queryString[key] = value;
                        }
                }
        }
        if (queryString.heading != null && queryString.author != null) {
                const { heading } = queryString;
                const { author } = queryString;
                const { content } = queryString;
                document.getElementsByClassName('heading-content')[0].innerHTML = heading;
                document.getElementsByClassName('author-name')[0].innerHTML = author;
                document.getElementsByClassName('post-content')[0].innerHTML = content;
        }
        document.getElementById('comments').style.visibility = 'hidden';
};

let cnt = 0;
function countLikes() {
        cnt = parseInt(cnt) + parseInt(1);
        const divData = document.getElementById('showCount');
        const likeButton = document.getElementById('likeButton');
        likeButton.innerHTML = 'Liked';
        if (cnt == 1) divData.innerHTML = `${cnt} person likes this !`;
        // this part has been edited
        else divData.innerHTML = `${cnt} people like this !`;
}

const comments = [];

function addingComment(item, index) {
        const temp = document.getElementById('comments').innerHTML;
        document.getElementById('comments').innerHTML = `<div class="comment">${item}</div>` + `</br>`;
        document.getElementById('comments').innerHTML += `${temp}</br>`;
        comments.pop();
}

function addComment(comment) {
        if (comment.value !== '') {
                document.getElementById('comments').style.visibility = 'visible';
                var comment = comment.value;
                comments.unshift(comment);
                $('#comment').val('');
                console.log(comments);
                comments.forEach(addingComment);
                $(document).scrollTop($(document).height());
        }
}