import React from 'react';
import './App.css';
import LoanTable from './components/loan_table';

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			loanData: [],
			checkedRows: 0,
			loanCount: 0
		};
	}

	componentDidMount = async () => {
		const res = await fetch('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json');
		const json = await res.json();
		this.setState({ loanData: json });
		this.setState({ loanCount: json.length });
	};

	addDebt = () => {
		const { loanData, loanCount } = this.state;

		const newLoan = {
			id: loanCount + 1,
			creditorName: '',
			firstName: '',
			lastName: '',
			minPaymentPercentage: null,
			balance: null
		};

		this.setState({ loanData: [ ...loanData, newLoan ] });
		this.setState({ loanCount: loanCount + 1 });
	};

	removeDebt = () => {
		const { loanData } = this.state;
		const checkBoxes = document.getElementsByClassName('checkbox');
		const isOneChecked = Array.prototype.slice.call(checkBoxes).some((checkbox) => checkbox.checked);
		const checkedBoxes = Array.prototype.slice.call(checkBoxes).filter((checkbox) => checkbox.checked);
		const rowsToRemove = checkedBoxes.map((checkedBox) => Number(checkedBox.dataset.id));
		if (!isOneChecked) {
			alert('Please select a loan to delete!');
		}

		const data = [ ...loanData ];

		const match = (loanObj) => {
			return !rowsToRemove.includes(loanObj.id);
		};

		const removedLoans = data.filter(match);
		this.setState({ loanData: removedLoans });
		this.setState({ checkedRows: 0 });
	};

	update = (e) => {
		const { loanData } = this.state;

		const data = [ ...loanData ];
		const idx = data.findIndex((obj) => obj.id === Number(e.target.dataset.id));

		data[idx][e.target.dataset.label] = e.target.value;
		this.setState({ loanData: data });
	};

	getTotal = () => {
		const { loanData } = this.state;
		if (!loanData.length) {
			return null;
		}

		let total = 0;

		for (let i = 0; i < loanData.length; i++) {
			let loan = loanData[i];
			if (loan.balance === null) {
				continue;
			} else {
				total += Number(loan.balance);
			}
		}
		return total.toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
	};

	checkBoxCount = (e) => {
		const { checkedRows } = this.state;
		let count = checkedRows;
		if (e.target.checked) {
			count++;
		} else {
			count--;
		}

		this.setState({ checkedRows: count });
	};

	toggleCheckboxes = (e) => {
		const checkBoxes = document.getElementsByClassName('checkbox');
		const { loanData } = this.state;

		if (e.target.checked) {
			for (let i = 0; i < checkBoxes.length; i++) {
				checkBoxes[i].checked = true;
			}
			this.setState({ checkedRows: loanData.length });
		} else {
			for (let i = 0; i < checkBoxes.length; i++) {
				checkBoxes[i].checked = false;
			}
			this.setState({ checkedRows: 0 });
		}
	};

	render() {
		const { loanData, checkedRows } = this.state;
		return (
			<div className='loan'>
				<LoanTable
					loanData={loanData}
					checkboxCount={this.checkBoxCount}
					update={this.update}
					toggleCheckboxes={this.toggleCheckboxes}
				/>
				<div className='options'>
					<button onClick={this.addDebt}>ADD DEBT</button>
					<button onClick={this.removeDebt}>REMOVE DEBT</button>
				</div>
				<div className='balance'>
					<p>Total</p>
					<p>${this.getTotal()}</p>
				</div>
				<div className='count-check'>
					<p>Total Row Count: {loanData.length}</p>
					<p>Check Row Count: {checkedRows}</p>
				</div>
			</div>
		);
	}
}

export default App;
