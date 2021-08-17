import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Loader from '../ui/Loader/Loader';
import Shelf from './Shelf';
import * as BooksAPI from '../BooksAPI';

export default class Home extends React.Component {

    componentDidMount() {
        this.props.initializeHomeLoader();
        BooksAPI.getAll().then(data =>{
            this.props.handleShelfs(data, "home");
        });
    }

    render() {
        const {shelfs, shelfOptionSelected, selectingOption, selectMenuDisabled, homeLoader} = this.props;
        const allShelfs = Object.keys(this.props.shelfs).map(shelf => (
            <Shelf 
                key={shelf} 
                id={shelf} 
                shelfs={shelfs}
                shelfOptionSelected={shelfOptionSelected}
                selectingOption={selectingOption}
                selectMenuDisabled={selectMenuDisabled}
            />
        ));

        return (
            <div className="home-screen">
                {homeLoader ? <Loader /> : (
                    <>
                        {selectMenuDisabled && <Loader className="select-shelf-loader"/>}
                        <div>{allShelfs}</div>
                        <div className="open-search">
                            <Link to="/search"><button>Add a book</button></Link>
                        </div>
                    </>
                )}
            </div>
        )
    }
}

Home.propTypes = {
    shelfs: PropTypes.object.isRequired,
    initializeHomeLoader: PropTypes.func.isRequired,
    handleShelfs: PropTypes.func.isRequired
};
