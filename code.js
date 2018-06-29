
const options = {
    save(ev) {
        browser.storage.local.set({ ...options.data });
        console.log('saved options');
        ev.preventDefault();
    },
    get() {
        let result = options.promise;

        if (null == options.promise) {
            result = browser.storage.local.get();
            result = result.then(x => {
                options.data = x;
                return x;
            });
            options.promise = result;
        }
        return result;
    }
};

options.get().then(x => {
    if (x.url) {
        console.log(`got url ${x.url}`);
        document.getElementById('url').value = x.url;
        showContents();
    }
});

document.getElementById('url').addEventListener('change', updateUrl);
document.getElementById('url').addEventListener('keyup', updateUrl);
document.getElementById('options').addEventListener('submit', options.save);
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

function updateUrl(ev) {
  let target = ev.currentTarget;
  options.data.url = target.value;
}
