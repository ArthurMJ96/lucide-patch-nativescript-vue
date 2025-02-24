const { execSync } = require("child_process");
const path = require("path");

console.log("[lucide-patch-nativescript-vue]: Applying patch...");

try {
  // Locate the real project root (3 levels up from inside node_modules)
  const projectRoot = path.resolve(__dirname, "../../../");
  const relativePatchDir = path.relative(projectRoot, path.join(__dirname, "patches"));
  console.log(
    "[lucide-patch-nativescript-vue]: Looking for patches in:",
    relativePatchDir
  );

  // Run patch-package from the actual project root
  console.log(
    "[lucide-patch-nativescript-vue]: Applying patches in:",
    projectRoot
  );
  execSync(`npx patch-package --patch-dir ${relativePatchDir}`, {
    cwd: projectRoot, // Set working directory to project root
    stdio: "inherit",
  });

  console.log("[lucide-patch-nativescript-vue]: Patch applied successfully!");
} catch (error) {
  console.error(
    "[lucide-patch-nativescript-vue]: Error applying patch:",
    error
  );
  process.exit(1);
}
