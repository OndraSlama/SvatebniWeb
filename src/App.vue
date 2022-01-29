<template>
	<Renderer ref="rendererC" antialias resize="window" :pointer="{ onMove: onPointerMove, onClick: onPointerClick }" @pointerdown="onPointerDown" @pointerup="onPointerUp">
		<Camera :position="{ z: 10 }" />
		<Scene>
			<PointLight :position="{ y: 50, z: 50 }" />
			<AmbientLight intensity="1" />

			<GltfModel src="/models/test_doors/test_door.gltf" @load="onModelLoadReady" />
			
		</Scene>
	</Renderer>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

const rendererC = ref();
const doorModel = ref();

function onModelLoadReady(model) {
	console.log("Ready")
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
	renderer.onBeforeRender(() => {});
});

// Mouse events
const previousMousePositionX = ref(0);
const previousMousePositionY = ref(0);
const pointerIsDown = ref();
const pointerStateChanged = ref();
watch(pointerIsDown, (state) => {
	console.log(state);
});

function onPointerMove(pointer) {
	if (!pointerIsDown.value) return;

	const { positionV3 } = pointer;

	if (!pointerStateChanged.value) {
		doorModel.value.rotation.y += positionV3.x - previousMousePositionX.value;
	}

	previousMousePositionX.value = positionV3.x;
	previousMousePositionY.value = positionV3.y;
	pointerStateChanged.value = false;
}

function onPointerDown() {
	pointerIsDown.value = true;
	pointerStateChanged.value = true;
	console.log("mouse down");
}

function onPointerUp() {
	pointerIsDown.value = false;
}

function onPointerClick() {
	console.log("mouse clicked");
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
