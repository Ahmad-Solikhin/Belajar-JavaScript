const token = ~~[Math.random() * 12314];

const pictures = ["1.jpg", "2.png"];

function login(username, callback) {
    console.log("Data validation......")
    setTimeout(() => {
        callback({token, username});
    }, 200);
}

function getUser(token, callback) {
    console.log("Token validation......")
    setTimeout(() => {
        if (token) callback({apiKey: "xkey123"});
    }, 100);
}

function getPictures(apiKey, callback) {
    console.log("Pictures processing......")
    setTimeout(() => {
        if (apiKey) callback({pictures});
    }, 1500)
}

login("gayuh", token => {
    console.log(token);

    getUser(token.token, apiKey => {
        console.log(apiKey);

        getPictures(apiKey.apiKey, pic => {
            console.log(pic);
        })
    });
});