# RESPUESTAS.md - Taller Introducción a React Native

## PREGUNTA 1: Entorno de desarrollo y sistema operativo

**a) Papel de las herramientas de desarrollo:**
* **Node.js y npm:** Node.js es el entorno donde se puede ejecutar JavaScript fuera del navegador. Permite usar herramientas de desarrollo como Metro y la CLI de React Native. npm es el gestor de paquetes que instala y maneja las dependencias del proyecto, como librerías y frameworks.
* **Metro bundler:** Es el empaquetador de JavaScript que usa React Native. Toma todo el código fuente y sus dependencias. Las transforma y transpila JSX o ES6+. Luego las une en un solo archivo que la app puede ejecutar. También permite hot reloading para ver cambios en tiempo real.
* **JDK y Android SDK:** El JDK trae el compilador y el entorno que se necesitan porque las herramientas de compilación de Android usan Java o Kotlin. El Android SDK incluye las bibliotecas, APIs, emuladores y herramientas que hacen falta para compilar, empaquetar y ejecutar aplicaciones en Android.
* **Xcode:** Es el IDE oficial de Apple. Incluye el compilador de Objective-C y Swift. También trae el simulador de iOS y las herramientas de firma y empaquetado. Es necesario para compilar cualquier app iOS, incluso si el código es de React Native.
* **Expo Go:** Es una aplicación gratis que permite probar y ejecutar aplicaciones de React Native directamente en tu celular sin tener que configurar compilaciones complicadas.

**b) Compilación iOS en Windows/Linux y alternativas:**
Ninguno puede compilar de forma nativa porque las herramientas necesarias, Xcode y el SDK de iOS, solo están disponibles en el sistema operativo macOS de Apple. Hay dos opciones reales. La primera es usar **Expo Go** para probar la aplicación escaneando un código QR, sin tener que compilar en la computadora. La segunda es usar un servicio de compilación en la nube como **EAS Build**. Este servicio compila la aplicación en servidores remotos de Apple y luego entrega el archivo instalable.

**c) Variables de entorno, ANDROID_HOME y PATH:**
Las variables de entorno son valores cambiantes que el sistema operativo usa para decidir cómo se ejecutan los procesos. El emulador falla si `ANDROID_HOME` o el `PATH` están mal configurados. En ese caso, la terminal no sabe en qué carpeta del disco duro buscar las herramientas del SDK, como `adb`. La diferencia es que una variable de usuario solo afecta a la persona que inició sesión en ese momento. En cambio, una variable de sistema se aplica a cualquier usuario del equipo.

**d) Expo vs React Native CLI:**
* **Expo:** Ventajas: Configuración inmediata sin modificar código nativo. Es fácil probar en dispositivos físicos con Expo Go. Limitaciones: Las aplicaciones suelen ser un poco más pesadas. Integrar paquetes nativos muy personalizados es más complicado.
* **React Native CLI:** Ventajas: Permite controlar todo el código nativo en Java o Swift y funciona con cualquier librería de terceros. Limitaciones: La configuración inicial es compleja y necesitas usar una Mac para compilar aplicaciones de iOS.
* **Cuándo elegir:** Expo sirve bien para la mayoría de las apps estándar, prototipos rápidos o si no tienes Mac. CLI se usa cuando la app necesita funciones nativas muy específicas, integraciones de hardware complejas, como Bluetooth avanzado, o código heredado.

---

## PREGUNTA 2: Fundamentos de React Native

**a) Equivalencias entre elementos web y componentes de React Native:**

| En la web | En React Native |
| :--- | :--- |
| `<div>` | `<View>` |
| `<p>` o `<span>` | `<Text>` |
| `<img>` | `<Image>` |
| `<input>` | `<TextInput>` |
| Lista larga con scroll | `<FlatList>` |

**b) Diferencias entre estilos de React Native y CSS tradicional:**
* En React Native los estilos se definen mediante `StyleSheet.create({...})`, pasando un objeto JavaScript con propiedades en camelCase, en lugar de un archivo .css externo.
* No existe cascada ni selectores globales. A diferencia del CSS tradicional donde los estilos se heredan, en React Native cada componente recibe sus estilos directamente.
* El sistema usa Flexbox por defecto. El valor predeterminado es `flexDirection: 'column'`. Esta decisión tiene todo el sentido en móviles, ya que las pantallas son verticales.

**c) Props vs Estado:**
* **Props:** Son datos de solo lectura que un componente recibe de su padre. El componente hijo no puede modificarlos.
* **Estado:** Son datos internos e interactivos propios del componente. Cuando el estado cambia, el componente se vuelve a renderizar.
* **Ejemplo:** En una lista de productos, una Prop sería el texto del nombre (`<Tarjeta nombre="Camisa"/>`) que recibe de la base de datos. El Estado sería una variable interna (`const [favorito, setFavorito] = useState(false)`) que cambia solo cuando el usuario toca el botón de "Me gusta" de esa tarjeta.

---

## PREGUNTA 3: Manejo de pantallas y navegación

**a) Tipos de navegadores, funciones y casos de uso:**

