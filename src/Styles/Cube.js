import {  useRef } from 'react'
import { useFrame } from 'react-three-fiber'

import { FontLoader } from 'three'

import Roboto from '../assets/Roboto_Bold.json'

// const loader = new THREE.FontLoader();

// loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

// 	const geometry = new THREE.TextGeometry( 'Hello three.js!', {
// 		font: font,
// 		size: 80,
// 		height: 5,
// 		curveSegments: 12,
// 		bevelEnabled: true,
// 		bevelThickness: 10,
// 		bevelSize: 8,
// 		bevelOffset: 0,
// 		bevelSegments: 5
// 	} );
// } );

const Cube = (props) => {
    const mesh = useRef()
    const text = useRef()

    const font = new FontLoader().parse(Roboto);

    const textOptions = {
        font,
        size: 0.5,
        height: 1
    };
  
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        if (props.animated) mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    })

    return (
        <group>
            <mesh
                ref={text}
                {...props}
                rotation={[0, 0, 0]}
            >
                <textGeometry attach="geometry" args={[`${props.index}`, textOptions]} />
                <meshStandardMaterial color={props.color} />
            </mesh>
            <mesh
                ref={mesh}
                {...props}
                rotation={[0, 0, 0]}
            >
                {!props.isBall ? <boxBufferGeometry args={[1, 1, 1]} /> : <sphereBufferGeometry args={[0.7, 32, 32]}/>}
                <meshStandardMaterial color={props.color} />
            </mesh>
        </group>
    )
}

export default Cube