import { createClient } from 'contentful';
import {
  BLOGS_FETCH, fetchBlogsSuccessful,
} from './actions';

const client = createClient({
  space: process.env.REACT_APP_SPACE_ID,
  accessToken: process.env.REACT_APP_ACCESS_TOKEN
});

const getBlogs = cb => (
  client.getEntries({ content_type: 'blog' }).then((response) => {cb(response.items)})
);

export default (store) => next => action => {
  switch (action.type) {
    case BLOGS_FETCH:
      getBlogs(blogs => store.dispatch(fetchBlogsSuccessful(blogs)));
      break;
    default:
  }

  return next(action);
}
