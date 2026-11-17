# Blog Mobile

Aplicativo de blog educacional desenvolvido com **React Native e TypeScript**, integrado à API `blog-api`. 

## Funcionalidades

- Visualização de posts publicados e acesso aos detalhes de cada post.
- Busca local por título, conteúdo ou nome do autor, sem diferenciar maiúsculas e minúsculas.
- Atualização da listagem ao retornar à tela e gesto de atualizar (*pull-to-refresh*).
- Login, cadastro, cadastro de professores e logout.
- Gerenciamento de posts próprios por professores.
- Gerenciamento de professores por administradores e de estudantes por professores.
- Casos de uso para listagem, criação, atualização e exclusão de comentários.

## Tecnologias e bibliotecas identificadas

- React Native e TypeScript.
- React Navigation (`@react-navigation/native`, `@react-navigation/native-stack`).
- `react-native-config` para configuração da URL da API.
- `react-native-keychain` para armazenamento seguro do token.
- API `fetch` para comunicação HTTP.

A versão mínima declarada do Node.js é **22.11.0**.

## Arquitetura

O projeto separa a comunicação HTTP e o armazenamento de credenciais das funcionalidades de negócio. A composição de dependências ocorre em `src/di/container.ts`:

```text
blog_mobile/
├── App.tsx
├── package.json
├── app/
│   ├── home-screen.tsx
│   └── home.styles.ts
└── src/
    ├── core/
    │   ├── errors/
    │   │   └── api-error.ts
    │   ├── http/
    │   │   ├── api-error.ts
    │   │   ├── fetch-http-client.ts
    │   │   └── http-client.ts
    │   └── storage/
    │       ├── secure-token-storage.ts
    │       └── token-storage.ts
    ├── di/
    │   └── container.ts
    ├── features/
    │   ├── auth/
    │   │   ├── domain/
    │   │   │   ├── entities/user.ts
    │   │   │   └── repositories/auth-repository.ts
    │   │   ├── application/use-cases/
    │   │   │   ├── get-current-user.ts
    │   │   │   ├── login.ts
    │   │   │   ├── logout.ts
    │   │   │   ├── register.ts
    │   │   │   └── register-teacher.ts
    │   │   ├── data/
    │   │   │   ├── models/auth-response-dto.ts
    │   │   │   └── repositories/auth-repository-impl.ts
    │   │   └── ui/
    │   │       ├── contexts/auth-context.tsx
    │   │       ├── components/
    │   │       │   ├── password-field.tsx
    │   │       │   ├── password-field.styles.ts
    │   │       │   ├── role-guard.tsx
    │   │       │   └── role-guard.styles.ts
    │   │       └── screens/
    │   │           ├── login/
    │   │           │   ├── login.tsx
    │   │           │   └── login.styles.ts
    │   │           └── register/
    │   │               ├── register.tsx
    │   │               ├── register.styles.ts
    │   │               ├── register-teacher.tsx
    │   │               └── register-teacher.styles.ts
    │   ├── posts/
    │   │   ├── domain/
    │   │   │   ├── entities/post.ts
    │   │   │   └── repositories/post-repository.ts
    │   │   ├── application/use-cases/
    │   │   │   ├── create-post.ts
    │   │   │   ├── delete-post.ts
    │   │   │   ├── get-post-by-id.ts
    │   │   │   ├── list-my-posts.ts
    │   │   │   ├── list-posts.ts
    │   │   │   └── update-post.ts
    │   │   ├── data/
    │   │   │   ├── models/post-dto.ts
    │   │   │   └── repositories/post-repository-impl.ts
    │   │   └── presentation/
    │   │       ├── components/
    │   │       │   ├── post-card.tsx
    │   │       │   ├── post-card.styles.ts
    │   │       │   ├── post-search.tsx
    │   │       │   └── post-search.styles.ts
    │   │       └── screens/
    │   │           ├── my-posts/
    │   │           │   ├── my-posts-screen.tsx
    │   │           │   ├── my-posts.styles.ts
    │   │           │   └── create-post/
    │   │           │       ├── create-post-screen.tsx
    │   │           │       └── create-post.styles.ts
    │   │           └── post-details/
    │   │               ├── post-details-screen.tsx
    │   │               └── post-details.styles.ts
    │   ├── comments/
    │   │   ├── domain/
    │   │   │   ├── entities/comment.ts
    │   │   │   └── repositories/comment-repository.ts
    │   │   ├── application/use-cases/
    │   │   │   ├── create-comment.ts
    │   │   │   ├── delete-comment.ts
    │   │   │   ├── list-comments.ts
    │   │   │   └── update-comment.ts
    │   │   ├── data/
    │   │   │   ├── models/comment-dto.ts
    │   │   │   └── repositories/
    │   │   │       ├── comment-api-contract.ts
    │   │   │       └── comment-repository-impl.ts
    │   │   └── ui/components/
    │   │       ├── comment-card.tsx
    │   │       ├── comment-card.styles.ts
    │   │       ├── comment-form.tsx
    │   │       └── comment-form.styles.ts
    │   └── users/
    │       ├── domain/
    │       │   ├── entities/managed-user.ts
    │       │   └── repositories/user-management-repository.ts
    │       ├── application/use-cases/
    │       │   ├── delete-student.ts
    │       │   ├── delete-teacher.ts
    │       │   ├── list-students.ts
    │       │   ├── list-teachers.ts
    │       │   ├── update-student.ts
    │       │   └── update-teacher.ts
    │       ├── data/
    │       │   ├── models/managed-user-dto.ts
    │       │   └── repositories/managed-user-repository-impl.ts
    │       └── ui/
    │           ├── components/
    │           │   ├── user-management-list.tsx
    │           │   └── user-management-list.styles.ts
    │           └── screens/
    │               ├── students-screen.tsx
    │               ├── students-screen.styles.ts
    │               ├── teachers-screen.tsx
    │               └── teachers-screen.styles.ts
    └── shared/
        ├── navigation/root-stack-param-list.ts
        └── theme/colors.ts
```

