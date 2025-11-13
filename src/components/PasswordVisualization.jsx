import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function PasswordVisualization({ score, password }) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const shieldRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Create shield (main visualization)
    const shieldGeometry = new THREE.TorusGeometry(1.5, 0.1, 16, 100);
    const shieldMaterial = new THREE.MeshPhongMaterial({
      color: getColorForScore(score),
      emissive: getColorForScore(score),
      emissiveIntensity: 0.5,
      shininess: 100,
      transparent: true,
      opacity: 0.8,
    });
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    scene.add(shield);
    shieldRef.current = shield;

    // Create inner shield
    const innerShieldGeometry = new THREE.TorusGeometry(1.2, 0.08, 16, 100);
    const innerShieldMaterial = new THREE.MeshPhongMaterial({
      color: getColorForScore(score),
      emissive: getColorForScore(score),
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.6,
    });
    const innerShield = new THREE.Mesh(innerShieldGeometry, innerShieldMaterial);
    scene.add(innerShield);

    // Create particles around shield
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 100 + (score * 50);
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: getColorForScore(score),
      size: 0.05,
      transparent: true,
      opacity: 0.6,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // Animation
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate shield
      if (shield) {
        shield.rotation.x += 0.01;
        shield.rotation.y += 0.01;
      }

      if (innerShield) {
        innerShield.rotation.x -= 0.008;
        innerShield.rotation.y -= 0.008;
      }

      // Animate particles
      if (particles) {
        particles.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update colors when score changes
  useEffect(() => {
    if (shieldRef.current) {
      const color = getColorForScore(score);
      shieldRef.current.material.color.setHex(color);
      shieldRef.current.material.emissive.setHex(color);
    }

    if (particlesRef.current) {
      const color = getColorForScore(score);
      particlesRef.current.material.color.setHex(color);
    }
  }, [score]);

  const getColorForScore = (score) => {
    const colors = {
      0: 0xff0000, // Red
      1: 0xff9900, // Orange
      2: 0xffff00, // Yellow
      3: 0x00aaff, // Blue
      4: 0x00ff00, // Green
    };
    return colors[score] || colors[0];
  };

  return (
    <div className="relative w-full h-80 rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div ref={mountRef} className="w-full h-full" />
      
      {/* Score Display */}
      <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
        <p className="text-white text-sm font-semibold">
          Security Level: {score}/4
        </p>
      </div>

      {/* Password Length Display */}
      {password && (
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-semibold">
            {password.length} characters
          </p>
        </div>
      )}
    </div>
  );
}

export default PasswordVisualization;
