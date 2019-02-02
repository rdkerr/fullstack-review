import React from 'react';
import RepoListEntry from './RepoListEntry.jsx';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Repo Name</th>
          <th>Forks</th>
        </tr>
      </thead>
      <tbody>
        {props.repos.map((repo, index) => <RepoListEntry repo={repo} key={index} />)}
      </tbody>
    </table>
  </div>
)

export default RepoList;