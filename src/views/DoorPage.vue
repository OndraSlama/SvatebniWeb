<template>
	<div v-if="!allModelsLoaded()" class="absolute w-full h-[100vh] flex justify-center items-center ">
		<div class="text-center font-[InkFree] text-white ">
			<img class="w-[100px] h-[100px] m-auto" src="/public/images/loading.gif" />
			<div class="mt-4 text-4xl">
				Načítání
			</div>
			<div v-if="elapsedTime > 5000" class="mt-1 text-xl">
				Trvá moc dlouho? 
			<router-link to="svatba"> <b>Kliknutím přeskoč úvodní stránku</b></router-link>
			</div>
		</div>
	</div>
	<Renderer ref="rendererC" antialias resize="window" :pointer="{ onMove: onPointerMove, onClick: onPointerClick }" @pointerdown="onPointerDown" @pointerup="onPointerUp">
		<Camera />
		<Scene background="#222222">
			<PointLight ref="pointLight" :intensity="0.4" :position="DEFAULT_LIGHT_POSITION">
				<Sphere :radius="0.1" />
			</PointLight>

			<!-- <RectAreaLight color="#60ff60" :position="DEFAULT_LIGHT_POSITION" v-bind="rectLightsProps" /> -->

			<AmbientLight :intensity="4" />
			<Plane ref="rotationPlane" :position="{ x: MODELS_X_OFFSET }" :width="0" :height="0">
				<GltfModel src="/models/door/dvere.gltf" @load="onDoorModelLoadReady" />
				<GltfModel src="/models/sign/cedule.gltf" @load="onSignModelLoadReady" />
			</Plane>

			<GltfModel src="/models/trees/stromy.gltf" @load="onTreesModelLoadReady" />
		</Scene>
	</Renderer>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

// Constants
const DEFAULT_CAMERA_POSITION = { x: 0, y: 0, z: 20 };
const DEFAULT_LIGHT_POSITION = { x: -5, y: 3, z: 20 };
const MODELS_X_OFFSET = -2.83;
const SIGN_X_OFFEST = 4.15;
const SLOW_OPEN_SPEED = 0.02;
const MEDIUM_OPEN_SPEED = 0.05;
const FAST_OPEN_SPEED = 0.1;
const AUTOOPEN_TIME = 1000 * 30; // 30 sec

const TIMER_PERIOD = 20; // milliseconds
const SIGN_ANGLE_FIX_FACTOR = 4.34;
const SIGN_INITIAL_ANGLE = -Math.PI * 0.1 * SIGN_ANGLE_FIX_FACTOR;

// Refs
const rendererC = ref();
const pointLight = ref();

// Timer
let simulationTimer = null;
const elapsedTime = ref(0);

// Router
const router = useRouter();
const route = useRoute();

onMounted(() => {
	// Start timer
	simulationTimer = setInterval(() => {
		// Update time
		elapsedTime.value += TIMER_PERIOD;
		calculatePhysics();
	}, TIMER_PERIOD);

	const renderer = rendererC.value;
	renderer.onBeforeRender(() => {
		animate();
	});

	addEventListener("wheel", handleScroll);
});

onUnmounted(() => {
	// Stop timer
	clearInterval(simulationTimer);
	clearInterval(cameraTimer);
	addEventListener("wheel", handleScroll);
});

function handleScroll(event) {
	door.value.targetAngle -= event.deltaY * 0.002;
}

const dampeningPerCycle = Math.pow(0.6, TIMER_PERIOD / 1000);
function calculatePhysics() {
	// Calculate swinging motion of the sign
	sign.value.angleAccel = -Math.sin(sign.value.targetAngle / SIGN_ANGLE_FIX_FACTOR) * 50;

	// Calculate angle speed of the door
	door.value.angleSpeed = (door.value.currentAngle - door.value.prevAngle) / (TIMER_PERIOD / 1000);
	if (Math.abs(door.value.angleSpeed) < 0.01) {
		door.value.angleSpeed = 0;
	}
	door.value.prevAngle = door.value.currentAngle;

	sign.value.angleAccel += 200 * Math.abs(door.value.angleSpeed) * (TIMER_PERIOD / 1000);

	sign.value.angleSpeed += sign.value.angleAccel * (TIMER_PERIOD / 1000);
	sign.value.angleSpeed *= dampeningPerCycle;
	sign.value.targetAngle += sign.value.angleSpeed * (TIMER_PERIOD / 1000);
}

