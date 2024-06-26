import SecureLS from 'secure-ls';
export default class {

    static set = (key, value) => localStorage.setItem(key, JSON.stringify(value));
    static get = key => {
        const t = localStorage.getItem(key);
        if(t === undefined || t === null)
            return '';

        if(t === 'true' || t === 'false' || typeof t === 'boolean')
            return t;

        if(t.length > 0)
            return JSON.parse(t);

        return '';
    }
    static clear = () => localStorage.clear();
    // static set = (key, value) => {
    //     var ls = new SecureLS({isCompression: true});
    //     ls.set(key, value);
    // }
    // static get = key => {
    //     var ls = new SecureLS();
    //     let data = ls.get(key);
    //     return data;
    // }
    // static clear = () => {
    //     var ls = new SecureLS();
    //     ls.removeAll();
    // };
}