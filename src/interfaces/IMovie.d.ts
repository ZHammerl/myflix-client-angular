interface IMovie {
    "_id": string
    "Title": string;
    "Description": string;
    "Director": IDirector;
    "Genre": IGenre;
    "ImageURL": string;
    "Actors": string[];
    "Featured": boolean;
  }
  
  interface IDirector {
    "Name": string;
    "Bio": string;
    "Birthyear": string;
    "Deathyear": string | boolean;
    "Movies": string[]
  }
  
  interface IGenre {
    "Name": string;
    "Description": string;
  }