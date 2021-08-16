import React from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

export default function Shelf(props) {
    let requiredShelf = props.shelfs[props.id];
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{requiredShelf.uiName}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {requiredShelf.data.length > 0 ? 
                        requiredShelf.data.map(book => (
                            <li key={Math.random()}>
                                <Book 
                                    book={book}
                                    shelfOptionSelected={props.shelfOptionSelected}
                                    selectingOption={props.selectingOption}
                                    selectMenuDisabled={props.selectMenuDisabled}
                                />
                            </li>
                        )) : <div>There are No {requiredShelf.uiName} Books Here :(</div>
                    }
                </ol>
            </div>
        </div>
    )
}

Shelf.propTypes = {
    shelfs: PropTypes.object.isRequired
};