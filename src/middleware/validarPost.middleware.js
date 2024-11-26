const Ajv = require('ajv') 
const ajv = new Ajv()
const postSchema = require ('../schema/post.schema')


function validarPost(req, res, next){
    const post = req.body
    if(post.userId){
        post.userId = Number(post.userId)
    }
    // Compila o esquema de validação
    const validate = ajv.compile(postSchema);
    // Valida os dados do usuário contra o esquema
    const valid = validate(post);
    if(valid){
        next()
    }else{
        res.status(400).json({ msg: 'Dados inválidos', erros: validate.errors});
    }
}
module.exports = validarPost