import "./styles.css";

export default function App() {
  function getTrendingAnime(variables) {
    var query = `
      query ($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort]) {
        Page (page: $page, perPage: $perPage) {
          media (type: $type, sort: $sort) {
            title {
              english
              romaji
            }
            characters {
              nodes {
                name {
                  first
                  last
                }
                image {
                  large
                }
                favourites
              }
            }
          }
        }
      }
    `;

    var url = "https://graphql.anilist.co",
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          query: query,
          variables: variables
        })
      };

    function handleResponse(response) {
      return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
      });
    }

    function handleError(error) {
      //alert('Error, check console');
      console.error(error);
    }

    return fetch(url, options).then(handleResponse).catch(handleError);
  }

  function getAnimeCharacter(data) {
    var randomMedia =
      data.data.Page.media[
        Math.floor(Math.random() * data.data.Page.media.length)
      ];
    var randomCharacter =
      randomMedia.characters.nodes[
        Math.floor(Math.random() * randomMedia.characters.nodes.length)
      ];
    var title = (randomMedia) =>
      randomMedia.title.english
        ? randomMedia.title.english
        : randomMedia.title.romaji;
    var characterName = (randomCharacter) => {
      if (randomCharacter.name.first) {
        if (randomCharacter.name.last) {
          return randomCharacter.name.first + " " + randomCharacter.name.last;
        } else {
          return randomCharacter.name.first;
        }
      } else {
        return randomCharacter.name.last;
      }
    };
    //console.log(title(randomMedia), ", english: " + randomMedia.title.english, ", romaji: " + randomMedia.title.romaji)
    /*
    console.log(
      characterName(randomCharacter),
      ", first: " + randomCharacter.name.first,
      ", last: " + randomCharacter.name.last
    );
    */
    return {
      name: characterName(randomCharacter),
      image: randomCharacter.image.large,
      title: title(randomMedia),
      favorites: randomCharacter.favourites
    };
  }

  function getAnimePage(number) {
    var variables = {
      type: "ANIME",
      page: number,
      perPage: 50,
      sort: "TRENDING_DESC"
    };
    return getTrendingAnime(variables);
  }

  function getManyCharacters() {
    var animeData = {};
    var finalArray = [];

    function handleAnimeData(data) {
      animeData = data;
      for (var i = 0; i < 100; i++) {
        function getCharacter() {
          var character = {};
          character = getAnimeCharacter(animeData);

          if (
            character.name.includes("Narrator") ||
            character.image ===
              "https://s4.anilist.co/file/anilistcdn/character/large/default.jpg" ||
            character.name.includes("Archive")
          ) {
            getCharacter();
          } else {
            if (finalArray.includes(character)) {
              getCharacter();
            } else {
              finalArray.push(character);
            }
          }
          return;
        }
        getCharacter();
      }
    }

    getAnimePage(1).then((data) => {
      handleAnimeData(data);
      console.log(finalArray);
    });
    getAnimePage(2).then((data) => {
      handleAnimeData(data);
    });
  }

  getManyCharacters();

  function time() {
    var timer = 240;
    setInterval(function () {
      timer -= 1;
      var minutes = Math.floor(timer / 60);
      var time = minutes * 60;
      var seconds = timer - time;
      console.log(minutes, seconds);
    }, 1000);
  }
  return (
    <div className="App">
      <h1>AniGuesser</h1>
    </div>
  );
}
