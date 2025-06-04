# 🏋️‍♂️ RindeMás

**RindeMás** es una aplicación web personal para gestionar rutinas de entrenamiento y usuarios asociados. Pensada como herramienta de uso diario para ti y tu entorno (familiares, amigos), permite añadir perfiles personalizados y organizar sesiones de ejercicio según el día o grupo muscular.

---

## 🚀 Estado del proyecto

### 🏠 Página de inicio ✅

- Estructura HTML finalizada
- Estilos CSS completos
- Formulario de creación de usuarios funcional
- Validación de nombre y apellido duplicados
- Edición con validación visual y detección de cambios
- Alerta visual al eliminar (individual o múltiple)
- Eliminación con cuenta regresiva
- Animaciones suaves y feedback visual
- Selección múltiple de usuarios
- Límite máximo de 6 usuarios con control visual
- Persistencia de datos con `localStorage`
- Estructura modular de CSS y JS
- 🛠️ En desarrollo: Responsive design

---

### 👤 Página de usuario ✅

- Carga con animación personalizada y foto de perfil (si existe)
- Fondo personalizado
- Botones para cambiar de usuario y volver al inicio
- Menú desplegable con acciones
- Vista de todos los usuarios creados
- Marcado del usuario activo ("Conectado")
- Relleno visual de espacio con placeholders hasta 6 tarjetas
- Transición visual al regresar a inicio
- 🛠️ En desarrollo: Vinculación con rutina personalizada

---

## ✨ Funcionalidades principales

- Creación, edición y eliminación de perfiles
- Validación en tiempo real con mensajes estilizados
- Carga visual personalizada por usuario
- Cambios dinámicos en la interfaz según estado
- Animaciones de entrada y salida
- Vista interactiva de usuarios en `user.html`
- Feedback visual por acciones exitosas o con error
- Contenedor dinámico que se adapta visualmente a la cantidad de usuarios

---

## 🖼️ Capturas de pantalla

> Puedes ver una galería completa de capturas en el repositorio:  
> `/assets/captures/home/` y `/assets/captures/user/`

---

## 📂 Estructura del proyecto

```plaintext
RindeMas/
├── assets/
│   ├── captures/
│   ├── images/
│   ├── logo/
│   └── wireframe/
├── css/
│   ├── base/
│   ├── components/
│   ├── pages/
│   ├── style.css
│   └── user-main.css
├── data/
│   └── exercises.json
├── js/
│   ├── pages/
│   └── shared/
├── pages/
│   └── user.html
├── index.html
├── README.md

```

---

## 🧩 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript (implementado en la página de inicio)
- localStorage para persistencia de usuarios
- Google Fonts (Titillium Web, Rajdhani)
- Metodología BEM (Bloques, Elementos, Modificadores)
- Inteligencia Artificial (asistencia en diseño, estructura y validación de funcionalidades)

---

## 🛠️ Cómo ejecutar el proyecto

Puedes abrir el proyecto localmente así:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/rindemas.git
   ```
2. Abre `index.html` en tu navegador.

> También puedes desplegarlo fácilmente en GitHub Pages o Netlify.

---

## 🤝 Cómo contribuir

1. Haz un fork del repositorio.
2. Crea una rama nueva con tu mejora:
   ```bash
   git checkout -b mejora/tu-funcionalidad
   ```
3. Realiza tus cambios y haz commit:
   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```
4. Haz push a la rama:
   ```bash
   git push origin mejora/tu-funcionalidad
   ```
5. Abre un Pull Request en GitHub.

---

## 🌐 Demo en vivo

👉 Puedes probar la app en:  
🔗 [https://alejandrorumi-dev.github.io/RindeMas/](https://alejandrorumi-dev.github.io/RindeMas/)

---

## 👨‍💻 Autor

Desarrollado por **Alejandro Rumí Morales** como proyecto personal de aprendizaje y mejora en desarrollo frontend.  
Forma parte de su portafolio técnico y de prácticas con HTML, CSS y JavaScript.