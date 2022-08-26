# Pelando - Product Web Scrapping Service

Neste desafio foi implementado um microserviço em Nodejs e Typescript com arquitetura baseada em Domain Driven Design (DDD) que permite o desacoplamento das regras de negócio
de outras camadas do sistema como banco de dados e infraestrutura, permitindo ainda a autonomia do serviço, a separação do modelo de dados, a melhoria da legibilidade e manutenabilidade do código além da independencia do time de desenvolvimento.

Fundamentado nisso foi criado uma api REST que é capaz de receber um atributo URL via POST e processar a automação de webscraping (Raspagem) do produto, em diferentes lojas, persistindo os atributos de Título, Imagem, Preço, Descrição e URL em um banco (NoSQL) MongoDB além de retornar para o usuário uma resposta no formato JSON.

## Passo a Passo para Build e Up da Aplicação

### 1. Clone do repositório

```
git clone git@github.com:mackson/pelando_scrap_produtos.git
```

### 2. Instalação das dependências

Para instalar as dependencias da aplicação tenha previamente instalado em seu sistema operacional o Nodejs com uma versão igual ou superior a 16.

```
cd pelando_scrap_produtos
npm install
```

### 3. Configuração da Variável de ambiente (URL do MongoDB)

Na pasta root do repositório existe um arquivo chamado .env.example que é o modelo para a definição das variáveis de ambiente necessárias para funcionamento do banco de dados MongoDB da aplicação.

Renomeie o arquivo .env.example para .env e inclua o trecho de código logo a baixo.

```
DATABASE_URL="mongodb://root:prisma@localhost:27017/prisma-mongo?authSource=admin&retryWrites=true&w=majority"
```
### 4. Inicialização do Container MongoDB e Base de Dados

Tenha previamente instalado em seu sistema operacional o docker e o docker compose logo em seguida insira o comando a baixo para provisionar o container MongoDB necessário para persistência dos produtos no microserviço.

```
cd pelando_scrap_produtos
docker compose up -d
```

Se for de sua preferência criar um volume de persistencia da base mongodb criada, insira no arquivo dockcer-compose.yml o seguinte trecho:

```
    volumes:
      - /path-to-you-mongodb/data:/data/db
```

### 5. Inicializar o Prisma Client e o MongoDB Schema

Para registrar e inicializar o Prisma client juntamente com o Schema no banco de dados, insira os dois comandos logo a baixo.

```
npx prisma generate --schema=./src/infra/database/prisma/schema.prisma
npx prisma db push --schema=./src/infra/database/prisma/schema.prisma

```

### 6. Teste Local da Aplicação

Após a instalação das dependências e configurações agora é possível inicializar o serviço com o comando

```
cd pelando_scrap_produtos
npm run start
```

A aplicação irá inicializar na <strong>porta 3333</strong>, agora utilizando uma ferramenta cliente de API REST como Postman ou Insomnia, crie uma requisição do tipo POST com a URL logo a baixo.

```
http://localhost:3333/product/scrap
```

No corpo insira os seguintes JSON's você poderá alterar o atributo URL com um endereço de sua preferência.

```
{
	"url": "https://www.zattini.com.br/jaqueta-moletom-nike-sportswear-club-fleece-capuz-feminina-preto+branco-2IC-8932-026"
}
```

```
{
	"url": "https://www.saraiva.com.br/mindset-9404582/p"
}
```

```
{
	"url": "https://www.amazon.com.br/Notebook-Dell-Alienware-AW17-X17R2-M30S-3080Ti/dp/B09WF3M3HB"
}
```

<strong>Observação:</strong>
A aplicação só possui suporte de scrap de produtos para as seguintes lojas:

- Amazon
- Saraiva
- Zattini

```
No aquivo store-config.ts encontrado na pasta ./src/infra/webscraping/ você poderá incluir uma config de novas lojas com seus respectivos dominios e seletores mapeados.
```

<strong>Atenção:</strong>
Em algumas lojas como Americanas e Submarino foi observado o bloqueio da automação de scrap de produtos.

Para tentar contornar esse problema em uma versão futura será necessário a implemetação de estratégias como proxy e mudança dinâmica de navegadores.

### 7. Testes Unitários

Para inicializar os testes unitários implementados com Jest insira o seguinte comando:

```
npm run test
```

### 8. Tecnologias, Arquiteturas e Metodologias usadas

- Serviços: Nodejs, Expressjs e Typescript.
- Banco de Dados: ODM Prisma, para manipulação do modelo de dados da aplicação e persistência no MongoDB.
- Webscraping: Implementado com a biblioteca Playwright, suportada pela Microsoft, fácil de usar e Multi-plataforma.
- Docker Compose: Usado para provisionar os containers necessários para inicializar a aplicação NodeJs e o banco de dados MongoDB.
- SOLID: Principios mais usados, Single Responsabilty e Dependency Inversion.
- Clean Code: conjunto de boas práticas na escrita de software para obter uma maior legibilidade e manutenabilidade.
- Testes unitários com Jest
- Domain Driven Design (DDD).

### 9. Todo

- [ ] Aumentar a cobertura de lojas no scrap de produtos,
- [ ] Aplicar estratégias como proxy e mudança dinâmica de navegadores.
- [ ] Implementação de CI/CD com pod para a aplicação e banco de dados.
- [ ] Aplicar sistema de Logs, Métricas e Observabilidade do banco de dados, do serviço e da infraestrutura.
- [ ] Implementar Documentação (Swagger ou Backstage.io).
