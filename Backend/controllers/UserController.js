const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getUserByToken = require('../helpers/get-user-by-token')
const getToken = require('../helpers/get-token')
const { default: mongoose } = require('mongoose')

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, phone, password, confirmpassword } = req.body
        //validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatorio' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatorio' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatorio' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatoria' })
            return
        }
        //check se o usuario existe
        const userExists = await User.findOne({ email: email })
        if (userExists) {
            res.status(422).json({
                message: 'Por favor, utilize outro email!',
            })
            return
        }
        //create a password 
        const salt = await bcrypt.genSalt(6)
        const passwordHash = await bcrypt.hash(password, salt)
        //create a user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash,
        })
        try {
            const newUser = await user.save()
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body
        if (!email) {
            res.status(422).json({ message: 'O email é obrigatorio' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'A senha é obrigatoria' })
            return
        }
        const user = await User.findOne({ email: email })
        if (!user) {
            res.status(422).json({
                message: 'Não há usuario cadastrado com este email'
            })
            return
        }
        // //valida se a senha é igual a senha armazenada no db 
        // const checkPassword = await bcrypt.compare(password, user.password)
        // if (!checkPassword) {
        //     res.status(422).json({
        //         message: 'Senha invalida'
        //     })
        //     return
        // }
        await createUserToken(user, req, res)
    }

    //verifica e valida om usuario por jwt
    static async checkUser(req, res) {
        let currentUser
        if (req.headers.authorization) {
            const token = getToken(req)
            const decoded = jwt.verify(token, 'secret')
            currentUser = await User.findById(decoded.id)
            currentUser.password = undefined
        } else {
            currentUser = null
        }
        res.status(200).send(currentUser)
    }

    static async getUserById(req, res) {
        const { limite, pagina } = req.query;

        const limiteInt = parseInt(limite, 10);
        const paginaInt = parseInt(pagina, 10);

        if (!Number.isInteger(limiteInt) || !Number.isInteger(paginaInt) || limiteInt <= 0 || paginaInt < 1) {
            return res.status(400).json({ error: 'Parâmetros inválidos.' });
        }

        const indiceInicio = (paginaInt - 1) * limiteInt;

        const id = req.params.id
        const user = await User.findById(id).select("-password").skip(indiceInicio).limit(limiteInt);
        if (!user) {
            res.status(422).json({
                message: 'Usuário não encontrado!'
            })
            return
        }
        res.status(200).json({ user })
    }

    static async editUser(req, res) {
        const id = req.params.id

        //verifica se o id é valido
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'ID invalido!' })
        }

        // //verifica se o usuario existe
        // const token = getToken(req)
        // const user = await getUserByToken(token)
        // if (!user) {
        //     res.status(422).json({
        //         message: 'Usuario não encontrado!',
        //     })
        // }

        
        // Obtém o usuário autenticado pelo token
        const token = getToken(req);
        const decoded = jwt.verify(token, 'secret');
        const authenticatedUserId = decoded.id;

        // Verifica se o usuário autenticado é o mesmo que está sendo editado
        if (userIdToEdit !== authenticatedUserId) {
            return res.status(403).json({ message: 'Você não tem permissão para editar este usuário.' });
        }


        const { name, email, phone, password } = req.body

        let image = ''

        //validations
        if (!name) {
            res.status(422).json({ message: 'O nome é obrigatorio' })
            return
        }
        user.name = name

        if (!email) {
            res.status(422).json({ message: 'O email é obrigatorio' })
            return
        }
        //valida se o usuario nao esta usando email cadastrado no sistema
        const userExists = await User.findOne({ email: email })
        if (user.email !== email && userExists) {
            res.status(422).json({
                message: 'Por favor, utilize outro email!'
            })
            return
        }
        user.email = email

        if (!phone) {
            res.status(422).json({ message: 'O telefone é obrigatorio' })
            return
        }
        user.phone = phone

        if (password != null) {

            //criando uma nova senha
            const salt = await bcrypt.genSalt(6)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash
        }
        try {
            //return user updated data
            await User.findOneAndUpdate(
                { _id: user.id },
                { $set: user },
                { new: true },
            )
            res.status(200).json({
                message: 'Usuario atualizado com sucesso!',
            })
        } catch {
            res.status(500).json({ message: err })
            return
        }
    }
}