A árvore detalha **todos os arquivos de código e configuração. Os diretórios foram organizados conforme os imports e a arquitetura apresentada. Arquivos não enviados (como configurações nativas, assets, lockfile e testes) não são presumidos.

### Injeção de dependências

O `container.ts` cria uma instância de `SecureTokenStorage` e de `FetchHttpClient`, compartilhada pelos repositórios de autenticação, posts, comentários e usuários. Os repositórios são injetados nos respectivos casos de uso.

| Módulo | Casos de uso identificados |
| --- | --- |
| Autenticação | `LoginUseCase`, `RegisterUseCase`, `RegisterTeacherUseCase`, `LogoutUseCase`, `GetCurrentUserUseCase` |
| Posts | `ListPosts`, `GetPostById`, `ListMyPosts`, `CreatePost`, `UpdatePost`, `DeletePost` |
| Comentários | `ListComments`, `CreateComment`, `UpdateComment`, `DeleteComment` |
| Usuários | `ListTeachers`, `UpdateTeacher`, `DeleteTeacher`, `ListStudents`, `UpdateStudent`, `DeleteStudent` |

O container também exporta `postDependencies`, `commentDependencies` e `userManagementDependencies` para facilitar o consumo dos casos de uso.

## Configuração da API

A URL-base é obtida de `Config.API_URL` por meio de `react-native-config`. O aplicativo lança um erro de inicialização se a variável não estiver configurada.

Exemplo de configuração, **ajuste o endereço ao seu ambiente**:

```dotenv
API_URL=http://SEU_HOST:3333/api/v1
```

O valor é normalizado para remover barras finais. Os repositórios utilizam caminhos como `/auth/login` e `/posts`, portanto o exemplo inclui `/api/v1` para corresponder às rotas conhecidas do backend. Em emuladores ou dispositivos físicos, `SEU_HOST` deve ser acessível a partir do dispositivo. As instruções nativas específicas de Android e iOS dependem dos arquivos de projeto ainda não enviados.

## Instalação e execução

**Pré-requisitos confirmados pelo manifesto:** Node.js `>=22.11.0` e dependências do React Native para a plataforma desejada. A instalação do SDK Android, Xcode/CocoaPods no macOS e demais requisitos nativos deve seguir a configuração efetiva do projeto.

