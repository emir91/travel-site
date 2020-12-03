exports.handler = function(event, context, callback){
    const secretContent = `
        <h3>Welcome To Secret Area</h3>
        <p>Here you see <strong>content </strong> that other user can't</p>
    `
    
    let body;

    if(event.body){
        body = JSON.parse(event.body);
    }else{
        body = {};
    }

    if(body.password == "javascript"){
        callback(null, {
            statusCode: 200,
            body: secretContent
        })
    }else{
        callback(null, {
            statusCode: 401
        })
    }

    
}