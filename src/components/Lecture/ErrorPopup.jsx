import React, { useState, useEffect } from 'react';
// import '../../style/css/app.css';
// store
import { useErrorState } from '../../stores/errorState';
// components
import { yieldSecond } from './yieldSecond.jsx';

const ErrorPopup = () => {
	const [ errorState, setErrorState ] = useErrorState();
	const { active, mode, message } = errorState;

	useEffect(
		() => {
			if (active) {
				(async () => {
					await yieldSecond(2000);
					setErrorState({ ...errorState, active: false });
				})();
			}
		},
		[ active ]
	);
	useEffect(() => {}, [ mode ]);

	if (!active) return null;
	if (active)
		return (
			<div id="error-panel">
				<div id="error-popup" className={mode}>
					{message.map((a, i) => (
						<div key={i} className="error-message">
							{a}
						</div>
					))}
				</div>
			</div>
		);
};

export default ErrorPopup;
