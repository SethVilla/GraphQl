import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { getSongTitles } from './queries/getSongTitles';
const mutation = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      id
      title
    }
  }
`;

export const SongCreate = () => {
  const [songTitle, setSongTitle] = useState('');
  const [addSong, { data, loading, error }] = useMutation(mutation, {
    refetchQueries: [
      { query: getSongTitles }, // DocumentNode object parsed with gql
      'getSongTitles',
    ],
  });
  const navigate = useNavigate();

  return (
    <>
      <Link to="/songs">back</Link>
      <h3>Create Song</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addSong({ variables: { title: songTitle } });
          setSongTitle('');
          navigate('/songs');
        }}
      >
        <label>Song Title</label>
        <input
          type="text"
          onChange={(e) => setSongTitle(e.target.value)}
          value={songTitle}
        />
        <button className="btn-floating btn-large red right" type="submit">
          <i className="material-icons">add</i>
        </button>
      </form>
    </>
  );
};
