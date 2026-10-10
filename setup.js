const fs = require('fs');
const p = 'android/app/src/main/AndroidManifest.xml';
let m = fs.readFileSync(p, 'utf8');
const perms = [
  '<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />',
  '<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="29" />'
];
perms.forEach(x => {
  const nombre = x.split('"')[1];
  if (!m.includes(nombre)) m = m.replace('</manifest>', '    ' + x + '\n</manifest>');
});
if (!m.includes('requestLegacyExternalStorage')) {
  m = m.replace('<application', '<application android:requestLegacyExternalStorage="true"');
}
fs.writeFileSync(p, m);
console.log('Permisos de almacenamiento listos.');
