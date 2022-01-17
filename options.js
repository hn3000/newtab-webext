
const options = {
    save(ev) {
        if (typeof browser === 'object' && browser.storage) {
            browser.storage.local.set({ ...options.data });
            console.log('saved options in browser.storage');
        } else if (localStorage) {
            localStorage.setItem('options', JSON.stringify({ ...options.data }));
            console.log('saved options in localStorage');
        } else {
            console.warn('could not save options');
        }
        ev.preventDefault();
    },
    get() {
        let result = options.promise;

        if (null == options.promise) {
            if (typeof browser === 'object' && browser.storage) {
                result = browser.storage.local.get();
                console.log('get options from browser.storage');
            } else if (localStorage && localStorage.getItem('options')) {
                result = Promise.resolve(localStorage.getItem('options'));
                result = result.then(x => JSON.parse(x));
                console.log('got options from localStorage');
            } else {
                result = Promise.resolve({});
                console.warn('could not find options');
            }

            if (null != result) {
                result = result.then(x => {
                    options.data = x;
                    return x;
                }, e => {
                    console.log('error reading options, falling back to default');
                    options.data = { url: 'about:blank' };
                });
            }
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
