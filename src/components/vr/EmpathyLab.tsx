import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Play,
  Pause,
  RotateCcw,
  Settings,
  Users,
  Headphones,
  Monitor,
  Heart,
  Brain,
  Zap,
} from "lucide-react";

interface EmpathyLabProps {
  scenario: {
    id: string;
    title: string;
    description: string;
    perspectives: string[];
    environment: string;
    duration: number;
    difficulty: "beginner" | "intermediate" | "advanced";
  };
  onComplete: (results: EmpathyResults) => void;
}

interface EmpathyResults {
  empathyGain: number;
  perspectivesSwitched: number;
  timeSpent: number;
  emotionalResponse: string[];
  learningPoints: string[];
}

export const EmpathyLab: React.FC<EmpathyLabProps> = ({
  scenario,
  onComplete,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene>();
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const [isVRSupported, setIsVRSupported] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [currentPerspective, setCurrentPerspective] = useState(0);
  const [progress, setProgress] = useState(0);
  const [empathyScore, setEmpathyScore] = useState(0);

  useEffect(() => {
    initializeVRScene();
    checkVRSupport();

    return () => {
      cleanup();
    };
  }, []);

  const checkVRSupport = async () => {
    if ("xr" in navigator) {
      try {
        const isSupported = await (navigator as any).xr.isSessionSupported(
          "immersive-vr",
        );
        setIsVRSupported(isSupported);
      } catch (error) {
        console.log("VR not supported:", error);
        setIsVRSupported(false);
      }
    }
  };

  const initializeVRScene = () => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x505050);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 1.6, 3);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Create environment based on scenario
    createEnvironment(scene, scenario.environment);

    // Add VR controllers
    setupVRControllers(scene, renderer);

    // Add to container
    containerRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Animation loop
    const animate = () => {
      renderer.setAnimationLoop(render);
    };

    const render = () => {
      if (isRunning) {
        updateProgress();
        updateEmpathyMetrics();
      }
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    window.addEventListener("resize", onWindowResize);
  };

  const createEnvironment = (scene: THREE.Scene, environmentType: string) => {
    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 20);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    switch (environmentType) {
      case "village":
        createVillageEnvironment(scene);
        break;
      case "urban":
        createUrbanEnvironment(scene);
        break;
      case "nature":
        createNatureEnvironment(scene);
        break;
      case "historical":
        createHistoricalEnvironment(scene);
        break;
      default:
        createAbstractEnvironment(scene);
    }

    // Add perspective markers
    scenario.perspectives.forEach((perspective, index) => {
      const marker = createPerspectiveMarker(perspective, index);
      marker.position.set(
        Math.cos((index / scenario.perspectives.length) * Math.PI * 2) * 3,
        1,
        Math.sin((index / scenario.perspectives.length) * Math.PI * 2) * 3,
      );
      scene.add(marker);
    });
  };

  const createVillageEnvironment = (scene: THREE.Scene) => {
    // Simple village with houses
    for (let i = 0; i < 5; i++) {
      const house = createHouse();
      house.position.set(
        (Math.random() - 0.5) * 15,
        0,
        (Math.random() - 0.5) * 15,
      );
      house.rotation.y = Math.random() * Math.PI;
      scene.add(house);
    }

    // Add trees
    for (let i = 0; i < 10; i++) {
      const tree = createTree();
      tree.position.set(
        (Math.random() - 0.5) * 18,
        0,
        (Math.random() - 0.5) * 18,
      );
      scene.add(tree);
    }
  };

  const createUrbanEnvironment = (scene: THREE.Scene) => {
    // Simple urban environment with buildings
    for (let i = 0; i < 8; i++) {
      const building = createBuilding();
      building.position.set(
        (Math.random() - 0.5) * 16,
        0,
        (Math.random() - 0.5) * 16,
      );
      scene.add(building);
    }
  };

  const createNatureEnvironment = (scene: THREE.Scene) => {
    // Nature environment with trees and rocks
    for (let i = 0; i < 15; i++) {
      const tree = createTree();
      tree.position.set(
        (Math.random() - 0.5) * 18,
        0,
        (Math.random() - 0.5) * 18,
      );
      scene.add(tree);
    }

    for (let i = 0; i < 8; i++) {
      const rock = createRock();
      rock.position.set(
        (Math.random() - 0.5) * 16,
        0,
        (Math.random() - 0.5) * 16,
      );
      scene.add(rock);
    }
  };

  const createHistoricalEnvironment = (scene: THREE.Scene) => {
    // Historical environment with ancient structures
    const monument = createMonument();
    monument.position.set(0, 0, -5);
    scene.add(monument);

    // Add pillars
    for (let i = 0; i < 6; i++) {
      const pillar = createPillar();
      pillar.position.set(
        Math.cos((i / 6) * Math.PI * 2) * 6,
        0,
        Math.sin((i / 6) * Math.PI * 2) * 6,
      );
      scene.add(pillar);
    }
  };

  const createAbstractEnvironment = (scene: THREE.Scene) => {
    // Abstract floating shapes
    for (let i = 0; i < 12; i++) {
      const shape = createAbstractShape();
      shape.position.set(
        (Math.random() - 0.5) * 15,
        Math.random() * 5 + 2,
        (Math.random() - 0.5) * 15,
      );
      scene.add(shape);
    }
  };

  const createHouse = () => {
    const group = new THREE.Group();

    // House body
    const bodyGeometry = new THREE.BoxGeometry(2, 2, 2);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 1;
    body.castShadow = true;
    group.add(body);

    // Roof
    const roofGeometry = new THREE.ConeGeometry(1.5, 1, 4);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0xff0000 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 2.5;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    group.add(roof);

    return group;
  };

  const createBuilding = () => {
    const height = Math.random() * 5 + 3;
    const geometry = new THREE.BoxGeometry(2, height, 2);
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.3, 0.7),
    });
    const building = new THREE.Mesh(geometry, material);
    building.position.y = height / 2;
    building.castShadow = true;
    return building;
  };

  const createTree = () => {
    const group = new THREE.Group();

    // Trunk
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.2, 2);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1;
    trunk.castShadow = true;
    group.add(trunk);

    // Leaves
    const leavesGeometry = new THREE.SphereGeometry(1);
    const leavesMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
    const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
    leaves.position.y = 2.5;
    leaves.castShadow = true;
    group.add(leaves);

    return group;
  };

  const createRock = () => {
    const geometry = new THREE.DodecahedronGeometry(0.5);
    const material = new THREE.MeshLambertMaterial({ color: 0x696969 });
    const rock = new THREE.Mesh(geometry, material);
    rock.position.y = 0.5;
    rock.castShadow = true;
    return rock;
  };

  const createMonument = () => {
    const geometry = new THREE.CylinderGeometry(0.5, 1, 4);
    const material = new THREE.MeshLambertMaterial({ color: 0xf5deb3 });
    const monument = new THREE.Mesh(geometry, material);
    monument.position.y = 2;
    monument.castShadow = true;
    return monument;
  };

  const createPillar = () => {
    const geometry = new THREE.CylinderGeometry(0.3, 0.3, 3);
    const material = new THREE.MeshLambertMaterial({ color: 0xdddddd });
    const pillar = new THREE.Mesh(geometry, material);
    pillar.position.y = 1.5;
    pillar.castShadow = true;
    return pillar;
  };

  const createAbstractShape = () => {
    const shapes = [
      new THREE.SphereGeometry(0.5),
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.OctahedronGeometry(0.7),
      new THREE.TetrahedronGeometry(0.8),
    ];

    const geometry = shapes[Math.floor(Math.random() * shapes.length)];
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.8, 0.6),
      transparent: true,
      opacity: 0.8,
    });

    const shape = new THREE.Mesh(geometry, material);

    // Add rotation animation
    const rotationSpeed = (Math.random() - 0.5) * 0.02;
    shape.userData = { rotationSpeed };

    return shape;
  };

  const createPerspectiveMarker = (perspective: string, index: number) => {
    const group = new THREE.Group();

    // Marker base
    const baseGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1);
    const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    group.add(base);

    // Marker pillar
    const pillarGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5);
    const pillarMaterial = new THREE.MeshLambertMaterial({ color: 0x4a90e2 });
    const pillar = new THREE.Mesh(pillarGeometry, pillarMaterial);
    pillar.position.y = 0.75;
    group.add(pillar);

    // Perspective indicator
    const indicatorGeometry = new THREE.SphereGeometry(0.2);
    const indicatorMaterial = new THREE.MeshLambertMaterial({
      color: index === currentPerspective ? 0x00ff00 : 0xffffff,
    });
    const indicator = new THREE.Mesh(indicatorGeometry, indicatorMaterial);
    indicator.position.y = 1.5;
    group.add(indicator);

    group.userData = { perspective, index };

    return group;
  };

  const setupVRControllers = (
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
  ) => {
    const controllerModelFactory = new XRControllerModelFactory();

    // Controller 1
    const controller1 = renderer.xr.getController(0);
    controller1.addEventListener("selectstart", onSelectStart);
    controller1.addEventListener("selectend", onSelectEnd);
    scene.add(controller1);

    const controllerGrip1 = renderer.xr.getControllerGrip(0);
    controllerGrip1.add(
      controllerModelFactory.createControllerModel(controllerGrip1),
    );
    scene.add(controllerGrip1);

    // Controller 2
    const controller2 = renderer.xr.getController(1);
    controller2.addEventListener("selectstart", onSelectStart);
    controller2.addEventListener("selectend", onSelectEnd);
    scene.add(controller2);

    const controllerGrip2 = renderer.xr.getControllerGrip(1);
    controllerGrip2.add(
      controllerModelFactory.createControllerModel(controllerGrip2),
    );
    scene.add(controllerGrip2);
  };

  const onSelectStart = (event: any) => {
    // Handle VR controller interaction
    const controller = event.target;

    // Raycast to detect perspective markers
    const raycaster = new THREE.Raycaster();
    raycaster.setFromXRController(controller);

    if (sceneRef.current) {
      const intersects = raycaster.intersectObjects(
        sceneRef.current.children,
        true,
      );

      for (const intersect of intersects) {
        const object = intersect.object;
        if (object.parent?.userData?.perspective) {
          switchPerspective(object.parent.userData.index);
          break;
        }
      }
    }
  };

  const onSelectEnd = () => {
    // Handle select end
  };

  const switchPerspective = (perspectiveIndex: number) => {
    if (
      perspectiveIndex >= 0 &&
      perspectiveIndex < scenario.perspectives.length
    ) {
      setCurrentPerspective(perspectiveIndex);

      // Update empathy score based on perspective switching
      setEmpathyScore((prev) => prev + 5);

      // Update camera position for new perspective
      if (cameraRef.current) {
        const angle =
          (perspectiveIndex / scenario.perspectives.length) * Math.PI * 2;
        cameraRef.current.position.set(
          Math.cos(angle) * 3,
          1.6,
          Math.sin(angle) * 3,
        );
        cameraRef.current.lookAt(0, 1, 0);
      }
    }
  };

  const updateProgress = () => {
    setProgress((prev) => {
      const newProgress = Math.min(prev + 0.1, 100);
      if (newProgress >= 100) {
        completeExperience();
      }
      return newProgress;
    });
  };

  const updateEmpathyMetrics = () => {
    // Simulate empathy learning based on time and interactions
    setEmpathyScore((prev) => prev + 0.1);
  };

  const completeExperience = () => {
    setIsRunning(false);

    const results: EmpathyResults = {
      empathyGain: empathyScore,
      perspectivesSwitched: currentPerspective + 1,
      timeSpent: scenario.duration,
      emotionalResponse: ["Understanding", "Compassion", "Insight"],
      learningPoints: [
        "Multiple perspectives exist for every conflict",
        "Cultural context shapes viewpoints",
        "Empathy requires active effort to understand others",
      ],
    };

    onComplete(results);
  };

  const startExperience = () => {
    setIsRunning(true);
    setProgress(0);
    setEmpathyScore(0);
    setCurrentPerspective(0);
  };

  const pauseExperience = () => {
    setIsRunning(!isRunning);
  };

  const resetExperience = () => {
    setIsRunning(false);
    setProgress(0);
    setEmpathyScore(0);
    setCurrentPerspective(0);

    if (cameraRef.current) {
      cameraRef.current.position.set(0, 1.6, 3);
      cameraRef.current.lookAt(0, 1, 0);
    }
  };

  const onWindowResize = () => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    }
  };

  const cleanup = () => {
    window.removeEventListener("resize", onWindowResize);

    if (rendererRef.current) {
      rendererRef.current.setAnimationLoop(null);
      rendererRef.current.dispose();
    }
  };

  return (
    <div className="w-full h-screen relative">
      {/* VR Scene Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Control Panel */}
      <div className="absolute top-4 left-4 space-y-4">
        <Card className="w-80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5" />
              {scenario.title}
            </CardTitle>
            <CardDescription>{scenario.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Progress</span>
                  <span className="text-sm font-medium">
                    {Math.round(progress)}%
                  </span>
                </div>
                <Progress value={progress} />
              </div>

              {/* Empathy Score */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Empathy Score</span>
                  <span className="text-sm font-medium">
                    {Math.round(empathyScore)}
                  </span>
                </div>
                <Progress value={Math.min(empathyScore, 100)} />
              </div>

              {/* Current Perspective */}
              <div>
                <span className="text-sm font-medium">
                  Current Perspective:
                </span>
                <Badge variant="outline" className="ml-2">
                  {scenario.perspectives[currentPerspective]}
                </Badge>
              </div>

              {/* Controls */}
              <div className="flex gap-2">
                <Button
                  onClick={startExperience}
                  disabled={isRunning}
                  className="flex-1"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start
                </Button>
                <Button
                  onClick={pauseExperience}
                  variant="outline"
                  disabled={!isRunning && progress === 0}
                >
                  <Pause className="h-4 w-4" />
                </Button>
                <Button onClick={resetExperience} variant="outline">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>

              {/* VR Button */}
              {isVRSupported && (
                <Button
                  onClick={() => {
                    if (rendererRef.current && containerRef.current) {
                      const vrButton = VRButton.createButton(
                        rendererRef.current,
                      );
                      vrButton.style.position = "relative";
                      vrButton.style.width = "100%";
                      vrButton.style.height = "40px";
                      vrButton.style.backgroundColor = "#4A90E2";
                      vrButton.style.border = "none";
                      vrButton.style.borderRadius = "6px";
                      vrButton.style.color = "white";
                      vrButton.style.fontSize = "14px";
                      vrButton.style.cursor = "pointer";
                      const buttonContainer = document.getElementById(
                        "vr-button-container",
                      );
                      if (buttonContainer) {
                        buttonContainer.innerHTML = "";
                        buttonContainer.appendChild(vrButton);
                      }
                    }
                  }}
                  className="w-full"
                  variant="default"
                >
                  <Headphones className="h-4 w-4 mr-2" />
                  Enter VR Mode
                </Button>
              )}

              <div id="vr-button-container" className="hidden"></div>
            </div>
          </CardContent>
        </Card>

        {/* Perspectives Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Available Perspectives
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {scenario.perspectives.map((perspective, index) => (
                <Button
                  key={index}
                  variant={index === currentPerspective ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => switchPerspective(index)}
                >
                  {perspective}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Panel */}
      <div className="absolute top-4 right-4">
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5" />
              Experience Info
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Environment:</span>
                <Badge variant="secondary">{scenario.environment}</Badge>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{scenario.duration} min</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty:</span>
                <Badge
                  variant={
                    scenario.difficulty === "beginner"
                      ? "secondary"
                      : scenario.difficulty === "intermediate"
                        ? "default"
                        : "destructive"
                  }
                >
                  {scenario.difficulty}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>VR Support:</span>
                <Badge variant={isVRSupported ? "default" : "secondary"}>
                  {isVRSupported ? "Available" : "Browser Only"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmpathyLab;
