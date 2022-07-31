import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { getSongTitle } from './queries/getSongTitles';

const likeLyricMutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export const LyricList = ({ songId, lyrics }) => {
  if (lyrics?.length === 0) return null;
  const [
    likeLyric,
    { data: lyricData, loading: lyricLoading, error: lyricError },
  ] = useMutation(likeLyricMutation);
  const handlelikeLyric = (id, likes) => {
    likeLyric({
      variables: { id },
      optimisticResponse: {
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1, // Obtained from user input
        },
      },
    });
  };
  return (
    <>
      <h3>Lyrics</h3>
      <ul className="collection">
        {lyrics?.map(({ id, content, likes }) => (
          <li className="collection-item" key={id}>
            {content}
            <section className="vote-box">
              <i
                className="material-icons"
                onClick={() => handlelikeLyric(id, likes)}
              >
                thumb_up
              </i>
              <p>{likes}</p>
            </section>
          </li>
        ))}
      </ul>
    </>
  );
};