Na raiz do projeto, instale as dependências usando o gerenciador correspondente ao lockfile (por exemplo, `npm install` caso o projeto utilize npm), configure a variável `API_URL` e execute os scripts declarados:

```bash
npm run start       # Inicia o Metro
npm run android     # Compila e executa no Android
npm run ios         # Compila e executa no iOS (requer ambiente compatível)
npm run lint        # Executa ESLint
npm test            # Executa Jest
```

O projeto utiliza **React Navigation** em `App.tsx`. 

## Inicialização e navegação (`App.tsx`)

`App.tsx` envolve o aplicativo em `AuthProvider` e `NavigationContainer`, utilizando `createNativeStackNavigator<RootStackParamList>()`. A rota inicial configurada é **`Login`**. As nove telas registradas são `Home`, `Login`, `Register`, `RegisterTeacher`, `MyPosts`, `CreatePost`, `PostDetails`, `Teachers` e `Students`.

As telas `MyPosts`, `CreatePost` e `PostDetails` ocultam o cabeçalho nativo (`headerShown: false`) para apresentar navegação própria. As demais utilizam títulos de cabeçalho definidos no Stack. `HomeScreen` é importada de `./app/home-screen`; as telas de autenticação, posts e usuários vêm de seus módulos em `src/features/`.

**Atenção:** a definição das rotas no Stack não implementa proteção de navegação por papel; o controle visível ocorre nas telas (`RoleGuard` ou verificações locais) e a API precisa manter a autorização de cada operação.

## Cliente HTTP e tratamento de erros

`FetchHttpClient` implementa a interface `HttpClient`, que aceita métodos `GET`, `POST`, `PUT`, `PATCH` e `DELETE`, cabeçalhos adicionais, corpo e a opção `requiresAuth`.

- Por padrão, consulta o token salvo e o envia como `Authorization: Bearer <token>`; `requiresAuth: false` desativa o envio.
- Serializa o corpo em JSON e define `Content-Type: application/json` quando existe corpo.
- Retorna `undefined` para respostas HTTP `204`.
- Para respostas sem sucesso, lança `ApiError` com mensagem traduzida, código HTTP e detalhes recebidos.
- Em falhas de rede, apresenta uma mensagem de impossibilidade de conexão.

A função `translateApiError` trata mensagens contendo `unauthorized`, `unauthenticated`, `forbidden`, `not found` ou `não encontrado` e preserva outras mensagens recebidas.

## Armazenamento de token

`SecureTokenStorage` implementa `TokenStorage` com `get()`, `save(token)` e `clear()`. Utiliza `react-native-keychain` com o identificador de serviço `com.blog_mobile.auth` para armazenar e recuperar o JWT.

## Navegação e permissões visíveis

As rotas tipadas em `RootStackParamList` são:

| Rota | Parâmetros |
| --- | --- |
| `Home` | Nenhum |
| `Login` | Nenhum |
| `Register` | Nenhum |
| `RegisterTeacher` | Nenhum |
| `MyPosts` | Nenhum |
| `CreatePost` | `{ id?: number }` opcional |
| `PostDetails` | `{ id: number }` obrigatório |
| `Teachers` | Nenhum |
| `Students` | Nenhum |

Na tela inicial, a exibição de ações depende do usuário obtido por `useAuth()`:

| Perfil | Ações mostradas na Home |
| --- | --- |
| Visitante | Entrar |
| Administrador | Cadastrar professor, gerenciar professores, sair |
| Professor | Meus Posts, gerenciar estudantes, sair |
| Estudante autenticado | Sair |

Essas regras descrevem **a visibilidade dos botões na Home**, não substituem a autorização efetiva no backend.

## Tela inicial (`HomeScreen`)

A tela carrega os posts por `postDependencies.listPosts.execute()` e apresenta cartões `PostCard` em uma `FlatList`. A busca é feita localmente sobre os posts já carregados, verificando título, conteúdo e autor. O campo de busca é renderizado por `PostSearch`.

A grade se adapta à largura da janela:

| Largura | Colunas |
| --- | --- |
| Menos de 700 px | 1 |
| De 700 a 1099 px | 2 |
| A partir de 1100 px | 3 |

