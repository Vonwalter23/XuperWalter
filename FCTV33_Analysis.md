# 📱 Análisis Técnico - FCTV33 Premium v3.0.318

## Información General
| Campo | Valor |
|-------|-------|
| **Nombre del Paquete** | `com.fctv77.app` |
| **Versión Código** | 318 |
| **Nombre de Versión** | 3.0.318 |
| **Min SDK** | 22 (Android 5.1) |
| **Target SDK** | 34 (Android 14) |

## Arquitectura Detectada

### Activities (Pantallas)
- `com.rblive.app.ui.home.HomeActivity` - Pantalla principal
- `com.rblive.app.ui.player.PlayerActivity` - Reproductor de video
- `com.rblive.app.ui.activation.ActivationActivity` - Sistema de activación/licencias
- `com.rblive.launcher.splash.SplashActivity` - Pantalla de inicio
- `com.google.android.gms.common.api.GoogleApiActivity` - Autenticación Google

### Servicios
- Reproducción HLS nativa
- Reproducción DASH
- Sistema P2P para distribución
- PiP (Picture-in-Picture)

## Dominios y Endpoints Detectados

### Servidores Principales
| Dominio | Propósito |
|---------|-----------|
| `rbtv77.com` | Servidor principal de streaming |
| `logos1.tcrbg61levl.cfd` | CDN de logotipos |
| `vip1.openaicommunities.shop` | API principal |
| `vip1.openaicommunities.bond` | API alternativa |
| `vip1.openaicommunities.click` | API alternativa |
| `vip1.openalcommunities.sbs` | API alternativa |

### DNS Resolvers Utilizados
- `dns.alidns.com` (Alibaba)
- `dns.google`

## Permisos Solicitados

```xml
android.permission.INTERNET
android.permission.ACCESS_NETWORK_STATE
android.permission.ACCESS_WIFI_STATE
android.permission.WAKE_LOCK
android.permission.READ_EXTERNAL_STORAGE
android.permission.WRITE_EXTERNAL_STORAGE
android.permission.REQUEST_INSTALL_PACKAGES
android.permission.QUERY_ALL_PACKAGES
android.permission.ACCESS_ADSERVICES_AD_ID
com.google.android.gms.permission.AD_ID
```

## Tecnologías Detectadas en el Código

### Frameworks
- **Kotlin** - Lenguaje principal
- **Jetpack Compose** - UI moderna
- **ExoPlayer** - Reproducción de video
- **OkHttp3** - Cliente HTTP
- **Glide** - Carga de imágenes
- **Firebase Analytics** - Analítica
- **DataStore** - Almacenamiento local
- **Coroutines** - Programación asíncrona
- **Hilt** - Inyección de dependencias
- **P2P Engine** - Sistema P2P para streaming

### Librerías de Streaming
- HLS (HTTP Live Streaming)
- DASH (Dynamic Adaptive Streaming)
- RTMP
- WebSocket

## Estructura de Pantallas

### 1. SplashActivity
- Verificación de actualizaciones
- Verificación de licencia
- Redirección a Activation o Home

### 2. ActivationActivity
- Verificación del código de activación
- Conexión con servidor de licencias
- Registro del dispositivo

### 3. HomeActivity
- Lista de canales
- Categorías/Sports
- Búsqueda
- Configuración

### 4. PlayerActivity
- Reproductor de video con ExoPlayer
- Controles de reproducción
- Subtítulos
- PiP support
- Selector de calidad

## Flujo de Datos

```
[APP] → [API: rbtv77.com] → [Playlist HLS] → [ExoPlayer] → [Video Output]
         ↓
    [Activation Check]
         ↓
[Server: vip1.openaicommunities.shop]
```

## Recomendaciones para Versión Web

### Stack Tecnológico Sugerido
- **Frontend**: React + TypeScript
- **Styling**: TailwindCSS
- **Video Player**: Video.js o HLS.js
- **State Management**: Zustand
- **API Calls**: Axios

### Consideraciones
1. Implementar sistema de activación similar
2. Usar CORS proxy para acceder a streams
3. Gestionar tokens de sesión
4. Implementar cache local para canales favoritos

---

*Análisis realizado el 2026-07-02*
