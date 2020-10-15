import React, { useReducer } from 'react';
import axios from 'axios';
import gitHubContext from './gitHubContext';
import gitHubReducer from './gitHubReducer';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS, GET_USERS, GET_REPOS } from '../types';

const GitHubState = props => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(gitHubReducer, initialState);



    return <gitHubContext.Provider>
        value={{
            users: state.users,
            user: state.user,
            repos: state.repos,
            loading: state.loading
        }}

        {props.children}
    </gitHubContext.Provider>
}

export default GitHubState;