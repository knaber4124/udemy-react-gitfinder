import React, { useEffect, Fragment, useContext } from 'react'
import Spinner from '../layout/Spinner/Spinner';
import Repos from '../Repos/Repos';
import { Link } from 'react-router-dom';
import GitHubContext from '../../context/gitHub/GitHubContext'

const User = ({ match }) => {
    const githubContext = useContext(GitHubContext);

    useEffect(() => {
        getUser(match.params.login);
        getUserRepo(match.params.login)
        // eslint-disable-next-line
    }, []);

    const { getUser, user, loading, repos, getUserRepo } = githubContext;


    const { name, avatar_url, location, bio, company, blog, login, html_url, followers, following, public_repos, public_gists, hireable
    } = user;

    if (loading) return <Spinner />
    return (
        <Fragment>
            <Link to="/" className='btn btn-light'>Back To Search</Link>
                Hireable : {' '} {hireable ? <i className='fas fa-check text-success' /> : <i className='fas fa-times-circle text-danger'></i>}
            <div className='card grid-2'>
                <div className='all-center'>
                    <img src={avatar_url} alt='avatar' className='round-img' style={{ width: '150px' }} />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>
                <div>
                    {bio && <Fragment><h3>About Me</h3><p>{bio}</p></Fragment>}
                    <a href={html_url} className='btn btn-dark my-1'>Visit Github Profile </a>
                    <ul>
                        <li>{login}</li>
                        {company && <Fragment>
                            Company:{company}
                        </Fragment>}
                        {blog && <Fragment>
                            Website:{blog}
                        </Fragment>}
                    </ul>
                </div>
            </div>
            <div className='card text-center'>
                <div className='badge badge-primary'>Followers:{followers}</div>
                <div className='badge badge-success'>Following:{following}</div>
                <div className='badge badge-danger'>Public Repos:{public_repos}</div>
                <div className='badge badge-dark'>Public Gists:{public_gists}</div>
            </div>
            <Repos repos={repos} />
        </Fragment>
    )
}


export default User
