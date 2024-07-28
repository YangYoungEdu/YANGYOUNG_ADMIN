import React, { useState, useEffect } from 'react';

export const addFormState = {
	state: { active: false, mode: null, name:null, room:null, lectureCode: null, teacher:null, curDate: null, startTime: null, endTime: null , studentList: [], lectureDateList: [],lectureDayList:[] },
	setState(addFormState) {
		this.state = addFormState;
		this.setters.forEach((setter) => setter(this.state));
	},
	setters: []
};

// Bind the setState function to the store object so
// we don't lose context when calling it elsewhere
addFormState.setState = addFormState.setState.bind(addFormState);

// this is the custom hook we'll call on components.
export function useAddFormState() {
	const [ state, set ] = useState(addFormState.state);
	if (!addFormState.setters.includes(set)) {
		addFormState.setters.push(set);
	}
	useEffect(
		() => () => {
			addFormState.setters = addFormState.setters.filter((setter) => setter !== set);
		},
		[]
	);

	return [ state, addFormState.setState ];
}
