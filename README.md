Basic Auth (username/password)  with NextJs + Firebase + Cookies :yum:


## Getting started

Create a new firebase project
Create the firestore db and start a collections "Users"
Get project config keys from firebase settings
Rename `.env.example` to `.env`.
Replace the contents of this file with your keys. (The `jwt_secret` can be any string you like).



## Running the app

Once you have configured firebase and your environment variables, install dependencies and run the development server using the following.

```bash
npm install
npm run dev
# or
yarn install
yarn dev
```

## More info.

There are 4 pages in this app
- homepage
- login
- signup
- restricted
- normal

Only the restricted page and api requires authentication.

