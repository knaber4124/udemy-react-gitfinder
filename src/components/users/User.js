import React, { Component, Fragment } from 'react'
import Spinner from '../layout/Spinner/Spinner';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class User extends Component {
    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
    }

    componentDidMount() {
        this.props.getUserInfo(this.props.match.params.login);
    }

    render() {
        const { name, avatar_url, location, bio, company, blog, login, html_url, followers, following, public_repos, public_gists, hireable
        } = this.props.user;
        const { loading } = this.props;

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
                        <a href={html_url} className='btn btn-dark my-1' target='_blank'>Visit Github Profile </a>
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
                <div className ='card text-center'>
                            <div className='badge badge-primary'>Followers:{followers}</div>
                            <div className='badge badge-success'>Following:{following}</div>
                            <div className='badge badge-danger'>Public Repos:{public_repos}</div>
                            <div className='badge badge-dark'>Public Gists:{public_gists}</div>
                </div>
            </Fragment>
        )
    }
}

export default User
