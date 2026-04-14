'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ── Green matrix walls ── */
const ROWS = 32;
const WALL_COLS = 20;
const WALL_HEIGHT = 10;
const WALL_DEPTH = 16;
const CORRIDOR_OUTER = 9;
const CORRIDOR_INNER = 1.2;

function Wall({ side }) {
  const meshRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const streams = useMemo(() => {
    const s = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < WALL_COLS; c++) {
        s.push({
          row: r,
          col: c,
          tOffset: Math.random() * 20,
          speed: 0.6 + Math.random() * 0.8,
          brightness: 0.4 + Math.random() * 0.6,
          flickerRate: 1.5 + Math.random() * 3,
        });
      }
    }
    return s;
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();

    for (let idx = 0; idx < streams.length; idx++) {
      const s = streams[idx];
      const yNorm = s.row / (ROWS - 1);
      const y = (yNorm - 0.5) * WALL_HEIGHT;
      const cycle = ((t * s.speed + s.tOffset) % 4) / 4;
      const progress = cycle;
      const x = side * (CORRIDOR_OUTER - progress * (CORRIDOR_OUTER - CORRIDOR_INNER));
      const zNorm = s.col / (WALL_COLS - 1);
      const z = -zNorm * WALL_DEPTH + 3;
      const jy = Math.sin(t * 1.5 + s.tOffset * 3) * 0.03;

      dummy.position.set(x, y + jy, z);
      const angle = side * (-0.3 - progress * 0.2);
      dummy.rotation.set(0, angle, 0);
      const depthScale = 0.4 + (1 - zNorm) * 0.6;
      const pulse = 1 + Math.sin(t * s.flickerRate + s.tOffset) * 0.1;
      const sz = 0.15 * depthScale * pulse;
      dummy.scale.set(sz * 1.2, sz * 1.8, sz);
      dummy.updateMatrix();
      mesh.setMatrixAt(idx, dummy.matrix);

      const headBrightness = 1 - progress;
      const flicker = Math.sin(t * s.flickerRate * 2 + s.tOffset * 5) * 0.5 + 0.5;
      const depthDim = 0.25 + (1 - zNorm) * 0.75;
      const b = headBrightness * s.brightness * depthDim;
      const isHead = progress < 0.15;
      const isBright = flicker > 0.7 && b > 0.3;

      let rr, gg, bb;
      if (isHead) {
        // White head
        rr = 0.7 * b + 0.15; gg = 0.75 * b + 0.17; bb = 0.7 * b + 0.15;
      } else if (isBright) {
        // Light gray
        rr = 0.45 * b; gg = 0.5 * b; bb = 0.45 * b;
      } else {
        // Muted dark gray
        rr = 0.25 * b; gg = 0.28 * b; bb = 0.25 * b;
      }
      color.setRGB(rr, gg, bb);
      mesh.setColorAt(idx, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, streams.length]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

/* ── Green data streams ── */
const COLS = 7;
const PARTICLES_PER_COL = 40;
const TOTAL = COLS * PARTICLES_PER_COL;
const COL_SPACING = 0.75;
const STREAM_HEIGHT = 14;

function Streams() {
  const meshRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const particles = useMemo(() => {
    const arr = [];
    for (let c = 0; c < COLS; c++) {
      const dir = c % 2 === 0 ? 1 : -1;
      for (let p = 0; p < PARTICLES_PER_COL; p++) {
        arr.push({
          col: c,
          yOffset: Math.random() * STREAM_HEIGHT,
          speed: 0.4 + Math.random() * 0.6,
          direction: dir,
          brightness: 0.02 + Math.random() * 0.06,
          flickerRate: 1 + Math.random() * 3,
          size: 0.12 + Math.random() * 0.05,
        });
      }
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const x = (p.col - (COLS - 1) / 2) * COL_SPACING;
      const rawY = (p.yOffset + t * p.speed * p.direction) % STREAM_HEIGHT;
      const y = ((rawY + STREAM_HEIGHT) % STREAM_HEIGHT) - STREAM_HEIGHT / 2;
      const z = -8;

      dummy.position.set(x, y, z);
      dummy.rotation.set(0, 0, 0);
      const sz = p.size;
      dummy.scale.set(sz, sz, 1);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const flicker = Math.sin(t * p.flickerRate + p.yOffset * 2) * 0.5 + 0.5;
      const b = p.brightness * (0.6 + flicker * 0.4);
      const normY = ((rawY + STREAM_HEIGHT) % STREAM_HEIGHT) / STREAM_HEIGHT;
      const headGlow = normY < 0.1 ? 1.5 : 1;
      const finalB = Math.min(b * headGlow, 0.7);

      const whiteChance = flicker > 0.85 && finalB > 0.35;
      if (whiteChance) {
        // Bright white flash
        color.setRGB(finalB * 0.8, finalB * 0.85, finalB * 0.8);
      } else if (p.col % 3 === 0) {
        // Medium gray
        color.setRGB(finalB * 0.4, finalB * 0.45, finalB * 0.4);
      } else {
        // Dark gray
        color.setRGB(finalB * 0.2, finalB * 0.22, finalB * 0.2);
      }

      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, TOTAL]}>
      <planeGeometry args={[1, 1]} />
      <meshBasicMaterial
        transparent
        opacity={0.15}
        side={THREE.DoubleSide}
        toneMapped={false}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </instancedMesh>
  );
}

export default function MatrixParticles() {
  return (
    <div className="matrix-particles">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <Wall side={-1} />
        <Wall side={1} />
        <Streams />
      </Canvas>
    </div>
  );
}
