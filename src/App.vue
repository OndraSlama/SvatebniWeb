<template>
	<Renderer ref="rendererC" antialias resize="window" :pointer="{ onMove: onPointerMove, onClick: onPointerClick }" @pointerdown="onPointerDown" @pointerup="onPointerUp" shadow>
		<Camera :position="DEFAULT_CAMERA_POSITION"/>
		<Scene background="#1c1c1c">
			<PointLight ref="pointLight" :intensity="0.2" :position="DEFAULT_LIGHT_POSITION">
				<Sphere :radius="0.1" />
			</PointLight>

			 <!-- <RectAreaLight color="#60ff60" :position="DEFAULT_LIGHT_POSITION" v-bind="rectLightsProps" /> -->

			<AmbientLight :intensity="4" />

			<GltfModel src="/models/my_test_door_2/dvere.gltf" @load="onDoorModelLoadReady" />
			<GltfModel src="/models/trees/stromy.gltf" @load="onTreesModelLoadReady" />
			<GltfModel src="/models/sign/cedule.gltf" @load="onSignModelLoadReady" />

		</Scene>
		
	</Renderer>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import {Raycaster, Vector3} from 'three';

// Constants
const DEFAULT_CAMERA_POSITION = { x: 0, y: 0, z: 20 };
const DEFAULT_LIGHT_POSITION = { x: -5, y: 3, z: 20 };
const MODELS_X_OFFSET = -2.83;
const SLOW_OPEN_SPEED = 0.01;
const MEDIUM_OPEN_SPEED = 0.05;
const FAST_OPEN_SPEED = 0.1;

const rendererC = ref();
const pointLight = ref();

const raycaster = ref(new Raycaster());

onMounted(() => {
	const renderer = rendererC.value;
	renderer.onBeforeRender(() => {
		animate();
	});
});


const doorModel = ref();
const treesModel = ref();
const signModel = ref();
function onTreesModelLoadReady(model) {
	treesModel.value = model;
	modelFix(model);
}

function onSignModelLoadReady(model) {
	signModel.value = model;
	modelFix(model);
}

function onDoorModelLoadReady(model) {
	console.log("Ready");
	doorModel.value = model;

	console.log(doorModel.value);
	console.log(pointLight.value);
	modelFix(model);
}

function modelFix(model){
	model.traverse((o) => {
		if (o.isMesh) {
			// handle both multiple and single materials
			const asArray = Array.isArray(o.material) ? o.material : [o.material];
			// 0 works for matte materials - change as needed
			asArray.forEach((mat) => (mat.metalness = 0));

			o.castShadow = true;
			o.receiveShadow = true;
		}
	});
}

//----------------------------- Main logic -----------------------------
const door = ref({
	targetAngle: 0,
	currentAngle: 0,
	maxAngle: -Math.PI * 0.7,
	openedAngleThreshold: -Math.PI * 0.5,
	clickedOnDoor: false,
	isOpened: false,
	responsiveFactor: 0
})

const camera = ref({
	targetPosition: DEFAULT_CAMERA_POSITION,
	zoomIntegrationFactor: 0,
	moveFactor: 0.01
})

function animate() {

	if (!doorModel.value) { 	// If model is not lodaded	
		return;
	}

	if (door.value.isOpened){
		door.value.targetAngle = door.value.maxAngle;
		door.value.responsiveFactor = SLOW_OPEN_SPEED;
	} 

	doorModel.value.position.x = MODELS_X_OFFSET;	
	treesModel.value.position.x = MODELS_X_OFFSET;	
	signModel.value.position.x = 1.15;	
	signModel.value.position.z = 1;	
	// treesModel.value.position.z = -0.1;	

	doorModel.value.rotation.y += (door.value.targetAngle - door.value.currentAngle) * door.value.responsiveFactor;
	doorModel.value.rotation.y = Math.min(Math.max(doorModel.value.rotation.y, door.value.maxAngle), 0);

	rendererC.value.camera.position.x += (camera.value.targetPosition.x - rendererC.value.camera.position.x) * camera.value.moveFactor;
	rendererC.value.camera.position.y += (camera.value.targetPosition.y - rendererC.value.camera.position.y) * camera.value.moveFactor;


	moveCameraWhenDoorOpens();
		
  	door.value.currentAngle=doorModel.value.rotation.y;
}

function openDoor() {
  door.value.targetAngle=door.value.maxAngle;
  door.value.responsiveFactor = SLOW_OPEN_SPEED;
}

function moveCameraWhenDoorOpens() {
  if(door.value.isOpened) {
    rendererC.value.camera.position.z+=camera.value.zoomIntegrationFactor;
    console.log(rendererC.value.camera.position.z);
  }

  if(rendererC.value.camera.position.z<0) {
    rendererC.value.camera.position.z=DEFAULT_CAMERA_POSITION.z;
    doorModel.value.rotation.y=-1.3;
    door.value.targetAngle=0;
    door.value.isOpened=false;
  }
}

