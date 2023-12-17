/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Operações relacionadas a usuários
 *   - name: Movie
 *     description: Operações relacionadas a filmes
 *   - name: Playlist
 *     description: Operações relacionadas a playlists
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Registrar um novo usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário registrado com sucesso
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Autenticar um usuário
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *       401:
 *         description: Credenciais inválidas
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/checkuser:
 *   get:
 *     summary: Verificar informações do usuário autenticado
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Informações do usuário recuperadas com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obter detalhes de um usuário específico
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do usuário obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/edit/{id}:
 *   patch:
 *     summary: Atualizar informações de um usuário existente
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário a ser atualizado
 *         required: true
 *         schema:
 *           type: string
 *       - name: UserData
 *         in: body
 *         description: Dados atualizados do usuário
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Excluir um usuário existente
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do usuário a ser excluído
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário excluído com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movies/create:
 *   post:
 *     summary: Registrar um novo filme
 *     tags: [Movie]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: MovieData
 *         in: body
 *         description: Data of the movie to be registered
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             sinopse:
 *               type: string
 *             dataLancamento:
 *               type: string
 *               format: date
 *             User:
 *               type: ObjectId
 *     responses:
 *       201:
 *         description: Filme registrado com sucesso
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */


/**
 * @swagger
 * /movies/:
 *   get:
 *     summary: Obter uma lista de filmes
 *     tags: [Movie]
 *     parameters:
 *       - name: limite
 *         in: query
 *         description: Número de itens por página
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *       - name: pagina
 *         in: query
 *         description: Número da página para resultados paginados
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 10
 *     responses:
 *       200:
 *         description: Lista de filmes recuperada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                     name:
 *                      type: string
 *                     sinopse:
 *                      type: string
 *                     dataLancamento:
 *                      type: string
 *                      format: date
 *                     User:
 *                      type: ObjectId
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Obter detalhes de um filme específico
 *     tags: [Movie]
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do filme
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalhes do filme obtidos com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                     name:
 *                      type: string
 *                     sinopse:
 *                      type: string
 *                     dataLancamento:
 *                      type: string
 *                      format: date
 *                     User:
 *                      type: ObjectId
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movies/search:
 *   get:
 *     summary: Pesquisar filmes com base nos critérios fornecidos
 *     tags: [Movie]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Palavra-chave para pesquisa
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de filmes correspondentes à pesquisa
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                     name:
 *                      type: string
 *                     sinopse:
 *                      type: string
 *                     dataLancamento:
 *                      type: string
 *                      format: date
 *                     User:
 *                      type: ObjectId
 */


/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Atualizar as informações de um filme existente
 *     tags: [Movie]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do filme a ser atualizado
 *         required: true
 *         schema:
 *           type: string
 *       - name: MovieData
 *         in: body
 *         description: Dados atualizados do filme
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                     name:
 *                      type: string
 *                     sinopse:
 *                      type: string
 *                     dataLancamento:
 *                      type: string
 *                      format: date
 *                     User:
 *                      type: ObjectId
 *     responses:
 *       200:
 *         description: Filme atualizado com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Excluir um filme existente
 *     tags: [Movie]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID do filme a ser excluído
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme excluído com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Filme não encontrado
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /playlists/create:
 *   post:
 *     summary: Create a new playlist
 *     tags: [Playlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: PlaylistData
 *         in: body
 *         description: Data of the playlist to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             description:
 *               type: string
 *             createdBy:
 *               type: ObjectId
 *     responses:
 *       201:
 *         description: Playlist created successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /playlists/{playlistId}/add/{movieId}:
 *   post:
 *     summary: Add a movie to a playlist
 *     tags: [Playlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         description: ID of the playlist
 *         required: true
 *         schema:
 *           type: string
 *       - name: movieId
 *         in: path
 *         description: ID of the movie to be added
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie added to the playlist successfully
 *       401:
 *         description: Not authorized
 *       404:
 *         description: Playlist or movie not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /playlists:
 *   get:
 *     summary: Get all playlists
 *     tags: [Playlist]
 *     responses:
 *       200:
 *         description: List of playlists retrieved successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /playlists/{playlistId}:
 *   delete:
 *     summary: Excluir uma playlist
 *     tags: [Playlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         description: ID da playlist a ser excluída
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Playlist excluída com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro interno do servidor
 */

/**
 * @swagger
 * /playlists/{playlistId}/remove/{movieId}:
 *   delete:
 *     summary: Remover um filme de uma playlist
 *     tags: [Playlist]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: playlistId
 *         in: path
 *         description: ID da playlist
 *         required: true
 *         schema:
 *           type: string
 *       - name: movieId
 *         in: path
 *         description: ID do filme a ser removido
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Filme removido da playlist com sucesso
 *       401:
 *         description: Não autorizado
 *       404:
 *         description: Playlist não encontrada
 *       500:
 *         description: Erro interno do servidor
 */



