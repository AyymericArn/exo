import './App.css';
import Button from './Styles/Button'
import Cube from './Styles/Cube';
import Container from './Styles/Container';
import { useEffect, useRef } from 'react'

import { Canvas, extend, useFrame, useThree } from 'react-three-fiber'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

import {
  useDispatch,
  useSelector
} from 'react-redux'
import { add_cube, ball, stop_odd, change_odd, shuffle } from './actions/action-types';

extend({ OrbitControls })

// thanks https://codeworkshop.dev/blog/2020-04-03-adding-orbit-controls-to-react-three-fiber/
const CameraControls = () => {
    const {
        camera,
        gl: { domElement },
    } = useThree()
    const controls = useRef()
    useFrame(() => controls.current.update())
    return <orbitControls ref={controls} args={[camera, domElement]} />
}

function App() {
  const { cubes } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (cubes.length === 17 && !cubes[16].ball) {
      dispatch(ball())
    }
  }, [cubes])

  const handleAddCircle = () => {
    dispatch(add_cube())
  }

  const handleOddAnimationStart = () => {
    dispatch(change_odd())
  }

  const handleOddAnimationStop = () => {
    dispatch(stop_odd())
  }

  const handleShuffle = () => {
    dispatch(shuffle())
  }

  return (
    <div className="App">
      <Button onClick={handleAddCircle}>Add circle</Button>
      <Button onClick={handleShuffle} primary>Shuffle</Button>
      <Button onClick={handleOddAnimationStop} primary>Stop odd anim</Button>
      <Button onClick={handleOddAnimationStart} primary>Start odd anim</Button>
      <Container>
        <Canvas >
          <CameraControls/>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          {cubes.map((cube, position) => <Cube 
            key={cube.id}
            animated={cube.animated}
            position={[
              -4 + 2* (position % 5), 
              2 - 2* (Math.floor(position / 5)) , 
            0]}
            color={cube.color}
            isBall={cube.ball}
          />)}
        </Canvas>
      </Container>
    </div>
  );
}

export default App;
