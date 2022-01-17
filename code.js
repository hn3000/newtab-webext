
options.get().then(x => {
    if (x.url) {
        console.log(`got url ${x.url}`);
        showContents();
    }
});

document.getElementById('switch-settings').addEventListener('click', showSettings);
document.getElementById('switch-contents').addEventListener('click', showContents);

console.log('loaded extension code '+(new Date()));

function showSettings() {
    document.getElementById('contents').classList.replace('frame-flag', 'settings-flag');
}
function showContents() {
    const x = options.data;
    document.getElementById('contents').classList.replace('settings-flag', 'frame-flag');
    document.getElementById('frame').setAttribute('src', x.url);
}

