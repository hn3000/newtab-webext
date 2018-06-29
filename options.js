
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
        document.getElementById('newtab-url').value = x.url;
    }
});

document.getElementById('newtab-url').addEventListener('change', updateUrl);
document.getElementById('newtab-url').addEventListener('keyup', updateUrl);
document.getElementById('newtab-options').addEventListener('submit', options.save);
document.getElementById('newtab-save').addEventListener('click', options.save);

console.log('loaded new tab extension code '+(new Date()));

function updateUrl(ev) {
  let target = ev.currentTarget;
  options.data.url = target.value;
}
