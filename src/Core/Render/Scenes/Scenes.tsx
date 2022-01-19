import {
  HemisphericLight,
  Scene,
  UniversalCamera,
  Vector2,
  Vector3,
  Color4,
  MeshBuilder,
  DynamicTexture,
  PointerInfo,
  PointerEventTypes,
  ShaderMaterial,
  Effect
} from "@babylonjs/core";
import { CustomMaterial } from "@babylonjs/materials";

interface ISceneData {
  onInit: (scene: Scene) => void;
}
export class Scenes {
  static BattleField: ISceneData = {
    onInit: (scene: Scene) => {
      scene.clearColor = new Color4(255, 255, 255, 0);
      const camera = new UniversalCamera(
        "mainCamera",
        new Vector3(0, 65, -65),
        scene
      );
      camera.setTarget(Vector3.Zero());

      const quad = MeshBuilder.CreateGround(
        "quadBase",
        {
          width: 1,
          height: 1,
          subdivisions: 1
        },
        scene
      );

      quad.setEnabled(false);
      const gridSize = new Vector2(10, 9);
      const paddingSize = 0.4;
      const cellSize = 6;
      const instances = [];

      let xStart = gridSize.x * -0.5 * (cellSize + paddingSize);
      let yStart = gridSize.y * -0.5 * (cellSize + paddingSize);
      let idx = 0;
      for (let y = 0; y < gridSize.y; y++) {
        for (let x = 0; x < gridSize.x; x++) {
          const instance = quad.createInstance(`${x}:${y}`);
          instance.position.x = xStart + x * (cellSize + paddingSize);
          instance.position.z = yStart + y * (cellSize + paddingSize);
          instance.position.x += cellSize * 0.5;
          instance.scaling.x = cellSize;
          instance.scaling.z = cellSize;
          instance.metadata = {
            isGridCell: true,
            cellPos: { x, y },
            cellId: idx++
          };
          instances.push(instance);
        }
      }

      Effect.ShadersStore["battleGridVertexShader"] = `
      precision highp float;
      // Attributes
      attribute vec3 position;
      #include<instancesDeclaration>
      // Uniforms
      uniform mat4 worldViewProjection;
      uniform mat4 viewProjection;
      uniform mat4 worldView;

      varying float vInstanceId;
      varying vec2 vCellPos;

      void main(void) {
        #include<instancesVertex>
        gl_Position = viewProjection * finalWorld * vec4(position, 1.0); 
        vInstanceId = float(gl_InstanceID)+0.01;
        vCellPos = vec2(0.0);
        vCellPos.y = floor(vInstanceId / 10.0);
        vCellPos.x = vInstanceId - (vCellPos.y * 10.0);
        vCellPos.x += 0.01;
        vCellPos.y += 0.01;   
      }`;

      Effect.ShadersStore["battleGridFragmentShader"] = `
      precision highp float;
      uniform sampler2D gridColorBuffer;

      varying float vInstanceId;
      varying vec2 vCellPos;

      void main(void) {
          int instanceID = int(vInstanceId);
          int cellX = int(vCellPos.x);
          int cellY = int(vCellPos.y);
          gl_FragColor = vec4(texelFetch(gridColorBuffer, ivec2(cellX, 8-cellY), 0).rgb, 0.5);
      }`;

      var gridShaderMat = new ShaderMaterial(
        "battleGrid",
        scene,
        {
          vertex: "battleGrid",
          fragment: "battleGrid"
        },
        {
          attributes: [
            "position",
            "normal",
            "uv",
            "color",
            "world0",
            "world1",
            "world2",
            "world3"
          ],
          uniforms: [
            "world",
            "worldview",
            "worldViewProjection",
            "viewProjection"
          ],
          samplers: ["gridColorBuffer"],
          needAlphaBlending: true,
          needAlphaTesting: true,
          defines: ["#define _INSTANCES"]
        }
      );

      quad.material = gridShaderMat;

      // var shaderMaterial = new ShaderMaterial(
      //   "shader",
      //   scene,
      //   {
      //     vertex: "custom",
      //     fragment: "custom"
      //   },

      //   {
      //     attributes: ["position", "normal", "uv"],
      //     uniforms: [
      //       "world",
      //       "worldView",
      //       "worldViewProjection",
      //       "view",
      //       "projection"
      //     ]
      //   }
      // );
      //
      // const quadMat = new CustomMaterial("cellMat", scene);
      // quad.material = quadMat;
      // quadMat.AddUniform("gridColorBuffer", "sampler2D", gridColorBuffer);

      // quadMat.Vertex_Definitions(
      //   "varying float vInstanceId;/n" + "varying vec2 vCellPos;/n"
      // );

      //   quadMat.Vertex_MainBegin(`
      //     vInstanceId = float(gl_InstanceID)+0.01;
      //     vCellPos = vec2(0.0);
      //     vCellPos.y = floor(vInstanceId / 10.0);
      //     vCellPos.x = vInstanceId - (vCellPos.y * 10.0);
      //     vCellPos.x += 0.01;
      //     vCellPos.y += 0.01;
      // `);

      //   quadMat.Fragment_Definitions(
      //     `
      //     varying float vInstanceId;
      //     varying vec2 vCellPos;
      //    `
      //   );

      //   quadMat.Fragment_MainBegin(
      //     `
      //     int instanceID = int(vInstanceId);
      //     int cellX = int(vCellPos.x);
      //     int cellY = int(vCellPos.y);
      //     `
      //   );

      //   quadMat.Fragment_Before_Fog(
      //     `
      //     color.rgba = texelFetch(gridColorBuffer, ivec2(cellX, 8-cellY), 0).rgba;
      //     `
      //   );

      const gridColorBuffer = new DynamicTexture(
        "gridColorBuffer",
        { width: gridSize.x, height: gridSize.y },
        scene
      );
      const ctx = gridColorBuffer.getContext();
      ctx.clearRect(0, 0, 10, 9);
      gridColorBuffer.update(true);

      const pointerData = {
        selectedCell: new Vector2(-1, -1),
        isPointerDown: false,
        originalPointer: scene.defaultCursor
      };
      const colors = {
        highlight: "rgba(200, 200, 200, 0.8)",
        active: "rgba(250, 250, 180, 0.8)"
      };
      const updateColorBuffer = () => {
        ctx.clearRect(0, 0, 10, 9);
        ctx.fillStyle = "rgba(100, 100, 100, 0.5)";
        ctx.fillRect(0, 0, 10, 9);
        ctx.fillStyle = pointerData.isPointerDown
          ? colors.active
          : colors.highlight;
        ctx.fillRect(
          pointerData.selectedCell.x,
          pointerData.selectedCell.y,
          1,
          1
        );
        gridColorBuffer.update();
      };

      gridShaderMat.onBindObservable.add(() => {
        gridShaderMat.setTexture("gridColorBuffer", gridColorBuffer);
      });

      // quadMat.onBindObservable.add(() => {
      //   const effect = quadMat.getEffect();
      //   effect.setTexture("gridColorBuffer", gridColorBuffer);
      // });

      // scene.onBeforeRenderObservable.add(() => {
      //     //console.log(scene.pointerX, scene.pointerY);

      // });
      updateColorBuffer();

      scene.onPointerObservable.add((pointerInfo: PointerInfo) => {
        const eventType = pointerInfo.type;
        switch (eventType) {
          case PointerEventTypes.POINTERMOVE: {
            const pick = scene.pick(scene.pointerX, scene.pointerY, (mesh) => {
              return mesh.metadata?.isGridCell;
            });
            if (pick?.pickedMesh) {
              scene.defaultCursor = "pointer";
              pointerData.selectedCell.x = pick.pickedMesh.metadata.cellPos.x;
              pointerData.selectedCell.y = pick.pickedMesh.metadata.cellPos.y;
            } else {
              scene.defaultCursor = "default";
              pointerData.selectedCell.x = -1;
              pointerData.selectedCell.y = -1;
            }
            updateColorBuffer();
            break;
          }
          case PointerEventTypes.POINTERDOWN: {
            pointerData.isPointerDown = true;
            updateColorBuffer();
            break;
          }
          case PointerEventTypes.POINTERUP: {
            pointerData.isPointerDown = false;
            updateColorBuffer();
            break;
          }
        }
      });
    }
  };
}
