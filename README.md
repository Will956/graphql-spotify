# GraphQL-Spotify

A simple GraphQL layer for Spotify API built with Apollo Server.

If you want to see the first version of it, https://github.com/Will956/graphql-spotify/tree/v1.0.

## Goal

This project is not about implement all query for the Spotify API. It's about having fun with setup it thanks to Apollo 🤓.

## Running the app

Before anything, you have to create a Spotify app (see https://beta.developer.spotify.com/dashboard/applications). Then, you have to fill the `.env` (and remove `.example` as well) with your credentials.

```
# install dependencies
npm install

# run the app
npm run dev
```

## Use the app

Then you need to authenticate throught the Spotify API, simply execute that query

```
{
  login {
    url
  }
}

```

and copy/paste returned url to your browser to get logged in!
