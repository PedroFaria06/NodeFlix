/**
 * @swagger
 * tags:
 *   - name: Movie
 *     description: Operações relacionadas a filmes
 *   - name: User
 *     description: Operações relacionadas a usuários
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
 *               type: date
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
 *                      type: date
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
 *                      type: date
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
 *                      type: date
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
 *                      type: date
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

