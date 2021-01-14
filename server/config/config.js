//Password: pCQGwjV6sfrPYVHX
//Username: Chanjay
//mongodb+srv://Chanjay:<password>@cluster0.2jwpp.mongodb.net/<dbname>?retryWrites=true&w=majority
//dbname :react-book-shelf 
const config = {
    production:{
        type:'production',
        SECRET:process.env.SECRET,//'PROD_TESTSECRETPASSWORD$',
        DATABASE:`mongodb+srv://Chanjay:pCQGwjV6sfrPYVHX@cluster0.2jwpp.mongodb.net/book-shelf-production?retryWrites=true&w=majority`
    },
    development:{
        type:'development',
        SECRET:'DEV_TESTSECRETPASSWORD$',
        DATABASE:`mongodb+srv://Chanjay:pCQGwjV6sfrPYVHX@cluster0.2jwpp.mongodb.net/book-shelf-development?retryWrites=true&w=majority`
    }
};

exports.get = function get(env){
    return config[env] || config.development;
}