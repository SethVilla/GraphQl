import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Link, useNavigate } from 'react-router-dom';
import { getSongTitles } from './queries/getSongTitles';

const mutation = gql`
  mutation DeleteSong($id: ID!) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export const SongList = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(getSongTitles, {
    variables: { language: 'english' },
  });

  const [
    deleteSong,
    { data: deleteData, delete: deleteLoading, error: deleteError },
  ] = useMutation(mutation, {
    refetchQueries: [
      { query: getSongTitles }, // DocumentNode object parsed with gql,
      'getSongTitles',
    ],
  });

  const handleDelete = (id) => {
    deleteSong({ variables: { id } });
  };

  return (
    <>
      <ul className="collection">
        {!loading ? (
          data?.songs?.map(({ id, title }) => (
            <li className="collection-item" key={title}>
              <Link to={`/songs/${id}`}>{title}</Link>
              <i
                className="material-icons"
                onClick={() => handleDelete(id, title)}
              >
                delete
              </i>
            </li>
          ))
        ) : (
          <>Loading ...</>
        )}
      </ul>
      <Link className="btn-floating btn-large red right" to="/songs/new">
        <i className="material-icons">add</i>
      </Link>
    </>
  );
};
