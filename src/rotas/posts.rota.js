const express = require ('express');
const router = express.Router()
// const { v4: uuidv4 } = require('uuid')
const postMid = require('../middleware/validarPost.middleware')

var multer = require('multer');
const path = require('path')

const ErroHandler = require('../utils/ErrorHandler')
const autenticar = require('../middleware/autenticacao.mid')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    const extensoes = /jpeg|jpg/i
    if(extensoes.test(path.extname(file.originalname))){
        cb(null, true)
    }else{
        return cb ('Arquivo não suportado. Apenas JPG e JPEG')
    }
}

var upload = multer({ storage: storage, fileFilter: fileFilter })

const { Post, Usuario } = require('../db/models');


module.exports = router

router.post('/', autenticar, upload.single('foto'))
router.post('/', autenticar, postMid)
router.put('/', autenticar, postMid)

router.get('/', async (req, res)=> {
    const posts = await Post.findAll()
    res.json({posts: posts})
})

router.get('/:id', async (req, res) => {
    const post = await Post.findByPk(req.params.id,
         {include:[{model: Usuario}], raw: true, nest: true})

         const postProcessado = prepararResultado(post)

    res.json({posts: postProcessado})
})

router.post('/:id/upload', upload.single('foto'), async (req, res) => {
    console.log(req.file)

    const id = req.params.id
    const post = await Post.findByPk(id)
    
    if(post){
        post.foto = `static/uploads/${req.file.filename}`
        await post.save()
        res.json({msg: 'Upload Realizado com sucesso!'})
    }else{
        res.status(400).json({msg: "Post não encontrado"})
    }
})

router.post('/', async (req, res, next) => {
    const data = req.body
    if(req.file){
        data.foto = `/static/uploads/${req.file.filename}`
    }
    try{
        const post = await Post.create(data)
        res.json({msg: "Post adicionado com sucesso!"})
    }catch(err){
        next(new ErroHandler(500, 'Falha interna ao adicionar postagem')) //tratamento de erro
    }
})

router.delete('/', async (req, res) => {
    const id = req.query.id
    const post = await Post.findByPk(id)
    if(post){
        await post.destroy()
        res.json({msg: 'Post deletado com sucesso!'})
    }else{
        res.status(400).json({msg: 'Id não encontrado'})
    }
})

router.put('/', async (req, res) => {
    
    const id = req.query.id
    const post = await Post.findByPk(id)
    
    if(post){
        post.titulo = req.body.titulo
        post.text = req.body.texto
        await post.save()
        res.json({msg: 'Post atualizado com sucesso!'})
    }else{
        res.status(400).json({msg: "Post não encontrado"})
    }
})

function prepararResultado(post){
    const result = Object.assign({}, post)

    if(result.createdAt) delete result.createdAt //remove o resultado do createdAt
    if(result.updatedAt) delete result.updatedAt //remove o resultado do updatedAt
    if(result.userId) delete result.userId //remove o resultado do user id
        if (result.Usuario.senha) delete result.Usuario.senha //If para remover a exibição da senha 
        if (result.Usuario.createdAt) delete result.Usuario.createdAt //remove o resultado do createdAt do Usuario
        if (result.Usuario.updatedAt) delete result.Usuario.updatedAt //remove o resultado do updatedAt do Usuario
    return result
}