// Variáveis
const inicioPokemons = 0;
const totalPokemons = 50;
const pokemon = []
let urlPokemon = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`
const pokemonPromisses = []

// Faz a requisição da API
const fetchPokemon = async function () {
      
   // Faz varias requisições na API mudando o número final da URL de forma dinâmica
   for (let i = 1; i <= totalPokemons; i++) {
      pokemonPromisses.push(fetch(urlPokemon(i)).then((response) => response.json()))
   }

   // Resolve todos os promisses gerados nas requisições e gera o retorno da variável
   return Promise.all(pokemonPromisses)
      .then(
         (pokes) => pokemonDetalhes(pokes)
      )
}

// Essa função vai receber uma lista de dados e vai separar cada dado para um indice do pokemon
function pokemonDetalhes(pokemonLista) {

   for (let i = inicioPokemons; i < pokemonLista.length; i++) {
      pokemon[0] = pokemonLista[i].id // armazena o ID
      pokemon[1] = pokemonLista[i].name  // armazena o Nome
      pokemon[2] = pokemonLista[i].sprites.other.dream_world.front_default;  // armazena a Imagem
      pokemon[3] = pokemonLista[i].types[0].type.name // armazena o Tipo principal

      // faz a verificação para saber se tem um 2º tipo de ataque e se tiver ele armazena no pokemon[4]
      if (!pokemonLista[i].types[1]) {
         pokemon[4] = ''; 
      } else {
         pokemon[4] = pokemonLista[i].types[1].type.name
      }

      // Chama a função responsável por criar o HTML dos pokemons e passa os objetos como parâmetro
      cards.innerHTML += convertePokemonEmHTML(pokemon)
   }
   
}

// Chamada da função da API
fetchPokemon();