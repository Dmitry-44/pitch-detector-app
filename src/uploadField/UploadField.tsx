import React, { MouseEvent } from "react"
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

	constructor (props: uploadFieldPropsType) {
		super(props)
		this.dropArea = React.createRef();
	}

	private dropArea: React.RefObject<HTMLDivElement>

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
			let file = input.files?.[0]
			this.checkFile(file)
		}
	}
	hideStyle = {
		display: 'none'
	}
	playLoadedAudio = () => {
		if(this.state.processing) return;
		const audio = new Audio();
		let url=''
		if(this.state.audio) {
			url = URL.createObjectURL(this.state.audio)
		}
		audio.src=url
		audio.play();
	}

	dropDownHandler = (event: React.DragEvent) => {
		this.allStop(event)
		if(this.dropArea.current?.classList.contains('drop-active')) {
			this.dropArea.current?.classList.remove('drop-active')
		}
		if (!event.dataTransfer?.files?.length) return;
		let file = event.dataTransfer?.files?.[0]
		this.checkFile(file)
	}

	checkFile(file: File) {
		if(!file.type.includes('audio')){
			this.setState({errorText: 'Неверный формат! Выберите файл с расширением .mp3'})
			this.setState({loadedFileName: ''})
			return
		}
		this.setState({errorText: ''})
		let loadedFileName = file.name || '';
		this.setState({audio: file})
		this.setState({loadedFileName: loadedFileName})
	}

	dragOverHandler = (e: React.DragEvent) => {
		this.allStop(e)
		this.dropArea.current?.classList.add('drop-active')
	}

	dragLeaveHandler = (e: React.DragEvent) => {
		this.allStop(e)
		if(this.dropArea.current?.classList.contains('drop-active')) {
			this.dropArea.current?.classList.remove('drop-active')
		}
	}

	allStop = (e: React.DragEvent) => {
		e.preventDefault()
		e.stopPropagation()
	}

	render() {
		return (
			<div className="wrapper">
				<div ref={this.dropArea} className="input_block" onDrop={this.dropDownHandler} onDragLeave={this.dragLeaveHandler} onDragOver={this.dragOverHandler}  >
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
