// Detects when the browser renders without GPU help (hardware acceleration
// off, remote desktops, very old machines). In that mode blur filters,
// backdrop-filter, parallax and JS smooth-scrolling are painted by the CPU on
// every frame and make scrolling stutter, so the site switches them off.

const SOFTWARE_RENDERERS =
  /swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/i;

let cached: boolean | undefined;

export function isLowPowerRendering(): boolean {
  if (cached !== undefined) return cached;
  cached = detect();
  return cached;
}

function detect(): boolean {
  if (typeof document === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl2") ??
      canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return true;

    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = debugInfo
      ? String(gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL))
      : String(gl.getParameter(gl.RENDERER));
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return SOFTWARE_RENDERERS.test(renderer);
  } catch {
    return false;
  }
}
