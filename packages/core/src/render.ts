import { NullRenderer } from "./NullRenderer";

export function render(reactElement, callback?) {
  const container = NullRenderer.createContainer(null, false);
  NullRenderer.injectIntoDevTools({
    bundleType: 1, // 0 for PROD, 1 for DEV
    version: "0.1.0", // version for your renderer
    rendererPackageName: "custom-renderer", // package name
    findHostInstanceByFiber: NullRenderer.findHostInstance // host instance (root)
  });
  return NullRenderer.updateContainer(reactElement, container, null, callback);
}
