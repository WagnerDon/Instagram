let posts = [
    {
        "profilepicture": "img/akiane.jpg",
        "profile": "akianeart",
        "location": "United States",
        "post": "img/princeofpeace.jpg",
        "link": "https://www.instagram.com/akianeart",
        "likes": 4,
        "comments": {
            "person": ["akianeart"],
            "comment": ["Prince Of Peace."],
        },
        "lastpost": "0:0 (24.12.2019)",
        "liked": false,
        "following": false,
    },
    {
        "profilepicture": "img/pixeljeff.jpg",
        "profile": "pixeljeff_design",
        "location": "Taiwan",
        "post": "img/festivaloflight.gif",
        "link": "https://www.instagram.com/pixeljeff_design",
        "likes": 0,
        "comments": {
            "person": ["pixeljeff_design"],
            "comment": ["Check out the new GIF I made!"],
        },
        "lastpost": "5:50 (2.11.2022)",
        "liked": false,
        "following": false,
    },
    {
        "profilepicture": "img/screenjunkies.jpg",
        "profile": "screenjunkies",
        "location": "United States",
        "post": "img/starwars.jpg",
        "link": "https://www.instagram.com/screenjunkies",
        "likes": 2,
        "comments": {
            "person": ["screenjunkies"],
            "comment": ["May the 4th was just with us, and the cast for Star Wars: Episode VII has been announced - what better time to revisit Attack of the Clones, the movie that confirmed our very bad feeling about the prequels. So strap in for this sequel to the very first Honest Trailer EVER!! "],
        },
        "lastpost": "3:0 (30.6.2022)",
        "liked": false,
        "following": false,
    },
    {
        "profilepicture": "img/fulqrum.jpg",
        "profile": "fulqrumpublishing",
        "location": "Czechia",
        "post": "img/menofwar.jpg",
        "link": "https://www.instagram.com/fulqrumpublishing",
        "likes": 3,
        "comments": {
            "person": ["fulqrumpublishing", "don_wagner"],
            "comment": ["Have you watched the #GoldenJoystickAwards  live this Tuesday? Then surely you didn't miss the new #MenOfWarII trailer. But just in case... Here it is! Stay tuned, we will have interesting announcements for you soon! #MenOfWar | #Strategy | #Games | #PCGaming", "That's awesome!"],
        },
        "lastpost": "13:48 (5.11.2022)",
        "liked": false,
        "following": false,
    },
    {
        "profilepicture": "img/dailywire.jpg",
        "profile": "realdailywire",
        "location": "United States",
        "post": "img/blackfriday.jpg",
        "link": "https://www.instagram.com/realdailywire",
        "likes": 1,
        "comments": {
            "person": ["realdailywire"],
            "comment": ["DailyWire+ 2022 recap! You thought this year was big? We’re just getting started. Join the fight at our link in bio!"],
        },
        "lastpost": "11:0 (18.11.2022)",
        "liked": false,
        "following": false,
    },
]

let userData = {
    liked: [],
    following: [],
    name: "mr",
    surname: "bing",
    modifiedName: "mr_bing",
    avatar: "img/man.png",
    password: "123",
};

let lever;

let counter = 0;

function search() {
    setTimeout(function () {
        let input = document.getElementById('input').value;
        if (input.length > 0) {
            renderSearch(input);
        }
        else {
            document.getElementById('search').innerHTML = "";
        }
    }, 1);
}

function renderSearch(value) {
    let content = document.getElementById('search');
    content.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {
        if (posts[i]["profile"].indexOf(value) === 0) {
            content.innerHTML += `
            <div class="margin5 padding5 textalign">
                <a href="${posts[i]["link"]}" target="_blank">${posts[i]["profile"]}</a>
                <div class="border5 suggestiondiv link" onclick="resetSearch()"><a href="#headline${i}">${posts[i]["profile"]}</a></div>
            </div>
            `;
        }
    }
}

function resetSearch() {
    document.getElementById('input').value = "";
    document.getElementById('search').innerHTML = "";
    lever = "Ho";
}

function tikTak() {
    if (lever === "Hi") {
        lever = "Ho"
        document.getElementById('search').innerHTML = "";
    }
    else {
        lever = "Hi";
        renderSearch("");
    }
}

function onEnter(number) {
    let input = document.getElementById("comment" + number);

    input.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            addComment(number);
        }
    });
}

let date = new Date();

function setDate(number) {
    let d = new Date();
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let year = d.getFullYear();
    let date = `${hours}:${minutes} (${day}.${month}.${year})`;
    posts[number]["lastpost"] = date;
}

function addComment(number) {
    const whatComment = posts[number]["comments"]["comment"];
    const whatPerson = posts[number]["comments"]["person"];
    const thisComment = document.getElementById('comment' + number).value;
    if (thisComment.length > 0) {
        whatComment.push(thisComment);
        whatPerson.push(userData.modifiedName);
        setDate(number);
        renderPosts();
    }
}

