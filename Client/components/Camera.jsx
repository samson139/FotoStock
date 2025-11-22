


import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const { nodes, materials } = useGLTF('/camera.gltf', true);
  console.log(nodes, materials);
  return (
    <group {...props} dispose={null}>
      <group scale={0.80}>
        <group rotation={[-Math.PI / 2, 0, 0]} scale={100}>
          <mesh geometry={nodes.camera_body_lens_0.geometry} material={materials.body_lens} />
          <mesh geometry={nodes.camera_lens_0.geometry} material={materials.lens} />
          <mesh geometry={nodes.camera_camera_body_0.geometry} material={materials.camera_body} />
          <mesh geometry={nodes.camera_strap_0.geometry} material={materials.strap} />
        </group>
        <mesh geometry={nodes.strap_strap_0.geometry} material={materials.strap} rotation={[-Math.PI / 2, 0, 0]} scale={100} />
      </group>
    </group>
  )
}

useGLTF.preload('/camera.gltf')
