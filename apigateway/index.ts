import { server } from './src/server'

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
type costam = {
  url: string
}

server.listen().then(({url}:costam) => {
    console.log(`🚀  Server ready at ${url}`);
  });
