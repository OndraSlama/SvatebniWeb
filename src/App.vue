<template>
	<Renderer ref="rendererC" antialias resize="window" :pointer="{ onMove: onPointerMove, onClick: onPointerClick }" @pointerdown="onPointerDown" @pointerup="onPointerUp">
		<Camera :position="{ z: 10 }" />
		<Scene>
			<PointLight :position="{ y: 10, z: 60 }" />
			<AmbientLight intensity="3" />

			<GltfModel src="/models/my_test_door_2/dvere.gltf" @load="onModelLoadReady" />
		</Scene>
	</Renderer>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const rendererC = ref();
const doorModel = ref();

function onModelLoadReady(model) {
	console.log("Ready");
	doorModel.value = model;
	console.log(doorModel.value);
	model.traverse((o) => {
		if (o.isMesh) {
			// handle both multiple and single materials
			const asArray = Array.isArray(o.material) ? o.material : [o.material];
			// 0 works for matte materials - change as needed
			asArray.forEach((mat) => (mat.metalness = 0));
		}
	});
}

onMounted(() => {
	const renderer = rendererC.value;
	renderer.onBeforeRender(() => {
		animate();
	});
});

//Door logic
let openedAngleThreshold = -Math.PI * 0.5;
let maxAngle = -Math.PI * 0.7;
const targetDoorAngle = ref(0);
const currentDoorAngle = ref(0);
const responsiveFactor = ref(0);
const isDoorOpen = ref(false);
const cameraIntegrationFActor = ref(0);

function animate() {
	// If model is not lodaded
	if (!doorModel.value) {
		return;
	}

	if (isDoorOpen.value){
		targetDoorAngle.value = maxAngle;
		responsiveFactor.value = 0.01;
	} 

	doorModel.value.rotation.y += (targetDoorAngle.value - currentDoorAngle.value) * responsiveFactor.value;
	doorModel.value.rotation.y = Math.min(Math.max(doorModel.value.rotation.y, maxAngle), 0);


	// Move camera closer until end
	if (isDoorOpen.value) {	

		rendererC.value.camera.position.z += cameraIntegrationFActor.value;
		console.log(rendererC.value.camera.position.z);
	}

	if (rendererC.value.camera.position.z < 0) {
		rendererC.value.camera.position.z = 10;		
		doorModel.value.rotation.y = -1.3;
		targetDoorAngle.value = 0;
		isDoorOpen.value = false;
	}

	currentDoorAngle.value = doorModel.value.rotation.y;
}

watch(currentDoorAngle, (newValue) => {
	if (newValue < openedAngleThreshold) {
		// console.log("Door open: ", newValue);
		isDoorOpen.value = true;		
	}
});

const cameraTimer = ref();
watch(isDoorOpen, (newValue) => {
	if (newValue) {
		cameraTimer.value = setInterval(() => {
			cameraIntegrationFActor.value -= 0.002;
		}, 50)
	}else{
		cameraIntegrationFActor.value = 0;
		clearInterval(cameraTimer.value)
	}
});

// Mouse events
const previousMousePositionX = ref(0);
const pointerIsDown = ref();
const pointerStateChanged = ref();
watch(pointerIsDown, (state) => {
	console.log(state);
});

function onPointerMove(pointer) {
	if (!pointerIsDown.value) return;

	const { positionV3 } = pointer;

	if (!pointerStateChanged.value) {
		targetDoorAngle.value += positionV3.x - previousMousePositionX.value;
	}

	previousMousePositionX.value = positionV3.x;
	pointerStateChanged.value = false;
}

function onPointerDown() {
	pointerIsDown.value = true;
	responsiveFactor.value = 0.1;
	pointerStateChanged.value = true;
	console.log("mouse down");
}

function onPointerUp() {
	pointerIsDown.value = false;
	// targetDoorAngle.value = 0;
	// responsiveFactor.value = 0.02;
	console.log("mouse up");
}

function onPointerClick() {
	console.log("mouse clicked");
	if (pointerStateChanged.value) {
		targetDoorAngle.value = maxAngle;
		responsiveFactor.value = 0.01;
	}
}

// animate() {
// 	const { pointer } = this.renderer.three;
// 	this.target.copy(pointer.positionV3);
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