const doorModel = ref(undefined);
const treesModel = ref(undefined);
const signModel = ref(undefined);
const rotationPlane = ref(undefined);

function onTreesModelLoadReady(model) {
	treesModel.value = model;
	modelFix(model);
}

function onSignModelLoadReady(model) {
	signModel.value = model;
	modelFix(model);
}

function onDoorModelLoadReady(model) {
	doorModel.value = model;
	modelFix(model);

	camera.value.targetPosition = { ...DEFAULT_CAMERA_POSITION };
	rotationPlane.value.mesh.rotation.y = door.value.openedAngleThreshold * 0.9;
	door.value.targetAngle = door.value.openedAngleThreshold * 0.9;
	door.value.responsiveFactor = SLOW_OPEN_SPEED;

	setTimeout(() => {
		camera.value.position = { ...DEFAULT_CAMERA_POSITION };
		door.value.targetAngle = 0;
	}, 300);

	setTimeout(() => {
		door.value.blockInteraction = false;
		door.value.responsiveFactor = FAST_OPEN_SPEED;
	}, 3000);
}

function modelFix(model, metalness = 0.3) {
	model.traverse((o) => {
		if (o.isMesh) {
			// handle both multiple and single materials
			const asArray = Array.isArray(o.material) ? o.material : [o.material];
			// 0 works for matte materials - change as needed
			asArray.forEach((mat) => (mat.metalness = metalness));

			o.castShadow = true;
			o.receiveShadow = true;
		}
	});
}

//----------------------------- Main logic -----------------------------
const door = ref({
	targetAngle: 0,
	currentAngle: 0,
	prevAngle: 0,
	angleSpeed: 0,
	maxAngle: -Math.PI * 0.7,
	openedAngleThreshold: -Math.PI * 0.5,
	clickedOnDoor: false,
	isOpened: false,
	blockInteraction: true,
	responsiveFactor: FAST_OPEN_SPEED,
});

const camera = ref({
	targetPosition: { x: 0, y: 0, z: 0 },
	zoomIntegrationFactor: 0,
	moveFactor: 0.03,
});

const sign = ref({
	targetAngle: SIGN_INITIAL_ANGLE,
	currentAngle: 0,
	angleSpeed: 0,
	angleAccel: 0,
	maxAngle: -Math.PI * 0.7,
	responsiveFactor: 0.3,
});

function allModelsLoaded() {
	return doorModel.value && treesModel.value && signModel.value;
}

function animate() {
	if (!allModelsLoaded()) {
		// If model is not lodaded
		return;
	}

	if (elapsedTime.value > AUTOOPEN_TIME) {
		openDoor();
	}

	if (door.value.isOpened) {
		door.value.targetAngle = door.value.maxAngle;
		door.value.responsiveFactor = SLOW_OPEN_SPEED;
	}

	treesModel.value.position.x = MODELS_X_OFFSET;
	signModel.value.position.x = SIGN_X_OFFEST;

	rotationPlane.value.mesh.rotation.y += (door.value.targetAngle - door.value.currentAngle) * door.value.responsiveFactor;
	rotationPlane.value.mesh.rotation.y = Math.min(Math.max(rotationPlane.value.mesh.rotation.y, door.value.maxAngle), 0);

	signModel.value.rotation.z = (sign.value.targetAngle - sign.value.currentAngle) * sign.value.responsiveFactor;

	if (!door.value.blockInteraction) {
		camera.value.targetPosition.z = DEFAULT_CAMERA_POSITION.z - Math.abs(door.value.currentAngle * 5);
	}

	rendererC.value.camera.position.x += (camera.value.targetPosition.x - rendererC.value.camera.position.x) * camera.value.moveFactor;
	rendererC.value.camera.position.y += (camera.value.targetPosition.y - rendererC.value.camera.position.y) * camera.value.moveFactor;
	rendererC.value.camera.position.z += (camera.value.targetPosition.z - rendererC.value.camera.position.z) * camera.value.moveFactor;

	moveCameraWhenDoorIsOpening();

	door.value.currentAngle = rotationPlane.value.mesh.rotation.y;
	sign.value.currentAngle = signModel.value.rotation.z;
}

