import React, { Component } from 'react';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import './App.css';

class App extends Component {
	constructor() {
		super();
		this.state = {
			users: [],
			searchfield: '',
		};
	}

	componentDidMount() {
		fetch('https://jsonplaceholder.typicode.com/users')
			.then((response) => response.json())
			.then((users) => this.setState({ users: users }));
	}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value });
	};

	render() {
		const { users, searchfield } = this.state;
		const filteredUsers = users.filter((user) => {
			return user.name.toLowerCase().includes(searchfield.toLowerCase());
		});
		return !users.length ? (
			<h1 className="tc">Loading...</h1>
		) : (
			<div className="tc">
				<h1 className="f1">Contacts</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<Scroll>
					<CardList users={filteredUsers} />
				</Scroll>
			</div>
		);
	}
}

export default App;
