import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

const lyricMutation = gql`
  mutation AddLyricToSong($songId: ID!, $content: String!) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      lyrics {
        content
      }
    }
  }
`;

export const LyricCreate = ({ songId }) => {
  const [content, setContent] = useState('');
  const [
    addLyricToSong,
    { data: lyricData, loading: lyricLoading, error: lyricError },
  ] = useMutation(
    lyricMutation
    //    {
    //   refetchQueries: [
    //     { query: getSongTitle, variables: { id: songId } }, // DocumentNode object parsed with gql
    //     'getSongTitle',
    //   ],
    // }
  );

  return (
    <>
      <h3>Create Lyrics</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addLyricToSong({ variables: { content, songId } });
          setContent('');
        }}
      >
        <label>Lyrics</label>
        <input
          type="text"
          onChange={(e) => setContent(e.target.value)}
          value={content}
        />
        <button className="btn-floating btn-large red right" type="submit">
          <i className="material-icons">add</i>
        </button>
      </form>
    </>
  );
};
