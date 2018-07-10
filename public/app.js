
function googleLogin() {
    const  provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            const user = result.user;
            document.querySelector('#title').innerHTML = `Hello ${user.displayName}`;
            console.log(user);
        });
}

document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    const db = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    db.settings(settings);
    const myPost = db.collection('posts').doc('firstpost');
    // myPost.get()
    //     .then(doc => {
    //         const data = doc.data();
    //         document.write(`hi ${data.title}`);
    //     });

    myPost.onSnapshot(doc => {
        const data = doc.data();
        document.querySelector('#title').innerHTML = `${data.title}<br>`;
    });

    console.log(app);
});

function updatePost(e) {
    const db = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    db.settings(settings);
    const myPost = db.collection('posts').doc('firstpost');
    console.log(e.target.value);

    myPost.set({title: e.target.value },{merge:true});
    //myPost.update({title: e.target.value })
}

function uploadFile(files) {
    //https://time2hack.com/2017/10/upload-files-to-firebase-storage-with-javascript/
    const storageRef = firebase.storage().ref();
    const horseRef = storageRef.child('hello.png');

    const file = files.item(0);
    const task = horseRef.put(file);
    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            document.querySelector('#imgUpload').src = url;
        });

    // task.then(snapshot => {
    //    console.log(snapshot);
    //    const url = snapshot.downloadURL;
    //    console.log(url);
    //    document.querySelector('#imgUpload').setAttribute('src', url);
    // });

    // task.then(snapshot => {
    //     console.log(snapshot);
    //     const url = snapshot.downloadURL;
    //     console.log(url);
    //     document.querySelector('#imgUpload').setAttribute('src', url);
    // });
}

