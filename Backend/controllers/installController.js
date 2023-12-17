const mongoose = require('mongoose');
const User = require('../models/User'); 
const Movie = require('../models/Movie');
const Playlist = require('../models/Playlist');

const installDatabase = async (req, res) => {
  try {

    await User.insertMany([
      { name: 'User 1', email: 'user1', phone: '123', password: '123' },
      { name: 'User 2', email: 'user2', phone: '123', password: '123' },
      { name: 'User 3', email: 'user3', phone: '123', password: '123' },
      { name: 'Admin 1', email: 'admin1', phone: '123', password: 'admin', role: 'admin'},
      { name: 'Admin 2', email: 'admin2', phone: '123', password: 'admin', role: 'admin' }, 
    ]);

    await Movie.insertMany([
      { name: 'Velozes e Furiosos', sinopse: 'Corrida',  dataLancamento: new Date('2001-06-22')},
      { name: 'Duro de Matar', sinopse: 'Tiroteio', dataLancamento: new Date('2005-06-22')},
      { name: 'Interstellar', sinopse: 'Viagem estelar', dataLancamento: new Date('2003-06-22')},
      { name: 'Fuga das Galinhas', sinopse: 'Galinhas fugindo', dataLancamento: new Date('2012-06-22')},
      { name: 'Homem-Aranha', sinopse: 'super heroi', dataLancamento: new Date('2010-06-22')},
    ]);

    await Playlist.insertMany([
      { name: 'Natal', description: 'filmes para assistir no natal', movies: [Movie[0]._id], createdBy: User[0]._id},
      { name: 'Ação', description: 'filmes emocionantes', movies: [Movie[1]._id, Movie[4]._id], createdBy: User[1]._id},
      { name: 'Sci-Fi', description: 'filmes de ficção científica', movies: [Movie[2]._id], createdBy: User[2]._id},
      { name: 'Animação', description: 'filmes para todas as idades', movies: [Movie[3]._id], createdBy: User[3]._id},
      { name: 'Suspense', description: 'filmes para os corajosos', movies: [Movie[1]._id, Movie[2]._id], createdBy: User[4]._id},
    ]);

    res.json({ success: true, message: 'Database Installation Completed Successfully' });
  } catch (error) {
    console.error('Error during database installation:', error);
    res.status(500).json({ success: false, error: 'Error during database installation' });
  }
};

module.exports = {
  installDatabase,
};