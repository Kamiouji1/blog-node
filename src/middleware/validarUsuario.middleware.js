const Ajv = require('ajv') 
const ajv = new Ajv()
const addFormats = require('ajv-formats') 
const usuarioSchema = require ('../schema/usuario.schema')
addFormats(ajv)


function validarUsuario(req, res, next){
    const usuario = req.body;
    // Compila o esquema de validação
    const validate = ajv.compile(usuarioSchema);
    // Valida os dados do usuário contra o esquema
    const valid = validate(usuario);
    if(valid){
        next()
    }else{
        res.status(400).json({ msg: 'Dados inválidos', erros: validate.errors});
    }
}
module.exports = validarUsuario