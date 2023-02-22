#  Anime-App-Backend


Backend for [Animecenter-android](https://github.com/Misil4/animecenter-android) and [Animecenter-desktop](https://github.com/Misil4/animecenter-desktop)


## Features

- Last Anime Episodes
- Anime Searching
- Episode URLS
- Episode Player


## Installation

Clone the repo

```bash
  npm install 
  npm start
```
    
## API Reference

#### Get last episodes

```http
  GET /lastAnime
```

#### Get last anime news

```http
  GET /lastAnimeNews
```

#### Get episodes from anime

```http
  GET /episodes/:anime
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `anime` | `string` | **Required**. Anime name |

#### Get info from anime

```http
  GET /search/:anime
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `anime` | `string` | **Required**. Anime name |

#### Get episode URL from anime

```http
  GET /url/:anime/:ep
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `anime` | `string` | **Required**. Anime name |
| `ep` | `string` | **Required**. Episode number |

#### Get Episode Dowload link

```http
  GET /dowload/:anime/:ep
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `anime` | `string` | **Required**. Anime name |
| `ep` | `string` | **Required**. Episode number |



## Authors

- [@Misil4](https://github.com/Misil4)

