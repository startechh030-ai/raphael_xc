import { useMemo, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/* ------------------------------------------------------------------
   Hero scene — hand-rolled on top of three.js (no helper libraries)
   so the WebGL bundle stays as small as possible:
     · one displaced icosahedron with a fresnel shader (~10k tris)
     · a wireframe shell + three orbital rings
     · ~520 points of drifting dust
   It lazily loads after first paint and stops rendering offscreen.
------------------------------------------------------------------ */

const CYAN = '#43e0ff'
const VIOLET = '#7c5cff'

const vertexShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying vec3 vLocal;

  float wobble(vec3 p, float t) {
    return sin(p.x * 2.1 + t) * sin(p.y * 2.4 + t * 1.15) * sin(p.z * 1.9 + t * 0.85);
  }

  void main() {
    vec3 pos = position + normal * wobble(position, uTime * 0.55) * 0.085;
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    vLocal = pos;
    gl_Position = projectionMatrix * mv;
  }
`

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uCyan;
  uniform vec3 uViolet;
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  varying vec3 vLocal;

  void main() {
    vec3 n = normalize(vNormalV);
    float fres = pow(1.0 - clamp(dot(n, normalize(vViewDir)), 0.0, 1.0), 2.6);

    float grad = smoothstep(-1.1, 1.1, n.y * 0.75 + vLocal.x * 0.35 + sin(uTime * 0.28) * 0.3);
    vec3 tint = mix(uViolet, uCyan, grad);

    // Dark glass body with a hot iridescent rim.
    vec3 col = mix(vec3(0.020, 0.028, 0.055), tint, 0.30);
    col += fres * tint * 1.55;

    // Faint horizontal scan bands for a "signal" texture.
    float scan = smoothstep(0.35, 0.65, fract(vLocal.y * 5.5 - uTime * 0.22));
    col *= 0.9 + 0.18 * scan;

    gl_FragColor = vec4(col, 1.0);
  }
`

/** The iridescent core: displaced icosahedron + custom fresnel material. */
function Core({ detail }: { detail: number }) {
  const mesh = useRef<THREE.Mesh>(null)

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTime: { value: 0 },
          uCyan: { value: new THREE.Color(CYAN) },
          uViolet: { value: new THREE.Color(VIOLET) },
        },
      }),
    [],
  )

  useFrame((_, delta) => {
    material.uniforms.uTime.value += delta
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.16
      mesh.current.rotation.x += delta * 0.05
    }
  })

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.55, detail]} />
      <primitive object={material} attach="material" />
    </mesh>
  )
}

/** Gentle floating motion (a few lines instead of a helper library). */
function Float({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null)
  const t = useRef(0)

  useFrame((_, delta) => {
    const g = group.current
    if (!g) return
    t.current += delta
    g.position.y = Math.sin(t.current * 0.85) * 0.12
    g.rotation.x = Math.sin(t.current * 0.62) * 0.05
    g.rotation.z = Math.cos(t.current * 0.48) * 0.04
  })

  return <group ref={group}>{children}</group>
}

/** Wireframe shell + orbital rings, counter-rotating around the core. */
function Shell() {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!group.current) return
    group.current.rotation.y -= delta * 0.075
    group.current.rotation.z += delta * 0.03
  })

  return (
    <group ref={group}>
      <mesh>
        <icosahedronGeometry args={[2.28, 1]} />
        <meshBasicMaterial color="#7ea8ff" wireframe transparent opacity={0.16} depthWrite={false} />
      </mesh>

      <mesh rotation={[Math.PI / 2.4, 0.35, 0]}>
        <torusGeometry args={[2.75, 0.008, 6, 128]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.5} />
      </mesh>

      <mesh rotation={[Math.PI / 1.7, -0.5, 0.4]}>
        <torusGeometry args={[3.15, 0.006, 6, 128]} />
        <meshBasicMaterial color={VIOLET} transparent opacity={0.4} />
      </mesh>

      <mesh rotation={[Math.PI / 3, 0.9, -0.2]}>
        <torusGeometry args={[2.05, 0.005, 6, 96]} />
        <meshBasicMaterial color="#8affd1" transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

/** Drifting dust in a spherical shell around the core. */
function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3.1 + Math.random() * 3.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.75
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [count])

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.035
  })

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        sizeAttenuation
        color="#9fd8ff"
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  )
}

/** Pointer parallax rig — damped so it feels weighty, never twitchy. */
function Rig({ children }: { children: ReactNode }) {
  const group = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    const g = group.current
    if (!g) return
    const { x, y } = state.pointer
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, x * 0.34, 2.2, delta)
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, -y * 0.22, 2.2, delta)
    g.position.y = THREE.MathUtils.damp(g.position.y, y * 0.12, 2, delta)
  })

  return <group ref={group}>{children}</group>
}

export default function HeroScene({
  active = true,
  quality = 'high',
}: {
  active?: boolean
  quality?: 'high' | 'low'
}) {
  const high = quality === 'high'

  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      dpr={high ? [1, 1.75] : [1, 1.3]}
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      gl={{
        antialias: high,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
      }}
    >
      <ambientLight intensity={0.75} />
      <directionalLight position={[4, 5, 4]} intensity={1.1} />
      <pointLight position={[-5, -3, -4]} intensity={40} color={VIOLET} distance={18} />
      <pointLight position={[5, 3, 3]} intensity={30} color={CYAN} distance={18} />

      <Rig>
        <Float>
          <Core detail={high ? 14 : 6} />
        </Float>
        <Shell />
        {high && <Dust count={520} />}
      </Rig>

      <fog attach="fog" args={['#05070c', 9, 18]} />
    </Canvas>
  )
}
