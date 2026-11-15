import{B as e,C as t,E as n,F as r,G as i,I as a,J as o,K as s,L as c,M as l,N as u,O as d,P as f,R as p,S as m,T as h,U as g,V as _,W as ee,X as v,Y as y,_ as b,a as x,c as S,d as C,f as w,g as T,h as E,i as te,j as ne,k as re,l as ie,m as ae,n as oe,o as se,p as ce,q as le,r as ue,s as de,t as fe,u as pe,v as me,w as he,x as ge,y as _e}from"./meshopt_decoder.module.BLYAe4cI.js";import{a as ve,i as ye,n as be,o as xe,r as Se,s as D,t as Ce}from"./AtilimSayfa.astro_astro_type_script_index_0_lang.Cq561zol.js";var we={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},Te=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Ee=new ne(-1,1,1,-1,0,1),De=new class extends S{constructor(){super(),this.setAttribute(`position`,new T([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new T([0,2,0,0,2,0],2))}},Oe=class{constructor(e){this._mesh=new h(De,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Ee)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},ke=class extends Te{constructor(e,t=`tDiffuse`){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof _?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=le.clone(e.uniforms),this.material=new _({name:e.name===void 0?`unspecified`:e.name,defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Oe(this.material)}render(e,t,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Ae=class extends Te{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,n){let r=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),i.buffers.stencil.setFunc(r.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(n),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(r.EQUAL,1,4294967295),i.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),i.buffers.stencil.setLocked(!0)}},je=class extends Te{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Me=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){let n=e.getSize(new o);this._width=n.width,this._height=n.height,t=new v(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:_e}),t.texture.name=`EffectComposer.rt1`}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name=`EffectComposer.rt2`,this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new ke(we),this.copyPass.material.blending=0,this.timer=new i}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());let t=this.renderer.getRenderTarget(),n=!1;for(let t=0,r=this.passes.length;t<r;t++){let r=this.passes[t];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),r.render(this.renderer,this.writeBuffer,this.readBuffer,e,n),r.needsSwap){if(n){let t=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(t.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(t.EQUAL,1,4294967295)}this.swapBuffers()}Ae!==void 0&&(r instanceof Ae?n=!0:r instanceof je&&(n=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){let t=this.renderer.getSize(new o);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let n=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(n,r),this.renderTarget2.setSize(n,r);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(n,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},Ne=class extends Te{constructor(e,t,n=null,r=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=n,this.clearColor=r,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new C}render(e,t,n){let r=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==1&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=r}},Pe={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new C(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},Fe=class e extends Te{constructor(e,t=1,r,i){super(),this.strength=t,this.radius=r,this.threshold=i,this.resolution=e===void 0?new o(256,256):new o(e.x,e.y),this.clearColor=new C(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);this.renderTargetBright=new v(a,s,{type:_e,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new v(a,s,{type:_e,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new v(a,s,{type:_e,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),a=Math.round(a/2),s=Math.round(s/2)}let c=Pe;this.highPassUniforms=le.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new _({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];a=Math.round(this.resolution.x/2),s=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new o(1/a,1/s),a=Math.round(a/2),s=Math.round(s/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let u=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=u,this.bloomTintColors=[new y(1,1,1),new y(1,1,1),new y(1,1,1),new y(1,1,1),new y(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=le.clone(we.uniforms),this.blendMaterial=new _({uniforms:this.copyUniforms,vertexShader:we.vertexShader,fragmentShader:we.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new C,this._oldClearAlpha=1,this._basic=new n,this._fsQuad=new Oe(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new o(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new _({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new o(.5,.5)},direction:{value:new o(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new _({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}};Fe.BlurDirectionX=new o(1,0),Fe.BlurDirectionY=new o(0,1);var Ie={name:`OutputShader`,uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},Le=class extends Te{constructor(){super(),this.isOutputPass=!0,this.uniforms=le.clone(Ie.uniforms),this.material=new a({name:Ie.name,uniforms:this.uniforms,vertexShader:Ie.vertexShader,fragmentShader:Ie.fragmentShader}),this._fsQuad=new Oe(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},w.getTransfer(this._outputColorSpace)===`srgb`&&(this.material.defines.SRGB_TRANSFER=``),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING=``:this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING=``:this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING=``:this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING=``:this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING=``:this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING=``:this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=``),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Re=class extends S{constructor(e=new h,n=new y,r=new E,i=new y(1,1,1)){super();let a=[],o=[],s=[],c=new y,l=new t().getNormalMatrix(e.matrixWorld),u=new he;u.makeRotationFromEuler(r),u.setPosition(n);let d=new he;d.copy(u).invert(),f(),this.setAttribute(`position`,new T(a,3)),this.setAttribute(`uv`,new T(s,2)),o.length>0&&this.setAttribute(`normal`,new T(o,3));function f(){let t=[],n=new y,r=new y,l=e.geometry,d=l.attributes.position,f=l.attributes.normal;if(l.index!==null){let e=l.index;for(let i=0;i<e.count;i++)n.fromBufferAttribute(d,e.getX(i)),f?(r.fromBufferAttribute(f,e.getX(i)),p(t,n,r)):p(t,n)}else{if(d===void 0)return;for(let e=0;e<d.count;e++)n.fromBufferAttribute(d,e),f?(r.fromBufferAttribute(f,e),p(t,n,r)):p(t,n)}t=m(t,c.set(1,0,0)),t=m(t,c.set(-1,0,0)),t=m(t,c.set(0,1,0)),t=m(t,c.set(0,-1,0)),t=m(t,c.set(0,0,1)),t=m(t,c.set(0,0,-1));for(let e=0;e<t.length;e++){let n=t[e];s.push(.5+n.position.x/i.x,.5+n.position.y/i.y),n.position.applyMatrix4(u),a.push(n.position.x,n.position.y,n.position.z),n.normal!==null&&o.push(n.normal.x,n.normal.y,n.normal.z)}}function p(t,n,r=null){n.applyMatrix4(e.matrixWorld),n.applyMatrix4(d),r?(r.applyNormalMatrix(l),t.push(new ze(n.clone(),r.clone()))):t.push(new ze(n.clone()))}function m(e,t){let n=[],r=.5*Math.abs(i.dot(t));for(let i=0;i<e.length;i+=3){let a=0,o,s,c,l,u=e[i+0].position.dot(t)-r,d=e[i+1].position.dot(t)-r,f=e[i+2].position.dot(t)-r,p=u>0,m=d>0,h=f>0;switch(a=+!!p+ +!!m+ +!!h,a){case 0:n.push(e[i]),n.push(e[i+1]),n.push(e[i+2]);break;case 1:if(p&&(o=e[i+1],s=e[i+2],c=g(e[i],o,t,r),l=g(e[i],s,t,r)),m){o=e[i],s=e[i+2],c=g(e[i+1],o,t,r),l=g(e[i+1],s,t,r),n.push(c),n.push(s.clone()),n.push(o.clone()),n.push(s.clone()),n.push(c.clone()),n.push(l);break}h&&(o=e[i],s=e[i+1],c=g(e[i+2],o,t,r),l=g(e[i+2],s,t,r)),n.push(o.clone()),n.push(s.clone()),n.push(c),n.push(l),n.push(c.clone()),n.push(s.clone());break;case 2:p||(o=e[i].clone(),s=g(o,e[i+1],t,r),c=g(o,e[i+2],t,r),n.push(o),n.push(s),n.push(c)),m||(o=e[i+1].clone(),s=g(o,e[i+2],t,r),c=g(o,e[i],t,r),n.push(o),n.push(s),n.push(c)),h||(o=e[i+2].clone(),s=g(o,e[i],t,r),c=g(o,e[i+1],t,r),n.push(o),n.push(s),n.push(c))}}return n}function g(e,t,n,r){let i=e.position.dot(n)-r,a=i/(i-(t.position.dot(n)-r)),o=new y(e.position.x+a*(t.position.x-e.position.x),e.position.y+a*(t.position.y-e.position.y),e.position.z+a*(t.position.z-e.position.z)),s=null;return e.normal!==null&&t.normal!==null&&(s=new y(e.normal.x+a*(t.normal.x-e.normal.x),e.normal.y+a*(t.normal.y-e.normal.y),e.normal.z+a*(t.normal.z-e.normal.z))),new ze(o,s)}}},ze=class{constructor(e,t=null){this.position=e,this.normal=t}clone(){let e=this.position.clone(),t=this.normal===null?null:this.normal.clone();return new this.constructor(e,t)}},Be=new y;function O(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Be.copy(t),Be[r]=0,Be.normalize();let l=.5*o/(o+s),u=1-Be.angleTo(e)/c;return Math.sign(Be[n])===1?u*l:s/(o+s)+l+l*(1-u)}var Ve=class e extends se{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new y,c=new y,l=new y(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new y,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=O(m,c,`z`,`y`,i,n),f[a+1]=1-O(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-O(m,c,`z`,`y`,i,n),f[a+1]=1-O(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-O(m,c,`x`,`z`,i,e),f[a+1]=O(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-O(m,c,`x`,`z`,i,e),f[a+1]=1-O(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-O(m,c,`x`,`y`,i,e),f[a+1]=1-O(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=O(m,c,`x`,`y`,i,e),f[a+1]=1-O(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},k=document.documentElement.dataset.motion===`reduce`,A=document.querySelector(`#sahne`).querySelector(`.kafes`),He=A.querySelector(`canvas.uc`),Ue=[...A.querySelectorAll(`[data-parca]`)],We=A.querySelector(`.cizgiler path`),Ge=[...A.querySelectorAll(`.metin`)],j=document.querySelector(`#protokol`),Ke=j?.querySelector(`.dci`)??null,qe=[...document.querySelectorAll(`[data-ortu]`)],M={rZ:.32,anahtar:[40,24,22],anahtarRenk:15002879,anahtarGuc:1.9,k1:280,k1Renk:13624258,k2:260,k2Renk:14674175,yesil:280},Je=new f(8367701,0,0,2),Ye=new C(2381823),Xe=new C(M.k1Renk),Ze=new C(4025343),Qe=new C(M.k2Renk),$e=new C(16773602),et=new C(M.anahtarRenk),N={x:0,y:0,var:!1},P;try{P=new te({canvas:He,antialias:!1,alpha:!0,powerPreference:`high-performance`})}catch{throw A.classList.add(`webgl-yok`),Error(`WebGL yok: yedek görsel`)}var tt=innerWidth<760,nt=tt?1.5:2;P.setPixelRatio(Math.min(devicePixelRatio,nt)),P.toneMapping=4,P.toneMappingExposure=.92,P.outputColorSpace=p,P.setClearColor(0,0);function rt(t=!1){let r=new e,i=new h(new se(60,40,60),new n({color:131847,side:1}));r.add(i);let a=(e,t,i,a,o,s)=>{let c=new h(new u(e,t),new n({color:new C(i).multiplyScalar(a),side:2}));c.position.set(...o),c.lookAt(...s),r.add(c)};return a(26,14,16777215,1.6,[4,18,6],[0,0,0]),a(3,30,16774378,2.4,[18,2,10],[0,0,0]),a(2.4,30,t?14673646:6129407,t?1.6:3,[-18,0,6],[0,0,0]),a(40,2.2,t?13226716:4025343,t?1.2:2.2,[0,-6,-22],[0,0,0]),a(16,7,16777215,.7,[0,7,24],[0,0,0]),a(34,4,14673663,1,[0,-12,16],[0,0,0]),t&&a(12,44,15331060,.95,[-13,3,21],[0,0,0]),r}var F=new e,it=new ue(P),at=it.fromScene(rt(),.02).texture,ot=null;F.environment=at,F.environmentIntensity=.72;var I=new l(24,1,.5,3200),L=new ae(16773602,1.6);L.position.set(16,22,24),F.add(L);var st=new f(2381823,1300,0,2);F.add(st);var ct=new f(4025343,800,0,2);F.add(ct),F.add(Je);var lt={celik:()=>new d({color:12172998,metalness:1,roughness:.22}),celik_parlak:()=>new d({color:14080478,metalness:1,roughness:.1}),celik_koyu:()=>new d({color:5988714,metalness:1,roughness:.3}),plastik:()=>new d({color:723983,metalness:0,roughness:.38,clearcoat:.6,clearcoatRoughness:.35}),bakir:()=>new d({color:14256734,metalness:1,roughness:.24})},R=new me;F.add(R),R.rotation.order=`YXZ`;var ut=new me;R.add(ut);var z=[],dt=[`konnektor`,`valf`,`govde`,`pul`,`yay`,`igne`,`meme`,`somun`,`bakir`],ft=new Set([`pul`,`bakir`]),pt=0,mt=!1,ht=30,gt=0,_t=1.2;function vt(e){let t=document.createElement(`canvas`);t.width=512,t.height=256;let n=t.getContext(`2d`);n.fillStyle=`rgba(0,0,0,0)`,n.fillRect(0,0,512,256),n.fillStyle=`#ffffff`,n.textAlign=`center`,n.font=`600 58px "Hubot Sans Variable", system-ui, sans-serif`,n.fillText(`ATILIM DİZEL`,256,110),n.font=`500 36px "Hubot Sans Variable", system-ui, sans-serif`,n.fillText(`ÇORLU 1987`,256,168);let r=new ie(t);r.colorSpace=p,r.anisotropy=4;let i=new d({color:2895927,metalness:.7,roughness:.55,alphaMap:r,transparent:!0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4});e.updateMatrixWorld(!0);let a=new x().setFromObject(e),o=new Re(e,new y(0,a.min.y+(a.max.y-a.min.y)*.44,.93),new E(0,0,-Math.PI/2),new y(3.6,1.8,1.2));o.applyMatrix4(e.matrixWorld.clone().invert());let s=new h(o,i);e.add(s)}new oe().setMeshoptDecoder(fe).load(`${`/yeni`.replace(/\/?$/,`/`)}model/enjektor2-m.glb`,e=>{let t=e.scene;t.traverse(e=>{let t=e;t.isMesh&&(t.material=(lt[t.material.name]??lt.celik)())}),dt.forEach((e,n)=>{let r=t.getObjectByName(e);if(!r)return;let i=[];r.traverse(e=>{let t=e;t.isMesh&&(i.push(t.material),t.castShadow=!0)}),z.push({ad:e,nesne:r,taban:r.position.clone(),hedef:0,ms:i,sira:n,r:1}),ut.add(r)});let n;z.find(e=>e.ad===`govde`)?.nesne.traverse(e=>{let t=e;t.isMesh&&t.geometry.attributes.position&&(!n||t.geometry.attributes.position.count>n.geometry.attributes.position.count)&&(n=t)}),n&&document.fonts?.ready.then(()=>vt(n));let r=new x().setFromObject(ut);r.max.y-r.min.y;let i=z.map(e=>(r.setFromObject(e.nesne),r.max.y-r.min.y)),a=.5;ht=i.reduce((e,t)=>e+t,0)+a*(z.length-1);let o=ht/2;z.forEach((e,t)=>{e.hedef=o-i[t]/2-e.taban.y,o-=i[t]+a});for(let e of z)r.setFromObject(e.nesne),e.r=Math.max(r.max.x-r.min.x,r.max.z-r.min.z)/2;_t=Math.max(...z.map(e=>e.r)),r.setFromObject(z.find(e=>e.ad===`meme`).nesne),pt=r.min.y,r.setFromObject(ut),(r.max.y+r.min.y)/2,Wt(),Tt(),mt=!0,gt=performance.now(),Sn=!0,j?.classList.add(`uc`),A.classList.add(`yuklu`)},void 0,()=>A.classList.add(`webgl-yok`));var yt=null,bt=null,xt={zaman:{value:0},acik:{value:1},olcek:{value:1},T:{value:ye.T},duvar:{value:999}},St=7;function Ct(e,t,n){let r=new S,i=e*t,a=new Float32Array(i*3),o=new Float32Array(i*3),s=new Float32Array(i),c=new Float32Array(i),l=new Float32Array(i),u=new Float32Array(i),d=new y,f=new y;for(let r=0;r<e;r++){let e=r%St/St*Math.PI*2+(Math.random()-.5)*(n?.03:.12),i=m.degToRad(72+(Math.random()-.5)*(n?1.6:9));d.set(Math.sin(i)*Math.cos(e),-Math.cos(i),Math.sin(i)*Math.sin(e)),f.set(Math.random()-.5,Math.random()-.5,Math.random()-.5).cross(d).normalize();let p=Math.random()<.15?Math.random()*ye.pilot[1]:ye.ana[0]+Math.random()*(ye.ana[1]-ye.ana[0]),h=.75+Math.random()*.5,g=Math.random();for(let e=0;e<t;e++){let n=r*t+e;a.set([d.x,d.y,d.z],n*3),o.set([f.x,f.y,f.z],n*3),s[n]=p,c[n]=h,l[n]=g,u[n]=e}}return r.setAttribute(`position`,new de(new Float32Array(i*3),3)),r.setAttribute(`yon`,new de(a,3)),r.setAttribute(`yan`,new de(o,3)),r.setAttribute(`dogus`,new de(s,1)),r.setAttribute(`hiz`,new de(c,1)),r.setAttribute(`boy`,new de(l,1)),r.setAttribute(`uc`,new de(u,1)),r}var wt=`attribute vec3 yon; attribute vec3 yan; attribute float dogus; attribute float hiz; attribute float boy; attribute float uc;
  uniform float zaman; uniform float olcek; uniform float T; uniform float duvar; varying float vA; varying float vT;`;function Tt(){bt=new ge(Ct(tt?8e3:14e3,2,!0),new _({uniforms:xt,transparent:!0,depthWrite:!1,blending:2,vertexShader:`${wt}
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
      void main(){ float a = vA * acik * 0.75; gl_FragColor = vec4(mix(vec3(1.), vec3(.75,.85,1.), vT) * a, a); }`})),yt=new r(Ct(tt?3500:6e3,1,!1),new _({uniforms:xt,transparent:!0,depthWrite:!1,blending:2,vertexShader:`${wt}
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
        gl_FragColor = vec4(c * a, a); }`}));for(let e of[bt,yt])e.frustumCulled=!1,e.position.y=pt-.05,ut.add(e)}var Et=Math.min(4,P.capabilities.maxSamples),Dt=new v(1,1,{type:_e,samples:Et}),Ot=new Me(P,Dt);Ot.addPass(new Ne(F,I));var kt=new Fe(new o(1,1),.16,.5,.92);Ot.addPass(kt);var At=new ke({uniforms:{tDiffuse:{value:null},uMerkez:{value:new o(.5,.5)},uYaricap:{value:new o(.6,.6)},uAlt:{value:0}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform sampler2D tDiffuse; uniform vec2 uMerkez; uniform vec2 uYaricap; uniform float uAlt; varying vec2 vUv;
    void main() {
      vec4 c = texture2D(tDiffuse, vUv);
      float d = length((vUv - uMerkez) / uYaricap);
      float f = 1.0 - smoothstep(0.5, 1.15, d);
      f *= mix(1.0 - uAlt, 1.0, smoothstep(0.02, 0.4, vUv.y));
      gl_FragColor = vec4(c.rgb * f, c.a);
    }`});Ot.addPass(At),Ot.addPass(new Le);function jt(e,t,n,r){let i=document.createElement(`canvas`);i.width=e,i.height=t,n(i.getContext(`2d`));let a=new ie(i);return a.colorSpace=p,a.wrapS=a.wrapT=c,a.repeat.set(...r),a.anisotropy=8,a}var Mt=(()=>{let e=11;return()=>(e=e*16807%2147483647)/2147483647})();P.shadowMap.enabled=!0,P.shadowMap.type=2,L.castShadow=!0,L.shadow.mapSize.set(tt?1024:2048,tt?1024:2048),L.shadow.bias=-5e-4,L.shadow.normalBias=.03,F.add(L.target),F.fog=new b(197900,80,260);var Nt=new ee(15856895,0,0,.62,.9,0);F.add(Nt,Nt.target);var Pt=-11,Ft=[0,100,200],It={merkez:{value:new o(0,0)},yaricap:{value:40}};function Lt(e){return e.onBeforeCompile=e=>{e.uniforms.uIsikMerkez=It.merkez,e.uniforms.uIsikR=It.yaricap,e.vertexShader=e.vertexShader.replace(`#include <common>`,`#include <common>
varying vec3 vDunya;`).replace(`#include <project_vertex>`,`#include <project_vertex>
vDunya = (modelMatrix * vec4(transformed, 1.0)).xyz;`),e.fragmentShader=e.fragmentShader.replace(`#include <common>`,`#include <common>
varying vec3 vDunya; uniform vec2 uIsikMerkez; uniform float uIsikR;`).replace(`#include <fog_fragment>`,`gl_FragColor.rgb *= 1.0 - smoothstep(uIsikR * 0.25, uIsikR, distance(vDunya.xz, uIsikMerkez));
#include <fog_fragment>`)},e}var Rt=jt(1024,1024,e=>{e.fillStyle=`#242b36`,e.fillRect(0,0,1024,1024);for(let t=0;t<1400;t++)e.fillStyle=`rgba(200,210,235,${(.015+Mt()*.025).toFixed(3)})`,e.fillRect(0,Math.floor(Mt()*1024),1024,1)},[60,60]),zt=new h(new u(2400,2400),Lt(new re({map:Rt,roughness:.5,metalness:.55,envMapIntensity:.55})));zt.rotation.x=-Math.PI/2,zt.position.set(100,Pt,-20),zt.receiveShadow=!0,F.add(zt);var Bt=jt(1024,1024,e=>{e.fillStyle=`#26303f`,e.fillRect(0,0,1024,1024);for(let t=0;t<=16;t++){let n=t*64;e.fillStyle=t%5==0?`rgba(170,190,230,.24)`:`rgba(150,170,215,.1)`;let r=t%5==0?3:1.5;e.fillRect(n-r/2,0,r,1024),e.fillRect(0,n-r/2,1024,r)}},[600/32,600/32]),Vt=new h(new u(600,600),Lt(new re({map:Bt,roughness:.8,metalness:.05,envMapIntensity:.5})));Vt.rotation.x=-Math.PI/2,Vt.position.set(Ft[1],-10.75,0),Vt.receiveShadow=!0,F.add(Vt);var Ht=new me;F.add(Ht);var Ut=[];function Wt(){let e=new d({color:9278364,metalness:1,roughness:.3}),t=new d({color:3159357,metalness:.85,roughness:.42}),n=new d({color:4870233,metalness:.95,roughness:.34}),r=new d({color:855569,metalness:0,roughness:.45,clearcoat:.4,clearcoatRoughness:.4}),i=jt(128,128,e=>{e.fillStyle=`#c9a86a`,e.fillRect(0,0,128,128),e.strokeStyle=`#5b4524`,e.lineWidth=3;for(let t=-128;t<256;t+=12)e.beginPath(),e.moveTo(t,0),e.lineTo(t+128,128),e.stroke(),e.beginPath(),e.moveTo(t+128,0),e.lineTo(t,128),e.stroke()},[5,3]),a=new d({color:16777215,map:i,metalness:1,roughness:.34}),o=new d({color:2381823,metalness:0,roughness:.32,clearcoat:.6,clearcoatRoughness:.3}),c=new d({color:14673390,metalness:0,roughness:.22,transparent:!0,opacity:.8,clearcoat:1}),l=new d({color:12858154,metalness:0,roughness:.38,clearcoat:.5}),u=new d({color:1842980,metalness:0,roughness:.38,clearcoat:.5}),f=e=>(e.traverse(e=>{e.castShadow=!0,e.receiveShadow=!0}),Ht.add(e),e),p=(e,t,n,r=.12)=>{let i=f(new h(new Ve(...e,3,r),n));return i.position.set(...t),i},g=(e,t,n,r=32)=>new h(new ce(e,e,t,r),n),_=(e,t,n,r=96)=>f(new h(new s(new pe(e.map(e=>new y(e[0],e[1],e[2]))),r,t,16,!1),n)),ee=(e,t,n)=>(e.position.copy(t),e.quaternion.setFromUnitVectors(new y(0,1,0),n.clone().normalize()),f(e));Ut.push(p([3,3.8,3],[0,-9.1,0],n,.18)),p([4.6,.5,2.6],[0,-6.95,0],t);for(let t of[-1.75,1.75])f(g(.34,.42,e,6)).position.set(t,-6.5,0);let v=f(g(.3,.7,e,6));v.rotation.z=Math.PI/2,v.position.set(-1.8,-9.9,0);let b=new y(Math.sin(m.degToRad(50)),Math.cos(m.degToRad(50)),0),x=new y(.62,3.75,0);ee(g(.62,1.1,e,6),x.clone().addScaledVector(b,2.15),b);let S=x.clone().addScaledVector(b,2.7),C=x.clone().addScaledVector(b,4.1);_([[S.x,S.y,0],[C.x,C.y,0],[4.7,7.9,0],[5.4,10.4,0],[6.2,13.2,0]],.22,e);let w=new y(6.2-5.4,13.2-10.4,0).normalize(),T=new y(6.2,13.2,0);ee(g(.5,.7,e,6),T.clone().addScaledVector(w,.2),w),ee(g(.34,.6,e,24),T.clone().addScaledVector(w,.8),w),ee(g(.5,.7,e,6),T.clone().addScaledVector(w,1.4),w);let E=T.clone().addScaledVector(w,1.7);_([[E.x,E.y,0],[E.x+w.x*2,E.y+w.y*2,0],[8.4,22,.6],[10,34,1.2],[11,48,1.6]],.42,o,64),p([1.5,1.44,1.3],[2.85,9.12,0],r),p([.6,.22,.7],[2.6,9.95,0],r);let te=f(g(.36,.7,r,24));te.rotation.z=Math.PI/2,te.position.set(3.95,9.12,0);for(let[e,t]of[[.13,l],[-.13,u]])_([[4.25,9.12,e],[4.9,8.7,e],[5.5,5.4,e+.2],[5.75,.5,e+.45],[5.5,-4.8,e+.7],[4.95,-8.6,e+.9],[4.7,-9.6,e+1.05]],.075,t,120);p([.95,1.3,.95],[4.7,-10.35,1.05],r);let ne=f(g(.44,2,a,48));ne.position.set(0,11.55,0),Ut.push(ne),f(g(.38,.2,o,32)).position.set(0,12.65,0),_([[0,12.7,0],[0,18,0],[.4,28,-.4],[1.2,48,-1]],.3,c,64)}var Gt={duman:[`igne`,`meme`],gec:[`valf`],cekis:[`meme`,`valf`],yakit:[`meme`,`igne`],bakim:dt,saglam:[]},Kt=document.querySelector(`.teshis`)?.dataset.secim??``,qt=Gt[Kt]??[];addEventListener(`atilim-belirti`,e=>{Kt=e.detail,qt=Gt[Kt]??[]});var B=Number(A.dataset.durak??0);addEventListener(`atilim-durak`,e=>{B=e.detail}),addEventListener(`atilim-adim`,e=>{e.detail});var Jt={x:.5,y:.5,aktif:!1},Yt={x:.5,y:.5};addEventListener(`pointermove`,e=>{Jt.x=e.clientX/innerWidth,Jt.y=e.clientY/innerHeight,Jt.aktif=!0},{passive:!0});var Xt=e=>(e=xe(e),1+2.6*(e-1)**3+1.6*(e-1)**2),V=m.lerp,H=Math.tan(m.degToRad(12)),U=(e,t,n,r)=>e+(t-e)*(1-Math.exp(-n/r)),Zt=new Map,Qt=(e,t,n,r)=>{let i=U(Zt.get(e)??0,t,n,r);return Zt.set(e,i),i},W=new y,G=new x;new y,new y;var $t=Math.PI+.45,en=.6,K=innerWidth/innerHeight>1.02,q=1,J=1,tn=[0,1,2].map(()=>({P:new y,rX:0,rY:0,rZ:0,b:0,a:0,T:new y,e:.1,Hv:30}));function nn(e,t,n,r,i){let a=Math.cos(ut.rotation.y),o=Math.sin(ut.rotation.y),s=-(_t-e.r)*t,c=0,l=0;K?(c=s+1.7*n-.5*r,l=.7*n+3.2*r):(c=-.5*r,l=s+1.7*n+3.2*r),e.nesne.position.set(e.taban.x+c*a-l*o,e.taban.y+e.hedef*t,e.taban.z+c*o+l*a);let u=ft.has(e.ad)?Math.PI/2*t*(1-n*.4):0;e.nesne.rotation.set(K?r*.12:u,k?0:n*i*.6+r*i*.5,K?u:0)}function rn(e,t,n,r,i){R.position.copy(e),R.rotation.set(t,n,r),ut.rotation.y=i}var an=new y,on=new y,sn=new y,cn=new y,Y=new y,X={P:new y,rX:0,rY:0,rZ:0,b:0,fy:.6,sure:2.2};function ln(e,t,n,r){let i=q/J,a=(n[0]+n[1])/2,o=(r[0]+r[1])/2;an.set(1,0,0),on.set(0,Math.cos(t.e),-Math.sin(t.e)),sn.set(0,-Math.sin(t.e),-Math.cos(t.e));let s=new y;G.makeEmpty(),e.forEach(e=>G.expandByPoint(e)),G.getCenter(s).negate(),t.Hv=30;for(let c=0;c<12;c++){cn.copy(sn).multiplyScalar(-t.Hv/(2*H));let c=1/0,l=-1/0,u=1/0,d=-1/0,f=0;for(let t of e){Y.copy(t).add(s).sub(cn);let n=Y.dot(sn);f+=n/e.length;let r=(Y.dot(an)/(n*H*i)+1)/2,a=(1-Y.dot(on)/(n*H))/2;c=Math.min(c,r),l=Math.max(l,r),u=Math.min(u,a),d=Math.max(d,a)}t.Hv*=Math.max((l-c)/(n[1]-n[0]),(d-u)/(r[1]-r[0]));let p=2*H*f;s.addScaledVector(an,(a-(c+l)/2)*p*i).addScaledVector(on,((u+d)/2-o)*p)}t.T.copy(s).negate()}function un(e){F.updateMatrixWorld(!0),G.makeEmpty();for(let t of e)G.expandByObject(t);return Array.from({length:8},(e,t)=>new y(t&1?G.max.x:G.min.x,t&2?G.max.y:G.min.y,t&4?G.max.z:G.min.z))}var dn=[1/0,1/0,1/0],fn=[0,1,0,1],pn=[0,1,0,1],mn=document.querySelector(`[data-ust]`);function hn(e){let t=Ge[e],n=((mn?.offsetHeight??72)+(K?12:8))/J;if(dn[e]=Math.min(dn[e],t.offsetTop),!K)return[.05,.95,n,Math.max(n+.25,(dn[e]-14)/J)];let r=Math.min(t.offsetLeft,q-t.offsetLeft-t.offsetWidth)/q,i=Math.max(.03,r-.01),a=Math.min(.97,1-r+.01);return t.offsetWidth>q*(1-2*r)*.7?[Math.max(.04,r),Math.min(.96,1-r),n,Math.max(n+.25,(dn[e]-20)/J)]:t.offsetLeft+t.offsetWidth/2<q/2?[(t.offsetLeft+t.offsetWidth+32)/q,a,n,.97]:[i,Math.max(i+.27,(t.offsetLeft-32)/q),n,.97]}function gn(){K=innerWidth/innerHeight>1.02;let e=z.map(e=>e.nesne),[t,n,r]=tn;t.P.set(Ft[0],0,0),t.rX=0,t.rY=0,t.rZ=0,t.b=$t,t.a=0,t.e=K?.2:.24,n.P.set(Ft[1],Pt+_t,0),n.rX=K?0:-Math.PI/2,n.rY=K?0:.74,n.rZ=K?Math.PI/2:0,n.b=en,n.a=1,n.e=K?.5:1.05,r.P.copy(n.P).add(W.set(0,26,0)),r.rX=.12,r.rY=0,r.rZ=M.rZ,r.b=$t,r.a=0,r.e=.2;let i=hn(0),a=hn(1);fn=a,pn=i;let o=(e,t,n,r)=>{let i=e[1]-e[0],a=e[3]-e[2];return[[e[0]+i*t,e[1]-i*t],[e[2]+a*n,e[3]-a*r]]};rn(t.P,t.rX,t.rY,t.rZ,t.b),z.forEach(e=>nn(e,0,0,0,0));{let[n,r]=o(i,.12,.02,0);ln(un([...e,...Ut]),t,n,r)}rn(n.P,n.rX,n.rY,n.rZ,n.b),z.forEach(e=>nn(e,1,0,0,0));{let[t,r]=K?o(a,.12,.26,.22):o(a,.08,.06,.06);ln(un(e),n,t,r)}let s=Ce(Ke);if(s&&j){let t=A.getBoundingClientRect(),n=be(s),i=j.getBoundingClientRect().top;N.x=n.x-t.left,N.y=n.y-i,N.var=n.w>40;let[a,o,c,l]=Se(K?s.dataset.hedef:s.dataset.hedefTel),u=[(N.x+n.w*a)/q,(N.x+n.w*o)/q],d=[(N.y+n.h*c)/J,(N.y+n.h*l)/J];rn(r.P,r.rX,r.rY,r.rZ,r.b),z.forEach(e=>nn(e,0,0,0,0)),ln(un(e),r,u,d),un(e);let f=G.getCenter(new y),p=G.getBoundingSphere(new g).radius+f.distanceTo(r.P);an.set(1,0,0),on.set(0,Math.cos(r.e),-Math.sin(r.e)),sn.set(0,-Math.sin(r.e),-Math.cos(r.e)),cn.copy(r.T).addScaledVector(sn,-r.Hv/(2*H)),Y.copy(f).sub(cn);let m=Y.dot(sn),h=(Y.dot(an)/(m*H*(q/J))+1)/2,_=m*1.6,ee=-.07-p/(2*_*H);X.fy=(1-Y.dot(on)/(m*H))/2,X.P.copy(cn).addScaledVector(sn,_).addScaledVector(an,(2*h-1)*_*H*(q/J)).addScaledVector(on,(1-2*ee)*_*H).add(W.copy(r.P).sub(f)),X.rX=r.rX,X.rY=r.rY-.5,X.rZ=r.rZ+.42,X.b=r.b-1.4}else r.T.copy(n.T),r.Hv=n.Hv;Ht.position.set(Ft[0],0,0),Ht.rotation.y=$t}function _n(e){let t=``,n=0;if(e>.01){for(let e of z)G.setFromObject(e.nesne),G.getCenter(W),W.project(I),n+=(-W.y*.5+.5)*J;n/=z.length||1}let r={sag:-1/0,sol:-1/0};if(Ue.forEach((i,a)=>{if(i.style.opacity=e.toFixed(3),e<=.01)return;let o=z.find(e=>e.ad===i.dataset.parca);if(!o)return;G.setFromObject(o.nesne),G.getCenter(W),W.project(I);let s=(W.x*.5+.5)*q,c=(-W.y*.5+.5)*J,l=a%2==0,u=Math.min(130,Math.max(64,J*.11)),d=o.sira<z.length/2,f=K?s:d?Math.min(q-24,s+30):Math.max(24,s-30),p=Zt.get(`s${o.ad}`)??0;i.dataset.isik=qt.length&&Kt!==`bakim`?p>.5?`acik`:`sonuk`:``;let m=!K&&i.dataset.isik===`sonuk`,h=K?n+(l?-u:u):c;if(!K&&!m){let e=d?`sag`:`sol`;h=Math.max(h,r[e]+22),r[e]=h}i.style.transform=`translate(${f.toFixed(1)}px, ${h.toFixed(1)}px)`,i.dataset.yon=K?l?`ust`:`alt`:d?`yan`:`sol`,i.style.maxWidth=K?``:`${Math.max(96,d?q-f-12:f-12).toFixed(0)}px`,m||(t+=K?`M${s.toFixed(1)} ${c.toFixed(1)}V${(l?h+8:h-8).toFixed(1)}`:`M${(s+(d?12:-12)).toFixed(1)} ${c.toFixed(1)}L${(f+(d?-6:6)).toFixed(1)} ${h.toFixed(1)}`)}),K&&e>.01){let e={ust:[],alt:[]};t=``,Ue.forEach(n=>{let r=/translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(n.style.transform);if(!r)return;let i=n.dataset.yon===`ust`?`ust`:`alt`,a=n.offsetWidth,o=Math.min(Math.max(+r[1],fn[0]*q+a/2),fn[1]*q-a/2),s=o-a/2,c=0;for(;(e[i][c]??-1/0)>s-10;)c++;e[i][c]=o+a/2;let l=+r[2]+(i===`ust`?-1:1)*c*22;n.style.transform=`translate(${o.toFixed(1)}px, ${l.toFixed(1)}px)`;let u=z.find(e=>e.ad===n.dataset.parca);G.setFromObject(u.nesne),G.getCenter(W),W.project(I);let d=(-W.y*.5+.5)*J,f=(W.x*.5+.5)*q;t+=Math.abs(f-o)<1?`M${o.toFixed(1)} ${d.toFixed(1)}V${(i===`ust`?l+8:l-8).toFixed(1)}`:`M${f.toFixed(1)} ${d.toFixed(1)}L${o.toFixed(1)} ${(i===`ust`?l+8:l-8).toFixed(1)}`}),We?.setAttribute(`d`,t)}K&&e>.01||We?.setAttribute(`d`,t),We&&(We.parentNode.style.opacity=e.toFixed(3))}var vn=``,yn=0,bn=+!!k,Z=B,xn=0,Sn=!0,Cn=+!!k,wn=!1,Q=new y,$={e:.07,Hv:30,ilk:!0},Tn=new y;new ResizeObserver(()=>{Sn=!0}).observe(A),Ge.forEach(e=>new ResizeObserver(()=>{Sn=!0}).observe(e)),j&&new ResizeObserver(()=>{Sn=!0}).observe(j);function En(){(q!==A.clientWidth||J!==A.clientHeight)&&dn.fill(1/0),q=A.clientWidth,J=A.clientHeight;let e=Math.min(devicePixelRatio,nt);P.setPixelRatio(e),P.setSize(q,J,!1),Ot.setPixelRatio(e),Ot.setSize(q,J),I.aspect=q/J,I.updateProjectionMatrix(),xt.olcek.value=J/900}function Dn(e){requestAnimationFrame(Dn);let t=yn?Math.min(.12,(e-yn)/1e3):.016;yn=e;let n=A.getBoundingClientRect();if(n.bottom<0||n.top>innerHeight||!mt)return;Sn&&(Sn=!1,En(),gn());let r=k?.62:ve();bn<1&&(bn=Math.min(1,(e-(gt||e))/1600));let i=1-(1-bn)**3,a=qe.some(e=>{let t=e.getBoundingClientRect();return t.top<=0&&t.bottom>=innerHeight});if((a||B!==2)&&(Cn=+!!k,wn=!1),a){B===2&&Zt.clear(),Z=B,$.ilk=!0;return}B===2||Z>1.001?(Z!==B&&($.ilk=!0,B===2&&Zt.clear()),Z=B):Z=k?B:U(Z,B,t,.75);let o=Z,s=Math.min(1,Math.floor(o)),c=xe(o-s),l=D(0,1,c),u=tn[s],d=tn[s+1],f=xe(o),p=xe(o-1),m=D(.6,.95,f)*(1-D(0,.35,p));Yt.x=U(Yt.x,Jt.x,t,.25),Yt.y=U(Yt.y,Jt.y,t,.25);let h=D(.22,.85,c);if(Tn.lerpVectors(u.P,d.P,D(.12,.92,c)),Tn.y+=Math.sin(Math.PI*D(0,1,c))*(s===0?9:6)-(1-i)*4,rn(Tn,V(u.rX,d.rX,h),V(u.rY,d.rY,h),V(u.rZ,d.rZ,h),V(u.b,d.b,h)),o===2&&Cn<1&&j){!wn&&j.getBoundingClientRect().top+X.fy*J<innerHeight*.78&&(wn=!0),wn&&(Cn=Math.min(1,Cn+t/X.sure));let e=1-(1-Cn)**3,n=D(0,1,Cn),r=tn[2];Tn.lerpVectors(X.P,r.P,e),rn(Tn,V(X.rX,r.rX,n),V(X.rY,r.rY,n),V(X.rZ,r.rZ,n),V(X.b,r.b,n))}let g=s===0?D(.55,1,c):1-D(0,.45,c),_=Kt===`bakim`,ee=!_&&qt[0]||`meme`;for(let n of z){let i=n.sira/(z.length-1)-.5,a=Math.abs(i)*.35,o=k?g:Xt(xe((g-a*.5)/(1-a*.5))),s=Qt(`o${n.ad}`,!_&&qt.includes(n.ad)?m:0,t,.2),c=k?s:Xt(s),l=Qt(`c${n.ad}`,(n.ad,0),t,.25);nn(n,o,c,k?l:Xt(l),r);let u=Qt(`s${n.ad}`,Math.max((_||qt.includes(n.ad)?1:0)*m,n.ad===ee?l:0),t,.16);n.ad;let d=qt.length&&!_?(1-u)*m:0;for(let t of n.ms)t.emissive.setRGB(.12*u+0,.3*u+0,1*u+0),t.emissiveIntensity=.8+.3*Math.sin(e/260)*u,t.envMapIntensity=1-.35*f-.5*d+.95*p}let v=W.lerpVectors(u.T,d.T,l),y=V(u.e,d.e,l),b=V(u.Hv,d.Hv,l)*(1+.16*Math.sin(Math.PI*c));$.ilk&&=(Q.copy(v),$.e=y,$.Hv=b,!1),v.y-=Number(A.dataset.ilerle??0)*.05*b,Q.x=U(Q.x,v.x,t,.12),Q.y=U(Q.y,v.y,t,.12),Q.z=U(Q.z,v.z,t,.12),$.e=U($.e,y,t,.12),$.Hv=U($.Hv,b,t,.12);let x=(1-f)*(Jt.aktif?(Yt.x-.5)*.14:0),S=$.e+(1-f)*(Jt.aktif?(.5-Yt.y)*.04:0),C=$.Hv/(2*H)*(1+(1-i)*.1);I.position.set(Q.x+Math.sin(x)*C*Math.cos(S),Q.y+Math.sin(S)*C,Q.z+Math.cos(x)*C*Math.cos(S)),I.lookAt(Q),It.merkez.value.set(R.position.x,R.position.z),It.yaricap.value=V(K?30:26,Math.max(ht*.62,26),f),W.copy(R.position).project(I),At.uniforms.uMerkez.value.set(W.x*.5+.5,W.y*.5+.5);{let e=pn,t=fn,n=V((e[1]-e[0])*.62,(t[1]-t[0])*.62,f),r=V((e[3]-e[2])*.66,(t[3]-t[2])*.9,f);At.uniforms.uYaricap.value.set(Math.max(.24,n),Math.max(.26,r))}At.uniforms.uAlt.value=V(.84,.55,f)*(1-p);{let e=At.uniforms.uYaricap.value;e.set(V(e.x,4,p),V(e.y,4,p))}let w=R.position;st.position.set(w.x-18,w.y+10,w.z-12),ct.position.set(w.x+16,w.y-14,w.z-10),st.intensity=V(V(1e3,150,f),M.k1,p),ct.intensity=V(V(800,100,f),M.k2,p),st.color.lerpColors(Ye,Xe,p),ct.color.lerpColors(Ze,Qe,p),Je.position.set(w.x+2,w.y-8,w.z-16),Je.intensity=M.yesil*p,L.intensity=V(V(1.9,1.3,f),M.anahtarGuc,p),L.color.lerpColors($e,et,p),L.target.position.set(Q.x,Q.y*p+Pt*(1-p),Q.z),L.position.set(Q.x+V(30,M.anahtar[0],p),V(29+(1-f)*-4,Q.y+M.anahtar[1],p),Q.z+V(44,M.anahtar[2],p));let T=L.shadow.camera,E=Math.max($.Hv*(q/J),$.Hv)*.8;Math.abs(T.right-E)>.5&&(T.left=-E,T.right=E,T.top=E,T.bottom=-E,T.near=1,T.far=200,T.updateProjectionMatrix()),Nt.position.set(w.x+4,23,w.z+12),Nt.target.position.set(w.x,Pt,w.z),Nt.angle=V(.42,.62,f),Nt.intensity=V(V(2.6,2.2,f),1.6,p)*i,kt.strength=V(V(.14,.08,f),.12,p),F.environmentRotation.set(0,0,tn[2].rZ*D(.5,1,p)),p>.5&&!ot&&(ot=it.fromScene(rt(!0),.02).texture),F.environment=p>.5&&ot?ot:at,F.fog.near=C+20,F.fog.far=C+240;let te=p<.5;Vt.visible=f>.001&&te,zt.visible=te,Ht.visible=te;let ne=D(.5,1,p),re=ne>0?Ce(Ke):null,ie=``;if(ne>0&&re&&j&&N.var){let e=A.getBoundingClientRect(),t=be(re),n=j.getBoundingClientRect().top,r=(t.x-e.left-N.x)*ne,i=(n-e.top)*ne+(t.y-n-N.y)*ne;I.setViewOffset(q,J,-r,-i,q,J),ie=`${r.toFixed(1)},${i.toFixed(1)},${q},${J},${Z},${Cn.toFixed(4)}`}else I.view&&I.clearViewOffset();xn=U(xn,0,t,.3),yt&&bt&&(xt.zaman.value=r,xt.acik.value=xn*0,yt.visible=bt.visible=xn*0>.01),ie&&Z===2&&ie===vn||(vn=ie,Ot.render(),_n(m))}new URLSearchParams(location.search).has(`hata`)&&(window.__sahne={POZ:tn,YOL:X,kam:I,grup:R,kamT:Q,kamD:$,durum:()=>({acilis:bn,sDurak:Z,durak:B,yukT:gt,simdi:performance.now(),son:yn,yol:Cn})}),requestAnimationFrame(Dn);