function renderPosts() {
    let content = document.getElementById('content');
    content.innerHTML = "";
    for (let i = 0; i < posts.length; i++) {
        const owner = posts[i];
        const profilepicture = owner["profilepicture"];
        const profile = owner["profile"];
        const location = owner["location"];
        const post = owner["post"];
        const link = owner["link"];
        const likes = owner["likes"];
        const comments = owner["comments"];
        const lastpost = owner["lastpost"];

        postHTML(profilepicture, profile, location, post, link, likes, lastpost, i, content);
        renderComments(comments, i);
        checkFollow(i);
        checkLike(i);
    }
}

function renderComments(comments, i) {
    for (let x = 0; x < comments["comment"].length; x++) {
        const person = comments["person"][x];
        const comment = comments["comment"][x];
        const commentContent = document.getElementById('comments' + i);

        userComment(commentContent, person, comment, x, i);
        presetComment(commentContent, person, comment);
    }
}

function presetComment(commentContent, person, comment) {
    if (person !== userData.modifiedName) {
        commentContent.innerHTML += `
    <div class="displayflex column columngapw topbottom5">
        <p class="bold">${person}:</p>
        <p class="wordbreak">${comment}</p>
    </div>
    `;
    }
}

function userComment(commentContent, person, comment, x, i) {
    if (person == userData.modifiedName) {
        commentContent.innerHTML += `
    <div class="displayflex column columngapw topbottom5 relative delete">
        <p class="bold">${person}:</p>
        <p class="wordbreak">${comment}</p>
        <button title="remove comment" class="deletebutton displayflex center border5 cursor" onclick="deleteComment(${x}, ${i})">X</button>
    </div>
    `;
    }
}

function postHTML(profilepicture, profile, location, post, link, likes, lastpost, i, content) {
    content.innerHTML += `
    <div class="post displayflex column border5">
        <div id="headline${i}" class="headline displayflex between padding10">
            <div class="displayflex columngap align">
                <img class="headlinelogo round" src="${profilepicture}">
                <div class="displayflex column">
                    <div class="displayflex columngap align">
                        <a title="visit profile" class="profile" href="${link}" target="_blank"><b>${profile}</b></a>
                    </div>
                    <p>${location}</p>                  
                </div>
            </div>
        </div>

        <img class="post-img cursor" onclick="doubleClick(${i})" src="${post}">

        <div id="symbols" class="sideborder specialpadding5">
            <div title="like" id="heart${i}" onclick="like(${i})" class="icon"></div>
        </div>

        <p class="sideborder specialpadding5 backgroundtext">has ${likes} ${plural(likes)}</p>

        <div class="sideborder comments specialpadding5" id="comments${i}"></div>

        <p class="sideborder specialpadding5 backgroundtext">last post was at ${lastpost}</p>

        <div class="sideborder comment displayflex between">
            <input title="comment" onfocus="onEnter(${i})" id="comment${i}" class="padding10" placeholder="Add Comment">
            <p title="post" class="colorw padding10 cursor" onclick="addComment(${i})">Post</p>
        </div>
    </div>
    `;
}

function deleteComment(number, post) {
    let person = posts[post]["comments"]["person"];
    let comment = posts[post]["comments"]["comment"];
    person.splice(number, 1);
    comment.splice(number, 1);
    renderPosts();
}

function plural(number) {
    if (number === 1) {
        return "like";
    }
    else {
        return "likes";
    }
}

function renderInfo() {
    let content = document.getElementById('info');
    content.innerHTML = "";
    content.innerHTML += `
    <div class="displayflex columngap mediahide">
        <img class="profilelogo round" src="${userData.avatar}">
        <div class="displayflex column">
            <p>${userData.name} ${userData.surname}</p>
            <p><b>${userData.modifiedName}</b></p>
        </div>
    </div>
    `;
    if (userData.following.length > 0) {
        content.innerHTML += `
        <h3 class="following">Following</h3>
        `;
    }
    renderFollowing(content);
}

function renderFollowing(content) {
    for (let i = 0; i < userData.following.length; i++) {
        const following = userData.following[i];
        const profilepicture = following["profilepicture"];
        const link = following["link"];
        const profile = following["profile"];
        content.innerHTML += `
        <div class="media displayflex between specialpadding5">
            <div class="displayflex columngap align mediaheadlinelogosmall">
                <img class="headlinelogosmall round" src="${profilepicture}">
                <a class="profile" href="${link}" target="_blank"><b>${profile}</b></a>
            </div>
            <p onclick="follow(${posts.indexOf(following)})" class="mediamargintop cursor specialpadding5 border5 follow" title="unfollow">Unfollow</p>
        </div>
        `;
    }
}

function follow(number) {
    if (posts[number]["following"] === false) {
        posts[number]["following"] = true;
        userData.following.push(posts[number]);
    }
    else {
        posts[number]["following"] = false;
        userData.following.splice(userData.following.indexOf(posts[number]), 1);
    }
    renderPosts();
    renderInfo();
}

function checkFollow(number) {
    if (posts[number]["following"] === false) {
        document.getElementById('headline' + number).innerHTML += `
        <p onclick="follow(${number})" class="cursor specialpadding5 border5 follow" title="follow">Follow</p>
        `;
    }
}

