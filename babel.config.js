module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ]
}







//vantui
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant'],
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    ["@nutui/babel-plugin-separate-import", {
      "style": "css"
    }]
  ],
  presets: [
    "@vue/app",
    ["@babel/preset-env", { "modules": false }]
  ],
 
};