| Navegador | ¿Para qué sirve? | Caso de uso |
| :--- | :--- | :--- |
| **Stack** | Organiza las pantallas como una pila donde la nueva se coloca sobre la anterior, permitiendo pasar parámetros y retroceder en el historial. | Navegar desde una lista general hacia la pantalla de detalle de un contacto específico y poder regresar. |
| **Tabs** | Muestra pantallas principales accesibles mediante pestañas permanentes, permitiendo cambiar entre secciones independientes sin jerarquía vertical. | Una red social con secciones principales como Inicio, Buscar, Notificaciones y Perfil. |
| **Drawer** | Despliega un menú lateral oculto útil para agrupar múltiples opciones de navegación sin ocupar espacio permanente en la pantalla principal. | Una aplicación de banco o correo electrónico con acceso lateral a Configuración, Ayuda, Historial y Cerrar sesión. |

**b) Contenedor NavigationContainer:**
Este contenedor administra el estado global de navegación, manteniendo el historial de pantallas y conectándose con los eventos del sistema operativo (como el deep linking o el botón atrás de Android). Debe existir solo uno porque centraliza la "única fuente de verdad"; si hubiera varios, el sistema operativo no sabría a cuál de ellos enviar las acciones de retroceso, generando conflictos y cierres inesperados de la app.

**c) Envío y lectura de parámetros:**
Para enviarlos, se pasa un objeto como segundo parámetro en la función: `navigation.navigate('Detalle', { id: 123 })`. Para leerlos en la pantalla destino, se extraen mediante `route.params`. Siempre conviene enviar únicamente el identificador (ID). Si enviamos el objeto completo, consumimos más memoria y corremos el riesgo de mostrar información desactualizada si el dato cambió en la base de datos mientras navegábamos. Usar el ID asegura una única fuente de verdad.

**d) Estado de la pantalla A al regresar:**
La pantalla A no se vuelve a crear desde cero, se mantiene montada y en pausa debajo de la pantalla B, conservando su estado original. La implicación de esto es que, si B crea un registro nuevo en una lista estática de A, al regresar la lista no se actualizará sola porque el `useEffect` de montaje no se vuelve a disparar. Para solucionarlo, hay que escuchar cambios en tiempo real o forzar un re-renderizado usando eventos de foco.

**e) "Regresar" en Android vs iOS:**
Android tiene un botón físico/táctil global en el sistema operativo diseñado para ir atrás. iOS carece de este botón, dependiendo de botones en la interfaz de la app o gestos de deslizamiento lateral. React Navigation resuelve esto unificando la experiencia: en Android intercepta el evento del botón físico para retroceder en su historial en lugar de cerrar la app, y en iOS renderiza automáticamente el botón "<" en el encabezado habilitando el gesto de deslizamiento nativo.

---

## PREGUNTA 4: Configuración base de Firebase

**a) Pasos para inicialización:**
1. Crear el proyecto en la consola de Firebase.
2. Registrar una aplicación (tipo Web para proyectos de Expo) dentro del proyecto.
3. Obtener el objeto de configuración generado (firebaseConfig).
4. Activar los servicios necesarios desde la consola (como Firestore Database).
5. Instalar el SDK en el proyecto de React Native ejecutando `npm install firebase`.
6. Crear un archivo centralizado (ej. `config/firebase.js`) e inicializar la app llamando a `initializeApp()` con las credenciales correspondientes usando variables de entorno.

**b) Claves del objeto de configuración:**
* **apiKey:** Identifica y autoriza las peticiones hacia las APIs públicas del proyecto en Google Cloud.
* **projectId:** Es el identificador único global del proyecto dentro de la infraestructura de Firebase.
* **appId:** Identifica de forma única a la aplicación cliente registrada (web, Android, iOS) dentro del proyecto.
* **storageBucket:** Indica la dirección del contenedor de almacenamiento en la nube destinado para guardar archivos multimedia.

**c) Seguridad de la apiKey y protección real de datos:**
La apiKey en Firebase está diseñada para ser pública en el cliente web/móvil, funcionando más como un identificador de enrutamiento que como una contraseña. La protección real de los datos reside exclusivamente en las Reglas de Seguridad (Security Rules) configuradas en el servidor, las cuales utilizan Firebase Authentication para verificar quién está haciendo la solicitud y decidir si tiene permisos válidos para leer o escribir información.

**d) Modos de prueba y producción:**
El modo de prueba permite que cualquier persona en internet lea y escriba en la base de datos sin restricciones durante un periodo de tiempo (usualmente 30 días). El modo de producción bloquea todo acceso por defecto hasta que el desarrollador defina reglas claras. El riesgo de publicar en modo de prueba es crítico: cualquier usuario malintencionado podría borrar toda la información, inyectar datos falsos o agotar la cuota de facturación de Google Cloud del propietario del proyecto.

**e) Comparación Firestore vs Realtime Database:**
1. **Modelo de datos:** Firestore organiza en colecciones y documentos (ideal para jerarquías escalables), mientras Realtime Database usa un único árbol JSON gigante (difícil de escalar).
2. **Consultas:** Firestore permite consultas complejas, filtrado múltiple y ordenamiento, mientras que Realtime Database es muy limitado, permitiendo filtrar por un solo parámetro a la vez.
3. **Escalabilidad:** Firestore escala automáticamente de forma masiva sin perder rendimiento, mientras Realtime Database disminuye su velocidad al descargar nodos JSON demasiado anidados.
* **Elección para la Parte 2:** Para la aplicación del Directorio de Contactos, elegiría **Cloud Firestore**. El taller requiere manejar listas de usuarios con campos específicos (nombre, teléfono, ciudad), lo cual encaja perfectamente en el modelo de documentos. 