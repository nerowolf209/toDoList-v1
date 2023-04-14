exports.getDate = function (){

    const today = new Date();

    const localLang = 'en-US'
    const options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric'
    }
    
    return today.toLocaleDateString(localLang,options);
}

exports.getDay = function (){

    const today = new Date();
    const localLang = 'en-US'
    const options = {
        weekday: 'long'
    }

    return today.toLocaleDateString(localLang,options);
}

