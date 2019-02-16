const config = {
    production:{
        SECRET: process.env.SECRET,
        DATABASE: 'mongodb+srv://anton:Enot282828@booksreview-myfpl.mongodb.net/test?retryWrites=true'
    },
    default:{
        SECRET: 'SUPERSECRETPASSWORD123',
        DATABASE: 'mongodb://localhost:27017/booksShelf'
    }
}

exports.get = function get(env){
    return config[env] || config.default
} 
