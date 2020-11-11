import React, { useState, useContext } from 'react';
import GitHubContext from "../../context/gitHub/GitHubContext";
import AlertContext from '../../context/alert/AlertContext';

const Search = () => {
    const gitHubContext = useContext(GitHubContext);
    const alertContext = useContext(AlertContext)
    const [text, setText] = useState('')

    const onChange = (e) => setText(e.target.value)

    const onSubmit = (event) => {
        event.preventDefault();
        if (text === '') {
            alertContext.setAlert('Please enter a search query', 'light')
        } else {
            gitHubContext.searchUsers(text);
            setText('');
        }

    }

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input type='text' name='text' placeholder='Search Users' value={text}
                    onChange={onChange} />
                <input type='submit' value="Search" className='btn btn-dark btn-block' />
            </form>
            {gitHubContext.users.length > 0 && <button className='btn btn-light btn-block' onClick={gitHubContext.clearUsers}>Clear</button>
            }

        </div>
    )

}


export default Search