watch( () => door.value.currentAngle, (newValue) => {
	if (newValue < door.value.openedAngleThreshold) {
		// console.log("Door open: ", newValue);
		door.value.isOpened = true;		
	}
});

let cameraTimer;
watch(() => door.value.isOpened, (newValue) => {
	if (newValue) {
		cameraTimer = setInterval(() => {
			camera.value.zoomIntegrationFactor -= 0.002;
		}, 50)
	}else{
		camera.value.zoomIntegrationFactor = 0;
		clearInterval(cameraTimer)
	}
});

//----------------------------- Mouse events -----------------------------
const myPointer = ref({
	isDown: false,
	position: { x: 0, y: 0 },
	lastX: 0,
	lastY: 0,
	stateChanged: false,
	moveFactor: 0.35
})
// watch(() => myPointer.value.isDown, (state) => {
// 	console.log(state);
// });



function onPointerMove(pointer) {
	const { positionV3 } = pointer;
	myPointer.value.position = {"x": positionV3.x, "y": positionV3.y};
	determineDoorTargetAngle(positionV3);
	// determineCameraTargetPos(positionV3);
	// movePointLight(positionV3);
	
}

function onPointerDown() {
	myPointer.value.isDown = true;
	door.value.responsiveFactor = FAST_OPEN_SPEED;
	myPointer.value.stateChanged = true;
	console.log("pointer down");
}

function onPointerUp() {
	myPointer.value.isDown = false;
	door.value.clickedOnDoor = false;
	// door.value.targetAngle = 0;
	// door.value.responsiveFactor = 0.02;
	console.log("pointer up");
}

function onPointerClick() {
	console.log("pointer clicked");
	if (myPointer.value.stateChanged && intersectsDoor()) {
		openDoor();
	}
}


function intersectsDoor(){
	// console.log("intersects search for: ", myPointer.value.position);
	let {x, y} = myPointer.value.position;
	return x < 3 && x > -3 && y < 2.8 && y > -2.8;
}

function movePointLight(positionV3) {
	const { x, y, z } = positionV3;
	pointLight.value.light.position.x = DEFAULT_LIGHT_POSITION.x + x;
	pointLight.value.light.position.y = DEFAULT_LIGHT_POSITION.y + y;
	pointLight.value.light.position.z = 10 + 40 * getRelativeHeightOnSphere(x, 10);
}

function determineCameraTargetPos(positionV3) {
	const { x, y, z } = positionV3;
	camera.value.targetPosition.x = -x*0.1;
	camera.value.targetPosition.y = -y*0.1;
}

function getRelativeHeightOnSphere(x, sphereRadius){
	return Math.cos((Math.PI/2)*Math.min(Math.abs(x), sphereRadius)/sphereRadius) ;
}

function determineDoorTargetAngle(pointerPos){
	if (!myPointer.value.isDown){
		door.value.responsiveFactor = MEDIUM_OPEN_SPEED;
		door.value.targetAngle = intersectsDoor() ? -0.3 : 0;	
		return;
	}


	if (myPointer.value.stateChanged) {
		door.value.clickedOnDoor = intersectsDoor();
	}else if (door.value.clickedOnDoor){
		console.log("opening door")
		door.value.targetAngle += (pointerPos.x - myPointer.value.lastX) * myPointer.value.moveFactor;
	}

	if (door.value.targetAngle > 0) {
		door.value.targetAngle = 0;
	}

	myPointer.value.lastX = pointerPos.x;
	myPointer.value.stateChanged = false;

}

// animate() {
// 	const { pointer } = this.renderer.three;
// 	this.target.copy(myPointer.positionV3);
// 	this.light.position.copy(this.target);

// 	for (let i = 0; i < this.NUM_INSTANCES; i++) {
// 	const { position, scale, scaleZ, velocity, attraction, vlimit } = this.instances[i];

// 	this.dummyV.copy(this.target).sub(position).normalize().multiplyScalar(attraction);
// 	velocity.add(this.dummyV).clampScalar(-vlimit, vlimit);
// 	position.add(velocity);

// 	this.dummyO.position.copy(position);
// 	this.dummyO.scale.set(scale, scale, scaleZ);
// 	this.dummyO.lookAt(this.dummyV.copy(position).add(velocity));
// 	this.dummyO.updateMatrix();
// 	this.imesh.setMatrixAt(i, this.dummyO.matrix);
// 	}
// 	this.imesh.instanceMatrix.needsUpdate = true;
// };
</script>

<style>
body {
	margin: 0;
}
canvas {
	display: block;
}
</style>
