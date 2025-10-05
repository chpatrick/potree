
import * as THREE from "../../libs/three.js/build/three.module.js";
import {Shaders} from "../../build/shaders/shaders.js";

export class NormalizationMaterial extends THREE.RawShaderMaterial{

	constructor(parameters = {}){
		super();

		let uniforms = {
			uDepthMap:		{ type: 't', value: null },
			uWeightMap:		{ type: 't', value: null },
		};

		this.setValues({
			uniforms: uniforms,
			vertexShader: this.getDefines() + Shaders['normalize.vs'],
			fragmentShader: this.getDefines() + Shaders['normalize.fs'],
		});
	}

	getDefines() {
		let defines = '';

		return defines;
	}

	updateShaderSource() {

		let vs = Shaders['normalize.vs'];
		let fs = Shaders['normalize.fs'];

		let definesString = this.getDefines();

		let vsVersionIndex = vs.indexOf("#version ");
		let fsVersionIndex = fs.indexOf("#version ");

		if (vsVersionIndex >= 0) {
			vs = vs.replace(/(#version .*)/, `$1\n${definesString}`)
		} else {
			vs = `${definesString}\n${vs}`;
		}

		if (fsVersionIndex >= 0) {
			fs = fs.replace(/(#version .*)/, `$1\n${definesString}`)
		} else {
			fs = `${definesString}\n${fs}`;
		}

		this.setValues({
			vertexShader: vs,
			fragmentShader: fs
		});

		this.needsUpdate = true;
	}

}

