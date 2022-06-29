import React, { FC } from 'react';
import UploadField from './uploadField/UploadField';
import './common.css';
import Header from './header/Header';


const App: FC = () => {
	return (
		<div className="App">
			<Header />
			<div className="container">
			<UploadField />
			</div>
		</div>
	);
}

export default App;
