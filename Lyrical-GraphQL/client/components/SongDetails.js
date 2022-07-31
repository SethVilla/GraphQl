import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { getSongTitle } from './queries/getSongTitles';
import { LyricCreate } from './LyricCreate';
import { LyricList } from './LyricList';
export const SongDetails = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(getSongTitle, {
    variables: { id },
  });

  return (
    <>
      <Link to="/songs">back</Link>
      <h3>{!loading && data?.song?.title}</h3>
      <LyricCreate songId={id} />
      <LyricList songId={id} lyrics={data?.song?.lyrics} />
    </>
  );
};