function openDoor() {
	door.value.blockInteraction = true;
	door.value.targetAngle = door.value.maxAngle;
	door.value.responsiveFactor = SLOW_OPEN_SPEED;
}

function moveCameraWhenDoorIsOpening() {
	if (door.value.isOpened) {
		rendererC.value.camera.position.z += camera.value.zoomIntegrationFactor;
		door.value.blockInteraction = false;
	}

	if (rendererC.value.camera.position.z < 0) {
		router.push("/svatba");
		rendererC.value.camera.position.z = 0;
		rotationPlane.value.mesh.rotation.y = door.value.openedAngleThreshold;
		door.value.targetAngle = 0;
		door.value.isOpened = false;
	}
}

watch(
	() => door.value.currentAngle,
	(newValue) => {
		if (newValue < door.value.openedAngleThreshold) {
			door.value.isOpened = true;
		}
	}
);

let cameraTimer;
watch(
	() => door.value.isOpened,
	(newValue) => {
		if (newValue) {
			cameraTimer = setInterval(() => {
				camera.value.zoomIntegrationFactor -= 0.01;
			}, 50);
		} else {
			camera.value.zoomIntegrationFactor = 0;
			clearInterval(cameraTimer);
		}
	}
);

//----------------------------- Mouse events -----------------------------
const myPointer = ref({
	isDown: false,
	position: { x: 0, y: 0 },
	lastX: 0,
	lastY: 0,
	stateChanged: false,
	moveFactor: 0.35,
});

function onPointerMove(pointer) {
	const { positionV3 } = pointer;
	myPointer.value.position = { x: positionV3.x, y: positionV3.y };
	determineDoorTargetAngle(positionV3);
	determineCameraTargetPos(positionV3);
	movePointLight(positionV3);
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
	console.log("pointer up");
}

function onPointerClick() {
	console.log("pointer clicked");
	if (myPointer.value.stateChanged && intersectsDoor()) {
		openDoor();
	}
}

function intersectsDoor() {
	let { x, y } = myPointer.value.position;
	return x < 3 && x > -3 && y < 2.8 && y > -2.8;
}

function movePointLight(positionV3) {
	const { x, y, z } = positionV3;
	pointLight.value.light.position.x = DEFAULT_LIGHT_POSITION.x + x * 0.3;
	pointLight.value.light.position.y = DEFAULT_LIGHT_POSITION.y + y * 0.3;
	// pointLight.value.light.position.z = 10 + 40 * getRelativeHeightOnSphere(x, 10);
}

function determineCameraTargetPos(positionV3) {
	const { x, y, z } = positionV3;
	camera.value.targetPosition.x = -x * 0.03;
	camera.value.targetPosition.y = -y * 0.03;
}

function getRelativeHeightOnSphere(x, sphereRadius) {
	return Math.cos(((Math.PI / 2) * Math.min(Math.abs(x), sphereRadius)) / sphereRadius);
}

function determineDoorTargetAngle(pointerPos) {
	// if (!myPointer.value.isDown && !door.value.blockInteraction && intersectsDoor()){
	// 	door.value.responsiveFactor = MEDIUM_OPEN_SPEED;
	// 	door.value.targetAngle = intersectsDoor() ? -0.1 : 0;
	// 	return;
	// }

	if (myPointer.value.stateChanged) {
		door.value.clickedOnDoor = intersectsDoor();
	} else if (door.value.clickedOnDoor && !door.value.blockInteraction) {
		console.log("opening door");
		door.value.targetAngle += (pointerPos.x - myPointer.value.lastX) * myPointer.value.moveFactor;
	}

	if (door.value.targetAngle > 0) {
		door.value.targetAngle = 0;
	}

	myPointer.value.lastX = pointerPos.x;
	myPointer.value.stateChanged = false;
}
</script>

<style>
body {
	margin: 0;
}
canvas {
	display: block;
}
</style>