A tela também oferece estado de carregamento, mensagem de lista vazia, tratamento de falhas com botão **Tentar novamente**, atualização manual e recarga ao receber foco. O código declara `SEARCH_DEBOUNCE_MS = 300`, mas a filtragem atualmente é imediata e essa constante não é utilizada.

Os estilos são mantidos em `home.styles.ts`, separados de `home-screen.tsx`. A paleta compartilhada fica em `src/shared/theme/colors.ts`.

## Integração com `blog-api`

**Repositório do backend:** [blog-api-2 no GitHub](https://github.com/fabioandrealves/blog-api-2).

O aplicativo foi estruturado para consumir a API de autenticação, posts, comentários e gerenciamento de usuários. Os endpoints exatos utilizados pelos repositórios serão registrados quando os respectivos arquivos forem fornecidos; não são presumidos a partir dos nomes dos casos de uso.

## Autenticação: organização em camadas

A funcionalidade `features/auth` possui entidades e contratos de domínio (`User`, `AuthRepository`), DTOs e repositório de dados (`AuthRepositoryImpl`), casos de uso e componentes de apresentação. Os perfis aceitos pelo tipo `UserRole` são `admin`, `teacher` e `student`.

| Camada | Arquivos e responsabilidades |
| --- | --- |
| Domínio | `entities/user.ts`: dados do usuário; `repositories/auth-repository.ts`: contratos de login, cadastro, cadastro de professor e consulta ao usuário atual |
| Aplicação | `login.ts`, `logout.ts`, `register.ts`, `register-teacher.ts`, `get-current-user.ts` |
| Dados | `auth-response-dto.ts`: contratos de resposta; `auth-repository-impl.ts`: chamadas HTTP e conversão de DTO para entidade |
| UI | `auth-context.tsx`, `login.tsx`, `register.tsx`, `register-teacher.tsx`, `password-field.tsx`, `role-guard.tsx` e estilos associados |

### Endpoints de autenticação utilizados

Os caminhos abaixo são **relativos à variável `API_URL`** (não acrescente `/api/v1` novamente se já estiver incluído no valor configurado).

| Operação | Método e caminho | Autenticação |
| --- | --- | --- |
| Cadastrar estudante | `POST /auth/register` | Não |
| Entrar | `POST /auth/login` | Não |
| Cadastrar professor | `POST /auth/teachers` | Sim; restrito a administrador no backend |
| Consultar sessão | `GET /auth/me` | Sim |

O DTO de login espera `data.user` e `data.token`; o DTO de cadastro espera `data.user`. O `AuthRepositoryImpl` converte as respostas para a entidade `User`, com `id`, `name`, `email`, `role` e datas opcionais.

### Casos de uso e sessão

- `LoginUseCase` normaliza o e-mail, verifica campos obrigatórios, chama o repositório e salva o JWT via `TokenStorage`.
- `LogoutUseCase` apaga o token salvo; o `AuthProvider` também limpa o usuário em memória.
- `GetCurrentUserUseCase` delega a consulta do usuário autenticado ao repositório.
- `RegisterUseCase` remove espaços de nome/e-mail, normaliza o e-mail e verifica campos obrigatórios. Sua verificação interna exige senha de pelo menos **6 caracteres**; a tela `RegisterScreen` exige **8 caracteres**.
- `RegisterTeacherUseCase` delega o cadastro ao repositório; a tela `RegisterTeacherScreen` verifica o perfil de administrador antes de enviar os dados.

O `AuthProvider` expõe `user`, `isAuthenticated`, `isLoading`, `login` e `logout` por meio do hook `useAuth()`. Na inicialização, tenta recuperar o token salvo e validar a sessão consultando `/auth/me`; em caso de falha, tenta limpar o token. O componente `RoleGuard` mostra carregamento durante a verificação e bloqueia a renderização de conteúdo para perfis não autorizados. A autorização definitiva continua sendo responsabilidade da API.

### Telas de login e cadastro

**Login:** formulário com e-mail e senha, normalização do e-mail, indicador de envio, tratamento de erro, opção de exibir/ocultar senha e redirecionamento para `Home` após sucesso. Oferece navegação para `Register`.

**Cadastro de estudante:** solicita nome, e-mail e senha, valida nome com pelo menos 2 caracteres, formato de e-mail e senha com pelo menos 8 caracteres. Em caso de sucesso, substitui a rota atual por `Login`. O papel `student` é informado na chamada do caso de uso, mas o contrato `RegisterInput` não declara esse campo; conferir a tipagem e a política do backend antes de depender desse atributo.

**Cadastro de professor:** exclusivo para `admin`, com validações de nome, e-mail e senha (mínimo 8 caracteres), estado de carregamento e confirmação de cadastro. Após sucesso, oferece retorno à tela inicial. O formulário possui opção de mostrar/ocultar senha.

As telas usam `KeyboardAwareScrollView` para acomodar o teclado, `useWindowDimensions` para adaptar layouts estreitos e propriedades de acessibilidade (`accessibilityLabel`, `accessibilityRole`, estados de botões e mensagens de erro). O componente reutilizável `PasswordField` implementa a visibilidade da senha com estilos separados em `password-field.styles.ts`.

### Estilos da tela de cadastro de professores

O componente `RegisterTeacherScreen` importa `teacherStyles` de `register-teacher.styles.ts`. O arquivo de estilos enviado define a apresentação do formulário administrativo de cadastro de professores, mantendo a separação entre a lógica da tela e os estilos React Native.

- **Layout responsivo:** `screen`, `content` e `contentSmall` limitam a largura do formulário a 560 pontos, centralizam o conteúdo e ajustam os espaçamentos para telas com largura inferior a 380 pontos.
- **Estados de acesso:** `centered`, `helperText` e `title` compõem as mensagens de verificação de sessão e acesso restrito a administradores.
- **Formulário:** `field`, `label`, `input`, `passwordContainer`, `passwordInput` e `passwordToggle` estilizam os campos e o controle de visibilidade da senha.
- **Ações e feedback:** `button`, `buttonPressed`, `buttonDisabled`, `cancelButton` e `errorText` cobrem cadastro, cancelamento, carregamento e erros de validação.
- **Acessibilidade visual:** `titleLargeText` adapta o título quando `fontScale >= 1.3`, complementando os rótulos acessíveis já presentes na tela.

Os estilos usam a paleta centralizada em `src/shared/theme/colors.ts` (`background`, `text`, `textSecondary`, `border`, `surface` e `primary`). 

## Gerenciamento de professores e estudantes

O módulo de gerenciamento de usuários segue a separação entre **domínio**, **dados**, **casos de uso** e **apresentação**. Os arquivos fornecidos implementam listagem, edição de nome/e-mail e exclusão de professores e estudantes, com permissões diferentes para cada público.

### Entidade e contratos de domínio

- `managed-user.ts`: define `ManagedUserRole = 'teacher' | 'student'` e a entidade `ManagedUser`, com `id`, `name`, `email`, `role` e campos opcionais `createdAt` e `updatedAt`.
- `user-management-repository.ts`: declara `UserManagementRepository` com `listTeachers`, `updateTeacher`, `deleteTeacher`, `listStudents`, `updateStudent` e `deleteStudent`.
- `UpdateManagedUserInput`: permite atualizar `name` e/ou `email`, ambos opcionais. A interface não inclui alteração de papel ou senha.

### DTOs e repositório HTTP

`managed-user-dto.ts` representa os formatos retornados pela API:

```ts
interface ManagedUsersResponseDto {
  message: string;
  data: { users: ManagedUserDto[] };
}

interface ManagedUserResponseDto {
  message: string;
  data: { user: ManagedUserDto };
}
```

A função `toManagedUser` converte `ManagedUserDto` para a entidade do domínio. `UserManagementRepositoryImpl` injeta `HttpClient`, envia `requiresAuth: true` em todas as operações e utiliza os caminhos abaixo, relativos à URL-base configurada no cliente HTTP:

| Operação | Método | Caminho | Retorno no aplicativo |
| --- | --- | --- | --- |
| Listar professores | `GET` | `/teachers` | `ManagedUser[]` |
| Atualizar professor | `PUT` | `/teachers/:id` | `ManagedUser` |
| Excluir professor | `DELETE` | `/teachers/:id` | `void` |
| Listar estudantes | `GET` | `/students` | `ManagedUser[]` |
| Atualizar estudante | `PUT` | `/students/:id` | `ManagedUser` |
| Excluir estudante | `DELETE` | `/students/:id` | `void` |

No `blog-api`, esses caminhos correspondem às rotas sob `/api/v1`. O aplicativo não realiza a autorização definitiva: ela também deve ser aplicada pelo backend.

### Casos de uso

Os seis arquivos de aplicação recebem `UserManagementRepository` por construtor e delegam suas operações ao contrato:

| Arquivo | Classe | Método `execute` |
| --- | --- | --- |
| `list-teachers.ts` | `ListTeachers` | `(): Promise<ManagedUser[]>` |
| `update-teacher.ts` | `UpdateTeacher` | `(id, input): Promise<ManagedUser>` |
| `delete-teacher.ts` | `DeleteTeacher` | `(id): Promise<void>` |
| `list-students.ts` | `ListStudents` | `(): Promise<ManagedUser[]>` |
| `update-student.ts` | `UpdateStudent` | `(id, input): Promise<ManagedUser>` |
| `delete-student.ts` | `DeleteStudent` | `(id): Promise<void>` |

Os casos de uso não contêm validação adicional, tratamento de erros próprio nem lógica de autorização; essas responsabilidades aparecem na interface e no servidor.

### Componente compartilhado `UserManagementList`

`user-management-list.tsx` é utilizado nas duas telas e recebe `title`, `users`, `loading`, `onRefresh`, `onUpdate` e `onDelete`. A lista usa `FlatList`, atualiza por gesto de *pull-to-refresh*, mostra a quantidade de usuários e exibe uma mensagem quando não há registros.

- **Responsividade:** duas colunas quando `width >= 760` e `fontScale <= 1.3`; uma coluna nos demais casos. Layout compacto quando `width < 380` ou `fontScale > 1.3`.
- **Edição:** somente um usuário é editado por vez; nome e e-mail são carregados no formulário, normalizados com `trim()` e, para e-mail, `toLowerCase()`. A validação local exige nome com pelo menos dois caracteres e formato básico de e-mail válido. Os campos limitam a entrada a 120 e 255 caracteres, respectivamente.
- **Exclusão:** usa `Alert.alert` para pedir confirmação antes de chamar `onDelete`. Mostra erros em alertas e indicadores de atividade durante gravação/exclusão.
- **Acessibilidade:** botões e campos têm rótulos acessíveis; a contagem de usuários é anunciada por região dinâmica.

`user-management-list.styles.ts` concentra os estilos dos cartões, grade, formulário, ações, estados vazios e botões. Neste componente, as cores são declaradas diretamente como valores hexadecimais.

### Telas e permissões

| Tela | Componente | Papel permitido | Casos de uso |
| --- | --- | --- | --- |
| `teachers-screen.tsx` | `TeachersScreen` | `admin` | `listTeachers`, `updateTeacher`, `deleteTeacher` |
| `students-screen.tsx` | `StudentsScreen` | `teacher` | `listStudents`, `updateStudent`, `deleteStudent` |

Ambas envolvem o conteúdo em `RoleGuard`, carregam os dados quando a tela ganha foco com `useFocusEffect` e usam `requestIdRef` para descartar respostas de solicitações antigas, inclusive após perder o foco. Após atualização ou exclusão bem-sucedida, recarregam a lista. Há indicador de carregamento inicial, mensagem de erro e ação **Tentar novamente**. Os arquivos `teachers-screen.styles.ts` e `students-screen.styles.ts` definem separadamente os estilos desses estados.

**Restrição importante do backend:** a exclusão de usuários vinculados a posts ou comentários pode retornar `409 Conflict`; a interface apresenta a mensagem de erro recebida, sem executar exclusão em cascata.

**Nome do arquivo confirmado:** `managed-user-repository-impl.ts`, que exporta a classe `UserManagementRepositoryImpl`.

## Publicações (posts)

### Domínio, DTO e repositório

- `features/posts/domain/entities/post.ts` (conteúdo fornecido como `posts.ts`) declara `PostAuthor`, `Post`, `CreatePostInput` e `UpdatePostInput`. `Post` contém `id`, `title`, `content`, `userId`, `createdAt`, `updatedAt` e `user?`.
- `features/posts/domain/repositories/post-repository.ts` define o contrato `PostRepository`: `list`, `getById`, `listMyPosts`, `create`, `update` e `delete`, além dos tipos de entrada para criação e edição.
- `features/posts/data/models/post-dto.ts` define `PostDto` e `toPost`, que converte o retorno HTTP em uma entidade de domínio. O DTO inclui `authorName`.
- `features/posts/data/repositories/post-repository-impl.ts` implementa o contrato com `HttpClient`. As listagens aceitam três formatos de resposta: um array direto, `data.posts` ou `posts`; respostas inesperadas geram erro explícito.

| Operação | Método e caminho relativo | Autenticação | Caso de uso |
| --- | --- | --- | --- |
| Listar publicações | `GET /posts` | Não exigida | `ListPosts` |
| Detalhar publicação | `GET /posts/:id` | Não exigida | `GetPostById` |
| Listar minhas publicações | `GET /posts/me` | JWT | `ListMyPosts` |
| Criar publicação | `POST /posts` | JWT | `CreatePost` |
| Atualizar publicação | `PUT /posts/:id` | JWT | `UpdatePost` |
| Excluir publicação | `DELETE /posts/:id` | JWT | `DeletePost` |

Esses caminhos são relativos à `API_URL`. Caso a API use o prefixo `/api/v1`, ele deve estar contemplado na URL-base ou no roteamento efetivo do servidor. O backend deve validar as permissões independentemente das verificações feitas na interface: **somente professores podem criar posts e somente o professor autor pode editar ou excluir os próprios posts**.

### Casos de uso e validações

- `ListPosts`, `ListMyPosts` e `CreatePost` delegam ao repositório.
- `GetPostById` e `DeletePost` exigem ID inteiro positivo e seguro (`Number.isSafeInteger`).
- `UpdatePost` também valida o ID, exige ao menos um campo a atualizar, aplica `trim()` e impede título ou conteúdo vazios.

### Componentes de apresentação

- `PostCard` (`post-card.tsx` e `post-card.styles.ts`) exibe capa local `assets/images/post/post_cover.png`, título, resumo de até 150 caracteres, autor e data em formato brasileiro. É clicável e possui rótulos de acessibilidade.
- `PostSearch` (`post-search.tsx` e `post-search.styles.ts`) é um campo controlado de pesquisa com `value` e `onChangeText`. O filtro por título, conteúdo e autor é realizado pela `HomeScreen`, em memória, não por um endpoint de busca.
- Os estilos dos componentes e telas ficam em arquivos `.styles.ts`, separados do JSX.

### Telas de publicações

**`MyPostsScreen`** (`my-posts-screen.tsx` / `my-posts.styles.ts`): área exclusiva de professores. Carrega publicações próprias por `listMyPosts`, apresenta nome e e-mail do professor, total de posts e data da publicação mais recente. Possui lista com atualização por gesto, indicadores de carregamento, estado vazio, mensagem de erro com nova tentativa e acesso ao editor e aos detalhes. Usuários sem o papel `teacher` recebem uma tela de acesso restrito.

**`CreatePostScreen`** (`create-post-screen.tsx` / `create-post.styles.ts`): reúne criação e edição. A rota `CreatePost` aceita opcionalmente `{ id: number }`; com ID, busca a publicação e verifica se `post.userId` corresponde ao usuário autenticado. Oferece alternância entre edição e pré-visualização, limite de **150 caracteres** para o título, campos obrigatórios de título e conteúdo, indicação de carregamento e bloqueio de envios simultâneos. Ao cancelar alterações não salvas, pede confirmação; após salvar, oferece navegação aos detalhes do post. Somente professores podem publicar.

**`PostDetailsScreen`** (`post-details-screen.tsx` / `post-details.styles.ts`): consulta a publicação e seus comentários ao receber foco, exibe conteúdo, autor e data. Os botões de editar e excluir post aparecem apenas para o professor autor; a exclusão solicita confirmação. Na mesma tela, usuários autenticados podem criar comentários; professores e estudantes podem editar ou excluir **seus próprios comentários**. O fluxo utiliza `CommentCard`, `CommentForm` e os casos de uso de comentários, com estados de carregamento, erros e atualização da lista após mutações. O layout considera telas compactas e ampliação da fonte.

## Módulo de comentários

O módulo `features/comments` implementa leitura pública e operações autenticadas sobre comentários de posts, separando regras de domínio, casos de uso, acesso à API e componentes de interface. A integração ocorre na `PostDetailsScreen`.

### Domínio e contrato do repositório

- `CommentAuthor`: `id` e `name`.
- `Comment`: `id`, `postId`, `userId`, `content`, `createdAt`, `updatedAt` e `user?: CommentAuthor`.
- `CreateCommentInput`: `postId` e `content`; `UpdateCommentInput`: `content`.
- `CommentRepository`: `list(postId)`, `create(input)`, `update(id, input)` e `delete(id)`, com resultados tipados por `Comment` ou `Comment[]` e exclusão `Promise<void>`.

### Casos de uso

| Classe | Comportamento |
| --- | --- |
| `ListComments` | Valida `postId` como inteiro seguro positivo e consulta os comentários da publicação. |
| `CreateComment` | Valida `postId`, remove espaços nas extremidades do texto e rejeita conteúdo vazio. |
| `UpdateComment` | Valida ID do comentário, remove espaços nas extremidades e rejeita conteúdo vazio. |
| `DeleteComment` | Valida ID como inteiro seguro positivo antes de excluir. |

Os casos de uso recebem `CommentRepository` por construtor, evitando dependência direta de HTTP na camada de aplicação.

### Endpoints e autenticação

Os caminhos abaixo são **relativos à `API_URL`**; confirmar que a base contém o prefixo `/api/v1` quando exigido pelo backend.

| Operação | Método e caminho | Token |
| --- | --- | --- |
| Listar comentários de um post | `GET /posts/:postId/comments` | Não |
| Criar comentário | `POST /posts/:postId/comments` | Sim |
| Atualizar comentário | `PUT /comments/:commentId` | Sim |
| Excluir comentário | `DELETE /comments/:commentId` | Sim |

Na criação, o corpo enviado é `{ "content": "..." }`, sem `postId` no JSON porque ele já está no caminho. Na atualização, o corpo contém `content`.

### Contrato da API e mapeamento

- `CommentRepositoryImpl` recebe `HttpClient` e uma implementação de `CommentApiContract`, permitindo isolar a construção dos caminhos, o corpo de criação e a leitura das respostas.
- `comment-api-contract.ts` implementa o contrato: extrai um comentário de `data.comment` e uma lista de `data.comments`, lançando erros quando não encontra os dados esperados.
- `CommentDto` aceita `authorName?` e `user?` com `id` e `name`. `toComment` converte para a entidade e, quando `user` não existe, monta um autor com `userId` e `authorName` (ou o nome genérico `Usuário`).
- As requisições de listagem usam `requiresAuth: false`; criação, atualização e exclusão usam `requiresAuth: true`.

### Componentes da interface

**`CommentCard`** (`comment-card.tsx` / `comment-card.styles.ts`) apresenta iniciais do autor em um avatar textual, nome, data em formato brasileiro e conteúdo. Recebe `canManage` para exibir os botões **Editar** e **Excluir** somente quando permitido pela tela controladora; os botões acionam `onEdit` e `onDelete`. Inclui rótulos e dicas de acessibilidade.

**`CommentForm`** (`comment-form.tsx` / `comment-form.styles.ts`) é um formulário controlado, com campo multilinha, modo de criação ou edição, botão **Publicar comentário** ou **Salvar comentário**, indicador de envio, estado desabilitado e opção de cancelar edição. Não permite enviar conteúdo composto apenas de espaços e oferece callbacks opcionais de foco e desfoque.

Na `PostDetailsScreen`, comentários são carregados ao abrir a publicação; a criação exige autenticação e a edição/exclusão é apresentada a professores ou estudantes autores dos próprios comentários. A interface solicita confirmação antes da exclusão, recarrega a lista após alterações e apresenta erros quando necessário. A autorização definitiva também deve ser aplicada pela API.
