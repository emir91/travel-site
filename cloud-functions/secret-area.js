exports.handler = function(event, context, callback){
    callback(null, {
        secretCode: 200,
        body: 'Welcome to super secret area.'
    })
}