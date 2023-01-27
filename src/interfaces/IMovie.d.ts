interface IMovie {
    "_id": number,
    "Title": string;
    "Description": string;
    "Director": IDirector;
    "Genre": IGenre;
    "Imageurl": string;
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