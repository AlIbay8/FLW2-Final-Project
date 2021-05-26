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

function getAnimePage(number) {
  var variables = {
    type: "ANIME",
    page: number,
    perPage: 50,
    sort: "TRENDING_DESC"
  };
  return getTrendingAnime(variables);
}

function getAnimeCharacter(data) {
  var randomMedia =
    data.data.Page.media[
      Math.floor(Math.random() * data.data.Page.media.length)
    ];
  //console.log(randomMedia.characters.nodes);
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
  if (randomCharacter) {
    return {
      name: characterName(randomCharacter),
      image: randomCharacter.image.large,
      title: title(randomMedia),
      favorites: randomCharacter.favourites
    };
  } else {
    return {
      name: "John Doe",
      image:
        "https://t4.rbxcdn.com/cc546858d17ee405feb5762b5458c76a",
      title: "The John Doe Show",
      favorites: 42069
    };
  }
}



export function getManyCharacters(setRetrievedData) {
  var animeData = {};
  var finalArray = [];

  function handleAnimeData(data) {
    animeData = data;
    for (var i = 0; i < 125; i++) {
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

  Promise.all([getAnimePage(1), getAnimePage(2)]).then((pages) => {
    pages.forEach((page) => {
      handleAnimeData(page);
    });
    setRetrievedData(finalArray);
  });
}
