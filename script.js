let posts = [{
    'icon': './img/animal.jpg',
    'author': 'animal.world',
    'image': './img/panda.jpg',
    'heart': './icon/heart.png',
    'description': 'Pandas are BIG eaters - every day they fill their tummies for up to 12 hours, shifting up to 12 kilograms of bamboo!',
    'likes': 9376492,
    'location': 'China',
    'comments': []
},
{
    'icon': './img/travel.jpg',
    'author': 'travel_lifestyle',
    'image': './img/tokyo.jpg',
    'heart': './icon/heart.png',
    'description': 'Shibuya is famous for its scramble crossing, called Shibuya Crossing. It is located in front of the Shibuya Station Hachikō exit and stops vehicles in all directions to allow pedestrians to inundate the entire intersection.',
    'likes': 13431,
    'location': 'Tokyo',
    'comments': []
},
{
    'icon': './img/maschin.jpg',
    'author': 'maschin',
    'image': './img/supra.jpg',
    'heart': './icon/heart.png',
    'description': 'The Toyota Supra is one of the all-time greats of Japanese performance cars. In fact, its one of the worlds best sports cars ever. ',
    'likes': 456,
    'location': 'Los Angeles',
    'comments': []
},
{
    'icon': './img/historia.jpg',
    'author': 'historia.1',
    'image': './img/engelsburg.jpg',
    'heart': './icon/heart.png',
    'description': 'Although the iconic Castel Sant Angelo Rome has served as a fortress, palace, and prison across history, it was built as a mausoleum for Roman emperor Hadrian and his family back in AD 139.',
    'likes': 778,
    'location': 'Rome',
    'comments': []
}];


let username = 'eagle777';


load();


function render() {
    let container = document.getElementById('post-container');
    container.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        container.innerHTML += postTemplate(post, i);

        for (let j = 0; j < post['comments'].length; j++) {
            const comment = post['comments'][j];
            document.getElementById(`comments${i}`).innerHTML += `<strong>${username}</strong>  ${comment}<br>`;
        }
    }
}



function postTemplate(post, i) {
    return /*html*/ `
        <div class='posts'>
        <div class='user-info'><img class='user-icon' src='${post['icon']}'>
        <div class='user-container'><span class='username'><strong>${post['author']}</strong></span><span>${post['location']}</span></div></div>
        <img src='${post['image']}'>
        <div class='likes'><img onclick='changeColor(${i})' class='heart-icon' id="heart${i}" src='${post['heart']}'><strong>likes ${post['likes']}</strong></div>
        <div class='description'><strong>${post['author']}</strong> ${post['description']}</div>
        <div class='comment-section' id='comments${i}'></div>
        <div class='add-comment'><input id='inputfield${i}' type='text' placeholder='Add comment...'><button onclick='addComment(${i})'>Post</button><div>
        </div>`}



function changeColor(i) {
    let image = document.getElementById(`heart${i}`);
    if (image.src == 'file:///c%3A/Programmieren/Modul-7/bloggram/icon/heart.png' ||
        image.src == 'https://dschabrail-isaev.developerakademie.net/Modul-7/bloggram/icon/heart.png') {
        image.src = './icon/heart-red.png';
        posts[i]['heart'] = './icon/heart-red.png';
        likesIncrease(`${i}`);
    }
    else {
        image.src = './icon/heart.png';
        posts[i]['heart'] = './icon/heart.png';
        likesDecrease(`${i}`);
    }
    save();
}



function likesIncrease(i) {
    let post = posts[i];
    post['likes'] = post['likes'] + 1;

    save();
    render();
}



function likesDecrease(i) {
    let post = posts[i];
    post['likes'] = post['likes'] - 1;

    save();
    render();
}



function save() {
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('post', postsAsText);
}



function load() {
    let postsAsText = localStorage.getItem('post');
    if (postsAsText) {
        posts = JSON.parse(postsAsText);
    }
}



function addComment(i) {
    let comment = document.getElementById(`inputfield${i}`).value;
    if (comment.length >= 1) {
        posts[i]['comments'].push(comment);
    }

    document.getElementById(`inputfield${i}`).value = '';

    save();
    render();
}