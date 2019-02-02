import React from 'react';

const RepoListEntry = (props) => (
  <tr>
    <td>{props.repo.username}</td>
    <td><a href={props.repo.url}>{props.repo.reponame}</a></td>
    <td>{props.repo.forks}</td>
  </tr>
)

export default RepoListEntry;