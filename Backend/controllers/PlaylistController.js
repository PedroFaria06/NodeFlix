const Playlist = require('../models/Playlist');
const Movie = require('../models/Movie');
const User = require('../models/User');

module.exports = class PlaylistController {

    // create playlist
    static async createPlaylist(req, res) {
        const { name, description, createdBy } = req.body;

        // Verificar se o usuário que está criando a playlist existe
        const user = await User.findById(createdBy);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const playlist = new Playlist({
            name,
            description,
            createdBy,
        });

        await playlist.save();

        res.status(201).json({ message: 'Lista de reprodução criada com sucesso.', playlist });
    }

    // Adiciona Filme a playlist
    static async addMovieToPlaylist(req, res) {
        const { playlistId, movieId } = req.params;

        // Verificar se a playlist e o filme existem
        const playlist = await Playlist.findById(playlistId);
        const movie = await Movie.findById(movieId);

        if (!playlist || !movie) {
            return res.status(404).json({ message: 'Playlist ou filme não encontrado.' });
        }

        // Adicionar o filme à lista de reprodução
        playlist.movies.push(movieId);
        await playlist.save();

        res.status(200).json({ message: 'Filme adicionado à lista de reprodução com sucesso.', playlist });
    }

    static async getAllPlaylists(req, res) {
        const playlists = await Playlist.find();
        res.status(200).json(playlists);
    }

    static async deletePlaylist(req, res) {
        const { playlistId } = req.params;

        // Encontrar e excluir a playlist pelo ID
        const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

        if (!deletedPlaylist) {
            return res.status(404).json({ message: 'Playlist não encontrada' });
        }

        res.status(200).json({ message: 'Playlist deletada com sucesso' });
    }

    static async removeMovieFromPlaylist(req, res) {
        const { playlistId, movieId } = req.params;

        // Encontrar a playlist pelo ID
        const playlist = await Playlist.findById(playlistId);

        if (!playlist) {
            return res.status(404).json({ message: 'Playlist não encontrada' });
        }

        // Remover o filme da playlist
        playlist.movies.pull(movieId);
        await playlist.save();

        res.status(200).json({ message: 'Movie deletado da playlist com sucesso' });
    }
}
