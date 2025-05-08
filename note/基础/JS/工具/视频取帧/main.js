/**
 * 视频取帧绘制
 * @param { HTMLVideoElement | string } v
 * @param { HTMLCanvas | string } c
 * @param { number } scale
 * @description 这里主要是采用 CanvasRenderingContext2D.drawImage api进行绘制，使用video作为图像源
 * @link https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage
 */
const cutFrameDraw = (v, c, scale = 1) => {
  const video =
    v instanceof HTMLVideoElement
      ? v
      : typeof v === "string"
      ? document.querySelector(v)
      : null;
  const canvas =
    c instanceof HTMLCanvasElement
      ? c
      : typeof c === "string"
      ? document.querySelector(c)
      : null;
  if (!video || !canvas) return;
  canvas.width = video.videoWidth * scale;
  canvas.height = video.videoHeight * scale;
  canvas.setAttribute("crossOrigin", "Anonymous");
  const context = canvas.getContext("2d");
  context && context.drawImage(video, 0, 0, canvas.width, canvas.height);
};

const init = () => {
  const videoElement = document.querySelector("video");
  const canvasElement = document.querySelector("canvas");

  videoElement.addEventListener("loadedmetadata", () => {
    setTimeout(() => {
      cutFrameDraw(videoElement, canvasElement);
    }, 100);
  });

  videoElement.addEventListener("timeupdate", () => {
    cutFrameDraw(videoElement, canvasElement);
  });
};

init();
