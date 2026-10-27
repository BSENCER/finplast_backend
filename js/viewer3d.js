/**
 * Fin-Plast International — Realistic 3D Packaging Studio (Three.js)
 * Clean Studio Lighting, Dynamic Drop Shadow, High-Fidelity Material Shaders
 */

class PackagingViewer3D {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.options = Object.assign({
      autoRotate: true,
      rotationSpeed: 0.007,
      defaultTexture: 'finplast_product_doypack.jpg',
      materialType: 'glossy', // 'glossy', 'matte', 'foil'
      packageShape: 'doypack' // 'doypack', 'pillow', 'roll'
    }, options);

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.meshGroup = null;
    this.mesh = null;
    this.shadowPlane = null;
    this.textureLoader = new THREE.TextureLoader();
    this.currentTexture = null;
    this.isRotating = this.options.autoRotate;

    this.init();
  }

  init() {
    const width = this.canvas.clientWidth || 400;
    const height = this.canvas.clientHeight || 450;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    this.camera.position.set(0, 0.4, 7.2);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting setup
    this.setupStudioLighting();

    // Group for package and shadow
    this.meshGroup = new THREE.Group();
    this.scene.add(this.meshGroup);

    // Build Shadow Plane
    this.createShadowPlane();

    // Build Package Mesh
    this.createPackageMesh(this.options.packageShape);

    // Load Default Texture
    this.loadTexture(this.options.defaultTexture);

    // Controls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.06;
      this.controls.minDistance = 4;
      this.controls.maxDistance = 12;
      this.controls.maxPolarAngle = Math.PI / 1.7;
    }

    // Resize
    window.addEventListener('resize', () => this.onResize());

    // Loop
    this.animate();
  }

  setupStudioLighting() {
    // Soft Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    // Key Light (Main soft light from top-front-right)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.3);
    keyLight.position.set(4, 7, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 15;
    keyLight.shadow.bias = -0.001;
    this.scene.add(keyLight);

    // Fill Light (Gentle cyan tint from left)
    const fillLight = new THREE.DirectionalLight(0xebf5ff, 0.8);
    fillLight.position.set(-5, 2, 4);
    this.scene.add(fillLight);

    // Rim/Back Light (Gives edge outline)
    const rimLight = new THREE.DirectionalLight(0x0062ff, 0.6);
    rimLight.position.set(0, 5, -5);
    this.scene.add(rimLight);

    // Top Down Spotlight for glossy sheen
    const topSpot = new THREE.SpotLight(0xffffff, 0.9, 15, Math.PI / 5, 0.4);
    topSpot.position.set(0, 6, 2);
    this.scene.add(topSpot);
  }

  createShadowPlane() {
    // Generate soft circular gradient texture for shadow
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
    grad.addColorStop(0.5, 'rgba(15, 23, 42, 0.15)');
    grad.addColorStop(1, 'rgba(15, 23, 42, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(canvas);
    const shadowGeo = new THREE.PlaneGeometry(4.2, 4.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    });

    this.shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    this.shadowPlane.rotation.x = -Math.PI / 2;
    this.shadowPlane.position.y = -2.25;
    this.meshGroup.add(this.shadowPlane);
  }

  createPackageMesh(shape = 'doypack') {
    if (this.mesh) {
      this.meshGroup.remove(this.mesh);
      if (this.mesh.geometry) this.mesh.geometry.dispose();
      if (this.mesh.material) this.mesh.material.dispose();
    }

    let geometry;

    if (shape === 'doypack') {
      // Doypack shape with realistic bottom roundness and top zip heat-seal
      geometry = new THREE.CylinderGeometry(1.5, 1.85, 4.2, 64, 32, true);
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i);
        let z = pos.getZ(i);
        let x = pos.getX(i);

        // Vertical proportion from 0 (bottom) to 1 (top)
        let factor = (y + 2.1) / 4.2; 
        
        // Z flattening: thin sealed edge at top, wider oval base at bottom
        let zScale = (1.0 - Math.pow(factor, 0.85) * 0.88) * 0.45;
        
        // Gentle belly swelling in the middle
        let belly = Math.sin(factor * Math.PI) * 0.12;
        pos.setZ(i, z * (zScale + belly));
        pos.setX(i, x * (1.0 + belly * 0.5));
      }
      geometry.computeVertexNormals();
    } else if (shape === 'pillow') {
      // Snack bag with top and bottom heat-seals
      geometry = new THREE.CylinderGeometry(1.65, 1.65, 4.3, 64, 32, true);
      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let y = pos.getY(i);
        let z = pos.getZ(i);
        let normY = Math.abs(y) / 2.15; // 0 in center, 1 at edges
        let zScale = Math.max(0.06, (1.0 - Math.pow(normY, 2.2))) * 0.62;
        pos.setZ(i, z * zScale);
      }
      geometry.computeVertexNormals();
    } else if (shape === 'roll') {
      // Industrial Film Roll
      geometry = new THREE.CylinderGeometry(1.5, 1.5, 3.8, 64, 16, false);
    }

    const material = this.getPhysicalMaterial(this.options.materialType);

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.y = 0;
    this.meshGroup.add(this.mesh);

    // Apply texture if available
    if (this.currentTexture && this.mesh.material) {
      this.mesh.material.map = this.currentTexture;
      this.mesh.material.needsUpdate = true;
    }
  }

  getPhysicalMaterial(type = 'glossy') {
    let matProps = {
      side: THREE.DoubleSide,
      roughness: 0.12,
      metalness: 0.05,
      clearcoat: 0.95,
      clearcoatRoughness: 0.08,
      reflectivity: 0.95
    };

    if (type === 'matte') {
      matProps.roughness = 0.65;
      matProps.metalness = 0.01;
      matProps.clearcoat = 0.0;
      matProps.reflectivity = 0.3;
    } else if (type === 'foil') {
      matProps.roughness = 0.18;
      matProps.metalness = 0.85;
      matProps.clearcoat = 0.95;
      matProps.reflectivity = 1.0;
    }

    return new THREE.MeshPhysicalMaterial(matProps);
  }

  loadTexture(imagePath) {
    this.textureLoader.load(
      imagePath,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        this.currentTexture = texture;
        if (this.mesh && this.mesh.material) {
          this.mesh.material.map = texture;
          this.mesh.material.needsUpdate = true;
        }
      },
      undefined,
      (err) => {
        console.warn('Texture load fallback:', imagePath, err);
      }
    );
  }

  setMaterialType(type) {
    this.options.materialType = type;
    if (this.mesh) {
      const newMat = this.getPhysicalMaterial(type);
      if (this.currentTexture) {
        newMat.map = this.currentTexture;
      }
      this.mesh.material = newMat;
      this.mesh.material.needsUpdate = true;
    }
  }

  setPackageShape(shape) {
    this.options.packageShape = shape;
    this.createPackageMesh(shape);
  }

  toggleAutoRotate(state) {
    this.isRotating = state !== undefined ? state : !this.isRotating;
  }

  resetView() {
    this.camera.position.set(0, 0.4, 7.2);
    if (this.controls) {
      this.controls.reset();
    }
    if (this.meshGroup) {
      this.meshGroup.rotation.set(0, 0, 0);
    }
  }

  onResize() {
    if (!this.canvas) return;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    if (this.isRotating && this.meshGroup) {
      this.meshGroup.rotation.y += this.options.rotationSpeed;
    }

    if (this.controls) {
      this.controls.update();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

window.PackagingViewer3D = PackagingViewer3D;
