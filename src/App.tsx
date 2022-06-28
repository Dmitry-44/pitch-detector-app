import React, { FC } from 'react';
import logo from './logo.svg';
import './common.css';

import Header from './header/Header';
import UploadField from './uploadField/UploadField';

interface AppProps {
  children: any
}

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
