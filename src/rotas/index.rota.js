const express = require ('express');
const router = express.Router()
const { Post, Usuario } = require('../db/models')
const moment = require ('moment')
moment.locale('pt-br')

router.get('/', async (req, res) => {
    const posts = await Post.findAll({
        limit: 10, //limitando a quantidade de posts a ser exibido 
        oder: [['createdAt', 'DESC']], //ordenando os posts pelo tempo de criação em ordem decrescente
        include: [
            { model: Usuario}
        ], raw : true, nest: true 
    })

    const postResult = posts.map((post) => prepararResultado(post))
    res.render('pages/posts', {posts: postResult, layout: 'layouts/layout-blog.ejs'})  
})

router.get('/post/:id', async (req, res) =>{
    const post = await Post.findByPk(req.params.id,
        {include:[{model: Usuario}], raw: true, nest: true})
        res.render('pages/post', {post: prepararResultado(post), layout: 'layouts/layout-blog.ejs'})
})

function prepararResultado(post){
    const result = Object.assign({}, post)
    result.postadoEm = moment(new Date(result.createdAt)).format('DD [de] MMMM [de] YYYY [as] HH:mm')

    if(result.createdAt) delete result.createdAt //remove o resultado do createdAt
    if(result.updatedAt) delete result.updatedAt //remove o resultado do updatedAt
    if(result.userId) delete result.userId //remove o resultado do user id
        if (result.Usuario.senha) delete result.Usuario.senha //If para remover a exibição da senha 
        if (result.Usuario.createdAt) delete result.Usuario.createdAt //remove o resultado do createdAt do Usuario
        if (result.Usuario.updatedAt) delete result.Usuario.updatedAt //remove o resultado do updatedAt do Usuario
    return result
}

module.exports = router