import {ApolloClient, InMemoryCache, from, HttpLink} from '@apollo/client';

const GRAPHQL_ENDPOINT = 'http://localhost:4000';

const apolloClient = () => {
    const link = new HttpLink({
        uri: GRAPHQL_ENDPOINT
    });
    return new ApolloClient({
        link: from([link]),
        cache: new InMemoryCache(),
    });
};

export default apolloClient;

