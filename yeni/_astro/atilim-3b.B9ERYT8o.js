import{A as e,B as t,C as n,D as r,E as i,F as a,G as o,H as s,I as c,J as l,K as u,L as d,N as f,O as p,P as m,Q as h,R as g,T as _,U as v,X as y,Y as b,Z as x,_ as S,a as C,b as w,c as T,d as E,f as D,g as ee,i as te,j as ne,l as re,m as ie,n as ae,o as oe,p as se,q as ce,r as le,s as ue,t as de,u as fe,v as pe,w as me,y as he,z as ge}from"./meshopt_decoder.module.BclDyN1s.js";import{a as _e,i as ve,n as ye,o as be,r as xe,s as O,t as Se}from"./AtilimSayfa.astro_astro_type_script_index_0_lang.BR3fF51y.js";var Ce={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},we=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Te=new f(-1,1,1,-1,0,1),Ee=new class extends T{constructor(){super(),this.setAttribute(`position`,new S([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new S([0,2,0,0,2,0],2))}},De=class{constructor(e){this._mesh=new r(Ee,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Te)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Oe=class extends we{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof v?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=b.clone(e.uniforms),this.material=new v({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new De(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},ke=class extends we{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},Ae=class extends we{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},je=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new y);this._width=n.width,this._height=n.height,t=new h(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:w}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Oe(Ce),this.copyPass.material.blending=0,this.timer=new ce}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}ke!==void 0&&(r instanceof ke?n=!0:r instanceof Ae&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Me=class extends we{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new E}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Ne={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new E(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},Pe=class e extends we{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new y(256,256):new y(e.x,e.y),this.clearColor=new E(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new h(i,a,{type:w,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new h(i,a,{type:w,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new h(i,a,{type:w,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),a=Math.round(a/2)}let o=Ne;this.highPassUniforms=b.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new v({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];let s=[6,10,14,18,22];i=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(s[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new y(1/i,1/a),i=Math.round(i/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=b.clone(Ce.uniforms),this.blendMaterial=new v({uniforms:this.copyUniforms,vertexShader:Ce.vertexShader,fragmentShader:Ce.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new E,this._oldClearAlpha=1,this._basic=new p,this._fsQuad=new De(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new y(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new v({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new y(.5,.5)},direction:{value:new y(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new v({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};Pe.BlurDirectionX=new y(1,0),Pe.BlurDirectionY=new y(0,1);var Fe={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`},Ie=class extends we{constructor(){super(),this.isOutputPass=!0,this.uniforms=b.clone(Fe.uniforms),this.material=new g({name:Fe.name,uniforms:this.uniforms,vertexShader:Fe.vertexShader,fragmentShader:Fe.fragmentShader}),this._fsQuad=new De(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},D.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Le=class extends T{constructor(e=new r,t=new x,n=new ee,a=new x(1,1,1)){super();let o=[],s=[],c=[],l=new x,u=new _().getNormalMatrix(e.matrixWorld),d=new i;d.makeRotationFromEuler(n),d.setPosition(t);let f=new i;f.copy(d).invert(),p(),this.setAttribute(`position`,new S(o,3)),this.setAttribute(`uv`,new S(c,2)),s.length>0&&this.setAttribute(`normal`,new S(s,3));function p(){let t=[],n=new x,r=new x,i=e.geometry,u=i.attributes.position,f=i.attributes.normal;if(i.index!==null){let e=i.index;for(let i=0;i<e.count;i++)n.fromBufferAttribute(u,e.getX(i)),f?(r.fromBufferAttribute(f,e.getX(i)),m(t,n,r)):m(t,n)}else{if(u===void 0)return;for(let e=0;e<u.count;e++)n.fromBufferAttribute(u,e),f?(r.fromBufferAttribute(f,e),m(t,n,r)):m(t,n)}t=h(t,l.set(1,0,0)),t=h(t,l.set(-1,0,0)),t=h(t,l.set(0,1,0)),t=h(t,l.set(0,-1,0)),t=h(t,l.set(0,0,1)),t=h(t,l.set(0,0,-1));for(let e=0;e<t.length;e++){let n=t[e];c.push(.5+n.position.x/a.x,.5+n.position.y/a.y),n.position.applyMatrix4(d),o.push(n.position.x,n.position.y,n.position.z),n.normal!==null&&s.push(n.normal.x,n.normal.y,n.normal.z)}}function m(t,n,r=null){n.applyMatrix4(e.matrixWorld),n.applyMatrix4(f),r?(r.applyNormalMatrix(u),t.push(new Re(n.clone(),r.clone()))):t.push(new Re(n.clone()))}function h(e,t){let n=[],r=.5*Math.abs(a.dot(t));for(let i=0;i<e.length;i+=3){let a=0,o,s,c,l,u=e[i+0].position.dot(t)-r,d=e[i+1].position.dot(t)-r,f=e[i+2].position.dot(t)-r,p=u>0,m=d>0,h=f>0;switch(a=+!!p+ +!!m+ +!!h,a){case 0:n.push(e[i]),n.push(e[i+1]),n.push(e[i+2]);break;case 1:if(p&&(o=e[i+1],s=e[i+2],c=g(e[i],o,t,r),l=g(e[i],s,t,r)),m){o=e[i],s=e[i+2],c=g(e[i+1],o,t,r),l=g(e[i+1],s,t,r),n.push(c),n.push(s.clone()),n.push(o.clone()),n.push(s.clone()),n.push(c.clone()),n.push(l);break}h&&(o=e[i],s=e[i+1],c=g(e[i+2],o,t,r),l=g(e[i+2],s,t,r)),n.push(o.clone()),n.push(s.clone()),n.push(c),n.push(l),n.push(c.clone()),n.push(s.clone());break;case 2:p||(o=e[i].clone(),s=g(o,e[i+1],t,r),c=g(o,e[i+2],t,r),n.push(o),n.push(s),n.push(c)),m||(o=e[i+1].clone(),s=g(o,e[i+2],t,r),c=g(o,e[i],t,r),n.push(o),n.push(s),n.push(c)),h||(o=e[i+2].clone(),s=g(o,e[i],t,r),c=g(o,e[i+1],t,r),n.push(o),n.push(s),n.push(c))}}return n}function g(e,t,n,r){let i=e.position.dot(n)-r,a=i/(i-(t.position.dot(n)-r)),o=new x(e.position.x+a*(t.position.x-e.position.x),e.position.y+a*(t.position.y-e.position.y),e.position.z+a*(t.position.z-e.position.z)),s=null;return e.normal!==null&&t.normal!==null&&(s=new x(e.normal.x+a*(t.normal.x-e.normal.x),e.normal.y+a*(t.normal.y-e.normal.y),e.normal.z+a*(t.normal.z-e.normal.z))),new Re(o,s)}}},Re=class{constructor(e,t=null){this.position=e,this.normal=t}clone(){let e=this.position.clone(),t=this.normal===null?null:this.normal.clone();return new this.constructor(e,t)}},ze=new x;function k(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;ze.copy(t),ze[r]=0,ze.normalize();let l=.5*o/(o+s),u=1-ze.angleTo(e)/c;return Math.sign(ze[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Be=class e extends oe{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new x,c=new x,l=new x(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new x,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=k(m,c,`z`,`y`,i,n),f[a+1]=1-k(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-k(m,c,`z`,`y`,i,n),f[a+1]=1-k(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-k(m,c,`x`,`z`,i,e),f[a+1]=k(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-k(m,c,`x`,`z`,i,e),f[a+1]=1-k(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-k(m,c,`x`,`y`,i,e),f[a+1]=1-k(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=k(m,c,`x`,`y`,i,e),f[a+1]=1-k(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},A=document.documentElement.dataset.motion===`reduce`,j=document.querySelector(`#sahne`).querySelector(`.kafes`),Ve=j.querySelector(`canvas.uc`),He=[...j.querySelectorAll(`[data-parca]`)],Ue=j.querySelector(`.cizgiler path`),We=[...j.querySelectorAll(`.metin`)],M=document.querySelector(`#protokol`),Ge=M?.querySelector(`.dci`)??null,Ke=[...document.querySelectorAll(`[data-ortu]`)],N={rZ:.32,anahtar:[40,24,22],anahtarRenk:15002879,anahtarGuc:1.9,k1:280,k1Renk:13624258,k2:260,k2Renk:14674175,yesil:280},qe=new c(8367701,0,0,2),Je=new E(2381823),Ye=new E(N.k1Renk),Xe=new E(4025343),Ze=new E(N.k2Renk),Qe=new E(16773602),$e=new E(N.anahtarRenk),P={x:0,y:0,var:!1},F;try{F=new te({canvas:Ve,antialias:!1,alpha:!0,powerPreference:`high-performance`})}catch{throw j.classList.add(`webgl-yok`),Error(`WebGL yok: yedek görsel`)}var et=innerWidth<760,tt=et?1.5:2;F.setPixelRatio(Math.min(devicePixelRatio,tt)),F.toneMapping=4,F.toneMappingExposure=.92,F.outputColorSpace=t,F.setClearColor(0,0);function nt(e=!1){let t=new s,n=new r(new oe(60,40,60),new p({color:131847,side:1}));t.add(n);let i=(e,n,i,o,s,c)=>{let l=new r(new a(e,n),new p({color:new E(i).multiplyScalar(o),side:2}));l.position.set(...s),l.lookAt(...c),t.add(l)};return i(26,14,16777215,1.6,[4,18,6],[0,0,0]),i(3,30,16774378,2.4,[18,2,10],[0,0,0]),i(2.4,30,e?14673646:6129407,e?1.6:3,[-18,0,6],[0,0,0]),i(40,2.2,e?13226716:4025343,e?1.2:2.2,[0,-6,-22],[0,0,0]),i(16,7,16777215,.7,[0,7,24],[0,0,0]),i(34,4,14673663,1,[0,-12,16],[0,0,0]),e&&i(12,44,15331060,.95,[-13,3,21],[0,0,0]),t}var I=new s,rt=new le(F),it=rt.fromScene(nt(),.02).texture,at=null;I.environment=it,I.environmentIntensity=.72;var L=new m(24,1,.5,3200),R=new ie(16773602,1.6);R.position.set(16,22,24),I.add(R);var ot=new c(2381823,1300,0,2);I.add(ot);var st=new c(4025343,800,0,2);I.add(st),I.add(qe);var ct={celik:()=>new e({color:12172998,metalness:1,roughness:.22}),celik_parlak:()=>new e({color:14080478,metalness:1,roughness:.1}),celik_koyu:()=>new e({color:5988714,metalness:1,roughness:.3}),plastik:()=>new e({color:723983,metalness:0,roughness:.38,clearcoat:.6,clearcoatRoughness:.35}),bakir:()=>new e({color:14256734,metalness:1,roughness:.24})},z=new he;I.add(z),z.rotation.order=`YXZ`;var lt=new he;z.add(lt);var B=[],ut=[`konnektor`,`valf`,`govde`,`pul`,`yay`,`igne`,`meme`,`somun`,`bakir`],dt=new Set([`pul`,`bakir`]),ft=0,pt=!1,mt=30,ht=0,gt=1.2;function _t(n){let i=document.createElement(`canvas`);i.width=512,i.height=256;let a=i.getContext(`2d`);a.fillStyle=`rgba(0,0,0,0)`,a.fillRect(0,0,512,256),a.fillStyle=`#ffffff`,a.textAlign=`center`,a.font=`600 58px "Hubot Sans Variable", system-ui, sans-serif`,a.fillText(`ATILIM DİZEL`,256,110),a.font=`500 36px "Hubot Sans Variable", system-ui, sans-serif`,a.fillText(`ÇORLU 1987`,256,168);let o=new re(i);o.colorSpace=t,o.anisotropy=4;let s=new e({color:2895927,metalness:.7,roughness:.55,alphaMap:o,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4});n.updateMatrixWorld(!0);let c=new C().setFromObject(n),l=new Le(n,new x(0,c.min.y+(c.max.y-c.min.y)*.44,.93),new ee(0,0,-Math.PI/2),new x(3.6,1.8,1.2));l.applyMatrix4(n.matrixWorld.clone().invert());let u=new r(l,s);n.add(u)}new ae().setMeshoptDecoder(de).load(`${`/yeni`.replace(/\/?$/,`/`)}model/enjektor2-m.glb`,e=>{let t=e.scene;t.traverse(e=>{let t=e;t.isMesh&&(t.material=(ct[t.material.name]??ct.celik)())}),ut.forEach((e,n)=>{let r=t.getObjectByName(e);if(!r)return;let i=[];r.traverse(e=>{let t=e;t.isMesh&&(i.push(t.material),t.castShadow=!0)}),B.push({ad:e,nesne:r,taban:r.position.clone(),hedef:0,ms:i,sira:n,r:1}),lt.add(r)});let n;B.find(e=>e.ad===`govde`)?.nesne.traverse(e=>{let t=e;t.isMesh&&t.geometry.attributes.position&&(!n||t.geometry.attributes.position.count>n.geometry.attributes.position.count)&&(n=t)}),n&&document.fonts?.ready.then(()=>_t(n));let r=new C().setFromObject(lt);r.max.y-r.min.y;let i=B.map(e=>(r.setFromObject(e.nesne),r.max.y-r.min.y)),a=.5;mt=i.reduce((e,t)=>e+t,0)+a*(B.length-1);let o=mt/2;B.forEach((e,t)=>{e.hedef=o-i[t]/2-e.taban.y,o-=i[t]+a});for(let e of B)r.setFromObject(e.nesne),e.r=Math.max(r.max.x-r.min.x,r.max.z-r.min.z)/2;gt=Math.max(...B.map(e=>e.r)),r.setFromObject(B.find(e=>e.ad===`meme`).nesne),ft=r.min.y,r.setFromObject(lt),(r.max.y+r.min.y)/2,Ut(),wt(),pt=!0,ht=performance.now(),Sn=!0,M?.classList.add(`uc`),j.classList.add(`yuklu`)},void 0,()=>j.classList.add(`webgl-yok`));var vt=null,yt=null,bt={zaman:{value:0},acik:{value:1},olcek:{value:1},T:{value:ve.T},duvar:{value:999}},xt=7;function St(e,t,n){let r=new T,i=e*t,a=new Float32Array(i*3),o=new Float32Array(i*3),s=new Float32Array(i),c=new Float32Array(i),l=new Float32Array(i),u=new Float32Array(i),d=new x,f=new x;for(let r=0;r<e;r++){let e=r%xt/xt*Math.PI*2+(Math.random()-.5)*(n?.03:.12),i=me.degToRad(72+(Math.random()-.5)*(n?1.6:9));d.set(Math.sin(i)*Math.cos(e),-Math.cos(i),Math.sin(i)*Math.sin(e)),f.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).cross(d).normalize();let p=Math.random()<.15?Math.random()*ve.pilot[1]:ve.ana[0]+Math.random()*(ve.ana[1]-ve.ana[0]),m=.75+Math.random()*.5,h=Math.random();for(let e=0;e<t;e++){let n=r*t+e;a.set([d.x,d.y,d.z],n*3),o.set([f.x,f.y,f.z],n*3),s[n]=p,c[n]=m,l[n]=h,u[n]=e}}return r.setAttribute(`position`,new ue(new Float32Array(i*3),3)),r.setAttribute(`yon`,new ue(a,3)),r.setAttribute(`yan`,new ue(o,3)),r.setAttribute(`dogus`,new ue(s,1)),r.setAttribute(`hiz`,new ue(c,1)),r.setAttribute(`boy`,new ue(l,1)),r.setAttribute(`uc`,new ue(u,1)),r}var Ct=`attribute vec3 yon; attribute vec3 yan; attribute float dogus; attribute float hiz; attribute float boy; attribute float uc;
  uniform float zaman; uniform float olcek; uniform float T; uniform float duvar; varying float vA; varying float vT;`;function wt(){yt=new n(St(et?8e3:14e3,2,!0),new v({uniforms:bt,transparent:!0,depthWrite:!1,blending:2,vertexShader:`${Ct}
      void main(){
        float yas0 = mod(zaman / T - dogus, 1.0) * T;
        float yas = max(0.0, yas0 - (1.0 - uc) * (0.006 + boy * 0.008));
        float omur = 0.08 + boy * 0.07; float t = clamp(yas0 / omur, 0.0, 1.0);
        float yol = yas * 92.0 * hiz;
        vec3 p = yon * yol + yan * yol * (0.015 + 0.035 * boy * boy);
        float rr = length(p.xz); if (rr > duvar) p.xz *= duvar / rr;   // jet camda durur
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        vA = (yas0 < omur ? 1.0 : 0.0) * smoothstep(0.0, 0.012, yas0) * pow(1.0 - t, 1.6) * mix(0.2, 1.0, uc) * (rr > duvar ? 0.35 : 1.0); vT = t;
      }`,fragmentShader:`uniform float acik; varying float vA; varying float vT;
      void main(){ float a = vA * acik * 0.75; gl_FragColor = vec4(mix(vec3(1.), vec3(.75,.85,1.), vT) * a, a); }`})),vt=new d(St(et?3500:6e3,1,!1),new v({uniforms:bt,transparent:!0,depthWrite:!1,blending:2,vertexShader:`${Ct}
      void main(){
        float yas = mod(zaman / T - dogus, 1.0) * T;
        float omur = 0.8 + boy * 0.6; float t = clamp(yas / omur, 0.0, 1.0);
        float yol = (1.0 - exp(-yas * 5.5)) * 13.0 * hiz;
        vec3 p = yon * yol + yan * yol * (0.06 + 0.1 * boy); p.y -= yas * yas * 2.2;
        p += normalize(vec3(sin(boy*91.0), cos(boy*37.0), sin(boy*13.0))) * pow(t, 1.3) * 2.4;
        float rr = length(p.xz); if (rr > duvar * .96) p.xz *= duvar * .96 / rr; p.y = max(p.y, -7.2);   // sis uçtan en çok 7 birim öteye çöker
        vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_Position = projectionMatrix * mv;
        float sz = 6.0 + t * 44.0;
        gl_PointSize = sz * olcek * (60.0 / -mv.z);
        vA = (yas < omur ? 1.0 : 0.0) * smoothstep(0.0, 0.05, yas) * (1.0 - t) / (1.0 + t * 2.5); vT = t;
      }`,fragmentShader:`uniform float acik; varying float vA; varying float vT;
      void main(){ vec2 d = gl_PointCoord - .5; float r = dot(d,d); if (r > .25) discard;
        float a = exp(-r * 14.0) * vA * acik * 0.24; vec3 c = mix(vec3(.85,.92,1.), vec3(.28,.45,1.), vT);
        gl_FragColor = vec4(c * a, a); }`}));for(let e of[yt,vt])e.frustumCulled=!1,e.position.y=ft-.05,lt.add(e)}var Tt=Math.min(4,F.capabilities.maxSamples),Et=new h(1,1,{type:w,samples:Tt}),Dt=new je(F,Et);Dt.addPass(new Me(I,L));var Ot=new Pe(new y(1,1),.16,.5,.92);Dt.addPass(Ot);var kt=new Oe({uniforms:{tDiffuse:{value:null},uMerkez:{value:new y(.5,.5)},uYaricap:{value:new y(.6,.6)},uAlt:{value:0}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform sampler2D tDiffuse; uniform vec2 uMerkez; uniform vec2 uYaricap; uniform float uAlt; varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float d = length((vUv - uMerkez) / uYaricap);
      float f = 1.0 - smoothstep(0.5, 1.15, d);
      f *= mix(1.0 - uAlt, 1.0, smoothstep(0.02, 0.4, vUv.y));
      gl_FragColor = vec4(c.rgb * f, c.a);
    }`});Dt.addPass(kt),Dt.addPass(new Ie);function At(e,n,r,i){let a=document.createElement(`canvas`);a.width=e,a.height=n,r(a.getContext(`2d`));let o=new re(a);return o.colorSpace=t,o.wrapS=o.wrapT=ge,o.repeat.set(...i),o.anisotropy=8,o}var jt=(()=>{let e=11;return()=>(e=e*16807%2147483647)/2147483647})();F.shadowMap.enabled=!0,F.shadowMap.type=2,R.castShadow=!0,R.shadow.mapSize.set(et?1024:2048,et?1024:2048),R.shadow.bias=-5e-4,R.shadow.normalBias=.03,I.add(R.target),I.fog=new pe(197900,80,260);var Mt=new u(15856895,0,0,.62,.9,0);I.add(Mt,Mt.target);var Nt=-11,Pt=[0,100,200],Ft={merkez:{value:new y(0,0)},yaricap:{value:40}};function It(e){return e.onBeforeCompile=e=>{e.uniforms.uIsikMerkez=Ft.merkez,e.uniforms.uIsikR=Ft.yaricap,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vDunya;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vDunya = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vDunya; uniform vec2 uIsikMerkez; uniform float uIsikR;`).replace(`#include <fog_fragment>`,`gl_FragColor.rgb *= 1.0 - smoothstep(uIsikR * 0.25, uIsikR, distance(vDunya.xz, uIsikMerkez));
#include <fog_fragment>`)},e}var Lt=At(1024,1024,e=>{e.fillStyle=`#242b36`,e.fillRect(0,0,1024,1024);for(let t=0;t<1400;t++)e.fillStyle=`rgba(200,210,235,${(.015+jt()*.025).toFixed(3)})`,e.fillRect(0,Math.floor(jt()*1024),1024,1)},[60,60]),Rt=new r(new a(2400,2400),It(new ne({map:Lt,roughness:.5,metalness:.55,envMapIntensity:.55})));Rt.rotation.x=-Math.PI/2,Rt.position.set(100,Nt,-20),Rt.receiveShadow=!0,I.add(Rt);var zt=At(1024,1024,e=>{e.fillStyle=`#26303f`,e.fillRect(0,0,1024,1024);for(let t=0;t<=16;t++){let n=t*64;e.fillStyle=t%5==0?`rgba(170,190,230,.24)`:`rgba(150,170,215,.1)`;let r=t%5==0?3:1.5;e.fillRect(n-r/2,0,r,1024),e.fillRect(0,n-r/2,1024,r)}},[600/32,600/32]),Bt=new r(new a(600,600),It(new ne({map:zt,roughness:.8,metalness:.05,envMapIntensity:.5})));Bt.rotation.x=-Math.PI/2,Bt.position.set(Pt[1],-10.75,0),Bt.receiveShadow=!0,I.add(Bt);var Vt=new he;I.add(Vt);var Ht=[];function Ut(){let t=new e({color:9278364,metalness:1,roughness:.3}),n=new e({color:3159357,metalness:.85,roughness:.42}),i=new e({color:4870233,metalness:.95,roughness:.34}),a=new e({color:855569,metalness:0,roughness:.45,clearcoat:.4,clearcoatRoughness:.4}),o=At(128,128,e=>{e.fillStyle=`#c9a86a`,e.fillRect(0,0,128,128),e.strokeStyle=`#5b4524`,e.lineWidth=3;for(let t=-128;t<256;t+=12)e.beginPath(),e.moveTo(t,0),e.lineTo(t+128,128),e.stroke(),e.beginPath(),e.moveTo(t+128,0),e.lineTo(t,128),e.stroke()},[5,3]),s=new e({color:16777215,map:o,metalness:1,roughness:.34}),c=new e({color:2381823,metalness:0,roughness:.32,clearcoat:.6,clearcoatRoughness:.3}),u=new e({color:14673390,metalness:0,roughness:.22,transparent:!0,opacity:.8,clearcoat:1}),d=new e({color:12858154,metalness:0,roughness:.38,clearcoat:.5}),f=new e({color:1842980,metalness:0,roughness:.38,clearcoat:.5}),p=e=>(e.traverse(e=>{e.castShadow=!0,e.receiveShadow=!0}),Vt.add(e),e),m=(e,t,n,i=.12)=>{let a=p(new r(new Be(...e,3,i),n));return a.position.set(...t),a},h=(e,t,n,i=32)=>new r(new se(e,e,t,i),n),g=(e,t,n,i=96)=>p(new r(new l(new fe(e.map(e=>new x(e[0],e[1],e[2]))),i,t,16,!1),n)),_=(e,t,n)=>(e.position.copy(t),e.quaternion.setFromUnitVectors(new x(0,1,0),n.clone().normalize()),p(e));Ht.push(m([3,3.8,3],[0,-9.1,0],i,.18)),m([4.6,.5,2.6],[0,-6.95,0],n);for(let e of[-1.75,1.75])p(h(.34,.42,t,6)).position.set(e,-6.5,0);let v=p(h(.3,.7,t,6));v.rotation.z=Math.PI/2,v.position.set(-1.8,-9.9,0);let y=new x(Math.sin(me.degToRad(50)),Math.cos(me.degToRad(50)),0),b=new x(.62,3.75,0);_(h(.62,1.1,t,6),b.clone().addScaledVector(y,2.15),y);let S=b.clone().addScaledVector(y,2.7),C=b.clone().addScaledVector(y,4.1);g([[S.x,S.y,0],[C.x,C.y,0],[4.7,7.9,0],[5.4,10.4,0],[6.2,13.2,0]],.22,t);let w=new x(6.2-5.4,13.2-10.4,0).normalize(),T=new x(6.2,13.2,0);_(h(.5,.7,t,6),T.clone().addScaledVector(w,.2),w),_(h(.34,.6,t,24),T.clone().addScaledVector(w,.8),w),_(h(.5,.7,t,6),T.clone().addScaledVector(w,1.4),w);let E=T.clone().addScaledVector(w,1.7);g([[E.x,E.y,0],[E.x+w.x*2,E.y+w.y*2,0],[8.4,22,.6],[10,34,1.2],[11,48,1.6]],.42,c,64),m([1.5,1.44,1.3],[2.85,9.12,0],a),m([.6,.22,.7],[2.6,9.95,0],a);let D=p(h(.36,.7,a,24));D.rotation.z=Math.PI/2,D.position.set(3.95,9.12,0);for(let[e,t]of[[.13,d],[-.13,f]])g([[4.25,9.12,e],[4.9,8.7,e],[5.5,5.4,e+.2],[5.75,.5,e+.45],[5.5,-4.8,e+.7],[4.95,-8.6,e+.9],[4.7,-9.6,e+1.05]],.075,t,120);m([.95,1.3,.95],[4.7,-10.35,1.05],a);let ee=p(h(.44,2,s,48));ee.position.set(0,11.55,0),Ht.push(ee),p(h(.38,.2,c,32)).position.set(0,12.65,0),g([[0,12.7,0],[0,18,0],[.4,28,-.4],[1.2,48,-1]],.3,u,64)}var Wt={duman:[`igne`,`meme`],gec:[`valf`],cekis:[`meme`,`valf`],yakit:[`meme`,`igne`],bakim:ut,saglam:[]},Gt=document.querySelector(`.teshis`)?.dataset.secim??``,Kt=Wt[Gt]??[];addEventListener(`atilim-belirti`,e=>{Gt=e.detail,Kt=Wt[Gt]??[]});var V=Number(j.dataset.durak??0);addEventListener(`atilim-durak`,e=>{V=e.detail}),addEventListener(`atilim-adim`,e=>{e.detail});var qt={x:.5,y:.5,aktif:!1},Jt={x:.5,y:.5};addEventListener(`pointermove`,e=>{qt.x=e.clientX/innerWidth,qt.y=e.clientY/innerHeight,qt.aktif=!0},{passive:!0});var Yt=e=>(e=be(e),1+2.6*(e-1)**3+1.6*(e-1)**2),H=me.lerp,U=Math.tan(me.degToRad(12)),W=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n/r)),Xt=new Map,Zt=(e,t,n,r)=>{let i=W(Xt.get(e)??0,t,n,r);return Xt.set(e,i),i},G=new x,K=new C;new x,new x;var Qt=Math.PI+.45,$t=.6,q=innerWidth/innerHeight>1.02,J=1,Y=1,en=[0,1,2].map(()=>({P:new x,rX:0,rY:0,rZ:0,b:0,a:0,T:new x,e:.1,Hv:30}));function tn(e,t,n,r,i){let a=Math.cos(lt.rotation.y),o=Math.sin(lt.rotation.y),s=-(gt-e.r)*t,c=0,l=0;q?(c=s+1.7*n-.5*r,l=.7*n+3.2*r):(c=-.5*r,l=s+1.7*n+3.2*r),e.nesne.position.set(e.taban.x+c*a-l*o,e.taban.y+e.hedef*t,e.taban.z+c*o+l*a);let u=dt.has(e.ad)?Math.PI/2*t*(1-n*.4):0;e.nesne.rotation.set(q?r*.12:u,A?0:n*i*.6+r*i*.5,q?u:0)}function nn(e,t,n,r,i){z.position.copy(e),z.rotation.set(t,n,r),lt.rotation.y=i}var rn=new x,an=new x,on=new x,sn=new x,cn=new x,X={P:new x,rX:0,rY:0,rZ:0,b:0,fy:.6,sure:2.2};function ln(e,t,n,r){let i=J/Y,a=(n[0]+n[1])/2,o=(r[0]+r[1])/2;rn.set(1,0,0),an.set(0,Math.cos(t.e),-Math.sin(t.e)),on.set(0,-Math.sin(t.e),-Math.cos(t.e));let s=new x;K.makeEmpty(),e.forEach(e=>K.expandByPoint(e)),K.getCenter(s).negate(),t.Hv=30;for(let c=0;c<12;c++){sn.copy(on).multiplyScalar(-t.Hv/(2*U));let c=1/0,l=-1/0,u=1/0,d=-1/0,f=0;for(let t of e){cn.copy(t).add(s).sub(sn);let n=cn.dot(on);f+=n/e.length;let r=(cn.dot(rn)/(n*U*i)+1)/2,a=(1-cn.dot(an)/(n*U))/2;c=Math.min(c,r),l=Math.max(l,r),u=Math.min(u,a),d=Math.max(d,a)}t.Hv*=Math.max((l-c)/(n[1]-n[0]),(d-u)/(r[1]-r[0]));let p=2*U*f;s.addScaledVector(rn,(a-(c+l)/2)*p*i).addScaledVector(an,((u+d)/2-o)*p)}t.T.copy(s).negate()}function un(e){I.updateMatrixWorld(!0),K.makeEmpty();for(let t of e)K.expandByObject(t);return Array.from({length:8},(e,t)=>new x(t&1?K.max.x:K.min.x,t&2?K.max.y:K.min.y,t&4?K.max.z:K.min.z))}var dn=[1/0,1/0,1/0],fn=[0,1,0,1],pn=[0,1,0,1],mn=document.querySelector(`[data-ust]`);function hn(e){let t=We[e],n=((mn?.offsetHeight??72)+(q?12:8))/Y;if(dn[e]=Math.min(dn[e],t.offsetTop),!q)return[.05,.95,n,Math.max(n+.25,(dn[e]-14)/Y)];let r=Math.min(t.offsetLeft,J-t.offsetLeft-t.offsetWidth)/J,i=Math.max(.03,r-.01),a=Math.min(.97,1-r+.01);return t.offsetWidth>J*(1-2*r)*.7?[Math.max(.04,r),Math.min(.96,1-r),n,Math.max(n+.25,(dn[e]-20)/Y)]:t.offsetLeft+t.offsetWidth/2<J/2?[(t.offsetLeft+t.offsetWidth+32)/J,a,n,.97]:[i,Math.max(i+.27,(t.offsetLeft-32)/J),n,.97]}function gn(){q=innerWidth/innerHeight>1.02;let e=B.map(e=>e.nesne),[t,n,r]=en;t.P.set(Pt[0],0,0),t.rX=0,t.rY=0,t.rZ=0,t.b=Qt,t.a=0,t.e=q?.2:.24,n.P.set(Pt[1],Nt+gt,0),n.rX=q?0:-Math.PI/2,n.rY=q?0:.74,n.rZ=q?Math.PI/2:0,n.b=$t,n.a=1,n.e=q?.5:1.05,r.P.copy(n.P).add(G.set(0,26,0)),r.rX=.12,r.rY=0,r.rZ=N.rZ,r.b=Qt,r.a=0,r.e=.2;let i=hn(0),a=hn(1);fn=a,pn=i;let s=(e,t,n,r)=>{let i=e[1]-e[0],a=e[3]-e[2];return[[e[0]+i*t,e[1]-i*t],[e[2]+a*n,e[3]-a*r]]};nn(t.P,t.rX,t.rY,t.rZ,t.b),B.forEach(e=>tn(e,0,0,0,0));{let[n,r]=s(i,.12,.02,0);ln(un([...e,...Ht]),t,n,r)}nn(n.P,n.rX,n.rY,n.rZ,n.b),B.forEach(e=>tn(e,1,0,0,0));{let[t,r]=q?s(a,.12,.26,.22):s(a,.08,.06,.06);ln(un(e),n,t,r)}let c=Se(Ge);if(c&&M){let t=j.getBoundingClientRect(),n=ye(c),i=M.getBoundingClientRect().top;P.x=n.x-t.left,P.y=n.y-i,P.var=n.w>40;let[a,s,l,u]=xe(q?c.dataset.hedef:c.dataset.hedefTel),d=[(P.x+n.w*a)/J,(P.x+n.w*s)/J],f=[(P.y+n.h*l)/Y,(P.y+n.h*u)/Y];nn(r.P,r.rX,r.rY,r.rZ,r.b),B.forEach(e=>tn(e,0,0,0,0)),ln(un(e),r,d,f),un(e);let p=K.getCenter(new x),m=K.getBoundingSphere(new o).radius+p.distanceTo(r.P);rn.set(1,0,0),an.set(0,Math.cos(r.e),-Math.sin(r.e)),on.set(0,-Math.sin(r.e),-Math.cos(r.e)),sn.copy(r.T).addScaledVector(on,-r.Hv/(2*U)),cn.copy(p).sub(sn);let h=cn.dot(on),g=(cn.dot(rn)/(h*U*(J/Y))+1)/2,_=h*1.6,v=-.07-m/(2*_*U);X.fy=(1-cn.dot(an)/(h*U))/2,X.P.copy(sn).addScaledVector(on,_).addScaledVector(rn,(2*g-1)*_*U*(J/Y)).addScaledVector(an,(1-2*v)*_*U).add(G.copy(r.P).sub(p)),X.rX=r.rX,X.rY=r.rY-.5,X.rZ=r.rZ+.42,X.b=r.b-1.4}else r.T.copy(n.T),r.Hv=n.Hv;Vt.position.set(Pt[0],0,0),Vt.rotation.y=Qt}function _n(e){let t=``,n=0;if(e>.01){for(let e of B)K.setFromObject(e.nesne),K.getCenter(G),G.project(L),n+=(-G.y*.5+.5)*Y;n/=B.length||1}let r={sag:-1/0,sol:-1/0};if(He.forEach((i,a)=>{if(i.style.opacity=e.toFixed(3),e<=.01)return;let o=B.find(e=>e.ad===i.dataset.parca);if(!o)return;K.setFromObject(o.nesne),K.getCenter(G),G.project(L);let s=(G.x*.5+.5)*J,c=(-G.y*.5+.5)*Y,l=a%2==0,u=Math.min(130,Math.max(64,Y*.11)),d=o.sira<B.length/2,f=q?s:d?Math.min(J-24,s+30):Math.max(24,s-30),p=Xt.get(`s${o.ad}`)??0;i.dataset.isik=Kt.length&&Gt!==`bakim`?p>.5?`acik`:`sonuk`:``;let m=!q&&i.dataset.isik===`sonuk`,h=q?n+(l?-u:u):c;if(!q&&!m){let e=d?`sag`:`sol`;h=Math.max(h,r[e]+22),r[e]=h}i.style.transform=`translate(${f.toFixed(1)}px, ${h.toFixed(1)}px)`,i.dataset.yon=q?l?`ust`:`alt`:d?`yan`:`sol`,i.style.maxWidth=q?``:`${Math.max(96,d?J-f-12:f-12).toFixed(0)}px`,m||(t+=q?`M${s.toFixed(1)} ${c.toFixed(1)}V${(l?h+8:h-8).toFixed(1)}`:`M${(s+(d?12:-12)).toFixed(1)} ${c.toFixed(1)}L${(f+(d?-6:6)).toFixed(1)} ${h.toFixed(1)}`)}),q&&e>.01){let e={ust:[],alt:[]};t=``,He.forEach(n=>{let r=/translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(n.style.transform);if(!r)return;let i=n.dataset.yon===`ust`?`ust`:`alt`,a=n.offsetWidth,o=Math.min(Math.max(+r[1],fn[0]*J+a/2),fn[1]*J-a/2),s=o-a/2,c=0;for(;(e[i][c]??-1/0)>s-10;)c++;e[i][c]=o+a/2;let l=+r[2]+(i===`ust`?-1:1)*c*22;n.style.transform=`translate(${o.toFixed(1)}px, ${l.toFixed(1)}px)`;let u=B.find(e=>e.ad===n.dataset.parca);K.setFromObject(u.nesne),K.getCenter(G),G.project(L);let d=(-G.y*.5+.5)*Y,f=(G.x*.5+.5)*J;t+=Math.abs(f-o)<1?`M${o.toFixed(1)} ${d.toFixed(1)}V${(i===`ust`?l+8:l-8).toFixed(1)}`:`M${f.toFixed(1)} ${d.toFixed(1)}L${o.toFixed(1)} ${(i===`ust`?l+8:l-8).toFixed(1)}`}),Ue?.setAttribute(`d`,t)}q&&e>.01||Ue?.setAttribute(`d`,t),Ue&&(Ue.parentNode.style.opacity=e.toFixed(3))}var vn=``,yn=0,bn=+!!A,Z=V,xn=0,Sn=!0,Cn=+!!A,wn=!1,Q=new x,$={e:.07,Hv:30,ilk:!0},Tn=new x;new ResizeObserver(()=>{Sn=!0}).observe(j),We.forEach(e=>new ResizeObserver(()=>{Sn=!0}).observe(e)),M&&new ResizeObserver(()=>{Sn=!0}).observe(M);function En(){(J!==j.clientWidth||Y!==j.clientHeight)&&dn.fill(1/0),J=j.clientWidth,Y=j.clientHeight;let e=Math.min(devicePixelRatio,tt);F.setPixelRatio(e),F.setSize(J,Y,!1),Dt.setPixelRatio(e),Dt.setSize(J,Y),L.aspect=J/Y,L.updateProjectionMatrix(),bt.olcek.value=Y/900}function Dn(e){requestAnimationFrame(Dn);let t=yn?Math.min(.12,(e-yn)/1e3):.016;yn=e;let n=j.getBoundingClientRect();if(n.bottom<0||n.top>innerHeight||!pt)return;Sn&&(Sn=!1,En(),gn());let r=A?.62:_e();bn<1&&(bn=Math.min(1,(e-(ht||e))/1600));let i=1-(1-bn)**3,a=Ke.some(e=>{let t=e.getBoundingClientRect();return t.top<=0&&t.bottom>=innerHeight});if((a||V!==2)&&(Cn=+!!A,wn=!1),a){V===2&&Xt.clear(),Z=V,$.ilk=!0;return}V===2||Z>1.001?(Z!==V&&($.ilk=!0,V===2&&Xt.clear()),Z=V):Z=A?V:W(Z,V,t,.75);let o=Z,s=Math.min(1,Math.floor(o)),c=be(o-s),l=O(0,1,c),u=en[s],d=en[s+1],f=be(o),p=be(o-1),m=O(.6,.95,f)*(1-O(0,.35,p));Jt.x=W(Jt.x,qt.x,t,.25),Jt.y=W(Jt.y,qt.y,t,.25);let h=O(.22,.85,c);if(Tn.lerpVectors(u.P,d.P,O(.12,.92,c)),Tn.y+=Math.sin(Math.PI*O(0,1,c))*(s===0?9:6)-(1-i)*4,nn(Tn,H(u.rX,d.rX,h),H(u.rY,d.rY,h),H(u.rZ,d.rZ,h),H(u.b,d.b,h)),o===2&&Cn<1&&M){!wn&&M.getBoundingClientRect().top+X.fy*Y<innerHeight*.78&&(wn=!0),wn&&(Cn=Math.min(1,Cn+t/X.sure));let e=1-(1-Cn)**3,n=O(0,1,Cn),r=en[2];Tn.lerpVectors(X.P,r.P,e),nn(Tn,H(X.rX,r.rX,n),H(X.rY,r.rY,n),H(X.rZ,r.rZ,n),H(X.b,r.b,n))}let g=s===0?O(.55,1,c):1-O(0,.45,c),_=Gt===`bakim`,v=!_&&Kt[0]||`meme`;for(let n of B){let i=n.sira/(B.length-1)-.5,a=Math.abs(i)*.35,o=A?g:Yt(be((g-a*.5)/(1-a*.5))),s=Zt(`o${n.ad}`,!_&&Kt.includes(n.ad)?m:0,t,.2),c=A?s:Yt(s),l=Zt(`c${n.ad}`,(n.ad,0),t,.25);tn(n,o,c,A?l:Yt(l),r);let u=Zt(`s${n.ad}`,Math.max((_||Kt.includes(n.ad)?1:0)*m,n.ad===v?l:0),t,.16);n.ad;let d=Kt.length&&!_?(1-u)*m:0;for(let t of n.ms)t.emissive.setRGB(.12*u+0,.3*u+0,1*u+0),t.emissiveIntensity=.8+.3*Math.sin(e/260)*u,t.envMapIntensity=1-.35*f-.5*d+.95*p}let y=G.lerpVectors(u.T,d.T,l),b=H(u.e,d.e,l),x=H(u.Hv,d.Hv,l)*(1+.16*Math.sin(Math.PI*c));$.ilk&&=(Q.copy(y),$.e=b,$.Hv=x,!1),y.y-=Number(j.dataset.ilerle??0)*.05*x,Q.x=W(Q.x,y.x,t,.12),Q.y=W(Q.y,y.y,t,.12),Q.z=W(Q.z,y.z,t,.12),$.e=W($.e,b,t,.12),$.Hv=W($.Hv,x,t,.12);let S=(1-f)*(qt.aktif?(Jt.x-.5)*.14:0),C=$.e+(1-f)*(qt.aktif?(.5-Jt.y)*.04:0),w=$.Hv/(2*U)*(1+(1-i)*.1);L.position.set(Q.x+Math.sin(S)*w*Math.cos(C),Q.y+Math.sin(C)*w,Q.z+Math.cos(S)*w*Math.cos(C)),L.lookAt(Q),Ft.merkez.value.set(z.position.x,z.position.z),Ft.yaricap.value=H(q?30:26,Math.max(mt*.62,26),f),G.copy(z.position).project(L),kt.uniforms.uMerkez.value.set(G.x*.5+.5,G.y*.5+.5);{let e=pn,t=fn,n=H((e[1]-e[0])*.62,(t[1]-t[0])*.62,f),r=H((e[3]-e[2])*.66,(t[3]-t[2])*.9,f);kt.uniforms.uYaricap.value.set(Math.max(.24,n),Math.max(.26,r))}kt.uniforms.uAlt.value=H(.84,.55,f)*(1-p);{let e=kt.uniforms.uYaricap.value;e.set(H(e.x,4,p),H(e.y,4,p))}let T=z.position;ot.position.set(T.x-18,T.y+10,T.z-12),st.position.set(T.x+16,T.y-14,T.z-10),ot.intensity=H(H(1e3,150,f),N.k1,p),st.intensity=H(H(800,100,f),N.k2,p),ot.color.lerpColors(Je,Ye,p),st.color.lerpColors(Xe,Ze,p),qe.position.set(T.x+2,T.y-8,T.z-16),qe.intensity=N.yesil*p,R.intensity=H(H(1.9,1.3,f),N.anahtarGuc,p),R.color.lerpColors(Qe,$e,p),R.target.position.set(Q.x,Q.y*p+Nt*(1-p),Q.z),R.position.set(Q.x+H(30,N.anahtar[0],p),H(29+(1-f)*-4,Q.y+N.anahtar[1],p),Q.z+H(44,N.anahtar[2],p));let E=R.shadow.camera,D=Math.max($.Hv*(J/Y),$.Hv)*.8;Math.abs(E.right-D)>.5&&(E.left=-D,E.right=D,E.top=D,E.bottom=-D,E.near=1,E.far=200,E.updateProjectionMatrix()),Mt.position.set(T.x+4,23,T.z+12),Mt.target.position.set(T.x,Nt,T.z),Mt.angle=H(.42,.62,f),Mt.intensity=H(H(2.6,2.2,f),1.6,p)*i,Ot.strength=H(H(.14,.08,f),.12,p),I.environmentRotation.set(0,0,en[2].rZ*O(.5,1,p)),p>.5&&!at&&(at=rt.fromScene(nt(!0),.02).texture),I.environment=p>.5&&at?at:it,I.fog.near=w+20,I.fog.far=w+240;let ee=p<.5;Bt.visible=f>.001&&ee,Rt.visible=ee,Vt.visible=ee;let te=O(.5,1,p),ne=te>0?Se(Ge):null,re=``;if(te>0&&ne&&M&&P.var){let e=j.getBoundingClientRect(),t=ye(ne),n=M.getBoundingClientRect().top,r=(t.x-e.left-P.x)*te,i=(n-e.top)*te+(t.y-n-P.y)*te;L.setViewOffset(J,Y,-r,-i,J,Y),re=`${r.toFixed(1)},${i.toFixed(1)},${J},${Y},${Z},${Cn.toFixed(4)}`}else L.view&&L.clearViewOffset();xn=W(xn,0,t,.3),vt&&yt&&(bt.zaman.value=r,bt.acik.value=xn*0,vt.visible=yt.visible=xn*0>.01),re&&Z===2&&re===vn||(vn=re,Dt.render(),_n(m))}new URLSearchParams(location.search).has(`hata`)&&(window.__sahne={POZ:en,YOL:X,kam:L,grup:z,kamT:Q,kamD:$,durum:()=>({acilis:bn,sDurak:Z,durak:V,yukT:ht,simdi:performance.now(),son:yn,yol:Cn})}),requestAnimationFrame(Dn);