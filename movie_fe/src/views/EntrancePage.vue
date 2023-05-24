<template>
  <div id='entrance'>
    <div ref="canvas">
    </div>
    <button id='mainBtn' @click="gotoMain">go</button>
  </div>
</template>

<script>
import * as THREE from 'three';

export default {
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      cloudParticles: [],
      rainParticles: [],
      flash: null,
      rain: null,
      rainGeo: null
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        1,
        1000
      );
      this.camera.position.z = 1;
      this.camera.rotation.x = 1.16;
      this.camera.rotation.y = -0.12;
      this.camera.rotation.z = 0.27;

      const ambient = new THREE.AmbientLight(0x555555);
      this.scene.add(ambient);

      const directionalLight = new THREE.DirectionalLight(0xffeedd);
      directionalLight.position.set(0, 0, 1);
      this.scene.add(directionalLight);

      this.flash = new THREE.PointLight(0x062d89, 30, 500, 1.7);
      this.flash.position.set(200, 300, 100);
      this.scene.add(this.flash);

      this.renderer = new THREE.WebGLRenderer();

      this.scene.fog = new THREE.FogExp2(0x11111f, 0.002);
      this.renderer.setClearColor(this.scene.fog.color);

      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.canvas.appendChild(this.renderer.domElement);

      const positions = [];
      const sizes = [];
      const rainCount = 15000;
      this.rainGeo = new THREE.BufferGeometry();
      for (let i = 0; i < rainCount; i++) {
        const rainDrop = new THREE.Vector3(
          Math.random() * 400 - 200,
          Math.random() * 500 - 250,
          Math.random() * 400 - 200
        );
        positions.push(rainDrop.x, rainDrop.y, rainDrop.z);
        sizes.push(30);
      }
      this.rainGeo.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );
      this.rainGeo.setAttribute(
        'size',
        new THREE.Float32BufferAttribute(sizes, 1)
      );
      const rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true
      });
      this.rain = new THREE.Points(this.rainGeo, rainMaterial);
      this.scene.add(this.rain);

      const loader = new THREE.TextureLoader();
      loader.load(
        'https://static.vecteezy.com/system/resources/previews/010/884/548/original/dense-fluffy-puffs-of-white-smoke-and-fog-on-transparent-background-abstract-smoke-clouds-movement-blurred-out-of-focus-smoking-blows-from-machine-dry-ice-fly-fluttering-in-air-effect-texture-png.png',
        (texture) => {
          const cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
          const cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
          });

          for (let p = 0; p < 25; p++) {
            const cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
              Math.random() * 800 - 400,
              500,
              Math.random() * 500 - 450
            );
            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 360;
            cloud.material.opacity = 0.6;
            this.cloudParticles.push(cloud);
            this.scene.add(cloud);
          }
          this.animate();
          window.addEventListener('resize', this.onWindowResize);
        }
      );
    },
    animate() {
      this.cloudParticles.forEach((p) => {
        p.rotation.z -= 0.002;
      });
      this.rainGeo.attributes.size.array.forEach((r, i) => {
        this.rainGeo.attributes.size.array[i] += 0.3;
      });

      this.rainGeo.attributes.size.needsUpdate = true;

      this.rain.position.z -= 0.222;
      if (this.rain.position.z < -200) {
        this.rain.position.z = 0;
      }

      if (Math.random() > 0.93 || this.flash.power > 100) {
        if (this.flash.power < 100)
          this.flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
          );
        this.flash.power = 50 + Math.random() * 500;
      }
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(this.animate);
    },
    onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    },
    gotoMain() {
        this.$router.push({ name: 'main' })
    }
  }
};
</script>

<style>
#entrance {
    margin-top : -12.1%;
    margin-left: -17.45%;
}

#mainBtn {
    position: absolute;
    margin: auto;
}
</style>
