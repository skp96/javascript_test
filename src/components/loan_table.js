import React from 'react';

const LoanTable = ({ loanData, checkBoxCount, update, toggleCheckboxes }) => {
	const renderTable = () => {
		if (!loanData.length) {
			return null;
		}

		return loanData.map((loan) => {
			const { id, creditorName, firstName, lastName, minPaymentPercentage, balance } = loan;

			if (loan.id > 10) {
				return (
					<tr key={id}>
						<td className='checkbox-col'>
							<input type='checkbox' className='checkbox' data-id={id} onClick={checkBoxCount} />
						</td>
						<td>
							<input
								type='text'
								value={loan.creditorName}
								data-label='creditorName'
								data-id={id}
								onChange={update}
								className='text-input'
							/>
						</td>
						<td>
							<input
								type='text'
								value={loan.firstName}
								data-label='firstName'
								data-id={id}
								onChange={update}
								className='text-input'
							/>
						</td>
						<td>
							<input
								type='text'
								value={loan.lastName}
								data-label='lastName'
								data-id={id}
								onChange={update}
								className='text-input'
							/>
						</td>
						<td>
							<input
								type='number'
								placeholder='0.00'
								value={loan.minPaymentPercentage}
								data-label='minPaymentPercentage'
								data-id={id}
								onChange={update}
								className='text-input'
							/>
						</td>
						<td>
							<input
								type='number'
								placeholder='0.00'
								value={loan.balance}
								data-label='balance'
								data-id={id}
								onChange={update}
								className='text-input'
							/>
						</td>
					</tr>
				);
			} else {
				return (
					<tr key={id}>
						<td>
							<input type='checkbox' className='checkbox' data-id={id} onClick={checkBoxCount} />
						</td>
						<td className='fetched-data'>{creditorName}</td>
						<td className='fetched-data'>{firstName}</td>
						<td className='fetched-data'>{lastName}</td>
						<td className='fetched-data'>{String(minPaymentPercentage.toFixed(2))}%</td>
						<td className='fetched-data'>{balance.toFixed(2)}</td>
					</tr>
				);
			}
		});
	};

	return (
		<table className='loan-data'>
			<tbody>
				<tr>
					<th>
						<input type='checkbox' onClick={toggleCheckboxes} />
					</th>
					<th>Creditor</th>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Min Pay%</th>
					<th>Balance</th>
				</tr>
				{renderTable()}
			</tbody>
		</table>
	);
};

export default LoanTable;
