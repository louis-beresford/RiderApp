

const createSession = () => {
    var details = {
        'userName': 'hello@zedify.com',
        'password': '43942d246b948bee52c1edfcd35ebc0a',
        'grant_type': 'password'
    };
    
    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    
    
    return fetch('https://traccar.powunity.com/api/session', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
    }).then((response) => response.json())
    .then((json) => {
      return json.movies;
    })
    .catch((error) => {
      console.error(error);
    });
}