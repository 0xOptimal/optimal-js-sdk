// This plugin is required for fixing `.apk` build issue
// It appends Expo and RN versions into the `build.gradle` file
// References:
// https://github.com/t3-oss/create-t3-turbo/issues/120
// https://github.com/expo/expo/issues/18129

/** @type {import("@expo/config-plugins").ConfigPlugin} */
const defineConfig = (config) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("@expo/config-plugins").withProjectBuildGradle(
    config,
    (conf) => {
      if (!conf.modResults.contents.includes("ext.getPackageJsonVersion =")) {
        conf.modResults.contents = conf.modResults.contents.replace(
          "buildscript {",
          `buildscript {
    ext.getPackageJsonVersion = { packageName ->
        new File(['node', '--print', "JSON.parse(require('fs').readFileSync(require.resolve('\${packageName}/package.json'), 'utf-8')).version"].execute(null, rootDir).text.trim())
    }`,
        );
      }

      if (!conf.modResults.contents.includes("reactNativeVersion =")) {
        conf.modResults.contents = conf.modResults.contents.replace(
          "ext {",
          `ext {
        reactNativeVersion = "\${ext.getPackageJsonVersion('react-native')}"`,
        );
      }

      if (!conf.modResults.contents.includes("expoPackageVersion =")) {
        conf.modResults.contents = conf.modResults.contents.replace(
          "ext {",
          `ext {
        expoPackageVersion = "\${ext.getPackageJsonVersion('expo')}"`,
        );
      }

      return conf;
    },
  );
};

module.exports = defineConfig;
