const express = require ('express'); // Importa o framework Express.js
const router = express.Router() // Cria um objeto de roteamento
const { v4: uuidv4 } = require('uuid'); // Importa a função uuidv4 para gerar IDs únicos
const usuarioMid = require ('../middleware/validarUsuario.middleware')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { Usuario} = require ('../db/models')

router.post('/', usuarioMid)
router.put('/', usuarioMid)

// GET - Listar todos os usuários
router.get('/', async (req, res)=> {
    const usuarios = await Usuario.findAll()

    const resultado = usuarios.map(user => prepararResultado(user.dataValues))
    res.json({usuarios: resultado})
})

// GET - Obter um usuário pelo ID
router.get('/:id', async (req, res) => {
    const usuario = await Usuario.findByPk(req.params.id)
    if (usuario){
        res.json({usuario: prepararResultado(usuario.dataValues) }) 
    }else{
        res.status(400).json({ msg: 'Usuário não encontrado' })
    }
})

router.post('/', async (req, res) => {
    const senha = req.body.senha

    const salt = await bcrypt.genSalt(10)
    const senhaCriptografada = await bcrypt.hash(senha, salt)
    const usuario = {email: req.body.email, senha: senhaCriptografada}

    const usuarioObj = await Usuario.create(usuario)

    res.json({msg: "Usuario criado com sucesso!", userId: usuarioObj.id})
});

// DELETE - Deletar um usuário pelo ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id
    const usuario = await Usuario.findByPk(id)
    if(usuario){ // Corrigido: usar 'usuario' ao invés de 'post'
        await usuario.destroy()
        res.json({msg: 'Usuario deletado com sucesso!'})
    }else{
        res.status(400).json({msg: 'Id não encontrado'})
    }
})

// PUT - Atualizar um usuário pelo ID
router.put('/:id', usuarioMid, async (req, res) => {

    const id = req.params.id
    const usuario = await Usuario.findByPk(id)

    if(usuario){ // Corrigido: usar 'usuario' ao invés de 'usuarios'
        usuario.email = req.body.email
        usuario.senha = req.body.senha
        await usuario.save()
        res.json({msg: "Usuario atualizado com sucesso!"})
    }else{
        res.status(400).json({msg: 'Id não encontrado'})
    }
})

function prepararResultado(usuario){
    const result = Object.assign({}, usuario)

    if(result.createdAt) delete result.createdAt //remove o resultado do createdAt
    if(result.updatedAt) delete result.updatedAt //remove o resultado do updatedAt
    
    return result
}
//Autentica o Usúario
router.post('/login', async (req, res) =>{

    const email = req.body.email //email que o usuario vai digitar
    const senha = req.body.senha   //senha que o usuario vai digitar

    const usuario = await Usuario.findOne({ 
        where: {
            email: email
        }
    })

    if (usuario && await bcrypt.compare(senha,usuario.senha)){
       
        const payload = {sub: usuario.id, email: usuario.email} // payload é o que vai ser enviado para o token

        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '40m'})
        res.json({ accessToken: token })
    }else{
        res.status(403).json({ msg: "usuário ou senha inválidos" })
    }
})

function prepararResultado(usuario){
    const result = Object.assign({}, usuario)

    if(result.createdAt) delete result.createdAt //remove o resultado do createdAt
    if(result.updatedAt) delete result.updatedAt //remove o resultado do updatedAt
    if(result.senha) delete result.senha 
    
    return result
}

module.exports = router