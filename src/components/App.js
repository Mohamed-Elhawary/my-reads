import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Search from './Search';
import Home from './Home';
import Header from './Header';
import Footer from './Footer';
import './App.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

class BooksApp extends React.Component {
	state = {
		homeLoader: false,
		searchLoader: false,
		selectMenuDisabled: false,
		books: [],
		shelfs: {
			currentlyReading: {
				name: "currentlyReading",
				uiName: "Currently Reading",
				data: []
			},
			wantToRead: {
				name: "wantToRead",
				uiName: "Want to Read",
				data: []
			},
			read: {
				name: "read",
				uiName: "Read",
				data: []
			}
		}
	}

	selectingOption = () => {
		this.setState({
			selectMenuDisabled: true
		});
	}

	initializeHomeLoader = () => {
		this.setState({homeLoader: true});
	}

	initializeSearchLoader = () => {
		this.setState({searchLoader: true});
	}

	setBooks = (books) => {
		this.setState({
			books,
			searchLoader: false
		});
	}

	resetBooks = () => {
		this.setState({
			books: [],
			searchLoader: false
		});
	}

	handleShelfs = (fetchedBooks) => {
		let clonedShelfs = this.state.shelfs;
		this.setState({
			books: fetchedBooks
		});

		fetchedBooks.map(book => {
			const bookShelf = book.shelf;
			if(this.state.shelfs[bookShelf].name === bookShelf) {
				let clonedShelf = clonedShelfs[bookShelf];
				clonedShelf.data.push(book);
				clonedShelfs = {
					...clonedShelfs,
					[bookShelf]: clonedShelf
				}
				this.setState({
					...this.state,
					shelfs: clonedShelfs
				});
			}
		});

		this.setState({
			homeLoader: false,
		});
	}

	shelfOptionSelected = (book, shelf) => {
		let clonedShelfs = this.state.shelfs;
		if(book.shelf && book.shelf !== "none") {
			let	oldShelf = book.shelf,
			clonedOldShelf = clonedShelfs[oldShelf],
			filteredClonedOldShelfArray = clonedOldShelf.data.filter(shelfBook => book.id !== shelfBook.id);
		
			clonedOldShelf = {
				...clonedOldShelf,
				data: filteredClonedOldShelfArray
			};
			
			book.shelf = shelf;

			if(shelf !== "none") {
				let clonedNewShelf = clonedShelfs[shelf];
				clonedNewShelf.data.push(book);
				
				clonedShelfs = {
					...clonedShelfs,
					[oldShelf]: clonedOldShelf,
					[shelf]: clonedNewShelf
				}
			} else {
				clonedShelfs = {
					...clonedShelfs,
					[oldShelf]: clonedOldShelf
				}
			}
		}

		let clonedBooks = this.state.books;
		let requiredBook = clonedBooks.find(clonedBook => book.id === clonedBook.id);
		requiredBook.shelf = shelf;

		this.setState({
			...this.state,
			shelfs: clonedShelfs,
			selectMenuDisabled: false,
			books: clonedBooks
		});
	}

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Header />
					<Switch>
						<Route exact path="/">
							<Home 
								shelfs={this.state.shelfs} 
								resetBooks={this.resetBooks}
								handleShelfs={this.handleShelfs}
								initializeHomeLoader={this.initializeHomeLoader}
								homeLoader={this.state.homeLoader}
								shelfOptionSelected={this.shelfOptionSelected}
								selectingOption={this.selectingOption}
								selectMenuDisabled={this.state.selectMenuDisabled}
							/>
						</Route>  
						<Route exact path="/search">
							<Search 
								books={this.state.books}
								shelfOptionSelected={this.shelfOptionSelected}
								selectingOption={this.selectingOption}
								selectMenuDisabled={this.state.selectMenuDisabled}
								resetBooks={this.resetBooks}
								setBooks={this.setBooks}
								initializeSearchLoader={this.initializeSearchLoader}
								searchLoader={this.state.searchLoader}
							/>
						</Route>  
					</Switch>  
					<Footer />  
				</div>
			</BrowserRouter>
		)
	}
}

export default BooksApp