function doubleClick(number) {
    setTimeout(() => { counter = 0 }, 500);
    if (counter !== 2) {
        counter++;
    }
    if (counter == 2) {
        like(number);
        counter = 0;
    }
}

function like(number) {
    if (posts[number]["liked"] === true) {
        posts[number]["liked"] = false;
        userData.liked.splice(userData.liked.indexOf(number), 1);
        posts[number]["likes"]--;
    }
    else {
        posts[number]["liked"] = true;
        userData.liked.push(number);
        posts[number]["likes"]++;
    }
    renderPosts();
}

function checkLike(number) {
    if (posts[number]["liked"] === true) {
        document.getElementById('heart' + number).innerHTML = "";
        document.getElementById('heart' + number).innerHTML += `<img src="img/heartactive.png">`;
    }
    else {
        document.getElementById('heart' + number).innerHTML = "";
        document.getElementById('heart' + number).innerHTML += `<img src="img/heart.png">`;
    }
}

function searchAndDestroy() {
    let oldName = userData.modifiedName;

    for (let i = 0; i < posts.length; i++) {
        const person = posts[i]["comments"]["person"];
        for (let x = 0; x < person.length; x++) {
            if (person[x] == oldName) {
                person[x] = document.getElementById('namechange').value.toLowerCase() + "_" + document.getElementById('surnamechange').value.toLowerCase();
            }
        }
    }
}

function dismissChange() {
    document.getElementById('changeprofile').classList.add('displaynone');
    document.body.style.overflow = "unset";
}

function finishChange() {
    searchAndDestroy();
    userData.name = document.getElementById('namechange').value;
    userData.surname = document.getElementById('surnamechange').value;
    userData.modifiedName = document.getElementById('namechange').value.toLowerCase() + "_" + document.getElementById('surnamechange').value.toLowerCase();
    document.getElementById('changeprofile').classList.add('displaynone');
    document.body.style.overflow = "unset";
    document.getElementById('headerprofile').setAttribute("src", userData.avatar)
    renderInfo();
    renderPosts();
}

function changeProfile() {
    document.getElementById('changeprofile').classList.remove('displaynone');
    document.body.style.overflow = "hidden";
    document.getElementById('namechange').value = userData.name;
    document.getElementById('surnamechange').value = userData.surname;
    document.getElementById('passwordchange').value = userData.password;
}

function setAvatar(gender) {
    male(gender);
    female(gender);
}

function male(gender) {
    if (gender == "male") {
        userData.avatar = "img/man.png";
        if (document.getElementById('maleavatar')) {
            document.getElementById('maleavatar').classList.add('avatarborder');
            document.getElementById('femaleavatar').classList.remove('avatarborder');
        }
        document.getElementById('maleavatarchange').classList.add('avatarborder');
        document.getElementById('femaleavatarchange').classList.remove('avatarborder');
    }
}

function female(gender) {
    if (gender == "female") {
        userData.avatar = "img/woman.png";
        if (document.getElementById('femaleavatar')) {
            document.getElementById('femaleavatar').classList.add('avatarborder');
            document.getElementById('maleavatar').classList.remove('avatarborder');
        }
        document.getElementById('femaleavatarchange').classList.add('avatarborder');
        document.getElementById('maleavatarchange').classList.remove('avatarborder');
    }
}

function finishProfile() {
    userData.name = document.getElementById('name').value;
    userData.surname = document.getElementById('surname').value;
    userData.modifiedName = document.getElementById('name').value.toLowerCase() + "_" + document.getElementById('surname').value.toLowerCase();
    userData.password = document.getElementById('password').value;
    document.getElementById('makeprofile').style.display = "none";
    document.getElementById('headerprofile').setAttribute("src", userData.avatar)
    renderInfo();
    renderPosts();
}

function makeProfile() {
    document.body.innerHTML += `
    <div id="makeprofile" class="makeprofile displayflex center">
        <div class="sidepadding30 displayflex column">
            <h3 class="textalign">Hello and welcome on the new Social Media Plattform</h3>
            <h2 class="textalign">InSync™</h2><br>
            <h4 class="textalign">Before we start, create your profile</h4><br>
            <form class="displayflex column center" onsubmit="finishProfile(); return false">
                Name:
                <input placeholder="Mr" id="name" class="border5" type="text" name="name" required><br>
                Surname:
                <input placeholder="Bing" id="surname" class="border5" type="text" name="surname" required><br>
                Choose Your Avatar:
                <div class="displayflex evenly">
                    <div title="avatar1" onclick="setAvatar('male')" class="avatar">
                        <img class="round" id="maleavatar" src="img/man.png">
                    </div>
                    <div title="avatar2" onclick="setAvatar('female')" class="avatar">
                        <img class="round" id="femaleavatar" src="img/woman.png">
                    </div>
                </div>
                Password:
                <input placeholder="*****" id="password" class="border5" type="password" name="password" required><br>
                <input class="border5 submit cursor" type="submit">
             </form>
        </div>
    </div>
    `;
}

function init() {
    makeProfile();
}