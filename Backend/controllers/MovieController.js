const Movie = require('../models/Movie')
const { default: mongoose } = require('mongoose')
const { ObjectId } = require('mongodb')

const getToken = require("../helpers/get-token")
const getUserByToken = require("../helpers/get-user-by-token")

module.exports = class MovieController {

    // Create a movie
static async create(req, res) {
    try {
        const { name, sinopse, dataLancamento } = req.body;

        // Get Movie owner
        const token = getToken(req);
        const user = await getUserByToken(token);

        const movie = new Movie({
            name,
            sinopse,
            dataLancamento,
            user: {
                _id: user.id,
                name: user.name,
                phone: user.phone,
            },
        });

        const newMovie = await movie.save();

        res.status(201).json({
            message: 'Filme cadastrado com sucesso!',
            newMovie
        });
    } catch (error) {
        console.error(error); // Log do erro para debug
        res.status(500).json({ message: 'Ocorreu um erro ao cadastrar o filme.' });
    }
}

    

    static async getAll(req, res) {
        const { limite, pagina } = req.query;

        const limiteInt = parseInt(limite, 10);
        const paginaInt = parseInt(pagina, 10);

        if (!Number.isInteger(limiteInt) || !Number.isInteger(paginaInt) || limiteInt <= 0 || paginaInt < 1) {
            return res.status(400).json({ error: 'Parâmetros inválidos.' });
        }

        const indiceInicio = (paginaInt - 1) * limiteInt;

        //manda os filmes mais novos
        const movies = await Movie.find().sort('-createdAt').skip(indiceInicio).limit(limiteInt);

        res.status(200).json({
            movies: movies
        })
    }
    static async getMovieById(req, res) {
        const { limite, pagina } = req.query;

        const limiteInt = parseInt(limite, 10);
        const paginaInt = parseInt(pagina, 10);

        if (!Number.isInteger(limiteInt) || !Number.isInteger(paginaInt) || limiteInt <= 0 || paginaInt < 1) {
            return res.status(400).json({ error: 'Parâmetros inválidos.' });
        }

        const indiceInicio = (paginaInt - 1) * limiteInt;

        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).json({ message: "Id Invalido" })
            return
        }
        //verifica se o filme existe
        const movie = await Movie.findById(id).skip(indiceInicio).limit(limiteInt);

        if (!movie) {
            res.status(404).json({ message: 'Filme não encontrado' })
        }

        res.status(200).json({ movie })

    }
    static async removeMovieById(req, res) {
        const id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            res.status(422).json({ message: "Id Invalido" })
            return
        }

        //verifica se o filme existe
        const movie = await Movie.findOne({ _id: id })

        if (!movie) {
            res.status(404).json({ message: 'filme não encontrado ' })
        }
        await Movie.findByIdAndDelete(id)
        res.status(200).json({ message: 'filme removido' })

    }
    static async updateMovie(req, res) {
        const id = req.params.id
        const { name, sinopse, dataLancamento } = req.body

        const updateData = {}

        //verifica se o filme existe
        const movie = await Movie.findOne({ _id: id })

        if (!movie) {
            res.status(404).json({ message: 'Filme não encontrado ' })
            return
        }
        //validations
        if (!name) {
            res.status(422).json({ message: "O nome é obrigatório!" })
        } else {
            updateData.name = sanitizeHtml(name);
        }
        if (!sinopse) {
            res.status(422).json({ message: "A sinopse é obrigatória!" })
        } else {
            updateData.sinopse = sanitizeHtml(sinopse);
        }
        if (!dataLancamento) {
            res.status(422).json({ message: "A data de lançamento é obrigatória!" })
        } else {
            updateData.dataLancamento = sanitizeHtml(dataLancamento);
        }

        // Atualiza os dados do filme no banco de dados
        const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true })

        res.status(200).json({ message: 'Filme atualizado', updatedMovie })
    // } catch(error) {
    //     res.status(500).json({ message: 'Ocorreu um erro ao atualizar o filme' })

    }
    
    static async search(req, res) {
        // try {
            const { title } = req.query;

            // Realiza a busca dos filmes pelo título
            const movies = await Movie.find({
                name: { $regex: new RegExp(title, 'i') }
            });

            res.status(200).json({ movies });
        // } catch (error) {
        //     res.status(500).json({ message: 'Erro ao pesquisar filmes', error });
        // }
    }
}