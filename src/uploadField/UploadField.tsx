import React, { MouseEvent } from "react"
import pitchAnalyser from 'pitch-analyser';
import '../common.css';
import './upload-field.css';

interface uploadFieldPropsType {
}

type uploadFieldStateType = {
	audio: File | null,
	loadedFileName: String,
	processing: Boolean,
	errorText: String
}

class UploadField extends React.Component<uploadFieldPropsType,uploadFieldStateType> {

	state: uploadFieldStateType = {
		audio: null,
		loadedFileName: '',
		processing: false,
		errorText: ''
	}

	onClickHandler = (e: MouseEvent<HTMLSpanElement>) => {
		let input = document.createElement('input');
		input.type = 'file';
		input.click()
		input.onchange=()=>{ 
			if (!input.files?.length) return;
			if(!input.files?.[0].type.includes('audio')){
				this.setState({errorText: 'Неверный формат! Выберите файл с расширением .mp3'})
				return
			}
			this.setState({errorText: ''})
			console.log('input file ', input.files?.[0])
			let loadedFileName = input.files?.[0].name || '';
			let loadedFile = input.files?.[0];
			this.setState({audio: loadedFile})
			this.setState({loadedFileName: loadedFileName})
			console.log('loadedFileName', loadedFileName)
		}
	}
	hideStyle = {
		display: 'none'
	}
	playLoadedAudio= () => {
		console.log('play loaded audio')
		if(this.state.processing) return;
		const audio = new Audio();
		let url=''
		if(this.state.audio) {
			url = URL.createObjectURL(this.state.audio)
		}
		audio.src=url
		audio.play();
		const analyser = new pitchAnalyser({
			returnNote: true,
			microphone: false,
			audioFile: true,
			callback: function(payload: String) {
				console.log(payload); // E.g. { frequency: 220, note: "A3" }
			}
		})

		analyser.initAnalyser().then(() => {
			// Start the analyser after initialisation
			console.log('init analyser')
			analyser.startAnalyser();
		});


		setTimeout(() => {
			analyser.pauseAnalyser();;
			console.log('resume')
		}, 2000)

		// const audioCtx = new AudioContext();
		// const analyser = audioCtx.createAnalyser();
		// console.log('analyser', analyser)
		// // Float32Array should be the same length as the frequencyBinCount
		// const myDataArray = new Float32Array(analyser.frequencyBinCount);
		// console.log('myDataArray', myDataArray)
		// // fill the Float32Array with data returned from getFloatFrequencyData()
		// analyser.getFloatFrequencyData(myDataArray);
		// let fr = analyser.frequencyBinCount
		// console.log('fr', fr)
		// console.log('myDataArray after', myDataArray)

		// let compressor = audioCtx.createDynamicsCompressor();
		// compressor.connect(audioCtx.destination);
		
	}


	render() {
		return (
			<div className="wrapper">
				<div className="input_block">
					<div className="text">
						Перетащите файл или <br/>
						<span className="open-file" onClick={this.onClickHandler}>откройте проводник</span>
					</div>
				</div>
				<p className="input_block-error text-error">
					{this.state.errorText}
				</p>
				<p style={this.state.loadedFileName ? {} : this.hideStyle}>Выбранный файл:<span className="file_name">{this.state.loadedFileName}</span></p>
				<button
					disabled={this.state.audio ? false : true} 
					type="button" 
					className="button-convert"
					onClick={this.playLoadedAudio}
				>
						Detect Frequency
				</button>
			</div>
		)
	}

}


export default UploadField
