import { gql } from '@apollo/client';

export const getSongTitles = gql`
  query GetSongs {
    songs {
      id
      title
    }
  }
`;

export const getSongTitle = gql`
  query GetSong($id: ID!) {
    song(id: $id) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;
