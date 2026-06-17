# XP_TV APK Reverse Engineering & Modification Guide

## 📋 Descripción

Este repositorio contiene la APK original de XP_TV, la versión modificada y firmada correctamente, y el código descompilado para análisis.

## 📁 Estructura del Proyecto

```
XuperWalter/
├── XP_TV.apk                 # APK original sin modificar
├── XP_TV_signed.apk          # APK modificada y firmada correctamente
├── XP_TV_decompiled/        # Código fuente descompilado
└── README.md                # Este archivo
```

## 🔧 Procedimiento Completo para Modificar y Firmar APKs

### Paso 1: Descargar e Instalar Herramientas

#### Java JDK 8 (Requerido)
```bash
# Descargar JDK 8 para Linux x64
wget https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jdk_x64_linux_hotspot_8u422b05.tar.gz
tar -xzf OpenJDK8U-jdk_x64_linux_hotspot_8u422b05.tar.gz
export PATH=$PWD/jdk8u422-b05/bin:$PATH
java -version
```

#### APKTool
```bash
# Descargar APKTool
wget https://github.com/iBotPeaches/Apktool/releases/download/v2.9.3/apktool_2.9.3.jar
mv apktool_2.9.3.jar apktool.jar
chmod +x apktool.jar
```

#### uber-apk-signer (Recomendado para firmar)
```bash
# Descargar uber-apk-signer
wget https://github.com/patrickfav/uber-apk-signer/releases/download/v1.3.0/uber-apk-signer-1.3.0.jar
```

### Paso 2: Crear Keystore para Firmar

```bash
# Crear directorio de configuración de Android
mkdir -p ~/.android

# Generar keystore de debug
keytool -genkeypair -v -keystore ~/.android/debug.keystore \
    -alias androiddebugkey \
    -keyalg RSA -keysize 2048 \
    -validity 10000 \
    -storepass android -keypass android \
    -dname "CN=Android Debug,O=Android,C=US"
```

### Paso 3: Descompilar la APK

```bash
# Descompilar APK (sin recursos para evitar errores)
java -jar apktool.jar d XP_TV.apk -o XP_TV_decompiled --no-res

# O con recursos (puede causar errores)
java -jar apktool.jar d XP_TV.apk -o XP_TV_decompiled
```

### Paso 4: Modificar Archivos

Editar los archivos deseados en el directorio `XP_TV_decompiled/`:

```bash
# Ejemplo: Modificar un archivo de configuración
nano XP_TV_decompiled/assets/domain_test.json
```

**Importante:** No modificar los archivos en `original/` ya que contienen datos de firma.

### Paso 5: Recompilar la APK

```bash
# IMPORTANTE: Limpiar firmas existentes antes de recompilar
cd XP_TV_decompiled
rm -rf META-INF
cd ..

# Recompilar
java -jar apktool.jar b XP_TV_decompiled -o XP_TV_unsigned.apk
```

### Paso 6: Firmar y Alinear la APK

Usando **uber-apk-signer** (recomendado - incluye zipalign):
```bash
java -jar uber-apk-signer-1.3.0.jar \
    -a XP_TV_unsigned.apk \
    -o signed \
    --ks ~/.android/debug.keystore \
    --ksAlias androiddebugkey \
    --ksPass android \
    --ksKeyPass android
```

El archivo firmado estará en: `signed/XP_TV_unsigned-aligned-signed.apk`

### Paso 7: Instalar en el Dispositivo

```bash
# Desinstalar versión anterior
adb uninstall com.android.mgstv

# Instalar nueva APK
adb install -r XP_TV_signed.apk
```

## ⚠️ Errores Comunes y Soluciones

### Error: INSTALL_PARSE_FAILED_NO_CERTIFICATES
```
Cause: La APK no está firmada correctamente.
Solution: Usar jarsigner o uber-apk-signer para firmar con algoritmo SHA256withRSA.
```

### Error: INSTALL_PARSE_FAILED_INCONSISTENT_CERTIFICATES
```
Cause: La APK ya tiene una firma diferente.
Solution: Desinstalar la app existente primero: adb uninstall <package>
```

### Error: INSTALL_PARSE_FAILED_NO_CERTIFICATES: Scanning Failed
```
Cause: Falta firma v2 o v3.
Solution: Usar uber-apk-signer que añade firmas v1, v2 y v3 automáticamente.
```

### Error: Targeting R+ requires resources.arsc aligned
```
Cause: La APK no está alineada a 4 bytes.
Solution: Usar zipalign antes de firmar, o usar uber-apk-signer que incluye zipalign.
```

### Error: Malformed APK: not a ZIP archive
```
Cause: La APK está corrupta o mal reconstruida.
Solution: Volver a descompilar y recompilar con APKTool, limpiar META-INF.
```

## 🔐 Información de Firmado

### Formato de Firmas
- **v1**: JAR signing (legacy)
- **v2**: APK Signature Scheme v2
- **v3**: APK Signature Scheme v3

Android 7.0+ requiere al menos firma v2 para instalar.

### Algoritmos Recomendados
```
- SigAlg: SHA256withRSA
- KeyAlg: RSA
- KeySize: 2048 bits
```

## 📝 Notas Importantes

1. **Sempre fazer backup** da APK original antes de modificar
2. **Não modificar META-INF** - contiene firmas digitales
3. **Usar uber-apk-signer** - facilita el proceso y evita errores
4. **Verificar la firma** después de modificar: `jarsigner -verify APK.apk`
5. **Limpiar el proyecto** antes de reconstruir: `rm -rf META-INF`

## 🔍 Verificación Post-Modificación

```bash
# Verificar que la APK está firmada
jarsigner -verify -verbose XP_TV_signed.apk

# Verificar alineación
zipalign -c -v 4 XP_TV_signed.apk

# Información de la APK
aapt dump badging XP_TV_signed.apk
```

## 📚 Recursos

- [APKTool Documentation](https://ibotpeaches.github.io/Apktool/)
- [uber-apk-signer](https://github.com/patrickfav/uber-apk-signer)
- [Android Signing](https://developer.android.com/studio/publish/app-signing)

## 📄 Licencia

Este proyecto es para fines educativos y de investigación.

---

**Creado con OpenHands**
